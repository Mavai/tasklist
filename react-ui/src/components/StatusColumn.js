import React from 'react';
import { Grid } from 'semantic-ui-react';
import { Draggable, Droppable } from 'react-beautiful-dnd';
import Task from './Task';
import { connect } from 'react-redux';
import { removeTask } from '../reducers/taskReducer';

class StatusColumn extends React.PureComponent {

  constructor(props) {
    super(props);
    this.removeTask = this.removeTask.bind(this);
  }

  removeTask(task) {
    const { removeTask } = this.props;
    return () => removeTask(task);
  }

  render () {
    const { status, tasks } = this.props;

    return (
      <Grid.Column>
        <Droppable droppableId={status.id}>
          {(provided) => (
            <div ref={provided.innerRef} style={{ minHeight: '100%' }}>
              <h1>{status.name}</h1>
              {tasks.map((task, index) =>
                task &&
                <Draggable key={task.id} draggableId={task.id} index={index}>
                  {(provided) => (
                    <div
                      key={task.id}
                      ref={provided.innerRef}
                      { ...provided.draggableProps }
                      { ...provided.dragHandleProps }
                    >
                      <Task task={task} removeTask={this.removeTask(task)} />
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

const mapStateToProps = (state) => ({
  selectedProject: state.projects.selected
});

export default connect(
  mapStateToProps,
  { removeTask }
)(StatusColumn);