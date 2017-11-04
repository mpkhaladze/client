import React, { Component } from 'react'
import { reduxForm } from 'redux-form'
import * as actions from '../../actions'

class Signup extends Component {

  renderAlert () {
    if (this.props.errorMessage) {
      const errors = this.props.errorMessage
      return (
        <div className="alert alert-danger">
          <ul className="list-group">
              {Object.keys(errors).map(function(key, index) {
                 return <li key={key}>{`${key} - ${errors[key]}`}</li>
              })}
          </ul>
        </div>
      )
    }
  }

  handleFormSubmit (formProps) {
    this.props.signupUser(formProps)
  }

  render () {
    const { handleSubmit, fields: { email,password, password_confirmation } } = this.props
    return (
      <form onSubmit={handleSubmit(this.handleFormSubmit.bind(this))}>
        <fieldset className="form-group">
          <label>Email:</label>
          <input className="form-control" {...email}/>
          {email.touched && email.error && <div className="error">{email.error}</div>}
        </fieldset>
        <fieldset className="form-group">
          <label>Password:</label>
          <input type="password" className="form-control" {...password}/>
          {password.touched && password.error && <div className="error">{password.error}</div>}
        </fieldset>
        <fieldset className="form-group">
          <label>Confirm Password:</label>
          <input type="password" className="form-control" {...password_confirmation}/>
          {password_confirmation.touched && password_confirmation.error && <div className="error">{password_confirmation.error}</div>}
        </fieldset>
        {this.renderAlert()}
        <button action="submit" className="btn btn-primary">Sign Up</button>
      </form>
    )
  }
}

function validate (formProps) {
  const errors = {}

  if (!formProps.email) {
    errors.email = 'You must enter Email!'
  }

  if (!formProps.password) {
    errors.password = 'You must enter Password!'
  }

  if (!formProps.password_confirmation) {
    errors.password_confirmation = 'You must enter Confirm Password!'
  }

  if (formProps.password !== formProps.password_confirmation) {
    errors.password = 'Passwords must match!'
  }

  return errors
}

function mapStateToProps (state) {
  return { errorMessage: state.auth.error }
}

export default reduxForm({
  form: 'signup',
  fields: ['email', 'password', 'password_confirmation'],
  validate
}, mapStateToProps, actions)(Signup)