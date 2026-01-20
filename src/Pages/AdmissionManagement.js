import React from 'react';
import { InView } from 'react-intersection-observer'; // Importing Intersection Observer

const AdmissionManagement = () => {
  return (
    <div className="flex flex-col lg:flex-row py-8"> {/* Changed py-16 to py-8 for less height */}
      {/* Left Section with Image */}
      <InView
        triggerOnce={true}  // Trigger animation once when element comes into view
        threshold={0.5}      // Trigger when 50% of the element is visible
      >
        {({ inView, ref }) => (
          <div
            ref={ref} // Attach intersection observer
            className={`w-full lg:w-1/2 p-8 flex justify-center mb-8 lg:mb-0 ${inView ? 'animate__animated animate__fadeInLeft' : ''}`} // Full width on small screens
          >
            <img
              src="https://schoolcanvas.com/assets/img/admission.png"
              alt="Admission Management"
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
            ref={ref} // Attach intersection observer
            className={`w-full lg:w-1/2 p-8 ${inView ? 'animate__animated animate__fadeInRight' : ''}`} // Full width on small screens
          >
            <h2 className="text-3xl font-bold text-gray-800 mb-4">Admission Management</h2>
            <p className="text-lg mb-6">
              Complete Solution for managing Enquiry to Enrollment funnel easily on one single platform.
            </p>
            <h3 className="text-2xl font-semibold text-gray-800 mb-4">Key Features</h3>
            <ul className="space-y-4 text-gray-700 text-lg list-disc pl-6">
              <li>Create admission application form in flashes.</li>
              <li>Quick enquiry forms for maximum lead generation.</li>
              <li>Custom work-flow based admission process management.</li>
              <li>Admission Chat-bot for better engagement.</li>
            </ul>
          </div>
        )}
      </InView>
    </div>
  );
};

export default AdmissionManagement;
