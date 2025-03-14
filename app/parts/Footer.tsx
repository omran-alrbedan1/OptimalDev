
import React from 'react';
import Image from 'next/image'; // Use Next.js Image component

import Button from '../elements/Button/button';

export default function Footer() {
  return (<>    <div className="text-center">this is the footer</div>
    <div className="max-w-full bg-gray-50 border-t border-gray-200 pb-6 mx-auto">
      <div className=" flex-col">
        <div className="flex flex-col sm:flex-row mt-8 justify-center">
          {/* Brand Section */}
          <div className="sm:w-1/3 flex-col ml-16 mr-8 justify-center items-center md:ml-24">
            <Image
              src={"/Hive Tech.png"}
              width={230}
              height={230}
              className="mb-5"
              alt="logo"
            />
            <p className="w-full text-lg text-black-300 font-light ml-4">
              Growing Your Business
              {' '}
              <br />
              Is Our Calling
            </p>
          </div>

          {/* Office Section */}
          <div className="w-1/3 mt-0 ml-16 mr-0 sm:ml-0 sm:mr-5">
            <h1 className="text-lg text-primary-color1 pt-4 pb-2">
              Office
            </h1>
            <div className='ml-5 space-y-2'>
              <p className="text-lg text-black-300 font-light whitespace-nowrap">
                info@hivetech.space
              </p>
              <p className="text-lg text-black-300 font-light whitespace-nowrap">
                Damascus, Syria
              </p>
              <p className="text-lg text-black-300 font-light">
                <span className='whitespace-nowrap'>+963937954969 /</span> <span className='whitespace-nowrap'>+963 954 872 922</span> 
              </p>
            </div>
          </div>

          {/* Social Section */}
          <div className="w-1/3 ml-16 sm:ml-0 mt-0">
            <h1 className="text-lg text-primary-color1 pt-4 pb-2">
              Social
            </h1>
            <div className='ml-5 space-y-2'>
              <Button
                href="https://www.instagram.com/racmathafidz/"
                type="link"
                target="_blank"
                className="flex text-lg text-black-300 font-light hover:underline"
                isExternal
              >
                Instagram
              </Button>
              <Button
                href="https://www.linkedin.com/in/racmat-hafidz-89982a156/"
                type="link"
                target="_blank"
                className="flex text-lg text-black-300 font-light hover:underline"
                isExternal
              >
                LinkedIn
              </Button>
              <Button
                href="https://github.com/racmathafidz"
                type="link"
                target="_blank"
                className="flex text-lg text-black-300 font-light hover:underline"
                isExternal
              >
                Github
              </Button>
            </div>
          </div>
        </div>

        {/* Copyright Section */}
        <div className="flex justify-center items-center text-center text-gray-100 mt-10 mb-2">
          <p className="text-lg text-black-300 font-light">
          &copy; 2025 Your Company. All rights reserved. by <span className='text-primary-color1 font-medium text-2xl'>Hive<span className='text-black'>Tech</span></span>
          </p>
        </div>
      </div>
    </div>
    </>

  );
}