import React from "react";
import { InView } from 'react-intersection-observer';
import 'animate.css';

const Vision = () => {
  return (
    <div className="py-12 bg-gradient-to-r from-blue-900 to-blue-300">
      <div className="container mx-auto px-6 flex flex-col lg:flex-row lg:items-center lg:gap-12">
        
        {/* Left Section - Text Content */}
        <InView triggerOnce={true} threshold={0.5}>
          {({ inView, ref }) => (
            <div
              ref={ref}
              className={`lg:w-1/2 text-left text-white mb-6 lg:mb-0 transform transition-transform ${
                inView ? 'animate__animated animate__fadeInLeft' : ''
              }`}
            >
              <h2 className="text-3xl font-bold mb-4">Our Vision</h2>
              <p className="text-lg leading-relaxed">
                At VSD Cars, our vision is to redefine the way people experience car rentals, making it effortless, accessible, and enjoyable for everyone.
                <br /><br />
                We strive to provide a platform that offers a wide variety of vehicles to suit every traveler’s needs, from business trips to family vacations. Our goal is to empower customers with the freedom to choose, book, and drive at their convenience.
                <br /><br />
                By offering transparent pricing, flexible rental periods, and exceptional customer service, we aim to become the go-to car rental service for anyone, anywhere. We envision a world where renting a car is as simple as clicking a button.
              </p>
            </div>
          )}
        </InView>

        {/* Right Section - Image */}
        <InView triggerOnce={true} threshold={0.5}>
          {({ inView, ref }) => (
            <div
              ref={ref}
              className={`lg:w-1/2 flex justify-center transform transition-transform ${
                inView ? 'animate__animated animate__fadeInRight' : ''
              }`}
            >
              <img
                src="https://static.vecteezy.com/system/resources/previews/010/902/081/large_2x/business-analytics-in-cloud-arrow-leadership-company-people-challenge-teamwork-up-flat-job-marketing-concept-illustration-growth-with-rocket-investment-service-man-and-woman-trend-result-vector.jpg"
                alt="Our Vision"
                className="w-full sm:w-[280px] md:w-[350px] lg:w-[500px] h-auto object-cover rounded-lg"
              />
            </div>
          )}
        </InView>

      </div>
    </div>
  );
};

export default Vision;
