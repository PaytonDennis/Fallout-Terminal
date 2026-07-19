import { useEffect, useState } from "react";
import { API_URL } from "./config";

function FoodStorageList() {
  const [food, setFood] = useState([]);

  useEffect(() => {
    fetch(`${API_URL}/api/food`)
      .then((res) => res.json())
      .then((msg) => setFood(msg))
      .catch(() => console.error("Error fetching food storage"));
  }, []);

  return (
    <div>
      {food.map((d: any) => (
        <p key={d.id}>
          {d.name} - {d.amount}
        </p>
      ))}
    </div>
  );
}
export default FoodStorageList;
