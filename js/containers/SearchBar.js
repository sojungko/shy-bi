import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { Field, reduxForm } from 'redux-form';
import { searchUsers } from '../actions/index';

class SearchBar extends Component {

  render() {
    const { handleSubmit, pristine, reset, submitting } = this.props;
    return (
      <form onSubmit={handleSubmit(searchUsers)} className="input-group">
        <h3>Search</h3>
        <div>
          <label>Age</label>
          <Field name="minAge" component="input" type="number"/>
          <Field name="maxAge" component="input" type="number"/>
        </div>
        <div>
          <label>Sex</label>
          <div>
            <label><Field name="sex" component="input" type="radio" value="male"/> Male</label>
            <label><Field name="sex" component="input" type="radio" value="female"/> Female</label>
          </div>
        </div>
        <div>
          <label>City</label>
          <Field name="city" component="input" type="text" />
        </div>
        <button type="submit" disabled={pristine || submitting}>Submit</button>
        <button type="button" disabled={pristine || submitting} onClick={reset}>Undo Changes</button>
      </form>
    );
  }
}

export default reduxForm({ form: 'SearchForm' }, null, { searchUsers })(SearchBar);
