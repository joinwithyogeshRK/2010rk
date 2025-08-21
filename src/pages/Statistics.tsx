import { useState } from 'react';
import { BarChart2, Calendar, ArrowLeft, ArrowRight } from 'lucide-react';
import { Header } from '@/components/Header';
import { BottomNav } from '@/components/BottomNav';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ProgressStats } from '@/components/ProgressStats';
import { initialTasks } from '@/data/tasks';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

export default function Statistics() {
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth());
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());
  
  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const handlePreviousMonth = () => {
    if (currentMonth === 0) {
      setCurrentMonth(11);
      setCurrentYear(currentYear - 1);
    } else {
      setCurrentMonth(currentMonth - 1);
    }
  };

  const handleNextMonth = () => {
    if (currentMonth === 11) {
      setCurrentMonth(0);
      setCurrentYear(currentYear + 1);
    } else {
      setCurrentMonth(currentMonth + 1);
    }
  };

  // Calculate statistics
  const totalTasks = initialTasks.length;
  const completedTasks = initialTasks.filter(task => task.completed).length;
  const pendingTasks = totalTasks - completedTasks;
  const completionRate = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;

  // Tasks by priority
  const highPriorityTasks = initialTasks.filter(task => task.priority === 'high').length;
  const mediumPriorityTasks = initialTasks.filter(task => task.priority === 'medium').length;
  const lowPriorityTasks = initialTasks.filter(task => task.priority === 'low').length;

  // Tasks by category
  const categoryCounts: Record<string, number> = {};
  initialTasks.forEach(task => {
    const category = task.category || 'uncategorized';
    categoryCounts[category] = (categoryCounts[category] || 0) + 1;
  });

  const categoryData = Object.entries(categoryCounts).map(([name, count]) => ({
    name: name.charAt(0).toUpperCase() + name.slice(1),
    count
  }));

  // Weekly data
  const weeklyData = [
    { name: 'Mon', completed: 2, pending: 1 },
    { name: 'Tue', completed: 3, pending: 2 },
    { name: 'Wed', completed: 1, pending: 4 },
    { name: 'Thu', completed: 4, pending: 1 },
    { name: 'Fri', completed: 2, pending: 2 },
    { name: 'Sat', completed: 0, pending: 3 },
    { name: 'Sun', completed: 1, pending: 1 },
  ];

  return (
    <div className="min-h-screen pb-16">
      <Header title="Statistics" />
      
      <main className="container mx-auto px-4 py-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold">Task Statistics</h2>
          <div className="flex items-center space-x-2">
            <Button variant="outline" size="icon" onClick={handlePreviousMonth}>
              <ArrowLeft className="h-4 w-4" />
            </Button>
            <span className="text-sm font-medium">
              {monthNames[currentMonth]} {currentYear}
            </span>
            <Button variant="outline" size="icon" onClick={handleNextMonth}>
              <ArrowRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
        
        <div className="grid grid-cols-2 gap-4 mb-6">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Completed</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{completedTasks}</div>
              <p className="text-xs text-muted-foreground">{completionRate}% of total</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Pending</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{pendingTasks}</div>
              <p className="text-xs text-muted-foreground">{totalTasks - completedTasks} tasks remaining</p>
            </CardContent>
          </Card>
        </div>
        
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="text-base">Completion Rate</CardTitle>
          </CardHeader>
          <CardContent>
            <ProgressStats completed={completedTasks} total={totalTasks} />
          </CardContent>
        </Card>
        
        <Tabs defaultValue="weekly" className="mb-6">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="weekly">
              <Calendar className="h-4 w-4 mr-2" />
              Weekly
            </TabsTrigger>
            <TabsTrigger value="categories">
              <BarChart2 className="h-4 w-4 mr-2" />
              Categories
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="weekly" className="mt-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Weekly Task Completion</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-[300px] w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={weeklyData} margin={{ top: 20, right: 30, left: 0, bottom: 5 }}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip />
                      <Bar dataKey="completed" stackId="a" fill="#47B881" name="Completed" />
                      <Bar dataKey="pending" stackId="a" fill="#F5B041" name="Pending" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="categories" className="mt-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Tasks by Category</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-[300px] w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={categoryData} layout="vertical" margin={{ top: 20, right: 30, left: 40, bottom: 5 }}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis type="number" />
                      <YAxis dataKey="name" type="category" />
                      <Tooltip />
                      <Bar dataKey="count" fill="#4A6FA5" name="Tasks" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
        
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Tasks by Priority</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between items-center mb-1">
                  <div className="flex items-center">
                    <div className="w-3 h-3 rounded-full bg-error mr-2" />
                    <span className="text-sm">High Priority</span>
                  </div>
                  <span className="text-sm font-medium">{highPriorityTasks}</span>
                </div>
                <div className="h-2 w-full bg-muted rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-error" 
                    style={{ width: `${totalTasks > 0 ? (highPriorityTasks / totalTasks) * 100 : 0}%` }} 
                  />
                </div>
              </div>
              
              <div>
                <div className="flex justify-between items-center mb-1">
                  <div className="flex items-center">
                    <div className="w-3 h-3 rounded-full bg-warning mr-2" />
                    <span className="text-sm">Medium Priority</span>
                  </div>
                  <span className="text-sm font-medium">{mediumPriorityTasks}</span>
                </div>
                <div className="h-2 w-full bg-muted rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-warning" 
                    style={{ width: `${totalTasks > 0 ? (mediumPriorityTasks / totalTasks) * 100 : 0}%` }} 
                  />
                </div>
              </div>
              
              <div>
                <div className="flex justify-between items-center mb-1">
                  <div className="flex items-center">
                    <div className="w-3 h-3 rounded-full bg-info mr-2" />
                    <span className="text-sm">Low Priority</span>
                  </div>
                  <span className="text-sm font-medium">{lowPriorityTasks}</span>
                </div>
                <div className="h-2 w-full bg-muted rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-info" 
                    style={{ width: `${totalTasks > 0 ? (lowPriorityTasks / totalTasks) * 100 : 0}%` }} 
                  />
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </main>
      
      <BottomNav />
    </div>
  );
}
