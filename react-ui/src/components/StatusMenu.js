import React from 'react'
import { Menu } from 'semantic-ui-react'

const StatusMenu = ({ task, statuses, handleClick }) => {
  return(
    <Menu pagination widths={statuses.length}>
      {statuses.map(status =>
        <Menu.Item key={status} onClick={handleClick(task, status)} disabled={status === task.status}>
          {status !== task.status && status}
        </Menu.Item>
      )}
    </Menu>
  )
}

export default StatusMenu