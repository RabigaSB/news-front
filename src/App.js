import React, {Component, Fragment} from 'react';
import Toolbar from "./components/UI/Toolbar/Toolbar";
import News from "./containers/News/News";
import {Route, Switch} from "react-router-dom";
import New from './containers/New/New';
import Post from './containers/Post/Post';

class App extends Component {
  render() {
    return (
        <Fragment>
          <header>
            <Toolbar/>
          </header>
          <main className="container">
              <Switch>
                <Route path="/" exact component={News} />
                <Route path="/news/new" exact component={New} />
                <Route path="/news/:id" component={Post} />
              </Switch>
          </main>
        </Fragment>
    );
  }
}

export default App;

