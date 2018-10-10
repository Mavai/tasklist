import React from 'react';
import { Grid } from 'semantic-ui-react';
import { Draggable, Droppable } from 'react-beautiful-dnd';
import Task from './Task';

class StatusColumn extends React.PureComponent {

  render () {
    const { status, tasks } = this.props;

    return (
      <Grid.Column>
        <Droppable droppableId={status.id}>
          {(provided) => (
            <div ref={provided.innerRef} style={{ minHeight: '100%' }}>
              <h1>{status.name}</h1>
              {tasks.map((task, index) =>
                <Draggable key={task.id} draggableId={task.id} index={index}>
                  {(provided) => (
                    <div
                      key={task.id}
                      ref={provided.innerRef}
                      { ...provided.draggableProps }
                      { ...provided.dragHandleProps }
                    >
                      <Task task={task} />
                    </div>
                  )}
                </Draggable>
              )}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </Grid.Column>
    );
  }
}

StatusColumn.defaultProps = {
  tasks: [],
  status: {}
};

export default StatusColumn;