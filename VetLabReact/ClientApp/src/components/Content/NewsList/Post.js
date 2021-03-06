import React, {Component, useState, useEffect} from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import {Button, Modal} from "react-bootstrap";
import s from "./Post.module.css";
import {NavLink} from "react-router-dom";
import dayjs from 'dayjs';

class Post extends Component {
    constructor(props) {
        super(props);
        this.state = {post: props.mpost, isAdmin: false}
        this.onClick = this.onClick.bind(this);
        this.onClickEdit = this.onClickEdit.bind(this);
        //this.state = {props.}
        //this.getUser = this.getUser.bind(this);
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

    onClick(e) {
        this.props.onRemove(this.state.post);
    }

    onClickEdit(e) {
        this.props.onEdit(this.state.post)
    }

    render() {
        var delB = this.state.isAdmin ? <p>
            <Button variant="secondary" onClick={this.onClick}>Удалить</Button>
        </p> : null;
        var editB = this.state.isAdmin ? <p><Button variant="secondary"  onClick={this.onClickEdit}>Изменить</Button></p>:<p></p>;


        return (
            <div className={s.SBlock}>
                <p>Тема:{this.state.post.theme.name}</p>
                <p align="right">{dayjs(this.state.post.date).format('DD.MM.YYYY')}</p>
                <NavLink to={"/post/" + this.state.post.id} className={s.STitle}>{this.state.post.title}</NavLink>
                <div>
                    {delB}
                </div>
                <p>{this.state.post.contentPreview}</p>
                <div>
                    {editB}
                </div>

            </div>
        )
    }
}

export default Post