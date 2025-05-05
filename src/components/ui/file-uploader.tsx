import React, { useState, useRef, useCallback } from 'react';
import { Button } from './button';
import { Upload, X, AlertCircle, Image, FileText, File } from 'lucide-react';
import { cn } from '../../lib/utils';

interface FileUploaderProps {
  multiple?: boolean;
  maxSize?: number; // in MB
  accept?: string;
  onFilesSelected?: (files: File[]) => void;
}

const getFileIcon = (file: File) => {
  if (file.type.startsWith('image/')) return <Image className="h-4 w-4" />;
  if (file.type.includes('pdf')) return <FileText className="h-4 w-4" />;
  return <File className="h-4 w-4" />;
};

export const FileUploader: React.FC<FileUploaderProps> = ({
  multiple = true,
  maxSize = 10,
  accept = '*',
  onFilesSelected,
}) => {
  const [files, setFiles] = useState<File[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFiles = useCallback((incoming: FileList | null) => {
    if (!incoming) return;

    const validFiles: File[] = [];
    for (const file of Array.from(incoming)) {
      if (file.size <= maxSize * 1024 * 1024) {
        validFiles.push(file);
      }
    }
    setFiles(validFiles);
    onFilesSelected?.(validFiles); // 👉 Trigger parent saat valid
  }, [maxSize, onFilesSelected]);

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    handleFiles(e.dataTransfer.files);
  };

  const handleBrowse = () => {
    fileInputRef.current?.click();
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    handleFiles(e.target.files);
  };

  const removeFile = (index: number) => {
    const updated = [...files];
    updated.splice(index, 1);
    setFiles(updated);
    onFilesSelected?.(updated);
  };

  return (
    <div
      className={cn("border-dashed border-2 p-6 rounded-lg text-center cursor-pointer hover:border-primary")}
      onDrop={handleDrop}
      onDragOver={(e) => e.preventDefault()}
    >
      <Upload className="mx-auto h-6 w-6 text-muted-foreground" />
      <p className="text-sm mt-2">Drag files here or <Button variant="link" className="px-1" onClick={handleBrowse}>browse</Button></p>
      <input
        ref={fileInputRef}
        type="file"
        accept={accept}
        multiple={multiple}
        className="hidden"
        onChange={handleChange}
      />

      {files.length > 0 && (
        <div className="mt-4 space-y-2">
          {files.map((file, index) => (
            <div key={index} className="flex items-center justify-between text-sm bg-muted p-2 rounded">
              <div className="flex items-center gap-2">
                {getFileIcon(file)}
                <span>{file.name}</span>
              </div>
              <Button variant="ghost" size="icon" onClick={() => removeFile(index)}>
                <X className="h-4 w-4" />
              </Button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};


FileUploader.displayName = "FileUploader";

