// src/components/GetProfile.js
import { useEffect, useState } from "react";

const GetProfile = () => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProfile = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        setError("User not logged in");
        return;
      }

      try {
        const res = await fetch("http://localhost:5000/profile", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await res.json();

        if (!res.ok) throw new Error(data.error || "Failed to fetch profile");

        setEmail(data.email);
      } catch (err) {
        setError(err.message);
      }
    };

    fetchProfile();
  }, []);

  if (error) return <p className="text-red-500 text-sm">{error}</p>;
  if (!email) return <p className="text-sm text-gray-500">Loading profile...</p>;
  return (
    <p className="text-sm text-green-700 font-medium bg-green-100 px-4 py-1 rounded-xl shadow-sm">
      Logged in as: {email}
    </p>
  );
  
};

export default GetProfile;
