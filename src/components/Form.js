import { Field } from 'react-final-form';

export const renderField = ({ input, label, meta: { touched, error, warning } }) => (
  <div className="form--group">
    <label className="form--label">{label}</label>
    <input {...input} className="form--input" />
    {
      touched && error && <span className="form--warning">{error}</span>
    }
  </div>
);

export const renderRadioGroup = ({ input, label, options, ...rest }) => (
  <div className="form--group">
    <label className="form--label">{label}</label>
    {options.map(option => (
      <label key={option.toLowerCase()}>
        <Field
          {...input}
          component="input"
          type="radio"
          value={option.toLowerCase()}
        />
        {option}
      </label>
    ))}
  </div>
);

export const renderSelect = ({ input, name, label, options, ...rest }) => (
  <div className="form--group">
    <label className="form--label">{label}</label>
    <Field
      name={name}
      component="select"
      {...input}
    >
      {options.map(option => (
        <option
          key={option.toLowerCase().replace(' ', '_')}
          value={option.toLowerCase().replace(' ', '_')}
        >
          {option}
        </option>
      ))}
    </Field>
  </div>
);

export const renderTextArea = ({ input, name, label, ...rest }) => (
  <div className="form--group">
    <label className="form--label">{label}</label>
    <Field
      name={name}
      component="textarea"
      {...input}
    />
  </div>
);
