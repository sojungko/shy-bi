import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Field, reduxForm } from 'redux-form';
import { RadioButtonGroup, RadioButton, TextField } from 'redux-form-material-ui'


class SearchBar extends Component {

  render() {
    const { handleSubmit, pristine, reset, submitting } = this.props;
    return (
      <form onSubmit={handleSubmit} className="input-group">
        <h3>Search</h3>
        <div>
          <label>Age</label> <br/>
          <Field name="minAge" component={TextField} type="number"/>
          <Field name="maxAge" component={TextField} type="number"/>
        </div>
        <div>
          <label>Sex</label>
          <Field name="sex" component={RadioButtonGroup}>
            <RadioButton value="male" label="Male"/>
            <RadioButton value="female" label="Female"/>
          </Field>
        </div>
        <div>
          <label>City</label>
          <Field name="city" component={TextField} type="text"/>
        </div>
        <button type="submit" disabled={pristine || submitting}>Submit</button>
        <button type="button" disabled={pristine || submitting} onClick={reset}>Undo Changes</button>
      </form>
    );
  }
}

export default reduxForm({
  search: 'SearchForm',
}, null, null)(SearchBar);
