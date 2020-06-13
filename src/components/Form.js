import React from "react";

const Form = ({handleChange}) => {
  return (
    <form className="pure-form">
      <div className="form-group">
        <label htmlFor="stacked-state">El clima en: </label>
        <select
          id="stacked-state"
          className="form-control"
          onChange={handleChange}
        >
          <option>Santiago</option>
          <option>Madrid</option>
          <option>Moscu</option>
          <option>Medellin</option>
          <option>Londres</option>
          <option>Temuco</option>
        </select>
      </div>
    </form>
  );
};

export default Form;
