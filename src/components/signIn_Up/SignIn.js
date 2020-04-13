import React, { Component } from "react";
import { Formik } from "formik";
import * as Yup from "yup";
import './Registr.css'
import { styleInRegister as style } from '../../common/Styles'
import { FormControl, FormLabel, Form, InputGroup, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { compose } from "redux";
import { firestoreConnect } from "react-redux-firebase";
import { connect } from "react-redux";


class SignIn extends Component {
  state = {
    showPassword: false,
    notFound: false,
    remember: false,
  }

  showPassword() { this.setState({ showPassword: !this.state.showPassword }) }
  remember() { this.setState({ remember: !this.state.remember }) }

  render() {
    const { showPassword, notFound, remember } = this.state
    return <div className='container registr-inputs'>

      <div style={style.iconTag}>
        <div style={style.iconTag.iconDiv}><i className="fas fa-lock" style={{ color: "white" }}></i></div>
        <p style={style.iconTag.iconText}>Sign in</p>
      </div>
      <Formik
        initialValues={{ email: "", password: "", showPassword: false }}
        onSubmit={values => {
          for (let i in this.props.users) {
            if (i === values.password && this.props.users[i].email === values.email) {
              this.props.logg()
            } else { this.setState({ notFound: true, remember: false }) }
          }
        }}
        validationSchema={Yup.object().shape({
          email: Yup.string().email().required("Required"),
          password: Yup.string()
            .required("No password provided.")
            .min(8, "Password is too short - should be 8 chars minimum.")
            .matches(/(?=.*[0-9])/, "Password must contain a number.")
        })}  >
        {props => {
          const { values, touched, errors, isSubmitting, handleChange, handleBlur, handleSubmit } = props;

          return (
            <Form style={style.form_in} onSubmit={handleSubmit} htmlFor="email" >

              <FormLabel style={{ gridColumn: '1/3', gridRow: '3' }} >
                <FormControl
                  type="text"
                  name="email"
                  placeholder="Enter your email"
                  value={values.email}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={`myFormControl ${errors.email && touched.email && "error"}`}
                />
                {errors.email && touched.email && (
                  <div className="input-feedback">{errors.email}</div>
                )}
              </FormLabel>
              <FormLabel htmlFor="email" style={{ gridColumn: '1/3', gridRow: '4', position: "relative" }}>
                <FormControl name="password" type={!showPassword ? "password" : "text"}
                  placeholder="Enter your password" value={values.password}
                  onChange={handleChange} onBlur={handleBlur}
                  className={`myFormControl ${errors.password && touched.password && "error"}`}
                />
                <i className={`fas ${showPassword ? "fa-eye-slash" : "fa-eye"} right eyeIconStile`}
                  onClick={() => this.showPassword()}>  </i>
                {errors.password && touched.password && (
                  <div className="input-feedback">{errors.password}</div>)}
                {notFound && <div className="input-feedback">You have wrote wrong email or password,
                or haven't registered yet! Please try again or<Link to='/signup'> Sign Up.</Link></div>}
              </FormLabel>

              <InputGroup.Prepend style={{ gridColumn: '1/3', gridRow: '5' }} >
                <label className="RegisterCheckStyle">
                  <input type="checkbox" checked={remember} onChange={() => this.remember()} />Remember me</label>
              </InputGroup.Prepend>
              <Button type="submit" variant="primary" size="lg" block disabled={isSubmitting}
                style={{ gridColumn: "1/3", gridRow: "6", margin: "8px auto" }} >
                Sign in
              </Button>

              <div style={{ gridColumn: "1/3", gridRow: "7", }} >
                <p className="linkP" >Forgote password? </p>
                <Link to='/signup'> Don't have an account? Sign Up </Link>
              </div>
            </Form>
          );
        }}
      </Formik>
    </div>
  }
}

export default compose(
  firestoreConnect([{ collection: 'Users' }]),
  connect((state) => ({ users: state.firestore.data.Users }))
)(SignIn);
