import React, { Component } from "react";
import "./mainpage.css";
import { Link } from "react-router-dom";
import VendorImg from "./vendorImg";
class CardItems extends Component {
  render() {
    let location = "/neworders/?vendor=" + this.props.vendor; //this ? means that everything after this is parameters ok
    return (
      <div className="col-xs-12 col-md-6 col-xl-6">
        <div className="card m-1 my-2 ">
          <VendorImg img={this.props.img} height="300px" />
          <Link
            to={location}
            style={{ textDecoration: "none", color: "black" }}
          >
            <div
              class="card-img-overlay text-white"
              style={{ textShadow: "2px 2px #000000" }}
            >
              <div>
                <h5 class="card-title d-inline-flex h1">{this.props.title}</h5>
              </div>
              <p class="card-text" style={{ height: "48px" }}>
                {this.props.para}
              </p>
            </div>
          </Link>
        </div>
      </div >
    );
  }
}

class Mainpage extends Component {
  render() {
    return (
      <div class="header">
        <div class="bg">
          <div class="header-contents">
            <div class="main">
              <h2
                style={{
                  fontVariant: "small-caps",
                  top: "50%",
                  fontSize: "50px",
                }}
              >
                EAT.MEET.GREET
              </h2>
            </div>
          </div>
        </div>

        <div className="container-fluid">
          <div className="row">
            <CardItems
              title="LA PINOZ"
              para="All the taste and toppings you want on a pizza, straight from
                  our oven to your door!"
              vendor="La Pino'z Pizza"
              img="lapinoz.jpg"
            />

            <CardItems
              title="BURGRILL"
              para="Liscensed to grill."
              vendor="Burgrill"
              img="burgrillnew.jpg"
            />

            <CardItems
              title="TEA Q"
              para="Adding Moments of Perfect Sip."
              vendor="Tea Q"
              img="teaqnew.jpg"
            />
            <CardItems
              title="SQUARE ONE"
              para="It's good mood food."
              vendor="Square One"
              img="squareonenew.jpg"
            />
          </div>
        </div>
      </div>
    );
  }
}
export default Mainpage;