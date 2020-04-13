import React, { Component } from 'react';
import './App.css';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import { compose } from 'redux';
import { firestoreConnect } from 'react-redux-firebase';
import { connect } from 'react-redux'

// import Home from './components/home/Home';
import DashBoard from './components/dashBoard/DashBoard';
import NavBar from './components/navBar/NavBar';
import SignIn from './components/signIn_Up/SignIn';
import SignUp from './components/signIn_Up/SignUp';
import Error from './components/error/Error';
import EditUser from './components/dashBoard/EditUser';
import AddClient from './components/dashBoard/AddClient';
// import { UserIsNotAuthenticated, UserIsAuthenticated } from './common/Firebase_Log_In';

class App extends Component {

  state = {
    loggedIn: true
  }

  logOrNot() { this.setState({ loggedIn: !this.state.loggedIn }) }

  render() {
    const { loggedIn } = this.state
    return (
      <div className='App imApp'>
        <BrowserRouter >
          <NavBar logg={this.logOrNot.bind(this)} logged={loggedIn} />
          <Switch>

            {/* <Route path="/" component={Home} exact /> */}
            {/* <Route path="/" component={UserIsNotAuthenticated(Home)} exact /> */}

            {/* <Route path="/signin" component={UserIsNotAuthenticated(SignIn)} exact /> */}
            <Route path="/signin" exact render={() => !loggedIn ? <SignIn logg={this.logOrNot.bind(this)} /> :
              <Redirect to="/dashboard" />} />

            {/* <Route path="/dashboard" component={UserIsAuthenticated(DashBoard)} exact /> */}
            <Route path="/dashboard" exact render={() => loggedIn ? <DashBoard /> : <Redirect to='/signin' />} />
            {/* <Route path="/:userId" component={UserIsNotAuthenticated(EditUser)} exact /> */}
            <Route path="/dashboard/:userId" component={EditUser} exact />

            <Route path="/signup" exact render={() => !loggedIn ? <SignUp logg={() => this.logOrNot()} /> :
              <Redirect to="/add-client" />} />
            <Route path="/add-client" render={() => loggedIn && <AddClient />} exact />


            <Route component={Error} />
          </Switch>
        </BrowserRouter>
      </div>
    )
  }
}
export default compose(
  firestoreConnect([{ collection: 'Clients' }]),
  connect((state) => {
    return { clients: state.firestore.ordered.Clients }
  })
)(App);
