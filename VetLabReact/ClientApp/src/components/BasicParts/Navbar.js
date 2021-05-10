import React, {Component} from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import {NavLink} from "react-router-dom";
import s from "./Navbar.module.css"
import ModalAuthorization from "../Content/Register/ModalAuthorization";


class BsNavbar extends Component {
    constructor(props) {
        super(props);
        this.state = {isAdmin:false};
        this.getUser = this.getUser.bind(this);
        this.getUser();
    }

    async getUser() {
        let request = await fetch("/api/Account/isAuthenticated", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            }
        });
        var res = await request.json();
        if (res.isAuth) {
            var b = res.roles[0] == 'Admin' ? true : false;
            this.setState({isAdmin: b});
        }
    }

    render() {
        var editor = this.state.isAdmin ?                         <li className="nav-item">
            <NavLink to={"/postcreate"} className="nav-link">Редактор</NavLink>
        </li> : <li></li>

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
                       <li>
                           {editor}
                       </li>
                        <li className="nav-item">
                            <NavLink to={"/register"} className="nav-link">Регистрация</NavLink>
                        </li>
                    </ul>
                </div>
                <ModalAuthorization/>
                {/*  <form className="form-inline my-2 my-lg-0">
                    <button className="btn btn-outline-dark" type="submit">Авторизация</button>

                </form>*/}

            </nav>
        )
    }

}

export default BsNavbar