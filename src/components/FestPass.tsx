import { useState, useEffect } from 'react';
import QRCode from 'react-qr-code';
import Image from 'next/image';

export default function MyImage({ name, phone, email, affiliation }) {
  // If you need to compute something for the QR value, do it here:
  const qrValue = email || 'NoEmail'; // or any string that you want encoded
  
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        // If you want the entire page:
        height: '100vh',
        width: '100vw',
      }}
    >
      {/* LEFT DIV: QR Code */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          marginRight: '20px',  // gap between QR and pass
        }}
      >

        {/* 
          By default, react-qr-code will generate a square SVG.
          The 'size' prop controls the pixel dimension of the QR code.
          e.g., size={128} => 128px x 128px 
        */}

        <QRCode value={qrValue} size={100} />
      </div>

      <div style={{ position: 'relative', display: 'inline-block' }}>
        {/* The base pass image */}
        <Image
          src="/img/preranaPass.jpg"
          alt="Prerana Pass"
          width={500}
          height={300}
        />

        {/* Overlaid Info Box */}
        <div
          style={{
            position: 'absolute',
            bottom: '2px',
            left: '50%',
            transform: 'translateX(-50%)',
            borderRadius: '5px',
            fontSize: '10px',
            fontWeight: 'bold',
            color: '#FFA500', 
            fontFamily: '"Poppins", sans-serif',
            width: '90%',
            maxWidth: 'auto',
          }}
        >
          <p>Name: {name || 'Loading...'}</p>
          <p>Phone: {phone || 'Loading...'}</p>
          <p>Email: {email || 'Loading...'}</p>
          <p>Affiliation: {affiliation || 'Loading...'}</p>
        </div>
      </div>
    </div>
  );
}
