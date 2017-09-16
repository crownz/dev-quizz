import React from 'react';
import { shallow } from 'enzyme';
import Variants from 'components/page/quizz/questions/variants';

describe('Component: Variants', function () {

  it('should render Variants component', function () {
    const driver = createDriver();
    expect(driver.element('variants-container').exists()).to.be.true;
  });
});

const createDriver = (props = {}) => {
  const wrapper = shallow(
    <Variants { ...getProps(props) } />
  );

  return {
    element: () => {
      const element = hook => wrapper.find(`[data-hook=${hook}]`);
      return {
        exists: () => element.length > 0
      }
    }
  };
};

const getProps = (newProps) => {
  return Object.assign({}, { question, onSelect: () => ({}) }, newProps);
}

const question = {
  id: 'q1',
  label: 'A programmer is to a computer as a teacher is to:',
  type: 'variants',
  variants: [
    {
      label: 'A desk',
      value: 'desk'
    },
    {
      label: 'A student',
      value: 'student'
    },
    {
      label: 'A library',
      value: 'library'
    },
    {
      label: 'A principal',
      value: 'principal'
    }
  ],
  selected: ''
};
