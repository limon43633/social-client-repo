import { Mail, Phone, MapPin, Facebook, Twitter, Instagram, Linkedin, Github, Heart, ArrowRight } from 'lucide-react';

const Footer = () => {
  const quickLinks = [
    { name: 'Home', path: '/' },
    { name: 'Upcoming Events', path: '/upcoming-events' },
    { name: 'Create Event', path: '/create-event' },
    { name: 'About Us', path: '/about' },
  ];

  const resources = [
    { name: 'Blog', path: '/blog' },
    { name: 'Help Center', path: '/help' },
    { name: 'Privacy Policy', path: '/privacy' },
    { name: 'Terms of Service', path: '/terms' },
  ];

  const socialLinks = [
    { icon: Facebook, link: '#', color: 'hover:text-blue-600' },
    { icon: Twitter, link: '#', color: 'hover:text-sky-500' },
    { icon: Instagram, link: '#', color: 'hover:text-pink-600' },
    { icon: Linkedin, link: '#', color: 'hover:text-blue-700' },
    { icon: Github, link: '#', color: 'hover:text-gray-900' },
  ];

  return (
    <footer className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-gray-300">
      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-4 py-8 md:py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12">
          
          {/* Company Info */}
          <div className="space-y-4">
            <h3 className="text-2xl font-extrabold tracking-wider bg-gradient-to-r from-[#4fbf8b] to-[#3cae9e] bg-clip-text text-transparent">
              SOCIALSPARK
            </h3>
            <p className="text-sm text-gray-400 leading-relaxed">
              Building stronger communities through meaningful social service events. Join us in making a difference, one event at a time.
            </p>
            
            {/* Social Links */}
            <div className="flex gap-3 pt-2">
              {socialLinks.map((social, index) => (
                <a
                  key={index}
                  href={social.link}
                  className={`w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 hover:bg-gray-700 ${social.color}`}
                >
                  <social.icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-bold text-white mb-4">Quick Links</h4>
            <ul className="space-y-3">
              {quickLinks.map((link, index) => (
                <li key={index}>
                  <a
                    href={link.path}
                    className="text-sm text-gray-400 hover:text-[#4fbf8b] transition-colors duration-300 flex items-center gap-2 group"
                  >
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4 className="text-lg font-bold text-white mb-4">Resources</h4>
            <ul className="space-y-3">
              {resources.map((resource, index) => (
                <li key={index}>
                  <a
                    href={resource.path}
                    className="text-sm text-gray-400 hover:text-[#4fbf8b] transition-colors duration-300 flex items-center gap-2 group"
                  >
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    {resource.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-bold text-white mb-4">Contact Us</h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3 text-sm text-gray-400">
                <MapPin className="w-5 h-5 text-[#4fbf8b] flex-shrink-0 mt-0.5" />
                <span>Savar, Dhaka Division, Bangladesh</span>
              </li>
              <li className="flex items-center gap-3 text-sm text-gray-400">
                <Mail className="w-5 h-5 text-[#4fbf8b] flex-shrink-0" />
                <a href="mailto:info@socialspark.com" className="hover:text-[#4fbf8b] transition-colors">
                  info@socialspark.com
                </a>
              </li>
              <li className="flex items-center gap-3 text-sm text-gray-400">
                <Phone className="w-5 h-5 text-[#4fbf8b] flex-shrink-0" />
                <a href="tel:+8801234567890" className="hover:text-[#4fbf8b] transition-colors">
                  +880 123 456 7890
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-8 pt-8 border-t border-gray-700">
          <div className="text-center">
            <div className="text-3xl font-bold text-[#4fbf8b] mb-1">500+</div>
            <div className="text-sm text-gray-500">Active Events</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-[#4fbf8b] mb-1">10K+</div>
            <div className="text-sm text-gray-500">Volunteers</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-[#4fbf8b] mb-1">50+</div>
            <div className="text-sm text-gray-500">Communities</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-[#4fbf8b] mb-1">98%</div>
            <div className="text-sm text-gray-500">Success Rate</div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-700">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-gray-500 text-center md:text-left">
              © {new Date().getFullYear()} SOCIALSPARK. All rights reserved.
            </p>
            <p className="text-sm text-gray-500 flex items-center gap-1">
              Made with <Heart className="w-4 h-4 text-red-500 fill-current" /> by SocialSpark Team
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;