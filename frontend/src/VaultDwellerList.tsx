import { useEffect, useState } from "react";

function VaultDwellerList() {
  const [dwellers, setDwellers] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8080/api/dwellers")
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
