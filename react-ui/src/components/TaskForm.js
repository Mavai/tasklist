import React from 'react';
import { Form, Button } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { createTask } from '../reducers/taskReducer';
import { updateForm } from '../reducers/taskFormReducer';
import Placeholder from './Placeholder';

class TaskForm extends React.PureComponent {

  onCancel = (e) => {
    e.preventDefault();
    this.props.onCancel();
  }

  render() {
    const { statuses, formData, updateForm, selectedProject, onSubmit, onCancel } = this.props;

    if (!selectedProject) return (
      <Placeholder />
    );

    const options = statuses.map(status => ({ key: status.name, text: status.name, value: status.id }));
    return (
      <Form onSubmit={onSubmit(formData)}>
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
        <Form.Dropdown
          selection
          label='Status'
          options = {options}
          onChange={updateForm}
          name='status'
          placeholder='Status'
          defaultValue={formData.status}
        />
        <Form.Field>
          <label>Project</label>
          <input readOnly value={selectedProject.name}></input>
        </Form.Field>
        <Button type='submit'>Submit</Button>
        { onCancel &&
        <Button onClick={this.onCancel}>Cancel</Button> }
      </Form>
    );
  }
}

const mapStateToProps = state => ({
  statuses: state.statuses,
  formData: state.taskForm,
  selectedProject: state.projects.all
    .find(project => project.id === state.projects.selected)
});

export default connect(
  mapStateToProps,
  { createTask, updateForm }
)(TaskForm);