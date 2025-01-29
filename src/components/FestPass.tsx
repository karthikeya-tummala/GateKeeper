import Image from 'next/image';

export default function MyImage({ name, phone, email, affiliation }) {
  return (
    <div style={{
      display: 'flex', 
      justifyContent: 'center', 
      alignItems: 'center', 
      height: '100vh', 
      width: '100vw',  
      position: 'relative' 
    }}>
      {/* Pass Image */}
      <div style={{ position: 'relative', display: 'inline-block' }}>
        <Image
          src="/img/preranaPass.jpg"  
          alt="Prerana Pass"
          width={500}
          height={300}
        />

        {/* Bottom-Centered Info Box */}
        <div style={{
          position: 'absolute',
          bottom: '2px',
          left: '53%',
          transform: 'translateX(-50%)',
          borderRadius: '5px',
          fontSize: '13px',
          fontWeight: 'bold',
          color: '#FFA500', // Change hex color if needed
          fontFamily: '"Poppins", sans-serif',
          width: '90%', 
          maxWidth: 'auto'
        }}>
          <p>Name: {name || 'Loading...'}</p>
          <p>Phone: {phone || 'Loading...'}</p>
          <p>Email: {email || 'Loading...'}</p>
          <p>Affiliation: {affiliation || 'Loading...'}</p>
        </div>
      </div>
    </div>
  );
}
