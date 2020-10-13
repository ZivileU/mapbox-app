import React from 'react'
import './CustomTooltip.css'

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload) {
    return (
      <div className='customTooltip'>
        <p className='label'>{`${label} : ${payload[0].value} m/s`}</p>
      </div>
    );
  }
  return null;
};

export default CustomTooltip
