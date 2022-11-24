import React, { Component } from "react";
import MovieRow from "./MovieRow";
import UserContext from "./userContext";

export default class MovieList extends Component {
  static contextType = UserContext;
  render() {
    return (
      <UserContext.Consumer>
        {(userContext) => (
          <div>
            Movie List{" "}
            {userContext.currentUser ? userContext.currentUser.name : ""}{" "}
            <MovieRow />
          </div>
        )}
      </UserContext.Consumer>
    );
  }
}
