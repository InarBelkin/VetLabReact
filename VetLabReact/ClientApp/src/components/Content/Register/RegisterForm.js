import React, {Component} from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import {Button} from "reactstrap";

class RegisterForm extends Component {
    constructor(props) {
        super(props);
        this.state = {login: "", pass: "", passConf: "", message: ""}
        this.OnRegister = this.OnRegister.bind(this);
        this.onChange = this.onChange.bind(this);
    }

    async OnRegister() {
        let request = await fetch("/api/account/register", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify({
                "Login": this.state.login,
                "Password": this.state.pass,
                "PasswordConfirm": this.state.passConf
            })
        });
        if (request.ok) {
            var res = await request.json();
            this.setState({message: res.message});

        }
    }

    onChangeLogin(e) {
        this.setState({login: e.target.value});
    }

    onChange(e) {
        var name = e.target.name;
        var value = e.target.value;
        this.setState({[name]: value});
    }

    render() {
        return (
            <div>
                <form>
                    <p>{this.state.message}</p>
                    <p>Логин:</p>
                    <input value={this.state.login}
                           name="login"
                           onChange={this.onChange}/>
                    <p>Пароль:</p>
                    <input value={this.state.pass}
                           name="pass"
                           onChange={this.onChange}/>
                    <p>Подтверждение пароля:</p>
                    <input value={this.state.passConf}
                           name="passConf"
                           onChange={this.onChange}/>
                    <Button onClick={this.OnRegister}>Регистрация</Button>
                </form>

            </div>
        )
    }
}

export default RegisterForm;