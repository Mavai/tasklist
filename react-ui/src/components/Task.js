import React from 'react';
import { Card } from 'semantic-ui-react';
import TaskControls from './TaskControls';

const Task = props => {

  const { task, removeTask, editTask } = props;
  return (
    <Card fluid style={{ marginBottom: 10 }}>
      <Card.Content>
        <Card.Header>{task.name}</Card.Header>
        <div>
          <Card.Description>{task.description} </Card.Description>
          <TaskControls removeTask={removeTask} editTask={editTask} />
        </div>
      </Card.Content>
    </Card>
  );
};

Task.defaultProps = {
  task: {}
};

export default Task;