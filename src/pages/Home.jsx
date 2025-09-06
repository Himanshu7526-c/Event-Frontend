import { useEffect, useState } from "react";
import api from "../api/axios";
import { Link } from "react-router-dom";

export default function Home() {
  const [events, setEvents] = useState([]);
  const [filter, setFilter] = useState("ongoing");

  useEffect(() => {
    const fetchEvents = async () => {
      const res = await api.get(`/events?status=${filter}`);
      setEvents(res.data);
    };
    fetchEvents();
  }, [filter]);

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-semibold">Events</h2>
        <div>
          <label className="mr-2">
            <input
              type="radio"
              value="ongoing"
              checked={filter === "ongoing"}
              onChange={(e) => setFilter(e.target.value)}
            />
            Ongoing
          </label>
          <label>
            <input
              type="radio"
              value="previous"
              checked={filter === "previous"}
              onChange={(e) => setFilter(e.target.value)}
            />
            Previous
          </label>
        </div>
      </div>
      <table className="w-full border-collapse border">
        <thead className="bg-gray-200">
          <tr>
            <th className="border px-2 py-1">S.No</th>
            <th className="border px-2 py-1">Event</th>
            <th className="border px-2 py-1">Date</th>
            <th className="border px-2 py-1">Actions</th>
          </tr>
        </thead>
        <tbody>
          {events.map((event, i) => (
            <tr key={event._id}>
              <td className="border px-2 py-1">{i + 1}</td>
              <td className="border px-2 py-1">
                <Link to={`/events/${event._id}`} className="text-blue-600 underline">
                  {event.name}
                </Link>
              </td>
              <td className="border px-2 py-1">
                {new Date(event.startDate).toLocaleDateString()}
              </td>
              <td className="border px-2 py-1 space-x-2">
                <Link
                  to={`/events/${event._id}`}
                  className="bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-600"
                >
                  Details
                </Link>
                <Link
                  to={`/events/update/${event._id}`}
                  className="bg-green-500 text-white px-2 py-1 rounded hover:bg-green-600"
                >
                  Update
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
