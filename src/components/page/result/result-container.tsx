import * as React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from "react-redux";

import { calculateResult } from '../../../actions/result';

import Result from './result';

interface ResultContainerProps {
  result: Result;
  calculateResult: any;
  match: any;
}

class ResultContainer extends React.Component<ResultContainerProps, {}> {

  constructor(props: ResultContainerProps) {
    super(props);
    props.calculateResult(props.match.params.name);
  }

  render() {
    const { result, match } = this.props;
    return result ? <Result name={ match.params.name } label={ constructLabel(result.total, result.correct) } /> : <div />
  }

  static mapStateToProps(state: State) {
    return {
      result: state.result
    }
  };

  static mapDispatchToProps(dispatch) {
    return bindActionCreators({ calculateResult }, dispatch);
  }
}

export default connect(ResultContainer.mapStateToProps, ResultContainer.mapDispatchToProps)(ResultContainer);

function constructLabel(total, correct) {
  return `You have correctly answered ${correct} out of ${total} answers!`
}
