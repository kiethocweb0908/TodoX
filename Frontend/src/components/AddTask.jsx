import React, { useState, useRef } from 'react'
import { Card } from './ui/card'
import { Input } from './ui/input'
import { Button } from './ui/button'
import { Plus } from 'lucide-react'
// import { aw } from 'react-router/dist/development/routeModules-D5iJ6JYT'
import { toast } from 'sonner'
import api from '@/lib/axios'


const AddTask = ({ handleNewTaskAdded = () => {} }) => {
  const [newTaskTitle, setNewTaskTitle] = useState('')
  const inputRef = useRef()

  //thêm nhiệm vụ
  const addTask = async () => {
    if(newTaskTitle.trim()) {
      try {
        await api.post("/tasks", {title: newTaskTitle})
        toast.success(`nhiệm vụ ${newTaskTitle} đã được thêm vào`)
        handleNewTaskAdded()
      } catch (error) {
        console.error("Lỗi xảy ra khi thêm nhiệm vụ mới: ", error)
        toast.error('lỗi xảy ra khi thêm nhiệm vụ')
      }
      setNewTaskTitle('')
      inputRef.current.focus();
    }
    else {
      toast.warning('Bạn cần nhập nội dung của nhiệm vụ');
    }
  }

  //hàm handle keypress
  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      addTask();
    }
  }

  return (
    <div id='add-task'>
      <Card className="p-6 border-0 bg-gradient-card shadow-custom-lg">
        <div className='flex flex-col gap-3 sm:flex-row' >
          <Input 
            type="text"
            placeholder="Cần phải làm gì"
            className="h-12 text-base bg-slate-50 sm:flex-1 border-border/50 focus:ring-primary/20"
            value={newTaskTitle}
            onChange={e => setNewTaskTitle(e.target.value) }
            ref={inputRef}
            onKeyPress={handleKeyPress}
          />
          <Button variant="gradient" size="xl" className="p-6 select-none"
            onClick={addTask}
            disabled={!newTaskTitle.trim()}
          >
            <Plus className='size-5 '/>
            Thêm
          </Button>
        </div>
      </Card>
    </div>
  )
}

export default AddTask
