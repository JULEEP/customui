import React from "react";
import { InView } from 'react-intersection-observer'; // Import Intersection Observer

const LearningManagement = () => {
  return (
    <div className="py-8">
      <div className="flex flex-col lg:flex-row">

        {/* Left Section with Content */}
        <InView
          triggerOnce={true}  // Trigger animation once when element comes into view
          threshold={0.5}      // Trigger when 50% of the element is visible
        >
          {({ inView, ref }) => (
            <div
              ref={ref}
              className={`w-full lg:w-1/2 p-8 lg:ml-8 transform transition-transform ${inView ? 'animate__animated animate__fadeInLeft' : ''}`}
            >
              <h2 className="text-3xl font-bold text-gray-800 mb-4">Learning Management</h2>
              <p className="text-lg mb-6">
                Smart way to deliver the educational content and track the learning outcomes.
              </p>
              <h3 className="text-2xl font-semibold text-gray-800 mb-4">Key Features</h3>
              <ul className="space-y-4 text-gray-700 text-lg list-disc pl-6">
                <li>E-content module for sharing the content in multiple formats</li>
                <li>Online Assignment submission and evaluation</li>
                <li>Online Objective and Subjective examination</li>
                <li>Integration of Live Classes using popular platforms</li>
              </ul>
            </div>
          )}
        </InView>

        {/* Right Section with Image */}
        <InView
          triggerOnce={true}  // Trigger animation once when element comes into view
          threshold={0.5}      // Trigger when 50% of the element is visible
        >
          {({ inView, ref }) => (
            <div
              ref={ref}
              className={`w-full lg:w-1/2 p-8 flex justify-center transform transition-transform ${inView ? 'animate__animated animate__fadeInRight' : ''}`}
            >
              <img
                src="https://www.schooltechsolution.com/wp-content/uploads/2021/02/3.png"
                alt="Learning Management System"
                className="w-full sm:w-[300px] md:w-[400px] lg:w-[500px] h-auto object-cover rounded-lg"
              />
            </div>
          )}
        </InView>

      </div>
    </div>
  );
};

export default LearningManagement;
