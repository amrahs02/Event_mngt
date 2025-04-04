import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const EventList = () => {
  const [events, setEvents] = useState([]);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const limit = 10;
  const navigate = useNavigate();

  useEffect(() => {
    const fetchEvents = async () => {
      setLoading(true);
      setError(null);
      try {
        const token = localStorage.getItem("token");
        const response = await fetch(
          `http://localhost:5000/events?page=${page}&limit=${limit}&search=${encodeURIComponent(
            search
          )}`,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        if (!response.ok) throw new Error("Failed to fetch events");
        const data = await response.json();
        setEvents(data.events);
        setTotal(data.total);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    const debounce = setTimeout(() => fetchEvents(), 500);
    return () => clearTimeout(debounce);
  }, [page, search]);

  const formatDate = (isoDate) => {
    const options = { year: "numeric", month: "short", day: "numeric" };
    return new Date(isoDate).toLocaleDateString(undefined, options);
  };

  return (
    <div className="p-6 sm:w-1/2 w-full   mx-auto rounded-3xl shadow-xl">
      <div className="flex flex-col sm:flex-row justify-between items-center rounded-2xl px-6 py-4 mb-6 mx-4">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-2 sm:mb-0">
          Event List
        </h1>

        <Link
          to="/add-event"
          className="bg-green-500 hover:bg-green-600 text-white px-5 py-2 rounded-xl font-semibold transition"
        >
          + Add Event
        </Link>
      </div>

      <input
        type="text"
        placeholder="Search events..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="w-full border border-gray-300 p-3 mb-6 rounded-3xl focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
      />

      {loading && <p className="text-blue-500">Loading events...</p>}
      {error && <p className="text-red-500">{error}</p>}
      {!loading && !error && events.length === 0 && (
        <p className="text-gray-500">No events found.</p>
      )}
      <ul className="space-y-5 grid grid-cols-2  gap-4">
        {events.map((event) => (
          <li
            key={event.id}
            className="bg-gray-50 p-5 rounded-3xl shadow hover:shadow-md transition"
          >
            <Link to={`/events/${event.id}`}>
              <h2 className="text-xl font-semibold text-blue-600 hover:underline">
                <span className="font-bold"> Event: </span>

                {event.title}
              </h2>
            </Link>
            <p className="text-sm text-gray-500 mt-1">
              <span className="font-bold"> Date: </span>
              {formatDate(event.date)} •
              <span className="font-bold"> Location: </span>
              {event.location}
            </p>
            <div className="flex gap-3 mt-4">
              <Link
                to={`/edit-event/${event.id}`}
                className="bg-blue-400 hover:bg-blue-500 text-white px-4 py-2 rounded-2xl transition"
              >
                Edit
              </Link>
              <button
                onClick={() => navigate(`/delete-event/${event.id}`)}
                className="bg-blue-400 hover:bg-blue-600 text-white px-4 py-2 rounded-2xl transition"
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>

      <div className="flex justify-between items-center mt-8">
        <button
          disabled={page === 1}
          onClick={() => setPage(page - 1)}
          className="px-5 py-2 bg-gray-200 hover:bg-gray-300 rounded-2xl transition disabled:opacity-50 disabled:cursor-not-allowed"
        >
          ← Previous
        </button>
        <span className="font-semibold text-gray-600">Page {page}</span>
        <button
          disabled={page * limit >= total}
          onClick={() => setPage(page + 1)}
          className="px-5 py-2 bg-gray-200 hover:bg-gray-300 rounded-2xl transition disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Next →
        </button>
      </div>
    </div>
  );
};

export default EventList;
