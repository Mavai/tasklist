import React from 'react';
import { PieChart, Pie, Tooltip, Cell, Legend } from 'recharts';
import { connect } from 'react-redux';

const ProjectInfo = (props) => {

  const { selectedProject, tasksByStatus, tasks } = props;
  if (!selectedProject) return (
    <div style={{ width: 200, height: 100, position: 'absolute', top: 0, bottom: 0, left: 0, right: 0, margin: 'auto' }}>
      <h1>Select project</h1>
    </div>
  );
  const data = tasksByStatus.map(obj => ({
    name: obj.status.name,
    value: obj.tasks.length,
    color: obj.status.color
  }));
  return (
    <div>
      <div style={{ display: 'inline-block' }}>
        <h2>Name: {selectedProject.name}</h2>
        <h3>Total tasks: {tasks.length}</h3>
        {tasksByStatus.map(obj => (
          <h3 key={obj.status.name}>{obj.status.name}: {obj.tasks.length}</h3>
        ))}
      </div>
      <PieChart width={250} height={250} style={{ float: 'right' }}>
        <Legend />
        <Tooltip />
        <Pie data={data} dataKey="value" nameKey="name" outerRadius={100}>
          {data.map((entry) => (
            <Cell key={entry.name} fill={entry.color}/>
          ))}
        </Pie>
      </PieChart>
    </div>
  );
};

const filteredByStatus = (tasks, status) =>
  tasks.filter(task => task.status === status.id);

const filteredByCurrentProject = (tasks, project) =>
  project ?
    tasks.filter(task => task.project === project.id) :
    [];

const mapStateToProps = (state) => {
  const tasks = filteredByCurrentProject(state.tasks, state.projects.selected);
  const tasksByStatus = state.statuses.map(status => ({
    status,
    tasks: filteredByStatus(tasks, status)
  }));
  return {
    tasksByStatus,
    statuses: state.statuses,
    selectedProject: state.projects.selected,
    tasks
  };
};

export default connect(
  mapStateToProps,
  null
)(ProjectInfo);