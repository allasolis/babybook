import React, { Component } from "react";
import { connect } from "react-redux";
import { Link, Redirect } from "react-router-dom";
import NewPost from "./NewPost.jsx";
import Post from "./Post.jsx";

//submit handler
let filteredPosts = async () => {
  let response = await fetch("/posts");
  let responseBody = await response.text();

  let parsed = JSON.parse(responseBody);

  this.props.dispatch({
    type: "set-posts",
    messages: parsed
  });
  return parsed;
};

class UnconnectedHomepage extends Component {
  state = {
    loggedIn: true,
    posts: [],
    filteredPosts: []
  };

  componentDidMount = () => {
    let filteredPosts = async () => {
      let response = await fetch("/allposts");
      let responseBody = await response.text();
     
      let parsed = JSON.parse(responseBody);
      
      this.props.dispatch({
        type: "set-posts",
        posts: parsed
      });
    };
    // let filteredPosts = posts.filter(post => {
    //   return posts.username === this.props.post._id;
    // });
    // this.setState({ filteredPosts: filteredPosts });
    setInterval(filteredPosts, 500);
  };

  render = () => {
    if (this.props.loggedIn) {
      return <Redirect to="/posts" />;
    } else {
      return (
        <div>
          <div className="container">
            <div className="box">
              <div className="formbox">
                <h1 className="signup bolder">Signup</h1>
                <div className="free bolder">
                  Sign up to see photos and videos from your friends.
                </div>
                <form className="signup-form" onSubmit={this.submitHandler}>
                  <input
                    type="text"
                    className="inputbody in1"
                    value={this.state.username}
                    placeholder="Username..."
                    onChange={this.usernameHandler}
                  ></input>
                  <input
                    type="password"
                    className="inputbody in2"
                    value={this.state.password}
                    placeholder="Password..."
                    onChange={this.passwordHandler}
                  ></input>
                  <input
                    type="submit"
                    className="buttonSignUp"
                    value="Sign up"
                  ></input>
                </form>

                <form className="form">
                  <div className="link-login">
                    <Link className="link" to="/login">
                      <div className="account">Already have an account? </div>
                      <div className="account">Click here to log in.</div>
                    </Link>
                  </div>
                </form>
              </div>
              {/* <Signup /> */}
              <div className="phone">
                <img src="/phone.jpg" />
              </div>
            </div>
          </div>
          //{" "}
        </div>
      );
    }
  };
}

let mapStateToProps = state => {
  return {
    loggedIn: state.loggedIn,
    posts: state.posts

    // add posts
  };
};

let Homepage = connect(mapStateToProps)(UnconnectedHomepage);
export default Homepage;
