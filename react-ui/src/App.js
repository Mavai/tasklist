import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { Container } from 'semantic-ui-react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import NavBar from './components/NavBar';
import TaskForm from './components/TaskForm';
import TaskBoard from './components/TaskBoard';
import ProjectInfo from './components/ProjectInfo';
import { initTasks } from './reducers/taskReducer';
import { initStatuses } from './reducers/statusReducer';
import { initProjects } from './reducers/projectReducer';

class App extends PureComponent {

  componentDidMount = async () => {
    await this.initState();
  }

  initState = async () => {
    this.props.initStatuses();
    this.props.initProjects();
  }

  componentDidUpdate = () => {
    const { selectedProject } = this.props;
    if (selectedProject) {
      this.props.initTasks(selectedProject);
    }
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
    );
  }
}

const mapStateToProps = (state) => {
  return {
    selectedProject: state.projects.selected
  };
};

export default connect(
  mapStateToProps,
  { initTasks, initStatuses, initProjects }
)(App);
