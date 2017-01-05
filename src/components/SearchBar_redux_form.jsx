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
    pristine: PropTypes.boolean,
    reset: PropTypes.func,
  }

  render() {
    console.log('      COMPONENT/SEARCH BAR | Rendering SEARCH BAR Component...');
    const { pristine, reset } = this.props;
    return (
      <div>
        <Card>
          <form>
            <h2 className="card-heading">Search</h2>
            <div className="field-line">
              <Field name="minAge" type="number" component={renderTextField} label="Minimum Age" />
            </div>
            <div className="field-line">
              <Field name="maxAge" type="number" component={renderTextField} label="Maximum Age" />
            </div>
            <div className="field-line">
              <Field name="sex" component={renderRadioGroup}>
                <RadioButton value="male" label="male" />
                <RadioButton value="female" label="female" />
              </Field>
            </div>
            <div className="field-line">
              <Field name="city" type="text" component={renderTextField} label="City" />
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

const selector = formValueSelector('SearchBarForm')
SearchBar = connect(
  state => {
    // can select values individually
    const hasEmailValue = selector(state, 'hasEmail')
    const favoriteColorValue = selector(state, 'favoriteColor')
    // or together as a group
    const { firstName, lastName } = selector(state, 'firstName', 'lastName')
    return {
      hasEmailValue,
      favoriteColorValue,
      fullName: `${firstName || ''} ${lastName || ''}`
    };
  },
)(SearchBar);

// export default reduxForm({ form: 'search' }, null, { filterUsers })(SearchBar);
export default connect(null, { filterUsersBySex, filterUsersByMinAge, filterUsersByMaxAge, filterUsersByCity })(SearchBar);

console.log('COMPONENT/SEARCH BAR | Exported SEARCH BAR ');
console.log(' ');
