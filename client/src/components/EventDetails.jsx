import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import RSVPButton from "./RSVPButton";

const EventDetails = () => {
  const { id } = useParams();
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await fetch(`http://localhost:5000/events/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!res.ok) {
          throw new Error("Event not found");
        }

        const data = await res.json();
        setEvent(data.event || data); // <-- fallback to `data` if `data.event` undefined
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchEvent();
  }, [id]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-[50vh]">
        <p className="text-blue-600 text-lg font-medium">Loading event...</p>
      </div>
    );
  }

  if (error || !event) {
    return (
      <div className="flex justify-center items-center h-[50vh]">
        <p className="text-red-500 text-lg font-medium">
          {error || "No event found."}
        </p>
      </div>
    );
  }

  // Use optional chaining to avoid crashing
  const formattedDate = event?.date
    ? new Date(event.date).toLocaleDateString("en-US", {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    : "Date not available";

  return (
    <div className="max-w-4xl mx-auto mt-16 px-6 sm:px-10">
      <div className="bg-white rounded-3xl shadow-xl p-8 sm:p-12">
        <h1 className="text-4xl font-bold text-gray-800 mb-6">{event.title}</h1>

        <div className="flex flex-col sm:flex-row sm:justify-between gap-4 text-gray-600 text-lg mb-8">
          <p>
            <span className="font-medium">Location:</span> {event.location}
          </p>
          <p>
            <span className="font-medium">Date:</span> {formattedDate}
          </p>
        </div>

        <div className="text-gray-700 text-base leading-relaxed border-t pt-4">
          {event.description ? (
            <p>{event.description}</p>
          ) : (
            <p className="italic text-gray-400">No description provided.</p>
          )}
        </div>
        <div>
          <RSVPButton eventId={event.id} />
        </div>
      </div>
    </div>
  );
};

export default EventDetails;
