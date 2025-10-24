import AddTask from '../components/AddTask'
import DateTimeFilter from '../components/DateTimeFilter'
import Header from '../components/Header'
import StartAndFilters from '../components/StartAndFilters'
import TaskList from '../components/TaskList'
import TaskListPagination from '../components/TaskListPagination'
import Footer from '../components/Footer'
import React, { useEffect, useState, createContext } from 'react'
import { toast } from 'sonner'
import axios from 'axios'
import api from '@/lib/axios'
import { visibleTaskLimit } from '@/lib/data'

export const TaskContext = createContext();

const HomePage = () => {
  const [taskBuffer, setTaskBuffer] = useState([]);
  const [activeTasksCount, setActiveTasksCount] = useState(0);
  const [completeTasksCount, setCompleteTasksCount] = useState(0);
  const [filter, setFilter] = useState('all')
  const [dateQuery, setDateQuery] = useState('today');

  const [page, setPage] = useState(1);

  useEffect(() => {
    fetchTasks();
  }, [dateQuery])
  
  useEffect(()=> {
    setPage(1);
  }, [filter, dateQuery])

  

  //logic
  const fetchTasks = async () => {
    try {
      // const res = await fetch("http://localhost:5001/api/tasks")
      // const data = await res.json();
      // setTaskBuffer(data);
      // console.log(data);
      // ||
      const res = await api.get(`/tasks?filter=${dateQuery}`)
      setTaskBuffer(res.data.tasks)
      setActiveTasksCount(res.data.activeCount)
      setCompleteTasksCount(res.data.completeCount)
      console.log(res.data)
    } catch (error) {
      console.error("lỗi này xảy ra khi truy xuất task: ", error);
      toast.error("Lỗi xảy ra khi truy xuất tasks.")
    }
  };

  const handleTaskChange = () => {
    fetchTasks();
  }

  //biến
  const filteredTasks = taskBuffer.filter((task) => {
    switch (filter) {
      case "active":
        return task.status === "active";
      case "completed":
        return task.status === "complete";
      default:
        return true;
    }
  })

  //phân trang
  const visibleTasks = filteredTasks.slice(
    (page -1) * visibleTaskLimit,
    page * visibleTaskLimit
  )

  // if(visibleTasks.length === 0) {
  //   handlePrev();
  // }
  

  const totalPages = Math.ceil(filteredTasks.length / visibleTaskLimit)
 
  const handlePrev = () => {
    if(page > 1) {
      setPage(prev => prev - 1)
    }
  }

  const handleNext = () => {
    if(page < totalPages) {
      setPage(prev => prev + 1)
    }
  }

  const handlePageChange = (newPage) => {
    setPage(newPage)
  }

  useEffect(() => {
  const totalPages = Math.ceil(filteredTasks.length / visibleTaskLimit);
  if (page > totalPages) {
    setPage(totalPages || 1); // fallback về 1 nếu xóa hết task
  }
}, [filteredTasks.length, totalPages, page]);

  return (
    <div className="min-h-screen w-full bg-[#fefcff] relative">
      {/* Dreamy Sky Pink Glow */}
      <div
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: `
            radial-gradient(circle at 30% 70%, rgba(173, 216, 230, 0.35), transparent 60%),
            radial-gradient(circle at 70% 30%, rgba(255, 182, 193, 0.4), transparent 60%)`,
        }}
      />
        <div className='container pt-8 mx-auto relative z-10'>
          <div className="w-full max-w-2xl p-6 mx-auto space-y-6">
            {/* Đầu trang */}
            <Header/>

            {/* Tạo nhiệm vụ */}
            <AddTask handleNewTaskAdded={handleTaskChange}/>

            {/* Thống kê và bộ lọc */}
            <StartAndFilters 
              filter={filter}
              setFilter={setFilter}
              activeTasksCount={activeTasksCount} 
              completeTaskCount={completeTasksCount}
            />

            {/* Danh sách nhiệm vụ */}
            <TaskContext.Provider value={handleTaskChange}>
              <TaskList 
                // filterTasks={filteredTasks} 
                filteredTasks={visibleTasks}
                filter={filter} 
              />
            </TaskContext.Provider>

            {/* Phân trang và lọc theo date */}
            <div className='flex flex-col items-center justify-between gap-6 sm:flex-row' > 
              <TaskListPagination
                handlePrev={handlePrev}
                handleNext={handleNext}
                handlePageChange={handlePageChange}
                page={page}
                totalPages={totalPages}
              />
              <DateTimeFilter
                dateQuery={dateQuery}
                setDateQuery={setDateQuery}
              />
            </div>

            {/* Chân trang */}
            <Footer activeTasksCount={activeTasksCount} completeTasksCount={completeTasksCount}/>

          </div>
        </div>
    </div>

    
  )
}

export default HomePage
