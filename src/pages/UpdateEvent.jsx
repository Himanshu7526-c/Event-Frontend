import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../api/axios";

export default function UpdateEvent() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    location: "",
    startDateTime: "",
    endDateTime: "",
    attendeesCount: "",
  });

  const [files, setFiles] = useState({ photos: [], mediaCoveragePhotos: [], video: null });

  useEffect(() => {
    // fetch existing event
    const fetchEvent = async () => {
      try {
        const res = await api.get(`/events/${id}`, { withCredentials: true });
        const ev = res.data.event;
        setForm({
          name: ev.name || "",
          location: ev.location || "",
          startDateTime: ev.startDateTime?.slice(0,16) || "",
          endDateTime: ev.endDateTime?.slice(0,16) || "",
          attendeesCount: ev.attendeesCount || "",
        });
      } catch (err) {
        console.error(err);
      }
    };
    fetchEvent();
  }, [id]);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleFileChange = (e, type) => {
    if (type === "video") setFiles({ ...files, video: e.target.files[0] });
    else setFiles({ ...files, [type]: Array.from(e.target.files) });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    Object.entries(form).forEach(([key, value]) => formData.append(key, value));

    files.photos.forEach(f => formData.append("photos", f));
    files.mediaCoveragePhotos.forEach(f => formData.append("mediaCoveragePhotos", f));
    if (files.video) formData.append("video", files.video);

    try {
      const res = await api.put(`/events/${id}/update`, formData, { withCredentials: true });
      alert("Event updated successfully!");
      navigate(`/events/${id}`);
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.msg || "Error updating event");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center p-4">
      <form onSubmit={handleSubmit} className="bg-white shadow-lg rounded-lg p-6 w-full max-w-lg">
        <h2 className="text-2xl font-bold mb-4 text-center">Update Event</h2>

        {["name", "location", "startDateTime", "endDateTime", "attendeesCount"].map(field => (
          <label key={field} className="block mb-3">
            {field === "attendeesCount" ? "Attendees Count" : field.replace(/([A-Z])/g, " $1")}
            <input
              type={field.includes("DateTime") ? "datetime-local" : field === "attendeesCount" ? "number" : "text"}
              name={field}
              value={form[field]}
              onChange={handleChange}
              className="mt-1 border p-2 rounded w-full"
              required={field !== "attendeesCount"}
            />
          </label>
        ))}

        <label className="block mb-3">
          Photos (max 10)
          <input type="file" multiple accept="image/*" onChange={(e)=>handleFileChange(e, "photos")} className="mt-1 border p-2 rounded w-full cursor-pointer"/>
        </label>

        <label className="block mb-3">
          Media Coverage Photos (max 5)
          <input type="file" multiple accept="image/*" onChange={(e)=>handleFileChange(e, "mediaCoveragePhotos")} className="mt-1 border p-2 rounded w-full cursor-pointer"/>
        </label>

        <label className="block mb-3">
          Video (min 10 MB)
          <input type="file" accept="video/*" onChange={(e)=>handleFileChange(e, "video")} className="mt-1 border p-2 rounded w-full cursor-pointer"/>
        </label>

        <button type="submit" className="bg-blue-600 text-white w-full py-2 rounded hover:bg-blue-700 mt-4">Update Event</button>
      </form>
    </div>
  );
}
