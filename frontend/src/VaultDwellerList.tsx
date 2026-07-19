import { useEffect, useState } from "react";
import { API_URL } from "./config";

function VaultDwellerList() {
  const [dwellers, setDwellers] = useState([]);

  useEffect(() => {
    fetch(`${API_URL}/api/dwellers`)
      .then((res) => res.json())
      .then((msg) => setDwellers(msg))
      .catch(() => console.error("Error fetching dwellers"));
  }, []);

  return (
    <div>
      {dwellers.map((d: any) => (
        <p key={d.id}>
          {d.name} - {d.occupation}
        </p>
      ))}
    </div>
  );
}

export default VaultDwellerList;
