import React from 'react'
import { Menu } from 'semantic-ui-react'
import { connect } from 'react-redux'
import { changeStatus } from '../reducers/taskReducer'


const StatusMenu = (props) => {
  const { task, statuses } = props
  const toggleStatus = (task, status) => () => {
    props.changeStatus(task, status)
  }
  return(
    <Menu pagination widths={statuses.length}>
      {statuses.map(status =>
        <Menu.Item key={status} onClick={toggleStatus(task, status)} disabled={status === task.status}>
          {status !== task.status && status}
        </Menu.Item>
      )}
    </Menu>
  )
}

const mapStateToProps = (state) => ({
  tasks: state.tasks
})

export default connect(
  mapStateToProps,
  { changeStatus }
)(StatusMenu)