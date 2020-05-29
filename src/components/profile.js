import React, { Component } from "react";
import Showcart from "./showcart";
import userimg from ".userlogo2/.png";

class Profile extends Component {
    state = {
        user: null,
        userdata: null,
    }
    constructor(props) {
        super(props);
    }

    componentDidUpdate() {
        console.log(this.props.user)
        if (this.props.user != this.state.user) {
            this.setState({ user: this.props.user })
        }
        if (this.props.username != this.state.username) {
            this.setState({ username: this.props.username })
        }
    }
    componentDidMount() {
        if (this.props.user != this.state.user) {
            this.setState({ user: this.props.user })
        }
        if (this.props.username != this.state.username) {
            this.setState({ username: this.props.username })
        }
    }
    render() {
        if (this.state.user && this.state.username)
            return (
                <div>
                    <div class="card" style="width: 18rem;">
                        <img src={userimg} class="card-img-top" alt="...">
                            <div class="card-body">
                                <h5 class="card-title">Welcome User</h5>
                                <p class="card-text">Personalize your cart here. </p>
                            </div>
                            <ul class="list-group list-group-flush">
                                <li class="list-group-item">Username: {this.state.username} </li>
                                <li class="list-group-item">Useremail:  {this.state.user.email}</li>
                                <li class="list-group-item"></li>
                            </ul>
                            <div class="card-body">
                                <a href="#" class="card-link">Card link</a>
                                <a href="#" class="card-link">Another link</a>
                            </div>
                     </div>


                        <Showcart />

                    </div>
            );
        else return (<div>Loading</div>)
    }
}
export default Profile;