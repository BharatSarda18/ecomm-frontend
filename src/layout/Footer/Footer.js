import React from 'react';

export default function Footer() {
  return (
    <div className="bg-gray-900">
      <div className="max-w-2xl mx-auto text-white py-6">
        <div className="flex flex-col md:flex-row md:justify-between items-center text-sm text-gray-400">
          <p className="order-2 md:order-1 mt-8 md:mt-0">
            © Bharat Sarda, 2024
          </p>
          <div className="order-1 md:order-2">
            <a href='https://www.linkedin.com/in/bharat-sarda-68b15b1aa' target='blank'>
              <span className="px-2 hover:text-white" >Linkedin</span>
            </a>
            <a href='https://github.com/BharatSarda18' target='blank'>
              <span className="px-2 border-l hover:text-white">Github</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  )
};

