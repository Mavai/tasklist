import React from 'react';
import { Form, Button } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { createTask } from '../reducers/taskReducer';
import { withFormik } from 'formik';

class TaskForm extends React.PureComponent {

  onCancel = (e) => {
    e.preventDefault();
    this.props.onCancel();
  }

  render() {
    const { statuses, handleChange, setFieldValue, handleSubmit, onCancel, values } = this.props;

    const options = statuses.map(status => ({ key: status.name, text: status.name, value: status.id }));
    return (
      <Form onSubmit={handleSubmit}>
        <Form.Input
          label='Name'
          onChange={handleChange}
          value={values.name}
          name='name'
        />
        <Form.Input
          label='Description'
          onChange={handleChange}
          value={values.description}
          name='description'
        />
        <Form.Dropdown
          selection
          label='Status'
          options = {options}
          onChange={(e, { name, value }) => setFieldValue(name, value)}
          name='status'
          placeholder='Status'
          defaultValue={values.status}
        />
        <Button type='submit'>Submit</Button>
        { onCancel &&
        <Button onClick={this.onCancel}>Cancel</Button> }
      </Form>
    );
  }
}

const mapStateToProps = state => ({
  statuses: state.statuses
});

const FormikTaskForm = withFormik({
  mapPropsToValues: ({ initialValues = {} }) => {
    const { name = '', description = '', status = {} } = initialValues;
    return {
      name,
      description,
      status: status.id || ''
    };
  },
  handleSubmit: (values, { setSubmitting }) => {
    setTimeout(() => {
      alert(JSON.stringify(values, null, 2));
      setSubmitting(false);
    }, 1000);
  }
})(TaskForm);

export default connect(
  mapStateToProps,
  { createTask }
)(FormikTaskForm);