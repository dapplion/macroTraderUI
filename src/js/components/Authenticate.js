import React from 'react'
import params from 'Params'
import * as websocketAPI from 'API/testSockets'
import AppStore from 'Store/AppStore'


class ErrorMessage extends React.Component {
  render() {
    if (this.props.signInMessage == '') {
      return (
        null
      )
    } else {
      return (
        <div class="alert alert-danger mt-4" role="alert">
          {this.props.signInMessage}
        </div>
      );
    }
  }
}


export default class Authenticate extends React.Component {
  constructor() {
    super();
    this.state = {
      // Initial states of variables must be defined in the constructor
      signInMessage: ''
    };
  }

  componentWillMount() {
    AppStore.on("CHANGE", this.updateSignInMessage.bind(this));
  }
  componentWillUnmount() {
    AppStore.removeListener("CHANGE", this.updateSignInMessage.bind(this));
  }
  componentDidMount() {
    this.updateSignInMessage();
  }
  updateSignInMessage() {
    this.setState({
      signInMessage: AppStore.getSignInMessage()
    });
  }

  submitForm(e) {
    let Key = e.target.querySelector("#inputKey").value;
    let Secret = e.target.querySelector("#inputSecret").value;
    websocketAPI.signIn({
      Key: Key,
      Secret: Secret
    })
    e.preventDefault();
    return false
  }

  render() {
    return (
      <div class='container'>
        <div class='row'>
          <div class="col-sm-4">
          </div>
          <div class="text-center col-sm-4">
            <form class="form-signin mt-5"
            onSubmit={this.submitForm.bind(this)}>
              <h1 class="h3 mb-3 font-weight-normal">Please provide credentials</h1>
              <label for="inputPassword" class="sr-only">Email address</label>
              <input type="text" id="inputKey" class="form-control" placeholder="API key" />
              <label for="inputPassword" class="sr-only">Password</label>
              <input type="password" id="inputSecret" class="form-control" placeholder="API secred" required/>
              <button class="btn btn-lg btn-primary btn-block" type="submit">Sign in</button>
              <ErrorMessage
              signInMessage={this.state.signInMessage}
              />
            </form>
          </div>
        </div>
      </div>
    );
  }
}
