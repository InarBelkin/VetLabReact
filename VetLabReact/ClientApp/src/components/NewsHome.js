import React, {Component} from 'react';
import Post from "./Post";

class PostsList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {posts: []}
        // this.onNameChange = this.onNameChange.bind(this);
        // this.onPriceChange = this.onPriceChange.bind(this);
    }

    loadData() {
        var xhr = new XMLHttpRequest();
        xhr.open("get", this.props.apiUrl, true);
        xhr.onload = function () {
            var data = JSON.parse(xhr.responseText);
            this.setState({posts: data});
        }.bind(this);
        xhr.send();
    }

    componentDidMount() {
        this.loadData();
    }

    onRemovePost(post) {
        //
        // if (phone) {
        //     var url = this.props.apiUrl + "/" + phone.id;
        //
        //     var xhr = new XMLHttpRequest();
        //     xhr.open("delete", url, true);
        //     xhr.setRequestHeader("Content-Type", "application/json");
        //     xhr.onload = function () {
        //         if (xhr.status === 200) {
        //             this.loadData();
        //         }
        //     }.bind(this);
        //     xhr.send();
        // }
    }

    render() {
        var remove = this.onRemovePost
        return (
            <div>
                <h2>Список</h2>
                <div>
                    {
                        this.state.posts.map(function (post) {
                            return <Post key={post.id} post={post} onRemove={remove}/>
                        })
                    }
                </div>
            </div>
        )

    }

}

export default PostsList;