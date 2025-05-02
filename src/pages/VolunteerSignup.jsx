import React, { useState, useEffect } from "react";
import { Heart, BookOpen, Activity, Users, Home } from "lucide-react";

export const VolunteerSignup = () => {
  const [form, setForm] = useState({ name: "", email: "", program: "" });
  const [programs, setPrograms] = useState([]);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeStep, setActiveStep] = useState(0);

  useEffect(() => {
    // Use hardcoded programs that match the Programs component
    const staticPrograms = [
      {
        _id: "1",
        name: "After School Tutoring",
        area: "Education",
        icon: <BookOpen className="w-5 h-5" />,
        description: "Personalized academic help for students needing support outside school hours."
      },
      {
        _id: "2",
        name: "Wellness Workshops",
        area: "Health & Wellness",
        icon: <Activity className="w-5 h-5" />,
        description: "Sessions on mental health, hygiene, and emotional resilience for children."
      },
      {
        _id: "3",
        name: "Mentorship Circles",
        area: "Mentorship",
        icon: <Users className="w-5 h-5" />,
        description: "One-on-one or small group mentoring by trained volunteers."
      },
      {
        _id: "4",
        name: "Safe Space Activities",
        area: "Community Support",
        icon: <Home className="w-5 h-5" />,
        description: "Organized group games, storytelling, and creative play in supervised settings."
      }
    ];
    
    setPrograms(staticPrograms);
    setLoading(false);
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("https://brightfuture-jnvf.onrender.com/api/volunteers", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
  
      if (res.ok) {
        setSubmitted(true);
        // Smoothly scroll to top to show thank you message
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else {
        alert("Failed to register. Try again.");
      }
    } catch (err) {
      console.error(err);
      alert("Error occurred. Try again later.");
    }
  };

  // Function to get program details when selected
  const getSelectedProgram = () => {
    return programs.find(p => p.name === form.program);
  };

  if (submitted) {
    return (
      <div className="min-h-screen pt-24 pb-12 px-4 flex flex-col items-center justify-center text-center bg-gradient-to-b from-blue-50 to-white">
        <div className="max-w-md w-full mx-auto bg-white rounded-xl shadow-xl p-8 transform transition-all duration-500 animate-fadeIn">
          <div className="relative w-20 h-20 mx-auto mb-6">
            <div className="absolute inset-0 bg-pink-100 rounded-full animate-ping opacity-75"></div>
            <div className="relative flex items-center justify-center w-full h-full bg-white rounded-full shadow-md">
              <Heart className="text-pink-500" size={36} />
            </div>
          </div>
          <h2 className="text-3xl font-bold text-blue-700 mb-4">Thank You!</h2>
          <p className="text-lg text-gray-600 mb-6">
            Your volunteer application has been received. We'll reach out to you shortly with opportunities to help make a difference.
          </p>
          <div className="py-3 px-4 bg-blue-50 rounded-lg border border-blue-100">
            <p className="text-sm text-blue-700">
              A confirmation email has been sent to <span className="font-semibold">{form.email}</span>
            </p>
          </div>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="min-h-screen pt-24 flex items-center justify-center">
        <div className="flex flex-col items-center">
          <div className="w-12 h-12 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin"></div>
          <p className="mt-4 text-gray-600">Loading programs...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen pt-24 flex items-center justify-center px-4">
        <div className="bg-red-50 border-l-4 border-red-500 p-6 rounded-lg max-w-lg">
          <h3 className="text-red-700 font-semibold mb-2">Error Loading Programs</h3>
          <p className="text-red-600">{error}</p>
          <button 
            onClick={() => window.location.reload()}
            className="mt-4 px-4 py-2 bg-red-100 text-red-700 rounded-md hover:bg-red-200 transition"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-28 pb-16 px-4 bg-gradient-to-b from-blue-50 to-white">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold text-blue-700 mb-4">Join Our Volunteer Team</h1>
          <p className="text-lg text-gray-600 max-w-xl mx-auto">
            Make a meaningful impact in children's lives by volunteering your time and skills with our programs.
          </p>
        </div>

        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          {/* Progress Steps */}
          <div className="bg-blue-50 px-6 py-4">
            <div className="flex justify-between">
              {['Your Information', 'Select Program', 'Confirmation'].map((step, index) => (
                <div key={index} className="flex flex-col items-center">
                  <div className={`w-8 h-8 flex items-center justify-center rounded-full font-semibold text-sm mb-1 transition-all ${
                    activeStep >= index 
                      ? 'bg-blue-600 text-white' 
                      : 'bg-blue-100 text-blue-500'
                  }`}>
                    {index + 1}
                  </div>
                  <span className={`text-xs ${
                    activeStep >= index ? 'text-blue-700' : 'text-blue-400'
                  }`}>
                    {step}
                  </span>
                </div>
              ))}
            </div>
            <div className="mt-2 h-1 bg-blue-100 rounded-full overflow-hidden">
              <div 
                className="h-full bg-blue-600 transition-all duration-300" 
                style={{ width: `${(activeStep) * 50}%` }}
              ></div>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="p-6 md:p-8">
            {activeStep === 0 && (
              <div className="space-y-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                  <input
                    id="name"
                    type="text"
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    placeholder="Enter your full name"
                    className="w-full border border-gray-300 px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                    required
                  />
                </div>
                
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                  <input
                    id="email"
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    placeholder="Enter your email address"
                    className="w-full border border-gray-300 px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                    required
                  />
                </div>
                
                <div className="pt-4">
                  <button
                    type="button"
                    onClick={() => form.name && form.email && setActiveStep(1)}
                    className={`w-full py-3 px-4 rounded-lg font-medium transition-all duration-300 ${
                      form.name && form.email 
                        ? 'bg-blue-600 text-white hover:bg-blue-700' 
                        : 'bg-blue-100 text-blue-400 cursor-not-allowed'
                    }`}
                  >
                    Continue
                  </button>
                </div>
              </div>
            )}

            {activeStep === 1 && (
              <div className="space-y-6">
                <div>
                  <label htmlFor="program" className="block text-sm font-medium text-gray-700 mb-1">
                    Choose a Program
                  </label>
                  <select
                    id="program"
                    name="program"
                    value={form.program}
                    onChange={handleChange}
                    className="w-full border border-gray-300 px-4 py-3 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                    required
                  >
                    <option value="">Select a Program</option>
                    {programs.map((p) => (
                      <option key={p._id} value={p.name}>
                        {p.name} — {p.area}
                      </option>
                    ))}
                  </select>
                </div>
                
                {form.program && (
                  <div className="bg-blue-50 rounded-lg p-4 animate-fadeIn">
                    <div className="flex">
                      <div className="flex-shrink-0 w-12 h-12 flex items-center justify-center bg-blue-100 rounded-full text-blue-600 mr-4">
                        {getSelectedProgram()?.icon || <BookOpen className="w-5 h-5" />}
                      </div>
                      <div>
                        <h3 className="font-semibold text-blue-800">{getSelectedProgram()?.name}</h3>
                        <p className="text-sm text-blue-700 mt-1">{getSelectedProgram()?.description}</p>
                      </div>
                    </div>
                  </div>
                )}
                
                <div className="flex gap-3 pt-4">
                  <button
                    type="button"
                    onClick={() => setActiveStep(0)}
                    className="flex-1 py-3 px-4 bg-gray-100 text-gray-700 rounded-lg font-medium hover:bg-gray-200 transition"
                  >
                    Back
                  </button>
                  <button
                    type="button"
                    onClick={() => form.program && setActiveStep(2)}
                    className={`flex-1 py-3 px-4 rounded-lg font-medium transition ${
                      form.program 
                        ? 'bg-blue-600 text-white hover:bg-blue-700' 
                        : 'bg-blue-100 text-blue-400 cursor-not-allowed'
                    }`}
                  >
                    Continue
                  </button>
                </div>
              </div>
            )}

            {activeStep === 2 && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-4">Review Your Information</h3>
                  
                  <div className="bg-gray-50 rounded-lg p-4 space-y-4">
                    <div>
                      <p className="text-sm text-gray-500">Full Name</p>
                      <p className="font-medium">{form.name}</p>
                    </div>
                    
                    <div>
                      <p className="text-sm text-gray-500">Email Address</p>
                      <p className="font-medium">{form.email}</p>
                    </div>
                    
                    <div>
                      <p className="text-sm text-gray-500">Selected Program</p>
                      <div className="flex items-center mt-1">
                        <span className="w-6 h-6 flex items-center justify-center bg-blue-100 rounded-full text-blue-600 mr-2">
                          {getSelectedProgram()?.icon || <BookOpen className="w-3 h-3" />}
                        </span>
                        <p className="font-medium">{form.program}</p>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded-r-lg">
                  <p className="text-sm text-yellow-700">
                    By submitting this form, you agree to be contacted by our volunteer coordination team about opportunities related to your selected program.
                  </p>
                </div>
                
                <div className="flex gap-3 pt-4">
                  <button
                    type="button"
                    onClick={() => setActiveStep(1)}
                    className="flex-1 py-3 px-4 bg-gray-100 text-gray-700 rounded-lg font-medium hover:bg-gray-200 transition"
                  >
                    Back
                  </button>
                  <button
                    type="submit"
                    className="flex-1 py-3 px-4 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-all duration-300 transform hover:scale-105"
                  >
                    Submit Application
                  </button>
                </div>
              </div>
            )}
          </form>
        </div>
      </div>
    </div>
  );
};