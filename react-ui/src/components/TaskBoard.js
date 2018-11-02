import React from 'react';
import { Grid } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { DragDropContext } from 'react-beautiful-dnd';
import StatusColumn from './StatusColumn';
import { changeTaskStatus } from '../reducers/taskReducer';
import Placeholder from './Placeholder';


class TaskBoard extends React.PureComponent {

  onDragEnd = async result => {
    const { taskBoard, tasks, changeTaskStatus } = this.props;
    if (!result.destination) return;
    const { droppableId: oldStatus, index: sourceIndex } = result.source;
    const { droppableId: newStatus, index: destinationIndex } = result.destination;
    const taskId = taskBoard[oldStatus][sourceIndex];
    const task = tasks[taskId];
    const updatedTask = { ...task, status: newStatus, project: task.project.id };
    await changeTaskStatus(updatedTask, { oldStatus, newStatus, sourceIndex, destinationIndex });
  };

  getColumnTasks = (column = []) => {
    const { tasks } = this.props;
    if (!tasks) return [];
    return column.map(taskId => tasks[taskId]);
  };

  render() {
    const { selectedProject, statuses, taskBoard } = this.props;

    if (!selectedProject) return (
      <Placeholder />
    );

    return (
      <DragDropContext onDragEnd={this.onDragEnd}>
        <Grid columns={statuses.length || 1} stackable>
          {statuses.map(status => (
            <StatusColumn
              key={status.name}
              tasks={this.getColumnTasks(taskBoard[status.id])}
              status={status}/>
          ))}
        </Grid>
      </DragDropContext>
    );
  }
}

TaskBoard.defaultProps = {
  statuses: [],
  taskBoard: {}
};

const mapStateToProps = state => {
  const { tasks: taskList, statuses, projects } = state;
  const tasks = taskList.length
    ? taskList.reduce((obj, task) => ({
      ...obj,
      [task.id]: task
    }), {})
    : null;
  const selectedProject = projects.all.find(project => project.id === projects.selected);
  const taskBoard = selectedProject ? selectedProject.taskBoard : {};

  return {
    tasks,
    statuses,
    selectedProject,
    taskBoard
  };
};

export default connect(
  mapStateToProps,
  { changeTaskStatus }
)(TaskBoard);