import { loadImageFromFile } from './imageProcessing';

export const imageToPDF = async (files: File[]): Promise<Blob> => {
  // Use pdf-lib for reliable PDF generation
  const { PDFDocument } = await import('pdf-lib');
  
  const pdfDoc = await PDFDocument.create();
  
  for (const file of files) {
    const arrayBuffer = await file.arrayBuffer();
    
    let image;
    if (file.type === 'image/png') {
      image = await pdfDoc.embedPng(arrayBuffer);
    } else if (file.type === 'image/jpeg' || file.type === 'image/jpg') {
      image = await pdfDoc.embedJpg(arrayBuffer);
    } else {
      // For other formats, convert via canvas
      const img = await loadImageFromFile(file);
      const canvas = document.createElement('canvas');
      canvas.width = img.width;
      canvas.height = img.height;
      
      const ctx = canvas.getContext('2d');
      if (!ctx) throw new Error('Failed to get canvas context');
      
      ctx.drawImage(img, 0, 0);
      const jpegData = canvas.toDataURL('image/jpeg', 0.92);
      const base64Data = jpegData.split(',')[1];
      const jpegBytes = Uint8Array.from(atob(base64Data), c => c.charCodeAt(0));
      
      image = await pdfDoc.embedJpg(jpegBytes);
    }
    
    const page = pdfDoc.addPage();
    const { width: pageWidth, height: pageHeight } = page.getSize();
    
    const imgAspect = image.width / image.height;
    const pageAspect = pageWidth / pageHeight;
    
    let drawWidth = pageWidth;
    let drawHeight = pageHeight;
    
    if (imgAspect > pageAspect) {
      drawHeight = pageWidth / imgAspect;
    } else {
      drawWidth = pageHeight * imgAspect;
    }
    
    const xPos = (pageWidth - drawWidth) / 2;
    const yPos = (pageHeight - drawHeight) / 2;
    
    page.drawImage(image, {
      x: xPos,
      y: yPos,
      width: drawWidth,
      height: drawHeight,
    });
  }
  
  const pdfBytes = await pdfDoc.save();
  return new Blob([pdfBytes], { type: 'application/pdf' });
};

export const textToPDF = async (content: string): Promise<Blob> => {
  // Use pdf-lib for reliable PDF generation
  const { PDFDocument, rgb, StandardFonts } = await import('pdf-lib');
  
  const pdfDoc = await PDFDocument.create();
  let currentPage = pdfDoc.addPage();
  const { width, height } = currentPage.getSize();
  const fontSize = 12;
  const margin = 50;
  const lineHeight = 14;
  
  const font = await pdfDoc.embedFont(StandardFonts.Courier);
  
  const lines = content.split('\n');
  let y = height - margin;
  
  for (const line of lines) {
    if (y < margin) {
      // Create new page if needed
      currentPage = pdfDoc.addPage();
      y = currentPage.getSize().height - margin;
    }
    
    // Draw text on current page (even if empty line)
    if (line.trim()) {
      currentPage.drawText(line, {
        x: margin,
        y: y,
        size: fontSize,
        font: font,
        color: rgb(0, 0, 0),
      });
    }
    y -= lineHeight;
  }
  
  const pdfBytes = await pdfDoc.save();
  return new Blob([pdfBytes], { type: 'application/pdf' });
};

export const mergePDFs = async (files: File[]): Promise<Blob> => {
  // Load PDFLib dynamically
  const { PDFDocument } = await import('pdf-lib');
  
  if (files.length === 0) {
    throw new Error('No PDF files provided');
  }
  
  const mergedPdf = await PDFDocument.create();
  
  for (let i = 0; i < files.length; i++) {
    const file = files[i];
    try {
      const arrayBuffer = await file.arrayBuffer();
      
      // Validate it's a PDF
      const uint8Array = new Uint8Array(arrayBuffer);
      const header = String.fromCharCode(...uint8Array.slice(0, 5));
      if (header !== '%PDF-') {
        throw new Error(`File "${file.name}" is not a valid PDF`);
      }
      
      const pdf = await PDFDocument.load(arrayBuffer, { 
        ignoreEncryption: true,
        throwOnInvalidObject: false 
      });
      
      const pageCount = pdf.getPageCount();
      if (pageCount === 0) {
        throw new Error(`File "${file.name}" has no pages`);
      }
      
      const copiedPages = await mergedPdf.copyPages(pdf, pdf.getPageIndices());
      copiedPages.forEach((page) => mergedPdf.addPage(page));
    } catch (error) {
      throw new Error(`Failed to load "${file.name}": ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }
  
  const pdfBytes = await mergedPdf.save();
  return new Blob([pdfBytes], { type: 'application/pdf' });
};

export const signPDF = async (file: File, signatureText: string): Promise<Blob> => {
  // Use pdf-lib for proper PDF signing
  const { PDFDocument, rgb } = await import('pdf-lib');
  
  const arrayBuffer = await file.arrayBuffer();
  const pdfDoc = await PDFDocument.load(arrayBuffer);
  
  // Create signature image
  const canvas = document.createElement('canvas');
  canvas.width = 200;
  canvas.height = 60;

  const ctx = canvas.getContext('2d');
  if (!ctx) throw new Error('Failed to get canvas context');

  ctx.fillStyle = 'white';
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  ctx.strokeStyle = 'black';
  ctx.lineWidth = 1;
  ctx.strokeRect(0, 0, canvas.width, canvas.height);

  ctx.fillStyle = 'black';
  ctx.font = '20px cursive';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText(signatureText, canvas.width / 2, canvas.height / 2);

  const signatureDataUrl = canvas.toDataURL('image/png');
  const base64Data = signatureDataUrl.split(',')[1];
  const signatureBytes = Uint8Array.from(atob(base64Data), c => c.charCodeAt(0));
  
  // Embed signature on last page
  const signatureImage = await pdfDoc.embedPng(signatureBytes);
  const pages = pdfDoc.getPages();
  const lastPage = pages[pages.length - 1];
  const { width, height } = lastPage.getSize();
  
  // Place signature at bottom right
  lastPage.drawImage(signatureImage, {
    x: width - 220,
    y: 20,
    width: 200,
    height: 60,
  });
  
  const pdfBytes = await pdfDoc.save();
  return new Blob([pdfBytes], { type: 'application/pdf' });
};

export const generateSamplePDF = async (): Promise<Blob> => {
  // Use pdf-lib for reliable PDF generation
  const { PDFDocument, rgb, StandardFonts } = await import('pdf-lib');
  
  const pdfDoc = await PDFDocument.create();
  const page = pdfDoc.addPage();
  const { width, height } = page.getSize();
  
  const boldFont = await pdfDoc.embedFont(StandardFonts.HelveticaBold);
  const regularFont = await pdfDoc.embedFont(StandardFonts.Helvetica);
  
  let y = height - 100;
  
  // Title
  page.drawText('Sample PDF Document', {
    x: 100,
    y: y,
    size: 24,
    font: boldFont,
    color: rgb(0, 0, 0),
  });
  
  y -= 40;
  
  // Subtitle
  page.drawText('This is a sample PDF generated by the PDF toolkit.', {
    x: 100,
    y: y,
    size: 12,
    font: regularFont,
    color: rgb(0, 0, 0),
  });
  
  y -= 20;
  
  page.drawText('It demonstrates basic text rendering capabilities.', {
    x: 100,
    y: y,
    size: 12,
    font: regularFont,
    color: rgb(0, 0, 0),
  });
  
  y -= 40;
  
  // Features
  page.drawText('Features:', {
    x: 100,
    y: y,
    size: 12,
    font: boldFont,
    color: rgb(0, 0, 0),
  });
  
  const features = [
    '- Client-side PDF generation',
    '- No external dependencies',
    '- Instant download',
    '- Privacy-focused processing'
  ];
  
  y -= 20;
  for (const feature of features) {
    page.drawText(feature, {
      x: 100,
      y: y,
      size: 12,
      font: regularFont,
      color: rgb(0, 0, 0),
    });
    y -= 16;
  }
  
  const pdfBytes = await pdfDoc.save();
  return new Blob([pdfBytes], { type: 'application/pdf' });
};
