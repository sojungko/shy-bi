import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Card from '@material-ui/core/Card';
// import CardHeader from '@material-ui/core/CardHeader';
// import CardContent from '@material-ui/core/CardContent';
// import TextField from '@material-ui/core/TextField';
// import RadioGroup from '@material-ui/core/RadioGroup';
// import Radio from '@material-ui/core/Radio';
// import Button from '@material-ui/core/Button';

import { updateMinAge, updateMaxAge, updateCity, updateSex, clearFields, filterUser } from 'actions';

const { input, select, textarea } = ReactDOM;

class SearchBar extends Component {
  static propTypes = {
    minage: PropTypes.string,
    maxage: PropTypes.string,
    city: PropTypes.string,
    updateMinAge: PropTypes.func,
    updateMaxAge: PropTypes.func,
    updateCity: PropTypes.func,
    clearFields: PropTypes.func,
    filterUser: PropTypes.func,
    updateSex: PropTypes.func,
    inputs: PropTypes.shape({
      minage: PropTypes.string,
      maxage: PropTypes.string,
      city: PropTypes.string,
    }),
  }

  componentDidUpdate() {
    this.props.filterUser(this.props.inputs);
  }

  handleChange = ({ target: { name, value } }) => {
    switch (name) {
      case 'minage':
        this.props.updateMinAge(value);
        break;
      case 'maxage':
        this.props.updateMaxAge(value);
        break;
      case 'city':
        this.props.updateCity(value);
        break;
      case 'sex':
        this.props.updateSex(value);
        break;
      default:
        return null;
    }

    return null;
  }

  handleClick = () => {
    this.props.clearFields();
  }

  render() {
    const { minage, maxage, city } = this.props;
    return (
      <div style={{ position: 'fixed', marginTop: '76px', height: '100%', fontFamily: 'Source Sans Pro' }}>
        {/* <CardHeader
          titleStyle={{ fontFamily: 'Source Sans Pro', fontSize: '30px' }}
          title="Search"
        /> */}
        <textarea
          floatingLabelText="Minimum Age"
          name="minage"
          type="number"
          value={minage}
          onChange={this.handleChange}
        />
        <textarea
          floatingLabelText="Maximum Age"
          name="maxage"
          type="number"
          value={maxage}
          onChange={this.handleChange}
        />
        <select
          name="sex"
          onChange={this.handleChange}
        >
          <option
            value="Male"
            label="Male"
          />
          <option
            value="Female"
            label="Female"
          />
        </select>
        <textarea
          floatingLabelText="City"
          type="text"
          name="city"
          value={city}
          onChange={this.handleChange}
        />
        <button labelStyle={{ fontFamily: 'Source Sans Pro' }} label="Clear Fields" onClick={this.handleClick} />
      </div>
    );
  }
}

const mapStateToProps = ({ filterInputs }) => ({
  inputs: filterInputs,
  minage: filterInputs.minage,
  maxage: filterInputs.maxage,
  sex: filterInputs.sex,
  city: filterInputs.city,
});

export default connect(mapStateToProps, { updateMinAge, updateMaxAge, updateCity, updateSex, clearFields, filterUser })(SearchBar);
