import React, { useState } from "react";
import "./dashboard.css"; // Assuming you have a CSS file for styling
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Dashboard = () => {
  const [user, setUser] = useState({
    name: "Ritik Sharma",
    email: "ritik.sharma@example.com",
    phone: "9876543210",
    company: "OpenAI",
    skills: ["React", "JavaScript"]
  });

  const [formData, setFormData] = useState(user);
  const [newSkill, setNewSkill] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "email") return; // Email can't be changed
    setFormData({ ...formData, [name]: value });
  };

  const handleAddSkill = () => {
    const trimmed = newSkill.trim();
    if (trimmed && !formData.skills.includes(trimmed)) {
      setFormData({ ...formData, skills: [...formData.skills, trimmed] });
      setNewSkill("");
    }
  };

  const handleRemoveSkill = (skillToRemove) => {
    setFormData({
      ...formData,
      skills: formData.skills.filter((skill) => skill !== skillToRemove)
    });
  };

  const handleUpdate = (e) => {
    e.preventDefault();
    setUser(formData);
    toast.success("Profile updated successfully!");
  };

  const handleLogout = () => {
    toast.success("You have been logged out.");
  };

  return (
    <div className="dashboard">
      <div className="dashboard-card">
        <h1 className="dashboard-title">User Dashboard</h1>
        <p className="dashboard-subtitle">Manage your profile and skills</p>

        <form onSubmit={handleUpdate} className="dashboard-form">
          <div className="form-group">
            <label>Full Name</label>
            <input
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Your full name"
              required
            />
          </div>

          <div className="form-group">
            <label>Email (not editable)</label>
            <input
              name="email"
              value={formData.email}
              disabled
              className="disabled"
            />
          </div>

          <div className="form-group">
            <label>Phone Number</label>
            <input
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="Enter your phone"
              required
            />
          </div>

          <div className="form-group">
            <label>Company</label>
            <input
              name="company"
              value={formData.company}
              onChange={handleChange}
              placeholder="Where are you working?"
            />
          </div>

          <div className="form-group">
            <label>Skills</label>
            <div className="skills-input">
              <input
                type="text"
                value={newSkill}
                onChange={(e) => setNewSkill(e.target.value)}
                placeholder="Add a skill"
              />
              <button type="button" onClick={handleAddSkill}>
                Add
              </button>
            </div>
            <div className="skills-list">
              {formData.skills.map((skill, index) => (
                <span key={index} className="skill-tag">
                  {skill}
                  <button
                    type="button"
                    onClick={() => handleRemoveSkill(skill)}
                    className="remove-skill"
                  >
                    ×
                  </button>
                </span>
              ))}
            </div>
          </div>

          <div className="form-actions">
            <button type="submit" className="btn btn-primary">Update</button>
            <button type="button" className="btn btn-secondary" onClick={handleLogout}>Logout</button>
          </div>
        </form>
      </div>
      <ToastContainer position="top-center" autoClose={2500} />
    </div>
  );
};

export default Dashboard;
