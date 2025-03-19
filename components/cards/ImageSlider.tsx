'use client'; // Mark this as a Client Component

import React, { useState } from 'react';
import './imageSlider.css';

interface ImageSliderProps {
  files: { id: number; path: string; name: string }[];
}

const ImageSlider = ({ files }: ImageSliderProps) => {
  // State to track the currently selected image
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  // Handler to update the selected image
  const handleThumbnailClick = (index: number) => {
    setSelectedImageIndex(index);
  };

  return (
    <div className="relative w-full max-w-7xl mx-auto pt-10">
      {/* Container for 3D Effect */}
      <div className="perspective-container flex justify-center gap-8 py-10">
        {files.map((file, index) => {
          const isSelected = index === selectedImageIndex;

          return (
            <div
              key={file.id}
              onClick={() => handleThumbnailClick(index)}
              className={`image-card cursor-pointer transition-transform duration-500 ease-in-out ${
                isSelected ? 'selected' : ''
              }`}
              style={{
                transform: isSelected
                  ? 'translateZ(50px) scale(2.5)'
                  : 'translateZ(-20px) scale(0.8)',
                opacity: isSelected ? 1 : 0.6,
              }}
            >
              <img
                src={`https://main.hivetech.space/storage/${file.path}`}
                alt={file.name}
                className="object-cover rounded-lg shadow-lg w-full h-full aspect-square"
              />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ImageSlider;