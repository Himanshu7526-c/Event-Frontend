// EventCard.jsx
import React from 'react';

const EventCard = ({ event }) => {
  return (
    <div className="event-card">
      <h3>{event.title}</h3>
      {/* More event details */}
    </div>
  );
};

export default EventCard;
