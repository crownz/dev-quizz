import * as React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from "react-redux";

import { getProgress } from '../../actions/progress';

import Loader from './loader';
import Quizz from './quizz';
import './page.scss';

interface PabgeProps {
  loading: boolean;
  progress: Question[];
  getProgress: Function;
}

interface PageState {
  name: string;
}

class Page extends React.Component<PabgeProps, PageState> {

  constructor(props) {
    super(props);
    this.beginTest = this.beginTest.bind(this);
    this.state = { name: '' };
  }

  beginTest() {
    this.props.getProgress(this.state.name);
  }

  renderStart() {
    return (
      <div className="start-container">
        <div className="start-title">
          Enter your name to begin!
        </div>
        <div className="input-container">
          <input className="name-input" onChange={ e => this.setState({ name: e.target.value })}/>
          <button className="start-button" onClick={ this.beginTest }>BEGIN</button>
        </div>

      </div>
    )
  }

  renderQuizz() {
    return (
      <Quizz name={ this.state.name } />
    )
  }

  render() {
    const { loading, progress } = this.props;

    return (
      <div className="page">
        { loading ? <Loader /> : null }
        <div className={ `page-inner ${loading ? 'blur' : ''}` }>
          { progress ? this.renderQuizz() : this.renderStart() }
        </div>
      </div>
    )
  }

  static mapStateToProps(state: State) {
    return {
      loading: state.loading,
      progress: state.progress
    }
  };

  static mapDispatchToProps(dispatch) {
    return bindActionCreators({ getProgress }, dispatch);
  }
}


export default connect(Page.mapStateToProps, Page.mapDispatchToProps)(Page);
