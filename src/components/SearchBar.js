import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import InputRange from 'react-input-range';
import { Form, Field } from 'react-final-form';
import classNames from 'classnames';

import {
  updateAgeRange,
  updateCity,
  updateSex,
  clearFields,
} from 'actions';

import { genders } from 'constants/form';

class SearchBar extends Component {
  static propTypes = {
    minage: PropTypes.string,
    maxage: PropTypes.string,
    city: PropTypes.string,
    updateAgeRange: PropTypes.func,
    updateCity: PropTypes.func,
    clearFields: PropTypes.func,
    updateSex: PropTypes.func,
    inputs: PropTypes.shape({
      minage: PropTypes.string,
      maxage: PropTypes.string,
      city: PropTypes.string,
    }),
  }
  constructor(props) {
    super(props);

    this.state = {
      sex: {
        male: false,
        female: false,
        other: false,
      },
      ageRange: {
        min: 19,
        max: 100,
      }
    }
  }

  componentDidUpdate() {
    // this.props.filterUser(this.props.inputs);
  }

  handleAgeChange = (val) => {
    this.setState({ ageRange: val });
    this.props.updateAgeRange(val);
  }

  handleChange = (e) => {
    const { target } = e;
    const { name, value } = target;
    switch (name) {
      case 'male':
      case 'female':
      case 'other':
        const updatedState = { ...this.state.sex, [value]: !this.state.sex[value] }
        this.props.updateSex(updatedState);
        break;
      default:
        return null;
    }

    // return null;
  }

  handleClick = () => {
    this.props.clearFields();
  }

  render() {
    // const { minage, maxage, city } = this.props;
    return (
      <section>
        <Form
          onSubmit={() => {}}
          render={() => (
            <form className="form form__left">
              <h2 className="form--title">Filters</h2>
              <label>Age</label>
              <InputRange
                name="ageRange"
                maxValue={100}
                minValue={19}
                value={this.state.ageRange}
                onChange={this.handleAgeChange}
              />
              <div className="form--group">
                <label className="form--label">Sex</label>
                {genders.map(({ label, value }) => (
                  <label>
                    <Field
                      name={value}
                      component="input"
                      type="checkbox"
                      value={this.state[value]}
                    />
                    {label}
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

const mapStateToProps = ({ filterInputs }) => ({
  inputs: filterInputs,
  // minage: filterInputs.minage,
  // maxage: filterInputs.maxage,
  // sex: filterInputs.sex,
  // city: filterInputs.city,
});

export default connect(mapStateToProps, {
  updateAgeRange,
  updateCity,
  updateSex,
  clearFields,
})(SearchBar);
