import { v4 as uuidv4 } from 'uuid';

/**
 * Upload multiple files to Supabase Storage
 * 
 * @param files - Array of File to upload
 * @param bucket - Supabase Storage bucket name
 * @param supabase - Supabase client instance
 * @param folder - Optional folder prefix
 * @param userId - Required for metadata (used in RLS)
 * @param taskId - Optional for folder structuring
 * @param userRole - Optional for debugging/log
 * @param onProgress - Optional callback for progress UI
 */
export async function uploadMultipleFiles({
  files,
  bucket,
  supabase,
  folder = '',
  userId,
  taskId,
  userRole,
  onProgress
}: {
  files: File[];
  bucket: string;
  supabase: any;
  folder?: string;
  userId: string;
  taskId?: string;
  userRole?: string;
  onProgress?: (percent: number) => void;
}) {
  const uploaded: {
    success: boolean;
    data?: {
      name: string;
      size: number;
      path: string;
      url: string;
    };
    error?: string;
  }[] = [];

  for (let i = 0; i < files.length; i++) {
    const file = files[i];
    try {
      const ext = file.name.split('.').pop();
      const fileName = `${Date.now()}-${uuidv4()}.${ext}`;
      const filePath = taskId
        ? `${folder}/${taskId}/${fileName}`
        : `${folder}/${fileName}`;

      const { data, error } = await supabase.storage
        .from(bucket)
        .upload(filePath, file, {
          cacheControl: '3600',
          upsert: true,
          contentType: file.type || 'application/octet-stream',
          metadata: {
            user_id: userId,
          }
        });

      if (error) {
        uploaded.push({ success: false, error: error.message });
        continue;
      }

      const { data: urlData } = supabase.storage
        .from(bucket)
        .getPublicUrl(data.path);

      uploaded.push({
        success: true,
        data: {
          name: file.name,
          size: file.size,
          path: data.path,
          url: urlData.publicUrl
        }
      });

      if (onProgress) {
        const percent = Math.round(((i + 1) / files.length) * 100);
        onProgress(percent);
      }
    } catch (err: any) {
      uploaded.push({ success: false, error: err.message });
    }
  }

  return uploaded;
}

  

export async function uploadFile(file, bucket, supabase, folder = '') {
  // Validasi input yang lebih ketat
  if (!file) {
    console.error('Upload failed: File is missing');
    throw new Error('File tidak ditemukan');
  }
  
  if (!bucket) {
    console.error('Upload failed: Bucket name is missing');
    throw new Error('Nama bucket diperlukan');
  }
  
  if (!supabase) {
    console.error('Upload failed: Supabase client is missing');
    throw new Error('Supabase client tidak tersedia');
  }

  // Validasi Supabase storage API
  if (!supabase.storage) {
    console.error('Upload failed: Supabase storage API is not available', supabase);
    throw new Error('Supabase storage API tidak tersedia');
  }

  try {
    console.log('[DEBUG] Starting file upload process', { 
      filename: file.name, 
      size: file.size, 
      type: file.type,
      bucket: bucket,
      folder: folder
    });
    
    // Generate unique filename dengan timestamp untuk mencegah collision
    const fileExt = file.name.split('.').pop();
    const timestamp = Date.now();
    const fileName = `${timestamp}-${uuidv4()}.${fileExt}`;
    
    // Tentukan path file berdasarkan folder (jika ada)
    const filePath = folder ? `${folder}/${fileName}` : fileName;
    console.log('[DEBUG] Generated file path:', filePath);

    // Tambahkan validasi bahwa bucket ada di Supabase
    try {
      const { data: buckets, error: bucketError } = await supabase.storage.listBuckets();
      
      if (bucketError) {
        console.error('[DEBUG] Failed to list buckets:', bucketError);
        // Lanjutkan saja, mungkin masalah permission tapi bucket tetap ada
      } else {
        console.log('[DEBUG] Available buckets:', buckets?.map(b => b.name).join(', '));
        const bucketExists = buckets?.some(b => b.name === bucket);
        
        if (!bucketExists) {
          console.warn(`[DEBUG] Warning: Bucket '${bucket}' not found in the list of available buckets`);
          // Lanjutkan saja, mungkin masalah permission tapi bucket tetap ada
        }
      }
    } catch (bucketCheckError) {
      console.error('[DEBUG] Error checking buckets:', bucketCheckError);
      // Lanjutkan saja, ini hanya untuk debugging
    }

    // Lakukan upload ke Supabase Storage dengan cacheControl dan content type yang tepat
    console.log('[DEBUG] Uploading to Supabase Storage...', { bucket, filePath });
    
    // Tambahkan content type untuk memastikan file dibuka dengan benar
    const contentType = file.type || 'application/octet-stream';
    
    const { data, error } = await supabase.storage
      .from(bucket)
      .upload(filePath, file, {
        cacheControl: '3600',
        upsert: true, // Ubah ke true untuk mengatasi konflik nama file
        contentType: contentType // Tambahkan content type
      });

    // Handle error jika upload gagal
    if (error) {
      console.error('[DEBUG] Supabase upload error:', error);
      throw new Error(`Upload gagal: ${error.message}`);
    }

    if (!data || !data.path) {
      console.error('[DEBUG] Upload response invalid', data);
      throw new Error('Upload berhasil tetapi response tidak valid');
    }

    console.log('[DEBUG] Upload successful:', data);

    // Dapatkan public URL untuk file yang diupload
    const { data: urlData } = supabase.storage
      .from(bucket)
      .getPublicUrl(data.path);

    if (!urlData || !urlData.publicUrl) {
      console.error('[DEBUG] Failed to get public URL', urlData);
      throw new Error('Upload berhasil tetapi gagal mendapatkan URL publik');
    }

    console.log('[DEBUG] File public URL generated:', urlData.publicUrl);

    // Return informasi file yang berhasil diupload
    return {
      path: data.path,
      url: urlData.publicUrl,
      filename: file.name,
      size: file.size,
      contentType: contentType
    };
  } catch (err) {
    // Tangkap dan log semua error untuk debugging
    console.error('[DEBUG] File upload failed with exception:', err);
    
    // Berikan informasi error yang lebih spesifik berdasarkan jenis error
    if (err.message && err.message.includes('No bucket')) {
      throw new Error(`Bucket '${bucket}' tidak ditemukan. Silakan periksa konfigurasi.`);
    } else if (err.message && err.message.includes('permission')) {
      throw new Error(`Tidak memiliki izin untuk mengakses bucket '${bucket}'. Silakan periksa policy bucket.`);
    } else if (err.message && err.message.includes('auth')) {
      throw new Error(`Masalah autentikasi dengan Supabase. Silakan coba login ulang.`);
    } else {
      throw new Error(`Gagal mengupload file: ${err.message}`);
    }
  }
}