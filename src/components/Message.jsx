import React, { Component, PropTypes } from 'react';
import { Card, CardActions, CardHeader, CardMedia, CardTitle, CardText } from 'material-ui/Card';

import { Link } from 'react-router';

class Message extends Component {

  constructor(props) {
    super(props);
    this.state = {
      expanded: false,
    };
  }

  handleExpandChange = (expanded) => {
    this.setState({ expanded });
  };

  handleToggle = (event, toggle) => {
    this.setState({ expanded: toggle });
  };

  handleExpand = () => {
    this.setState({ expanded: true });
  };

  handleReduce = () => {
    this.setState({ expanded: false });
  };

  render() {
    const { title, sentBy, senderID, body } = this.props.message;
    return (
      <Card expanded={this.state.expanded} onExpandChange={this.handleExpandChange}>
        <CardHeader
          title={<Link to={`/profile/${senderID}`}>{senderID}</Link>}
          subtitle={title}
          avatar="http://www.color-hex.com/palettes/3899.png"
          actAsExpander
          showExpandableButton
        />
        <CardText>
          <p>{`${body.slice(0, 20)}...`}</p>
        </CardText>
        <CardTitle title={title} subtitle="Card subtitle" expandable />
        <CardText expandable>
          {body}
        </CardText>
      </Card>
    );
  }
}

Message.propTypes = {
  message: PropTypes.shape({
    title: PropTypes.string.isRequired,
    sentBy: PropTypes.string.isRequired,
    senderID: PropTypes.string.isRequired,
    body: PropTypes.string.isRequired,
  }),
};

export default Message;
