
import React, { useState, useRef, useCallback } from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../lib/utils';
import { Button } from './button';
import { Upload, X, AlertCircle, Check, File, Image, FileText, FilePlus } from 'lucide-react';
import { Progress } from './progress';
import { Alert, AlertDescription } from './alert';

const fileUploaderVariants = cva(
  "relative rounded-lg border border-dashed transition-all",
  {
    variants: {
      variant: {
        default: "border-border hover:border-primary/50 bg-muted/40",
        error: "border-destructive/50 hover:border-destructive bg-destructive/5",
        success: "border-success/50 hover:border-success bg-success/5",
      },
      size: {
        default: "p-6",
        sm: "p-4",
        lg: "p-8",
      }
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    }
  }
);

export interface FileUploaderProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof fileUploaderVariants> {
  onFilesSelected?: (files: File[]) => void;
  onFilesRejected?: (files: File[]) => void;
  accept?: string;
  multiple?: boolean;
  maxSize?: number; // in MB
  maxFiles?: number;
  disabled?: boolean;
  showPreview?: boolean;
  withProgressBar?: boolean;
  progressValue?: number;
  error?: string;
}

// Helper to get icon based on file type
const getFileIcon = (file: File) => {
  if (file.type.startsWith('image/')) return <Image className="h-5 w-5" />;
  if (file.type.includes('pdf')) return <FileText className="h-5 w-5" />;
  return <File className="h-5 w-5" />;
};

// Helper to format file size
const formatFileSize = (sizeInBytes: number) => {
  if (sizeInBytes < 1024) return `${sizeInBytes} bytes`;
  if (sizeInBytes < 1024 * 1024) return `${(sizeInBytes / 1024).toFixed(1)} KB`;
  return `${(sizeInBytes / (1024 * 1024)).toFixed(1)} MB`;
};

const FileUploader = React.forwardRef<HTMLDivElement, FileUploaderProps>(
  ({ 
    className, 
    variant, 
    size, 
    onFilesSelected,
    onFilesRejected,
    accept = "*", 
    multiple = false,
    maxSize = 10, // 10MB default
    maxFiles = 5,
    disabled = false,
    showPreview = true,
    withProgressBar = false,
    progressValue = 0,
    error,
    children,
    ...props 
  }, ref) => {
    const [files, setFiles] = useState<File[]>([]);
    const [isDragging, setIsDragging] = useState(false);
    const [localError, setLocalError] = useState<string | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);
    
    // Combine external error with local validation error
    const errorMessage = error || localError;
    
    const handleDragOver = useCallback((e: React.DragEvent<HTMLDivElement>) => {
      e.preventDefault();
      e.stopPropagation();
      if (disabled) return;
      setIsDragging(true);
    }, [disabled]);
    
    const handleDragLeave = useCallback((e: React.DragEvent<HTMLDivElement>) => {
      e.preventDefault();
      e.stopPropagation();
      setIsDragging(false);
    }, []);
    
    const validateFiles = useCallback((fileList: FileList | File[]): { valid: File[], invalid: File[] } => {
      const validFiles: File[] = [];
      const invalidFiles: File[] = [];
      
      Array.from(fileList).forEach(file => {
        // Check file size
        if (file.size > maxSize * 1024 * 1024) {
          invalidFiles.push(file);
          return;
        }
        
        // Check file type if accept is specified
        if (accept !== "*") {
          const acceptTypes = accept.split(",").map(type => type.trim());
          const fileType = file.type || '';
          const fileExtension = `.${file.name.split('.').pop()}`;
          
          const isValidType = acceptTypes.some(type => {
            if (type.startsWith('.')) {
              // Extension check
              return fileExtension.toLowerCase() === type.toLowerCase();
            } else if (type.endsWith('/*')) {
              // MIME type category check (e.g., image/*)
              const category = type.slice(0, -1);
              return fileType.startsWith(category);
            } else {
              // Exact MIME type check
              return fileType === type;
            }
          });
          
          if (!isValidType) {
            invalidFiles.push(file);
            return;
          }
        }
        
        validFiles.push(file);
      });
      
      return { valid: validFiles, invalid: invalidFiles };
    }, [accept, maxSize]);
    
    const processFiles = useCallback((fileList: FileList | File[]) => {
      if (disabled) return;
      
      setLocalError(null);
      const { valid, invalid } = validateFiles(fileList);
      
      // Check if too many files were selected
      if (!multiple && valid.length > 1) {
        setLocalError("Only one file can be uploaded");
        onFilesRejected?.(valid);
        return;
      }
      
      if (multiple && valid.length + files.length > maxFiles) {
        setLocalError(`You can upload a maximum of ${maxFiles} files`);
        onFilesRejected?.(valid);
        return;
      }
      
      if (invalid.length > 0) {
        setLocalError(`${invalid.length} file(s) were rejected. Please check file type and size (max ${maxSize}MB).`);
        onFilesRejected?.(invalid);
      }
      
      if (valid.length > 0) {
        const newFiles = multiple ? [...files, ...valid] : valid;
        setFiles(newFiles);
        onFilesSelected?.(valid);
      }
    }, [disabled, validateFiles, multiple, files, maxFiles, maxSize, onFilesSelected, onFilesRejected]);
    
    const handleDrop = useCallback((e: React.DragEvent<HTMLDivElement>) => {
      e.preventDefault();
      e.stopPropagation();
      setIsDragging(false);
      if (disabled) return;
      
      if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
        processFiles(e.dataTransfer.files);
      }
    }, [disabled, processFiles]);
    
    const handleFileInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
      if (e.target.files && e.target.files.length > 0) {
        processFiles(e.target.files);
      }
    }, [processFiles]);
    
    const handleButtonClick = () => {
      if (fileInputRef.current && !disabled) {
        fileInputRef.current.click();
      }
    };
    
    const removeFile = (indexToRemove: number) => {
      setFiles(prevFiles => prevFiles.filter((_, index) => index !== indexToRemove));
    };
    
    // Determine variant based on state
    let currentVariant = variant;
    if (errorMessage) currentVariant = 'error';
    else if (files.length > 0 && !withProgressBar) currentVariant = 'success';
    
    return (
      <div className="space-y-4">
        <div
          ref={ref}
          className={cn(
            fileUploaderVariants({ variant: currentVariant, size }),
            isDragging && "border-primary ring-2 ring-primary/20",
            disabled && "opacity-50 cursor-not-allowed",
            className
          )}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          {...props}
        >
          <div className="flex flex-col items-center justify-center text-center">
            <div className={cn(
              "mb-4 rounded-full p-3",
              errorMessage ? "bg-destructive/10" : "bg-muted"
            )}>
              {errorMessage ? (
                <AlertCircle className="h-6 w-6 text-destructive" />
              ) : (
                <Upload className={cn(
                  "h-6 w-6",
                  isDragging ? "text-primary animate-bounce" : "text-muted-foreground"
                )} />
              )}
            </div>
            
            <h3 className="text-base font-medium">
              {errorMessage ? "Upload Failed" : "Upload Files"}
            </h3>
            
            <p className="mt-1 text-sm text-muted-foreground">
              {errorMessage || (
                <>
                  Drag and drop or <Button onClick={handleButtonClick} variant="link" className="px-1 h-auto" disabled={disabled}>browse</Button> to upload
                </>
              )}
            </p>
            
            {!errorMessage && (
              <p className="mt-1 text-xs text-muted-foreground">
                {multiple ? `Up to ${maxFiles} files` : "Single file"}, max {maxSize}MB per file
                {accept !== "*" && ` (${accept.replace(/,/g, ", ")})`}
              </p>
            )}
          </div>
          
          <input
            ref={fileInputRef}
            type="file"
            accept={accept}
            multiple={multiple}
            className="sr-only"
            onChange={handleFileInputChange}
            disabled={disabled}
          />
        </div>
        
        {/* Progress bar */}
        {withProgressBar && files.length > 0 && (
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>Uploading {files.length} file{files.length !== 1 ? 's' : ''}</span>
              <span>{progressValue}%</span>
            </div>
            <Progress value={progressValue} className="h-2" />
          </div>
        )}
        
        {/* Error alert */}
        {errorMessage && (
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>{errorMessage}</AlertDescription>
          </Alert>
        )}
        
        {/* File preview */}
        {showPreview && files.length > 0 && (
          <div className="space-y-2">
            {files.map((file, index) => (
              <div 
                key={`${file.name}-${index}`}
                className="flex items-center justify-between rounded-md border p-2"
              >
                <div className="flex items-center space-x-2">
                  <div className="rounded-md bg-muted p-1">
                    {getFileIcon(file)}
                  </div>
                  <div className="space-y-0.5">
                    <p className="text-sm font-medium truncate max-w-[150px] sm:max-w-[250px] md:max-w-xs">
                      {file.name}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {formatFileSize(file.size)}
                    </p>
                  </div>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-7 w-7"
                  onClick={() => removeFile(index)}
                  disabled={disabled}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            ))}
          </div>
        )}
      </div>
    );
  }
);
FileUploader.displayName = "FileUploader";

export { FileUploader, fileUploaderVariants };
