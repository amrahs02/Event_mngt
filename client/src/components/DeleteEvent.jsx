import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";

const DeleteEvent = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [error, setError] = useState("");

  useEffect(() => {
    const deleteEvent = async () => {
      const confirmed = window.confirm(
        "Are you sure you want to delete this event?"
      );
      if (!confirmed) {
        navigate("/events");
        return;
      }

      try {
        const token = localStorage.getItem("token");
        const response = await fetch(`http://localhost:5000/events/${id}`, {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await response.json();

        if (!response.ok)
          throw new Error(data.error || "Failed to delete event");

        navigate("/events");
      } catch (err) {
        setError(err.message);
      }
    };

    deleteEvent();
  }, [id, navigate]);

  return (
    <div className="text-center mt-10">
      {error ? (
        <p className="text-red-500 font-semibold">{error}</p>
      ) : (
        <p className="text-gray-500">Deleting event...</p>
      )}
    </div>
  );
};

export default DeleteEvent;
