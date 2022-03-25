import { useCallback, useReducer } from 'react';

const formReducer = (state, action) => {
  switch (action.type) {
    case 'INPUT_CHANGE':
      let formIsValid = true;
      for (const inputId in state.inputs) {
        if (!state.inputs[inputId]) { //is state undefined, if so go to next iteration of for loop
          continue;
        }
        if (inputId === action.inputId) {
          formIsValid = formIsValid && action.isValid;
        } else {
          formIsValid = formIsValid && state.inputs[inputId].isValid;
        }
      }
      return {
        ...state,
        inputs: {
          ...state.inputs,
          [action.inputId]: { value: action.value, isValid: action.isValid }
        },
        isValid: formIsValid
      };
    case 'SET_DATA':  //changing data in form
      return {    //replace old state
        inputs: action.inputs,
        isValid: action.formIsValid
      };
    default:
      return state;
  }
};
//custome hook(shares stateful logic. component that uses this hook re-renders )
  //we need to share these VVV with the component that uses our hook, so return formState, and the other two function calls
export const useForm = (initialInputs, initialFormValidity) => { //expects initial input paramenters
  const [formState, dispatch] = useReducer(formReducer, {
    inputs: initialInputs,
    isValid: initialFormValidity
  });

  const inputHandler = useCallback((id, value, isValid) => { //usecallback prevents infinite loops
    dispatch({
      type: 'INPUT_CHANGE',
      value: value,
      isValid: isValid,
      inputId: id
    });
  }, []);

  const setFormData = useCallback((inputData, formValidity) => { //allows us to replace data in form, dispatch against reducer so handler in reducer case
    dispatch({
      type: 'SET_DATA',  //any identifier you want
      inputs: inputData,
      formIsValid: formValidity
    });
  }, []);

  return [formState, inputHandler, setFormData];
};