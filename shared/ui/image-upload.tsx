"use client";

import * as React from "react";
import { User, Upload, X, FileText } from "lucide-react";
import { cn } from "@/shared/lib/utils";
import { Label } from "./label";

interface FileUploadProps {
  value?: string | File | null;
  onChange?: (file: File | null) => void;
  label?: string;
  className?: string;
  previewClassName?: string;
  accept?: string;
  children?: React.ReactNode;
}

export function FileUpload({
  value,
  onChange,
  label,
  className,
  previewClassName,
  accept = "image/*",
  children,
}: FileUploadProps) {
  const inputRef = React.useRef<HTMLInputElement>(null);
  const [preview, setPreview] = React.useState<string | null>(null);
  const [fileName, setFileName] = React.useState<string | null>(null);

  // Determine if the value is an image based on type or extension
  const isImage = React.useMemo(() => {
    if (!value) return false;
    if (value instanceof File) return value.type.startsWith("image/");
    if (typeof value === "string") {
      // Basic check for common image extensions in URL
      return /\.(jpg|jpeg|png|gif|webp|svg)$/i.test(value) || value.startsWith("data:image");
    }
    return false;
  }, [value]);

  React.useEffect(() => {
    if (!value) {
      setPreview(null);
      setFileName(null);
      return;
    }

    if (typeof value === "string") {
      setPreview(value);
      setFileName(value.split("/").pop() || "File");
    } else if (value instanceof File) {
      const url = URL.createObjectURL(value);
      setPreview(url);
      setFileName(value.name);
      return () => URL.revokeObjectURL(url);
    }
  }, [value]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      onChange?.(file);
    }
  };

  const handleClick = () => {
    inputRef.current?.click();
  };

  const handleRemove = (e: React.MouseEvent) => {
    e.stopPropagation();
    onChange?.(null);
    if (inputRef.current) {
      inputRef.current.value = "";
    }
  };

  return (
    <div className={cn("flex flex-col gap-2", className)}>
      {label && <Label>{label}</Label>}
      <div
        onClick={handleClick}
        className={cn(
          "border-muted-foreground/25 bg-muted/50 hover:bg-muted relative flex cursor-pointer flex-col items-center justify-center rounded-lg transition-colors",
          // If it's a specialized image preview (avatar style), the user might pass specific previewClassName
          // Default container style is somewhat generic now.
          // If children provided and NO value, we render children.
          // If value, we render preview.
          value ? "border-border border-solid p-0" : "",
          className?.includes("rounded-full") ? "rounded-full" : "", // simple heuristic or just rely on previewClassName
          previewClassName || "h-32 w-full"
        )}
      >
        <input
          ref={inputRef}
          type="file"
          accept={accept}
          className="hidden"
          onChange={handleFileChange}
        />

        {value ? (
          <>
            <div
              className={cn(
                "h-full w-full overflow-hidden",
                className?.includes("rounded-full") ? "rounded-full" : "rounded-lg"
              )}
            >
              {isImage ? (
                <img src={preview || ""} alt="Preview" className="h-full w-full object-cover" />
              ) : (
                <div className="flex h-full w-full flex-col items-center justify-center p-4 text-center">
                  <FileText className="text-muted-foreground mb-2 h-8 w-8" />
                  <span className="text-foreground max-w-[90%] truncate text-sm font-medium">
                    {fileName}
                  </span>
                </div>
              )}
            </div>

            <button
              onClick={handleRemove}
              className="bg-destructive hover:bg-destructive/90 absolute -top-2 -right-2 z-10 rounded-full p-1 text-white shadow-sm"
              type="button"
            >
              <X className="h-3 w-3" />
            </button>
          </>
        ) : (
          children || (
            <div className="text-muted-foreground flex flex-col items-center justify-center">
              <Upload className="mb-2 h-8 w-8" />
              <span className="text-xs font-semibold uppercase">Upload File</span>
            </div>
          )
        )}
      </div>
    </div>
  );
}

// Alias for backward compatibility if needed, or just export FileUpload
export { FileUpload as ImageUpload };
