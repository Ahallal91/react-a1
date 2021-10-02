import { useState, useEffect } from "react";

// reference week04_lab_code_archive_Activity1_custom-react-hooks-form-validation-master
const useForm = (methodCall, validation, defaultValues = {}) => {
  const [values, setValues] = useState(defaultValues);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // if there are no errors from the validate function passed in
  // then this will call the callback function passed in.
  useEffect(() => {
    if (Object.keys(errors).length === 0 && isSubmitting) {
      methodCall();
    }
  }, [errors, isSubmitting]);

  // on submit checks the validate method and sets errors to any returned.
  const handleSubmit = (event) => {
    if (event) event.preventDefault();
    setErrors(validation(values));
    setIsSubmitting(true);
  };

  const handleChange = (event) => {
    setValues((values) => ({ ...values, [event.target.name]: event.target.value }));
  };

  const handleChangeImage = (event) => {
    setValues((values) => ({ ...values, [event.target.name]: event.target.files[0] }));
  };

  return {
    handleChange,
    handleSubmit,
    handleChangeImage,
    values,
    errors,
  };
};

export default useForm;
