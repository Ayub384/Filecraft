/**
 * iLovePDF Sample Usage - PDF Merge
 * 
 * This file demonstrates how to use the @ilovepdf/ilovepdf-js package
 * to merge multiple PDF files using the iLovePDF API.
 * 
 * Installation:
 * npm install @ilovepdf/ilovepdf-js
 * 
 * Documentation: https://github.com/ilovepdf/ilovepdf-js
 */

import ILovePDFApi from '@ilovepdf/ilovepdf-js';
import ILovePDFFile from '@ilovepdf/ilovepdf-js/ILovePDFFile';

/**
 * Merge multiple PDF files into a single PDF
 * 
 * @param publicKey - Your iLovePDF public API key
 * @param secretKey - Your iLovePDF secret API key
 * @param pdfFiles - Array of PDF file paths to merge
 * @returns Promise that resolves when merge is complete
 */
export async function mergePDFs(
  publicKey: string,
  secretKey: string,
  pdfFiles: string[]
): Promise<void> {
  try {
    // Initialize the iLovePDF API instance
    // TODO: Replace with your actual API keys from https://developer.ilovepdf.com/
    const instance = new ILovePDFApi(publicKey, secretKey);

    // Create a new merge task
    const task = instance.newTask('merge');

    // Start the task
    await task.start();

    // Add files to the task
    for (const filePath of pdfFiles) {
      const file = new ILovePDFFile(filePath);
      await task.addFile(file);
    }

    // Process the merge
    await task.process();

    // Download the merged PDF
    await task.download();

    console.log('PDF merge completed successfully!');
  } catch (error) {
    console.error('Error merging PDFs:', error);
    throw error;
  }
}

/**
 * Example usage:
 * 
 * // TODO: Add your API keys here
 * const PUBLIC_KEY = 'your_public_key_here';
 * const SECRET_KEY = 'your_secret_key_here';
 * 
 * const pdfFiles = [
 *   './path/to/file1.pdf',
 *   './path/to/file2.pdf',
 *   './path/to/file3.pdf'
 * ];
 * 
 * mergePDFs(PUBLIC_KEY, SECRET_KEY, pdfFiles)
 *   .then(() => console.log('Success!'))
 *   .catch((error) => console.error('Failed:', error));
 */
