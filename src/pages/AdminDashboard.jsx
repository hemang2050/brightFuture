import React, { useEffect, useState } from "react";
import { 
  ChevronDown, ChevronUp, CheckCircle, XCircle, 
  Users, FileText, DollarSign, AlertCircle, 
  Calendar, Mail, Award, Clipboard
} from "lucide-react";

export const AdminDashboard = () => {
  const [volunteers, setVolunteers] = useState([]);
  const [projects, setProjects] = useState([]);
  const [donations, setDonations] = useState([]);
  const [selectedVolunteer, setSelectedVolunteer] = useState(null);
  const [selectedProject, setSelectedProject] = useState(null);
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("approvals");
  const [expandedCard, setExpandedCard] = useState(null);

  const fetchData = async () => {
    setIsLoading(true);
    try {
      const volRes = await fetch("https://brightfuture-jnvf.onrender.com/api/volunteers");
      const projRes = await fetch("https://brightfuture-jnvf.onrender.com/api/projects");
      const volData = await volRes.json();
      const projData = await projRes.json();
      setVolunteers(volData);
      setProjects(projData);
    } catch (err) {
      console.error("Error fetching data", err);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchDonations = async () => {
    try {
      const res = await fetch("https://brightfuture-jnvf.onrender.com/api/donations");
      const data = await res.json();
      setDonations(data);
    } catch (err) {
      console.error("Failed to fetch donations:", err);
    }
  };

  useEffect(() => {
    fetchData();
    fetchDonations();
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
        showMessage(`✅ Successfully assigned ${selectedVolunteer.name} to ${selectedProject.name}`);
        setSelectedVolunteer(null);
        setSelectedProject(null);
        fetchData();
      } else {
        showMessage("❌ Failed to assign project.");
      }
    } catch (err) {
      console.error(err);
      showMessage("❌ Error while assigning.");
    }
  };

  const showMessage = (msg) => {
    setMessage(msg);
    setTimeout(() => setMessage(""), 5000);
  };

  const updateStatus = async (volunteerId, status) => {
    try {
      const res = await fetch("https://brightfuture-jnvf.onrender.com/api/assign/update-status", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ volunteerId, status })
      });

      if (res.ok) {
        showMessage(status === "approved" ? 
          "✅ Volunteer approved successfully" : 
          "❌ Volunteer application rejected");
        fetchData();
      } else {
        showMessage("Failed to update status.");
      }
    } catch (err) {
      console.error("Error updating status:", err);
    }
  };

  const toggleCardExpansion = (id) => {
    setExpandedCard(expandedCard === id ? null : id);
  };

  const pendingVolunteers = volunteers.filter(v => v.status === "pending");
  const approvedVolunteers = volunteers.filter(v => v.status === "approved");
  
  // Calculate total donations
  const totalDonations = donations.reduce((sum, donation) => sum + donation.amount, 0);

  // Get latest donations
  const latestDonations = [...donations].sort((a, b) => 
    new Date(b.createdAt) - new Date(a.createdAt)
  ).slice(0, 5);

  // Format date nicely
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading dashboard data...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-700 to-blue-900 text-white py-6 px-8 shadow-md">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-3xl font-bold">Admin Dashboard</h1>
          <p className="text-blue-100 mt-1">Bright Future NGO Management Portal</p>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow-sm p-6 border-l-4 border-blue-500">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-gray-500 text-sm">Total Volunteers</p>
                <p className="text-2xl font-bold">{volunteers.length}</p>
              </div>
              <div className="bg-blue-100 p-3 rounded-full">
                <Users className="text-blue-500" size={24} />
              </div>
            </div>
            <p className="text-sm text-gray-500 mt-2">
              {approvedVolunteers.length} approved, {pendingVolunteers.length} pending
            </p>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-6 border-l-4 border-green-500">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-gray-500 text-sm">Total Projects</p>
                <p className="text-2xl font-bold">{projects.length}</p>
              </div>
              <div className="bg-green-100 p-3 rounded-full">
                <FileText className="text-green-500" size={24} />
              </div>
            </div>
            <p className="text-sm text-gray-500 mt-2">
              Active community initiatives
            </p>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-6 border-l-4 border-purple-500">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-gray-500 text-sm">Total Donations</p>
                <p className="text-2xl font-bold">${totalDonations.toLocaleString()}</p>
              </div>
              <div className="bg-purple-100 p-3 rounded-full">
                <DollarSign className="text-purple-500" size={24} />
              </div>
            </div>
            <p className="text-sm text-gray-500 mt-2">
              From {donations.length} contributors
            </p>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-6 border-l-4 border-amber-500">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-gray-500 text-sm">Pending Approvals</p>
                <p className="text-2xl font-bold">{pendingVolunteers.length}</p>
              </div>
              <div className="bg-amber-100 p-3 rounded-full">
                <AlertCircle className="text-amber-500" size={24} />
              </div>
            </div>
            <p className="text-sm text-gray-500 mt-2">
              Volunteer applications awaiting review
            </p>
          </div>
        </div>

        {/* Notification/Message Banner */}
        {message && (
          <div className="mb-6 bg-white border-l-4 border-blue-500 p-4 rounded shadow-sm animate-fadeIn">
            <p className="text-gray-800">{message}</p>
          </div>
        )}

        {/* Tab Navigation */}
        <div className="mb-6 border-b">
          <div className="flex space-x-6">
            <button 
              onClick={() => setActiveTab("approvals")}
              className={`pb-3 px-1 ${activeTab === "approvals" 
                ? "border-b-2 border-blue-600 text-blue-600 font-medium" 
                : "text-gray-500 hover:text-gray-700"}`}
            >
              Pending Approvals
            </button>
            <button 
              onClick={() => setActiveTab("assignments")}
              className={`pb-3 px-1 ${activeTab === "assignments" 
                ? "border-b-2 border-blue-600 text-blue-600 font-medium" 
                : "text-gray-500 hover:text-gray-700"}`}
            >
              Project Assignments
            </button>
            <button 
              onClick={() => setActiveTab("donations")}
              className={`pb-3 px-1 ${activeTab === "donations" 
                ? "border-b-2 border-blue-600 text-blue-600 font-medium" 
                : "text-gray-500 hover:text-gray-700"}`}
            >
              Donations
            </button>
          </div>
        </div>

        {/* Tab Content */}
        {activeTab === "approvals" && (
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold text-gray-800">Pending Volunteer Approvals</h2>
              <span className="bg-amber-100 text-amber-800 text-xs px-3 py-1 rounded-full font-medium">
                {pendingVolunteers.length} pending
              </span>
            </div>
            
            {pendingVolunteers.length === 0 ? (
              <div className="text-center py-10 bg-gray-50 rounded-lg">
                <CheckCircle className="mx-auto text-green-500 mb-3" size={40} />
                <p className="text-gray-600">No pending volunteer requests to approve.</p>
              </div>
            ) : (
              <div className="space-y-4">
                {pendingVolunteers.map((vol) => (
                  <div 
                    key={vol._id} 
                    className="bg-white border rounded-lg shadow-sm overflow-hidden transition-all duration-200"
                  >
                    <div 
                      className="p-4 flex justify-between items-center cursor-pointer hover:bg-gray-50"
                      onClick={() => toggleCardExpansion(vol._id)}
                    >
                      <div className="flex items-center">
                        <div className="bg-blue-100 text-blue-700 p-2 rounded-full mr-4">
                          <Users size={20} />
                        </div>
                        <div>
                          <p className="font-medium text-gray-800">{vol.name}</p>
                          <p className="text-sm text-gray-500">{vol.program} Program</p>
                        </div>
                      </div>
                      <div className="flex items-center">
                        <span className="bg-yellow-100 text-yellow-800 text-xs px-2 py-1 rounded-full mr-3">
                          Pending
                        </span>
                        {expandedCard === vol._id ? 
                          <ChevronUp size={20} className="text-gray-400" /> : 
                          <ChevronDown size={20} className="text-gray-400" />
                        }
                      </div>
                    </div>
                    
                    {expandedCard === vol._id && (
                      <div className="px-4 pb-4 pt-2 border-t bg-gray-50">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                          <div>
                            <p className="text-sm text-gray-500 flex items-center mb-2">
                              <Mail size={16} className="mr-2 text-gray-400" />
                              {vol.email}
                            </p>
                            <p className="text-sm text-gray-500 flex items-center">
                              <Award size={16} className="mr-2 text-gray-400" />
                              Program: {vol.program}
                            </p>
                          </div>
                          <div>
                            {vol.skills && (
                              <p className="text-sm text-gray-500 flex items-center">
                                <Clipboard size={16} className="mr-2 text-gray-400" />
                                Skills: {vol.skills}
                              </p>
                            )}
                            {vol.availability && (
                              <p className="text-sm text-gray-500 flex items-center">
                                <Calendar size={16} className="mr-2 text-gray-400" />
                                Availability: {vol.availability}
                              </p>
                            )}
                          </div>
                        </div>
                        <div className="flex justify-end space-x-2 mt-2">
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              updateStatus(vol._id, "approved");
                            }}
                            className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 flex items-center"
                          >
                            <CheckCircle size={16} className="mr-1" />
                            Approve
                          </button>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              updateStatus(vol._id, "rejected");
                            }}
                            className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 flex items-center"
                          >
                            <XCircle size={16} className="mr-1" />
                            Reject
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {activeTab === "assignments" && (
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Project Assignments</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Volunteers */}
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="text-lg font-medium mb-3 text-gray-700 flex items-center">
                  <Users size={18} className="mr-2 text-blue-600" />
                  Approved Volunteers
                </h3>
                <div className="max-h-96 overflow-y-auto pr-1 space-y-2">
                  {approvedVolunteers.length === 0 ? (
                    <p className="text-gray-500 text-center py-4">No approved volunteers.</p>
                  ) : (
                    approvedVolunteers.map((vol) => (
                      <div
                        key={vol._id}
                        onClick={() => setSelectedVolunteer(vol)}
                        className={`p-3 border rounded-lg cursor-pointer transition-all duration-200 ${
                          selectedVolunteer?._id === vol._id 
                            ? "bg-blue-100 border-blue-300" 
                            : "bg-white hover:bg-blue-50"
                        }`}
                      >
                        <div className="flex justify-between items-center">
                          <p className="font-medium text-gray-800">{vol.name}</p>
                          {vol.assignedProject && (
                            <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">
                              Assigned
                            </span>
                          )}
                        </div>
                        <p className="text-sm text-gray-500">{vol.email}</p>
                        <p className="text-sm text-blue-600 mt-1">Program: {vol.program}</p>
                      </div>
                    ))
                  )}
                </div>
              </div>

              {/* Projects */}
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="text-lg font-medium mb-3 text-gray-700 flex items-center">
                  <FileText size={18} className="mr-2 text-green-600" />
                  Available Projects
                </h3>
                <div className="max-h-96 overflow-y-auto pr-1 space-y-2">
                  {!selectedVolunteer ? (
                    <p className="text-gray-500 text-center py-4">Select a volunteer first</p>
                  ) : projects.filter((proj) => proj.name === selectedVolunteer?.program).length === 0 ? (
                    <p className="text-gray-500 text-center py-4">No matching projects found</p>
                  ) : (
                    projects
                      .filter((proj) => proj.name === selectedVolunteer?.program)
                      .map((proj) => (
                        <div
                          key={proj._id}
                          onClick={() => setSelectedProject(proj)}
                          className={`p-3 border rounded-lg cursor-pointer transition-all duration-200 ${
                            selectedProject?._id === proj._id 
                              ? "bg-green-100 border-green-300" 
                              : "bg-white hover:bg-green-50"
                          }`}
                        >
                          <p className="font-medium text-gray-800">{proj.name}</p>
                          <p className="text-sm text-gray-600">Location: {proj.area}</p>
                          {proj.description && (
                            <p className="text-sm text-gray-500 mt-1 line-clamp-2">{proj.description}</p>
                          )}
                        </div>
                      ))
                  )}
                </div>
              </div>
            </div>

            {/* Assign Button */}
            {selectedVolunteer && selectedProject && (
              <div className="mt-6 text-center">
                <button
                  onClick={handleAssign}
                  className="bg-gradient-to-r from-blue-600 to-blue-700 text-white px-8 py-3 rounded-md hover:from-blue-700 hover:to-blue-800 shadow-sm transition-all"
                >
                  Assign {selectedVolunteer.name} to {selectedProject.name}
                </button>
              </div>
            )}
          </div>
        )}

        {activeTab === "donations" && (
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-gray-800">Donation Records</h2>
              <div className="bg-purple-100 text-purple-800 px-4 py-2 rounded-md">
                <span className="font-medium">Total: ${totalDonations.toLocaleString()}</span>
              </div>
            </div>
            
            {donations.length === 0 ? (
              <div className="text-center py-10 bg-gray-50 rounded-lg">
                <DollarSign className="mx-auto text-gray-400 mb-3" size={40} />
                <p className="text-gray-600">No donations recorded yet.</p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="min-w-full bg-white rounded-lg overflow-hidden">
                  <thead className="bg-gray-50 border-b">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {donations.map((donation) => (
                      <tr key={donation._id} className="hover:bg-gray-50 transition-colors">
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800">{donation.name}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{donation.email}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm">
                          <span className="font-medium text-green-600">${donation.amount.toLocaleString()}</span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {formatDate(donation.createdAt)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
            
            {/* Recent Donations Chart could go here */}
            <div className="mt-8">
              <h3 className="text-lg font-medium mb-3 text-gray-700">Recent Donations</h3>
              <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
                {latestDonations.map((donation, index) => (
                  <div key={donation._id} className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                    <p className="font-medium text-gray-800">${donation.amount}</p>
                    <p className="text-sm text-gray-500 truncate">{donation.name}</p>
                    <p className="text-xs text-gray-400 mt-1">{formatDate(donation.createdAt)}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};