import React, { Component } from 'react'
import { Container, Card, Grid } from 'semantic-ui-react'

const tasks = [
  {
    name: 'Init app',
    description: 'Create app.',
    status: 'finished'
  },
  {
    name: 'Init eslint',
    description: 'Install eslint and define rules.',
    status: 'finished'
  },
  {
    name: 'Implement task component',
    description: 'Create react-component for single Task.',
    status: 'started'
  }
]

const finishedTasks = tasks.filter(task => task.status === 'finished')
const startedTasks = tasks.filter(task => task.status === 'started')

class App extends Component {
  render() {
    return (
      <Container style={{ marginTop: 20 }}>
        <Grid columns={2}>
          <Grid.Column>
            <h1>Started</h1>
            {startedTasks.map(task =>
              <Task key={task.name} task={task} />
            )}
          </Grid.Column>
          <Grid.Column>
            <h1>Finished</h1>
            {finishedTasks.map(task =>
              <Task key={task.name} task={task} />
            )}
          </Grid.Column>
        </Grid>
      </Container>
    )
  }
}

const Task = ({ task }) => (
  <Card>
    <Card.Content header={task.name} />
    <Card.Content description={task.description} />
  </Card>
)

export default App
