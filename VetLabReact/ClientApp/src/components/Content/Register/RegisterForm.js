import React, {Component} from 'react';
import 'bootstrap/dist/css/bootstrap.css';


class RegisterForm extends Component {
    constructor(props) {
        super(props);
        this.state = {login: "", pass: "", passConf: "", message: "", errors: []}
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
        var res = await request.json();
        this.setState({message: res.message});
        if (!request.ok && res.error != undefined && res.error != null) {
            this.state.errors = res.error;
            this.setState({errors: res.error});
        } else {
            this.setState({errors:[]});
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
                    <div>{this.state.errors.map(function (mes) {
                        /* if(this.state.errors.count>0)*/
                        return <p>{mes}</p>
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
                    <p>Подтверждение пароля:</p>
                    <input value={this.state.passConf}
                           name="passConf"
                           type={"password"}
                           onChange={this.onChange}/>
                    <div><button onClick={this.OnRegister} >Регистрация</button></div>
                </form>

            </div>
        )
    }
}

export default RegisterForm;