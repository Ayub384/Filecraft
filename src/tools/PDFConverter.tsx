import ToolInterface from '../components/ToolInterface';
import { imageToPDF, textToPDF } from '../utils/pdfProcessing';

interface PDFConverterProps {
  fromFormat: 'jpg' | 'png' | 'webp' | 'txt';
}

export default function PDFConverter({ fromFormat }: PDFConverterProps) {
  const handleConvert = async (files: File[]): Promise<Blob> => {
    if (fromFormat === 'txt') {
      const text = await files[0].text();
      return await textToPDF(text);
    } else {
      return await imageToPDF(files);
    }
  };

  return (
    <ToolInterface
      accept={fromFormat === 'txt' ? 'text/plain' : `image/${fromFormat}`}
      multiple={fromFormat !== 'txt'}
      onProcess={handleConvert}
      outputFileName="converted.pdf"
    >
      <p>
        Upload {fromFormat === 'txt' ? 'a text file' : `${fromFormat.toUpperCase()} image(s)`} to convert to PDF.
        {fromFormat !== 'txt' && ' Multiple images will be placed on separate pages.'}
      </p>
    </ToolInterface>
  );
}
