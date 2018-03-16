import React from 'react'
import { NavLink } from 'react-router-dom'
import { Menu, Container } from 'semantic-ui-react'

const NavBar = () => (
  <Menu fixed='top' size='huge'>
    <Container>
      <Menu.Item
        name='Taskboard'
        as={ NavLink }
        exact to='/'
        activeClassName='active'

      />
      <Menu.Item
        name='New task'
        as={ NavLink }
        exact to='/create'
        activeClassName='active'
      />
    </Container>
  </Menu>
)

export default NavBar