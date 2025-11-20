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
    const now = new Date();

    if (!formData.title.trim()) newErrors.title = 'Event title is required';
    if (!formData.description.trim()) newErrors.description = 'Description is required';
    if (!formData.eventType) newErrors.eventType = 'Please select an event type';
    if (!formData.thumbnail.trim()) newErrors.thumbnail = 'Thumbnail URL is required';
    if (!formData.location.trim()) newErrors.location = 'Location is required';
    if (!formData.eventDate) newErrors.eventDate = 'Event date is required';

    if (formData.thumbnail && !isValidUrl(formData.thumbnail)) {
      newErrors.thumbnail = 'Please enter a valid URL';
    }

    if (formData.eventDate && formData.eventDate <= now) {
      newErrors.eventDate = 'Event date must be in the future (after the current date and time)';
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

      const createEvent = async (data) => ({ success: true }); // Placeholder
      const result = await createEvent(eventData);

      if (result.success) {
        console.log('Event created successfully!');
        navigate('/upcoming-events');
      }
    } catch (error) {
      console.error('Error creating event:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    // Outer container adjusted for better centering control
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-start py-25 px-10 sm:px-6 dark:bg-gray-900">
      <div className="max-w-2xl mx-auto w-full"> 
        <div className="bg-white rounded-2xl shadow-lg p-6 sm:p-8 dark:bg-gray-800">
          <h2 className="text-3xl font-bold text-center text-gray-900 dark:text-gray-100 mb-8">
            Create <span className='text-[#4fbf8b]'>New Event</span>
          </h2>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Event Title */}
            <div>
              <label htmlFor="title" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Event Title *
              </label>
              <input
                type="text"
                id="title"
                name="title"
                value={formData.title}
                onChange={handleChange}
                placeholder="Enter event title"
                // FIX APPLIED: Added dark mode background and text colors
                className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4fbf8b] focus:border-[#4fbf8b] transition-colors 
                  placeholder-gray-400 dark:placeholder-gray-500 
                  dark:bg-gray-700 dark:text-gray-100 dark:border-gray-600
                  ${errors.title ? 'border-red-500' : 'border-gray-300'}`
                }
              />
              {errors.title && (
                <p className="mt-2 text-sm text-red-600">{errors.title}</p>
              )}
            </div>

            {/* Description */}
            <div>
              <label htmlFor="description" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Description *
              </label>
              <textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="Describe your event in detail..."
                rows="4"
                // FIX APPLIED: Added dark mode background and text colors
                className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4fbf8b] focus:border-[#4fbf8b] transition-colors 
                  placeholder-gray-400 dark:placeholder-gray-500 
                  dark:bg-gray-700 dark:text-gray-100 dark:border-gray-600
                  ${errors.description ? 'border-red-500' : 'border-gray-300'}`
                }
              />
              {errors.description && (
                <p className="mt-2 text-sm text-red-600">{errors.description}</p>
              )}
            </div>

            {/* Event Type */}
            <div>
              <label htmlFor="eventType" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Event Type *
              </label>
              <select
                id="eventType"
                name="eventType"
                value={formData.eventType}
                onChange={handleChange}
                // FIX APPLIED: Added dark mode background and text colors
                className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4fbf8b] focus:border-[#4fbf8b] transition-colors 
                  dark:bg-gray-700 dark:text-gray-100 dark:border-gray-60
                  ${errors.eventType ? 'border-red-500' : 'border-gray-300'}`
                }
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
              <label htmlFor="thumbnail" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Thumbnail Image URL *
              </label>
              <input
                type="text"
                id="thumbnail"
                name="thumbnail"
                value={formData.thumbnail}
                onChange={handleChange}
                placeholder="https://example.com/image.jpg"
                // FIX APPLIED: Added dark mode background and text colors
                className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4fbf8b] focus:border-[#4fbf8b] transition-colors 
                  placeholder-gray-400 dark:placeholder-gray-500 
                  dark:bg-gray-700 dark:text-gray-100 dark:border-gray-600
                  ${errors.thumbnail ? 'border-red-500' : 'border-gray-300'}`
                }
              />
              {errors.thumbnail && (
                <p className="mt-2 text-sm text-red-600">{errors.thumbnail}</p>
              )}
              {formData.thumbnail && isValidUrl(formData.thumbnail) && (
                <div className="mt-3">
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">Image Preview:</p>
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
              <label htmlFor="location" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Location *
              </label>
              <input
                type="text"
                id="location"
                name="location"
                value={formData.location}
                onChange={handleChange}
                placeholder="Select location for the event"
                // FIX APPLIED: Added dark mode background and text colors
                className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4fbf8b] focus:border-[#4fbf8b] transition-colors 
                  placeholder-gray-400 dark:placeholder-gray-500 
                  dark:bg-gray-700 dark:text-gray-100 dark:border-gray-600
                  ${errors.location ? 'border-red-500' : 'border-gray-300'}`
                }
              />
              {errors.location && (
                <p className="mt-2 text-sm text-red-600">{errors.location}</p>
              )}
            </div>

            {/* Event Date */}
            <div>
              <label htmlFor="eventDate" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Event Date *
              </label>
              <DatePicker
                selected={formData.eventDate}
                onChange={handleDateChange}
                minDate={new Date()}
                showTimeSelect
                dateFormat="MMMM d, yyyy h:mm aa"
                placeholderText="Select event date"
                // FIX APPLIED: Added dark mode background and text colors
                className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4fbf8b] focus:border-[#4fbf8b] transition-colors 
                  placeholder-gray-400 dark:placeholder-gray-500
                  dark:bg-gray-700 dark:text-gray-100 dark:border-gray-600
                  ${errors.eventDate ? 'border-red-500' : 'border-gray-300'}`
                }
              />
              {errors.eventDate && (
                <p className="mt-2 text-sm text-red-600">{errors.eventDate}</p>
              )}
            </div>

            {/* Submit Button (The button is already well-styled) */}
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