import * as React from 'react';
import './App.css';
import { Switch, Route, withRouter, RouteComponentProps, Link } from 'react-router-dom';
import Home from './components/Home';
import Create from './components/cakes/Create';
import View from './components/cakes/View'


class App extends React.Component<RouteComponentProps<any>> {
  public render() {
    return (
      <div className="container">
        <nav>
          <ul>
            <li>
              <Link to={'/'}> Home </Link>
            </li>
            <li>
              <Link to={'/create'}> Create </Link>
            </li>
          </ul>
        </nav>
        <Switch>
          <Route path={'/'} exact component={Home} />
          <Route path={'/create'} exact component={Create} />
          <Route path={'/view/:id'} exact component={View} />
        </Switch>
      </div>
    );
  }
}
export default withRouter(App);