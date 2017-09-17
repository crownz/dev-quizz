import * as React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from "react-redux";

import { validateHTML } from '../../../../../actions/progress';
import './code.scss';

interface CodeProps {
  question: Question;
  onSelect: Function;
  validateHTML: any;
}

interface CodeState {
  value: any;
  valid: boolean;
  messages: { message: string; }[];
}

export class Code extends React.Component<CodeProps, CodeState> {

  constructor(props: CodeProps) {
    super(props);
    this.validate = this.validate.bind(this);
    this.state = { value: props.question.selected || '', valid: true, messages: [] };
  }

  componentWillReceiveProps(nextProps: CodeProps) {
    this.setState({ value: nextProps.question.selected });
  }

  updateValue(value: string) {
    this.setState({ value });
  }

  validate() {
    const { value } = this.state;
    const { onSelect, question: { id } } = this.props;

    this.props.validateHTML(value).then(({ messages }) => {
      this.setState({ valid: !messages.length, messages });
      onSelect(id, value);
    });
  }

  renderTextArea() {
    const { value, valid } = this.state;

    return (
      <textarea onChange={ e => this.updateValue(e.target.value) }
                value={ value }
                className={ `textarea ${valid ? '' : 'invalid'}` } />
    );
  }

  renderValidate() {
    return (
      <div className="validate">
        <button className="validate-button" onClick={ this.validate }>VALIDATE</button>
      </div>
    );
  }

  renderMessages() {
    const { messages, valid } = this.state;

    return (
      <div className={ `messages ${valid ? '' : 'invalid'}` }>
        { messages.map(({ message }, idx) => <div key={ idx } className="msg">{ message }</div>) }
      </div>
    );
  }

  render() {
    const { question } = this.props;

    return (
      <div className="variants" data-hook="code-container">
        <div className="variants-label" data-hook="code-label">{ question.label }</div>
        { this.renderTextArea() }
        { this.renderValidate() }
        { this.renderMessages() }
      </div>
    )
  }

  static mapDispatchToProps(dispatch) {
    return bindActionCreators({ validateHTML }, dispatch);
  }
}

export default connect(null, Code.mapDispatchToProps)(Code);
