import { useState } from 'react';

function useForm(callback) {
  const [values, setValues] = useState({});

  const handleChange = (event) => {
    setValues({ ...values, [event.target.name]: event.target.value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    event.target.reset();
    callback(values);
  };
  return [values, handleChange, handleSubmit];
}
export default useForm;


/*

 */
