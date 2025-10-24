import React from 'react'

const Footer = ({ 
  completeTasksCount = 0, 
  activeTasksCount = 0 
}) => {
  return (
    <>
    {completeTasksCount + activeTasksCount > 0 && (
      <div className='text-center'>
        <p className='text-sm text-muted-foreground'>
          {
            completeTasksCount > 0 && (
              <>
                Tuyệt vời bạn đã hoàn thành {completeTasksCount} công việc
                {
                  activeTasksCount > 0 && `, còn ${activeTasksCount} công việc nữa thôi!`
                }
              </>
            )
          }
          {
            completeTasksCount === 0 && activeTasksCount > 0 && (
              <>
                Bạn có {activeTasksCount} công việc cần làm!
              </>
            )
          }
        </p>
      </div>
    )}
    </>
  )
}

export default Footer
