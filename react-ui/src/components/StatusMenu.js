import React from 'react';
import { Menu } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { changeStatus } from '../reducers/taskReducer';


const StatusMenu = (props) => {
  const { task, statuses } = props;
  return(
    <Menu pagination widths={statuses.length} size='mini'>
      {statuses.map(status =>
        <Menu.Item key={status.name} onClick={() => props.changeStatus(task, status.id)} disabled={status.id === task.status.id}>
          {status.id !== task.status.id && status.name}
        </Menu.Item>
      )}
    </Menu>
  );
};

const mapStateToProps = (state) => ({
  tasks: state.tasks,
  statuses: state.statuses
});

export default connect(
  mapStateToProps,
  { changeStatus }
)(StatusMenu);