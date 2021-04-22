import React, {Component, useState} from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import {Button, Modal} from "react-bootstrap";
import s from "./ModalAuthorization.module.css"

class ModalAuthorization extends Component {
    constructor(props) {
        super(props);
        this.state = {
            show: false, login: "", pass: "", remember: false, message: "", errors: [],
            username: "", isAuth: false, nameButton: ""
        }
        this.handleShow = this.handleShow.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.onChange = this.onChange.bind(this);
        this.onAuthorize = this.onAuthorize.bind(this);
        this.onChangeCheck = this.onChangeCheck.bind(this);
        this.getUser = this.getUser.bind(this);
        this.OnLogout = this.OnLogout.bind(this);
        this.setAuthorize = this.setAuthorize.bind(this);
        this.ClickButton = this.ClickButton.bind(this);
        this.getUser();
    }

    setAuthorize(value) {
        if (value) {
            this.setState({nameButton: "Выйти"});
        } else this.setState({nameButton: "Авторизоваться"});
        this.setState({isAuth: value});
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
            this.setState({username: res.user.userName});
        } else this.setState({username: "Гость"});
        this.setAuthorize(res.isAuth);
        //this.setState({isAuth: res.isAuth});
    }

    onChange(e) {
        var name = e.target.name;
        var value = e.target.value;
        this.setState({[name]: value});
    }

    onChangeCheck(e) {
        if (e.target.value == "on") {
            this.setState({remember: true});
        } else this.setState({remember: false});
    }

    async onAuthorize(event) {
        event.preventDefault();
        let request = await fetch("/api/Account/Login", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify({
                "Login": this.state.login,
                "Password": this.state.pass,
                "RememberMe": this.state.remember
            })
        });
        var res = await request.json();
        this.setState({message: res.message});
        if (res.error != undefined && res.error != null) {
            this.setState({errors: res.error})
        } else {
            this.setState({errors: []});
        }
        this.getUser();
        if (request.ok) {
            this.handleClose();
        }
    }

    async OnLogout() {
        let request = await fetch("/api/Account/LogOut", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
        })
        await this.getUser();
    }

    handleClose() {
        this.setState({show: false});
    }

    handleShow() {
        this.setState({show: true});
    }

    ClickButton() {
        if (this.state.isAuth) {
            this.OnLogout();
        } else this.handleShow();
    }

    render() {
        return (
            <>
                <p>{this.state.username}</p>
                <Button variant="primary" onClick={this.ClickButton}>
                    {this.state.nameButton}
                </Button>

                <Modal show={this.state.show} onHide={this.handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>Авторизация</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <div>{this.state.message}</div>
                        <div>{this.state.errors.map(function (err) {
                            return <div>{err}</div>
                        })}</div>
                        <p>Логин:</p>
                        <input value={this.state.login}
                               name="login"
                               onChange={this.onChange}/>
                        <p>Пароль:</p>
                        <input value={this.state.pass}
                               type={"password"}
                               name="pass"
                               onChange={this.onChange}/>
                        <p>Запомнить авторизацию:</p>
                        <input type="checkbox" name="remember"
                               onChange={this.onChangeCheck}/>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={this.handleClose}>
                            Close
                        </Button>
                        <Button variant="primary" onClick={this.onAuthorize}>
                            Применить
                        </Button>
                    </Modal.Footer>
                </Modal>
            </>
        )
    }


}

export default ModalAuthorization;

