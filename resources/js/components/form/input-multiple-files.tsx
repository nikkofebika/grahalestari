import { Card } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { cn } from '@/lib/utils';
import { TrashIcon } from 'lucide-react';
import { useCallback, useEffect, useState } from 'react';
import { useDropzone } from 'react-dropzone';

type ExistingFile = {
    id: number;
    original_url: string;
    file_name: string;
};

type Props = {
    id: string;
    label?: string;
    errorMessage?: string;
    onChange: (files: File[]) => void;
    values: File[]; // file baru (from dropzone)
    existingFiles?: ExistingFile[]; // file dari DB
    onDeleteExisting?: (id: number) => void; // kalau mau catat file yang dihapus
};

export default function InputMultipleFiles({ id, label, errorMessage, onChange, values, existingFiles = [], onDeleteExisting }: Props) {
    const [previews, setPreviews] = useState<string[]>([]);
    const [files, setFiles] = useState<File[]>([]);
    const [oldFiles, setOldFiles] = useState<ExistingFile[]>(existingFiles);

    const onDrop = useCallback(
        (acceptedFiles: File[]) => {
            setFiles((prev) => [...prev, ...acceptedFiles]);
            onChange([...values, ...acceptedFiles]);

            const newPreviews = acceptedFiles.map((file) => URL.createObjectURL(file));
            setPreviews((prev) => [...prev, ...newPreviews]);
        },
        [onChange, values],
    );

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        accept: { 'image/*': [] },
        multiple: true,
    });

    const handleRemoveNew = (index: number) => {
        const updatedFiles = [...files];
        const updatedPreviews = [...previews];
        updatedFiles.splice(index, 1);
        updatedPreviews.splice(index, 1);
        setFiles(updatedFiles);
        setPreviews(updatedPreviews);
        onChange(updatedFiles);
    };

    const handleRemoveOld = (fileId: number) => {
        setOldFiles((prev) => prev.filter((file) => file.id !== fileId));
        if (onDeleteExisting) onDeleteExisting(fileId);
    };

    useEffect(() => {
        setFiles(values);
    }, [values]);

    useEffect(() => {
        setOldFiles(existingFiles);
    }, [existingFiles]);

    return (
        <div className="space-y-2">
            {label && <Label htmlFor={id}>{label}</Label>}

            <div
                {...getRootProps()}
                className={cn(
                    'cursor-pointer rounded-xl border border-dashed border-gray-300 p-6 text-center transition',
                    isDragActive && 'bg-muted',
                )}
            >
                <input {...getInputProps()} id={id} />
                <p className="text-muted-foreground text-sm">
                    {isDragActive ? 'Lepaskan untuk mengunggah...' : 'Seret dan lepas file di sini, atau klik untuk memilih'}
                </p>
            </div>

            {errorMessage && <p className="text-sm text-red-500">{errorMessage}</p>}

            {(oldFiles.length > 0 || previews.length > 0) && (
                <div className="grid grid-cols-3 gap-3 pt-2">
                    {/* Existing files */}
                    {oldFiles.map((file, index) => (
                        <Card key={`old-${file.id}`} className="relative overflow-hidden">
                            <img src={file.original_url} alt={file.file_name} className="h-24 w-full object-cover" />
                            <button
                                type="button"
                                onClick={() => handleRemoveOld(file.id)}
                                className="bg-destructive absolute top-1 right-1 rounded-full p-1 text-white"
                            >
                                <TrashIcon size={20} />
                            </button>
                        </Card>
                    ))}

                    {/* New uploaded previews */}
                    {previews.map((src, index) => (
                        <Card key={`new-${index}`} className="relative overflow-hidden">
                            <img src={src} alt={`preview-${index}`} className="h-24 w-full object-cover" />
                            <button
                                type="button"
                                onClick={() => handleRemoveNew(index)}
                                className="absolute top-1 right-1 rounded-full bg-destructive p-1 text-white"
                            >
                                <TrashIcon size={20} />
                            </button>
                        </Card>
                    ))}
                </div>
            )}
        </div>
    );
}
