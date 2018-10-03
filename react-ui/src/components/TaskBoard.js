import React from 'react';
import { Grid } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { DragDropContext } from 'react-beautiful-dnd';
import StatusColumn from './StatusColumn';
import { updateTask } from '../reducers/taskReducer';


class TaskBoard extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      updatingBoard: false,
      tempBoard: {}
    };
  }

  render() {

    const { selectedProject, statuses, taskBoard, tasks } = this.props;
    if (!selectedProject) return (
      <div style={{ width: 200, height: 100, position: 'absolute', top: 0, bottom: 0, left: 0, right: 0, margin: 'auto' }}>
        <h1>Select project</h1>
      </div>
    );

    const onDragEnd = async (result) => {
      const { destination, source } = result;
      if (!destination) return;
      const newStatus = destination.droppableId;
      const oldStatus = source.droppableId;
      const taskId = taskBoard[oldStatus][source.index];
      const task = tasks[taskId];
      const tempBoard = {
        ...taskBoard,
        [oldStatus]: taskBoard[oldStatus].filter((task, index) => index !== source.index),
        [newStatus]: [ ...taskBoard[newStatus].slice(0, destination.index), task.id, ...taskBoard[newStatus].slice(destination.index) ]
      };
      const updatedTask = { ...task, status: newStatus, project: task.project.id };
      this.setState({ updatingBoard: true, tempBoard });
      await this.props.updateTask(updatedTask);
      this.setState({ updatingBoard: false });
    };

    return (
      <DragDropContext onDragEnd={onDragEnd}>
        <Grid columns={statuses.length} stackable>
          {statuses.map(status => (
            <StatusColumn
              key={status.name}
              taskIds={this.state.updatingBoard ? this.state.tempBoard[status.id] : taskBoard[status.id]}
              status={status}/>
          ))}
        </Grid>
      </DragDropContext>
    );
  }
}

const filteredByStatus = (tasks, status) =>
  tasks
    .filter(task => task.status.id === status.id)
    .map(task => task.id);

const mapStateToProps = (state) => {
  const taskBoard = state.statuses.reduce((obj, status) => ({
    ...obj,
    [status.id]: filteredByStatus(state.tasks, status).sort((a, b) => b.priority - a.priority || b.id - a.id)
  }), {});
  const tasks = state.tasks.reduce((obj, task) => ({
    ...obj,
    [task.id]: task
  }), {});

  return {
    tasks,
    taskBoard,
    statuses: state.statuses,
    selectedProject: state.projects.selected
  };
};

export default connect(
  mapStateToProps,
  { updateTask }
)(TaskBoard);