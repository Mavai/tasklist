import React, { Component } from 'react'
import { Container } from 'semantic-ui-react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import taskservice from './services/tasks'
import TaskBoard from './components/TaskBoard'
import NavBar from './components/NavBar'
import TaskForm from './components/TaskForm'

const statuses = [
  'not started',
  'started',
  'finished'
]

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      tasks: [],
      name: '',
      description: '',
      status: ''
    }
  }

  componentDidMount = async () => {
    const tasks = await taskservice.getAll()
    this.setState({ tasks })
  }

  toggleStatus = (updatedTask, status) => () => {
    const filteredTasks = this.state.tasks.filter(task => task.name !== updatedTask.name)
    filteredTasks.push({ ...updatedTask, status })
    this.setState({ tasks: filteredTasks, name: '', description: '', status: '' })
  }

  filteredTasks = (filter) =>
    this.state.tasks.filter(task => task.status === filter)

  handleChange = (event, data) => {
    if (data) this.setState({ [data.name]: data.value })
    else this.setState({ [event.target.name]: event.target.value })
  }

  createTask = (history) => async (event) => {
    event.preventDefault()

    const task = { name: this.state.name, description: this.state.description, status: this.state.status }
    const createdTask = await taskservice.createNew(task)
    this.setState({ tasks: [...this.state.tasks, createdTask] })
    history.push('/')
  }

  render() {
    return (
      <div>
        <Router>
          <div>
            <NavBar />
            <Container style={{ marginTop: 60 }}>
              <Route
                exact path='/'
                render={() =>
                  <TaskBoard
                    statuses={statuses}
                    handleClick={this.toggleStatus}
                    filteredTasks={this.filteredTasks}
                  />}
              />
              <Route
                exact path='/create'
                render={({ history }) =>
                  <TaskForm
                    statuses={statuses}
                    handleChange={this.handleChange}
                    state={this.state}
                    handleSubmit={this.createTask}
                    history={history}
                  />}
              />
            </Container>
          </div>
        </Router>
      </div>
    )
  }
}

export default App
