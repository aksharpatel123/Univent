import React, { useReducer, useEffect } from 'react';

import { validate } from '../../util/validators';
import './Input.css';
//Login page input

/* Hooks allow you to add various functionalities to function components,
    useState()- hook allows us to register state which then is managed inside ofa  component, when state is changed, the component re-renders(re-evaulated and might be lead to re-rendering of DOM)
    
    useEffect() - does something different: It allows you to register some logic (i.e. a JS function) which will be executed when certain dependencies - which you define - change.
    useEffect() re-evaluates the dependency values whenever the component in which you use useEffect() is re-evaluated (i.e. whenever the component's props or state changed).
If the component is re-evaluated and the dependencies did NOT change, the logic in useEffect() won't run again.
Important: The useEffect() logic re-runs AFTER the component (including its JSX code) was re-evaluated. That means, that the first execution of the useEffect() logic 
(when a component mounts for the first time) will ALWAYS happen AFTER the component rendered for the first time.
    */

//useReducer() allows you to manage state in a component and gives function you can call and render the component,
// can manage more complex state with ease or connected state when useState cannot
//useReducer() receives action and current state, update the current state based off action we received, return the new state and 
//use reducer will return the new state and re-render the component
const inputReducer = (state, action) => {
  switch (action.type) {//action.type to find out what action we have, unique identifier which describes the action
    case 'CHANGE'://type of action
      return {
        ...state, //copies old state, copies all key value pairs into this new object
        value: action.val, //over write 
        isValid: validate(action.val, action.validators)  //checks to see which validators we want, validators passed in from props when changeHandler called
      };
    case 'TOUCH': {  //touch action
      return {
        ...state,
        isTouched: true
      };
    }
    default:
      return state;
  }
};

//useReducer can take a second argument optionally: initial state, this state is where value is set to empty is touched is false, and valid is false. Usereducer and usestate 
//return array with 2 elements: current state, dispatch function(which we can call, how we dispatch actions to the reducer function which will run through the function and 
//return a new state which updates input state and re-renders the component)
const Input = props => {
  const [inputState, dispatch] = useReducer(inputReducer, {
    value: props.initialValue || '', //set to empty if props.intialvalue not provided
    isTouched: false,
    isValid: props.initialValid || false  //set to false if props.initialValid is not provided
  });

  const { id, onInput } = props;
  const { value, isValid } = inputState;

  useEffect(() => {
    onInput(id, value, isValid);  // passes back this information to where we used the input component, whenever one of the dependencies called V this funtion triggered
  }, [id, value, isValid, onInput]);  //only certain dependecies trigger this function: props.id, props.onInput, inputState.value, inputState.isValid

  //triggered whenever the user enters something. event we get automatically on change event, event.target is the event element on which this event was triggered, 
  //event.target.value is the value the user entered
  const changeHandler = event => {
    dispatch({
      type: 'CHANGE',
      val: event.target.value,
      validators: props.validators  //validators passed in from props
    });
  };

  // we can decide from outside what element holds, if "input" it stores input(receives props: id, type, placeholder, onchangeHandler), else textarea
  // we can render a text input field or text area if we <Input element = "input">
  const touchHandler = () => {
    dispatch({
      type: 'TOUCH'
    });
  };

  const element =
    props.element === 'input' ? (
      <input
        id={props.id}
        type={props.type}
        placeholder={props.placeholder}
        onChange={changeHandler}
        onBlur={touchHandler} //triggered when the user clicks in then clicks out
        value={inputState.value} //setting value of text area
      />
    ) : (
      <textarea
        id={props.id}
        rows={props.rows || 3}
        onChange={changeHandler}
        onBlur={touchHandler}
        value={inputState.value}
      />
    );
//htmlFor translated to for attribute once rendered to the dom, props.id and props.label passed to htmlFor
//outputting the value of element below the label.
//if the inputstate is not valid and the input state is touched, then display errortext
  return (
    <div
      className={`form-control ${!inputState.isValid &&
        inputState.isTouched &&
        'form-control--invalid'}`}
    >
      <label htmlFor={props.id}>{props.label}</label>
      {element}
      {!inputState.isValid && inputState.isTouched && <p>{props.errorText}</p>}
    </div>
  );
};

export default Input;
