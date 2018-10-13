import React from 'react';
import { PieChart, Pie, Tooltip, Cell, Legend } from 'recharts';
import { connect } from 'react-redux';
import Placeholder from './Placeholder';

class ProjectInfo extends React.PureComponent {

  render() {

    const { selectedProject, tasksByStatus, tasks } = this.props;
    if (!selectedProject) return (
      <Placeholder />
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
  }
}

const filteredByStatus = (tasks, status) =>
  tasks.filter(task => task.status.id === status.id);

const mapStateToProps = state => {
  const { tasks, projects, statuses } = state;
  const tasksByStatus = statuses.map(status => ({
    status,
    tasks: filteredByStatus(tasks, status)
  }));
  return {
    tasksByStatus,
    statuses: statuses,
    selectedProject: projects.all
      .find(project => project.id === projects.selected),
    tasks
  };
};

export default connect(
  mapStateToProps,
  null
)(ProjectInfo);