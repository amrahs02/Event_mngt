// src/components/RSVPButton.js
import { useEffect, useState } from "react";

const RSVPButton = ({ eventId }) => {
  const [email, setEmail] = useState("");
  const [rsvpStatus, setRsvpStatus] = useState("");
  const [loading, setLoading] = useState(false);

  // Fetch user profile to get email
  useEffect(() => {
    const fetchProfile = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        setRsvpStatus("You must be logged in to RSVP.");
        return;
      }

      try {
        const res = await fetch("http://localhost:5000/profile", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await res.json();

        if (res.ok) setEmail(data.email);
        else setRsvpStatus("Unable to fetch profile.");
      } catch (error) {
        setRsvpStatus("Server error fetching profile.");
      }
    };

    fetchProfile();
  }, []);

  const handleRSVP = async () => {
    if (!email) return;

    setLoading(true);
    try {
      const res = await fetch(`http://localhost:5000/events/${eventId}/rsvp`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();

      if (res.ok) {
        setRsvpStatus("Successfully RSVP’d!");
      } else {
        setRsvpStatus(data.error || "Failed to RSVP.");
      }
    } catch (error) {
      setRsvpStatus("Server error while RSVPing.");
    }
    setLoading(false);
  };

  return (
    <div className="mt-4">
      <button
        onClick={handleRSVP}
        disabled={loading || !email}
        className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-4 py-2 rounded-xl transition disabled:opacity-50"
      >
        {loading ? "Processing..." : "RSVP to this event"}
      </button>
      {rsvpStatus && (
        <p className="mt-2 text-sm text-gray-700 font-medium">{rsvpStatus}</p>
      )}
    </div>
  );
};

export default RSVPButton;
    