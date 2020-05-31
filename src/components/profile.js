import React, { Component } from "react";
import Showcart from "./showcart";
import userimg from "./userlogo2.png";
import Mainpage from "./mainpage";
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
                <div className="container-fluid row">
                    <div class="card col-2" >
                        <img src={userimg} class="card-img-top" alt="..." />
                        <div class="card-body">
                            <h5 class="card-title">Welcome User</h5>
                            <p class="card-text">Personalize your cart here. </p>
                        </div>
                        <ul class="list-group list-group-flush">
                            <li class="list-group-item">Username: {this.state.username} </li>
                            <li class="list-group-item">UserEmail:  {this.state.user.email}</li>

                        </ul>
                    </div>
                    <div className="col-10">
                        <Showcart />
                    </div>
                </div>
            );
        else return (<div><Mainpage /></div>)
    }
}
export default Profile;