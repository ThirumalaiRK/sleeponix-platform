import React, { useState, useEffect } from 'react';
import { Star, ChevronLeft, ChevronRight, Quote } from 'lucide-react';

const Testimonials: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  const testimonials = [
     {
      name: "MURALI PRASAATH",
      location: "Coimbatore, Tamil Nadu",
      rating: 5,
      quote: "I wanted to share my review after using this bed for quite time. I’ve been using this bed for past 10 months and it’s wonderful. I’ve got no back pain or any other problem. Mr. Vigneshwaran of Ganapathy Beds recommended me for this product and no regret for the same till now. Would definitely recommend to everyone.",
      /*image: "https://images.pexels.com/photos/1043473/pexels-photo-1043473.jpeg?auto=compress&cs=tinysrgb&w=300"*/
    },
    {
      name: "RAMMIE ROYCE",
      location: "Coimbatore, Tamil Nadu",
      rating: 5,
      quote: "I have ordered for a 3 inch layer bed at ganapathy store with mr.vignesh and we have explained our existing bed issue with sleep problems and really the quality of bed with cushion was great to sleep. This quality of cushion adopts as per our body weight and aligns with the perfect comfort and now a days we have a good and peaceful sleep. No compromise in quality.",
      /*image: "https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=300"*/
    },
    {
      name: "SUBASHINI S",
      location: "Coimbatore, Tamil Nadu",
      rating: 5,
      quote: "Best experience with sri ganapathy store....the best thing about sleeponix mattresses is that they offer a wide range of sizes...and its suitable for people of all ages...price here  is better than many other mattresses ...such a good good quality mattresses with reasonable price...have a best experience with them...happy purchase❤🤗 …",
      /*image: "https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=300"*/
    },
    {
      name: "ABISHEK SIVAM",
      location: "Coimbatore, Tamil Nadu",
      rating: 5,
      quote: "Wonderful experience with sleeponix industries and sri ganapathy beds. There is a good relief to back pain after using this product in just 15 days the 14yrs back pain gone so 100 stars thanks too sleeponix don't think about money worthy product thanks .",
      /*image: "https://images.pexels.com/photos/1239288/pexels-photo-1239288.jpeg?auto=compress&cs=tinysrgb&w=300"*/
    },
   
  ];

  useEffect(() => {
    if (!isAutoPlaying) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [isAutoPlaying, testimonials.length]);

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 10000);
  };

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 10000);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 10000);
  };

  return (
    <section id="testimonials" className="py-20 bg-ivory">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-serif font-bold gradient-text mb-6">
            What Our Customers Say
          </h2>
          <p className="text-xl text-slate-gray max-w-3xl mx-auto">
            Join thousands of satisfied customers who have transformed their sleep with Sleeponix
          </p>
        </div>

        <div className="relative">
          {/* Main Testimonial Display */}
          <div className="bg-white rounded-2xl shadow-lg p-8 md:p-12 max-w-4xl mx-auto relative overflow-hidden">
            <div className="absolute top-4 left-4 text-gold-champagne/20">
              <Quote size={60} />
            </div>
            
            <div className="relative z-10">
              <div className="flex flex-col md:flex-row items-center space-y-6 md:space-y-0 md:space-x-8">
                {/*<div className="flex-shrink-0">
                  <img
                    src={testimonials[currentIndex].image}
                    alt={testimonials[currentIndex].name}
                    className="w-20 h-20 md:w-24 md:h-24 rounded-full object-cover border-4 border-gold-champagne"
                  />
                </div>*/}
                
                <div className="flex-1 text-center md:text-left">
                  <div className="flex justify-center md:justify-start mb-4">
                    {[...Array(testimonials[currentIndex].rating)].map((_, i) => (
                      <Star key={i} className="text-gold-champagne fill-current" size={20} />
                    ))}
                  </div>
                  
                  <blockquote className="text-lg md:text-xl text-slate-gray italic leading-relaxed mb-4">
                    "{testimonials[currentIndex].quote}"
                  </blockquote>
                  
                  <div>
                    <div className="font-semibold text-deep-indigo text-lg">
                      {testimonials[currentIndex].name}
                    </div>
                    <div className="text-gold-champagne">
                      {testimonials[currentIndex].location}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Navigation Arrows */}
          <button
            onClick={prevSlide}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 w-12 h-12 bg-white rounded-full shadow-lg flex items-center justify-center text-slate-gray hover:text-gold-champagne transition-colors duration-300"
          >
            <ChevronLeft size={24} />
          </button>
          
          <button
            onClick={nextSlide}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 w-12 h-12 bg-white rounded-full shadow-lg flex items-center justify-center text-slate-gray hover:text-gold-champagne transition-colors duration-300"
          >
            <ChevronRight size={24} />
          </button>

          {/* Dots Indicator */}
          <div className="flex justify-center space-x-2 mt-8">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === currentIndex ? 'bg-gold-champagne w-8' : 'bg-gray-300'
                }`}
              />
            ))}
          </div>
        </div>

        {/* Trust Indicators */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          <div className="bg-white p-6 rounded-xl shadow-md">
            <div className="text-3xl font-bold text-gold-champagne mb-2">10,000+</div>
            <div className="text-slate-gray">Happy Customers</div>
          </div>
          
          <div className="bg-white p-6 rounded-xl shadow-md">
            <div className="text-3xl font-bold text-gold-champagne mb-2">4.9/5</div>
            <div className="text-slate-gray">Average Rating</div>
          </div>
          
          <div className="bg-white p-6 rounded-xl shadow-md">
            <div className="text-3xl font-bold text-gold-champagne mb-2">98%</div>
            <div className="text-slate-gray">Would Recommend</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;