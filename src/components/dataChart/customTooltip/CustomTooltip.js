import React from 'react'
import ArrowRightAltIcon from '@material-ui/icons/ArrowRightAlt'
import './CustomTooltip.css'

const CustomTooltip = ({active, payload, label}) => {
  if (active && payload) {
    return (
      <div className='customTooltip'>
        <p className='label'>{`${label}: ${payload[0].value} m/s`}</p>
        <p>Wind direction:
          <span className='arrow'>
            <ArrowRightAltIcon style={{transform: `rotate(${payload[0].payload.windDirection}deg)`}} />
          </span>
        </p>
      </div>
    );
  }
  return null;
};

export default CustomTooltip
