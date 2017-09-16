import * as React from 'react';
import Page from './page';
import './app.scss';

export default class AppComponent extends React.Component<any, any> {
  render() {
    return (
      <div className="container">
        <Page />
      </div>
    );
  }
}
