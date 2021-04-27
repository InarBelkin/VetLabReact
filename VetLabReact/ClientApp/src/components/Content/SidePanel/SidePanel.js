import React, {Component} from 'react';
import s from "./SidePanel.module.css";
import {NavLink} from "react-router-dom";
class SidePanel extends Component {
    constructor(props) {
        super(props);
        this.state = {themes: []}
        this.LoadThemes();
    }

    async LoadThemes() {
        var request = await fetch("/api/themes/", {
            method: "GET",
            mode: "cors",
            credintials: "include"
        });
        if (request.ok) {
            var res = await request.json();
            this.setState({themes: res});
        }
    }

    render() {
        return (
            <div>
                <div >Фильтр по темам</div>
                <div>{
                    this.state.themes.map(function (t) {
                        return <NavLink to={"/themes/"+t.id} className="nav-link">{t.name}</NavLink>
                    })
                }

                </div>
            </div>
        )


    }
}

export default SidePanel;