import React from 'react';
import { shallow } from 'enzyme';
import sinon from 'sinon';
import Variants from 'components/page/quizz/questions/variants';

describe('Component: Variants', function () {

  it('should render Variants component', function () {
    const driver = createDriver({});
    expect(driver.element('variants-container').exists()).to.be.true;
  });

  it('should render the question', function () {
    const driver = createDriver({});
    expect(driver.element('variants-label').text()).to.equal('A programmer is:');
  });

  it('should render selected answer', function () {
    const driver = createDriver({ newQuestion: { selected: 'desk' } });
    const option = driver.element('option-desk');
    expect(option.hasClass('selected')).to.be.true;
  });

  it('should call onSelect', function () {
    const selectSpy = sinon.spy();
    const driver = createDriver({ onSelect: selectSpy });
    const option = driver.element('option-desk');
    option.click();
    expect(selectSpy.calledOnce).to.be.true;
  });
});

const createDriver = ({ newQuestion = {}, onSelect = () => ({}) }) => {
  const wrapper = shallow(
    <Variants { ...getProps({ newQuestion, onSelect }) } />
  );

  return {
    element: hook => {
      const el = wrapper.find(`[data-hook="${hook}"]`);
      return {
        exists: () => el.length > 0,
        text: () => el.text(),
        hasClass: className => el.hasClass(className),
        click: () => el.simulate('click')
      }
    }
  };
};

const getProps = ({ newQuestion, onSelect }) => {
  return { question: Object.assign({}, question, newQuestion), onSelect}
};

const question = {
  id: 'q1',
  label: 'A programmer is:',
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
