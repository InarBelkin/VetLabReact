import React, {Component} from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import Select from "react-select";
import s from "./PostEditor.module.css";
import {render} from "react-dom";


class PostForm extends Component {
    constructor(props) {
        super(props);
        this.state = {post: this.props.post, themes: [], theme: null, response: this.props.ResponseMethod}
        this.LoadThemes = this.LoadThemes.bind(this);
        this.state.response = this.state.response.bind(this);
        this.LoadThemes();
        this.onChange = this.onChange.bind(this);
        this.onChangeTitle = this.onChangeTitle.bind(this);
        this.onChangeContent = this.onChangeContent.bind(this);
        this.onChangeTheme = this.onChangeTheme.bind(this);
        //this.state.post.title = "да пошло оно";
    }

    async LoadThemes() {
        var request = await fetch("/api/themes/", {
            method: "GET",
            mode: "cors",
            credintials: "include"
        });
        if (request.ok) {
            var res = await request.json();
            this.setState({"themes": res});
        }
        if (this.state.post.themeId > 0) {
            var name = (val) => {
                if (val.id == this.state.post.themeId) {
                    this.setState({"theme": val});
                }
            };
            name = name.bind(this);
            this.state.themes.forEach(value => name(value));
        }
    }

    onChange(event) {
        var name = event.target.name;
        var value = event.target.value;
        this.setState({post: {...this.state.post, [name]: value}});
    }

    onChangeContent(e){
        this.state.post.content = e.target.value;
        this.setState({post: this.state.post});
    }

    onChangeTitle(e) {
        var a = e.target.value;
        //this.setState({post: {...this.state.post, title: a}});
        this.state.post.title = a;
        this.setState({post: this.state.post});
    }

    onChangeTheme(e) {
        this.setState({theme: e});
        this.state.post.themeId = e.id;
        this.setState({post: this.state.post});
        //this.setState({post: {...this.state.post, themeid: e.id}});
    }


    render() {

        return (
            <div>
                <form>
                    <p>Тема</p>
                    <Select name="themeId" getOptionLabel={option => option.name}
                            getOptionValue={option => option.id}
                            value={this.state.theme}   //изменить
                            onChange={this.onChangeTheme}
                            options={this.state.themes}
                    />
                    <p>Заголовок</p>
                    <input className={s.PTitle} type={<textarea name="" id="" cols="30" rows="10"></textarea>}
                           value={this.state.post.title}
                           name="title"
                           onChange={this.onChangeTitle}/>
                    <p>Текст</p>
                    <textarea name="content" className={s.PContent} value={this.state.post.content}
                              onChange={this.onChangeContent}/>

                </form>
            </div>
        )
    }


}

export default PostForm