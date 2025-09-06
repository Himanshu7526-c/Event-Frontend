import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../api/axios";

export default function AdminReport() {
  const { id } = useParams();
  const [report, setReport] = useState(null);

  useEffect(() => {
    const fetchReport = async () => {
      const res = await api.get(`/events/${id}/report`);
      setReport(res.data);
    };
    fetchReport();
  }, [id]);

  if (!report) return <p className="p-6">Loading...</p>;

  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold mb-4">Event Report</h2>
      <p><strong>Event:</strong> {report.event.name}</p>
      <p><strong>Total Views:</strong> {report.views}</p>
      <p><strong>Total Updates:</strong> {report.updates}</p>
      <table className="w-full border-collapse border mt-4">
        <thead className="bg-gray-200">
          <tr>
            <th className="border px-2 py-1">S.No</th>
            <th className="border px-2 py-1">User</th>
            <th className="border px-2 py-1">Designation</th>
            <th className="border px-2 py-1">Viewed</th>
            <th className="border px-2 py-1">Updated</th>
          </tr>
        </thead>
        <tbody>
          {report.users.map((u, i) => (
            <tr key={u.id}>
              <td className="border px-2 py-1">{i + 1}</td>
              <td className="border px-2 py-1">{u.name}</td>
              <td className="border px-2 py-1">{u.designation}</td>
              <td className="border px-2 py-1">{u.viewed ? "✅" : "❌"}</td>
              <td className="border px-2 py-1">{u.updated ? "✅" : "❌"}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
