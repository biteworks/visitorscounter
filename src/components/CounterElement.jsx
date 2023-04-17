import { useState } from 'react';
import Stepper from './Stepper';

function CounterElement(props) {
  return (
    <div className="mb-4">
      <div className="grid grid-cols-6 gap-2 mb-3">
        <div className="col-span-2 flex items-center">
          {props.name}
        </div>
        <div className="col-span-4 font-semibold text-center">
          <Stepper
            count={props.count}
            id={props.id}
            handleIncrement={props.handleIncrement}
            handleDecrement={props.handleDecrement}
            handleCopyToClipboard={props.handleCopyToClipboard}
          />
        </div>
      </div>
    </div>
  );
}

export default CounterElement;
