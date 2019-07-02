import React, { Component } from 'react';
import { func } from 'prop-types';
import { connect } from 'react-redux';
import InputRange from 'react-input-range';
import { Form, Field } from 'react-final-form';
import classNames from 'classnames';

import {
  filterUsers,
  clearFields,
} from 'actions';

import { genders } from 'constants/form';

class SearchBar extends Component {
  static propTypes = {
    clearFields: func.isRequired,
    filterUsers: func.isRequired,
  }
  constructor(props) {
    super(props);

    this.state = {
      sex: {
        Male: false,
        Female: false,
        Other: false,
      },
      ageRange: {
        min: 19,
        max: 100,
      }
    }
  }

  // changes display only
  handleAgeChange = (val) => {
    this.setState({ ageRange: val });
  }

  submitAgeChange = ({ min, max }) => {
    this.props.filterUsers({ sex: this.state.sex, minage: min, maxage: max });
  }

  handleSexChange = (e) => {
    const { target } = e;
    const { name} = target;
    const updatedState = { ...this.state.sex, [name]: !this.state.sex[name] }
    this.setState({ sex: updatedState });
    const { ageRange } = this.state;
    this.props.filterUsers({sex: updatedState, minage: ageRange.min, maxage: ageRange.max });
  }

  handleClick = () => {
    this.props.clearFields();
  }

  render() {
    return (
      <section>
        <Form
          onSubmit={() => {}}
          render={() => (
            <form className="form form__left">
              <h2 className="form--title form--title__filters">Filters</h2>
              <label className="form--label">Age</label>
              <InputRange
                name="ageRange"
                maxValue={100}
                minValue={19}
                value={this.state.ageRange}
                onChange={this.handleAgeChange}
                onChangeComplete={this.submitAgeChange}
              />
              <div className="form--group">
                <label className="form--label">Sex</label>
                {genders.map(gender => (
                  <label>
                    <Field
                      name={gender}
                      component="input"
                      type="checkbox"
                      onChange={this.handleSexChange}
                      checked={this.state.sex[gender]}
                    />
                    {gender}
                  </label>
                ))}
              </div>
              <button
                className={
                  classNames({
                    'button': true,
                    'button__flat': true,
                    'button__large': true,
                    'form--submit': true,
                  })
                }
                onClick={this.handleClick}
              >
                Clear Fields
              </button>
            </form>
          )}
        />
      </section>
    );
  }
}

export default connect(null, {
  clearFields,
  filterUsers,
})(SearchBar);
