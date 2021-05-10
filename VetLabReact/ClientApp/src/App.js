import React, {Component} from 'react';
import {Route} from 'react-router';

import './custom.css'
import s from "./components/Content/Content.module.css"

import Header from "./components/BasicParts/Header";
import BsNavbar from "./components/BasicParts/Navbar";
import Content from "./components/Content/Content";

export default class App extends Component {
    static displayName = App.name;

    render() {
        return (
            <div className={s.CBack}>
                <BsNavbar/>
                <Content/>
            </div>
        );
    }
}
