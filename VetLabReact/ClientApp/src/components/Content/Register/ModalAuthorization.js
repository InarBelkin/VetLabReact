import React, {Component, useState} from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import {Button, Modal} from "react-bootstrap";

class ModalAuthorization extends Component {
    constructor(props) {
        super(props);
        this.state = {show: false,login:"",pass:"",remember:false}
        this.handleShow = this.handleShow.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    onChange(e) {
        var name = e.target.name;
        var value = e.target.value;
        this.setState({[name]: value});
    }

    async onSubmit(){
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

    }

    handleClose() {
        this.setState({show: false});
    }

    handleShow() {
        this.setState({show: true});
    }



    render() {
        return (
            <>
                <Button variant="primary" onClick={this.handleShow}>
                    Авторизоваться
                </Button>
                <Modal show={this.state.show} onHide={this.handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>Авторизация</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
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
                        <input type="checkbox" name = "remember"
                               onChange={this.onChange}/>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={this.handleClose}>
                            Close
                        </Button>
                        <Button variant="primary" onClick={this.handleClose}>
                            Save Changes
                        </Button>
                    </Modal.Footer>
                </Modal>
            </>
        )
    }


}

export default ModalAuthorization;

