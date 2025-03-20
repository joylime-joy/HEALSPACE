import React from "react";

const Services = () => {
  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-50 to-purple-50 p-6">
      <h1 className="text-4xl font-bold text-gray-800 text-center mb-8">Our Services</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Service 1: Therapy Sessions */}
        <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition duration-300">
          <h2 className="text-2xl font-bold text-blue-600 mb-4">Therapy Sessions</h2>
          <p className="text-gray-600">
            Book one-on-one therapy sessions with licensed therapists to address your mental health needs.
          </p>
        </div>

        {/* Service 2: Group Therapy */}
        <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition duration-300">
          <h2 className="text-2xl font-bold text-purple-600 mb-4">Group Therapy</h2>
          <p className="text-gray-600">
            Join group therapy sessions to connect with others and share experiences in a supportive environment.
          </p>
        </div>

        {/* Service 3: Mental Health Resources */}
        <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition duration-300">
          <h2 className="text-2xl font-bold text-green-600 mb-4">Mental Health Resources</h2>
          <p className="text-gray-600">
            Access a library of resources, including articles, videos, and tools to improve your mental health.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Services;