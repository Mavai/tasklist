import React from 'react';
import { Grid } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { DragDropContext } from 'react-beautiful-dnd';
import StatusColumn from './StatusColumn';

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
          <StatusColumn key={obj.status.name} statusWrapper={obj} />
        ))}
      </Grid>
    </DragDropContext>
  );
};

const filteredByStatus = (tasks, status) =>
  tasks.filter(task => task.status.id === status.id);

const filteredByCurrentProject = (tasks, project) =>
  project ?
    tasks.filter(task => task.project.id === project.id) :
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