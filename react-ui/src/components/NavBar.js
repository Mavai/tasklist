import React from 'react';
import { NavLink, withRouter } from 'react-router-dom';
import { Menu, Container, Dropdown } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { selectProject } from '../reducers/projectReducer';

class NavBar extends React.PureComponent {

  render () {

    const { selectedProject, projects, selectProject } = this.props;
    return (
      <Menu fixed='top' size='huge'>
        <Container>
          <Menu.Item
            name='Info'
            as={ NavLink }
            exact to='/'
            activeClassName='active'
          />
          <Menu.Item
            name='Taskboard'
            as={ NavLink }
            exact to='/taskboard'
            activeClassName='active'
          />
          <Menu.Item
            name='New task'
            as={ NavLink }
            exact to='/create'
            activeClassName='active'
          />
          <Dropdown item text={selectedProject ? selectedProject.name : 'Project'}>
            <Dropdown.Menu>
              {projects.map(project =>
                <Dropdown.Item key={project.name} onClick={() => selectProject(project.id)}>
                  {project.name}
                </Dropdown.Item>
              )}
            </Dropdown.Menu>
          </Dropdown>
        </Container>
      </Menu>
    );
  }
}

const mapStateToProps = (state) => {
  const { all: projects, selected } = state.projects;
  return {
    projects,
    selectedProject: projects.find(project => project.id === selected)
  };
};

export default withRouter(connect(
  mapStateToProps,
  { selectProject }
)(NavBar));