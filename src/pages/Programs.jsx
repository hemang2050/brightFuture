// src/pages/Programs.jsx
import React from "react";
import { Users, BookOpen, Activity, ShieldCheck, Heart } from "lucide-react";

export const Programs = () => {
  const programs = [
    {
      icon: <BookOpen size={26} />,
      title: "After School Tutoring",
      description: "Academic help and learning support beyond the classroom.",
      area: "Education",
      color: "bg-blue-100",
      iconColor: "text-blue-600"
    },
    {
      icon: <Activity size={26} />,
      title: "Wellness Workshops",
      description: "Sessions on mental health, hygiene, and resilience.",
      area: "Health & Wellness",
      color: "bg-pink-100",
      iconColor: "text-pink-600"
    },
    {
      icon: <Users size={26} />,
      title: "Mentorship Circles",
      description: "Mentorship from caring adults to build life skills and confidence.",
      area: "Mentorship",
      color: "bg-purple-100",
      iconColor: "text-purple-600"
    },
    {
      icon: <ShieldCheck size={26} />,
      title: "Safe Space Activities",
      description: "Playful, supervised spaces to foster joy and creativity.",
      area: "Community Support",
      color: "bg-green-100",
      iconColor: "text-green-600"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white pt-28 pb-16 px-4">
      {/* Hero Section */}
      <div className="max-w-4xl mx-auto text-center mb-16">
        <h1 className="text-4xl font-bold text-blue-800 mb-4">Our Programs</h1>
        <p className="text-lg text-gray-600">
          Each initiative is designed to uplift and empower children from underserved communities.
        </p>
      </div>

      {/* Program Grid */}
      <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-10 px-2">
        {programs.map((program, index) => (
          <div
            key={index}
            className={`rounded-xl shadow-md hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 p-6 ${program.color}`}
          >
            <div className="flex items-center mb-3">
              <div className={`w-12 h-12 flex items-center justify-center rounded-full shadow-sm bg-white ${program.iconColor}`}>
                {program.icon}
              </div>
              <div className="ml-4">
                <h3 className="text-xl font-bold text-gray-800">{program.title}</h3>
                <span className="text-xs text-white bg-blue-700 px-2 py-1 rounded-full mt-1 inline-block">
                  {program.area}
                </span>
              </div>
            </div>
            <p className="text-gray-700 text-sm">{program.description}</p>
          </div>
        ))}
      </div>

      {/* CTA Section */}
      <div className="mt-20 text-center max-w-2xl mx-auto">
        <Heart className="text-pink-500 mx-auto mb-3" size={32} />
        <h2 className="text-2xl font-bold text-blue-800 mb-2">Want to Make a Difference?</h2>
        <p className="text-gray-600 mb-4">
          You can join any of our programs as a volunteer or help us expand them with your support.
        </p>
        <div className="flex justify-center gap-4">
          <a
            href="/signup"
            className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition"
          >
            Join as Volunteer
          </a>
          <a
            href="/donate"
            className="bg-purple-600 text-white px-6 py-3 rounded-lg hover:bg-purple-700 transition"
          >
            Make a Donation
          </a>
        </div>
      </div>
    </div>
  );
};