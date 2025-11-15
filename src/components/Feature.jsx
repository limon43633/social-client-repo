import { Calendar, Users, MapPin, Bell, Shield, TrendingUp } from 'lucide-react';

const Feature = () => {
  const feature = [
    {
      icon: Calendar,
      title: "Easy Event Creation",
      description: "Create and manage social development events with our intuitive platform in just a few clicks.",
      bgColor: "bg-emerald-50",
      iconColor: "text-emerald-600"
    },
    {
      icon: Users,
      title: "Join Communities",
      description: "Connect with like-minded volunteers and join events that match your interests and location.",
      bgColor: "bg-blue-50",
      iconColor: "text-blue-600"
    },
    {
      icon: MapPin,
      title: "Local Impact",
      description: "Find events happening in your neighborhood and make a direct impact in your community.",
      bgColor: "bg-amber-50",
      iconColor: "text-amber-600"
    },
    {
      icon: Bell,
      title: "Event Notifications",
      description: "Stay updated with real-time notifications about events you've joined or might be interested in.",
      bgColor: "bg-teal-50",
      iconColor: "text-teal-600"
    },
    {
      icon: Shield,
      title: "Safe & Verified",
      description: "All events and users are verified to ensure a safe and trustworthy community experience.",
      bgColor: "bg-indigo-50",
      iconColor: "text-indigo-600"
    },
    {
      icon: TrendingUp,
      title: "Track Your Impact",
      description: "Monitor your contribution and see the collective impact of your community involvement.",
      bgColor: "bg-orange-50",
      iconColor: "text-orange-600"
    }
  ];

  return (
    <div className="relative bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50 overflow-hidden py-16 md:py-24">
      {/* Animated background elements - same as banner */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-emerald-300 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-teal-300 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob animation-delay-2000"></div>
        <div className="absolute top-40 left-40 w-80 h-80 bg-cyan-300 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob animation-delay-4000"></div>
      </div>

      <div className="container mx-auto px-4 relative">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
            <span className="text-gray-900">Why Choose </span>
            <span className="bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-600 bg-clip-text text-transparent">
              CommunityImpact
            </span>
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Everything you need to organize, participate, and make a difference in your local community.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {feature.map((feature, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 border border-gray-100"
            >
              {/* Icon */}
              <div className={`w-14 h-14 ${feature.bgColor} rounded-xl flex items-center justify-center mb-6`}>
                <feature.icon className={`w-7 h-7 ${feature.iconColor}`} />
              </div>

              {/* Title */}
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                {feature.title}
              </h3>

              {/* Description */}
              <p className="text-gray-600 leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>

      <style jsx>{`
        @keyframes blob {
          0% {
            transform: translate(0px, 0px) scale(1);
          }
          33% {
            transform: translate(30px, -50px) scale(1.1);
          }
          66% {
            transform: translate(-20px, 20px) scale(0.9);
          }
          100% {
            transform: translate(0px, 0px) scale(1);
          }
        }
        
        .animate-blob {
          animation: blob 7s infinite;
        }
        
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        
        .animation-delay-4000 {
          animation-delay: 4s;
        }
      `}</style>
    </div>
  );
};

export default Feature;