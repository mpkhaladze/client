import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router'

class Header extends Component {
	renderLinks(){
		if (this.props.authenticated) {
			return(
				<li key={3} className='nav-item'>
					<Link className="nav-link" to="/signout"> Sign Out</Link>
				</li>
			)
		}else{
			return (
				<div  key={6} >
					<li  key={1} className='nav-item'>
						<Link className="nav-link" to="/signin">Sign In</Link>
					</li>
					<li key={2} className='nav-item'>
						<Link className="nav-link" to="/signup" >Sign Up</Link>
					</li>
				</div>
			)
		}
	}
	render() {
		return(
			<nav className='navbar navbar-light'>
				<Link to="/" className="navbar-brand"> Redux Auth</Link>
				<ul className='nav navbar-nav'>
					{this.renderLinks()}
				</ul>
			</nav>

		)
	}
}

function mapStateToProps(state) {
	console.log(state.auth.authenticated)
	return {
		authenticated: state.auth.authenticated
	}
}
export default connect(mapStateToProps)(Header)