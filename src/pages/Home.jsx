import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom"; // Added Link for proper navigation
import { Sun, Heart, Star, Users, BookOpen, Gift } from "lucide-react";

export const Home = () => {
  const [isLoaded, setIsLoaded] = useState(false);

  // Animation effect when component mounts
  useEffect(() => {
    setIsLoaded(true);
  }, []);

  // Testimonials data
  const testimonials = [
    {
      quote: "Volunteering at Bright Future changed my life and the lives of so many children.",
      author: "Sarah, Volunteer"
    },
    {
      quote: "The programs here have made such a difference for my daughter's confidence.",
      author: "Michael, Parent"
    },
    {
      quote: "I found my purpose helping these amazing kids reach their potential.",
      author: "Emma, Teacher"
    }
  ];

  // Impact statistics
  const impactStats = [
    { number: "5,000+", text: "Children Supported" },
    { number: "120+", text: "Community Programs" },
    { number: "87", text: "Schools Partnered" }
  ];

  // Get current year for footer
  const currentYear = new Date().getFullYear();

  return (
    <div className={`min-h-screen bg-gradient-to-b from-blue-50 to-purple-50 transition-opacity duration-1000 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}>
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute top-20 left-10 text-yellow-400 opacity-20">
          <Star size={64} />
        </div>
        <div className="absolute bottom-20 right-10 text-pink-400 opacity-20">
          <Heart size={80} />
        </div>
        
        <div className="container mx-auto px-4 py-20">
          <div className="flex flex-col items-center">
            {/* Logo and Title */}
            <div className="flex items-center mb-6 mt-6">
              <Sun className="text-yellow-500 mr-3" size={40} />
              <h1 className="text-5xl font-bold leading-tight tracking-wide bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
  Bright Future
</h1>
            </div>
            
            <h2 className="text-2xl font-medium text-gray-700 mb-6 text-center">
              Helping every child shine their brightest
            </h2>
            
            <p className="text-lg mb-10 text-center text-gray-600 max-w-2xl">
              We create safe spaces, educational opportunities, and joyful experiences for children in need around the world.
            </p>
            
            {/* CTA Buttons - Replaced navigate() with Link components */}
            <div className="flex flex-col sm:flex-row gap-4 mb-16">
              <Link 
                to="/signup"
                className="px-8 py-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-full font-medium shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 flex items-center justify-center"
              >
                <Heart className="mr-2" size={18} />
                Join as Volunteer
              </Link>
              <Link
                to="/donate"
                className="px-8 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-full font-medium shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 flex items-center justify-center"
              >
                <Gift className="mr-2" size={18} />
                Make a Donation
              </Link>

            </div>
          </div>
        </div>
      </div>

      {/* Mission Cards */}
      <div className="container mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">Our Programs</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Education Card */}
          <div className="bg-white rounded-lg shadow-lg overflow-hidden transform hover:-translate-y-2 transition-all duration-300">
            <div className="h-3 bg-blue-500"></div>
            <div className="p-6">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mb-4">
                <BookOpen className="text-blue-600" size={28} />
              </div>
              <h3 className="font-bold text-xl mb-3 text-gray-800">Education</h3>
              <p className="text-gray-600">
                Providing access to quality education through tutoring, scholarships, and learning materials.
              </p>
            </div>
          </div>
          
          {/* Community Card */}
          <div className="bg-white rounded-lg shadow-lg overflow-hidden transform hover:-translate-y-2 transition-all duration-300">
            <div className="h-3 bg-purple-500"></div>
            <div className="p-6">
              <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mb-4">
                <Users className="text-purple-600" size={28} />
              </div>
              <h3 className="font-bold text-xl mb-3 text-gray-800">Community</h3>
              <p className="text-gray-600">
                Building safe spaces where children can play, learn, and grow together with positive role models.
              </p>
            </div>
          </div>
          
          {/* Health Card */}
          <div className="bg-white rounded-lg shadow-lg overflow-hidden transform hover:-translate-y-2 transition-all duration-300">
            <div className="h-3 bg-pink-500"></div>
            <div className="p-6">
              <div className="bg-pink-100 w-16 h-16 rounded-full flex items-center justify-center mb-4">
                <Heart className="text-pink-600" size={28} />
              </div>
              <h3 className="font-bold text-xl mb-3 text-gray-800">Health & Wellness</h3>
              <p className="text-gray-600">
                Supporting children's physical and emotional wellbeing through nutrition, healthcare, and counseling.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Impact Statistics */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Our Impact</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            {impactStats.map((stat, index) => (
              <div key={index} className="flex flex-col items-center">
                <div className="text-4xl font-bold mb-2">{stat.number}</div>
                <div className="text-lg opacity-90">{stat.text}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Testimonials */}
      <div className="container mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">What People Say</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="bg-white p-6 rounded-lg shadow-lg">
              <div className="flex text-yellow-500 mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} fill="currentColor" size={24} />
                ))}
              </div>
              <p className="italic text-gray-600 mb-4">"{testimonial.quote}"</p>
              <p className="font-medium text-gray-800">{testimonial.author}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Call to Action */}
      <div className="bg-gray-50 py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6 text-gray-800">Ready to Make a Difference?</h2>
          <p className="text-lg mb-8 max-w-2xl mx-auto text-gray-600">
            Join our community of volunteers, donors, and supporters who are changing children's lives every day.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              to="/signup"
              className="px-8 py-3 bg-blue-600 text-white rounded-full font-medium shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300"
            >
              Become a Volunteer
            </Link>
            <Link
              to="/programs"
              className="px-8 py-3 bg-white border border-blue-600 text-blue-600 rounded-full font-medium shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300"
            >
              Explore Our Programs
            </Link>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center mb-6 md:mb-0">
              <Sun className="text-yellow-400 mr-2" size={24} />
              <span className="text-xl font-bold">Bright Future</span>
            </div>
            
            <div className="flex gap-8">
              <Link to="/about" className="hover:text-blue-300 transition-colors">About</Link>
              <Link to="/programs" className="hover:text-blue-300 transition-colors">Programs</Link>
              <Link to="/donate" className="hover:text-blue-300 transition-colors">Donate</Link>
              <Link to="/contact" className="hover:text-blue-300 transition-colors">Contact</Link>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>© {currentYear} Bright Future NGO. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}