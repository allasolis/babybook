import React, { Component } from "react";
import { connect } from "react-redux";
import Users from "./Users.jsx";
import Requests from "./Requests.jsx";

class UnconnectedFriends extends Component {
  state = {
    friendRequests: [],
    friends: []
  };

  componentDidMount = async () => {
    this.reloadFriendReqs();
  };

  reloadFriendReqs = async () => {
    let data = new FormData();
    console.log("username", this.props.username);
    data.append("username", this.props.username);
    let response = await fetch("/displayfriendsReq", {
      method: "POST",
      body: data
    });
    let body = await response.text();
    body = JSON.parse(body);
    console.log("friend request", body);
    this.setState({ friendRequests: body });
  };
  acceptRequest = async (from, to) => {
    let data = new FormData();
    console.log("from", from);
    data.append("from", from);
    console.log("to", to);
    data.append("to", to);
    let res = await fetch("/acceptRequest", { method: "POST", body: data });
    let body = await res.text();
    body = JSON.parse(body);
    console.log("body", body);
    if (body.success) {
      alert("friend added");
      this.reloadFriendReqs();
      return;
    }
    alert("friend was NOT added");
    //we want to fetch the endpoint which will accept the request.
    //this will take (from/to) and find the to in the users collection and add the from into their list of friends
    //then we will call delete requests to clear the request
  };

  deleteRequest = async (from, to) => {
    console.log(this.props);
    let data = new FormData();
    // console.log("from and to", from, to);
    data.append("from", from);
    data.append("to", to);
    let res = await fetch("/deleteRequest", { method: "POST", body: data });
    let body = await res.text();
    body = JSON.parse(body);
    console.log(body);
    if (body.success) {
      alert("success");
      this.reloadFriendReqs();
      return;
    }
    alert("request failed!");
  };

  displayFriends = async () => {
    let data = new FormData();
    console.log("username", this.props.username);
    data.append("username", this.props.username);
    let res = await fetch("/displayFriends", { method: "POST", body: data });
    let body = await res.text();
    body = JSON.parse(body);
    this.setState({ friends: body });
  };

  reloadFriendReqs = async () => {
    let data = new FormData();
    console.log("username", this.props.username);
    data.append("username", this.props.username);
    let response = await fetch("/displayfriendsReq", {
      method: "POST",
      body: data
    });
    let body = await response.text();
    body = JSON.parse(body);
    console.log("friend request", body);
    this.setState({ friendRequests: body });
  };

  render() {
    // add a profile pic from a person who sent a request in my div.

    return (
      <div>
        <div>Your friend's list: </div>

        {this.state.friendRequests.map(friend => (
          <div>
            {friend.from}
            <button onClick={() => this.acceptRequest(friend.from, friend.to)}>
              ACCEPT REQUEST
            </button>
            <button onClick={() => this.deleteRequest(friend.from, friend.to)}>
              DENY REQUEST
            </button>
          </div>
        ))}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    username: state.username,
    userId: state.userId,
    friends: state.friends
  };
};

let Friends = connect(mapStateToProps)(UnconnectedFriends);
export default Friends;
