import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Route, Switch } from 'react-router';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import { sendContact } from 'utils/contact';

import './contact.css';

class Contact extends Component {
    static contextTypes = {
        location: PropTypes.object,
        router: PropTypes.object
    }

    static defaultProps = {
        location: {}
    };

    static propTypes = {
        location: PropTypes.object
    }

    constructor(props) {
        super(props);

        this.state = {
            name: '',
            email: '',
            message: '',
            successfullySent: false
        }
    }

    contact = () => {
        let contactInfo = {
            name: this.state.name,
            message: this.state.message,
            email: this.state.email
        }
        sendContact(contactInfo)
            .then(status => {
                this.setState({
                    name: '',
                    email: '',
                    message: '',
                    successfullySent: true
                })
            })
    }

    updateState = (event) => {
        this.setState({
            [event.target.id]: event.target.value
        })
    }

    render() {
        return (
            <div className="contact">
                <div className="contact-container">
                    <h1>Contact</h1>
                    <div className="contact-detailsRow">
                        <div className="contact-inputContainer">
                            <label className="label">Name</label>
                            <input
                                className="contact-input"
                                id="name"
                                value={this.state.name}
                                onChange={this.updateState}
                                type="text"
                                required
                            />
                            <span className="highlight"></span>
                            <span className="bar"></span>
                        </div>
                        <div className="contact-inputContainer">
                            <label className="label">Email</label>
                            <input
                                className="contact-input"
                                id="email"
                                value={this.state.email}
                                onChange={this.updateState}
                                type="email" 
                                required
                            />
                            <span className="highlight"></span>
                            <span className="bar"></span>
                        </div>
                    </div>
                    <div className="contact-inputContainer">
                        <label className="label">Message</label>
                        <textarea
                            rows="4"
                            cols="50"
                            className="contact-input"
                            id="message"
                            value={this.state.message}
                            onChange={this.updateState}
                            required
                        />
                        <span className="highlight"></span>
                        <span className="bar"></span>
                    </div>
                    <button className="contact-submit" onClick={this.contact}>Submit</button>
                </div>
            </div>
        );
    }
}

function mapStateToProps({ auth }) {
    return { auth };
  }
  
  export default connect(mapStateToProps)(Contact);
  