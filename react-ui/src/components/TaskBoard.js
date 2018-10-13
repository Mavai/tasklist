import React from 'react';
import { Grid } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { DragDropContext } from 'react-beautiful-dnd';
import StatusColumn from './StatusColumn';
import { updateTask } from '../reducers/taskReducer';
import move from 'lodash-move';
import Placeholder from './Placeholder';


class TaskBoard extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      updatingBoard: false,
      tempBoard: {}
    };
  }

  onDragEnd = async (result) => {
    const { taskBoard, tasks, selectedProject } = this.props;
    if (!result.destination) return;
    const { droppableId: oldStatus, index: sourceIndex } = result.source;
    const { droppableId: newStatus, index: destinationIndex } = result.destination;
    const taskId = taskBoard[oldStatus][sourceIndex];
    const task = tasks[taskId];
    const tempBoard = this.calculateTaskBoard(oldStatus, newStatus, sourceIndex, destinationIndex, task);
    const updatedTask = { ...task, status: newStatus, project: task.project.id };
    const updatedProject = { ...selectedProject, taskBoard: tempBoard };
    this.setState({ updatingBoard: true, tempBoard });
    await this.props.updateTask(updatedTask, updatedProject);
    this.setState({ updatingBoard: false });
  };

  calculateTaskBoard = (oldStatus, newStatus, sourceIndex, destinationIndex, task) => {
    const { taskBoard } = this.props;
    if (oldStatus !== newStatus) {
      return {
        ...taskBoard,
        [oldStatus]: taskBoard[oldStatus].filter((task, index) => index !== sourceIndex),
        [newStatus]: [
          ...taskBoard[newStatus].slice(0, destinationIndex),
          task.id,
          ...taskBoard[newStatus].slice(destinationIndex)
        ]
      };
    } else {
      return {
        ...taskBoard,
        [oldStatus]: move(taskBoard[oldStatus], sourceIndex, destinationIndex)
      };
    }
  }

  getColumnTasks = (column = []) => {
    const { tasks } = this.props;
    if (!tasks) return [];
    return column.map(taskId => tasks[taskId]);
  }

  render() {
    const { selectedProject, statuses, taskBoard } = this.props;
    const { tempBoard, updatingBoard } = this.state;
    const board = updatingBoard ? tempBoard : taskBoard;

    if (!selectedProject) return (
      <Placeholder />
    );

    return (
      <DragDropContext onDragEnd={this.onDragEnd}>
        <Grid columns={statuses.length || 1} stackable>
          {statuses.map(status => (
            <StatusColumn
              key={status.name}
              tasks={this.getColumnTasks(board[status.id])}
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

const mapStateToProps = (state) => {
  const { tasks: taskList, statuses, projects } = state;
  const tasks = taskList.length
    ? taskList.reduce((obj, task) => ({
      ...obj,
      [task.id]: task
    }), {})
    : null;
  const selectedProject = projects.selected;
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
  { updateTask }
)(TaskBoard);