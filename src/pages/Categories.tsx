import { useState } from 'react';
import { Plus, FolderOpen, Edit, Trash } from 'lucide-react';
import { Header } from '@/components/Header';
import { BottomNav } from '@/components/BottomNav';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { ProgressStats } from '@/components/ProgressStats';
import { initialTasks } from '@/data/tasks';

interface Category {
  id: string;
  name: string;
  color: string;
}

const initialCategories: Category[] = [
  { id: '1', name: 'Personal', color: 'purple' },
  { id: '2', name: 'Work', color: 'blue' },
  { id: '3', name: 'Health', color: 'green' },
  { id: '4', name: 'Finance', color: 'yellow' },
];

export default function Categories() {
  const [categories, setCategories] = useState<Category[]>(initialCategories);
  const [newCategory, setNewCategory] = useState({ name: '', color: 'blue' });
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const getTasksInCategory = (categoryName: string) => {
    return initialTasks.filter(task => 
      task.category?.toLowerCase() === categoryName.toLowerCase()
    );
  };

  const getCompletedTasksInCategory = (categoryName: string) => {
    return getTasksInCategory(categoryName).filter(task => task.completed).length;
  };

  const handleAddCategory = () => {
    if (!newCategory.name.trim()) return;
    
    const category = {
      id: Date.now().toString(),
      name: newCategory.name,
      color: newCategory.color,
    };
    
    setCategories([...categories, category]);
    setNewCategory({ name: '', color: 'blue' });
    setIsDialogOpen(false);
  };

  const handleUpdateCategory = () => {
    if (!editingCategory || !editingCategory.name.trim()) return;
    
    setCategories(categories.map(cat => 
      cat.id === editingCategory.id ? editingCategory : cat
    ));
    
    setEditingCategory(null);
    setIsDialogOpen(false);
  };

  const handleDeleteCategory = (id: string) => {
    setCategories(categories.filter(cat => cat.id !== id));
  };

  const colorOptions = [
    { value: 'blue', label: 'Blue' },
    { value: 'green', label: 'Green' },
    { value: 'yellow', label: 'Yellow' },
    { value: 'red', label: 'Red' },
    { value: 'purple', label: 'Purple' },
  ];

  return (
    <div className="min-h-screen pb-16">
      <Header title="Categories" />
      
      <main className="container mx-auto px-4 py-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold">Categories</h2>
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button className="bg-primary hover:bg-primary-600">
                <Plus className="h-4 w-4 mr-2" />
                Add Category
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>
                  {editingCategory ? 'Edit Category' : 'Add New Category'}
                </DialogTitle>
              </DialogHeader>
              <div className="space-y-4 mt-4">
                <div>
                  <label className="text-sm font-medium mb-1 block">Name</label>
                  <Input
                    value={editingCategory ? editingCategory.name : newCategory.name}
                    onChange={(e) => {
                      if (editingCategory) {
                        setEditingCategory({ ...editingCategory, name: e.target.value });
                      } else {
                        setNewCategory({ ...newCategory, name: e.target.value });
                      }
                    }}
                    placeholder="Category name"
                  />
                </div>
                
                <div>
                  <label className="text-sm font-medium mb-1 block">Color</label>
                  <div className="flex space-x-2">
                    {colorOptions.map(color => (
                      <button
                        key={color.value}
                        type="button"
                        className={`w-8 h-8 rounded-full ${getColorClass(color.value)} ${isColorSelected(color.value) ? 'ring-2 ring-offset-2 ring-primary' : ''}`}
                        onClick={() => {
                          if (editingCategory) {
                            setEditingCategory({ ...editingCategory, color: color.value });
                          } else {
                            setNewCategory({ ...newCategory, color: color.value });
                          }
                        }}
                        aria-label={`Select ${color.label} color`}
                      />
                    ))}
                  </div>
                </div>
                
                <div className="flex justify-end space-x-2 pt-4">
                  <Button 
                    variant="outline" 
                    onClick={() => {
                      setIsDialogOpen(false);
                      setEditingCategory(null);
                      setNewCategory({ name: '', color: 'blue' });
                    }}
                  >
                    Cancel
                  </Button>
                  <Button 
                    className="bg-primary hover:bg-primary-600"
                    onClick={editingCategory ? handleUpdateCategory : handleAddCategory}
                  >
                    {editingCategory ? 'Update' : 'Add'}
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>
        
        <div className="space-y-4">
          {categories.length > 0 ? (
            categories.map(category => {
              const tasksInCategory = getTasksInCategory(category.name);
              const completedTasks = getCompletedTasksInCategory(category.name);
              
              return (
                <div key={category.id} className="bg-card rounded-lg shadow-sm border border-border p-4">
                  <div className="flex justify-between items-center mb-3">
                    <div className="flex items-center">
                      <div className={`w-4 h-4 rounded-full ${getColorClass(category.color)} mr-3`} />
                      <h3 className="font-medium">{category.name}</h3>
                    </div>
                    <div className="flex space-x-2">
                      <Button 
                        variant="ghost" 
                        size="icon"
                        onClick={() => {
                          setEditingCategory(category);
                          setIsDialogOpen(true);
                        }}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="icon"
                        className="text-muted-foreground hover:text-error"
                        onClick={() => handleDeleteCategory(category.id)}
                      >
                        <Trash className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                  
                  <div className="flex justify-between items-center text-sm text-muted-foreground mb-3">
                    <span>{tasksInCategory.length} tasks</span>
                    <span>{completedTasks} completed</span>
                  </div>
                  
                  <ProgressStats 
                    completed={completedTasks} 
                    total={tasksInCategory.length} 
                  />
                </div>
              );
            })
          ) : (
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <div className="bg-muted rounded-full p-4 mb-4">
                <FolderOpen className="h-8 w-8 text-muted-foreground" />
              </div>
              <h3 className="text-lg font-medium mb-2">No categories yet</h3>
              <p className="text-muted-foreground mb-6 max-w-sm">
                Create categories to organize your tasks better.
              </p>
              <Button 
                onClick={() => setIsDialogOpen(true)}
                className="bg-primary hover:bg-primary-600"
              >
                Add Category
              </Button>
            </div>
          )}
        </div>
      </main>
      
      <BottomNav />
    </div>
  );

  function getColorClass(color: string) {
    switch (color) {
      case 'red':
        return 'bg-error';
      case 'green':
        return 'bg-success';
      case 'blue':
        return 'bg-primary';
      case 'yellow':
        return 'bg-warning';
      case 'purple':
        return 'bg-accent';
      default:
        return 'bg-secondary';
    }
  }

  function isColorSelected(color: string) {
    if (editingCategory) {
      return editingCategory.color === color;
    }
    return newCategory.color === color;
  }
}
