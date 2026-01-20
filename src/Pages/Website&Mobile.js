import React from 'react';
import { InView } from 'react-intersection-observer'; // Import Intersection Observer
import image1 from '../images/image1.png';
import image3 from '../images/image3.png';
import image4 from '../images/image4.png';
import image5 from '../images/image5.png';
import Slider from 'react-slick'; // Import Slider Library
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const WebsiteMobileApp = () => {
  const images = [image1, image3, image4, image5];
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
  };

  return (
    <div className="py-8">
      <div className="flex flex-col lg:flex-row">
        {/* Left Section with Content */}
        <InView triggerOnce={true} threshold={0.5}>
          {({ inView, ref }) => (
            <div
              ref={ref}
              className={`w-full lg:w-1/2 p-4 ml-8 transform transition-transform ${inView ? 'animate__animated animate__fadeInLeft' : ''}`}
            >
              <h2 className="text-3xl font-bold text-gray-800 mb-4">Website and Mobile App</h2>
              <p className="text-lg mb-6">
                Global Recognition and Add Credibility with Rich Design and Content
              </p>
              <h3 className="text-2xl font-semibold text-gray-800 mb-4">Key Features</h3>
              <ul className="space-y-4 text-gray-700 text-lg list-disc pl-6">
                <li>Integration with ERP for easy access</li>
                <li>Responsive design for all screen sizes</li>
                <li>SEO optimized design process</li>
                <li>Dedicated design manager for any on-going changes</li>
              </ul>
            </div>
          )}
        </InView>

        {/* Right Section with Image Slider */}
        <InView triggerOnce={true} threshold={0.5}>
          {({ inView, ref }) => (
            <div
              ref={ref}
              className={`w-full lg:w-1/2 p-4 flex justify-center transform transition-transform ${inView ? 'animate__animated animate__fadeInRight' : ''}`}
            >
              <Slider {...settings} className="w-full sm:w-[300px] md:w-[400px] lg:w-[500px]">
                {images.map((image, index) => (
                  <div key={index} className="bg-white p-2 rounded-lg flex justify-center">
                    <img
                      src={image}
                      alt={`Slide ${index + 1}`}
                      className="w-auto h-full object-contain rounded-lg"
                    />
                  </div>
                ))}
              </Slider>
            </div>
          )}
        </InView>
      </div>
    </div>
  );
};

export default WebsiteMobileApp;
