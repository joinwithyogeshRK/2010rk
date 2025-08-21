import React from 'react';
import { Header } from "@/components/Header";
import { cn } from "@/lib/utils";
import main from '@/assets/images/main-1755079168592.png';

export const Blog = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1">
        <div className="relative">
          {/* Background image */}
          <div className="absolute inset-0 z-0">
            <img 
              src={main} 
              alt="Blog background" 
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black/50"></div>
          </div>
          
          {/* Content */}
          <div className="relative z-10 container mx-auto px-4 py-16 md:py-24">
            <div className="max-w-3xl mx-auto text-center text-white">
              <h1 className="text-4xl md:text-5xl font-bold mb-6">Our Blog</h1>
              <p className="text-lg md:text-xl mb-8">
                Stay updated with our latest news, tips, and insights
              </p>
            </div>
            
            <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
              {/* Blog post cards */}
              {[1, 2, 3, 4, 5, 6].map((item) => (
                <div 
                  key={item}
                  className={cn(
                    "bg-white rounded-lg shadow-lg overflow-hidden",
                    "transform transition-transform hover:scale-105",
                    "flex flex-col min-h-[400px]"
                  )}
                >
                  <div className="h-48 bg-gray-200">
                    <img 
                      src={`https://source.unsplash.com/random/600x400?sig=${item}`} 
                      alt="Blog post" 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="p-6 flex-1 flex flex-col">
                    <div className="mb-2">
                      <span className="inline-block bg-primary-100 text-primary-800 text-xs font-semibold px-2 py-1 rounded">
                        Category
                      </span>
                      <span className="text-sm text-gray-500 ml-2">June 1, 2023</span>
                    </div>
                    <h3 className="text-xl font-bold mb-2 text-gray-800">
                      Blog Post Title {item}
                    </h3>
                    <p className="text-gray-600 mb-4 flex-1">
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                    </p>
                    <button className="text-primary-600 font-medium hover:text-primary-800 transition-colors mt-auto">
                      Read More →
                    </button>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="mt-12 flex justify-center">
              <button className="bg-primary hover:bg-primary-700 text-white font-bold py-2 px-6 rounded-full transition-colors">
                Load More
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};