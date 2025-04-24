import React from 'react';

const BookACall = () => {
  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center px-4 py-20">
      <h1 className="text-4xl font-bold text-center mb-6 text-gray-900">
        Book a Call with <span className="italic text-orange-500 font-brand">Wemakit</span>
      </h1>
      <p className="text-center text-gray-600 mb-12 max-w-xl">
        Schedule a time that works for you. We'll meet via Zoom or Google Meet to talk about your design needs.
      </p>
      <div className="w-full max-w-3xl">
        <iframe
          src="https://calendly.com/wemakitdesign/30min" // ganti link ini dengan link Calendly asli kamu
          width="100%"
          height="600"
          frameBorder="0"
          scrolling="no"
          className="rounded-xl shadow-xl border border-gray-200"
        ></iframe>
      </div>
    </div>
  );
};

export default BookACall;
