import React, { useEffect, useState } from 'react';
import './Testimonial.css';

const testimonials = [
  {
    id: 1,
    name: "John Doe",
    text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fB8MHxzZWFyY2h8NHx8cmFuZG9tJTIwcGVvcGxlfGVufDB8fDB8fHww",
  },
  {
    id: 2,
    name: "Jane Smith",
    text: "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS3Od24Hz4D74n1Bq7H4-HvN1hx8jVLqr7-URuL8fuvdw&s",
  },
  {
    id: 3,
    name: "Alice Johnson",
    text: "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
    image: "https://preview.redd.it/created-random-people-using-chatgpt-midjourney-do-you-know-v0-q1aa450i5dqb1.png?width=1024&format=png&auto=webp&s=c4e9abc47d193474a2fa1a7e337d9d9340dce947",
  }
];

const TestimonialSlider = () => {
  const [currentTestimonial, setCurrentTestimonial] = useState(0);

  const handleNext = () => {
    setCurrentTestimonial(currentTestimonial === testimonials.length - 1 ? 0 : currentTestimonial + 1);
  };

  const handlePrev = () => {
    setCurrentTestimonial(currentTestimonial === 0 ? testimonials.length - 1 : currentTestimonial - 1);
  };


  useEffect(() => {
    const interval = setInterval(handleNext, 5000); // Change testimonial every 5 seconds
    return () => clearInterval(interval);
  }, [currentTestimonial]);


  const handleDotClick = (index) => {
    setCurrentTestimonial(index);
  };
  return (
    <div className="testimonial-slider">
      <div className="testimonial">
        <img src={testimonials[currentTestimonial].image} alt={testimonials[currentTestimonial].name} />
        <br/>
        <p>{testimonials[currentTestimonial].text}</p>
        <p>- {testimonials[currentTestimonial].name}</p>
      </div>
      <div className="dots">
        {testimonials.map((testimonial, index) => (
          <span
            key={testimonial.id}
            className={index === currentTestimonial ? "dot active" : "dot"}
            onClick={() => handleDotClick(index)}
          ></span>
        ))}
      </div>
      <br/>
    </div>
  );
};

export default TestimonialSlider;
