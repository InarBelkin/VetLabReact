import React, {Component} from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import {NavLink} from "react-router-dom";
import  s from "./Navbar.module.css"

class BsNavbar extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        return(
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <div className="navbar-brand" style={{margin: 0, padding: 0}}>
                    <NavLink to={"/"} className={s.LogoStyle}>Скучные новости</NavLink>
                </div>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className={"navbar-nav" + ' ' + s.forUL}>
                        <li className="nav-item">
                            <NavLink to={"/"} className="nav-link">Список</NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink to={"/postedit"} className="nav-link">Редактор</NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink to={"/add-airplane"} className="nav-link">Add airplane</NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink to={"/add-city"} className="nav-link">Add city</NavLink>
                        </li>
                    </ul>
                </div>
            </nav>
        )
    }

}
export default BsNavbar