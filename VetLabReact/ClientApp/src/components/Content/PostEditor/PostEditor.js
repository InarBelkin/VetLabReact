import React, {Component} from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import s from "./PostEditor.module.css";
import classNames from "classnames";
import Select from 'react-select'

const options = [
    {value: 'chocolate', label: 'Chocolate'},
    {value: 'strawberry', label: 'Strawberry'},
    {value: 'vanilla', label: 'Vanilla'}
]

class PostEditor extends Component {
    constructor(props) {
        super(props);
        this.state = {title: "", content: "", themeid: 2, themes: []}
        this.onSubmit = this.onSubmit.bind(this);
        this.onTitleChange = this.onTitleChange.bind(this);
        this.onContentChange = this.onContentChange.bind(this);
        this.onThemeIdChange = this.onThemeIdChange.bind(this);
        this.LoadThemes = this.LoadThemes.bind(this);
        this.LoadThemes();
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
    }

    onTitleChange(e) {
        this.setState({title: e.target.value});
    }

    onContentChange(e) {
        this.setState({content: e.target.value});
    }

    onThemeIdChange(e) {
        this.state.themeid = e.id;
    }

    async onSubmit(e) {
        e.preventDefault();
        let request = await fetch("/api/posts/", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify({
                "contentPreview": this.state.content,
                "content": this.state.content,
                "title": this.state.title,
                "themeId": this.state.themeid,
                "userId": 1,
                "date": "2021-03-13T23:00:00"
            })
        });
        window.location.assign("/");
    }

    render() {
        return (
            <div className={s.PEditor}>
                <form onSubmit={this.onSubmit}>
                    {/*<p className={classNames(s.fc,s.sc)}>Заголовок</p>*/}
                    <p>Тема</p>
                    <Select getOptionLabel={option => option.name}
                            getOptionValue={option => option.id}
                           // value={this.state.themes[0]}
                            onChange={this.onThemeIdChange}
                            options={this.state.themes}/>
                    <p>Заголовок</p>
                    <input type={<textarea name="" id="" cols="30" rows="10"></textarea>}
                           value={this.state.title}
                           onChange={this.onTitleChange}/>
                    <p>Текст</p>
                    <textarea className={s.PContent} value={this.state.content} onChange={this.onContentChange}/>
                    <input type="submit" value="Отправить"/>
                </form>
            </div>


        )
    }
}

export default PostEditor