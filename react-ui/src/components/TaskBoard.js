import React from 'react'
import Task from '../components/Task'
import { Grid, Transition, List } from 'semantic-ui-react'
import { connect } from 'react-redux'

const TaskBoard = (props) => {
  const filteredTasks = (filter) =>
    props.tasks.filter(task => task.status === filter)

  return (
    <Grid columns={3} stackable>
      {props.statuses.map(status => (
        <Grid.Column key={status}>
          <h1>{status}</h1>
          <Transition.Group as={List} duration={500} animation='fade'>
            {filteredTasks(status).map(task =>
              <List.Item key={task.id}>
                <Task task={task} />
              </List.Item>
            )}
          </Transition.Group>
        </Grid.Column>
      ))}
    </Grid>
  )
}

const mapStateToProps = (state) => ({
  tasks: state.tasks.sort((a, b) => b.priority - a.priority || b.id - a.id),
  statuses: state.statuses
})

export default connect(
  mapStateToProps,
  null
)(TaskBoard)