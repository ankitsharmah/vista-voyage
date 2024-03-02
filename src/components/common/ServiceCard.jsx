import React from 'react'

const ServiceCard = (props) => {
  return (
    <div>
       <div className='w-full  md:h-[8.5rem]  flex flex-col items-center gap-2  '>
      <h2 className="text-2xl font-semibold text-black/80 ">{props.value}</h2>
      <p className='leading-[1.5rem] text-black/80 '>Lorem ipsum, dolor sit amet consectetur dolor sit amet consectetudolor</p>
    </div>

    </div>
  )
}

export default ServiceCard;
