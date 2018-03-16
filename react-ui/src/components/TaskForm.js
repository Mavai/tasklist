import React from 'react'
import { Form } from 'semantic-ui-react'
import { createTask } from '../reducers/taskReducer'
import { connect } from 'react-redux'

class TaskForm extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      name: '',
      description: '',
      status: ''
    }
  }
  createTask = (history) => async (event) => {
    event.preventDefault()
    const task = { name: this.state.name, description: this.state.description, status: this.state.status }
    this.props.createTask(task)
    this.setState({ name: '', description: '', status: '' })
    history.push('/')
  }

  handleChange = (event, data) => {
    if (data) this.setState({ [data.name]: data.value })
    else this.setState({ [event.target.name]: event.target.value })
  }

  render = () => {
    const { history, statuses } = this.props
    const options = statuses.map(status => ({ key: status, text: status, value: status }))
    return (
      <Form onSubmit={this.createTask(history)}>
        <Form.Field>
          <label>Name</label>
          <input onChange={this.handleChange} value={this.state.name} name='name'/>
        </Form.Field>
        <Form.Field>
          <label>Description</label>
          <input onChange={this.handleChange} value={this.state.description} name='description'/>
        </Form.Field>
        <Form.Select
          label='Status'
          options = {options}
          onChange={this.handleChange}
          name='status'
          placeholder='Status'
        />
        <Form.Button>Submit</Form.Button>
      </Form>
    )
  }
}

const mapStateToProps = (state) => ({
  statuses: state.statuses
})

export default connect(
  mapStateToProps,
  { createTask }
)(TaskForm)