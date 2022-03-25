import React from 'react';

import './MainHeader.css';
// props.children is a special always refers to things you put between your opening and closing tags of your component,
// (where ever you use <Mainheader> Stuff in between </MainHeader> everything in between will be forwarded to props.children)
const MainHeader = props => {
  return <header className="main-header">{props.children}</header>;
};

export default MainHeader;
