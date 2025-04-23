'use client';
import { useState } from 'react';
import Image from 'next/image';
import one from "../../../public/assets/images/img/one.webp";
import two from "../../../public/assets/images/img/person1.jpg";

// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/autoplay'; // Import autoplay CSS

// Import required modules
import { Pagination, Autoplay } from 'swiper/modules'; // Add Autoplay module

const Testimonial = ({ name, role, content, imgSrc, index, expandedIndex, toggleTestimonial }) => {
  return (
    <div className="max-w-3xl mx-auto my-6 p-6 relative z-10">
      {/* Image at the top */}
      <div className="flex justify-center mb-6 relative z-20">
        <Image
          src={imgSrc}
          alt={name}
          width={96} 
          height={96} 
          className="w-24 h-24 rounded-full border-4 border-green-500 shadow-lg"
        />
      </div>

      {/* Testimonial Box with Half Border and Background */}
      <div className="p-6 mt-[-50px] bg-gradient-to-b from-green-100 to-white border-t-2 border-l-4 border-r-4 border-b-4 border-green-500 relative z-10 rounded-lg">
        {/* Name and Role */}
        <div className="flex flex-col items-center mb-2">
          <p className="text-xl font-semibold text-gray-800 text-center">{name}</p>
          <p className="text-md text-gray-500 italic text-center">{role}</p>
        </div>
        <p className="text-gray-700 text-lg leading-relaxed mb-6">
          {expandedIndex === index
            ? content
            : content.split(' ').slice(0, 20).join(' ') + '...'}
        </p>
        <div className="flex justify-center mt-4">
          <button
            onClick={() => toggleTestimonial(index)}
            className={`font-semibold px-6 py-2 rounded-md 
              ${expandedIndex === index ? 'text-green-600 hover:text-green-800' : 'bg-green-600 text-white hover:bg-green-700'}`}
          >
            {expandedIndex === index ? 'Read Less' : 'View My Story'}
          </button>
        </div>
      </div>
    </div>
  );
};

const TestimonialsSection = () => {
  const [expandedIndex, setExpandedIndex] = useState(null);

  const toggleTestimonial = (index) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  const testimonials = [
    {
      name: 'Prashik',
      role: 'DEO, Pune, Maharashtra',
      content: 'MahaAgroMart has truly revolutionized the way I source agricultural products online...',
      imgSrc: one,
    },
    {
      name: 'Shubham',
      role: 'Asst Manager, Mumbai',
      content: 'महाराष्ट्र कृषी-उद्योग विकास महामंडळाच्या महाअॅग्रोमार्ट उपक्रमास स्कॉच पुरस्कार agricultural ...',
      imgSrc: two,
    },
    {
      name: 'Abhishek Porel',
      role: 'Farmer, Nagpur',
      content: 'MahaAgroMart has truly revolutionized the way I source agricultural products online...',
      imgSrc: one,
    },
    {
      name: 'Ajay Goswami',
      role: 'Farmer, Solapur',
      content: 'MahaAgroMart has truly revolutionized the way I source agricultural products online...',
      imgSrc: two,
    },
  ];

  return (
    <div className="container mx-auto px-4 py-4">
      <h2 className="text-4xl font-bold text-center text-gray-800 mb-4">What Our Customers Say</h2>
      
      {/* Desktop Grid */}
      <div className="hidden sm:grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {testimonials.map((testimonial, index) => (
          <Testimonial
            key={index}
            name={testimonial.name}
            role={testimonial.role}
            content={testimonial.content}
            imgSrc={testimonial.imgSrc}
            index={index}
            expandedIndex={expandedIndex}
            toggleTestimonial={toggleTestimonial}
          />
        ))}
      </div>

      {/* Mobile Slider */}
      <div className="sm:hidden">
        <Swiper
          slidesPerView={1}
          spaceBetween={30}
          pagination={{
            clickable: true,
          }}
          autoplay={{
            delay: 3000, // Delay between slides in milliseconds (3 seconds)
            disableOnInteraction: false, // Continue autoplay even when user interacts with the slider
          }}
          modules={[Pagination, Autoplay]} // Add Autoplay module
          className="mySwiper"
        >
          {testimonials.map((testimonial, index) => (
            <SwiperSlide key={index}>
              <Testimonial
                name={testimonial.name}
                role={testimonial.role}
                content={testimonial.content}
                imgSrc={testimonial.imgSrc}
                index={index}
                expandedIndex={expandedIndex}
                toggleTestimonial={toggleTestimonial}
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default TestimonialsSection;