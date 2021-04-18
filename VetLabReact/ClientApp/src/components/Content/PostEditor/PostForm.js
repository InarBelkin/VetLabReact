import React, {Component} from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import Select from "react-select";
import s from "./PostEditor.module.css";

class PostForm extends Component {
    constructor(props) {
        super(props);
        this.state = {post: this.props.post, themes: []}
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

    async ResponseData() {
        this.props.ResponeMethod(this.state.post)
    }

    getP(){


    }

    render() {
        return (
            <div>
                <form>
                    <p>Тема</p>
                    <Select getOptionLabel={option => option.name}
                            getOptionValue={option => option.id}
                            value={this.state.themes[this.state.themeid]}   //изменить
                            onChange={this.onThemeIdChange}
                            options={this.state.themes}/>
                    <p>Заголовок</p>
                    <input type={<textarea name="" id="" cols="30" rows="10"></textarea>}
                           value={this.state.post.title}
                           onChange={this.onTitleChange}/>
                    <p>Текст</p>
                    <textarea className={s.PContent} value={this.state.content} onChange={this.onContentChange}/>

                </form>
            </div>
        )
    }


}

export default PostForm