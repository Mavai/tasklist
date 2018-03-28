import React from 'react'
import { Form } from 'semantic-ui-react'
import { connect } from 'react-redux'
import { createTask } from '../reducers/taskReducer'
import { updateForm } from '../reducers/taskFormReducer'

const TaskForm = (props) => {
  const { statuses, formData, updateForm, selectedProject } = props

  if (!selectedProject) return (
    <div style={{ width: 200, height: 100, position: 'absolute', top: 0, bottom: 0, left: 0, right: 0, margin: 'auto' }}>
      <h1>Select project</h1>
    </div>
  )

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
      <Form.Field>
        <label>Project</label>
        <input readOnly value={selectedProject.name}></input>
      </Form.Field>
      <Form.Button>Submit</Form.Button>
    </Form>
  )
}

const mapStateToProps = (state) => ({
  statuses: state.statuses,
  formData: state.taskForm,
  selectedProject: state.projects.selected
})

export default connect(
  mapStateToProps,
  { createTask, updateForm }
)(TaskForm)