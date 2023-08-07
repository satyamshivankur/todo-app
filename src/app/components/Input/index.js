"use client";

import React, { useState } from "react";
import styles from './input.module.css';
import ActionButton from "../ActionButton";
import { faPlus } from '@fortawesome/free-solid-svg-icons';


const Input = (props) => {
  const { defaultInputValue = '', handleSubmit = () => {}, btnTitle = ''} = props;
  const [value, setValue] = useState(defaultInputValue);
  
  const handleInputChange = (e) => setValue(e.target.value);

  return (
    <div className={styles.inputContainer}>
      <input className={styles.input} value={value} onChange={handleInputChange} />
      <ActionButton title={btnTitle} handleClick={() => handleSubmit(value)} icon={faPlus} isPrimary={true}/>
    </div>
  );
};

export default Input;
