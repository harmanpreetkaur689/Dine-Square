import React, { Component } from "react";
import { HashRouter as Router, Switch, Route } from "react-router-dom";
import Firebase from "../Firebase";
import { Link } from 'react-router-dom';
import SignOut from '../SignOut';
import Orders from '../orders';

class NavAuth extends Component {
    /*  constructor(props) {
          super(props);
      }*/
    componentDidUpdate() {
        //console.log(this.props.firebase);
    }
    render() {
        let location = "/profile";
        return (
            <div>
                <Link
                    to={location}>
                    <button className="btn btn-dark ">{this.props.username}</button>
                </Link>
                <SignOut />

            </div>
        );
    }
}
export default NavAuth;