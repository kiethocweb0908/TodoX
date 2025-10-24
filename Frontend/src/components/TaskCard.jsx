import React, { useState, useContext } from 'react'
import TaskEmptyState from './TaskEmptyState'
import { Card } from './ui/card'
import { cn } from '@/lib/utils'
import { Button } from './ui/button'
import { Calendar, CheckCircle2, Circle, SquarePen, Trash2 } from 'lucide-react'
import { Input } from './ui/input'
import { toast } from 'sonner'
import api from '@/lib/axios'
import { TaskContext } from '@/pages/HomePage'


import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";


const TaskCard = ({ task, index }) => {
  const [isEditting, setIsEditting] = useState(false);
  const [updateTitle, setUpdateTitle] = useState(task.title || "") 
  const handleTaskChange  = useContext(TaskContext);

  const [open, setOpen] = useState(false);


  //xoá nhiệm vụ
  const deleteTask = async (taskId) => {
    try {
      await api.delete(`/tasks/${taskId}`);
      toast.success('Nhiệm vụ đã được xoá')
      handleTaskChange();
      // removeTaskDOM(taskId);
    } catch (error) {
      console.error('lỗi xảy ra khi xoá: ', error)
      toast.error('lỗi xảy ra khi xoá')
    }
  }
  // const removeTaskDOM = (id) => {
  //   const element = document.getElementById("task-card-"+id);
  //   if(element) element.remove();
  // }
  
  const updateTask = async (taskId) => {
    try {
      setIsEditting(false)
      await api.put(`/tasks/${taskId}`, {title: updateTitle})
      toast.success('nhiệm vụ đã được thay đổi')
      handleTaskChange()
    } catch (error) {
      console.error('lỗi xảy ra khi update: ', error)
      toast.error('lỗi xảy ra khi update')
    }
  }

  //hoàn thành
  const toggleTaskCompleteButton = async () => {
    try {
      if(task.status === "active") {
        await api.put(`/tasks/${task._id}`, {
          status: 'complete',
          completeAt: new Date().toISOString()
        })
        toast.success(`"${task.title}" đã được hoàn thành`)
      } else {
        await api.put(`/tasks/${task._id}`, {
          status: 'active',
          completeAt: null
        })
        toast.success(`"${task.title}" vẫn tiếp tục`)
      }
      handleTaskChange()
    } catch (error) {
       console.error('lỗi xảy ra khi hoàn thành: ', error)
      toast.error('lỗi xảy ra khi complete')
    }
  }

    const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      updateTask(task._id)
    }
  }

  return (
    <Card id={"task-card-"+task._id}
      className={cn(
        "p-4 bg-gradient-card border-0 shadow-custom-md" + 
        "hover:shadow-custom-lg transition-all duration-200 animate-fade-in group",
        task.status === "complete" && "opacity-75"
      )}
      style={{animationDelay: `${index * 100}ms`}}
    >
      <div className='flex items-center gap-4'>
        {/* nút tròn */}
        <Button
          variant="ghost"
          size="icon"
          className={cn(
            "shrink-0 size-8 rounded-full transition-all duration-200",
            task.status === "complete" 
            ? "text-success hover:text-success/80"
            : "text-muted-foreground hover:text-primary"
          )}
          onClick={toggleTaskCompleteButton}
        >
          {task.status === "complete" ? (
            <CheckCircle2 className='size-5'/>
          ) : (
            <Circle className='size-5'/>
          ) }

        </Button>

        {/* Hiển thị hoặc chỉnh sửa tiêu đề */}
        <div className='flex-1 min-w-0'>
          {isEditting ? (
            <Input
              placehoder="Cần phải làm gì"
              className="flex-1 h-12 text-base border-border.50 focus:border-border/50 focus:ring-primary/20"
              type="text"
              value={updateTitle}
              onChange={(e) => setUpdateTitle(e.target.value)}
              onBlur={() => {
                setIsEditting(false)
                setUpdateTitle(task.title || "")
              }}
              onKeyDown = {handleKeyPress}
            />
          ) : (
            <p className={cn(
              "text-base transition-all duration-200",
              task.status === "complete"
              ? "line-through text-muted-foreground"
              : "text-foreground"
              )}
            >
              {task.title}
            </p>
          )}
          
          {/* Ngày tạo và ngày hoàn thành */}
          <div className='flex items-center gap-2 mt-1'>
            <Calendar className='size-3 text-muted-foreground' />
            <span className='text-xs text-muted-foreground'>
              {new Date(task.createdAt).toLocaleString()}
            </span>
            {task.completeAt && (
              <>
                <span className='text-xs text-muted-foreground'> - </span>
                <Calendar className='size-3 text-muted-foreground' />
                <span className='text-xs text-muted-foreground'>
                  {new Date(task.completeAt).toLocaleString()}
                </span>
              </>
            )}
          </div>
        </div>

        

        {/* nút chỉnh và xoá */}
        <div className='hidden gap-2 group-hover:inline-flex animate-slide-up'>
          {/* nút edit */}
          <Button
            variant="ghost"
            size="icon"
            className="shrink-0 transition-colors size-8 text-muted-foreground hover:text-info"         
            onClick ={() => setIsEditting(true)}
          >
            <SquarePen className='size-4'/>
          </Button>

          {/* nút delete */}
          <Button
            variant="ghost"
            size="icon"
            className="shrink-0 transition-colors size-8 text-muted-foreground hover:text-destructive"         
            onClick={() => setOpen(true)}
          >
            <Trash2 className='size-4'/>
          </Button>


          <Dialog open={open} onOpenChange={setOpen}>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Xác nhận xóa</DialogTitle>
              </DialogHeader>
              <p>Bạn có chắc muốn xóa công việc này không?</p>
              <DialogFooter>
                <Button onClick={() => setOpen(false)}>Hủy</Button>
                <Button variant="destructive" onClick={() => deleteTask(task._id)}>
                  Xóa
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>

        </div>

      </div>
    </Card>
  )
}

export default TaskCard
