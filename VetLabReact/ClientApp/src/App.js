import React, {Component} from 'react';
import {Route} from 'react-router';

import './custom.css'


import Header from "./components/BasicParts/Header";
import BsNavbar from "./components/BasicParts/Navbar";
import Content from "./components/Content/Content";

export default class App extends Component {
    static displayName = App.name;

    render() {
        return (
            <div>
                <BsNavbar/>
                <Content/>
            </div>
        );
    }
}
