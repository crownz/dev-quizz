import * as React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from "react-redux";

import { getProgress } from '../../../actions/progress';

import Quizz from './quizz';

interface QuizzContainerProps {
  loaded: boolean;
  getProgress: any;
  match: any;
}

class QuizzContainer extends React.Component<QuizzContainerProps, {}> {

  constructor(props: QuizzContainerProps) {
    super(props);
    props.getProgress(props.match.params.name);
  }

  render() {
    return this.props.loaded ? <Quizz name={ this.props.match.params.name } /> : <div />
  }

  static mapStateToProps(state: State) {
    return {
      loaded: !!state.progress
    }
  };

  static mapDispatchToProps(dispatch) {
    return bindActionCreators({ getProgress }, dispatch);
  }
}

export default connect(QuizzContainer.mapStateToProps, QuizzContainer.mapDispatchToProps)(QuizzContainer);
