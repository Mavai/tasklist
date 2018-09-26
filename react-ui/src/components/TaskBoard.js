import React from 'react';
import Task from '../components/Task';
import { Grid } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

const TaskBoard = (props) => {
  const { selectedProject, statuses, tasksByStatus } = props;
  if (!selectedProject) return (
    <div style={{ width: 200, height: 100, position: 'absolute', top: 0, bottom: 0, left: 0, right: 0, margin: 'auto' }}>
      <h1>Select project</h1>
    </div>
  );

  return (
    <DragDropContext onDragEnd={result => console.log(result)}>
      <Grid columns={statuses.length} stackable>
        {tasksByStatus.map(obj => (
          <Grid.Column key={obj.status.name}>
            <Droppable droppableId={obj.status.name}>
              {(provided) => (
                <div ref={provided.innerRef}>
                  <h1>{obj.status.name}</h1>
                  {obj.tasks.map((task, index) =>
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
                </div>
              )}
            </Droppable>
          </Grid.Column>
        ))}
      </Grid>
    </DragDropContext>
  );
};

const filteredByStatus = (tasks, status) =>
  tasks.filter(task => task.status === status.id);

const filteredByCurrentProject = (tasks, project) =>
  project ?
    tasks.filter(task => task.project === project.id) :
    [];

const mapStateToProps = (state) => {
  const tasks = filteredByCurrentProject(state.tasks, state.projects.selected);
  const tasksByStatus = state.statuses.map(status => ({
    status,
    tasks: filteredByStatus(tasks, status).sort((a, b) => b.priority - a.priority || b.id - a.id)
  }));
  return {
    tasksByStatus,
    statuses: state.statuses,
    selectedProject: state.projects.selected
  };
};

export default connect(
  mapStateToProps,
  null
)(TaskBoard);