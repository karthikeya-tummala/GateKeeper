'use client';

import { useState } from 'react';
import { Scanner, IDetectedBarcode } from '@yudiel/react-qr-scanner';

export default function QRCodeScanner() {
  const [qrResult, setQRResult] = useState<string | null>(null);

  // Handle the array of detected barcodes
  const handleScan = (detectedCodes: IDetectedBarcode[]) => {
    if (detectedCodes.length > 0) {
      const firstCode = detectedCodes[0];
      if (firstCode.rawValue) {
        setQRResult(firstCode.rawValue);
      } else {
        console.warn('No rawValue found in the detected barcode.');
      }
    }
  };

  // Handle errors during scanning
  const handleError = (error: unknown) => {
    if (error instanceof Error) {
      if (error.name === 'NotAllowedError') {
        alert('Camera access was denied. Please allow camera permissions to scan the QR code.');
      } else {
        console.error('QR Scanner Error:', error.message);
      }
    } else {
      console.error('An unknown error occurred:', error);
    }
  };

  return (
      <div className="container mx-auto p-4">
        <div className="max-w-md mx-auto">
          <h1 className="text-2xl font-bold text-center mb-4">Scan a QR Code</h1>
          <div className="aspect-square overflow-hidden rounded-lg border border-gray-300 shadow-md">
            <Scanner
                onScan={handleScan}
                onError={handleError}
                constraints={{ facingMode: 'environment' }}
                classNames={{
                  container: 'w-full h-full', // Applies to the scanner container
                  video: 'rounded-lg', // Applies to the video stream element
                }}
            />
          </div>
          <div className="mt-4 text-center">
            {qrResult ? (
                <div className="p-4 border rounded-lg bg-green-100">
                  <h2 className="text-lg font-bold">Scanned QR Code:</h2>
                  <p className="text-gray-800 break-words">{qrResult}</p>
                </div>
            ) : (
                <p className="text-gray-500">No QR code scanned yet.</p>
            )}
          </div>
        </div>
      </div>
  );
}
