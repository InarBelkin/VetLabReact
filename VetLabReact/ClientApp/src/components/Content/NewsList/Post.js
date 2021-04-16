import React, {Component} from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import s from "./Post.module.css";
import {NavLink} from "react-router-dom";

class Post extends Component {
    constructor(props) {
        super(props);
        this.state = props.mpost
        this.onClick=this.onClick.bind(this);
        this.onClickEdit = this.onClickEdit.bind(this);
        //this.state = {props.}

    }

    onClick(e) {
        this.props.onRemove(this.state);
    }

    onClickEdit(e){
        this.props.onEdit(this.state)
    }

    // render() {
    //     return(
    //         <div>
    //             <div>
    //                 <p>Название= {this.props.mpost.title}</p>
    //                 <p>Внутренности={this.props.mpost.content}</p>
    //             </div>
    //
    //         </div>
    //     )
    // }

    render() {
        return (
            <div className={s.SBlock}>
                <p>Тема:{this.state.theme.name}</p>
                <p align="right">{this.state.date}</p>
                <NavLink to={"/1"} className={s.STitle}>{this.state.title}</NavLink>
                <p><button onClick={this.onClick}>Удалить</button></p>
                <p>{this.state.contentPreview}</p>
                <p><button onClick={this.onClickEdit}>Изменить</button></p>

            </div>
        )
    }
}

export default Post