
import React from 'react';
import { motion } from 'framer-motion';

const Testimonial: React.FC = () => {
  return (
    <section className="w-full py-20 px-6">
      <div className="container mx-auto max-w-4xl">
        <motion.div 
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-2">You won't want</h2>
          <h2 className="text-3xl md:text-4xl font-bold italic mb-6">anything else.</h2>
          <p className="text-gray-600 max-w-lg mx-auto">
            Join thousands of satisfied designers and clients who've transformed their workflow with Wemakit.
          </p>
        </motion.div>

        <motion.div 
          className="bg-white rounded-xl shadow-lg p-8 flex flex-col md:flex-row gap-6 items-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <div className="w-24 h-24 rounded-full overflow-hidden flex-shrink-0">
            <img 
              src="/lovable-uploads/60e456cf-61fd-4bf5-bd83-fd233859eb78.png" 
              alt="Testimonial" 
              className="w-full h-full object-cover"
            />
          </div>
          <div>
            <div className="flex mb-2">
              {[...Array(5)].map((_, i) => (
                <svg key={i} className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                </svg>
              ))}
            </div>
            <p className="text-gray-700 italic mb-4">"Wemakit has completely transformed how we approach design projects. The platform is intuitive, powerful, and saves us hours every week."</p>
            <p className="font-semibold">Alex Johnson</p>
            <p className="text-sm text-gray-500">Creative Director, StudioX</p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Testimonial;
