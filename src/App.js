import React, { Component } from 'react';
import Header from "./Header";
import Panel from "./Panel";

import './App.css';
import './Header.css';

class App extends Component {
  render() {
    return (
      <div className="App">
       <Header value="Adverity+" className="component-header"/>
       <Header value="Programming Challenge" className="component-header-gray"/>
       <Header value="Javascript: datastructures, typeAhead, groupBy / filter, aggregates" className="component-text"/>
       <Panel />
      </div>
    );
  }
}

export default App;