import React, { useState } from 'react';

interface FileUploadProps {
  onDataChange: (data: { file: File | null; text: string }) => void;
}

const UploadIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-4-4V7a4 4 0 014-4h5l2 2h3a2 2 0 012 2v7a4 4 0 01-4 4H7z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 11v6m0 0l-3-3m3 3l3-3" />
    </svg>
);


export const FileUpload: React.FC<FileUploadProps> = ({ onDataChange }) => {
  const [fileName, setFileName] = useState<string | null>(null);
  const [pastedText, setPastedText] = useState<string>('');

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files ? e.target.files[0] : null;
    if (file) {
      setFileName(file.name);
      setPastedText(''); // Clear pasted text if a file is chosen
      onDataChange({ file, text: '' });
    } else {
      setFileName(null);
      onDataChange({ file: null, text: pastedText });
    }
  };

  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      const text = e.target.value;
      setPastedText(text);
      setFileName(null); // Clear file name if text is entered
      onDataChange({ file: null, text });
  }

  return (
    <div>
        <h3 className="text-xl font-semibold text-gray-700 border-b pb-2 mb-4">4. Upload or Paste Genomic Data</h3>
        
        {/* File Upload Section */}
        <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
            <div className="space-y-1 text-center">
                <UploadIcon />
                <div className="flex text-sm text-gray-600">
                    <label htmlFor="file-upload" className="relative cursor-pointer bg-white rounded-md font-medium text-blue-600 hover:text-blue-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-blue-500">
                        <span>Upload a file</span>
                        <input id="file-upload" name="file-upload" type="file" className="sr-only" onChange={handleFileChange} accept=".vcf,.fasta,.txt" />
                    </label>
                    <p className="pl-1">or drag and drop</p>
                </div>
                <p className="text-xs text-gray-500">VCF, FASTA, or TXT up to 10MB</p>
                {fileName && (
                    <p className="text-sm font-semibold text-green-600 pt-2">
                        File selected: {fileName}
                    </p>
                )}
            </div>
        </div>

        {/* Separator */}
        <div className="mt-6 relative">
            <div className="absolute inset-0 flex items-center" aria-hidden="true">
                <div className="w-full border-t border-gray-300" />
            </div>
            <div className="relative flex justify-center">
                <span className="px-2 bg-white text-sm text-gray-500">OR</span>
            </div>
        </div>
        
        {/* Text Paste Section */}
        <div className="mt-6">
            <label htmlFor="dna-paste" className="block text-sm font-medium text-gray-700">
                Paste DNA Sequence
            </label>
            <div className="mt-1">
                <textarea
                    id="dna-paste"
                    name="dna-paste"
                    rows={6}
                    className="block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm font-mono"
                    placeholder=">ExampleHeader_123&#10;ATCGGCTAGCTAGCTACG..."
                    value={pastedText}
                    onChange={handleTextChange}
                />
            </div>
            <p className="mt-2 text-xs text-gray-500">
                You can paste your raw FASTA or similar format sequence data here.
            </p>
        </div>
    </div>
  );
};