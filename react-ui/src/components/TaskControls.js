import React from 'react';
import { Icon } from 'semantic-ui-react';

const TaskControls = (props) => {

  const { removeTask } = props;

  return (
    <div style={{ marginTop: 5 }}>
      <Icon link onClick={removeTask} color='red' inverted circular name='delete'></Icon>
      <Icon link onClick={() => console.log('sth')} color='blue' inverted circular name='edit'></Icon>
    </div>
  );
};

export default TaskControls;