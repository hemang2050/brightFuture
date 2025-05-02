// src/pages/AdminDashboard.jsx
import React, { useEffect, useState } from "react";

export const AdminDashboard = () => {
  const [volunteers, setVolunteers] = useState([]);
  const [projects, setProjects] = useState([]);
  const [selectedVolunteer, setSelectedVolunteer] = useState(null);
  const [selectedProject, setSelectedProject] = useState(null);
  const [message, setMessage] = useState("");

  const fetchData = async () => {
    try {
      const volRes = await fetch("https://brightfuture-jnvf.onrender.com/api/volunteers");
      const projRes = await fetch("https://brightfuture-jnvf.onrender.com/api/projects");

      const volData = await volRes.json();
      const projData = await projRes.json();

      setVolunteers(volData);
      setProjects(projData);
    } catch (err) {
      console.error("Error fetching data", err);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleAssign = async () => {
    if (!selectedVolunteer || !selectedProject) return;

    try {
      const response = await fetch("https://brightfuture-jnvf.onrender.com/api/assign", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          volunteerId: selectedVolunteer._id,
          projectId: selectedProject._id,
        }),
      });

      if (response.ok) {
        setMessage(`✅ Assigned ${selectedVolunteer.name} to ${selectedProject.name}`);
        setSelectedVolunteer(null);
        setSelectedProject(null);
        fetchData();
      } else {
        setMessage("❌ Failed to assign project.");
      }
    } catch (err) {
      console.error(err);
      setMessage("❌ Error while assigning.");
    }
  };

  const updateStatus = async (volunteerId, status) => {
    try {
      const res = await fetch("https://brightfuture-jnvf.onrender.com/api/assign/update-status", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ volunteerId, status })
      });

      if (res.ok) {
        fetchData();
      } else {
        alert("Failed to update status.");
      }
    } catch (err) {
      console.error("Error updating status:", err);
    }
  };

  const pendingVolunteers = volunteers.filter(v => v.status === "pending");
  const approvedVolunteers = volunteers.filter(v => v.status === "approved");

  return (
    <div className="p-8 max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold mb-8 text-center">Admin Dashboard</h1>

      {message && (
        <div className="mb-4 text-center text-blue-700 font-medium">{message}</div>
      )}

      {/* Pending Approvals Section */}
      <div className="mb-10">
        <h2 className="text-2xl font-semibold mb-4">Pending Volunteer Approvals</h2>
        {pendingVolunteers.length === 0 ? (
          <p className="text-gray-500">No pending requests.</p>
        ) : (
          <div className="space-y-4">
            {pendingVolunteers.map((vol) => (
              <div key={vol._id} className="bg-white p-4 rounded shadow flex justify-between items-center">
                <div>
                  <p className="font-semibold">{vol.name}</p>
                  <p className="text-sm text-gray-500">{vol.email}</p>
                  <p className="text-sm text-gray-600">Program: {vol.program}</p>
                </div>
                <div className="space-x-2">
                  <button
                    onClick={() => updateStatus(vol._id, "approved")}
                    className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
                  >
                    Approve
                  </button>
                  <button
                    onClick={() => updateStatus(vol._id, "rejected")}
                    className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
                  >
                    Reject
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Assignment Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Volunteer List */}
        <div>
          <h2 className="text-xl mb-2">Approved Volunteers</h2>
          {approvedVolunteers.map((vol) => (
            <div
              key={vol._id}
              onClick={() => setSelectedVolunteer(vol)}
              className={`p-3 mb-2 border rounded cursor-pointer ${
                selectedVolunteer?._id === vol._id ? "bg-blue-100" : ""
              }`}
            >
              <p className="font-semibold">{vol.name} - {vol.program}</p>
              <p className="text-sm text-gray-500">{vol.email}</p>
              {vol.assignedProject && (
                <p className="text-green-600 text-sm">Assigned</p>
              )}
            </div>
          ))}
        </div>

        {/* Filtered Projects */}
        <div>
          <h2 className="text-xl mb-2">Projects</h2>
          {projects
            .filter((proj) => proj.name === selectedVolunteer?.program)
            .map((proj) => (
              <div
                key={proj._id}
                onClick={() => setSelectedProject(proj)}
                className={`p-3 mb-2 border rounded cursor-pointer ${
                  selectedProject?._id === proj._id ? "bg-green-100" : ""
                }`}
              >
                <p className="font-semibold">{proj.name}</p>
                <p className="text-sm text-gray-600">{proj.area}</p>
              </div>
            ))}
        </div>
      </div>

      {/* Assign Button */}
      {selectedVolunteer && selectedProject && (
        <div className="mt-6 text-center">
          <button
            onClick={handleAssign}
            className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
          >
            Assign Project
          </button>
        </div>
      )}
    </div>
  );
};
