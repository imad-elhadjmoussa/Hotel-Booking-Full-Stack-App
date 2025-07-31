// src/components/ui/image-upload.tsx
"use client";

import { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import { UploadCloud, X } from "lucide-react";
import { Button } from "./ui/button";

interface ImageUploadProps {
    onChange: (files: File[]) => void;
    value: File[];
    maxFiles?: number;
}

export function ImageUpload({
    onChange,
    value = [],
    maxFiles = 5,
}: ImageUploadProps) {
    const [isUploading, setIsUploading] = useState(false);

    const onDrop = useCallback(
        async (acceptedFiles: File[]) => {
            if (acceptedFiles.length + value.length > maxFiles) {
                alert(`You can only upload up to ${maxFiles} images`);
                return;
            }

            setIsUploading(true);

            try {
                // Replace this with your actual image upload logic if needed
                await new Promise((resolve) => setTimeout(resolve, 1000));

                onChange([...value, ...acceptedFiles]);
            } catch (error) {
                console.error("Upload failed:", error);
            } finally {
                setIsUploading(false);
            }
        },
        [onChange, value, maxFiles]
    );

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        accept: {
            "image/*": [".jpeg", ".jpg", ".png", ".webp"],
        },
        maxFiles,
        disabled: isUploading || value.length >= maxFiles,
    });

    const removeImage = (index: number) => {
        const newFiles = value.filter((_, i) => i !== index);
        onChange(newFiles);
    };

    return (
        <div className="space-y-4">
            <div
                {...getRootProps()}
                className={`
          border-2 border-dashed rounded-lg p-6 text-center cursor-pointer transition-colors
          ${isDragActive ? "border-primary bg-primary/10" : "border-muted"}
          ${isUploading || value.length >= maxFiles ? "opacity-50 cursor-not-allowed" : ""}
        `}
            >
                <input {...getInputProps()} />
                <div className="flex flex-col items-center justify-center gap-2">
                    <UploadCloud className="h-10 w-10 text-muted-foreground" />
                    <p className="text-sm text-muted-foreground">
                        {isDragActive
                            ? "Drop images here"
                            : "Drag & drop images here, or click to select"}
                    </p>
                    <p className="text-xs text-muted-foreground">
                        Upload up to {maxFiles} images (JPEG, PNG, WEBP)
                    </p>
                </div>
            </div>

            {isUploading && (
                <p className="text-sm text-muted-foreground text-center">
                    Uploading images...
                </p>
            )}

            {value.length > 0 && (
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                    {value.map((file, index) => (
                        <div key={index} className="relative group">
                            <div className="aspect-square overflow-hidden rounded-md bg-muted">
                                <img
                                    src={URL.createObjectURL(file)}
                                    alt={`Uploaded ${file.name}`}
                                    className="w-full h-full object-cover"
                                />
                            </div>
                            <Button
                                type="button"
                                variant="destructive"
                                size="sm"
                                className="absolute top-1 right-1 opacity-0 group-hover:opacity-100 transition-opacity p-1 h-6 w-6"
                                onClick={(e) => {
                                    e.stopPropagation();
                                    removeImage(index);
                                }}
                            >
                                <X className="h-3 w-3" />
                            </Button>
                        </div>
                    ))}
                </div>
            )}

            {value.length >= maxFiles && (
                <p className="text-sm text-muted-foreground text-center">
                    Maximum {maxFiles} images reached
                </p>
            )}
        </div>
    );
}