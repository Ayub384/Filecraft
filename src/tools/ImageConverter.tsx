import ToolInterface from '../components/ToolInterface';
import { convertImage } from '../utils/imageProcessing';

interface ImageConverterProps {
  fromFormat: string;
  toFormat: string;
}

export default function ImageConverter({ fromFormat, toFormat }: ImageConverterProps) {
  const handleConvert = async (files: File[]): Promise<Blob> => {
    return await convertImage(files[0], toFormat);
  };

  const getExtension = (format: string) => {
    const map: Record<string, string> = {
      'jpeg': 'jpg',
      'png': 'png',
      'webp': 'webp',
      'avif': 'avif',
      'bmp': 'bmp'
    };
    return map[format] || format;
  };

  return (
    <ToolInterface
      accept={`image/${fromFormat}`}
      multiple={false}
      onProcess={handleConvert}
      outputFileName={`converted.${getExtension(toFormat)}`}
    >
      <p>Upload a {fromFormat.toUpperCase()} image to convert it to {toFormat.toUpperCase()} format.</p>
    </ToolInterface>
  );
}
