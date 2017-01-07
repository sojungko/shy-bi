import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Card } from 'material-ui/Card';
import TextField from 'material-ui/TextField';
import { RadioButton, RadioButtonGroup } from 'material-ui/RadioButton';
import RaisedButton from 'material-ui/RaisedButton';

const styles = {
  block: {
    maxWidth: 250,
  },
  radioButton: {
    marginBottom: 16,
  },
  margin: 12,
  cardMargin: {
    paddingTop: 50,
    paddingLeft: 100,
  },
};

class SearchBar extends Component {

  render() {
    return (
      <div>
        <Card>
          <form>
            <div style={styles.cardMargin}>
              <h2 className="card-heading">Search</h2>
              <div className="field-line">
                <TextField
                  floatingLabelText="Minimum Age"
                  name="minAge"
                  type="number"
                />
              </div>
              <div className="field-line">
                <TextField
                  floatingLabelText="Maximum Age"
                  name="maxAge"
                  type="number"
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
                />
              </div>
            </div>
          </form>
          <RaisedButton label="Clear Fields" style={styles} />
        </Card>
      </div>
    );
  }
}

const mapStateToProps = ({ filterInputs }) => ({ filterInputs });
export default connect(mapStateToProps, null)(SearchBar);
