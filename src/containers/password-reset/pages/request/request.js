import React, { Component } from 'react';
import buttonStyles from 'shared-components/mui/buttonStyles';
import { connect } from 'react-redux';
import muiTheme from 'shared-components/mui/muiTheme';
import PropTypes from 'prop-types';
import { requestPasswordReset } from 'actions/password-reset';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import updateLocalState from 'shared-components/inputStateUpdate';
import ValidateInput from 'shared-components/validateInput';
// Direct path imports
import envelope from '../../../../images/envelope.png';
import './request.css';

class Request extends Component {
  static get propTypes() {
    return {
      dispatch: PropTypes.func.isRequired,
      history: PropTypes.object.isRequired
    };
  }

  constructor(props, context) {
    super(props, context);

    this.inputChanged = this.inputChanged.bind(this);
    this.handleEmailSubmit = this.handleEmailSubmit.bind(this);

    this.state = {
      email: '',
      sentRecoveryEmail: false,
      errorDialogOpen: false,
      errorFields: {}
    };
  }

  /**
   * Putting this into an object here to keep the param list short. Should also
   * perform any stripping of empty data or other modifications/final checks on user input
   * here.
   */
  objectifyFormData() {
    const { email } = this.state;
    const formData = {
      email
    };
    return formData;
  }

  /**
   * Updates the local state of Login Component.
  */
  inputChanged(event) {
    updateLocalState(event, this);
  }

  handleEmailSubmit() {
    this.props.dispatch(requestPasswordReset(this.state.email))
      .then((status) => {
        if (status.response.status === 'success') {
          this.props.history.push({
            pathname: '/en/passwordreset/sent',
            state: {
              email: this.state.email
            }
          });
        }
      });
  }

  render() {
    return (
      <div className="column requestContainer">
        <div className="requestContainer-parent align-center text-center row">
          <div className="requestContainer-formContainer small-9 medium-6 large-centered column">
            <img src={envelope} alt="key" />
            <div>
              <h4 className="requestContainer-formContainer-header">PASSWORD HELP</h4>
              <p className="requestContainer-formContainer-subHeader">Enter the email associated with your Esports Arena account, then click Continue.  We will email you a link to a secret level where you can summon a new password.</p>
            </div>
            <div>
              <ValidateInput
                name="email"
                value={this.state.email}
                context={this}
              >
                <TextField
                  id="email"
                  className="requestContainer-input-text"
                  floatingLabelStyle={{ color: muiTheme.palette.alternateTextColor }}
                  floatingLabelText="Email"
                  hintStyle={{ color: muiTheme.palette.accent3Color }}
                  onBlur={this.inputChanged}
                  style={{ width: '300px' }}
                />
              </ValidateInput>
              <RaisedButton
                buttonStyle={buttonStyles.buttonStyle}
                labelStyle={buttonStyles.buttonLabelStyle}
                label="Continue"
                onTouchTap={this.handleEmailSubmit}
                secondary={false}
                style={buttonStyles.containerStyle}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps() {
  return { user: null };
}

export default connect(mapStateToProps)(Request);
