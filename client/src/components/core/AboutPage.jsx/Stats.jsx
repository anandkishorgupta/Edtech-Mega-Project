import React from 'react';

const Stats = [
  { count: "5K", label: "Active Students" },
  { count: "10+", label: "Mentors" },
  { count: "200+", label: "Courses" },
  { count: "50+", label: "Awards" },
];

const StatsComponents = () => {
  return (
    <div className='flex flex-row justify-evenly'>
      {Stats.map((stat, index) => (
        <div key={index} className='flex flex-col items-center'>
          <h2 className='text-[30px] font-bold text-richblack-5'>{stat.count}</h2>
          <p className='font-semibold text-base text-richblack-500'>{stat.label}</p>
        </div>
      ))}
    </div>
  );
}

export default StatsComponents;
