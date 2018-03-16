import React from 'react'
import StatusMenu from '../components/StatusMenu'
import { Card, Transition } from 'semantic-ui-react'

const Task = ({ task }) => (
  <Transition animation='scale' duration={500} transitionOnMount={true}>
    <Card fluid>
      <Card.Content>
        <Card.Header>{task.name} </Card.Header>
        <Card.Meta style={{ color: 'green' }}>{task.status} </Card.Meta>
        <Card.Description>{task.description} </Card.Description>
        <StatusMenu task={task} />
      </Card.Content>
    </Card>
  </Transition>
)

export default Task