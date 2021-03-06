import * as React from 'react';
import './variants.scss';

interface VariantsProps {
  question: Question;
  onSelect: Function;
}

interface VariantsState {
  selected: any;
}

export default class Variants extends React.Component<VariantsProps, VariantsState> {

  constructor(props: VariantsProps) {
    super(props);

    this.state = { selected: props.question.selected || null };
  }

  componentWillReceiveProps(nextProps: VariantsProps) {
    this.setState({ selected: nextProps.question.selected });
  }

  selectVariant(value: any) {
    const { question, onSelect } = this.props;
    this.setState({ selected: value });
    onSelect(question.id, value);
  }

  renderVariant(variant: Variant, idx: number) {
    return (
      <div key={ `${idx}-${variant.value}` }
           className={ `variant ${variant.value === this.state.selected ? 'selected' : ''}` }
           onClick={ () => this.selectVariant(variant.value) }
           data-hook={ `option-${variant.value}` }>
        { variant.label }
      </div>
    );
  }

  render() {
    const { question } = this.props;

    return (
      <div className="variants" data-hook="variants-container">
        <div className="variants-label" data-hook="variants-label">{ question.label }</div>
        <div data-hook="options">
        { question.variants.map((variant: Variant, idx: number) => this.renderVariant(variant, idx)) }
        </div>
      </div>
    )
  }
}
