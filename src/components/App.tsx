import * as React from 'react';
import { createBrowserHistory } from 'history';
import Page from './page';
import './app.scss';

const history = createBrowserHistory({ basename: '' });

export default () => {
  return (
    <div className="container">
      <Page history={ history } />
    </div>
  );
}
