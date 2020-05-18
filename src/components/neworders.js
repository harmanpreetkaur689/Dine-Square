import React, { Component } from "react";
import { withFirebase } from "./Firebase";
import $ from 'jquery';
import { Link } from "react-router-dom";

class neworders extends Component {
    constructor(props) {
        super(props);
    }
    state = {
        count: null,
        activeItem: null,
        showVendor: false,
        showmenucategories: false,
        showprice: false,
        menu: null,
        vendors: [],
        menucategories: [],
        selected: false,
        minimum: null,
        maximum: null,
        buttonClicked: false,
        arrayForSelected: {},
        itemSelected: false,
        // itemsInCart: [],
        cart: {},
        itemAdded: false
    };
    // 89 and 94 line console ch dekh
    componentDidMount() {
        console.log(this.props)
        if (this.props.match.params.v) {
            let vendors = this.state.vendors;
            vendors.push(this.props.match.params.v);
            this.setState({ vendors: vendors, menu: null });
        }
        else this.filter();
    }
    filter = () => {
        if (this.state.menu == null) {
            const vendors = this.state.vendors.length == 0 ? null : this.state.vendors;
            const menucategories = this.state.menucategories.length == 0 ? null : this.state.menucategories;
            const minimum = this.state.minimum == 0 ? null : this.state.minimum;
            const maximum = this.state.maximum == 0 ? null : this.state.maximum;
            this.props.firebase.filterItems(
                JSON.stringify({
                    vendors: vendors,
                    menucategories: menucategories,
                    minimum: minimum,
                    maximum: maximum
                })
            )
                .then((result) => {
                    console.log(minimum, maximum);
                    console.log(result)
                    this.setState({ menu: result.data })
                })
        }
    }

    addToCart() {
        /*console.log("ran")
        var cart = this.state.cart

        var activeItem = this.state.activeItem
        // console.log(cart[activeItem])
        if (cart[activeItem] == undefined) {
            cart[activeItem] = {}
            Object.keys(this.state.menu[this.state.activeItem]["price"]).map(priceId => {
                var count = parseInt(document.getElementById(priceId).innerHTML)
                cart[activeItem][priceId] = count

            })
            //console.log(cart[activeItem])

        }
        else {
            Object.keys(this.state.menu[this.state.activeItem]["price"]).map(priceId => {
                var count = parseInt(document.getElementById(priceId).innerHTML) + parseInt(cart[activeItem][priceId])
                cart[activeItem][priceId] = count
            })
        }
        this.setState({ cart: cart, activeItem: null })*/

        if (this.state.activeItem != null) {
            var sizecount = {};
            Object.keys(this.state.menu[this.state.activeItem]["price"]).map(priceId => {
                var count = parseInt(document.getElementById(priceId).innerHTML)
                if (count != 0) {
                    sizecount[priceId] = count
                }
            })
            /**
             * data = {
             *     <itemId>:{
             *         <sizeId>:count;
             *         <sizeId>:count;
             *     }
             * }
             */
            //console.log(sizecount);
            if (sizecount != undefined) {
                // console.log(data);
                const sizeCount = sizecount;
                console.log(sizeCount);
                this.props.firebase.addToCart(

                    JSON.stringify(
                        { itemId: this.state.activeItem, sizeCount: sizeCount }
                    )

                )
                    .then(result => {

                        //this.setState({ cart: result.data })
                        //console.log(this.state.cart);
                    })
            }
            this.setState({
                activeItem: null
            })
        }






        //cart:{psaduvw12453tgr:{hgsdfca6sdf2:12}}
    }
    componentDidUpdate() {
        console.log("MINIMUM")
        console.log(this.state.minimum)
        console.log("MAXIMUM")
        console.log(this.state.maximum)
        /* console.log("MENU")
         console.log(this.state.menu)
         console.log("ITEMS FROM APP.js")
         console.log(this.props.items)
         //console.log("ITEMARRAY FROM APP.js")
         // console.log(this.props.itemArray)
         console.log("VENDORS")
         console.log(this.state.vendors)
         console.log("MENU CATEGORIES")
         console.log(this.state.menucategories)
         console.log("ACTIVE ITEM")
         //this.setState({ itemArray: this.props.itemArray })
         console.log(this.state.activeItem)*/
        console.log("CART")
        console.log(this.state.cart)
        console.log("ACTIVE ITEM")
        console.log(this.state.activeItem)
        this.filter()
    }
    dataFromCloud = () => {

        if (this.state.menu == null) {

        }
        else {
            return (
                <div>
                    <div className="card bg-light">
                        <div className="card-body ">
                            <div className="d-flex">
                                <div className="col">Name</div>
                                <div className="col">Vendor</div>
                                <div className="col">Category</div>
                                <div className="col">size and price</div>
                                <div className="">Add To Cart</div>
                            </div>
                        </div>
                        <div >
                            {Object.keys(this.state.menu).map((menuKey) => (
                                //return
                                <div>
                                    <div className="card bg-light">
                                        <div className="card-body ">
                                            <div className="d-flex">
                                                <div className="col">{this.state.menu[menuKey].name}</div>
                                                <div className="col">{this.state.menu[menuKey].vendor}</div>
                                                <div className="col">

                                                    {Object.keys(this.state.menu[menuKey]["menuCategories"]).map((menuCat) => {
                                                        return <div>
                                                            {this.state.menu[menuKey].menuCategories[menuCat].name}
                                                        </div>

                                                    })}
                                                </div>
                                                <div className="col">{Object.keys(this.state.menu[menuKey].price).map(priceId => (
                                                    <div>
                                                        <div className="btn btn-primary col-5">
                                                            {this.state.menu[menuKey]["price"][priceId]["size"]}
                                                        </div>
                                                        <div className="btn btn-secondary col-4">
                                                            ₹ {this.state.menu[menuKey]["price"][priceId]["price"]}
                                                        </div>
                                                    </div>

                                                ))
                                                }
                                                </div>

                                                {(this.props.firebase.authUser != null) ?
                                                    <button type="button" className="btn btn-primary" data-toggle="modal" data-target="#staticBackdrop" style={{ height: 40 }} onClick={() => { this.addItem(menuKey) }}>Add item</button> :
                                                    <button type="button" className="btn disabled btn-primary" data-toggle="modal" data-target="#staticBackdrop" style={{ height: 40 }}>Login to add item</button>
                                                }</div>
                                        </div>
                                    </div>
                                </div>
                            ))}

                        </div>
                    </div>
                </div>);
        }

    }
    fetchDataFromFirebase() {
        var itemArray = [... this.props.itemArray]
        /*var k = 0;
        if (this.state.vendors.length != 0)
            for (var j = 0; j < itemArray.length; j++) {
                var flag = 0;
                for (var i = 0; i < this.state.vendors.length; i++) {
                    if (this.props.items[itemArray[j]]["vendor"] == this.state.vendors[i].name) {
                        flag = 1;
                        //break;
                    }
                }
                if (flag == 0) {
                    itemArray.splice(j, 1);
                    j--;
                }
            }
        if (this.state.menucategories.length != 0) {
            // var k = 0, 
            var flag = 0;
            for (var i = 0; i < itemArray.length; i++) {
                flag = 0;
                for (var j = 0; j < this.state.menucategories.length; j++) {
                    Object.keys(this.props.items[itemArray[i]]["menuCategories"]).map(menuCat => {
                        if (this.props.items[itemArray[i]]["menuCategories"][menuCat]["name"] == this.state.menucategories[j].name) {
                            flag = 1;
    
                        }
                    })
                }
                if (flag == 0) {
                    itemArray.splice(i, 1);
                    i--;
                }
                //k++;
            }
        }
        var flag = 0;
        //console.log(itemArray)
        if (this.state.minimum != null || this.state.maximum != null)
            for (var i = 0; i < itemArray.length; i++) {
                flag = 0;
                Object.keys(this.props.items[itemArray[i]]["price"]).map((menuCat) => {
                    if (
                        (this.state.minimum &&
                            parseInt(this.state.minimum) <
                            this.props.items[itemArray[i]]["price"][menuCat]["price"]) ||
                        (this.state.maximum &&
                            parseInt(this.state.maximum) >
                            this.props.items[itemArray[i]]["price"][menuCat]["price"])
                    ) {
                        flag = 1;
                    }
                });
                if (flag == 0) {
                    itemArray.splice(i, 1);
                    i--;
                }
            }
        console.log("RESULT")
        console.log(itemArray)*/
        return (
            <div>
                <div className="card bg-light">
                    <div className="card-body ">
                        <div className="d-flex">
                            <div className="col">Name</div>
                            <div className="col">Vendor</div>
                            <div className="col">Category</div>
                            <div className="col">size and price</div>
                            <div className="">Add To Cart</div>
                        </div>
                    </div>

                    {itemArray.map((value, index) => (
                        <div className="card my-1 mx-1">
                            <div className="card-body">

                                <div className="d-flex">
                                    <div className="col"> {this.props.items[itemArray[index]].name}</div>
                                    <div className="col"> {this.props.items[itemArray[index]].vendor}</div>
                                    <div className="col">{
                                        Object.keys(this.props.items[itemArray[index]].menuCategories).map(menuId => (
                                            <div>{this.props.items[itemArray[index]].menuCategories[menuId].name}</div>
                                        ))
                                    }</div>
                                    <div className="col">{Object.keys(this.props.items[itemArray[index]].price).map(priceId => (
                                        <div>
                                            <div className="btn btn-primary col-5">
                                                {this.props.items[itemArray[index]]["price"][priceId]["size"]}
                                            </div>
                                            <div className="btn btn-secondary col-4">
                                                ₹ {this.props.items[itemArray[index]]["price"][priceId]["price"]}
                                            </div>
                                        </div>

                                    ))
                                    }
                                    </div>

                                    <button type="button" className="btn btn-primary" data-toggle="modal" data-target="#staticBackdrop" style={{ height: 40 }} onClick={() => { this.addItem(itemArray[index]) }}>Add item</button>
                                </div>
                            </div>
                        </div>

                    ))

                    }
                </div>
                <div>
                    {this.addToCartButton()}
                </div>
            </div >
        );
    }

    addToCartButton() {
        if (this.state.itemAdded)
            return (
                <div className="btn btn-primary">
                    Add To Cart
                </div>
            );
    }
    addItem(x) {
        //this.setState({ activeItem: null })
        this.setState({ activeItem: x }) //Chall reha, mgr jdo tak oh update hunda state ch ohto pehla aapa print kara taa print nhi hoya
        //addItem kr ki reha, cart ch add kr reha? yesss
    }
    showData() {
        // if (this.state.buttonClicked == true)
        return (

            <div> {this.dataFromCloud()}</div>


        );
    }
    arrayOfSelectedVendors(name) {
        var vendors = this.state.vendors;
        vendors.push(name)
        this.setState({ vendors: vendors, menu: null })
        console.log(this.state.vendors)
    }
    removeFromArrayOfSelectedVendors(name) {
        var vendors = this.state.vendors
        for (var i = 0; i < vendors.length; i++) {
            if (vendors[i] == name) {
                vendors.splice(i, 1);
            }
        }
        this.setState({
            vendors: vendors,
            menu: null
        }
        )
        console.log(this.state.vendors)
    }
    arrayOfSelectedMenuCategories(x) {
        var menucategories = this.state.menucategories;
        menucategories.push(x)
        this.setState({ menucategories: menucategories, menu: null })
        console.log(this.state.menucategories)
    }
    removeFromArrayOfSelectedMenuCategories(x) {
        var menucategories = this.state.menucategories
        for (var i = 0; i < menucategories.length; i++) {
            if (menucategories[i] == x) {
                menucategories.splice(i, 1);
            }
        }
        this.setState({
            menucategories: menucategories,
            menu: null
        }
        )
        console.log(this.state.menucategories)
    }
    showvendorscard() {
        //var vendors = [... this.props.vendors]
        if (this.props.vendors.length != 0)
            return (
                <div className="col-4" style={{ top: "15px" }}>
                    <div class="card" style={{ height: "14.3rem" }}>
                        <div class="card-header">Vendors</div>
                        <div class="card-body">
                            {Object.keys(this.props.vendors).map(menuCat => {
                                if (this.props.vendors[menuCat].selected == undefined)
                                    return (
                                        <button type="button" class="btn btn-primary m-1" onClick={() => {
                                            // var menu = this.state.menu
                                            this.props.vendors[menuCat].selected = true
                                            this.arrayOfSelectedVendors(this.props.vendors[menuCat].name)
                                            /*this.setState({
                                                menu: menu
                                            })*/

                                        }
                                        }>
                                            {this.props.vendors[menuCat]["name"]}
                                        </button>

                                    );

                                else return (
                                    <button type="button" class="btn btn-secondary m-1" onClick={() => {
                                        //var menu = this.state.menu
                                        this.props.vendors[menuCat].selected = undefined
                                        this.removeFromArrayOfSelectedVendors(this.props.vendors[menuCat].name)
                                        /*this.setState({
                                            menu: menu
                                        })*/
                                    }
                                    }>

                                        {this.props.vendors[menuCat]["name"]}
                                    </button>
                                );
                            }
                            )}

                        </div>
                    </div>
                </div >
            );
    }
    showmenucategoriescard() {
        {
            if (this.props.categories.length != 0)
                return (
                    <div className="col-4" style={{ top: "15px" }}>
                        <div class="card">
                            <div class="card-header">Menu Categories</div>
                            <div class="card-body">
                                {Object.keys(this.props.categories).map(menuCat => {
                                    var flag = false;
                                    for (var i = 0; i < this.state.menucategories.length; i++) {
                                        if (menuCat == this.state.menucategories[i]) {
                                            flag = true;
                                            break;
                                        }
                                    }
                                    if (flag)
                                        return (
                                            <button
                                                className="btn btn-secondary mt-1 mr-1"
                                                onClick={() => {
                                                    this.removeFromArrayOfSelectedMenuCategories(menuCat);
                                                }}
                                            >
                                                {this.props.categories[menuCat].name}
                                            </button>
                                        );
                                    else {
                                        return (
                                            <button
                                                className="btn btn-primary shadow-lg mt-1 mr-1"
                                                onClick={() => {
                                                    this.arrayOfSelectedMenuCategories(menuCat);
                                                }}
                                            >
                                                {this.props.categories[menuCat].name}
                                            </button>
                                        );
                                    }
                                })}

                            </div>
                        </div>
                    </div>
                );
        }


    }
    onChange = event => {
        var x = event.target.value;
        if (x == "") x = null;
        if (event.target.id == 'min') {
            this.setState({
                minimum: x,
                menu: null
            })
        }
        if (event.target.id == 'max') {
            this.setState({
                maximum: x,
                menu: null
            })
        }
    }
    showpricecard() {
        //if (this.state.)
        return (
            <div className="col-4" style={{ top: "15px" }}>
                <div class="card " style={{ height: "14.3rem" }}>
                    <div class="card-header">Price Range</div>
                    <div class="card-body">
                        <input placeholder="min" type="number" size="7" id="min" onChange={this.onChange}></input>
                        <a> - </a>
                        <input placeholder="max" type="number" size="7" id="max" onChange={this.onChange}></input>

                    </div>
                </div>
            </div>
        );
    }
    modalhead() {
        if (this.state.activeItem != null) {
            var a = this.state.activeItem
            return (
                <div>
                    {this.state.menu[a]["name"]}
                </div>
            )
        }
    }
    decrementValue(priceId) {
        var a = document.getElementById(priceId).innerHTML
        console.log("a in decrement")
        console.log(a)
        var b = parseInt(a)
        if (b > 0) {
            b--;
            console.log("b in decrement")
            console.log(b)
            //this.props.items[this.state.activeItem]["price"][priceId]["size"]["count"] = b;
            document.getElementById(priceId).innerHTML = b.toString();

        }
    }
    incrementValue(priceId) {
        var a = document.getElementById(priceId).innerHTML
        console.log("a in increment")
        console.log(a)
        var b = parseInt(a)

        b++;
        console.log("b in increment")
        console.log(b)
        //this.props.items[this.state.activeItem]["price"][priceId]["size"]["count"] = b;
        document.getElementById(priceId).innerHTML = b.toString();

    }
    modalbody() {
        if (this.state.activeItem)
            return (
                <div className="col">
                    {Object.keys(this.state.menu[this.state.activeItem]["price"]).map(priceId => {
                        return (
                            <div className="row" >
                                <div class="btn-group col-12" role="group" aria-label="Basic example" style={{ margintop: "10%" }}>
                                    <button type="button" class="btn btn-primary col-4">{this.state.menu[this.state.activeItem]["price"][priceId]["size"]}</button>
                                    <button type="button" class="btn btn-secondary disabled">₹ {this.state.menu[this.state.activeItem]["price"][priceId]["price"]}</button>

                                    <button type="button" class="btn btn-dark" onClick={() => { this.decrementValue(priceId) }}>-</button>
                                    <button type="button" class="btn btn-light" id={priceId}>0</button>
                                    <button type="button" class="btn btn-dark" onClick={() => { this.incrementValue(priceId) }}>+</button>

                                </div>

                            </div>);
                    })
                    }
                </div>
            )
    }

    showModal() {
        {
            return (
                <div class="modal fade" id="staticBackdrop" data-backdrop="static" tabindex="-1" role="dialog" aria-labelledby="staticBackdropLabel" aria-hidden="true" keyboard="false">
                    <div class="modal-dialog modal-dialog-centered" role="document">
                        <div class="modal-content">
                            <div class="modal-header">
                                <h5 class="modal-title" id="staticBackdropLabel">{this.modalhead()}</h5>


                            </div>
                            <div class="modal-body">
                                {this.modalbody()}
                            </div>
                            <div class="modal-footer">
                                <button type="button" class="btn btn-secondary" data-dismiss="modal" onClick={() => { this.setState({ activeItem: null }) }}>Close</button>
                                <button type="button" class="btn btn-primary" data-dismiss="modal" onClick={() => { this.addToCart() }}>Add item</button>
                            </div>
                        </div>
                    </div>
                </div>
            );
        }
    }

    render() {
        return (
            <div>
                <div >
                    {this.showModal()}
                </div>
                <div className="col">
                    <div className="row">
                        {this.showvendorscard()}
                        {this.showmenucategoriescard()}
                        {this.showpricecard()}
                    </div>
                </div>

                <div className=" m-5" >
                    {this.showData()}
                </div>
            </div >
        );
    }
}
export default withFirebase(neworders);