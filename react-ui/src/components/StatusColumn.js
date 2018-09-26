import React from 'react';
import { Grid } from 'semantic-ui-react';
import { Draggable, Droppable } from 'react-beautiful-dnd';
import Task from './Task';

const StatusColumn = (props) => {

  const { statusWrapper } = props;

  return (
    <Grid.Column key={statusWrapper.status.name}>
      <Droppable droppableId={statusWrapper.status.name}>
        {(provided) => (
          <div ref={provided.innerRef}>
            <h1>{statusWrapper.status.name}</h1>
            {statusWrapper.tasks.map((task, index) =>
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
};

export default StatusColumn;