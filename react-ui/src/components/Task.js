import React from 'react'
import StatusMenu from '../components/StatusMenu'
import { Card, Transition } from 'semantic-ui-react'
import { connect } from 'react-redux'
import { toggleInfo } from '../reducers/taskReducer'

const Task = (props) => {

  const { task, toggleInfo } = props

  return (
    <Transition animation='scale' duration={500} transitionOnMount={true}>
      <Card fluid>
        <Card.Content onClick={() => toggleInfo(task)}>
          <Card.Header>{task.name} </Card.Header>
          <div style={{ display: task.info ? '' : 'none' }}>
            <Card.Meta style={{ color: 'green' }}>{task.status} </Card.Meta>
            <Card.Description>{task.description} </Card.Description>
            <StatusMenu task={task} />
          </div>
        </Card.Content>
      </Card>
    </Transition>
  )
}

export default connect(
  null,
  { toggleInfo }
)(Task)