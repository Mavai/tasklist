import React from 'react';
import Task from '../components/Task';
import { Grid, List } from 'semantic-ui-react';
import { connect } from 'react-redux';

const TaskBoard = (props) => {
  const { selectedProject, statuses, tasksByStatus } = props;
  if (!selectedProject) return (
    <div style={{ width: 200, height: 100, position: 'absolute', top: 0, bottom: 0, left: 0, right: 0, margin: 'auto' }}>
      <h1>Select project</h1>
    </div>
  );

  return (
    <Grid columns={statuses.length} stackable>
      {tasksByStatus.map(obj => (
        <Grid.Column key={obj.status.name}>
          <h1>{obj.status.name}</h1>
          {obj.tasks.map(task =>
            <List.Item key={task.id}>
              <Task task={task} />
            </List.Item>
          )}
        </Grid.Column>
      ))}
    </Grid>
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