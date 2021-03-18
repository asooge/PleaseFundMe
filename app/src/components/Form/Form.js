import React from 'react';

export const Form = ({
  inputs,
  values,
  onSubmit,
  handleChange,
}) => {

  const getInputJSX = (input) => (
    <>
      <label>{input.label}</label>
      <input
        type={input.type}
        name={input.name}
        value={values[input.name]}
        onChange={handleChange}
        onSubmit={onSubmit}
      />
    </>
  )

  return (
    <form onSubmit={onSubmit}>
      {inputs.map(getInputJSX)}
      <button>Submit</button>
    </form>
  )
}