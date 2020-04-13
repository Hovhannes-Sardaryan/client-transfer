import React, { Component } from 'react'
import { compose } from 'redux';
import { firestoreConnect } from 'react-redux-firebase';
import { connect } from 'react-redux';
import './Dashboard.css'
import { Card, Button, Table } from 'react-bootstrap';
import { firestore } from '../../Store';


class EditUser extends Component {
  state = {
    name: "",
    lastName: '',
    transfer: '',
    contact: "",
    edit: true,
    usr: {}
  }

  handleChange = (e) => { this.setState({ [e.target.name]: e.target.value }) }
  showEditInputs(usr) { this.setState({ edit: !this.state.edit, usr: usr }) }
  saveChanges(id) {
    const { name, lastName, transfer, usr, contact } = this.state
    firestore.collection("Clients").doc(id).update({
      name: name ? name : usr.name,
      lastName: lastName ? lastName : usr.lastName,
      transfer: transfer ? transfer : usr.transfer,
      contact: contact ? contact : usr.contact,
    });
    this.setState({ edit: false })
  }

  render() {
    let usr = {}
    for (let i in this.props.clients) {
      if (i === this.props.match.params.userId) {
        usr = { id: i, ...this.props.clients[i] }
      }
    }
    let { edit, name, lastName, transfer, contact } = this.state
    return (
      <div className="container pct">
        <Card className="text-center " variant='primary'>
          <Card.Header variant="sucsess"> <h2>You can edit and save changes</h2> </Card.Header>
          <Table >
            <tbody>
              <tr>
                <td className="infoA"><strong>Name</strong></td>
                <td className="infoB">{!edit ? usr.name : <input className="editInput" name="name"
                  value={name} onChange={this.handleChange} placeholder={usr.name}
                />}</td>
              </tr>
              <tr>
                <td className="infoA"><strong>Sure Name</strong></td>
                <td className="infoB">{!edit ? usr.lastName : <input className="editInput" name="lastName"
                  value={lastName} onChange={this.handleChange} placeholder={usr.lastName}
                />}</td>
              </tr>
              <tr>
                <td className="infoA"><strong>Transfer</strong></td>
                <td className="infoB">{!edit ? usr.transfer : <input className="editInput" name="transfer"
                  value={transfer} onChange={this.handleChange} placeholder={usr.transfer}
                />}</td>
              </tr>
              <tr>
                <td className="infoA"><strong>Contact</strong></td>
                <td className="infoB">{!edit ? usr.contact : <input className="editInput" name="contact"
                  value={contact} onChange={this.handleChange} placeholder={usr.contact}
                />}</td>
              </tr>
            </tbody>
          </Table>
          <Card.Body>
            <Button variant="outline-primary" onClick={() => this.props.history.push('/')}>Go Back</Button>
            <Button variant="outline-primary" style={{ margin: "0 20px" }} onClick={() => this.showEditInputs(usr)}>
              {!edit ? "Edit Data" : "Cancel "}</Button>
            <Button variant="outline-success" onClick={() => this.saveChanges(usr.id)} disabled={!edit}>Save Changes</Button>
          </Card.Body>
          <Card.Footer className="text-muted">{new Date().getFullYear()}</Card.Footer>
        </Card>
      </div>
    )
  }
}

export default compose(
  firestoreConnect([{ collection: 'Clients' }]),
  connect((state) => ({ clients: state.firestore.data.Clients }))
)(EditUser);
