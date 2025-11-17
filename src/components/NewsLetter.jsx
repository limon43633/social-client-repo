import { Mail } from 'lucide-react';

const NewsLetter = () => {
  return (
    <div className="py-18  md:py-24  px-4">
      <div className="max-w-4xl mx-auto pb-18">
        {/* Icon */}
        <div className="flex justify-center mb-8">
          <div className="w-16 h-16 bg-[#4fbf8b] rounded-full flex items-center justify-center">
            <Mail className="w-8 h-8 text-white" />
          </div>
        </div>

        {/* Heading */}
        <div className="text-center mb-8">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="text-gray-900">Stay </span>
            <span className="text-[#4fbf8b]">Connected</span>
          </h2>
          <p className="text-base md:text-lg text-gray-500 max-w-2xl mx-auto">
            Get the latest updates on upcoming events, community stories, and impact reports delivered to your inbox.
          </p>
        </div>

        {/* Email Form */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 max-w-2xl mx-auto mb-4">
          <input
            type="email"
            placeholder="Enter your email address"
            className="w-full sm:flex-1 px-6 py-3 rounded-lg border border-gray-300 focus:border-[#4fbf8b] focus:outline-none text-gray-700 bg-white"
          />
          <button className="w-full sm:w-auto px-8 py-3 bg-[#4fbf8b] hover:bg-[#41a97a] text-white font-medium rounded-lg transition-colors duration-300">
            Subscribe
          </button>
        </div>

        {/* Subscriber Info */}
        <p className="text-center text-sm text-gray-500 mb-16">
          Join 5,000+ subscribers. Unsubscribe at any time.
        </p>

        {/* Benefits - Marquee Animation */}
        <div className="overflow-hidden max-w-3xl mx-auto">
          <div className="flex animate-marquee">
            <div className="flex gap-16 px-8">
              <div className="text-center min-w-[100px]">
                <h3 className="text-lg font-bold text-[#4fbf8b] mb-1">
                  Weekly
                </h3>
                <p className="text-xs text-gray-600">
                  Event Updates
                </p>
              </div>

              <div className="text-center min-w-[100px]">
                <h3 className="text-lg font-bold text-blue-500 mb-1">
                  Monthly
                </h3>
                <p className="text-xs text-gray-600">
                  Impact Reports
                </p>
              </div>

              <div className="text-center min-w-[100px]">
                <h3 className="text-lg font-bold text-amber-500 mb-1">
                  Exclusive
                </h3>
                <p className="text-xs text-gray-600">
                  Tips & Guides
                </p>
              </div>

              <div className="text-center min-w-[100px]">
                <h3 className="text-lg font-bold text-[#4fbf8b] mb-1">
                  Early
                </h3>
                <p className="text-xs text-gray-600">
                  Event Access
                </p>
              </div>
            </div>

            {/* Duplicate for seamless loop */}
            <div className="flex gap-16 px-8">
              <div className="text-center min-w-[100px]">
                <h3 className="text-lg font-bold text-[#4fbf8b] mb-1">
                  Weekly
                </h3>
                <p className="text-xs text-gray-600">
                  Event Updates
                </p>
              </div>

              <div className="text-center min-w-[100px]">
                <h3 className="text-lg font-bold text-blue-500 mb-1">
                  Monthly
                </h3>
                <p className="text-xs text-gray-600">
                  Impact Reports
                </p>
              </div>

              <div className="text-center min-w-[100px]">
                <h3 className="text-lg font-bold text-amber-500 mb-1">
                  Exclusive
                </h3>
                <p className="text-xs text-gray-600">
                  Tips & Guides
                </p>
              </div>

              <div className="text-center min-w-[100px]">
                <h3 className="text-lg font-bold text-[#4fbf8b] mb-1">
                  Early
                </h3>
                <p className="text-xs text-gray-600">
                  Event Access
                </p>
              </div>
            </div>
          </div>
        </div>

        <style jsx>{`
          @keyframes marquee {
            0% {
              transform: translateX(0);
            }
            100% {
              transform: translateX(-50%);
            }
          }

          .animate-marquee {
            animation: marquee 20s linear infinite;
          }

          .animate-marquee:hover {
            animation-play-state: paused;
          }
        `}</style>
      </div>
    </div>
  );
};

export default NewsLetter;