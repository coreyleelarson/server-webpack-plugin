import React, { Component, Fragment } from 'react';

class App extends Component {
  constructor(...args) {
    super(...args);
    this.state = {
      tasks: [],
    };
  }

  componentDidMount() {
    fetch('/api/tasks').then(response => {
      response.json().then(data => {
        this.setState({ tasks: data.tasks });
      });
    });
  }

  render() {
    const { tasks = [] } = this.state;
    return (
      <Fragment>
        <h1>React App</h1>
        <ul>
          {tasks.map((task, index) =>
            <li key={index}>{task.description}</li>
          )}
        </ul>
      </Fragment>
    );
  }
}

export default App;