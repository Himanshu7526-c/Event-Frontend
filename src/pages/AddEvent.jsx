import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import api from "../api/axios";
import { useNavigate } from "react-router-dom";

export default function AddEvent() {
  const { user } = useAuth();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    description: "",
    location: "",
    startDateTime: "",
    endDateTime: "",
    attendeesCount: "",
    eventType: "",
  });

  const [files, setFiles] = useState({
    photos: [],
    mediaCoveragePhotos: [],
    video: null,
  });

  const [previews, setPreviews] = useState({
    photos: [],
    mediaCoveragePhotos: [],
    video: null,
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e, type) => {
    if (type === "video") {
      const videoFile = e.target.files[0];
      if (videoFile && videoFile.size < 10 * 1024 * 1024) {
        alert("Video must be at least 10 MB");
        return;
      }
      setFiles({ ...files, video: videoFile });
      setPreviews({ ...previews, video: URL.createObjectURL(videoFile) });
    } else {
      const selectedFiles = Array.from(e.target.files);
      setFiles({ ...files, [type]: selectedFiles });
      setPreviews({
        ...previews,
        [type]: selectedFiles.map((f) => URL.createObjectURL(f)),
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    Object.entries(form).forEach(([key, value]) => formData.append(key, value));

    files.photos.forEach((f) => formData.append("photos", f));
    files.mediaCoveragePhotos.forEach((f) => formData.append("mediaCoveragePhotos", f));
    if (files.video) formData.append("video", files.video);

    try {
      const res = await api.post("/events", formData, { withCredentials: true });
      alert("Event created successfully!");
      navigate("/"); // redirect
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.msg || "Error creating event");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-lg rounded-lg p-6 w-full max-w-lg space-y-4"
      >
        <h2 className="text-2xl font-semibold text-center">Add Event</h2>

        <input
          type="text"
          name="name"
          value={form.name}
          onChange={handleChange}
          placeholder="Event Name"
          className="border p-2 rounded w-full"
          required
        />

        <textarea
          name="description"
          value={form.description}
          onChange={handleChange}
          placeholder="Description"
          className="border p-2 rounded w-full"
        />

        <input
          type="text"
          name="location"
          value={form.location}
          onChange={handleChange}
          placeholder="Location"
          className="border p-2 rounded w-full"
        />

        <input
          type="datetime-local"
          name="startDateTime"
          value={form.startDateTime}
          onChange={handleChange}
          className="border p-2 rounded w-full"
          required
        />

        <input
          type="datetime-local"
          name="endDateTime"
          value={form.endDateTime}
          onChange={handleChange}
          className="border p-2 rounded w-full"
          required
        />

        <input
          type="number"
          name="attendeesCount"
          value={form.attendeesCount}
          onChange={handleChange}
          placeholder="Attendees Count"
          className="border p-2 rounded w-full"
        />

        <input
          type="text"
          name="eventType"
          value={form.eventType}
          onChange={handleChange}
          placeholder="Event Type"
          className="border p-2 rounded w-full"
        />

        {/* Photos */}
        <div>
          <label>Photos (max 10)</label>
          <input
            type="file"
            multiple
            accept="image/*"
            onChange={(e) => handleFileChange(e, "photos")}
            className="border p-2 rounded w-full cursor-pointer"
          />
          <div className="flex flex-wrap gap-2 mt-2">
            {previews.photos.map((src, idx) => (
              <img key={idx} src={src} alt="preview" className="w-20 h-20 object-cover rounded" />
            ))}
          </div>
        </div>

        {/* Media Coverage Photos */}
        <div>
          <label>Media Coverage Photos (max 5)</label>
          <input
            type="file"
            multiple
            accept="image/*"
            onChange={(e) => handleFileChange(e, "mediaCoveragePhotos")}
            className="border p-2 rounded w-full cursor-pointer"
          />
          <div className="flex flex-wrap gap-2 mt-2">
            {previews.mediaCoveragePhotos.map((src, idx) => (
              <img key={idx} src={src} alt="preview" className="w-20 h-20 object-cover rounded" />
            ))}
          </div>
        </div>

        {/* Video */}
        <div>
          <label>Video (min 10 MB)</label>
          <input
            type="file"
            accept="video/*"
            onChange={(e) => handleFileChange(e, "video")}
            className="border p-2 rounded w-full cursor-pointer"
          />
          {previews.video && (
            <video src={previews.video} controls className="w-full mt-2 rounded" />
          )}
        </div>

        <button
          type="submit"
          className="bg-blue-600 text-white py-2 rounded w-full hover:bg-blue-700"
        >
          Add Event
        </button>
      </form>
    </div>
  );
}
