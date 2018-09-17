import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Container } from 'semantic-ui-react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import NavBar from './components/NavBar'
import TaskForm from './components/TaskForm'
import TaskBoard from './components/TaskBoard'
import ProjectInfo from './components/ProjectInfo'
import { initTasks } from './reducers/taskReducer'
import { initStatuses } from './reducers/statusReducer'
import { initProjects } from './reducers/projectReducer'

class App extends Component {

  componentDidMount = async () => {
    this.props.initTasks()
    this.props.initStatuses()
    this.props.initProjects()
  }

  render() {
    return (
      <Router>
        <div>
          <NavBar />
          <Container style={{ marginTop: 60 }}>
            <Route
              exact path='/'
              render={() => (<ProjectInfo />)}
            />
            <Route
              exact path='/taskboard'
              render={() => <TaskBoard />}
            />
            <Route
              exact path='/create'
              render={({ history }) => <TaskForm history={history} />}
            />
          </Container>
        </div>
      </Router>
    )
  }
}

export default connect(
  null,
  { initTasks, initStatuses, initProjects }
)(App)
