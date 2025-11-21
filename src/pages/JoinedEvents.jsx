import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { eventApi } from '../api/eventApi';
import EventCard from '../components/EventCard';
import toast from 'react-hot-toast';

const JoinedEvents = () => {
  const { user } = useAuth();
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all'); // all, upcoming, past

  useEffect(() => {
    if (user) {
      fetchJoinedEvents();
    }
  }, [user, filter]);

  const fetchJoinedEvents = async () => {
    try {
      setLoading(true);
      const result = await eventApi.getUserJoinedEvents();
      if (result.success) {
        // Sort events by date (closest first)
        const sortedEvents = result.data.sort((a, b) => new Date(a.eventDate) - new Date(b.eventDate));
        setEvents(sortedEvents);
      }
    } catch (error) {
      console.error('Error fetching joined events:', error);
      toast.error('Failed to load your joined events');
    } finally {
      setLoading(false);
    }
  };

  const filterEvents = (events) => {
    const now = new Date();
    switch (filter) {
      case 'upcoming':
        return events.filter(event => new Date(event.eventDate) >= now);
      case 'past':
        return events.filter(event => new Date(event.eventDate) < now);
      default:
        return events;
    }
  };

  const getEventStatus = (eventDate) => {
    const now = new Date();
    const eventDateTime = new Date(eventDate);
    
    if (eventDateTime < now) {
      return {
        text: 'Completed',
        color: 'bg-gray-500',
        textColor: 'text-gray-700 dark:text-gray-300'
      };
    } else if ((eventDateTime - now) / (1000 * 60 * 60 * 24) <= 7) { // Within 7 days
      return {
        text: 'Soon',
        color: 'bg-orange-500',
        textColor: 'text-orange-700 dark:text-orange-300'
      };
    } else {
      return {
        text: 'Upcoming',
        color: 'bg-green-500',
        textColor: 'text-green-700 dark:text-green-300'
      };
    }
  };

  const getStats = () => {
    const now = new Date();
    const upcomingCount = events.filter(event => new Date(event.eventDate) >= now).length;
    const pastCount = events.filter(event => new Date(event.eventDate) < now).length;
    
    return { upcomingCount, pastCount, totalCount: events.length };
  };

  const stats = getStats();
  const filteredEvents = filterEvents(events);

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Please Login</h2>
          <p className="text-gray-600 dark:text-gray-400 mb-6">You need to be logged in to view your joined events.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-30">
      <div className=" max-w-[1280px] mx-auto px-4 w-full">
        
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            My <span className="text-[#4fbf8b]">Joined Events</span>
          </h1>
          <p className="text-lg text-gray-500 dark:text-gray-400 max-w-2xl mx-auto">
            Track all the community events you've committed to join. Never miss an event you signed up for!
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 text-center">
            <div className="text-3xl font-bold text-[#4fbf8b] mb-5">{stats.totalCount}</div>
            <div className="text-gray-600 dark:text-gray-400">Total Joined</div>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 text-center">
            <div className="text-3xl font-bold text-green-500 mb-5">{stats.upcomingCount}</div>
            <div className="text-gray-600 dark:text-gray-400">Upcoming</div>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 text-center">
            <div className="text-3xl font-bold text-gray-500 mb-2">{stats.pastCount}</div>
            <div className="text-gray-600 dark:text-gray-400">Completed</div>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 mb-12">
          <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
            <div className="flex flex-wrap gap-2">
              {['all', 'upcoming', 'past'].map((filterType) => (
                <button
                  key={filterType}
                  onClick={() => setFilter(filterType)}
                  className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                    filter === filterType
                      ? 'bg-[#4fbf8b] text-white'
                      : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600'
                  }`}
                >
                  {filterType === 'all' ? 'All Events' : 
                   filterType === 'upcoming' ? 'Upcoming' : 'Completed'}
                </button>
              ))}
            </div>

            <button
              onClick={fetchJoinedEvents}
              className="flex items-center gap-2 px-4 py-2 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
              Refresh
            </button>
          </div>
        </div>

        {/* Events Grid */}
        {loading ? (
          <div className="flex justify-center items-center py-12">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#4fbf8b] mx-auto"></div>
              <p className="mt-4 text-gray-600 dark:text-gray-400">Loading your events...</p>
            </div>
          </div>
        ) : filteredEvents.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredEvents.map(event => {
              const status = getEventStatus(event.eventDate);
              return (
                <div key={event._id} className="relative">
                  {/* Status Badge */}
                  <div className={`absolute top-4 left-4 ${status.color} text-white px-3 py-1 rounded-full text-xs font-semibold z-10`}>
                    {status.text}
                  </div>
                  <EventCard event={event} />
                </div>
              );
            })}
          </div>
        ) : (
          <div className="text-center py-12">
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8 max-w-md mx-auto">
              <svg className="w-16 h-16 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                {filter === 'all' ? 'No Joined Events Yet' :
                 filter === 'upcoming' ? 'No Upcoming Events' : 'No Completed Events'}
              </h3>
              <p className="text-gray-600 dark:text-gray-400 mb-6">
                {filter === 'all' 
                  ? "You haven't joined any events yet. Browse upcoming events and make a difference in your community!"
                  : filter === 'upcoming'
                  ? "You don't have any upcoming events. Join some events to see them here!"
                  : "You haven't completed any events yet. Your participation history will appear here."
                }
              </p>
              {filter !== 'all' && (
                <button
                  onClick={() => setFilter('all')}
                  className="bg-[#4fbf8b] text-white px-6 py-2 rounded-lg hover:bg-[#45a878] transition-colors"
                >
                  View All Events
                </button>
              )}
            </div>
          </div>
        )}

        {/* Quick Tips */}
        {!loading && filteredEvents.length > 0 && (
          <div className="mt-8 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-2xl p-6">
            <div className="flex items-start">
              <svg className="w-5 h-5 text-blue-500 mt-0.5 mr-3 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
              </svg>
              <div>
                <h4 className="font-semibold text-blue-800 dark:text-blue-300 mb-1">Event Reminders</h4>
                <p className="text-blue-700 dark:text-blue-400 text-sm">
                  • Make sure to arrive on time for your events<br/>
                  • Contact the event organizer if you have questions<br/>
                  • Your participation makes a real difference!
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default JoinedEvents;
