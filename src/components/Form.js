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
    {options.map(({ label, value }) => (
      <label key={value}>
        <Field
          {...input}
          component="input"
          type="radio"
          value={value}
        />
        {label}
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
      {options.map(({ label, value }) => (
        <option
          key={value}
          value={value}
        >
          {label}
        </option>
      ))}
    </Field>
  </div>
);

export const renderSelectNumber = ({ input, name, label, options, ...rest }) => (
  <div className="form--group">
    <label className="form--label">{label}</label>
    <Field
      name={name}
      component="select"
      {...input}
    >
      {options.map((option) => (
        <option
          key={option}
          value={option}
        >
          {option}
        </option>
      ))}
    </Field>
  </div>
)

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
