import React from 'react'
import { Form } from 'semantic-ui-react'

const TaskForm = ({ statuses, handleChange, state, handleSubmit, history }) => {
  const options = statuses.map(status => ({ key: status, text: status, value: status }))
  const { name, description } = state
  return (
    <Form onSubmit={handleSubmit(history)}>
      <Form.Field>
        <label>Name</label>
        <input onChange={handleChange} value={name} name='name'/>
      </Form.Field>
      <Form.Field>
        <label>Description</label>
        <input onChange={handleChange} value={description} name='description'/>
      </Form.Field>
      <Form.Select
        label='Status'
        options = {options}
        onChange={handleChange}
        name='status'
        placeholder='Status'
      />
      <Form.Button>Submit</Form.Button>
    </Form>
  )
}

export default TaskForm