import { useState, useEffect } from "react";
import axios from "axios";

export default function Emergency() {
  const [info, setInfo] = useState({ message: "Emergency services are available 24/7." });

  useEffect(() => {
    axios.get("http://localhost:8080/emergency")
      .then((res) => setInfo(res.data))
      .catch(() => alert("Failed to load emergency info"));
  }, []);

  return (
    <div className="p-4">
      <h2 className="text-2xl mb-4">Emergency Help</h2>
      <p>{info.message}</p>
    </div>
  );
}
