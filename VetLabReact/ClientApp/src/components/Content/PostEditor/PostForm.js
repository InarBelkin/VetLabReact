import React, {Component} from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import Select from "react-select";
import s from "./PostEditor.module.css";

class PostForm extends Component {
    constructor(props) {
        super(props);
        this.state = {post: this.props.post, themes: [], theme: null}
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

    async ResponseData() {
        this.props.ResponeMethod(this.state.post)
    }

    render() {

        return (
            <div>
                <form>
                    <p>Тема</p>
                    <Select getOptionLabel={option => option.name}
                            getOptionValue={option => option.id}
                            value={this.state.theme}   //изменить
                        // onChange={this.onThemeIdChange}
                            options={this.state.themes}
                    />
                    <p>Заголовок</p>
                    <input type={<textarea name="" id="" cols="30" rows="10"></textarea>}
                           value={this.state.post.title}
                           onChange={this.onTitleChange}/>
                    <p>Текст</p>
                    <textarea className={s.PContent} value={this.state.post.content} onChange={this.onContentChange}/>

                </form>
            </div>
        )
    }


}

export default PostForm