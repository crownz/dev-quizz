import * as React from 'react';
import { Router, Route } from 'react-router-dom';
import { connect } from "react-redux";

import Loader from './loader';
import Home from './home';
import Quizz from './quizz';
import Result from './result';

import './page.scss';

interface PageProps {
  loading: boolean;
  history: any;
}

class Page extends React.Component<PageProps, {}> {

  constructor(props: PageProps) {
    super(props);
  }

  render() {
    const { loading, history } = this.props;

    return (
      <div className="page">
        { loading ? <Loader /> : null }
        <Router history={ history }>
          <div className="page-inner">
            <Route exact path="/home" component={ Home } />
            <Route exact path="/quizz/:name" component={ Quizz } />
            <Route exact path="/result/:name" component={ Result } />
          </div>
        </Router>
      </div>
    );
  }

  static mapStateToProps(state: State) {
    return {
      loading: state.loading
    }
  };
}


export default connect(Page.mapStateToProps)(Page);
