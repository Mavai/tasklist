import React, { Component } from 'react'
import { Container } from 'semantic-ui-react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import TaskBoard from './components/TaskBoard'
import NavBar from './components/NavBar'
import TaskForm from './components/TaskForm'
import { connect } from 'react-redux'
import { initTasks } from './reducers/taskReducer'
import { initStatuses } from './reducers/statusReducer'

class App extends Component {

  componentDidMount = async () => {
    this.props.initTasks()
    this.props.initStatuses()
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
                render={() => <TaskBoard />}
              />
              <Route
                exact path='/create'
                render={({ history }) => <TaskForm history={history} />}
              />
            </Container>
          </div>
        </Router>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  tasks: state.tasks
})

export default connect(
  mapStateToProps,
  { initTasks, initStatuses }
)(App)
