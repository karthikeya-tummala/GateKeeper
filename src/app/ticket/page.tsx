'use client';

import { useState, useEffect } from 'react';
import MyImage from '@/components/FestPass'; // Import the component

export default function TicketPage() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Simulate fetching user data (replace this with an API call)
    setTimeout(() => {
      setUser({
        name: "Jane Doe",
        phone: "+91 9876543210",
        email: "jane.doe@example.com",
        affiliation: "Non-GITAM Student"
      });
    }, 1000); // Simulated delay
  }, []);

  return (
    <div>
      {user ? (
        <MyImage 
          name={user.name} 
          phone={user.phone} 
          email={user.email} 
          affiliation={user.affiliation} 
        />
      ) : (
        <p>Loading...</p> // Shows while data is loading
      )}
    </div>
  );
}
