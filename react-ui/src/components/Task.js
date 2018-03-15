import React from 'react'
import { Card, Transition } from 'semantic-ui-react'
import StatusMenu from '../components/StatusMenu'

const Task = ({ statuses, task, handleClick }) => (
  <Transition animation='scale' duration={500} transitionOnMount={true}>
    <Card fluid>
      <Card.Content>
        <Card.Header>{task.name} </Card.Header>
        <Card.Meta style={{ color: 'green' }}>{task.status} </Card.Meta>
        <Card.Description>{task.description} </Card.Description>
        <StatusMenu statuses={statuses} task={task} handleClick={handleClick} />
      </Card.Content>
    </Card>
  </Transition>
)

export default Task