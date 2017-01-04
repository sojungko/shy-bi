import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Card } from 'material-ui/Card';
import TextField from 'material-ui/TextField';
import { RadioButton, RadioButtonGroup } from 'material-ui/RadioButton';
import RaisedButton from 'material-ui/RaisedButton';

import { filterUsersBySex, filterUsersByMinAge, filterUsersByMaxAge, filterUsersByCity } from '../actions/index';

console.log('COMPONENT/SEARCH BAR | Exporting SEARCH BAR...');
console.log('COMPONENT/SEARCH BAR | IMPORTING Action: filterUsers from ACTIONS');

const styles = {
  block: {
    maxWidth: 250,
  },
  radioButton: {
    marginBottom: 16,
  },
  margin: 12,
};

class SearchBar extends Component {
  static propTypes = {
    filterUsersBySex: PropTypes.func.isRequired,
    filterUsersByMinAge: PropTypes.func.isRequired,
    filterUsersByMaxAge: PropTypes.func.isRequired,
    filterUsersByCity: PropTypes.func.isRequired,
  }

  constructor(props) {
    super(props);
    this.state = {
      filter_sex: '',
      filter_minAge: '',
      filter_maxAge: '',
      filter_city: '',
    };
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

  onMinAgeChange = (e) => {
    this.props.filterUsersByMinAge(e.target.value);
  }

  onMaxAgeChange = (e) => {
    this.props.filterUsersByMaxAge(e.target.value);
  }

  onSexChange = (e) => {
    this.props.filterUsersBySex(e.target.value);
  }

  onCityChange = (e) => {
    this.props.filterUsersByCity(e.target.value);
  }

  handleClick = () => {
    this.setState({
      filter_sex: '',
      filter_minAge: '',
      filter_maxAge: '',
      filter_city: '',
    });
  }

  render() {
    console.log('      COMPONENT/SEARCH BAR | Rendering SEARCH BAR Component...');
    return (
      <div>
        <Card>
          <form>
            <h2 className="card-heading">Search</h2>
            <div className="field-line">
              <TextField
                floatingLabelText="Minimum Age"
                name="minAge"
                type="number"
                onChange={this.onMinAgeChange}
                value={this.state.filter_minAge}
              />
            </div>
            <div className="field-line">
              <TextField
                floatingLabelText="Maximum Age"
                name="maxAge"
                type="number"
                onChange={this.onMaxAgeChange}
                value={this.state.filter_maxAge}
              />
            </div>
            <div className="field-line">
              <RadioButtonGroup
                name="sex"
                defaultSelected="male"
                onChange={this.onSexChange}
                valueSelected={this.state.filter_sex}
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
                onChange={this.onCityChange}
                value={this.state.filter_city}
              />
            </div>
          </form>
          <RaisedButton label="Clear Fields" style={styles} onClick={this.handleClick} />
        </Card>
      </div>
    );
  }
}

// console.log('COMPONENT/SEARCH BAR & REDUX FORM | Mapping actions to props: ', searchUsers);
console.log('COMPONENT/SEARCH BAR | Connecting SEARCH BAR with Redux Form');
console.log('COMPONENT/SEARCH BAR & REDUX FORM | Mapping actions to props:  searchUsers');


// export default reduxForm({ form: 'search' }, null, { filterUsers })(SearchBar);
export default connect(null, { filterUsersBySex, filterUsersByMinAge, filterUsersByMaxAge, filterUsersByCity })(SearchBar);

console.log('COMPONENT/SEARCH BAR | Exported SEARCH BAR ');
console.log(' ');
