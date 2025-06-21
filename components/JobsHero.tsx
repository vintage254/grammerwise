import React from 'react';

const JobsHero = () => {
  return (
    <section className="relative flex items-center justify-center bg-gray-900 text-white px-4 sm:px-6 lg:px-8 h-[450px] rounded-xl overflow-hidden">
      <div className="absolute inset-0">
        <img
          className="w-full h-full object-cover"
          src="/images/hero-job.png"
          alt="Jobs Hero Background"
        />
        <div className="absolute inset-0 bg-black opacity-50"></div>
      </div>
      <div className="relative max-w-7xl mx-auto text-center">
        <h1 className="text-4xl font-extrabold sm:text-5xl lg:text-6xl">Find Your Next Opportunity</h1>
        <p className="mt-4 text-xl max-w-3xl mx-auto">
          Explore thousands of job openings from top companies and find the perfect role for you.
        </p>
      </div>
    </section>
  );
};

export default JobsHero;
