import React from 'react';
import { shallow } from 'enzyme';
import sinon from 'sinon';
import { Code } from 'components/page/quizz/questions/code';

describe('Component: Code', function () {

  it('should render Code component', function () {
    const driver = createDriver({});
    expect(driver.element('code-container').exists()).to.be.true;
  });

  it('should render the question', function () {
    const driver = createDriver({});
    expect(driver.element('code-label').text()).to.equal('Enter valid html containing title: Developer quizz');
  });

  it('should set no classes when validity is unknown', function () {
    const driver = createDriver({});
    expect(driver.element('code-input').hasClass('invalid')).to.be.false;
    expect(driver.element('code-input').hasClass('valid')).to.be.false;
  });

  it('should set invalid classes when input is invalid', function () {
    const driver = createDriver({ newQuestion: { valid: false } });
    expect(driver.element('code-input').hasClass('invalid')).to.be.true;
    expect(driver.element('code-messages').hasClass('invalid')).to.be.true;
  });

  it('should set valid classes when input is valid', function () {
    const driver = createDriver({ newQuestion: { valid: true } });
    expect(driver.element('code-input').hasClass('valid')).to.be.true;
    expect(driver.element('code-messages').hasClass('invalid')).to.be.false;
  });

  it('should render messages received from validation', async () => {
    const validateHTML = (value) => {
      return new Promise((resolve, reject) => {
        resolve({ messages: [{ message: 'm1' }, { message: 'm2' }] });
      });
    };

    const driver = createDriver({ validateHTML });
    driver.element('validate-button').click();
    await fakeAsync();
    expect(driver.element('code-messages').children().length).to.equal(2);
    expect(driver.element('code-messages').children().at(0).text()).to.equal('m1');
    expect(driver.element('code-messages').children().at(1).text()).to.equal('m2');
  });

  it('should call onSelect', async function () {
    const validateHTML = (value) => {
      return new Promise((resolve, reject) => {
        resolve({ messages: [{ message: 'm1' }, { message: 'm2' }] });
      });
    };

    const selectSpy = sinon.spy();
    const driver = createDriver({ onSelect: selectSpy, validateHTML });
    driver.element('validate-button').click();
    await fakeAsync();
    expect(selectSpy.calledOnce).to.be.true;
  });
});

const createDriver = ({ newQuestion = {}, onSelect = () => ({}), validateHTML = () => [] }) => {
  const wrapper = shallow(
    <Code { ...getProps({ newQuestion, onSelect, validateHTML }) } />
  );

  return {
    element: hook => {
      const el = wrapper.find(`[data-hook="${hook}"]`);
      return {
        exists: () => el.length > 0,
        text: () => el.text(),
        hasClass: className => el.hasClass(className),
        children: () => el.children(),
        click: () => el.simulate('click')
      }
    }
  };
};

const getProps = ({ newQuestion, onSelect, validateHTML }) => {
  return { question: Object.assign({}, question, newQuestion), onSelect, validateHTML}
};

const question = {
  id: 'q0',
  label: 'Enter valid html containing title: Developer quizz',
  type: 'code',
  selected: '',
  answer: '<title>Developer quizz</title>'
};

function fakeAsync() {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve();
    }, 10);
  });
}
