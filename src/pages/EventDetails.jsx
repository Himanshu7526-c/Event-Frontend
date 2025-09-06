import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../api/axios";
import { useAuth } from "../context/AuthContext";

export default function EventDetails() {
  const { id } = useParams();
  const { user } = useAuth();
  const [event, setEvent] = useState(null);
  const [activity, setActivity] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const res = await api.get(`/events/${id}`, { withCredentials: true });
        setEvent(res.data.event);
        setActivity(res.data.activity);
      } catch (err) {
        console.error(err);
        alert(err.response?.data?.msg || "Error fetching event details");
      } finally {
        setLoading(false);
      }
    };
    fetchEvent();
  }, [id]);

  if (loading) return <div className="p-4 text-center">Loading...</div>;
  if (!event) return <div className="p-4 text-center">Event not found</div>;

  return (
    <div className="min-h-screen bg-gray-100 p-4 flex justify-center">
      <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-2xl">
        <h2 className="text-2xl font-bold mb-2">{event.name}</h2>
        <p className="text-gray-600 mb-1">Location: {event.location}</p>
        <p className="text-gray-600 mb-1">
          Start: {new Date(event.startDateTime).toLocaleString()}
        </p>
        <p className="text-gray-600 mb-1">
          End: {new Date(event.endDateTime).toLocaleString()}
        </p>
        <p className="text-gray-600 mb-3">Attendees: {event.attendeesCount}</p>

        {/* Media */}
        <div className="mb-3">
          {event.media?.photos?.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-3">
              {event.media.photos.map((src, idx) => (
                <img
                  key={idx}
                  src={src}
                  alt={`photo-${idx}`}
                  className="w-24 h-24 object-cover rounded"
                />
              ))}
            </div>
          )}

          {event.media?.mediaCoveragePhotos?.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-3">
              {event.media.mediaCoveragePhotos.map((src, idx) => (
                <img
                  key={idx}
                  src={src}
                  alt={`media-${idx}`}
                  className="w-24 h-24 object-cover rounded"
                />
              ))}
            </div>
          )}

          {event.media?.video && (
            <video controls className="w-full mb-3">
              <source src={event.media.video} type="video/mp4" />
            </video>
          )}
        </div>

        {/* Activity info */}
        {activity && (
          <div className="text-gray-500 text-sm">
            Viewed: {activity.viewed ? "Yes" : "No"} <br />
            Updated: {activity.updated ? "Yes" : "No"}
          </div>
        )}
      </div>
    </div>
  );
}
