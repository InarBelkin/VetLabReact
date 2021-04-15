import React, { Component } from 'react';
import PostsList from "./NewsHome";
class Post extends React.Component {

    constructor(props) {
        super(props);
        this.state = { data: props.post };
        this.onClick = this.onClick.bind(this);
    }
    onClick(e) {
        this.props.onRemove(this.state.data);
    }
    render() {
        return <div>
            <p><b>{this.state.data.title}</b></p>
            <p>СОдержание {this.state.data.content}</p>
            <p><button onClick={this.onClick}>Удалить</button></p>
        </div>;
    }
}
export  default Post;