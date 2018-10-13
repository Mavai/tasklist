import React from 'react';
import { Form } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { createTask } from '../reducers/taskReducer';
import { updateForm } from '../reducers/taskFormReducer';
import Placeholder from './Placeholder';

class TaskForm extends React.PureComponent {

  constructor(props) {
    super(props);
    this.createTask = this.createTask.bind(this);
  }

  async createTask(event) {
    const { createTask, history, formData } = this.props;
    event.preventDefault();
    createTask(formData);
    history.push('/');
  }

  render() {
    const { statuses, formData, updateForm, selectedProject } = this.props;

    if (!selectedProject) return (
      <Placeholder />
    );

    const options = statuses.map(status => ({ key: status.name, text: status.name, value: status.id }));
    return (
      <Form onSubmit={this.createTask}>
        <Form.Input
          label='Name'
          onChange={updateForm}
          value={formData.name}
          name='name'
        />
        <Form.Input
          label='Description'
          onChange={updateForm}
          value={formData.description}
          name='description'
        />
        <Form.Select
          label='Status'
          options = {options}
          onChange={updateForm}
          name='status'
          placeholder='Status'
        />
        <Form.Field>
          <label>Project</label>
          <input readOnly value={selectedProject.name}></input>
        </Form.Field>
        <Form.Button>Submit</Form.Button>
      </Form>
    );
  }
}

const mapStateToProps = (state) => ({
  statuses: state.statuses,
  formData: state.taskForm,
  selectedProject: state.projects.selected
});

export default connect(
  mapStateToProps,
  { createTask, updateForm }
)(TaskForm);