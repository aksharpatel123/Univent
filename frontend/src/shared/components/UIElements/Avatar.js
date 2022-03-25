import React from 'react';

import './Avatar.css';

const Avatar = props => {
    //a div that wraps some image along with some css to style that image
  return (
    <div className={`avatar ${props.className}`} style={props.style}>
      <img
        src={props.image}
        alt={props.alt}
        style={{ width: props.width, height: props.width }}
      />
    </div>
  );
};

export default Avatar;
