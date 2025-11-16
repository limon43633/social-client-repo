const Banner = () => {
    return (
        <div className="relative bg-gradient-to-br from-[#4fbf8b]/10 via-teal-50 to-cyan-50 min-h-screen flex items-center overflow-hidden">
        
        {/* Animated background elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-[#4fbf8b] rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob"></div>
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-teal-300 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob animation-delay-2000"></div>
          <div className="absolute top-40 left-40 w-80 h-80 bg-cyan-300 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob animation-delay-4000"></div>
        </div>
  
        {/* Content container */}
        <div className="max-w-[1280px] mx-auto px-4 w-full py-8 md:py-12 lg:py-16 relative w-full">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
  
            {/* Left Content */}
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
  
            {/* Right Image */}
            <div className="relative">
              <div className="relative">
                <div className="absolute -top-6 -left-6 w-72 h-72 bg-gradient-to-br from-[#4fbf8b] to-teal-400 rounded-3xl transform rotate-6 opacity-20 blur-2xl"></div>
                <div className="absolute -bottom-6 -right-6 w-72 h-72 bg-gradient-to-br from-cyan-400 to-blue-400 rounded-3xl transform -rotate-6 opacity-20 blur-2xl"></div>
  
                <div className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-white transform hover:scale-105 transition-transform duration-500">
                  <img 
                    src="https://images.unsplash.com/photo-1559027615-cd4628902d4a?w=800&q=80" 
                    alt="Community volunteers working together"
                    className="w-full h-full object-cover"
                  />
  
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent"></div>
  
                  <div className="absolute top-6 right-6 bg-white rounded-2xl p-4 shadow-xl backdrop-blur-sm border border-gray-200 animate-float">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-gradient-to-br from-[#4fbf8b] to-teal-500 rounded-xl flex items-center justify-center">
                        <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0z" />
                        </svg>
                      </div>
                      <div>
                        <div className="text-2xl font-bold text-gray-900">2.5K+</div>
                        <div className="text-xs text-gray-600">Joined Today</div>
                      </div>
                    </div>
                  </div>
  
                  <div className="absolute bottom-6 left-6 bg-white rounded-2xl p-4 shadow-xl backdrop-blur-sm border border-gray-200 animate-float animation-delay-2000">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-gradient-to-br from-cyan-500 to-blue-500 rounded-xl flex items-center justify-center">
                        <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      </div>
                      <div>
                        <div className="text-2xl font-bold text-gray-900">98%</div>
                        <div className="text-xs text-gray-600">Success Rate</div>
                      </div>
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
  