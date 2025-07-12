import React, { useState, useEffect, useRef } from 'react';
import './Notification.css';
import { Bell } from 'lucide-react';

const notificationsData = [
  {
    id: 1,
    title: 'New connection request',
    message: 'John Doe has sent you a connection request.',
    time: '2h ago',
  },
  {
    id: 2,
    title: 'Job alert',
    message: 'A new job matching your profile was posted.',
    time: '5h ago',
  },
  {
    id: 3,
    title: 'Post engagement',
    message: 'Your post received 10 new likes.',
    time: '1d ago',
  },
];

export default function Notification() {
  const [isOpen, setIsOpen] = useState(false);
  const notificationRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (notificationRef.current && !notificationRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="wrapper" ref={notificationRef}>
      <button className="iconButton" onClick={() => setIsOpen(!isOpen)}>
        <Bell size={20} />
        <span className="badge">{notificationsData.length}</span>
      </button>

      {isOpen && (
        <div className="dropdown">
          <div className="header">Notifications</div>
          <ul className="list">
            {notificationsData.map((notif) => (
              <li key={notif.id} className="notificationItem">
                <div className="title">{notif.title}</div>
                <div className="message">{notif.message}</div>
                <div className="time">{notif.time}</div>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
