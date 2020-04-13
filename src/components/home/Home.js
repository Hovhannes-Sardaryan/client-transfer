import React, { Component } from 'react'
import 'firebase/firestore';
import { firestoreConnect } from 'react-redux-firebase';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';


class Home extends Component {

  render() {
    return (
      <div className="Home">
        <h1>Home</h1>
        <br />
        <h2>Hello dear friend</h2>
        <h2>Please <Link to="/signin">Sign in</Link> for using application.</h2>
      </div>
    )
  }
}


export default compose(
  firestoreConnect([{ collection: 'Clients' }]),
  connect((state) => {
    return { clients: state.firestore.ordered.Clients }
  })
)(Home);
