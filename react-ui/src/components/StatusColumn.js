import React from 'react';
import { Grid } from 'semantic-ui-react';
import { Draggable, Droppable } from 'react-beautiful-dnd';
import Task from './Task';
import { connect } from 'react-redux';

class StatusColumn extends React.Component {

  render () {
    const { status, taskIds, tasks } = this.props;

    return (
      <Grid.Column key={status.name}>
        <Droppable droppableId={status.id}>
          {(provided) => (
            <div ref={provided.innerRef} style={{ minHeight: '100%' }}>
              <h1>{status.name}</h1>
              {taskIds.map((id, index) =>
                <Draggable key={id} draggableId={id} index={index}>
                  {(provided) => (
                    <div
                      key={id}
                      ref={provided.innerRef}
                      { ...provided.draggableProps }
                      { ...provided.dragHandleProps }
                    >
                      <Task task={tasks[id]} />
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

const mapStateToProps = (state) => {
  const tasks = state.tasks.reduce((obj, task) => ({
    ...obj,
    [task.id]: task
  }), {});
  return {
    tasks
  };
};

export default connect(
  mapStateToProps,
  null
)(StatusColumn);