import React, { Component } from "react";
import jwt_decode from "jwt-decode";

class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      email: "",
    };
  }

  componentDidMount() {
    var decodedToken = jwt_decode(localStorage.usertoken);
    this.state({
      name: decodedToken.name,
      email: decodedToken.email,
    });
  }

  render() {
    return (
      <div className="container">
        Name: {this.state.name} <br />
        E-mail: {this.state.email}
      </div>
    );
  }
}

export default Profile;
