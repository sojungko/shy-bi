import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Card } from 'material-ui/Card';
import TextField from 'material-ui/TextField';
import { RadioButton, RadioButtonGroup } from 'material-ui/RadioButton';
import RaisedButton from 'material-ui/RaisedButton';

import styles from '../styles/SearchBar';
import { updateMinAge, updateMaxAge, updateCity, clearFields } from '../actions/FilterInputActions';

class SearchBar extends Component {
  static propTypes = {
    minage: PropTypes.string,
    maxage: PropTypes.string,
    sex: PropTypes.string,
    city: PropTypes.string,
    updateMinAge: PropTypes.func,
    updateMaxAge: PropTypes.func,
    updateCity: PropTypes.func,
    clearFields: PropTypes.func,
  }

  handleChange = ({ target: { name, value } }) => {
    switch (name) {
      case 'minage':
        return this.props.updateMinAge(value);
      case 'maxage':
        return this.props.updateMaxAge(value);
      case 'city':
        return this.props.updateCity(value);
      default:
        return null;
    }
  }

  handleClick = () => {
    this.props.clearFields();
  }

  render() {
    const { minage, maxage, sex, city } = this.props;
    return (
      <div>
        <Card>
          <form>
            <div style={styles.cardMargin}>
              <h2 className="card-heading">Search</h2>
              <div className="field-line">
                <TextField
                  floatingLabelText="Minimum Age"
                  name="minage"
                  type="number"
                  value={minage}
                  onChange={this.handleChange}
                />
              </div>
              <div className="field-line">
                <TextField
                  floatingLabelText="Maximum Age"
                  name="maxage"
                  type="number"
                  value={maxage}
                  onChange={this.handleChange}
                />
              </div>
              <div className="field-line">
                <RadioButtonGroup
                  name="sex"
                  defaultSelected="male"
                >
                  <RadioButton
                    value="male"
                    label="Male"
                    style={styles.radioButton}
                  />
                  <RadioButton
                    value="female"
                    label="Female"
                    style={styles.radioButton}
                  />
                </RadioButtonGroup>
              </div>
              <div className="field-line">
                <TextField
                  floatingLabelText="City"
                  type="text"
                  name="city"
                  value={city}
                  onChange={this.handleChange}
                />
              </div>
            </div>
          </form>
          <RaisedButton label="Clear Fields" style={styles} onClick={this.handleClick} />
        </Card>
      </div>
    );
  }
}

const mapStateToProps = ({ filterInputs }) => ({
  minage: filterInputs.minage,
  maxage: filterInputs.maxage,
  sex: filterInputs.sex,
  city: filterInputs.city,
});

export default connect(mapStateToProps, { updateMinAge, updateMaxAge, updateCity, clearFields })(SearchBar);
