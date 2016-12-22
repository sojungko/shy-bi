import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Field, reduxForm } from 'redux-form';
import Slider from 'material-ui/Slider';
import { RadioButton, RadioButtonGroup } from 'material-ui/RadioButton';
import TextField from 'material-ui/TextField';

const styles = {
  block: {
    maxWidth: 250,
  },
  radioButton: {
    marginBottom: 16,
  },
};

class SearchBar extends Component {

  render() {
    const { handleSubmit, pristine, reset, submitting } = this.props;
    return (
      <form onSubmit={handleSubmit} className="input-group">
        <h3>Search</h3>
        <div>
          <label>Age</label>
          <Slider></Slider>

        </div>
        <div>
          <label>Sex</label>
          <RadioButtonGroup name="shipSpeed" defaultSelected="not_light">
            <RadioButton
              value="not_light"
              label="Male"
              style={styles.radioButton}
            />
            <RadioButton
              value="light"
              label="Female"
              style={styles.radioButton}
            />
          </RadioButtonGroup>
        </div>
        <div>
          <label>City</label>
          <TextField /><br />
        </div>
        <button type="submit" disabled={pristine || submitting}>Submit</button>
        <button type="button" disabled={pristine || submitting} onClick={reset}>Undo Changes</button>
      </form>
    );
  }
}

export default SearchBar;
