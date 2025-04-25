import { useState, useCallback } from 'react';
import { removeBackground } from '@imgly/background-removal';
import { toast } from 'sonner';

interface UseBackgroundRemovalReturn {
  originalImage: string | null;
  processedImage: string | null;
  isLoading: boolean;
  error: string | null;
  handleFileChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleRemoveBackground: () => Promise<void>;
  clearImages: () => void;
}

export function useBackgroundRemoval(): UseBackgroundRemovalReturn {
  const [originalImageFile, setOriginalImageFile] = useState<File | null>(null);
  const [originalImage, setOriginalImage] = useState<string | null>(null);
  const [processedImage, setProcessedImage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  // Clean up object URLs when component unmounts or images change
  const revokeObjectUrls = useCallback(() => {
    if (originalImage) URL.revokeObjectURL(originalImage);
    if (processedImage) URL.revokeObjectURL(processedImage);
  }, [originalImage, processedImage]);

  const handleFileChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      revokeObjectUrls(); // Clean up previous URLs
      setOriginalImage(null);
      setProcessedImage(null);
      setError(null);

      const file = event.target.files?.[0];
      if (file) {
        if (!file.type.startsWith('image/')) {
          setError('Invalid file type. Please upload an image.');
          toast.error('Invalid file type. Please upload an image.');
          setOriginalImageFile(null);
          return;
        }

        // Check file size limits (5MB for free users, can be adjusted based on plan)
        const maxSizeMB = 5;
        const maxSizeBytes = maxSizeMB * 1024 * 1024;
        if (file.size > maxSizeBytes) {
          setError(`File size exceeds the ${maxSizeMB}MB limit. Please upload a smaller image or upgrade your plan.`);
          toast.error(`File size exceeds the ${maxSizeMB}MB limit.`);
          setOriginalImageFile(null);
          return;
        }

        setOriginalImageFile(file);
        setOriginalImage(URL.createObjectURL(file));
      } else {
        setOriginalImageFile(null);
      }
    },
    [revokeObjectUrls]
  );

  const handleRemoveBackground = useCallback(async () => {
    if (!originalImageFile) {
      setError('No image selected.');
      toast.error('Please select an image first.');
      return;
    }

    setIsLoading(true);
    setError(null);
    setProcessedImage(null); // Clear previous processed image
    toast.info('Processing image...', { id: 'processing-toast' });

    try {
      const blob = await removeBackground(originalImageFile, {
        // Configuration options based on user's plan can go here
        publicPath: '/ai-models/', // Path to the model files
        // Additional settings can be configured based on user's plan
      });
      
      revokeObjectUrls(); // Clean up original object URL before setting new ones
      setProcessedImage(URL.createObjectURL(blob));
      toast.success('Background removed successfully!', {
        id: 'processing-toast',
      });
    } catch (err: any) {
      const errorMsg =
        err?.message || 'Failed to remove background. Please try again.';
      setError(errorMsg);
      toast.error(errorMsg, { id: 'processing-toast' });
      console.error('Background removal error:', err);
    } finally {
      setIsLoading(false);
    }
  }, [originalImageFile, revokeObjectUrls]);

  const clearImages = useCallback(() => {
    revokeObjectUrls();
    setOriginalImageFile(null);
    setOriginalImage(null);
    setProcessedImage(null);
    setError(null);
    // Reset file input if possible (requires direct DOM manipulation or key prop trick)
  }, [revokeObjectUrls]);

  // Effect for cleanup
  // useEffect(() => {
  //   return () => revokeObjectUrls();
  // }, [revokeObjectUrls]); // Removed as cleanup is handled in callbacks

  return {
    originalImage,
    processedImage,
    isLoading,
    error,
    handleFileChange,
    handleRemoveBackground,
    clearImages,
  };
} 