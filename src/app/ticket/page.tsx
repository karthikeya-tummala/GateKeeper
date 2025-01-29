"use client";

import { useSearchParams } from "next/navigation";
import MyImage from "@/components/FestPass"; 

export default function TicketPage() {
  // Hook to get URL query parameters
  const searchParams = useSearchParams();

  // Extract the parameters
  const name = searchParams.get("name");
  const phone = searchParams.get("phone");
  const email = searchParams.get("email");
  const affiliation = searchParams.get("affiliation");

  // Decide how to handle missing parameters
  if (!name || !phone || !email || !affiliation) {
    return <div>Loading or missing query params...</div>;
  }

  return (
    <div>
      <MyImage
        name={name}
        phone={phone}
        email={email}
        affiliation={affiliation}
      />
    </div>
  );
}
