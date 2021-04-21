import React, {Component} from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import SidePanel from "./SidePanel/SidePanel";
import NewsList from "./NewsList/NewsList";
import  {Route} from "react-router-dom"
import PostEditor from "./PostEditor/PostEditor";
import PostCreator from "./PostEditor/PostCreator";
import RegisterForm from "./Register/RegisterForm";
class Content extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="container">
                <div className="row">
                    <div className="col-sm-3"><SidePanel/></div>
                    <div className="col-sm-9">
                        <Route exact path='/postcreate' component={PostCreator}/>
                        <Route exact path='/' render={()=><NewsList apiUrl={"/api/posts/"}/>}/>
                        <Route path = '/postedit/:id' component={PostEditor}/>
                        <Route path = '/register' component = {RegisterForm}/>

                    </div>
                </div>
            </div>
        )
    }

}

export default Content