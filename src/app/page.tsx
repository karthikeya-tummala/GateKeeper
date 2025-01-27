'use client';

import { useState } from 'react';
import { Scanner, IDetectedBarcode } from '@yudiel/react-qr-scanner';
import { sendBarcodeToBackend } from "@/utils/scanner";

export default function QRCodeScanner() {
  const [qrResult, setQrResult] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const handleScan = async (detectedCodes: IDetectedBarcode[]) => {
    console.log("Scanning for QR codes...");
    if (detectedCodes.length > 0) {
      const firstCode = detectedCodes[0]; // Get the first detected QR code
      if (firstCode.rawValue) {
        alert(`Scanned QR code: ${firstCode.rawValue}`);
        setQrResult(firstCode.rawValue);

        try {
          setLoading(true);
          console.log("Sending scanned QR code to backend...");
          // Send the scanned QR code data to the backend
          const response = await sendBarcodeToBackend(firstCode.rawValue, setLoading);

          console.log("Received response from backend:", response); // Log backend response

          alert(`Response from backend: ${JSON.stringify(response)}`);

          // Add further handling based on the response if needed
          if (response.output_status === "SUCCESS") {
            console.log("QR code is valid:", response.output_details);
          } else {
            console.warn("QR code is invalid:", response.output_details);
          }
        } catch (error) {
          console.error("Error processing QR code:", error);
        } finally {
          setLoading(false);
        }
      } else {
        console.warn("No rawValue found in the detected QR Code.");
      }
    }
  };

  // Handle errors during scanning
  const handleError = (error: unknown) => {
    if (error instanceof Error) {
      if (error.name === 'NotAllowedError') {
        alert('Camera access was denied. Please allow camera permissions to scan the QR code.');
        console.error("Camera access denied.");
      } else {
        console.error("QR Scanner Error:", error.message);
      }
    } else {
      console.error("An unknown error occurred:", error);
    }
  };

  console.log("Starting QR Code Scanner component...");

  return (
      <div className="container mx-auto p-4">
        <div className="max-w-md mx-auto">
          <h1 className="text-2xl font-bold text-center mb-4">Scan a QR Code</h1>
          <div className="aspect-square overflow-hidden rounded-lg border border-gray-300 shadow-md">
            {!loading ? (
                <Scanner
                    onScan={handleScan}
                    onError={handleError}
                    constraints={{facingMode: 'environment'}}
                    classNames={{
                      container: 'w-full h-full',
                      video: 'rounded-lg',
                    }}
                />
            ) : (
                <div className="flex items-center justify-center h-full">
                  <p className="text-lg font-bold text-blue-600">Processing...</p>
                </div>
            )}
          </div>
          <div className="mt-4 text-center">
            {qrResult ? (
                <div className="p-4 border rounded-lg bg-green-100">
                  <h2 className="text-lg font-bold">Scanned QR Code:</h2>
                  <p className="text-gray-800 break-words">{qrResult}</p>
                </div>
            ) : (
                <p className="text-gray-500">QR code not scanned yet.</p>
            )}
          </div>
        </div>
      </div>
  );
}
