import * as React from 'react';
import Quizz from './quizz';
import './app.scss';

export default class AppComponent extends React.Component<any, any> {
  render() {
    return (
      <div className="container">
        <Quizz />
      </div>
    );
  }
}
