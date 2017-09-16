import * as React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from "react-redux";

import { getProgress } from '../../actions/progress';

import Loader from './loader';
import './quizz.scss';

interface QuizzProps {
  loading: boolean;
  getProgress: Function;
}

class Quizz extends React.Component<QuizzProps, any> {

  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.getProgress();
  }

  render() {
    return (
      <div className="quizz">
        { this.props.loading ? <Loader /> : null }
        <div>
          swx2
        </div>
      </div>
    )
  }

  static mapStateToProps(state: State) {
    console.log("state:", state);
    return {
      loading: state.loading
    }
  };

  static mapDispatchToProps(dispatch) {
    return bindActionCreators({ getProgress }, dispatch);
  }
}


export default connect(Quizz.mapStateToProps, Quizz.mapDispatchToProps)(Quizz);
