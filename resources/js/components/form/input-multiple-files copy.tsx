import { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { cn } from '@/lib/utils'; // jika pakai util cn dari ShadCN
import { Label } from '@/components/ui/label';
import { Card } from '@/components/ui/card';

type Props = {
  id: string;
  label?: string;
  errorMessage?: string;
  onChange: (files: File[]) => void;
  values: File[];
};

export default function InputMultipleFiles({ id, label, errorMessage, onChange, values }: Props) {
  const [previews, setPreviews] = useState<string[]>([]);

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      onChange([...values, ...acceptedFiles]);

      const filePreviews = acceptedFiles.map(file => URL.createObjectURL(file));
      setPreviews(prev => [...prev, ...filePreviews]);
    },
    [onChange, values]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/*': [],
    },
    multiple: true,
  });

  return (
    <div className="space-y-2">
      {label && <Label htmlFor={id}>{label}</Label>}

      <div
        {...getRootProps()}
        className={cn(
          'border border-dashed border-gray-300 rounded-xl p-6 text-center cursor-pointer transition',
          isDragActive && 'bg-muted'
        )}
      >
        <input {...getInputProps()} id={id} />
        <p className="text-sm text-muted-foreground">
          {isDragActive ? 'Lepaskan untuk mengunggah...' : 'Seret dan lepas file di sini, atau klik untuk memilih'}
        </p>
      </div>

      {errorMessage && <p className="text-sm text-red-500">{errorMessage}</p>}

      {previews.length > 0 && (
        <div className="grid grid-cols-3 gap-3 pt-2">
          {previews.map((src, index) => (
            <Card key={index} className="overflow-hidden">
              <img src={src} alt={`preview-${index}`} className="object-cover w-full h-24" />
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
