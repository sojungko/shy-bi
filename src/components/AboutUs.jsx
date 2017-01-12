import React from 'react';
import { Card, CardActions, CardHeader, CardMedia, CardTitle, CardText } from 'material-ui/Card';


const titleStyle = {
  fontSize: '400%',
  fontFamily: 'Bitter',
};
const nameTitleStyle = {
  fontSize: '200%',
  fontFamily: 'Bitter',
};
const textStyle = {
  fontSize: '20px',
  fontFamily: 'Lato',
};

const AboutUs = () => {
  return (
    <div style={{ textAlign: 'center' }}>
      <Card>
        <CardTitle
          title="BIND"
          titleStyle={titleStyle}
        />
        <CardText
          style={textStyle}
        >
          <p>The world is evolving to embrace more gays and lesbians.</p>
          <br></br>
          <p>We did not want bi people to feel left out.</p>
          <br></br>
          <br></br>
          <br></br>
          <p>Started out initially as 'ShyBi,' 'Bind' has evolved into a dating app for the sophisticated bicurious people.</p>
          <br></br>
          <br></br>
          <br></br>
          <p>No more shot-in-the-dark style dating.</p>
          <br></br>
          <p>'Bind' provides a safe platform for anyone to explore his or her sexual orientation.</p>
        </CardText>
      </Card>
      <Card>
        <CardTitle
          title="JW Garrison"
          titleStyle={nameTitleStyle}
        />
        <CardText
          style={textStyle}
        >
          <p>I'm Justin.</p>
        </CardText>
      </Card>
      <Card>
        <CardTitle
          title="Sojung Park"
          titleStyle={nameTitleStyle}
        />
        <CardText
          style={textStyle}
        >
        <div>
          <p>Like JW, Sojung hails from South Korea and moved to New York by herself at the tender age of 17.</p>
          <p>After graduating from Northwestern University with a B.A. in chemistry, she worked as an English journalist in South Korea for five years.</p>
          <p>She recently returned to New York to relaunch her career as a software engineer.</p>
          <p>In her free time, she loves to play with make-up, post product reviews on YouTube and occasionally dabble in poker.</p>
        </div>
        </CardText>
      </Card>
      <Card>
        <CardTitle
          title="Peter Schussheim"
          titleStyle={nameTitleStyle}
        />
        <CardText
          style={textStyle}
        >
          <p>I'm Peterr</p>
        </CardText>
      </Card>
    </div>
  );
};

export default AboutUs;
