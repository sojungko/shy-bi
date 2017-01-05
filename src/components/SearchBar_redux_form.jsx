import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { reduxForm, Field, formValueSelector } from 'redux-form';
import { Card } from 'material-ui/Card';
import { RadioButton } from 'material-ui/RadioButton';
import RaisedButton from 'material-ui/RaisedButton';
import { renderTextField, renderRadioGroup } from './Presentational';

import { filterUsersBySex, filterUsersByMinAge, filterUsersByMaxAge, filterUsersByCity } from '../actions/index';

console.log('COMPONENT/SEARCH BAR | Exporting SEARCH BAR...');
console.log('COMPONENT/SEARCH BAR | IMPORTING Action: filterUsers from ACTIONS');

class SearchBar extends Component {
  static propTypes = {
    filterUsersBySex: PropTypes.func.isRequired,
    filterUsersByMinAge: PropTypes.func.isRequired,
    filterUsersByMaxAge: PropTypes.func.isRequired,
    filterUsersByCity: PropTypes.func.isRequired,
    handleSubmit: PropTypes.func.isRequired,
    pristine: PropTypes.boolean,
    reset: PropTypes.func,
  }

  onMinAgeChange = (event, value) => {
    console.log('MIN AGE CHANGE event: ', event);
    console.log('MIN AGE CHANGE value : ', value);
    // this.props.filterUsersByMinAge(input);
  }

  onMaxAgeChange = (input) => {
    console.log('MAX AGE CHANGE input : ', input);
    // this.props.filterUsersByMaxAge(input);
  }

  onSexChange = (input) => {
    console.log('SEX CHANGE input : ', input);
    // this.props.filterUsersBySex(input);
  }

  onCityChange = (input) => {
    console.log('CITY CHANGE input : ', input);
    // this.props.filterUsersByCity(input);
  }

  render() {
    console.log('      COMPONENT/SEARCH BAR | Rendering SEARCH BAR Component...');
    const { handleSubmit, pristine, reset } = this.props;
    console.log('     COMPONENT/SEARCH BAR | handleSubmit : ', handleSubmit);
    return (
      <div>
        <Card>
          <form>
            <h2 className="card-heading">Search</h2>
            <div className="field-line">
              <Field
                name="filter_minAge"
                type="number"
                component={renderTextField}
                listener={handleSubmit(this.onMinAgeChange)}
                label="Minimum Age"
              />
            </div>
            <div className="field-line">
              <Field
                name="filter_maxAge"
                type="number"
                component={renderTextField}
                onChange={this.onMaxAgeChange}
                label="Maximum Age"
              />
            </div>
            <div className="field-line">
              <Field name="filter_sex" component={renderRadioGroup}>
                <RadioButton value="male" label="male" />
                <RadioButton value="female" label="female" />
              </Field>
            </div>
            <div className="field-line">
              <Field
                name="filter_city"
                type="text"
                component={renderTextField}
                onChange={this.onCityChange}
                label="City"
              />
            </div>
          </form>
          <RaisedButton label="Clear Fields" disabled={pristine} onClick={reset} />
        </Card>
      </div>
    );
  }
}

// console.log('COMPONENT/SEARCH BAR & REDUX FORM | Mapping actions to props: ', searchUsers);
console.log('COMPONENT/SEARCH BAR | Connecting SEARCH BAR with Redux Form');
console.log('COMPONENT/SEARCH BAR & REDUX FORM | Mapping actions to props:  searchUsers');

SearchBar = reduxForm({
  form: 'SearchBarForm',
})(SearchBar);
//
// const selector = formValueSelector('SearchBarForm');
// SearchBar = connect(
//   (state) => {
//     const values = selector(state, 'filter_minAge', 'filter_maxAge', 'filter_sex', 'filter_city');
//     return values;
//   },
// )(SearchBar);

// export default reduxForm({ form: 'search' }, null, { filterUsers })(SearchBar);
export default connect(null, { filterUsersBySex, filterUsersByMinAge, filterUsersByMaxAge, filterUsersByCity })(SearchBar);

console.log('COMPONENT/SEARCH BAR | Exported SEARCH BAR ');
console.log(' ');
