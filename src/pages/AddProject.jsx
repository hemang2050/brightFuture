import React, { useState } from "react";

export const AddProject = () => {
  const [form, setForm] = useState({ name: "", area: "", description: "" });
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("http://localhost:5001/api/projects", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (res.ok) setSuccess(true);
      else alert("Failed to create project");
    } catch (err) {
      console.error(err);
      alert("Error creating project");
    }
  };

  return (
    <div className="max-w-md mx-auto mt-12 p-6 bg-white rounded shadow">
      <h2 className="text-2xl font-bold mb-4 text-blue-700 text-center">Add New Project</h2>
      {success && <p className="text-green-600 text-center mb-4">Project created successfully!</p>}
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="name"
          placeholder="Project Name"
          value={form.name}
          onChange={handleChange}
          className="w-full border px-3 py-2 rounded"
          required
        />
        <select
          name="area"
          value={form.area}
          onChange={handleChange}
          className="w-full border px-3 py-2 rounded"
          required
        >
          <option value="">Select Area</option>
          <option value="Education">Education</option>
          <option value="Healthcare">Healthcare</option>
          <option value="Nutrition">Nutrition</option>
          <option value="Mentorship">Mentorship</option>
        </select>
        <textarea
          name="description"
          placeholder="Brief Description"
          value={form.description}
          onChange={handleChange}
          className="w-full border px-3 py-2 rounded"
          rows="4"
          required
        ></textarea>
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
        >
          Create Project
        </button>
      </form>
    </div>
  );
};