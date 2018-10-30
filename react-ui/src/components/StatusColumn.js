import React from 'react';
import { Grid, Modal } from 'semantic-ui-react';
import { Draggable, Droppable } from 'react-beautiful-dnd';
import Task from './Task';
import { connect } from 'react-redux';
import { removeTask, updateTask, beginTaskEdit } from '../reducers/taskReducer';
import TaskForm from './TaskForm';

class StatusColumn extends React.PureComponent {

  removeTask = task => {
    const { removeTask } = this.props;
    return () => removeTask(task);
  }

  editTask = task => {
    const { beginTaskEdit } = this.props;
    return () => beginTaskEdit({ ...task, editMode: true });
  }

  stopTaskEdit = task => {
    const { updateTask } = this.props;
    return () => updateTask({ ...task, editMode: false }, false);
  }

  onSubmit = task => formData => event => {
    event.preventDefault();
    const { updateTask } = this.props;
    updateTask({ ...task, ...formData, project: task.project.id });
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
                      <Task task={task} removeTask={this.removeTask(task)} editTask={this.editTask(task)} />
                      <Modal open={task.editMode} onClose={this.stopTaskEdit(task)}>
                        <Modal.Header>
                          Edit task
                        </Modal.Header>
                        <Modal.Content>
                          <TaskForm onSubmit={this.onSubmit(task)} onCancel={this.stopTaskEdit(task)} />
                        </Modal.Content>
                      </Modal>
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

const mapStateToProps = state => ({
  selectedProject: state.projects.all
    .find(project => project.id === state.projects.selected)
});

export default connect(
  mapStateToProps,
  { removeTask, updateTask, beginTaskEdit }
)(StatusColumn);