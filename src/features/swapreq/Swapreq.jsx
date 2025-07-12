import React, { useState } from 'react';
import './Swapreq.css';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const dummySwapRequests = [
  {
    id: 1,
    name: 'Aarav Mehta',
    skillOffered: 'Web Development',
    skillWanted: 'UI/UX Design',
    avatar: 'https://i.pravatar.cc/150?img=1',
  },
  {
    id: 2,
    name: 'Sara Kapoor',
    skillOffered: 'Digital Marketing',
    skillWanted: 'Content Writing',
    avatar: 'https://i.pravatar.cc/150?img=2',
  },
  {
    id: 3,
    name: 'Karan Singh',
    skillOffered: 'Python Programming',
    skillWanted: 'Machine Learning Guidance',
    avatar: 'https://i.pravatar.cc/150?img=3',
  },
];

const Swapreq = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % dummySwapRequests.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) =>
      prev === 0 ? dummySwapRequests.length - 1 : prev - 1
    );
  };

  const currentCard = dummySwapRequests[currentIndex];

  return (
    <div className="swapreq-container">
      <h2 className="heading">Skill Swap Requests</h2>

      <div className="card">
        <img src={currentCard.avatar} alt={currentCard.name} className="avatar" />
        <h3>{currentCard.name}</h3>
        <p><strong>Offers:</strong> {currentCard.skillOffered}</p>
        <p><strong>Wants:</strong> {currentCard.skillWanted}</p>

        <div className="swipe-buttons">
          <button className="prev" onClick={handlePrev}>
            <ChevronLeft size={24} />
          </button>
          <button className="next" onClick={handleNext}>
            <ChevronRight size={24} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Swapreq;
