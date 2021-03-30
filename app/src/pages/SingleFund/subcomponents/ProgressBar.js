import React from 'react';

const ProgressBar = ({ amount, goal }) => {
  return (
    <div>
      <h2>Amount Raised</h2>
      <p>
        {amount} out of {goal}
      </p>
      <progress value={amount} max={goal} />
    </div>
  );
};

export default ProgressBar;
