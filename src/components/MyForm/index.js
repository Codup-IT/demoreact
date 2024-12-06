import React from 'react';
import { TextField, Button, Box } from '@mui/material';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

const validationSchema = Yup.object({
  name: Yup.string().required('Name is required'),
});

const MyForm = () => {
  const initialValues = {
    name: '',
  };

  const onSubmit = (values, { setSubmitting, resetForm }) => {
    console.log('Form data', values);
    setSubmitting(false);
    resetForm();
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
    >
      {({ isSubmitting, touched, errors, handleChange, handleBlur, values }) => (
        <Form>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, width: '300px', margin: '0 auto' }}>
            <Field
              as={TextField}
              name="name"
              label="Name"
              variant="outlined"
              fullWidth
              error={touched.name && Boolean(errors.name)}
              helperText={<ErrorMessage name="name" />}
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.name}
            />
            <Button type="submit" variant="contained" color="primary" disabled={isSubmitting}>
              Submit
            </Button>
          </Box>
        </Form>
      )}
    </Formik>
  );
};

export default MyForm;