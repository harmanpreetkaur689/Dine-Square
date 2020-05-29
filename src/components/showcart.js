import React, { Component } from "react";
import { withFirebase } from "./Firebase";
import "./showcart.css";
class Showcart extends Component {
    state = {
        items: null,
        selectedsize: null,
        selectedItem: null
    };
    componentDidUpdate() { }

    filter = () => {
        if (this.state.items == null) {
            const selitem =
                this.state.selectedItem.length == 0
                    ? null
                    : this.state.selectedItem;
            const categories =
                this.state.selectedsize.length == 0
                    ? null
                    : this.state.selectedsize;
            //this.setState({ items: null });
            this.props.firebase
                .showCart(

                )
                .then((result) => {
                    // Read result of the Cloud Function.
                    console.log(result);
                    this.setState({ items: result.data });
                    // ...
                });
        }
    };
    showItems = () => {
        if (this.state.items == null) {
            this.filter();
        }
    }
    render() {
        return (
            <div class="container ">
                <h2 class="section-header">CART</h2>
                <div class="cart-row">
                    <div class="cart-item cart-header cart-column">ITEM</div>
                    <div class="cart-price cart-header cart-column">PRICE</div>
                    <div class="cart-quantity cart-header cart-column">QUANTITY</div>
                </div>
                <div class="cart-items">

                </div>
                <div class="cart-total">
                    <div class="cart-total-title">Total</div>
                    <span class="cart-total-price">0</span>
                </div>
                <button type="button" class="btn btn-info btn-purchase ">PLACE ORDER</button>
            </div>
        );
    }
}

export default withFirebase(Showcart);