import React, {Component} from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import {RenderDom} from "../../../render";
import PostForm from "./PostForm";
import {Button, Modal} from "react-bootstrap";

class PostCreator extends Component {
    constructor(props) {
        super(props);
        this.state = {post: {id: 0, userId: 0, themeId: 0, title: "", content: "", date: ""}}
        this.OnCreate = this.OnCreate.bind(this);

    }


    async OnCreate() {
        var rez = this.ReturnPost();

        let request = await fetch("/api/posts/", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify({
                "contentPreview": rez.content,
                "content": rez.content,
                "title": rez.title,
                "themeId": rez.themeId,
                "userId": null,
                "date": "2021-03-13T23:00:00"
            })
        });
        document.location = ('/');
    }

    ReturnPost() {
        return this.state.post;
    }


    render() {
        return (
            <div>
                <PostForm
                    ResponseMethod={this.ReturnPost}
                    post={this.state.post}/>
                <Button variant="primary" onClick={this.OnCreate}>Создать</Button>
            </div>
        )
    }


}

export default PostCreator