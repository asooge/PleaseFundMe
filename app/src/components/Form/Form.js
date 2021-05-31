import React, { Fragment } from 'react';
import './Form.scss';

export const Form = ({ inputs, values, onSubmit, handleChange }) => {
  const getInputJSX = (input) => (
    <Fragment key={input.name}>
      <label>{input.label}</label>
      <input
        type={input.type}
        name={input.name}
        value={values[input.name]}
        step='any'
        onChange={handleChange}
        onSubmit={onSubmit}
      />
    </Fragment>
  );

  return (
    <form className="form" onSubmit={onSubmit}>
      <div>{inputs.map(getInputJSX)}</div>
      <button>Submit</button>
    </form>
  );
};
