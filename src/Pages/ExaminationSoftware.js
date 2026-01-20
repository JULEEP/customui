import React from "react";
import { InView } from 'react-intersection-observer'; // Import Intersection Observer

const ExaminationSoftware = () => {
  return (
    <div className="py-16">
      <div className="flex flex-col lg:flex-row">

        {/* Left Section with Image */}
        <InView
          triggerOnce={true}  // Trigger animation once when element comes into view
          threshold={0.5}      // Trigger when 50% of the element is visible
        >
          {({ inView, ref }) => (
            <div
              ref={ref}
              className={`w-full lg:w-1/2 p-4 flex justify-center ${inView ? 'animate__animated animate__fadeInLeft' : ''}`}
            >
              <img
                src="https://schoolcanvas.com/assets/img/examination.png"
                alt="Examination Software"
                className="w-full sm:w-[300px] md:w-[400px] lg:w-[500px] h-auto object-cover rounded-lg"
              />
            </div>
          )}
        </InView>

        {/* Right Section with Content */}
        <InView
          triggerOnce={true}  // Trigger animation once when element comes into view
          threshold={0.5}      // Trigger when 50% of the element is visible
        >
          {({ inView, ref }) => (
            <div
              ref={ref}
              className={`w-full lg:w-1/2 p-4 lg:ml-8 ${inView ? 'animate__animated animate__fadeInRight' : ''}`}
            >
              <h2 className="text-3xl font-bold text-gray-800 mb-4">Examination Software</h2>
              <p className="text-lg mb-6">
                No.1 Software for creating custom Exam Report Cards and Result Analysis
              </p>
              <h3 className="text-2xl font-semibold text-gray-800 mb-4">Key Features</h3>
              <ul className="space-y-4 text-gray-700 text-lg list-disc pl-6">
                <li>Create custom Report Card templates in flashes</li>
                <li>Easy exam scheduling and mark updation</li>
                <li>20+ Analysis Reports</li>
                <li>Provision to print Admit card / Sitting label</li>
              </ul>
            </div>
          )}
        </InView>
      </div>
    </div>
  );
};

export default ExaminationSoftware;
