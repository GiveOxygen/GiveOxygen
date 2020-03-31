import React, { Fragment } from 'react';
import { Router, Route } from 'react-router-dom';
import DocumentTitle from 'react-document-title';
import { createBrowserHistory } from 'history';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';

import App from './app/App';
import Website from './website/Website';

const theme = createMuiTheme({
  palette: {
    primary: {
      light: '#8da8c9',
      main: '#6896CE',
      dark: '#4280c9',
      contrastText: '#fff',
    },
  },
  status: {
    danger: 'orange',
  },
});

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
    '/app/test',
    '/app/user/profile',
  ],
}];

const TITLE = 'Give Oxygen';

const history = createBrowserHistory();

const Home = () => {
  return (
    <ThemeProvider theme={theme}>
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
    </ThemeProvider>
  );
};

export default Home;
