import React from 'react';
import { Provider } from 'react-redux';
import withRedux from 'next-redux-wrapper';
import App, { Container } from 'next/app';

import makeStore from '../src/store';

class ShyBi extends App {
  render() {
    const { Component, pageProps, store } = this.props;

    return (
      <Container>
        <Provider store={store}>
          <Component {...pageProps} />
        </Provider>
      </Container>
    );
  }
}

export default withRedux(makeStore)(ShyBi);
