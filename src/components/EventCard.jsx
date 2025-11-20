import { useNavigate } from 'react-router-dom';

const EventCard = ({ event }) => {
  const navigate = useNavigate();

  const handleViewEvent = () => {
    navigate(`/events/${event._id}`);
  };

  const formatDate = (dateString) => {
    const options = { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };

  const getEventTypeColor = (type) => {
    const colors = {
      Cleanup: 'bg-green-500',
      Plantation: 'bg-emerald-600',
      Donation: 'bg-red-600',
      Education: 'bg-blue-600',
      Healthcare: 'bg-purple-600',
      Other: 'bg-gray-600'
    };
    return colors[type] || 'bg-gray-600';
  };

  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1 flex flex-col h-full">
      {/* Event Image */}
      <div className="relative h-48 overflow-hidden">
        <img 
          src={event.thumbnail} 
          alt={event.title}
          className="w-full h-full object-cover"
          onError={(e) => {
            e.target.src = 'https://via.placeholder.com/300x200/4F46E5/FFFFFF?text=Event+Image';
          }}
        />
        <div className={`absolute top-3 right-3 ${getEventTypeColor(event.eventType)} text-white px-3 py-1 rounded-full text-xs font-semibold`}>
          {event.eventType}
        </div>
      </div>
      
      {/* Event Content */}
      <div className="p-6 flex flex-col flex-grow">
        <h3 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2">
          {event.title}
        </h3>
        
        {/* Event Details */}
        <div className="space-y-2 mb-4">
          <div className="flex items-center text-gray-600">
            <span className="mr-2">📍</span>
            <span className="text-sm">{event.location}</span>
          </div>
          
          <div className="flex items-center text-gray-600">
            <span className="mr-2">📅</span>
            <span className="text-sm">{formatDate(event.eventDate)}</span>
          </div>
          
          <div className="flex items-center text-gray-600">
            <span className="mr-2">👤</span>
            <span className="text-sm">By {event.creatorName}</span>
          </div>
        </div>
        
        {/* Description */}
        <p className="text-gray-600 text-sm leading-relaxed mb-4 flex-grow line-clamp-3">
          {event.description}
        </p>
        
        {/* View Event Button */}
        <button 
          onClick={handleViewEvent}
          className="w-full bg-indigo-600 text-white py-2 px-4 rounded-lg font-semibold hover:bg-indigo-700 transition-colors focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
        >
          View Event
        </button>
      </div>
    </div>
  );
};

export default EventCard;