import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { eventApi } from '../api/eventApi';
import EventCard from '../components/EventCard';
import toast from 'react-hot-toast';

const ManageEvents = () => {
  const { user } = useAuth();
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingEvent, setEditingEvent] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [deleteConfirm, setDeleteConfirm] = useState(null);

  useEffect(() => {
    if (user) {
      fetchMyEvents();
    }
  }, [user]);

  const fetchMyEvents = async () => {
    try {
      setLoading(true);
      const result = await eventApi.getUserCreatedEvents();
      if (result.success) {
        // Sort by creation date (newest first)
        const sortedEvents = result.data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        setEvents(sortedEvents);
      }
    } catch (error) {
      console.error('Error fetching my events:', error);
      toast.error('Failed to load your events');
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (event) => {
    setEditingEvent(event);
    setShowEditModal(true);
  };

  const handleUpdateEvent = async (updatedData) => {
    try {
      const result = await eventApi.updateEvent(editingEvent._id, updatedData);
      if (result.success) {
        toast.success('Event updated successfully!');
        setShowEditModal(false);
        setEditingEvent(null);
        fetchMyEvents(); // Refresh the list
      }
    } catch (error) {
      console.error('Error updating event:', error);
      toast.error(error.response?.data?.message || 'Failed to update event');
    }
  };

  const handleDelete = async (eventId) => {
    try {
      const result = await eventApi.deleteEvent(eventId);
      if (result.success) {
        toast.success('Event deleted successfully!');
        setDeleteConfirm(null);
        fetchMyEvents(); // Refresh the list
      }
    } catch (error) {
      console.error('Error deleting event:', error);
      toast.error(error.response?.data?.message || 'Failed to delete event');
    }
  };

  const getEventStats = () => {
    const now = new Date();
    const upcomingCount = events.filter(event => new Date(event.eventDate) >= now).length;
    const pastCount = events.filter(event => new Date(event.eventDate) < now).length;
    const totalParticipants = events.reduce((sum, event) => sum + (event.participantCount || 0), 0);
    
    return { upcomingCount, pastCount, totalCount: events.length, totalParticipants };
  };

  const stats = getEventStats();

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Please Login</h2>
          <p className="text-gray-600 dark:text-gray-400 mb-6">You need to be logged in to manage your events.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-25">
      <div className="max-w-[1280px] mx-auto px-4 w-full ">
        
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Manage <span className="text-[#4fbf8b]">My Events</span>
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            View, edit, and manage all the events you've created. Track participation and keep your events updated.
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 text-center">
            <div className="text-3xl font-bold text-[#4fbf8b] mb-2">{stats.totalCount}</div>
            <div className="text-gray-600 dark:text-gray-400">Total Created</div>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 text-center">
            <div className="text-3xl font-bold text-green-500 mb-2">{stats.upcomingCount}</div>
            <div className="text-gray-600 dark:text-gray-400">Upcoming</div>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 text-center">
            <div className="text-3xl font-bold text-gray-500 mb-2">{stats.pastCount}</div>
            <div className="text-gray-600 dark:text-gray-400">Completed</div>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 text-center">
            <div className="text-3xl font-bold text-blue-500 mb-2">{stats.totalParticipants}</div>
            <div className="text-gray-600 dark:text-gray-400">Total Participants</div>
          </div>
        </div>

        {/* Actions Bar */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 mb-8">
          <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                Your Event Dashboard
              </h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm">
                Manage all your community events in one place
              </p>
            </div>
            
            <div className="flex gap-3">
              <button
                onClick={fetchMyEvents}
                className="flex items-center gap-2 px-4 py-2 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
                Refresh
              </button>
              
              <a
                href="/create-event"
                className="flex items-center gap-2 px-4 py-2 bg-[#4fbf8b] text-white rounded-lg hover:bg-[#45a878] transition-colors"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
                Create New Event
              </a>
            </div>
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
        ) : events.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {events.map(event => (
              <div key={event._id} className="relative group">
                {/* Action Buttons Overlay */}
                <div className="absolute top-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity z-10">
                  <button
                    onClick={() => handleEdit(event)}
                    className="bg-blue-500 text-white p-2 rounded-lg hover:bg-blue-600 transition-colors"
                    title="Edit Event"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                    </svg>
                  </button>
                  
                  <button
                    onClick={() => setDeleteConfirm(event._id)}
                    className="bg-red-500 text-white p-2 rounded-lg hover:bg-red-600 transition-colors"
                    title="Delete Event"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                  </button>
                </div>

                {/* Event Card with Management Info */}
                <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden h-full flex flex-col">
                  <EventCard event={event} />
                  
                  {/* Management Footer */}
                  <div className="p-4 bg-gray-50 dark:bg-gray-700 border-t border-gray-200 dark:border-gray-600">
                    <div className="flex justify-between items-center text-sm">
                      <div className="text-gray-600 dark:text-gray-400">
                        <span className="font-semibold">{event.participantCount || 0}</span> participants
                      </div>
                      <div className={`px-2 py-1 rounded-full text-xs font-medium ${
                        new Date(event.eventDate) < new Date() 
                          ? 'bg-gray-500 text-white' 
                          : 'bg-green-500 text-white'
                      }`}>
                        {new Date(event.eventDate) < new Date() ? 'Completed' : 'Upcoming'}
                      </div>
                    </div>
                    <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                      Created {new Date(event.createdAt).toLocaleDateString()}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8 max-w-md mx-auto">
              <svg className="w-16 h-16 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">No Events Created Yet</h3>
              <p className="text-gray-600 dark:text-gray-400 mb-6">
                You haven't created any events yet. Start organizing community events and make a difference!
              </p>
              <a
                href="/create-event"
                className="inline-flex items-center gap-2 bg-[#4fbf8b] text-white px-6 py-3 rounded-lg hover:bg-[#45a878] transition-colors"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
                Create Your First Event
              </a>
            </div>
          </div>
        )}

        {/* Delete Confirmation Modal */}
        {deleteConfirm && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 max-w-md w-full">
              <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">Delete Event?</h3>
              <p className="text-gray-600 dark:text-gray-400 mb-6">
                Are you sure you want to delete this event? This action cannot be undone and all participant data will be lost.
              </p>
              <div className="flex gap-3 justify-end">
                <button
                  onClick={() => setDeleteConfirm(null)}
                  className="px-4 py-2 text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={() => handleDelete(deleteConfirm)}
                  className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
                >
                  Delete Event
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Edit Event Modal */}
        {showEditModal && editingEvent && (
          <EditEventModal
            event={editingEvent}
            onSave={handleUpdateEvent}
            onClose={() => {
              setShowEditModal(false);
              setEditingEvent(null);
            }}
          />
        )}
      </div>
    </div>
  );
};

// Edit Event Modal Component
const EditEventModal = ({ event, onSave, onClose }) => {
  const [formData, setFormData] = useState({
    title: event.title,
    description: event.description,
    eventType: event.eventType,
    thumbnail: event.thumbnail,
    location: event.location,
    eventDate: new Date(event.eventDate)
  });
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const eventTypes = ['Cleanup', 'Plantation', 'Donation', 'Education', 'Healthcare', 'Other'];

  const validateForm = () => {
    const newErrors = {};
    if (!formData.title.trim()) newErrors.title = 'Event title is required';
    if (!formData.description.trim()) newErrors.description = 'Description is required';
    if (!formData.eventType) newErrors.eventType = 'Please select an event type';
    if (!formData.thumbnail.trim()) newErrors.thumbnail = 'Thumbnail URL is required';
    if (!formData.location.trim()) newErrors.location = 'Location is required';
    if (!formData.eventDate) newErrors.eventDate = 'Event date is required';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setLoading(true);
    try {
      await onSave({
        title: formData.title,
        description: formData.description,
        eventType: formData.eventType,
        thumbnail: formData.thumbnail,
        location: formData.location,
        eventDate: formData.eventDate.toISOString()
      });
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Edit Event</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Form fields same as CreateEvent but with current values */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Event Title *
            </label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4fbf8b] dark:bg-gray-700 dark:text-white dark:border-gray-600 ${
                errors.title ? 'border-red-500' : 'border-gray-300'
              }`}
            />
            {errors.title && <p className="text-red-500 text-sm mt-1">{errors.title}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Description *
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows="4"
              className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4fbf8b] dark:bg-gray-700 dark:text-white dark:border-gray-600 ${
                errors.description ? 'border-red-500' : 'border-gray-300'
              }`}
            />
            {errors.description && <p className="text-red-500 text-sm mt-1">{errors.description}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Event Type *
            </label>
            <select
              name="eventType"
              value={formData.eventType}
              onChange={handleChange}
              className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4fbf8b] dark:bg-gray-700 dark:text-white dark:border-gray-600 ${
                errors.eventType ? 'border-red-500' : 'border-gray-300'
              }`}
            >
              <option value="">Select Event Type</option>
              {eventTypes.map(type => (
                <option key={type} value={type}>{type}</option>
              ))}
            </select>
            {errors.eventType && <p className="text-red-500 text-sm mt-1">{errors.eventType}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Thumbnail URL *
            </label>
            <input
              type="text"
              name="thumbnail"
              value={formData.thumbnail}
              onChange={handleChange}
              className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4fbf8b] dark:bg-gray-700 dark:text-white dark:border-gray-600 ${
                errors.thumbnail ? 'border-red-500' : 'border-gray-300'
              }`}
            />
            {errors.thumbnail && <p className="text-red-500 text-sm mt-1">{errors.thumbnail}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Location *
            </label>
            <input
              type="text"
              name="location"
              value={formData.location}
              onChange={handleChange}
              className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4fbf8b] dark:bg-gray-700 dark:text-white dark:border-gray-600 ${
                errors.location ? 'border-red-500' : 'border-gray-300'
              }`}
            />
            {errors.location && <p className="text-red-500 text-sm mt-1">{errors.location}</p>}
          </div>

          <div className="flex gap-4 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-3 text-gray-600 dark:text-gray-400 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="flex-1 bg-[#4fbf8b] text-white py-3 px-4 rounded-lg font-semibold hover:bg-[#45a878] transition-colors disabled:opacity-50"
            >
              {loading ? 'Updating...' : 'Update Event'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ManageEvents;