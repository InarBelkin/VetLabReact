import React, {Component} from 'react';

class SinglePost extends Component{
    constructor(props) {
        super(props);
        this.state ={post:null, onLoad :false}
        this.LoadPost = this.LoadPost.bind(this);
        this.LoadPost();
    }

    async LoadPost(){
        let postid = this.props.match.params.id;
        let request = await fetch("/api/posts/" + postid, {
            method: "GET",
            mode: "cors",
            credintials: "include"
        });
        if (request.ok) {
            var res = await request.json();

            this.setState({post:res});
            this.setState({onLoad:true});
        }
    }

    finalRender(){
        return(
            <div>
                <div>{this.state.post.title}</div>
                <div>{this.state.post.content}</div>
            </div>
        )
    }

    render() {
        var l = this.state.onLoad ===true ? this.finalRender(): <div>Грузится</div>;
        return(
            <div>{l}</div>
        );
    }
}

export default SinglePost