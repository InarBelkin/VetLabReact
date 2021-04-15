import React, { Component } from 'react';
import { Route } from 'react-router';
import { Layout } from './components/Layout';
import { Home } from './components/Home';
import { FetchData } from './components/FetchData';
import { Counter } from './components/Counter';

import './custom.css'

class KokinUrod extends Component {
  render() {
    return <p>{this.props.Param}</p>


  }
}



export default class App extends Component {
  static displayName = App.name;

  render () {
    return (
       //<p>Hello</p>
       //  <KokinUrod Param = {"ПОставь зачьёт "}/>

     <Layout>
       <Route exact path='/' component={Home} />
        <Route path='/counter' component={Counter} />
        <Route path='/fetch-data' component={FetchData} />
      </Layout>
    );
  }
}
