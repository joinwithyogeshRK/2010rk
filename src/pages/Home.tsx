import { useState, useEffect } from 'react';
import { Header } from '@/components/Header';
import { TaskInput } from '@/components/TaskInput';
import { FilterTabs } from '@/components/FilterTabs';
import { TaskCard } from '@/components/TaskCard';
import { BottomNav } from '@/components/BottomNav';
import { EmptyState } from '@/components/EmptyState';
import { ProgressStats } from '@/components/ProgressStats';
import { Task } from '@/types';
import { v4 as uuidv4 } from 'uuid';
import Screenshot_2025_06_19_072908 from '@/assets/images/screenshot-2025-06-19-072908-1755090077135.png';

const initialTasks: Task[] = [
  {
    id: '1',
    title: 'Complete project proposal',
    completed: false,
    priority: 'high',
    dueDate: '2023-06-15',
    category: 'work'
  },
  {
    id: '2',
    title: 'Buy groceries',
    completed: true,
    priority: 'medium',
    dueDate: '2023-06-10',
    category: 'personal'
  },
  {
    id: '3',
    title: 'Schedule dentist appointment',
    completed: false,
    priority: 'low',
    dueDate: '2023-06-20',
    category: 'health'
  },
];

export default function Home() {
  const [tasks, setTasks] = useState<Task[]>(initialTasks);
  const [filteredTasks, setFilteredTasks] = useState<Task[]>(tasks);
  const [activeFilter, setActiveFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    filterTasks(activeFilter, searchQuery);
  }, [tasks, activeFilter, searchQuery]);

  const filterTasks = (filter: string, query: string) => {
    let filtered = [...tasks];
    
    // Apply search filter
    if (query) {
      filtered = filtered.filter(task => 
        task.title.toLowerCase().includes(query.toLowerCase())
      );
    }
    
    // Apply tab filter
    switch (filter) {
      case 'today':
        const today = new Date().toISOString().split('T')[0];
        filtered = filtered.filter(task => task.dueDate === today);
        break;
      case 'upcoming':
        const tomorrow = new Date();
        tomorrow.setDate(tomorrow.getDate() + 1);
        const tomorrowStr = tomorrow.toISOString().split('T')[0];
        filtered = filtered.filter(task => 
          task.dueDate >= tomorrowStr && !task.completed
        );
        break;
      case 'completed':
        filtered = filtered.filter(task => task.completed);
        break;
      default: // 'all'
        // No additional filtering
        break;
    }
    
    setFilteredTasks(filtered);
  };

  const handleAddTask = (taskData: { title: string; priority: string; dueDate: string }) => {
    const newTask: Task = {
      id: uuidv4(),
      title: taskData.title,
      completed: false,
      priority: taskData.priority,
      dueDate: taskData.dueDate,
      category: 'personal' // Default category
    };
    
    setTasks([newTask, ...tasks]);
  };

  const handleCompleteTask = (id: string) => {
    setTasks(tasks.map(task => 
      task.id === id ? { ...task, completed: !task.completed } : task
    ));
  };

  const handleDeleteTask = (id: string) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  const completedCount = tasks.filter(task => task.completed).length;

  return (
    <div className="min-h-screen pb-16">
      <Header onSearch={handleSearch} />
      
      <main className="container mx-auto px-4 py-6">
        <TaskInput onAddTask={handleAddTask} />
        
        <div className="mb-6">
          <ProgressStats completed={completedCount} total={tasks.length} />
        </div>
        
        <FilterTabs activeFilter={activeFilter} onFilterChange={setActiveFilter} />
        
        <div className="space-y-3">
          {filteredTasks.length > 0 ? (
            filteredTasks.map(task => (
              <TaskCard 
                key={task.id} 
                task={task} 
                onComplete={handleCompleteTask}
                onDelete={handleDeleteTask}
              />
            ))
          ) : (
            <EmptyState 
              title={`No ${activeFilter === 'all' ? '' : activeFilter} tasks found`}
              description={searchQuery ? "Try a different search term." : "Get started by creating a new task."}
              actionLabel="Add Task"
              onAction={() => document.querySelector('input[type="text"]')?.focus()}
            />
          )}
        </div>

        <div className="mt-8 mb-16">
          <img 
            src={Screenshot_2025_06_19_072908} 
            alt="Screenshot" 
            className="w-full rounded-lg shadow-md" 
          />
        </div>
      </main>
      
      <BottomNav />
    </div>
  );
}
