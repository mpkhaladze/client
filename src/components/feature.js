import React, { Component } from 'react'
import { connect } from 'react-redux'
import * as actions from '../actions'

class Feature extends Component {
  componentWillMount() {
      this.props.fetchUser()
  }
  render () {
    if (!this.props.user) {
      return <div>Loading ....</div>
    }

    return (
      <div>
        <h1>This is a featured content</h1>
        <p>Hello {this.props.user.name}</p>
        <p>Your id is: {this.props.user.id}</p>
      </div>
    )
  }
}

function mapStateToProps (state) {
  return {user: state.auth.user}
}

export default connect(mapStateToProps, actions)(Feature)