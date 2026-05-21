import React from 'react';
import { SlideSidebar } from '../layout';

const Paperpre = (props) => {
  return (
    <SlideSidebar
      filter={props.filter}
      activeIndex={props.indexFilterShow ?? 0}
      onSelect={props.setIndexFilterShow}
    />
  );
};

export default Paperpre;
