import React from 'react'
import params from 'Params'

export default class Home extends React.Component {
  constructor() {
    super();
  }

  render() {
    return (
      <div class="jumbotron text-center">
        <h1 class="display-4">{params.pageName}</h1>
        <p class="lead">Please, select a market in the upper navigation bar to get started</p>
        <hr class="my-4"/>
        <p>If you need help on using this tool please read the docs</p>
        <p class="lead">
          <a class="btn btn-secondary btn-lg" href="#" role="button">Learn more</a>
        </p>
      </div>
    );
  }
}
