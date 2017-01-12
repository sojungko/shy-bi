import React from 'react';
import { Card, CardActions, CardHeader, CardMedia, CardTitle, CardText } from 'material-ui/Card';


const AboutUs = () => {
  return (
    <div style={{ textAlign: 'center' }}>
      <Card>
        <CardTitle
          title="JW Garrison"
        />
        <CardText>
          I'm Justin HAHA
        </CardText>
      </Card>
      <Card>
        <CardTitle
          title="Sojung Park"
        />
        <CardText>
          <p>Was a journalist</p>
        </CardText>
      </Card>
      <Card>
        <CardTitle
          title="Peter Schussheim"
        />
        <CardText>
          I'm Peterrr
        </CardText>
      </Card>
    </div>
  );
};

export default AboutUs;
