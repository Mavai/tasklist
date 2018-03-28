import React from 'react'
import { NavLink, withRouter } from 'react-router-dom'
import { Menu, Container, Dropdown } from 'semantic-ui-react'
import { connect } from 'react-redux'
import { selectProject } from '../reducers/projectReducer'

const NavBar = (props) => (
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
      <Dropdown item text={props.project ? props.project.name : 'Project'}>
        <Dropdown.Menu>
          {props.projects.map(project =>
            <Dropdown.Item key={project.name} onClick={() => props.selectProject(project)}>{project.name}</Dropdown.Item>
          )}
        </Dropdown.Menu>
      </Dropdown>
    </Container>
  </Menu>
)

const mapStateToProps = (state) => {
  return {
    projects: state.projects.all,
    project: state.projects.selected
  }
}

export default withRouter(connect(
  mapStateToProps,
  { selectProject }
)(NavBar))