import React, { Component } from 'react'
import { FormControl, Tooltip, Button, OverlayTrigger, FormLabel, Form } from 'react-bootstrap'
import { compose } from 'redux'
import { firestoreConnect } from 'react-redux-firebase'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { firestore } from '../../Store'

class AddClient extends Component {

  constructor(props) {
    super(props)
    this.state = {
      name: "",
      lastName: "",
      transfer: "",
      contact: ''
    }
  }

  addUser() {
    const { name, lastName, transfer, contact } = this.state
    firestore.collection("Clients").doc().set({
      name, lastName, contact,
      transfer: transfer ? transfer : 0,
    }).then(() => { })
    this.setState({ name: "", lastName: "", transfer: "", contact: '' })
  }
  handleChange = (e) => { this.setState({ [e.target.name]: e.target.value }) }

  render() {
    const { name, transfer, lastName, contact } = this.state
    return (
      <div className="container pct">
        <Form onSubmit={this.addUser.bind(this)} className="addClientForm" >

          <div className="addClientTitle">Please write all options for grammarly adding Client data</div>
          <Form.Row>
            <FormLabel className="addClientLabel">Name</FormLabel> <span style={{ color: "red" }}>*</span>
            <FormControl name="name" value={name} onChange={this.handleChange} placeholder="name" />
          </Form.Row>
          <Form.Row>
            <FormLabel className="addClientLabel">Surname</FormLabel> <span style={{ color: "red" }}>*</span>
            <FormControl name="lastName" value={lastName} onChange={this.handleChange} placeholder="surname" />
          </Form.Row>
          <Form.Row>
            <FormLabel className="addClientLabel">Transfer</FormLabel>
            <FormControl name="transfer" value={transfer} onChange={this.handleChange} placeholder="transfer" />
          </Form.Row>
          <Form.Row style={{ marginBottom: "20px" }}>
            <FormLabel className="addClientLabel">Contact</FormLabel> <span style={{ color: "red" }}>*</span>
            <FormControl name="contact" value={contact} onChange={this.handleChange} placeholder="enter contact" />
          </Form.Row>
          {name && contact && lastName ?
            <Link to="/dashboard" className="addClientLink" onClick={(e) => this.addUser(e)}> Add Client</Link>
            :
            <OverlayTrigger
              overlay={<Tooltip id="tooltip-disabled">Write required options for add client!</Tooltip>}>
              <span >
                <Button variant="outline-secondary" disabled style={{ width: "100%" }}> Add Client </Button>
              </span>
            </OverlayTrigger >}
        </Form>
      </div >
    )
  }
}

export default compose(
  firestoreConnect([{ collection: 'Clients' }]),
  connect((state) => ({
    clients: state.firestore.data.Clients
  }))
)(AddClient);
