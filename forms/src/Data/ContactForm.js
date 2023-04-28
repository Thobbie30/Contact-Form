import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import axios from 'axios';
import { nanoid } from 'nanoid';

const ContactForm = () => {
  const initialValues = {
    name: '',
    email: '',
    subject: '',
    message: '',
  };

  const handleSubmit = (values, { resetForm, setSubmitting, setStatus }) => {
    setSubmitting(true);
    const id = nanoid();
    const data = { id, ...values };
    axios
      .post('https://my-json-server.typicode.com/tundeojediran/contacts-api-server/inquiries', data)
      .then(() => {
        resetForm();
        setStatus({ success: true });
      })
      .catch(() => {
        setStatus({ success: false });
      })
      .finally(() => {
        setSubmitting(false);
      });
  };

  const validateEmail = (value) => {
    let error;
    if (!value) {
      error = 'Email is required';
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)) {
      error = 'Invalid email address';
    }
    return error;
  };

  const validateRequired = (value) => {
    return value ? undefined : 'This field is required';
  };

  return (
    <div>
      <h1>Contact Us</h1>
      <Formik initialValues={initialValues} onSubmit={handleSubmit}>
        {({ isSubmitting, status }) => (
          <Form>
            <div>
              <label htmlFor="name">Name</label>
              <Field type="text" name="name" validate={validateRequired} />
              <ErrorMessage name="name" component="div" className="error" />
            </div>
            <div>
              <label htmlFor="email">Email</label>
              <Field type="email" name="email" validate={validateEmail} />
              <ErrorMessage name="email" component="div" className="error" />
            </div>
            <div>
              <label htmlFor="subject">Subject</label>
              <Field type="text" name="subject" />
              <ErrorMessage name="subject" component="div" className="error" />
            </div>
            <div>
              <label htmlFor="message">Message</label>
              <Field as="textarea" name="message" validate={validateRequired} />
              <ErrorMessage name="message" component="div" className="error" />
            </div>
            {status && status.success && <div className="success">Submission successful!</div>}
            {status && !status.success && <div className="error">Submission failed. Please try again.</div>}
            <button type="submit" disabled={isSubmitting}>
              {isSubmitting ? 'Submitting...' : 'Submit'}
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default ContactForm;
