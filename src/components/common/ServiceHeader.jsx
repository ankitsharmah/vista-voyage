import React from 'react';

const ServiceHeader = (props) => {
  return (
    <div className='w-[95%] outline md:outline-0 outline-1  md:w-[22%] p-1 h-[max-content]  flex flex-col  mt-2 md:gap-3 outline-gray-500/30 rounded-md group'>
      <div className='flex justify-between md:h-[6rem] items-center'>
        <img src={props.imgSrc} alt="" className='h-[3rem] md:h-[6rem] object-contain' />
        <h1 className='text-7xl md:text-8xl opacity-0 text-black transition-all group-hover:opacity-20'>
          {props.number}
        </h1>
      </div>
      <p className='text-lg md:text-2xl font-semibold mb-1 md:mb-0'>
        {props.title}
      </p>
      <p className='text-sm md:text-sm leading-[1.5rem] text-black/95'>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Sunt harum explicabo at fuga</p>
    </div>
  );
};

export default ServiceHeader;
