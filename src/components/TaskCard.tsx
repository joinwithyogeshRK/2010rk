import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Check, Clock, Edit, Trash } from 'lucide-react';
import { Task } from '@/types';

interface TaskCardProps {
  task: Task;
  onComplete: (id: string) => void;
  onDelete: (id: string) => void;
}

export function TaskCard({ task, onComplete, onDelete }: TaskCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const navigate = useNavigate();

  const getPriorityClass = () => {
    switch (task.priority) {
      case 'high':
        return 'priority-high';
      case 'medium':
        return 'priority-medium';
      case 'low':
        return 'priority-info';
      default:
        return 'priority-low';
    }
  };

  const handleClick = () => {
    navigate(`/task/${task.id}`);
  };

  return (
    <div 
      className="task-card group hover:shadow-lg transition-shadow"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="flex justify-between items-start">
        <h3 
          className={`font-medium ${task.completed ? 'line-through text-muted-foreground' : ''}`}
          onClick={handleClick}
        >
          {task.title}
        </h3>
        <div className="flex space-x-2">
          {isHovered && (
            <>
              <button 
                onClick={() => navigate(`/task/${task.id}`)}
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                <Edit className="h-4 w-4" />
              </button>
              <button 
                onClick={() => onDelete(task.id)}
                className="text-muted-foreground hover:text-error transition-colors"
              >
                <Trash className="h-4 w-4" />
              </button>
            </>
          )}
        </div>
      </div>
      
      <div className="flex justify-between items-center mt-2">
        <span className="text-sm text-muted-foreground flex items-center">
          <Clock className="h-3 w-3 mr-1" />
          Due: {task.dueDate}
        </span>
        <span className={getPriorityClass()}>{task.priority}</span>
      </div>
      
      <div className="flex items-center mt-3">
        <button 
          className={`completion-button ${task.completed ? 'completion-button-checked' : ''}`}
          onClick={() => onComplete(task.id)}
        >
          {task.completed && <Check className="h-3 w-3" />}
        </button>
        <span className="ml-2 text-sm">
          {task.completed ? 'Completed' : 'Mark complete'}
        </span>
      </div>
    </div>
  );
}
