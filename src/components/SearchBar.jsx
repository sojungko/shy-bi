import React, { Component, PropTypes } from 'react';
import { Field, reduxForm } from 'redux-form';
import { filterUsers } from '../actions/index';

console.log('COMPONENT/SEARCH BAR | Exporting SEARCH BAR...');
console.log('COMPONENT/SEARCH BAR | IMPORTING Action: filterUsers from ACTIONS');

class SearchBar extends Component {
  static propTypes = {
    filterUsers: PropTypes.func.isRequired,
  }

  componentDidMount() {
    console.log('      COMPONENT/SEARCH BAR | Complete Rendering SEARCH BAR ');
    console.log('      COMPONENT/SEARCH BAR | this.props : ', this.props);
  }

  componentWillReceiveProps(nextProps) {
    // console.log('    COMPONENT/SEARCH BAR | Receiving Props: ', nextProps);
    console.log('      COMPONENT/SEARCH BAR | Receiving Props');
  }

  componentDidUpdate() {
    console.log('      COMPONENT/SEARCH BAR | Complete Rendering SEARCH BAR ');
  }

  render() {
    console.log('      COMPONENT/SEARCH BAR | Rendering SEARCH BAR Component...');
    const { handleSubmit, pristine, reset, submitting } = this.props;
    return (
      <form onSubmit={handleSubmit(this.props.filterUsers)}>
        <h3>Search</h3>
        <div>
          <label>Age</label>
          <Field name="minAge" component="input" type="number" />
          <Field name="maxAge" component="input" type="number" />
        </div>
        <div>
          <label>Sex</label>
          <div>
            <label><Field name="sex" component="input" type="radio" value="male" /> Male</label>
            <label><Field name="sex" component="input" type="radio" value="female" /> Female</label>
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

// console.log('COMPONENT/SEARCH BAR & REDUX FORM | Mapping actions to props: ', searchUsers);
console.log('COMPONENT/SEARCH BAR | Connecting SEARCH BAR with Redux Form');
console.log('COMPONENT/SEARCH BAR & REDUX FORM | Mapping actions to props:  searchUsers');

export default reduxForm({ form: 'search' }, null, { filterUsers })(SearchBar);

console.log('COMPONENT/SEARCH BAR | Exported SEARCH BAR ');
console.log(' ');
