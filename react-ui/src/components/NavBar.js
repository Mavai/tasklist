import React from 'react'
import { Menu, Container } from 'semantic-ui-react'
import { NavLink } from 'react-router-dom'

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