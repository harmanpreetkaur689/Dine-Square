import React, { Component } from "react";
import { withFirebase } from "./Firebase";
import "./showcart.css";
class Showcart extends Component {
    state = {
        cart: null,
        selectedsize: null,
        selectedItem: null
    };
    componentDidUpdate() {
        this.filter()
    }
    componentDidMount() {
        this.filter()
    }
    filter = () => {
        if (this.state.cart == null) {
            /*const selitem =
                this.state.selectedItem.length == 0
                    ? null
                    : this.state.selectedItem;
            const categories =
                this.state.selectedsize.length == 0
                    ? null
                    : this.state.selectedsize;*/
            //this.setState({ items: null });
            this.props.firebase
                .showCart()
                .then((result) => {
                    // Read result of the Cloud Function.
                    console.log(result);
                    this.setState({ cart: result.data });
                    // ...
                });
        }
    };
    price = () => {
        return this.state.cart ? this.state.cart.price : 0
    }
    showItems = () => {
        if (this.state.cart)
            return (<div>
                {Object.keys(this.state.cart.items).map((itemKey) => (

                    Object.keys(this.state.cart.items[itemKey].price).map((priceKey) => (<div className="d-flex col-12">
                        <div className="col-6">{this.state.cart.items[itemKey].name} - {this.state.cart.items[itemKey].price[priceKey].size}</div>
                        <div className="col-3">{this.state.cart.items[itemKey].price[priceKey].qty * this.state.cart.items[itemKey].price[priceKey].price}</div>
                        <div className="col-3">{this.state.cart.items[itemKey].price[priceKey].qty}</div>
                    </div>))
                )
                )}
            </div>)
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
                    {this.showItems()}
                </div>
                <div class="cart-total">
                    <div class="cart-total-title">Total</div>
                    <span class="cart-total-price">{this.price()}</span>
                </div>
                <button type="button" class="btn btn-info btn-purchase ">PLACE ORDER</button>
            </div>
        );
    }
}

export default withFirebase(Showcart);