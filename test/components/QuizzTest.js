import React from 'react';
import { mount } from 'enzyme';
import sinon from 'sinon';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { Router } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import Quizz from 'components/page/quizz/quizz';
import rootReducer from 'reducers';
import { getQuestions} from '../../src/mock-data';

const initialState = { progress: getQuestions() };
const history = createBrowserHistory({ basename: '' });

describe('Component: Quizz', function () {

  it('should render Quizz component', function () {
    const driver = createDriver();
    expect(driver.element('quizz-container').exists()).to.be.true;
  });

  it('should render the header', function () {
    const driver = createDriver({});
    expect(driver.element('back').exists()).to.be.true;
    expect(driver.element('finish').exists()).to.be.true;
    expect(driver.element('selection-container').exists()).to.be.true;
    expect(driver.element('selection-container').children().length).to.equal(4);
  });

  it('should render first selection active', function () {
    const driver = createDriver({});
    expect(driver.selection().at(0).isActive()).to.be.true;
    expect(driver.selection().at(1).isActive()).to.be.false;
    expect(driver.selection().at(2).isActive()).to.be.false;
    expect(driver.selection().at(3).isActive()).to.be.false;
  });

  it('should select second question', function () {
    const driver = createDriver({});
    expect(driver.selection().at(0).isActive()).to.be.true;
    driver.selection().at(1).select();
    expect(driver.selection().at(0).isActive()).to.be.false;
    expect(driver.selection().at(1).isActive()).to.be.true;
  });

  it('should mark second question as answered', function () {
    const newState = Object.assign({}, initialState);
    newState.progress[1].selected = 'asdf';
    const driver = createDriver({}, newState);
    expect(driver.selection().at(1).isCompleted()).to.be.true;
  });

  it('should render only navigate forward button', function () {
    const driver = createDriver();
    expect(driver.element('navigate-back').exists()).to.be.false;
    expect(driver.element('navigate-forward').exists()).to.be.true;
  });

  it('should navigate navigation buttons and display both after', function () {
    const driver = createDriver();
    driver.element('navigate-forward').click();
    expect(driver.element('navigate-back').exists()).to.be.true;
    expect(driver.element('navigate-forward').exists()).to.be.true;
  });
});

const createDriver = (newProps = {}, state = initialState) => {
  const store = createStore(rootReducer, state, applyMiddleware(...[thunk]));

  const wrapper = mount(
    <Router history={ history }>
      <Provider store={ store }>
      <Quizz { ...getProps(newProps) } />
    </Provider>
    </Router>
  );

  return {
    element: hook => {
      const el = wrapper.find(`[data-hook="${hook}"]`);
      return {
        exists: () => el.length > 0,
        text: () => el.text(),
        hasClass: className => el.hasClass(className),
        children: () => el.children(),
        click: () => el.simulate('click'),
      }
    },
    selection: () => {
      const selections = wrapper.find(`[data-hook="selection-container"]`).children();
      return {
        at: index => {
          const selection = selections.at(index);
          return {
            isActive: () => selection.hasClass('active'),
            isCompleted: () => selection.hasClass('answered'),
            select: () => selection.simulate('click')
          }
        }
      }
    }
  };
};

const getProps = (newProps) => {
  return Object.assign({}, { name: 'asd' }, newProps);
};
