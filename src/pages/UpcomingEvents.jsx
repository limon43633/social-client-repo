import { useState, useEffect } from 'react';
import { eventApi } from '../api/eventApi';
import EventCard from '../components/EventCard';
import toast from 'react-hot-toast';

const UpcomingEvents = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    eventType: 'all',
    search: ''
  });

  const eventTypes = ['all', 'Cleanup', 'Plantation', 'Donation', 'Education', 'Healthcare', 'Other'];

  useEffect(() => {
    fetchUpcomingEvents();
  }, [filters]);

  const fetchUpcomingEvents = async () => {
    try {
      setLoading(true);
      const result = await eventApi.getUpcomingEvents(filters);
      if (result.success) {
        setEvents(result.data);
      }
    } catch (error) {
      console.error('Error fetching events:', error);
      toast.error('Failed to load events');
    } finally {
      setLoading(false);
    }
  };

  const handleFilterChange = (key, value) => {
    setFilters(prev => ({
      ...prev,
      [key]: value
    }));
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-30">
      {/* ⭐ ONLY THIS LINE UPDATED BELOW ⭐ */}
      <div className="max-w-[1280px] mx-auto px-4 w-full">

        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Upcoming <span className="text-[#4fbf8b]">Events</span>
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Discover and join community-driven events happening near you. Make a difference in your local area!
          </p>
        </div>

        {/* Filters */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 mb-8">
          <div className="flex flex-col sm:flex-row gap-4 items-center">
            
            {/* Search Input */}
            <div className="flex-1 w-full">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search events by name..."
                  value={filters.search}
                  onChange={(e) => handleFilterChange('search', e.target.value)}
                  className="w-full px-4 py-3 pl-10 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4fbf8b] focus:border-[#4fbf8b] dark:bg-gray-700 dark:text-white placeholder-gray-400 dark:placeholder-gray-500"
                />
                <svg className="absolute left-3 top-3.5 w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
            </div>

            {/* Event Type Filter */}
            <div className="w-full sm:w-64">
              <select
                value={filters.eventType}
                onChange={(e) => handleFilterChange('eventType', e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4fbf8b] focus:border-[#4fbf8b] dark:bg-gray-700 dark:text-white"
              >
                {eventTypes.map(type => (
                  <option key={type} value={type}>
                    {type === 'all' ? 'All Event Types' : type}
                  </option>
                ))}
              </select>
            </div>

            {/* Refresh Button */}
            <button
              onClick={fetchUpcomingEvents}
              className="w-full sm:w-auto bg-[#4fbf8b] text-white px-6 py-3 rounded-lg font-semibold hover:bg-[#45a878] transition-colors flex items-center justify-center"
            >
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
              <p className="mt-4 text-gray-600 dark:text-gray-400">Loading events...</p>
            </div>
          </div>
        ) : events.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {events.map(event => (
              <EventCard key={event._id} event={event} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8 max-w-md mx-auto">
              <svg className="w-16 h-16 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">No Events Found</h3>
              <p className="text-gray-600 dark:text-gray-400 mb-6">
                {filters.eventType !== 'all' || filters.search 
                  ? 'No events match your current filters. Try adjusting your search criteria.'
                  : 'No upcoming events at the moment. Check back later or create your own event!'
                }
              </p>
              {filters.eventType !== 'all' || filters.search ? (
                <button
                  onClick={() => setFilters({ eventType: 'all', search: '' })}
                  className="bg-[#4fbf8b] text-white px-6 py-2 rounded-lg hover:bg-[#45a878] transition-colors"
                >
                  Clear Filters
                </button>
              ) : null}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default UpcomingEvents;
