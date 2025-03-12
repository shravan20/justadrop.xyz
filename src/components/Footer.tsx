
import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, Mail, Github, Twitter, Facebook, Instagram } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gray-50 pt-16 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-full bg-drop-500 flex items-center justify-center">
                <Heart className="w-4 h-4 text-white" />
              </div>
              <span className="font-bold text-xl text-drop-700">Just A Drop</span>
            </div>
            <p className="text-gray-600 mb-4">
              Connecting compassionate hearts with meaningful opportunities to make a difference.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-drop-600">
                <Twitter size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-drop-600">
                <Facebook size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-drop-600">
                <Instagram size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-drop-600">
                <Github size={20} />
              </a>
            </div>
          </div>

          <div>
            <h3 className="font-semibold text-gray-800 mb-4">For Volunteers</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/opportunities" className="text-gray-600 hover:text-drop-600">
                  Browse Opportunities
                </Link>
              </li>
              <li>
                <Link to="/register" className="text-gray-600 hover:text-drop-600">
                  Create Account
                </Link>
              </li>
              <li>
                <Link to="/dashboard" className="text-gray-600 hover:text-drop-600">
                  My Dashboard
                </Link>
              </li>
              <li>
                <Link to="/faq" className="text-gray-600 hover:text-drop-600">
                  FAQ
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-gray-800 mb-4">For Organizations</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/ngo/register" className="text-gray-600 hover:text-drop-600">
                  Register Organization
                </Link>
              </li>
              <li>
                <Link to="/ngo/login" className="text-gray-600 hover:text-drop-600">
                  Organization Login
                </Link>
              </li>
              <li>
                <Link to="/ngo/dashboard" className="text-gray-600 hover:text-drop-600">
                  Post Opportunities
                </Link>
              </li>
              <li>
                <Link to="/guidelines" className="text-gray-600 hover:text-drop-600">
                  Posting Guidelines
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-gray-800 mb-4">Contact Us</h3>
            <p className="flex items-center text-gray-600 mb-2">
              <Mail size={16} className="mr-2" />
              shravan@ohmyscript.com
            </p>
            <p className="text-gray-600 mb-4">
              Dakshina Kannada, Mangaluru, Karnataka<br />
              India, 575002
            </p>
            <Link
              to="/contact"
              className="inline-block bg-drop-100 text-drop-700 hover:bg-drop-200 px-4 py-2 rounded-md transition"
            >
              Send Message
            </Link>
          </div>
        </div>

        <div className="border-t border-gray-200 pt-8 text-center">
          <p className="text-gray-500 text-sm">
            &copy; {new Date().getFullYear()} Just A Drop. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
