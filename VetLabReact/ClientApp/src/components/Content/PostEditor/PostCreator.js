import React, {Component} from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import {RenderDom} from "../../../render";
import PostForm from "./PostForm";

class PostCreator extends Component {
    constructor(props) {
        super(props);
        this.state = {post:null,form:null}
        this.OnCreate = this.OnCreate.bind(this);
        this.state.form = <PostForm ResponeMethod={this.SetPost}/>
    }


    async OnCreate() {

        let request = await fetch("/api/posts/", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify({
                "contentPreview": this.state.post.content,
                "content": this.state.post.content,
                "title": this.state.post.title,
                "themeId": this.state.post.themeid,
                "userId": 1,
                "date": "2021-03-13T23:00:00"
            })
        });
        document.location = ('/');
    }

    SetPost(newpost) {
        this.state.post = newpost;
    }


    render() {
        return (
            <div>
                {this.state.form}
                {/*<PostForm ResponeMethod={this.SetPost}/>*/}
                <button onClick={this.OnCreate}>Создать</button>
            </div>
        )
    }


}

export default PostCreator