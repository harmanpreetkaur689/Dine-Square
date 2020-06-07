import React, { Component } from "react"
import { withFirebase } from "./Firebase"
class PreviousOrders extends Component {
    state = { prevCart: null, public: null }
    componentDidMount() {
        this.fetchItems()
        this.fetchPreviousOrders()
    }
    fetchItems = () => {
        this.props.firebase.db.ref("public").on("value", (snapshot) => {
            var val = snapshot.val();
            this.setState({ public: val })
        })
    }
    fetchPreviousOrders = () => {
        this.props.firebase.db.ref("users/" + this.props.user.uid + "/prevorders").on("value", (snapshot) => {
            var val = snapshot.val();
            this.setState({ prevCart: val })
        })
    }
    render() {
        if (this.state.prevCart && this.state.public) {
            console.log(this.state)
            console.log(this.props)
            return <div className="col-12">

                {Object.keys(this.state.prevCart).reverse().map((cartId) => (
                    <div className="col-12 m-2 shadow rounded">
                        <div className="h5">time:</div><div>{this.state.prevCart[cartId].orderPlacedAt}</div>
                        <div className="h5">otp:</div><div>{this.state.prevCart[cartId].otp}</div>
                        {Object.keys(this.state.prevCart[cartId].items).map((itemKey) => (
                            <div>
                                {Object.keys(this.state.prevCart[cartId].items[itemKey]).map((priceKey) => (

                                    <div className="card m-1">
                                        {this.state.public.items[itemKey].name} ( {this.state.public.sizeCategories[priceKey]} x {this.state.prevCart[cartId].items[itemKey][priceKey]["qty"]})
                                        <div>{this.state.prevCart[cartId].items[itemKey][priceKey]["ready"] == true ? <div className="btn disabled btn-primary ">Item Ready</div> : <div className="btn disabled btn-danger" >Item Not Ready</div>}</div>

                                    </div>
                                ))}
                            </div>
                        ))}
                    </div>))}
            </div>
        }
        else return <div>No Previous Orders</div>
    }
}

export default withFirebase(PreviousOrders)