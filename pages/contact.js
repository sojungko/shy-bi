import React from 'react';
import classNames from 'classnames';
import { Form, Field } from 'react-final-form';

import App from 'components/App';
import { renderField, renderTextArea } from 'components/Form';

const Contact = () => (
  <App>
    <div className="page__container">
      <Form
        onSubmit={() => {}}
        render={({ handleSubmit, pristine, invalid }) => (
          <form onSubmit={handleSubmit} className="form form__left">
            <h2 className="form--title">Contact Us</h2>
            <Field render={renderField} name="name" label="Name" />
            <Field
              name="email"
              type="email"
              component={renderField}
              label="Email"
            />
            <Field
              name="message"
              component={renderTextArea}
              label="Write Us Something Sweet"
            />
            <button
              className={classNames({
                button: true,
                button__disabled: invalid || pristine,
                button__flat: true,
                button__large: true,
                'form--submit': true,
              })}
              type="submit"
              disabled={invalid || pristine}
            >
              Submit
            </button>
          </form>
        )}
      />
    </div>
  </App>
);

export default Contact;
