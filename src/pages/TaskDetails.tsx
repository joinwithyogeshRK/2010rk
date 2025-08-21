import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Calendar, Clock, Tag, Trash } from 'lucide-react';
import { Header } from '@/components/Header';
import { BottomNav } from '@/components/BottomNav';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { CategoryBadge } from '@/components/CategoryBadge';
import { Task } from '@/types';
import { initialTasks } from '@/data/tasks';

export default function TaskDetails() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [task, setTask] = useState<Task | null>(null);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [priority, setPriority] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [category, setCategory] = useState('');
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    // In a real app, fetch from API
    const foundTask = initialTasks.find(t => t.id === id);
    if (foundTask) {
      setTask(foundTask);
      setTitle(foundTask.title);
      setDescription(foundTask.description || '');
      setPriority(foundTask.priority);
      setDueDate(foundTask.dueDate);
      setCategory(foundTask.category || 'personal');
    }
  }, [id]);

  const handleSave = () => {
    if (!task) return;
    
    const updatedTask: Task = {
      ...task,
      title,
      description,
      priority,
      dueDate,
      category
    };
    
    // In a real app, save to API
    console.log('Saving task:', updatedTask);
    setTask(updatedTask);
    setIsEditing(false);
  };

  const handleDelete = () => {
    // In a real app, delete from API
    console.log('Deleting task:', id);
    navigate('/');
  };

  const handleToggleComplete = () => {
    if (!task) return;
    
    const updatedTask: Task = {
      ...task,
      completed: !task.completed
    };
    
    // In a real app, save to API
    console.log('Toggling completion:', updatedTask);
    setTask(updatedTask);
  };

  if (!task) {
    return (
      <div className="min-h-screen pb-16">
        <Header title="Task Details" />
        <main className="container mx-auto px-4 py-6">
          <div className="flex items-center mb-6">
            <Button variant="ghost" onClick={() => navigate(-1)} className="mr-2">
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <h2 className="text-xl font-bold">Task not found</h2>
          </div>
          <p className="text-muted-foreground">The task you're looking for doesn't exist or has been deleted.</p>
        </main>
        <BottomNav />
      </div>
    );
  }

  return (
    <div className="min-h-screen pb-16">
      <Header title="Task Details" />
      
      <main className="container mx-auto px-4 py-6">
        <div className="flex items-center mb-6">
          <Button variant="ghost" onClick={() => navigate(-1)} className="mr-2">
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <h2 className="text-xl font-bold">{isEditing ? 'Edit Task' : 'Task Details'}</h2>
        </div>
        
        {isEditing ? (
          <div className="space-y-4">
            <div>
              <Input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Task title"
                className="text-lg font-medium"
              />
            </div>
            
            <div>
              <Textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Add a description..."
                className="min-h-[100px]"
              />
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium mb-1 block">Priority</label>
                <Select value={priority} onValueChange={setPriority}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select priority" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="low">Low</SelectItem>
                    <SelectItem value="medium">Medium</SelectItem>
                    <SelectItem value="high">High</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <label className="text-sm font-medium mb-1 block">Category</label>
                <Select value={category} onValueChange={setCategory}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="personal">Personal</SelectItem>
                    <SelectItem value="work">Work</SelectItem>
                    <SelectItem value="health">Health</SelectItem>
                    <SelectItem value="finance">Finance</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            <div>
              <label className="text-sm font-medium mb-1 block">Due Date</label>
              <div className="flex items-center border rounded-md px-3 py-2">
                <Calendar className="h-4 w-4 text-muted-foreground mr-2" />
                <input
                  type="date"
                  value={dueDate}
                  onChange={(e) => setDueDate(e.target.value)}
                  className="flex-1 bg-transparent border-none focus:outline-none"
                />
              </div>
            </div>
            
            <div className="flex space-x-2 pt-4">
              <Button onClick={handleSave} className="flex-1 bg-primary hover:bg-primary-600">
                Save Changes
              </Button>
              <Button variant="outline" onClick={() => setIsEditing(false)} className="flex-1">
                Cancel
              </Button>
            </div>
          </div>
        ) : (
          <div>
            <div className="flex justify-between items-start mb-6">
              <h1 className={`text-xl font-bold ${task.completed ? 'line-through text-muted-foreground' : ''}`}>
                {task.title}
              </h1>
              <Button variant="outline" size="sm" onClick={() => setIsEditing(true)}>
                Edit
              </Button>
            </div>
            
            {task.description && (
              <div className="mb-6">
                <p className="text-muted-foreground">{task.description}</p>
              </div>
            )}
            
            <div className="space-y-4">
              <div className="flex items-center">
                <Clock className="h-5 w-5 text-muted-foreground mr-2" />
                <span>Due: {task.dueDate}</span>
              </div>
              
              <div className="flex items-center">
                <Tag className="h-5 w-5 text-muted-foreground mr-2" />
                <CategoryBadge 
                  name={task.category || 'Personal'} 
                  color={task.category === 'work' ? 'blue' : 
                         task.category === 'health' ? 'green' : 
                         task.category === 'finance' ? 'yellow' : 'purple'}
                />
              </div>
              
              <div className="flex items-center">
                <div className={`h-3 w-3 rounded-full mr-2 ${task.priority === 'high' ? 'bg-error' : 
                                                               task.priority === 'medium' ? 'bg-warning' : 
                                                               'bg-info'}`} />
                <span className="capitalize">{task.priority} Priority</span>
              </div>
            </div>
            
            <div className="flex space-x-2 mt-8">
              <Button 
                onClick={handleToggleComplete} 
                className={`flex-1 ${task.completed ? 
                  'bg-muted hover:bg-muted/80' : 
                  'bg-secondary hover:bg-secondary/80'}`}
              >
                {task.completed ? 'Mark Incomplete' : 'Mark Complete'}
              </Button>
              <Button 
                variant="outline" 
                className="flex-1 text-error hover:text-error hover:bg-error/10 border-error/30"
                onClick={handleDelete}
              >
                <Trash className="h-4 w-4 mr-2" />
                Delete
              </Button>
            </div>
          </div>
        )}
      </main>
      
      <BottomNav />
    </div>
  );
}
