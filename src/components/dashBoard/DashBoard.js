import React from 'react'
import { Table } from 'react-bootstrap'
import { connect } from 'react-redux'
import { compose } from 'redux'
import { firestoreConnect } from 'react-redux-firebase'
import "./Dashboard.css"
import { IconsStyle } from '../../common/Styles'
import Loading from '../../common/Loading'
import { firestore } from '../../Store'
import { Link } from 'react-router-dom'

function DashBoard(props) {
  let cL = []
  let index = 0

  for (let user in props.clients) {
    cL.push({ userId: user, ...props.clients[user] })
  }
  const deleteUser = (id) => {
    firestore.collection("Clients").doc(`${id}`).delete()
  }

  return (
    <div className="dashboardStyle">
      <div>
        <h1>DashBoard</h1>
      </div>
      {!props.clients ? <Loading /> : <Table striped bordered hover variant="dark">
        <thead>
          <tr style={{ padding: "30px" }}>
            <th>#</th>
            <th>Name</th>
            <th>Sure Name</th>
            <th>Transfer ( <i className="fas fa-dollar-sign"></i> )</th>
            <th>Contact</th>
          </tr>
        </thead>
        <tbody>
          {cL.map(item => {
            index++
            return (
              <tr className="" key={index}>
                <td>{index}</td>
                <td>{item.name}</td>
                <td>{item.lastName}</td>
                <td>$ {item.transfer} </td>
                <td>{item.contact}
                  <div className='dashboard-icon-items'>
                    <Link to={`/dashboard/${item.userId}`} style={{ textDecoration: "none" }}>
                      <i className="fas fa-pencil-alt editIcon"></i>
                    </Link>
                    <div onClick={(e) => deleteUser(item.userId, e)} >
                      <i className="fas fa-trash-alt" style={IconsStyle.deleteIcon} ></i>
                    </div>
                  </div>
                </td>
              </tr>
            )
          })}
        </tbody>
      </Table>}
    </div>
  )
}

export default compose(
  firestoreConnect([{ collection: 'Clients' }]),
  connect((state) => ({
    clients: state.firestore.data.Clients
  }))
)(DashBoard);
