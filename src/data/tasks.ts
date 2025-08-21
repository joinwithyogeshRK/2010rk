import { Task } from '@/types';

export const initialTasks: Task[] = [
  {
    id: '1',
    title: 'Complete project proposal',
    description: 'Finish the quarterly project proposal for the marketing team.',
    completed: false,
    priority: 'high',
    dueDate: '2023-06-15',
    category: 'work'
  },
  {
    id: '2',
    title: 'Buy groceries',
    description: 'Milk, eggs, bread, fruits, and vegetables.',
    completed: true,
    priority: 'medium',
    dueDate: '2023-06-10',
    category: 'personal'
  },
  {
    id: '3',
    title: 'Schedule dentist appointment',
    description: 'Call Dr. Smith for a checkup appointment.',
    completed: false,
    priority: 'low',
    dueDate: '2023-06-20',
    category: 'health'
  },
  {
    id: '4',
    title: 'Review quarterly budget',
    description: 'Go through Q2 expenses and prepare report.',
    completed: false,
    priority: 'high',
    dueDate: '2023-06-18',
    category: 'finance'
  },
  {
    id: '5',
    title: 'Gym workout',
    description: 'Cardio and strength training session.',
    completed: true,
    priority: 'medium',
    dueDate: '2023-06-12',
    category: 'health'
  },
  {
    id: '6',
    title: 'Team meeting preparation',
    description: 'Prepare slides and agenda for Monday meeting.',
    completed: false,
    priority: 'high',
    dueDate: '2023-06-14',
    category: 'work'
  },
  {
    id: '7',
    title: 'Pay utility bills',
    description: 'Electricity, water, and internet bills.',
    completed: false,
    priority: 'medium',
    dueDate: '2023-06-25',
    category: 'finance'
  },
];
