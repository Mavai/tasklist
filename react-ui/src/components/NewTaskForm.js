import React from 'react';
import { connect } from 'react-redux';
import { createTask } from '../reducers/taskReducer';
import Placeholder from './Placeholder';
import TaskForm from './TaskForm';

class NewTaskForm extends React.PureComponent {

  createTask = formData => {
    const { createTask, history } = this.props;
    createTask(formData);
    history.push('/');
  }

  render() {
    const { selectedProject } = this.props;

    if (!selectedProject) return (
      <Placeholder />
    );

    return (
      <TaskForm onSubmit={this.createTask} />
    );
  }
}

const mapStateToProps = state => ({
  selectedProject: state.projects.all
    .find(project => project.id === state.projects.selected)
});

export default connect(
  mapStateToProps,
  { createTask }
)(NewTaskForm);