import * as React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from "react-redux";

import { QUESTIONS } from './questions';
import './quizz.scss';

interface QuizzProps {
  progress: Question[];
}

interface QuizzState {
  activeQuestion: number;
}

class Quizz extends React.Component<QuizzProps, QuizzState> {

  constructor(props: QuizzProps) {
    super(props);
    this.state = { activeQuestion: 0 };
  }

  changeActiveQuestion(idx: number) {
    this.setState({ activeQuestion: idx });
  }

  renderSelectionContainer() {
    return (
      <div className="selection-container">
        { this.props.progress.map((question: Question, idx: number) => this.renderSelection(question.id, idx)) }
      </div>
    )
  }

  renderSelection(id: string, idx: number) {
    return (
      <div className={ `selection ${this.state.activeQuestion === idx ? 'active' : ''}` } key={ id } onClick={ () => this.changeActiveQuestion(idx) }>
        { idx }
      </div>
    )
  }

  renderQuestion() {
    const type = this.props.progress[this.state.activeQuestion].type;
    const Component = QUESTIONS[type];

    if (!Component) {
      return;
    }

    return (
      <Component />
    );
  }

  renderContent() {
    return (
      <div className="content">
        { this.state.activeQuestion !== 0 && <button>PREVIOUS</button> }
        { this.renderQuestion() }
        { this.state.activeQuestion !== this.props.progress.length - 1 && <button>NEXT</button> }
      </div>
    );
  }

  renderHeader() {
    return (
      <div className="quizz-header">
        <button>BACK</button>
        { this.renderSelectionContainer() }
        <button>FINISH</button>
      </div>
    );

  }

  render() {
    return (
      <div className="quizz">
        { this.renderHeader() }
        { this.renderContent() }
      </div>
    )
  }

  static mapStateToProps(state: State) {

    return {
      progress: state.progress
    }
  };

  static mapDispatchToProps(dispatch) {
    return bindActionCreators({

    }, dispatch);
  }

}

export default connect(Quizz.mapStateToProps, Quizz.mapDispatchToProps)(Quizz);
