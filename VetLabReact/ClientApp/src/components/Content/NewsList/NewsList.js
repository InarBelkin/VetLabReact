import React, {Component} from 'react';
import Post from "./Post";
import {RenderDom} from "../../../render";

// import 'bootstrap/dist/css/bootstrap.css';


class NewsList extends Component {
    constructor(props) {
        super(props);
        this.state = {mposts: []};
        this.LoadAll = this.LoadAll.bind(this);
        this.LoadByTheme = this.LoadByTheme.bind(this);
        this.onRemovePost = this.onRemovePost.bind(this);
        this.onEditPost = this.onEditPost.bind(this);
        if (this.props.match === undefined)
            this.LoadAll();
        else this.LoadByTheme(this.props.match.params.id);
    }

    async LoadAll() {
        var request = await fetch("/api/posts/", {
            method: "GET",
            mode: "cors",
            credintials: "include"
        });
        if (request.ok) {
            var res = await request.json();
            this.setState({"mposts": res});
        }
    }

    async LoadByTheme(ThId) {
        var request = await fetch("/api/posts/theme/" + ThId, {
            method: "GET",
            mode: "cors",
            credintials: "include"
        });
        if (request.ok) {
            var res = await request.json();
            this.setState({"mposts": res});
        }
    }

    async onRemovePost(mpost) {
        if (mpost) {
            var request = await fetch("/api/posts/" + mpost.id, {
                method: "DELETE",
                headers: {
                    'Content-Type': 'application/json;charset=utf-8'
                },
            });
            if (request.status == 401) {
                alert("У вас нет прав на это");
            }
            this.LoadAll();
            RenderDom();
        }
    }

    async onEditPost(mpost) {
        if (mpost) {
            window.location.assign("/postedit/" + mpost.id);
        }
    }

    render() {
        var remove = this.onRemovePost;
        var edit = this.onEditPost;

        return (
            <div>
                {this.state.mposts.map(function (mpost) {
                    return <Post key={mpost.id} mpost={mpost} onRemove={remove} onEdit={edit}/>
                })}
            </div>
        )
    }
}

export default NewsList;