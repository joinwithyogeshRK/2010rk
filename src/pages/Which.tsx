import React from 'react';
import { Header } from "@/components/Header";
import { cn } from "@/lib/utils";
import Screenshot_2025_08_11_133524 from '@/assets/images/screenshot-2025-08-11-133524-1755090265125.png';

export const Which = () => {
  return (
    <>
      <Header />
      <main className="container mx-auto px-4 py-12">
        <div className="flex flex-col items-center justify-center min-h-[60vh]">
          <h1 className="text-3xl font-bold mb-8 text-primary-700">Contact Us</h1>
          
          <div className="flex flex-col items-center justify-center">
            <div className="mb-8">
              <img 
                src={Screenshot_2025_08_11_133524} 
                alt="Contact icon" 
                className={cn(
                  "w-32 h-32 object-contain",
                  "transition-all duration-300 hover:scale-110"
                )}
              />
            </div>
            
            <div className="max-w-md w-full bg-white dark:bg-gray-800 p-8 rounded-lg shadow-md">
              <form className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                    placeholder="Your name"
                  />
                </div>
                
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                    placeholder="your.email@example.com"
                  />
                </div>
                
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Message
                  </label>
                  <textarea
                    id="message"
                    rows={4}
                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                    placeholder="Your message"
                  ></textarea>
                </div>
                
                <button
                  type="submit"
                  className={cn(
                    "w-full py-2 px-4 bg-primary rounded-md text-white font-medium",
                    "hover:bg-primary-600 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2",
                    "transition-colors duration-200"
                  )}
                >
                  Send Message
                </button>
              </form>
            </div>
          </div>
        </div>
      </main>
    </>
  );
};