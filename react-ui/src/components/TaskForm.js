import React from 'react'
import { Form } from 'semantic-ui-react'
import { connect } from 'react-redux'
import { createTask } from '../reducers/taskReducer'
import { updateForm } from '../reducers/taskFormReducer'

const TaskForm = (props) => {
  const { statuses, formData, updateForm } = props

  const createTask = async (event) => {
    event.preventDefault()
    props.createTask(formData)
    props.history.push('/')
  }

  const options = statuses.map(status => ({ key: status, text: status, value: status }))
  return (
    <Form onSubmit={createTask}>
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
      <Form.Button>Submit</Form.Button>
    </Form>
  )
}

const mapStateToProps = (state) => ({
  statuses: state.statuses,
  formData: state.taskForm
})

export default connect(
  mapStateToProps,
  { createTask, updateForm }
)(TaskForm)