import React, { Component } from 'react'
import { Form, FormLabel, FormControl, InputGroup, Button } from 'react-bootstrap'
import { styleInRegister as style } from '../../common/Styles'
import { Link, } from 'react-router-dom'
import { compose } from 'redux'
import { firestoreConnect } from 'react-redux-firebase'
import { connect } from 'react-redux'
import { firestore } from '../../Store'

import { Formik } from "formik";
import * as Yup from "yup";


class SignUp extends Component {
  constructor() {
    super()
    this.state = {
      showPass: false,
      showConfirm: false,
    }
  }

  showPassword() { this.setState({ showPass: !this.state.showPass }) }
  showConfirm() { this.setState({ showConfirm: !this.state.showConfirm }) }

  render() {
    const { showPass, showConfirm } = this.state
    return <Formik
      initialValues={{ name: "", lastName: "", email: "", password: "", confirm: "", agree: false }}
      onSubmit={values => {
        const { name, lastName, email, password } = values
        firestore.collection("Users").doc().set({
          name, lastName, email, password
        })
          .then(() => { this.props.logg() })
      }}
      //********Using Yup for validation********/
      validationSchema={Yup.object().shape({
        name: Yup.string()
          .required("Name is required")
          .min(2, "Too short - should be 2 chars minimum."),
        lastName: Yup.string()
          .required("Surename is required")
          .min(2, "Too short - should be 2 chars minimum."),
        email: Yup.string()
          .email()  // .label("Email").email()
          .required("Required"),
        password: Yup.string()
          .required("No password provided.")
          .min(8, "Password is too short - should be 8 chars minimum.")
          .matches(/(?=.*[0-9])/, "Password must contain a number."),
        confirm: Yup.string()
          .required("Confirm requred").label("Confirm requred"),
        agree: Yup.boolean()
          .test("is-true", "Should agree to terms.", value => value === true)
      })}
    >
      {props => {
        const { values, touched, errors, isSubmitting, handleChange, handleBlur, handleSubmit, dirty } = props;
        return (
          <Form onSubmit={handleSubmit} style={style.form_up}>

            <div style={style.iconTag}>
              <div style={style.iconTag.iconDiv}><i className="fas fa-lock" style={{ color: "white" }}></i></div>
              <p style={style.iconTag.iconText}>Registration</p>
            </div>
            <FormLabel htmlFor="email" style={{ gridColumn: '1/2', gridRow: '2' }} >
              <FormControl type="text" name="name" value={values.name} onChange={handleChange}
                onBlur={handleBlur} placeholder='name'
                className={`myFormControl ${errors.name && touched.name && "error"}`} />
              {errors.name && touched.name && (
                <div className="input-feedback">{errors.name}</div>
              )}
            </FormLabel>
            <FormLabel htmlFor="email" style={{ gridColumn: '2/3', gridRow: '2' }} >
              <FormControl type="text" name="lastName" value={values.lastName} onChange={handleChange}
                onBlur={handleBlur} placeholder='surname'
                className={`myFormControl ${errors.lastName && touched.lastName && "error"}`} />
              {errors.lastName && touched.lastName && (
                <div className="input-feedback">{errors.lastName}</div>
              )}
            </FormLabel>
            <FormLabel style={{ gridColumn: '1/3', gridRow: '3' }} >
              <FormControl type="email" name="email" value={values.email} onChange={handleChange}
                onBlur={handleBlur} placeholder='Email'
                className={`myFormControl ${errors.email && touched.email && "error"}`} />
              {errors.email && touched.email && (
                <div className="input-feedback">{errors.email}</div>
              )}
            </FormLabel>
            <FormLabel htmlFor="email" style={{ gridColumn: '1/3', gridRow: '4', position: "relative" }} >
              <FormControl type={!showPass ? "password" : "text"} value={values.password} name="password"
                onChange={handleChange} placeholder='password' onBlur={handleBlur}
                className={`myFormControl ${errors.password && touched.password && "error"}`} />
              <i className={`fas ${showPass ? "fa-eye-slash" : "fa-eye right"}  eyeIconStile`}
                onClick={this.showPassword.bind(this)}>  </i>
              {errors.password && touched.password && (
                <div className="input-feedback">{errors.password}</div>
              )}
            </FormLabel>
            <FormLabel htmlFor="email" style={{ gridColumn: '1/3', gridRow: '5', position: "relative" }} >
              <FormControl type={!showConfirm ? "password" : "text"} value={values.confirm} name="confirm"
                onChange={handleChange} onBlur={handleBlur} placeholder='confirm password'
                className={`myFormControl ${errors.confirm && touched.confirm && "error"}`} />
              <i className={`fas ${showConfirm ? "fa-eye-slash" : "fa-eye right"}  eyeIconStile`}
                onClick={this.showConfirm.bind(this)}>  </i>
              {errors.confirm && touched.confirm && (
                <div className="input-feedback">{errors.confirm}</div>
              )}
              {values.confirm && values.password !== values.confirm && <div className="input-feedback">"Write correct password"</div>}
            </FormLabel>

            <InputGroup.Prepend style={{ gridColumn: '1/3', gridRow: '6' }} >
              <label className="RegisterCheckStyle">
                <input type="checkbox" name="agree" checked={values.agree} onChange={handleChange} onBlur={handleBlur} />
                I agree to the rules of use.
              </label>
              {errors.agree && isSubmitting && dirty && (
                <div className="input-feedback">{errors.agree}</div>
              )}
            </InputGroup.Prepend>
            <Button type="submit" variant="primary" size="lg" block
              disabled={!props.isValid || values.password !== values.confirm || isSubmitting}
              onSubmit={handleSubmit}
              style={{ gridColumn: "1/3", gridRow: "7", margin: "8px auto" }}>
              Sign Up
            </Button>
            <div style={{ gridColumn: "1/3", gridRow: "8", textAlign: "end", }} >
              <Link to='/signin'>Already have an account? Sign in </Link>
            </div>
          </Form>
        );
      }}
    </Formik>
  }
}

export default compose(
  firestoreConnect([{ collection: 'Users' }]),
  connect((state) => {
    return { users: state.firestore.ordered.Users }
  })
)(SignUp);
