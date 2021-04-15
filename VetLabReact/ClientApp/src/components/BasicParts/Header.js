import React, {Component} from 'react';
import s from './Header.module.css';
import {NavLink} from "reactstrap";

class Header extends Component {
    render() {
        return (
            <header>
                <nav>
                    <ul>
                        <link rel="stylesheet" type="text/css" href="//fonts.googleapis.com/css?family=Lobster"/>
                        <li><p>Новости</p></li>
                        <li>
                            <div className={s.DivNavL}><NavLink className={s.NavL}> Text2</NavLink></div>
                        </li>

                    </ul>
                </nav>
            </header>

            // <p>Text</p>
        )
    }


}

export default Header;