import React, { useState } from 'react';
import './Myswaps.css';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const mySwapsData = [
  {
    id: 101,
    name: 'Aisha Khan',
    skillShared: 'Graphic Design',
    skillReceived: 'Video Editing',
    avatar: 'https://i.pravatar.cc/150?img=10',
  },
  {
    id: 102,
    name: 'Rohit Verma',
    skillShared: 'App Development',
    skillReceived: 'Business Strategy',
    avatar: 'https://i.pravatar.cc/150?img=12',
  },
  {
    id: 103,
    name: 'Neha Sharma',
    skillShared: 'Photography',
    skillReceived: 'Social Media Marketing',
    avatar: 'https://i.pravatar.cc/150?img=13',
  },
];

export default function Myswaps() {
  const [index, setIndex] = useState(0);

  const next = () => setIndex((prev) => (prev + 1) % mySwapsData.length);
  const prev = () => setIndex((prev) => (prev - 1 + mySwapsData.length) % mySwapsData.length);

  const swap = mySwapsData[index];

  return (
    <div className="myswaps-container">
      <h2 className="heading">My Skill Swaps</h2>

      <div className="swap-card">
        <img src={swap.avatar} alt={swap.name} className="avatar" />
        <h3>{swap.name}</h3>
        <p><strong>Gave:</strong> {swap.skillShared}</p>
        <p><strong>Received:</strong> {swap.skillReceived}</p>

        <div className="swipe-controls">
          <button className="btn" onClick={prev}><ChevronLeft size={24} /></button>
          <button className="btn" onClick={next}><ChevronRight size={24} /></button>
        </div>
      </div>
    </div>
  );
}
