import React from 'react'
import Task from '../components/Task'
import { Grid, Transition, List } from 'semantic-ui-react'
import { connect } from 'react-redux'

const TaskBoard = (props) => {
  if (!props.selectedProject) return (
    <div style={{ width: 200, height: 100, position: 'absolute', top: 0, bottom: 0, left: 0, right: 0, margin: 'auto' }}>
      <h1>Select project</h1>
    </div>
  )

  return (
    <Grid columns={3} stackable>
      {props.statuses.map(status => (
        <Grid.Column key={status}>
          <h1>{status}</h1>
          <Transition.Group as={List} duration={{ show: 500, hide: 0 }} animation='fade'>
            {props[status].map(task =>
              <List.Item key={task.id}>
                <Task task={task} />
              </List.Item>
            )}
          </Transition.Group>
        </Grid.Column>
      ))}
    </Grid>
  )
}

const filteredByStatus = (tasks, status) =>
  tasks.filter(task => task.status === status)

const filteredByCurrentProject = (tasks, project) =>
  project ?
    tasks.filter(task => task.project === project.id) :
    []

const mapStateToProps = (state) => {
  const tasksByStatus = {}
  const tasks = filteredByCurrentProject(state.tasks, state.projects.selected)
  state.statuses.forEach(status => tasksByStatus[status] = filteredByStatus(tasks, status).sort((a, b) => b.priority - a.priority || b.id - a.id))
  return {
    ...tasksByStatus,
    statuses: state.statuses,
    selectedProject: state.projects.selected
  }
}

export default connect(
  mapStateToProps,
  null
)(TaskBoard)