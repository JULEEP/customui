import React from "react";
import { InView } from "react-intersection-observer";
import { ChatAlt2Icon } from "@heroicons/react/outline";

const testimonials = [
  {
    name: "Rajesh Kumar",
    position: "Owner, Royal Travels",
    feedback:
      "VSD Cars helped us streamline our vehicle bookings. The flexibility in rental durations is a game-changer for us!",
  },
  {
    name: "Neha Verma",
    position: "Manager, Dream Holidays",
    feedback:
      "We’ve been using Varahi for over a year now, and the customer support is outstanding. They make our booking process so smooth.",
  },
  {
    name: "Amit Gupta",
    position: "CEO, Elite Rides",
    feedback:
      "The variety of vehicles offered by Varahi is impressive. It’s been a breeze for us to provide our customers with premium vehicles for their trips.",
  },
  {
    name: "Suman Joshi",
    position: "Operations Head, FastDrive Rentals",
    feedback:
      "The platform is intuitive, and we love the transparent pricing. Varahi has definitely raised the bar in the car rental industry.",
  },
];

const ClientTestimonials = () => {
  return (
    <div className="bg-gradient-to-r from-blue-900 to-blue-300 py-16 shadow-inner">
      <div className="container mx-auto px-6 text-center">
        <h2 className="text-3xl font-bold text-white mb-6">What Clients Say</h2>
        <p className="text-lg text-indigo-100 mb-12">
          Hear directly from the vendors and businesses who use our platform to drive success.
        </p>

        {/* Grid Layout for Testimonials */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {testimonials.map((testimonial, index) => (
            <InView key={index} triggerOnce={true} threshold={0.5}>
              {({ inView, ref }) => (
                <div
                  ref={ref}
                  className={`bg-white shadow-xl rounded-lg p-6 text-left transition-transform transform hover:-translate-y-2 hover:shadow-2xl ${
                    inView ? "animate__animated animate__fadeInUp" : ""
                  }`}
                >
                  <div className="flex items-center mb-4">
                    <ChatAlt2Icon className="w-8 h-8 text-purple-500 mr-2" />
                    <div>
                      <h4 className="text-md font-bold text-gray-800">
                        {testimonial.name}
                      </h4>
                      <p className="text-sm text-gray-500">{testimonial.position}</p>
                    </div>
                  </div>
                  <p className="text-gray-700 text-sm leading-relaxed">
                    "{testimonial.feedback}"
                  </p>
                </div>
              )}
            </InView>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ClientTestimonials;
