import React from 'react'
import { Grid } from 'semantic-ui-react'
import Task from '../components/Task'
import { connect } from 'react-redux'

const TaskBoard = (props) => {
  const filteredTasks = (filter) =>
    props.tasks.filter(task => task.status === filter)

  return (
    <Grid columns={3} stackable>
      {props.statuses.map(status => (
        <Grid.Column key={status}>
          <h1>{status}</h1>
          {filteredTasks(status).map(task =>
            <Task statuses={props.statuses} key={task.id} task={task} />
          )}
        </Grid.Column>
      ))}
    </Grid>
  )
}

const mapStateToProps = (state) => ({
  tasks: state.tasks,
  statuses: state.statuses
})

export default connect(
  mapStateToProps,
  null
)(TaskBoard)