import React, {Component} from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import s from "./PostEditor.module.css";
import Select from 'react-select'
import {RenderDom} from "../../../render";
import PostForm from "./PostForm";

class PostEditor extends Component {
    constructor(props) {
        super(props);
        this.state = {post: null, form: null}
        this.onSubmit = this.onSubmit.bind(this);
        this.LoadPost = this.LoadPost.bind(this);
        this.LoadPost();
    }


    /*
        onTitleChange(e) {
            this.setState({title: e.target.value});
        }*/
    async LoadPost() {
        let postid = this.props.match.params.id;
        let request = await fetch(this.props.apiUrl + postid, {
            method: "GET",
            mode: "cors",
            credintials: "include"
        });
        if (request.ok) {
            var res = await request.json();
            this.state.post = res;
        }
    }

    getPostForm() {
        return <PostForm
            ResponeMethod={this.SetPost}
            post={this.state.post}/>
    }

    async onSubmit(e) {
        e.preventDefault();
        let request = await fetch("/api/posts/", {
            method: "PUP",
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
        //window.location.assign("/");
        document.location = ('/');
    }

    render() {
        return (
            <div className={s.PEditor}>
                <PostForm
                    ResponeMethod={this.SetPost}
                    post={this.state.post}/>
                <button onClick={this.OnCreate}>Создать</button>
            </div>


        )
    }
}

export default PostEditor