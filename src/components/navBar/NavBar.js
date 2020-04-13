import React, { Component } from 'react'
import { Navbar, Nav, Button, NavLink } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import rf from '../../common/images/rf.png'

export default class NavBar extends Component {
  render() {
    return (
      <Navbar bg="dark" variant="dark">
        <div className="container">
          <NavLink className="navbar-brand" to="/dashboard">
            <img className="brandLogo" src={rf} alt="To dashboard" />
          </NavLink>
          <Nav className="mr-auto">
            {this.props.logged && <Link to="/dashboard" className="nav-link">DashBoard</Link>}
            {this.props.logged && <Link to="/add-client" className="nav-link">Add Client</Link>}
            {!this.props.logged && <Link to="/signin" className="nav-link right">Sign In</Link>}
          </Nav>
          {this.props.logged && <Button variant="outline-info" className="mr-2"
            onClick={() => this.props.logg()}> Log out
        </Button>}
        </div>
      </Navbar>
    )
  }
}
