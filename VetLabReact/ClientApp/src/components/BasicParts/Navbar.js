import React, {Component} from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import {NavLink} from "react-router-dom";
import s from "./Navbar.module.css"
import ModalAuthorization from "../Content/Register/ModalAuthorization ";
import Example from "../Content/Register/Example";

class BsNavbar extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
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
                            <NavLink to={"/postcreate"} className="nav-link">Редактор</NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink to={"/register"} className="nav-link">Регистрация</NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink to={"/add-city"} className="nav-link">Add city</NavLink>
                        </li>
                    </ul>
                </div>
                <Example/>
              {/*  <form className="form-inline my-2 my-lg-0">
                    <button className="btn btn-outline-dark" type="submit">Авторизация</button>

                </form>*/}

            </nav>
        )
    }

}

export default BsNavbar