const Banner = () => {
    return (
      <div className="relative bg-gradient-to-br from-[#4fbf8b]/10 via-teal-50 to-cyan-50 min-h-screen flex items-center overflow-hidden py-15 md:py-10">
  
        {/* Animated background elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-[#4fbf8b] rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob"></div>
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-teal-300 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob animation-delay-2000"></div>
          <div className="absolute top-40 left-40 w-80 h-80 bg-cyan-300 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob animation-delay-4000"></div>
        </div>
  
        {/* Content container */}
        <div className="max-w-[1280px] mx-auto px-4 w-full py-8 md:py-12 lg:py-16 relative w-full">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
  
            {/* Left Content (UNCHANGED) */}
            <div className="space-y-8">
              <div className="inline-flex items-center gap-2 bg-white px-4 py-2 rounded-full shadow-lg backdrop-blur-sm border border-[#4fbf8b]/50">
                <span className="relative flex h-3 w-3">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#4fbf8b]/75 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-[#4fbf8b]"></span>
                </span>
                <span className="text-sm font-semibold text-gray-700">Join Community Events</span>
              </div>
  
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
                <span className="text-gray-900">Make a</span><br />
                <span className="bg-gradient-to-r from-[#4fbf8b] via-[#4fbf8b] to-[#4fbf8b] bg-clip-text text-transparent animate-gradient">
                  Difference
                </span><br />
                <span className="text-gray-900">in Your Community</span>
              </h1>
  
              <p className="text-lg md:text-xl text-gray-500 leading-relaxed">
                Connect with like-minded individuals and participate in meaningful social service events.
                From tree plantations to community cleanups, be the change you want to see.
              </p>
  
              <div className="flex flex-wrap gap-3">
                <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-full shadow-md border border-gray-200">
                  <svg className="w-5 h-5 text-[#4fbf8b]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-sm font-medium text-gray-700">Easy to Join</span>
                </div>
  
                <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-full shadow-md border border-gray-200">
                  <svg className="w-5 h-5 text-[#4fbf8b]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                  </svg>
                  <span className="text-sm font-medium text-gray-700">Community Driven</span>
                </div>
  
                <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-full shadow-md border border-gray-200">
                  <svg className="w-5 h-5 text-cyan-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  <span className="text-sm font-medium text-gray-700">Local Events</span>
                </div>
              </div>
  
              <div className="flex flex-col sm:flex-row gap-6 pt-8">
                <button className="group relative px-8 py-4 bg-[#4fbf8b] text-white rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 w-full sm:w-auto">
                  <span className="relative z-10 flex items-center justify-center gap-2">
                    Explore All Events
                    <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                    </svg>
                  </span>
                  <div className="absolute inset-0 rounded-xl bg-[#4fbf8b]/90 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                </button>
  
                <button className="group px-8 py-4 bg-white text-gray-900 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 border-2 border-[#4fbf8b] w-full sm:w-auto">
                  <span className="flex items-center justify-center gap-2">
                    <svg className="w-5 h-5 group-hover:rotate-90 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                    </svg>
                    Create Event
                  </span>
                </button>
              </div>
            </div>
  
            {/* ---------- RIGHT SIDE (UPDATED) ---------- */}
            <div className="relative">
              <div className="grid grid-cols-2 gap-6 relative">
  
                {/* Big Tree Planting Image */}
                <div className="col-span-2 rounded-3xl overflow-hidden shadow-2xl border-4 border-none">
                  <img
                    src="https://i.ibb.co.com/twB6x84p/community-support-kindness-people-depicted-cinematic-style-scene.jpg"
                    alt="Tree Planting"
                    className="w-full h- object-cover"
                  />
                </div>
  
                {/* Free Treatment Image */}
                <div className="rounded-3xl overflow-hidden shadow-2xl border-4 border-none">
                  <img
                    src="https://i.ibb.co.com/pBh4yvj7/group-asian-senior-people-sit-260nw-2161441055.webp"
                    alt="Free medical treatment"
                    className="w-full h-48 object-cover"
                  />
                </div>
  
                {/* Free Food Delivery Image */}
                <div className="rounded-3xl overflow-hidden shadow-2xl border-4 border-none">
                  <img
                    src="https://i.ibb.co.com/wNYqSZnD/istockphoto-1430371766-612x612.jpg"
                    alt="Food delivery"
                    className="w-full h-48 object-cover"
                  />
                </div>
  
                {/* Floating Card */}
                <div className="absolute -bottom-6 left-6 bg-white rounded-2xl p-4 shadow-2xl backdrop-blur-md border border-gray-200 animate-float">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-gradient-to-br from-[#4fbf8b] to-teal-500 rounded-xl flex items-center justify-center">
                      <svg
                        className="w-7 h-7 text-white"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M12 8c-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4-1.79-4-4-4zm0-6C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2z"
                        />
                      </svg>
                    </div>
                    <div>
                      <div className="text-lg font-semibold text-gray-900">Join Our Mission</div>
                      <div className="text-xs text-gray-600">Together we thrive</div>
                    </div>
                  </div>
                </div>
  
              </div>
            </div>
  
          </div>
        </div>
  
        {/* Animations */}
        <style jsx>{`
          @keyframes blob {
            0% { transform: translate(0px, 0px) scale(1); }
            33% { transform: translate(30px, -50px) scale(1.1); }
            66% { transform: translate(-20px, 20px) scale(0.9); }
            100% { transform: translate(0px, 0px) scale(1); }
          }
  
          @keyframes gradient {
            0%, 100% { background-position: 0% 50%; }
            50% { background-position: 100% 50%; }
          }
  
          @keyframes float {
            0%, 100% { transform: translateY(0px); }
            50% { transform: translateY(-20px); }
          }
  
          .animate-blob { animation: blob 7s infinite; }
          .animation-delay-2000 { animation-delay: 2s; }
          .animation-delay-4000 { animation-delay: 4s; }
          .animate-gradient { background-size: 200% 200%; animation: gradient 3s ease infinite; }
          .animate-float { animation: float 3s ease-in-out infinite; }
        `}</style>
      </div>
    );
  };
  
  export default Banner;
  