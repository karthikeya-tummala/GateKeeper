'use client';

import { useState } from 'react';
import { Scanner, IDetectedBarcode } from '@yudiel/react-qr-scanner';
import { sendBarcodeToBackend } from "@/utils/scanner"; // Restore backend functionality

export default function QRCodeScanner() {
  const [qrResult, setQRResult] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  // Handle the array of detected barcodes
  const handleScan = async (detectedCodes: IDetectedBarcode[]) => {
    if (detectedCodes.length > 0) {
      const firstCode = detectedCodes[0];

      if (firstCode.rawValue) {
        setQRResult(firstCode.rawValue);

        try {
          setLoading(true);
          console.log("Sending scanned QR code to backend...");

          // Send the scanned QR code data to the backend
          const response = await sendBarcodeToBackend(firstCode.rawValue, setLoading);

          if (response && response.status === 200) {
            setQRResult(response.data);
          } else if (response) {
            console.warn("QR code is invalid:", response.output_details);
          } else {
            console.warn("No response received from backend.");
          }
        } catch (error) {
          console.error("Error processing QR code:", error);
        } finally {
          setLoading(false);
        }
      } else {
        console.warn("No rawValue found in the detected barcode.");
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
  <div className="flex flex-col items-center justify-center min-h-screen p-6 bg-gray-50">
    
    {/* Title */}
    <h1 className="text-2xl font-bold text-center mb-6">Scan a QR Code</h1>

    {/* Scanner Section */}
    <div className="flex flex-col items-center w-full max-w-sm p-4 bg-white rounded-xl shadow-lg border border-gray-200">
      
      {/* Scanner Container */}
      <div className="relative w-64 h-64 overflow-hidden rounded-lg border border-gray-300">
        {!loading ? (
          <Scanner
            onScan={handleScan}
            onError={handleError}
            constraints={{ facingMode: 'environment' }}
            classNames={{
              container: 'w-full h-full',
              video: 'rounded-lg',
            }}
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center bg-white/80">
            <p className="text-lg font-semibold text-blue-600">Processing...</p>
          </div>
        )}
      </div>

      {/* Scanned QR Code Result */}
      <div className="w-full mt-4">
        {qrResult ? (
          <div className="p-4 border rounded-lg bg-green-100">
            <h2 className="text-lg font-semibold">Scanned QR Code:</h2>
            <p className="text-gray-800 break-words">qrResult.email</p>
          </div>
        ) : (
          <p className="text-gray-500 text-sm text-center">No QR code scanned yet.</p>
        )}
      </div>

    </div>
  </div>
);

}
