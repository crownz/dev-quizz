import * as React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from "react-redux";
import { withRouter } from 'react-router-dom'

import { updateProgress, cleanProgress } from '../../../actions/progress';

import { QUESTIONS } from './questions';
import './quizz.scss';

interface QuizzProps {
  progress: Question[];
  name: string;
  updateProgress: any;
  cleanProgress: any;
}

interface QuizzState {
  activeQuestion: number;
}

class Quizz extends React.Component<QuizzProps, QuizzState> {

  constructor(props: QuizzProps) {
    super(props);
    this.updateProgress = this.updateProgress.bind(this);
    this.state = { activeQuestion: 0 };
  }

  changeActiveQuestion(idx: number) {
    this.setState({ activeQuestion: idx });
  }

  updateProgress(id: string, value: any, valid?: boolean) {
    this.props.updateProgress(this.props.name, id, value, valid);
  }

  navigate(forward: boolean = true) {
    const { activeQuestion } = this.state;
    this.setState({ activeQuestion: forward ? activeQuestion + 1 : activeQuestion - 1 });
  }

  goBack(history) {
    this.props.cleanProgress();
    history.push('/home');
  }

  finish(history) {
    this.props.cleanProgress();
    history.push(`/result/${this.props.name}`);
  }

  renderSelectionContainer() {
    return (
      <div className="selection-container" data-hook="selection-container">
        { this.props.progress.map((question: Question, idx: number) => this.renderSelection(question.id, idx)) }
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
      <Component question={ this.props.progress[this.state.activeQuestion] } onSelect={ this.updateProgress } />
    );
  }

  renderContent() {
    return (
      <div className="content" data-hook="content">
        <div className="navigation">
          { this.state.activeQuestion !== 0 &&
            <button data-hook="navigate-back"
                    onClick={ () => this.navigate(false) }
                    className="navigation-button">
              PREVIOUS
            </button> }
        </div>
        { this.renderQuestion() }
        <div className="navigation">
          { this.state.activeQuestion !== this.props.progress.length - 1 &&
            <button data-hook="navigate-forward"
                    className="navigation-button"
                    onClick={ () => this.navigate() }>
              NEXT
            </button> }
        </div>
      </div>
    );
  }

  renderSelection(id: string, idx: number) {
    const getClassName = () => {
      const isActive = this.state.activeQuestion === idx ? 'active' : '';
      const isAnswered = this.props.progress[idx].selected ? 'answered' : '';

      return `selection ${isAnswered} ${isActive}`;
    };

    return (
      <div className={ getClassName() } key={ id } onClick={ () => this.changeActiveQuestion(idx) }>
        { idx }
      </div>
    )
  }

  renderBackButton() {
    const Button = withRouter(({ history }) => (
      <button onClick={ () => this.goBack(history) } data-hook="back">
        BACK
      </button>));

    return <Button />;
  }

  renderFinishButton() {
    const Button = withRouter(({ history }) => (
      <button onClick={ () => this.finish(history) } data-hook="finish">
        FINISH
      </button>));

    return <Button />;
  }

  renderHeader() {
    return (
      <div className="quizz-header">
        { this.renderBackButton() }
        { this.renderSelectionContainer() }
        { this.renderFinishButton() }
      </div>
    );
  }

  render() {
    return (
      <div className="quizz" data-hook="quizz-container">
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
    return bindActionCreators({ updateProgress, cleanProgress }, dispatch);
  }
}

export default connect(Quizz.mapStateToProps, Quizz.mapDispatchToProps)(Quizz);
