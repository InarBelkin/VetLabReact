import React, {Component} from 'react';
import 'bootstrap/dist/css/bootstrap.css';
// import 'bootstrap/dist/css/bootstrap.css';
class PostEditor extends Component {
    render() {
        return (
            <div>
                <p>Заголовок</p>
                <input type={<textarea name="" id="" cols="30" rows="10"></textarea>}/>

            </div>


        )
    }
}

export default PostEditor