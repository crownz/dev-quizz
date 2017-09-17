import * as React from 'react';
import { withRouter } from 'react-router-dom'
import './home.scss';

interface HomeState {
  name: string;
}

export default class Home extends React.Component<{}, HomeState> {

  constructor(props) {
    super(props);
    this.state = { name: '' };
  }

  renderButton() {
    const Button = withRouter(({ history }) => (
      <button
        className="start-button"
        onClick={() => { history.push(`/quizz/${this.state.name}`) }}>
        BEGIN
      </button>));

    return <Button />;
  }

  render() {
    return (
      <div className="start-container">
        <div className="start-title">
          Enter your name to begin!
        </div>
        <div className="input-container">
          <input className="name-input" onChange={ e => this.setState({ name: e.target.value })}/>
          { this.renderButton() }
        </div>
      </div>
    );
  }
}
