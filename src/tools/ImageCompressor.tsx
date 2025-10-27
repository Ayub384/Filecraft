import ToolInterface from '../components/ToolInterface';
import { compressImage } from '../utils/imageProcessing';

interface ImageCompressorProps {
  format: string;
}

export default function ImageCompressor({ format }: ImageCompressorProps) {
  const handleCompress = async (files: File[], qualityValue: number): Promise<Blob> => {
    return await compressImage(files[0], qualityValue / 100);
  };

  return (
    <ToolInterface
      accept={`image/${format}`}
      multiple={false}
      onProcess={handleCompress}
      outputFileName={`compressed.${format}`}
      additionalInputs={(params, setParams) => {
        const quality = params.quality || 70;
        return (
          <div>
            <label className="block text-sm font-medium text-white mb-2">
              Quality: {quality}%
            </label>
            <input
              type="range"
              min="10"
              max="100"
              value={quality}
              onChange={(e) => setParams({ ...params, quality: Number(e.target.value) })}
              className="w-full"
            />
            <div className="flex justify-between text-xs text-dark-400 mt-1">
              <span>Smaller file</span>
              <span>Better quality</span>
            </div>
          </div>
        );
      }}
    >
      <p>Upload a {format.toUpperCase()} image to compress it. Adjust the quality slider to balance file size and image quality.</p>
    </ToolInterface>
  );
}
