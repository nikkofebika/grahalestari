import { Button } from '@/components/ui/button';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { getCroppedBlob } from '@/helpers/image-cropper';
import { cn } from '@/lib/utils';
import { Loader2 } from 'lucide-react';
import { useCallback, useState } from 'react';
import Cropper from 'react-easy-crop';

type Props = {
    label?: string;
    maxSize?: number;
    previewUrl?: string | null;
    onImageCropped: (blob: Blob) => void;
};

export default function ImageCropUploader({ label = 'Upload Foto', maxSize = 2, previewUrl, onImageCropped }: Props) {
    const [imageSrc, setImageSrc] = useState<string | null>(null);
    const [modalOpen, setModalOpen] = useState(false);
    const [crop, setCrop] = useState({ x: 0, y: 0 });
    const [zoom, setZoom] = useState(1);
    const [croppedAreaPixels, setCroppedAreaPixels] = useState<any>(null);
    const [isCropping, setIsCropping] = useState(false);
    const [isDragging, setIsDragging] = useState(false);

    const onCropComplete = useCallback((_area: any, pixels: any) => {
        setCroppedAreaPixels(pixels);
    }, []);

    const handleDrop = useCallback((e: React.DragEvent) => {
        e.preventDefault();
        setIsDragging(false);
        const file = e.dataTransfer.files?.[0];
        if (file) handleImage(file);
    }, []);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) handleImage(file);
    };

    const handleImage = (file: File) => {
        if (file.size > maxSize * 1024 * 1024) {
            alert('Ukuran maksimal gambar adalah 2MB');
            return;
        }

        const reader = new FileReader();
        reader.onload = () => {
            setImageSrc(reader.result as string);
            setModalOpen(true);
        };
        reader.readAsDataURL(file);
    };

    const handleCrop = async () => {
        if (!imageSrc || !croppedAreaPixels) return;

        setIsCropping(true);
        try {
            const blob = await getCroppedBlob(imageSrc, croppedAreaPixels);
            onImageCropped(blob);
            setModalOpen(false);
        } catch (err) {
            console.error('Crop error:', err);
        } finally {
            setIsCropping(false);
        }
    };

    return (
        <div className="grid gap-2">
            <Label>
                {label} (max {maxSize}MB)
            </Label>

            <div
                className={cn(
                    'relative flex h-50 w-50 cursor-pointer items-center justify-center rounded-full border-2 border-dashed transition-colors',
                    isDragging ? 'border-blue-500 bg-blue-50' : 'border-gray-300 bg-gray-50',
                )}
                onDragOver={(e) => {
                    e.preventDefault();
                    setIsDragging(true);
                }}
                onDragLeave={() => setIsDragging(false)}
                onDrop={handleDrop}
                onClick={() => document.getElementById('image-input')?.click()}
            >
                {previewUrl ? (
                    <div className="group relative h-full w-full overflow-hidden rounded-full">
                        <img src={previewUrl} alt="Preview" className="h-full w-full rounded-full object-cover" />
                        <div className="absolute inset-0 flex items-center justify-center bg-black/50 opacity-0 transition-opacity group-hover:opacity-100">
                            <p className="text-sm text-white">Upload File</p>
                        </div>
                    </div>
                ) : (
                    <p className="px-4 text-center text-sm text-gray-500">Drag & drop atau klik untuk upload</p>
                )}
                <Input id="image-input" type="file" accept="image/*" onChange={handleChange} className="sr-only" />
            </div>

            <Dialog open={modalOpen} onOpenChange={setModalOpen}>
                <DialogContent className="w-[90vw] max-w-md">
                    <div className="relative h-80 w-full bg-black">
                        {imageSrc && (
                            <Cropper
                                image={imageSrc}
                                crop={crop}
                                zoom={zoom}
                                aspect={1}
                                onCropChange={setCrop}
                                onCropComplete={onCropComplete}
                                onZoomChange={setZoom}
                            />
                        )}
                    </div>

                    <div className="mt-4 flex justify-end gap-2">
                        <Button variant="secondary" onClick={() => setModalOpen(false)} disabled={isCropping}>
                            Batal
                        </Button>
                        <Button onClick={handleCrop} disabled={isCropping}>
                            {isCropping ? <Loader2 className="h-4 w-4 animate-spin" /> : 'Simpan'}
                        </Button>
                    </div>
                </DialogContent>
            </Dialog>
        </div>
    );
}
