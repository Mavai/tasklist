import React from 'react';
import { Card, Icon } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { toggleInfo, removeTask, changePriority } from '../reducers/taskReducer';

const Task = (props) => {

  const { task, removeTask, changePriority } = props;

  return (
    <Card fluid>
      <Card.Content>
        <Card.Header>{task.name}</Card.Header>
        <div>
          <Card.Meta style={{ color: 'green' }}>{task.status.name} </Card.Meta>
          <Card.Description>{task.description} </Card.Description>
          <div style={{ marginTop: 5 }}>
            <Icon link onClick={() => removeTask(task)} color='red' inverted circular name='delete'></Icon>
            <Icon link onClick={() => console.log('sth')} color='blue' inverted circular name='edit'></Icon>
            <Icon
              link
              onClick={() => changePriority(task, 'increase')}
              color='green'
              inverted
              circular
              name='arrow circle up'
              style={{ float: 'right' }}></Icon>
            <Icon
              link
              onClick={() => changePriority(task, 'decrease')}
              color='green'
              inverted
              circular
              name='arrow circle down'
              style={{ float: 'right' }}></Icon>
          </div>
        </div>
      </Card.Content>
    </Card>
  );
};

export default connect(
  null,
  { toggleInfo, removeTask, changePriority }
)(Task);