import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Card from '@material-ui/core/Card';
// import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import TextField from '@material-ui/core/TextField';
import RadioGroup from '@material-ui/core/RadioGroup';
import Radio from '@material-ui/core/Radio';
import Button from '@material-ui/core/Button';

import styles from '../styles/SearchBar';
import { updateMinAge, updateMaxAge, updateCity, updateSex, clearFields, filterUser } from '../actions/FilterInputActions';

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
      <Card style={{ position: 'fixed', marginTop: '76px', height: '100%', fontFamily: 'Source Sans Pro' }}>
        {/* <CardHeader
          titleStyle={{ fontFamily: 'Source Sans Pro', fontSize: '30px' }}
          title="Search"
        /> */}
        <TextField
          floatingLabelText="Minimum Age"
          name="minage"
          type="number"
          value={minage}
          style={styles}
          onChange={this.handleChange}
        />
        <TextField
          floatingLabelText="Maximum Age"
          name="maxage"
          type="number"
          value={maxage}
          style={styles}
          onChange={this.handleChange}
        />
        <RadioGroup
          name="sex"
          onChange={this.handleChange}
          style={styles}
        >
          <Radio
            value="Male"
            label="Male"
            style={styles.radioButton}
          />
          <Radio
            value="Female"
            label="Female"
            style={styles.radioButton}
          />
        </RadioGroup>
        <TextField
          floatingLabelText="City"
          type="text"
          name="city"
          value={city}
          style={styles}
          onChange={this.handleChange}
        />
        <Button labelStyle={{ fontFamily: 'Source Sans Pro' }} label="Clear Fields" onClick={this.handleClick} />
      </Card>
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
