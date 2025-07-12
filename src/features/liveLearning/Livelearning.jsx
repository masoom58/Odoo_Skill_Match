import React from "react";
import "./Livelearning.css"; // Assuming you have a CSS file for styling

const users = [
  {
    id: 1,
    name: "Aman Verma",
    role: "Frontend Developer",
    email: "aman.verma@example.com",
    company: "TechNova Inc.",
    avatar: "https://randomuser.me/api/portraits/men/32.jpg"
  },
  {
    id: 2,
    name: "Priya Sharma",
    role: "UI/UX Designer",
    email: "priya.sharma@example.com",
    company: "Designify Ltd.",
    avatar: "https://randomuser.me/api/portraits/women/44.jpg"
  },
  {
    id: 3,
    name: "Rahul Mehta",
    role: "Backend Engineer",
    email: "rahul.mehta@example.com",
    company: "DataStack Corp.",
    avatar: "https://randomuser.me/api/portraits/men/75.jpg"
  }
];

const ConnectionPage = () => {
  return (
    <div className="connection-container">
      <h1 className="page-title">Your Connections</h1>
      <div className="user-list">
        {users.map((user) => (
          <div key={user.id} className="user-card">
            <div className="user-info">
              <img src={user.avatar} alt={user.name} className="avatar" />
              <div className="details">
                <h3>{user.name}</h3>
                <p>{user.role}</p>
                <p>{user.company}</p>
                <p className="email">{user.email}</p>
              </div>
            </div>
            <div className="action-buttons">
              <button className="btn video-btn">📹 Video Call</button>
              <button className="btn chat-btn">💬 Chat</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ConnectionPage;
