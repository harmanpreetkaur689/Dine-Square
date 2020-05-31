import React, { Component } from "react";
import { HashRouter as Router, Switch, Route } from "react-router-dom";
import Firebase from "../Firebase";
import { Link } from 'react-router-dom';
import SignOut from '../SignOut';
import Orders from '../orders';

class NavAuth extends Component {
    componentDidUpdate() {
        //console.log(this.props.firebase);
    }
    render() {
        return (
            <div>
                <button className="btn btn-dark disabled">{this.props.username}</button>
                <SignOut />

            </div>
        );
    }
}
export default NavAuth;