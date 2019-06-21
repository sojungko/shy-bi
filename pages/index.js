import Link from 'next/link';
import App from '../src/containers/App';

const Home = () => (
  <App>
    <div className="image-container">
      <img
        role="presentation"
        className="splash"
        src="../../styles/imgs/couple-1734001_1920.jpg"
      />
    </div>
  </App>
)

Home.getInitialProps() {

}

export default withRouter(Home);