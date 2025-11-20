import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { useAuth } from '../context/AuthContext';


const CreateEvent = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    eventType: '',
    thumbnail: '',
    location: '',
    eventDate: null
  });

  const eventTypes = ['Cleanup', 'Plantation', 'Donation', 'Education', 'Healthcare', 'Other'];

  const validateForm = () => {
    const newErrors = {};

    if (!formData.title.trim()) newErrors.title = 'Event title is required';
    if (!formData.description.trim()) newErrors.description = 'Description is required';
    if (!formData.eventType) newErrors.eventType = 'Please select an event type';
    if (!formData.thumbnail.trim()) newErrors.thumbnail = 'Thumbnail URL is required';
    if (!formData.location.trim()) newErrors.location = 'Location is required';
    if (!formData.eventDate) newErrors.eventDate = 'Event date is required';

    // Validate URL format
    if (formData.thumbnail && !isValidUrl(formData.thumbnail)) {
      newErrors.thumbnail = 'Please enter a valid URL';
    }

    // Validate date is in future
    if (formData.eventDate && formData.eventDate <= new Date()) {
      newErrors.eventDate = 'Event date must be in the future';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const isValidUrl = (string) => {
    try {
      new URL(string);
      return true;
    } catch (_) {
      return false;
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleDateChange = (date) => {
    setFormData(prev => ({
      ...prev,
      eventDate: date
    }));

    if (errors.eventDate) {
      setErrors(prev => ({
        ...prev,
        eventDate: ''
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    setLoading(true);

    try {
      const eventData = {
        ...formData,
        creatorEmail: user.email,
        creatorName: user.displayName,
        creatorPhoto: user.photoURL,
        createdAt: new Date().toISOString()
      };

      // NOTE: Assuming 'createEvent' function exists globally or is imported
      const createEvent = async (data) => ({ success: true }); // Placeholder
      const result = await createEvent(eventData);

      if (result.success) {
        // Show success toast
        console.log('Event created successfully!');
        navigate('/upcoming-events');
      }
    } catch (error) {
      console.error('Error creating event:', error);
      // Show error toast
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-35 px-4 sm:px-6 lg:px-100">
      <div className="max-w-2xl mx-auto">
        <div className="bg-white rounded-2xl shadow-lg p-6 sm:p-8">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-8">
            Create <span className='text-[#4fbf8b]'>New Event</span>
          </h2>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Event Title */}
            <div>
              <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-2">
                Event Title *
              </label>
              <input
                type="text"
                id="title"
                name="title"
                value={formData.title}
                onChange={handleChange}
                placeholder="Enter event title"
                className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4fbf8b] focus:border-[#4fbf8b] transition-colors ${
                  errors.title ? 'border-red-500' : 'border-gray-300'
                }`}
              />
              {errors.title && (
                <p className="mt-2 text-sm text-red-600">{errors.title}</p>
              )}
            </div>

            {/* Description */}
            <div>
              <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-2">
                Description *
              </label>
              <textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="Describe your event in detail..."
                rows="4"
                // ADDED focus:outline-none
                className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4fbf8b] focus:border-[#4fbf8b] transition-colors ${
                  errors.description ? 'border-red-500' : 'border-gray-300'
                }`}
              />
              {errors.description && (
                <p className="mt-2 text-sm text-red-600">{errors.description}</p>
              )}
            </div>

            {/* Event Type */}
            <div>
              <label htmlFor="eventType" className="block text-sm font-medium text-gray-700 mb-2">
                Event Type *
              </label>
              <select
                id="eventType"
                name="eventType"
                value={formData.eventType}
                onChange={handleChange}
                // ADDED focus:outline-none
                className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4fbf8b] focus:border-[#4fbf8b] transition-colors ${
                  errors.eventType ? 'border-red-500' : 'border-gray-300'
                }`}
              >
                <option value="">Select Event Type</option>
                {eventTypes.map(type => (
                  <option key={type} value={type}>{type}</option>
                ))}
              </select>
              {errors.eventType && (
                <p className="mt-2 text-sm text-red-600">{errors.eventType}</p>
              )}
            </div>

            {/* Thumbnail URL */}
            <div>
              <label htmlFor="thumbnail" className="block text-sm font-medium text-gray-700 mb-2">
                Thumbnail Image URL *
              </label>
              <input
                type="text"
                id="thumbnail"
                name="thumbnail"
                value={formData.thumbnail}
                onChange={handleChange}
                placeholder="https://example.com/image.jpg"
                // ADDED focus:outline-none
                className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4fbf8b] focus:border-[#4fbf8b] transition-colors ${
                  errors.thumbnail ? 'border-red-500' : 'border-gray-300'
                }`}
              />
              {errors.thumbnail && (
                <p className="mt-2 text-sm text-red-600">{errors.thumbnail}</p>
              )}
              {formData.thumbnail && isValidUrl(formData.thumbnail) && (
                <div className="mt-3">
                  <p className="text-sm text-gray-600 mb-2">Image Preview:</p>
                  <img
                    src={formData.thumbnail}
                    alt="Preview"
                    className="w-full max-w-xs h-32 object-cover rounded-lg border"
                    onError={(e) => {
                      e.target.src = 'https://via.placeholder.com/300x200/4F46E5/FFFFFF?text=Invalid+Image+URL';
                    }}
                  />
                </div>
              )}
            </div>

            {/* Location */}
            <div>
              <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-2">
                Location *
              </label>
              <input
                type="text"
                id="location"
                name="location"
                value={formData.location}
                onChange={handleChange}
                placeholder="Select location for the event"
                // ADDED focus:outline-none
                className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4fbf8b] focus:border-[#4fbf8b] transition-colors ${
                  errors.location ? 'border-red-500' : 'border-gray-300'
                }`}
              />
              {errors.location && (
                <p className="mt-2 text-sm text-red-600">{errors.location}</p>
              )}
            </div>

            {/* Event Date */}
            <div>
              <label htmlFor="eventDate" className="block text-sm font-medium text-gray-700 mb-2">
                Event Date *
              </label>
              <DatePicker
                selected={formData.eventDate}
                onChange={handleDateChange}
                minDate={new Date()}
                showTimeSelect
                dateFormat="MMMM d, yyyy h:mm aa"
                placeholderText="Select event date"
                // ADDED focus:outline-none (This targets the input element generated by DatePicker)
                className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4fbf8b] focus:border-[#4fbf8b] transition-colors ${
                  errors.eventDate ? 'border-red-500' : 'border-gray-300'
                }`}
              />
              {errors.eventDate && (
                <p className="mt-2 text-sm text-red-600">{errors.eventDate}</p>
              )}
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-[#4fbf8b] text-white py-3 px-4 rounded-lg font-semibold hover:bg-[#45a878] focus:ring-2 focus:ring-[#4fbf8b] focus:ring-offset-2 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={loading}
            >
              {loading ? (
                <div className="flex items-center justify-center">
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Creating Event...
                </div>
              ) : (
                'Create Event'
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateEvent;