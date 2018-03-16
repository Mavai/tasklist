import React from 'react'
import { Menu } from 'semantic-ui-react'
import { connect } from 'react-redux'
import { changeStatus } from '../reducers/taskReducer'


const StatusMenu = (props) => {
  const { task, statuses } = props
  return(
    <Menu pagination widths={statuses.length}>
      {statuses.map(status =>
        <Menu.Item key={status} onClick={() => props.changeStatus(task, status)} disabled={status === task.status}>
          {status !== task.status && status}
        </Menu.Item>
      )}
    </Menu>
  )
}

const mapStateToProps = (state) => ({
  tasks: state.tasks,
  statuses: state.statuses
})

export default connect(
  mapStateToProps,
  { changeStatus }
)(StatusMenu)