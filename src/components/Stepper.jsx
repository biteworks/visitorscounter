import { useState } from 'react';
import { useDoubleTap } from 'use-double-tap';

function Stepper(props) {
  const bind = useDoubleTap((event) => {
    props.handleCopyToClipboard(props.id);
    console.log(props.id);
  });

  return (
    <div className="grid grid-cols-3 bg-slate-200 py-2 rounded-md justify-evenly items-center">
      <div
        className="cols-span-1"
        onClick={() => props.handleDecrement(props.id)}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-6 h-6 m-auto"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M22 10.5h-6m-2.25-4.125a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zM4 19.235v-.11a6.375 6.375 0 0112.75 0v.109A12.318 12.318 0 0110.374 21c-2.331 0-4.512-.645-6.374-1.766z"
          />
        </svg>
      </div>
      <div
        {...bind}
        className="border rounded-md border-slate-400 py-1 px-3 cols-span-1 bg-white"
      >
        {props.count}
      </div>
      <div
        className="cols-span-1"
        onClick={() => props.handleIncrement(props.id)}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-6 h-6 m-auto"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M19 7.5v3m0 0v3m0-3h3m-3 0h-3m-2.25-4.125a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zM4 19.235v-.11a6.375 6.375 0 0112.75 0v.109A12.318 12.318 0 0110.374 21c-2.331 0-4.512-.645-6.374-1.766z"
          />
        </svg>
      </div>
    </div>
  );
}
export default Stepper;
