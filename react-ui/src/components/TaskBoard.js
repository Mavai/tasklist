import React from 'react'
import { Grid } from 'semantic-ui-react'
import Task from '../components/Task'

const TaskBoard = ({ statuses, handleClick, filteredTasks }) => (
  <Grid columns={3} stackable>
    {statuses.map(status => (
      <Grid.Column key={status}>
        <h1>{status}</h1>
        {filteredTasks(status).map(task =>
          <Task statuses={statuses} key={task.id} task={task} handleClick={handleClick} />
        )}
      </Grid.Column>
    ))}
  </Grid>
)

export default TaskBoard