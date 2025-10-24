import React from 'react'
import TaskCard from './TaskCard'
import TaskEmptyState from './TaskEmptyState'

const TaskList = ({ filteredTasks, filter }) => {
  // let filter = 'all'
  // const filterTasks = [
  //   {
  //     _id: 1,
  //     title: 'Học react',
  //     status: 'active',
  //     completedAt: null,
  //     createdAt: new Date(),
  //   },
  //   {
  //     _id: 2,
  //     title: 'Học Nodejs',
  //     status: 'complete',
  //     completedAt: new Date(),
  //     createdAt: new Date(),
  //   },
  //   {
  //     _id: 3,
  //     title: 'Học Nextjs',
  //     status: 'complete',
  //     completedAt: new Date(),
  //     createdAt: new Date(),
  //   }
  // ]

  if(!filteredTasks || filteredTasks.length === 0) {
    return <TaskEmptyState filter={filter} />
  }
  return (
    <div id="task-list" className='space-y-3'>
      {filteredTasks.map((task, index) => (
        <TaskCard
          key={task._id ?? index}
          task={task}
          index={index}
        />
      ))}
    </div>
  )
}

export default TaskList
