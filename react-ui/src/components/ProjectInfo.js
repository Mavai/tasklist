import React from 'react'
import { PieChart, Pie, Tooltip, Cell, Legend } from 'recharts'
import { connect } from 'react-redux'

const ProjectInfo = (props) => {
  if (!props.selectedProject) return (
    <div style={{ width: 200, height: 100, position: 'absolute', top: 0, bottom: 0, left: 0, right: 0, margin: 'auto' }}>
      <h1>Select project</h1>
    </div>
  )
  const data = props.statuses.map(status => ({
    name: status,
    value: props[status].length
  }))
  const colors = ['red', 'cyan', 'lightGreen']
  return (
    <div>
      <div style={{ display: 'inline-block' }}>
        <h2>Name: {props.selectedProject.name}</h2>
        <h3>Total tasks: {props.tasks.length}</h3>
        {props.statuses.map(status => (
          <h3 key={status}>{status}: {props[status].length}</h3>
        ))}
      </div>
      <PieChart width={250} height={250} style={{ float: 'right' }}>
        <Legend />
        <Tooltip />
        <Pie data={data} dataKey="value" nameKey="name" outerRadius={100}>
          {data.map((entry, index) => (
            <Cell key={entry.name} fill={colors[index]}/>
          ))}
        </Pie>
      </PieChart>
    </div>
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
  state.statuses.forEach(status => tasksByStatus[status] = filteredByStatus(tasks, status))
  return {
    ...tasksByStatus,
    statuses: state.statuses,
    selectedProject: state.projects.selected,
    tasks
  }
}

export default connect(
  mapStateToProps,
  null
)(ProjectInfo)