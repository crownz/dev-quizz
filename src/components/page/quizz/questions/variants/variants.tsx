import * as React from 'react';
import './variants.scss';

interface VariantsProps {
  question: Question;
  onSelect: Function;
}

interface VariantsState {
  selected: any;
}

export default class Variants extends React.Component<any, any> {

  constructor(props: VariantsProps) {
    super(props);
    this.state = ({ selected: props.question.selected || null });
  }

  selectVariant(value: any) {
    this.setState({ selected: value });
    this.props.onSelect(this.props.question.id, value);
  }

  renderVariant(variant: Variant, idx: number) {
    return (
      <div key={ `${idx}-${variant.value}` } className={ `variant ${variant.value === this.state.selected ? 'selected' : ''}` } onClick={ () => this.selectVariant(variant.value) }>
        { variant.label }
      </div>
    );
  }

  render() {
    console.log("RENDERING VARIANTs!", this.props.question);
    return (
      <div className="variants">
        { this.props.question.variants.map((variant: Variant, idx: number) => this.renderVariant(variant, idx)) }
      </div>
    )
  }
}
