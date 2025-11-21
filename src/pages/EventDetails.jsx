import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { eventApi } from '../api/eventApi';
import toast from 'react-hot-toast';

const EventDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [joining, setJoining] = useState(false);
  const [alreadyJoined, setAlreadyJoined] = useState(false);

  useEffect(() => {
    fetchEventDetails();
  }, [id]);

  const fetchEventDetails = async () => {
    try {
      setLoading(true);
      const result = await eventApi.getEventById(id);
      if (result.success) {
        setEvent(result.data);
        
        // Check if current user has already joined
        if (user && result.data.participants) {
          const userJoined = result.data.participants.some(
            participant => participant.userEmail === user.email
          );
          setAlreadyJoined(userJoined);
        }
      }
    } catch (error) {
      console.error('Error fetching event:', error);
      toast.error('Failed to load event details');
    } finally {
      setLoading(false);
    }
  };

  const handleJoinEvent = async () => {
    if (!user) {
      toast.error('Please login to join this event');
      navigate('/login');
      return;
    }

    try {
      setJoining(true);
      const result = await eventApi.joinEvent(id, {
        userName: user.displayName,
        userEmail: user.email,
        userPhoto: user.photoURL
      });

      if (result.success) {
        toast.success('🎉 Successfully joined the event!');
        setAlreadyJoined(true);
        // Refresh event data to update participant count
        fetchEventDetails();
      }
    } catch (error) {
      console.error('Error joining event:', error);
      toast.error(error.response?.data?.message || 'Failed to join event');
    } finally {
      setJoining(false);
    }
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

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center dark:bg-gray-900">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#4fbf8b] mx-auto"></div>
          <p className="mt-4 text-gray-600 dark:text-gray-400">Loading event details...</p>
        </div>
      </div>
    );
  }

  if (!event) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center dark:bg-gray-900">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Event Not Found</h2>
          <p className="text-gray-600 dark:text-gray-400 mb-6">The event you're looking for doesn't exist.</p>
          <button
            onClick={() => navigate('/')}
            className="bg-[#4fbf8b] text-white px-6 py-2 rounded-lg hover:bg-[#45a878] transition-colors"
          >
            Back to Home
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Back Button */}
        <button
          onClick={() => navigate(-1)}
          className="flex items-center text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-white mb-6 transition-colors"
        >
          <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Back
        </button>

        {/* Event Header */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden mb-8">
          {/* Event Image */}
          <div className="relative h-80 sm:h-96">
            <img
              src={event.thumbnail}
              alt={event.title}
              className="w-full h-full object-cover"
              onError={(e) => {
                e.target.src = 'https://via.placeholder.com/800x400/4F46E5/FFFFFF?text=Event+Image';
              }}
            />
            <div className={`absolute top-4 right-4 ${getEventTypeColor(event.eventType)} text-white px-4 py-2 rounded-full text-sm font-semibold`}>
              {event.eventType}
            </div>
          </div>

          {/* Event Info */}
          <div className="p-6 sm:p-8">
            <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6">
              {/* Left Column - Event Details */}
              <div className="flex-1">
                <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4">
                  {event.title}
                </h1>
                
                <p className="text-gray-600 dark:text-gray-300 text-lg leading-relaxed mb-6">
                  {event.description}
                </p>

                {/* Event Metadata */}
                <div className="space-y-4 mb-6">
                  <div className="flex items-center text-gray-700 dark:text-gray-300">
                    <svg className="w-5 h-5 mr-3 text-[#4fbf8b]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    <span className="font-medium">{event.location}</span>
                  </div>

                  <div className="flex items-center text-gray-700 dark:text-gray-300">
                    <svg className="w-5 h-5 mr-3 text-[#4fbf8b]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    <span className="font-medium">{formatDate(event.eventDate)}</span>
                  </div>

                  <div className="flex items-center text-gray-700 dark:text-gray-300">
                    <svg className="w-5 h-5 mr-3 text-[#4fbf8b]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                    <span className="font-medium">
                      {event.participantCount || 0} {event.participantCount === 1 ? 'person' : 'people'} joined
                    </span>
                  </div>

                  <div className="flex items-center text-gray-700 dark:text-gray-300">
                    <svg className="w-5 h-5 mr-3 text-[#4fbf8b]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                    <span className="font-medium">Organized by {event.creatorName}</span>
                  </div>
                </div>
              </div>

              {/* Right Column - Join Button */}
              <div className="lg:w-64">
                <div className="bg-gray-50 dark:bg-gray-700 rounded-xl p-6">
                  <div className="text-center mb-4">
                    <div className="text-2xl font-bold text-gray-900 dark:text-white mb-1">
                      {event.participantCount || 0}
                    </div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">
                      Participants
                    </div>
                  </div>

                  {alreadyJoined ? (
                    <div className="text-center">
                      <div className="bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 px-4 py-3 rounded-lg mb-4">
                        <div className="flex items-center justify-center">
                          <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                          You're joined!
                        </div>
                      </div>
                      <button
                        onClick={() => navigate('/joined-events')}
                        className="w-full bg-gray-200 dark:bg-gray-600 text-gray-800 dark:text-white py-3 px-4 rounded-lg font-semibold hover:bg-gray-300 dark:hover:bg-gray-500 transition-colors"
                      >
                        View My Events
                      </button>
                    </div>
                  ) : (
                    <button
                      onClick={handleJoinEvent}
                      disabled={joining}
                      className="w-full bg-[#4fbf8b] text-white py-3 px-4 rounded-lg font-semibold hover:bg-[#45a878] focus:ring-2 focus:ring-[#4fbf8b] focus:ring-offset-2 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {joining ? (
                        <div className="flex items-center justify-center">
                          <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                          Joining...
                        </div>
                      ) : (
                        'Join This Event'
                      )}
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Participants Section */}
        {event.participants && event.participants.length > 0 && (
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 sm:p-8">
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
              Participants ({event.participants.length})
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {event.participants.map((participant, index) => (
                <div key={index} className="flex items-center p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                  <img
                    src={participant.userPhoto || `https://ui-avatars.com/api/?name=${encodeURIComponent(participant.userName)}&background=4fbf8b&color=fff`}
                    alt={participant.userName}
                    className="w-10 h-10 rounded-full mr-3"
                  />
                  <div>
                    <p className="font-medium text-gray-900 dark:text-white">
                      {participant.userName}
                    </p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Joined {new Date(participant.joinedAt).toLocaleDateString()}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default EventDetails;