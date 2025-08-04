export function getCroppedBlob(imageSrc: string, pixelCrop: any): Promise<Blob> {
    return new Promise((resolve, reject) => {
        const image = new Image();
        image.src = imageSrc;
        image.crossOrigin = 'anonymous';

        image.onload = () => {
            const canvas = document.createElement('canvas');
            const ctx = canvas.getContext('2d');

            if (!ctx) return reject('No context');

            canvas.width = pixelCrop.width;
            canvas.height = pixelCrop.height;

            ctx.drawImage(image, pixelCrop.x, pixelCrop.y, pixelCrop.width, pixelCrop.height, 0, 0, pixelCrop.width, pixelCrop.height);

            canvas.toBlob((blob) => {
                if (blob) resolve(blob);
                else reject('Crop to blob failed');
            }, 'image/jpeg');
        };

        image.onerror = () => reject('Image load error');
    });
}

export function resizeImageBlob(blob: Blob, maxSize: number = 400): Promise<Blob> {
    return new Promise((resolve, reject) => {
        const img = new Image();
        img.onload = () => {
            const ratio = Math.min(maxSize / img.width, maxSize / img.height, 1);
            const width = img.width * ratio;
            const height = img.height * ratio;

            const canvas = document.createElement('canvas');
            canvas.width = width;
            canvas.height = height;

            const ctx = canvas.getContext('2d');
            if (!ctx) return reject('Canvas context null');

            ctx.drawImage(img, 0, 0, width, height);
            canvas.toBlob(
                (resizedBlob) => {
                    if (resizedBlob) resolve(resizedBlob);
                    else reject('Resize failed');
                },
                'image/jpeg',
                0.9,
            ); // 0.9 = quality
        };

        img.onerror = reject;
        img.src = URL.createObjectURL(blob);
    });
}
