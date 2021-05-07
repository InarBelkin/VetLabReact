import React, {Component} from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import SidePanel from "./SidePanel/SidePanel";
import NewsList from "./NewsList/NewsList";
import  {Route} from "react-router-dom"
import PostEditor from "./PostEditor/PostEditor";
import PostCreator from "./PostEditor/PostCreator";
import RegisterForm from "./Register/RegisterForm";
import classNames from "classnames";
import s from "./Content.module.css";
import SinglePost from "./SinglePost/SinglePost";

class Content extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className={classNames("container",s.CBack)}>
                <div className="row">
                    <div className={classNames("col-sm-3", s.CSide)}><SidePanel/></div>
                    <div className="col-sm-9">
                        <Route exact path='/postcreate' component={PostCreator}/>
                        <Route exact path='/' render={()=><NewsList/>}/>
                        <Route path = '/postedit/:id' component={PostEditor}/>
                        <Route path = '/register' component = {RegisterForm}/>
                        <Route path='/post/:id' component={SinglePost}/>
                    </div>
                </div>
            </div>
        )
    }

}

export default Content