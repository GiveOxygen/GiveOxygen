import React, { Fragment } from 'react';
import { Router, Route } from 'react-router-dom';
import DocumentTitle from 'react-document-title';
import { createBrowserHistory } from 'history';

import App from './app/App';
import Website from './website/Website';

const routes = [{
  component: Website,
  label: 'Home',
  paths: [
    '/', '/web', '/home',
  ],
}, {
  component: App,
  label: 'App',
  paths: [
    '/app',
  ],
}];

const TITLE = 'Give Oxygen';

const history = createBrowserHistory();

const Home = () => {
  return (
    <Router history={history}>
      {
        routes.map((route, index)=>(
          <Fragment key={index}>
            {route.paths.map((path)=>(
              <Route key={path} exact path={path} render={ (props) => {
                return (
                  <DocumentTitle title={`${route.label} | ${TITLE}`}>
                    <route.component {...props} />
                  </DocumentTitle>);
              }}/>
            ))}
          </Fragment>
        ))
      }
    </Router>
  );
};

export default Home;
