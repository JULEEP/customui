import React from "react";
import { InView } from 'react-intersection-observer';
import 'animate.css';

const OurMission = () => {
  return (
    <div className="py-12 bg-gradient-to-r from-blue-900 to-blue-300">
      <div className="container mx-auto px-6 flex flex-col lg:flex-row lg:items-center lg:gap-12"> {/* Added gap-12 for spacing */}

        {/* Left Section - Image */}
        <InView triggerOnce={true} threshold={0.5}>
          {({ inView, ref }) => (
            <div
              ref={ref}
              className={`lg:w-1/2 flex justify-center transform transition-transform ${
                inView ? 'animate__animated animate__fadeInLeft' : ''
              }`}
            >
              <img
                src="https://www.sci.jfn.ac.lk/wp-content/uploads/2021/09/mission.gif" // Use a relevant image here for Varahi
                alt="Our Mission"
                className="w-full h-[300px] object-cover rounded-lg"
              />
            </div>
          )}
        </InView>

        {/* Right Section - Text */}
        <InView triggerOnce={true} threshold={0.5}>
          {({ inView, ref }) => (
            <div
              ref={ref}
              className={`lg:w-1/2 text-left text-white mt-6 lg:mt-0 transform transition-transform ${
                inView ? 'animate__animated animate__fadeInRight' : ''
              }`}
            >
              <h2 className="text-3xl font-bold mb-4">Our Mission</h2>
              <p className="text-lg leading-relaxed">
                At VSD Cars, our mission is to provide customers with an exceptional, reliable, and stress-free car rental experience.
                <br /><br />
                We aim to offer a diverse range of vehicles—from affordable economy cars to luxury SUVs—catered to the needs of every traveler. Our platform makes booking fast and easy, while our transparent pricing ensures that there are no hidden charges.
                <br /><br />
                We are committed to customer satisfaction and strive to provide the best rental service with a focus on convenience, affordability, and seamless access to vehicles. Whether it's for a business trip, family vacation, or a spontaneous road trip, we are here to make your journey easier and more enjoyable.
              </p>
            </div>
          )}
        </InView>

      </div>
    </div>
  );
};

export default OurMission;
