import { useState } from 'react';
import { Bell, Moon, Sun, Globe, ChevronRight } from 'lucide-react';
import { Header } from '@/components/Header';
import { BottomNav } from '@/components/BottomNav';
import { Switch } from '@/components/ui/switch';
import { useTheme } from '@/components/theme-provider';

export default function Settings() {
  const { theme, setTheme } = useTheme();
  const [notifications, setNotifications] = useState(true);
  const [emailNotifications, setEmailNotifications] = useState(false);
  const [soundEffects, setSoundEffects] = useState(true);
  
  return (
    <div className="min-h-screen pb-16">
      <Header title="Settings" />
      
      <main className="container mx-auto px-4 py-6">
        <h2 className="text-xl font-bold mb-6">Settings</h2>
        
        <div className="space-y-6">
          <div className="space-y-3">
            <h3 className="text-sm font-medium text-muted-foreground">APPEARANCE</h3>
            
            <div className="bg-card rounded-lg border border-border overflow-hidden">
              <div className="flex items-center justify-between p-4">
                <div className="flex items-center">
                  {theme === 'dark' ? (
                    <Moon className="h-5 w-5 mr-3 text-primary" />
                  ) : (
                    <Sun className="h-5 w-5 mr-3 text-primary" />
                  )}
                  <div>
                    <p className="font-medium">Theme</p>
                    <p className="text-sm text-muted-foreground">
                      {theme === 'dark' ? 'Dark mode' : 'Light mode'}
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <button 
                    className={`px-3 py-1 rounded-md text-xs font-medium ${theme === 'light' ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground'}`}
                    onClick={() => setTheme('light')}
                  >
                    Light
                  </button>
                  <button 
                    className={`px-3 py-1 rounded-md text-xs font-medium ${theme === 'dark' ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground'}`}
                    onClick={() => setTheme('dark')}
                  >
                    Dark
                  </button>
                </div>
              </div>
              
              <div className="border-t border-border p-4 flex items-center justify-between">
                <div className="flex items-center">
                  <Globe className="h-5 w-5 mr-3 text-primary" />
                  <div>
                    <p className="font-medium">Language</p>
                    <p className="text-sm text-muted-foreground">English (US)</p>
                  </div>
                </div>
                <ChevronRight className="h-5 w-5 text-muted-foreground" />
              </div>
            </div>
          </div>
          
          <div className="space-y-3">
            <h3 className="text-sm font-medium text-muted-foreground">NOTIFICATIONS</h3>
            
            <div className="bg-card rounded-lg border border-border overflow-hidden">
              <div className="p-4 flex items-center justify-between">
                <div className="flex items-center">
                  <Bell className="h-5 w-5 mr-3 text-primary" />
                  <div>
                    <p className="font-medium">Push Notifications</p>
                    <p className="text-sm text-muted-foreground">
                      Receive notifications for task reminders
                    </p>
                  </div>
                </div>
                <Switch 
                  checked={notifications} 
                  onCheckedChange={setNotifications} 
                  className={notifications ? 'bg-secondary' : ''}
                />
              </div>
              
              <div className="border-t border-border p-4 flex items-center justify-between">
                <div className="flex items-center">
                  <Bell className="h-5 w-5 mr-3 text-primary" />
                  <div>
                    <p className="font-medium">Email Notifications</p>
                    <p className="text-sm text-muted-foreground">
                      Receive task updates via email
                    </p>
                  </div>
                </div>
                <Switch 
                  checked={emailNotifications} 
                  onCheckedChange={setEmailNotifications} 
                  className={emailNotifications ? 'bg-secondary' : ''}
                />
              </div>
              
              <div className="border-t border-border p-4 flex items-center justify-between">
                <div className="flex items-center">
                  <Bell className="h-5 w-5 mr-3 text-primary" />
                  <div>
                    <p className="font-medium">Sound Effects</p>
                    <p className="text-sm text-muted-foreground">
                      Play sounds for task completion
                    </p>
                  </div>
                </div>
                <Switch 
                  checked={soundEffects} 
                  onCheckedChange={setSoundEffects} 
                  className={soundEffects ? 'bg-secondary' : ''}
                />
              </div>
            </div>
          </div>
          
          <div className="space-y-3">
            <h3 className="text-sm font-medium text-muted-foreground">ABOUT</h3>
            
            <div className="bg-card rounded-lg border border-border overflow-hidden">
              <div className="p-4 flex items-center justify-between">
                <div>
                  <p className="font-medium">Version</p>
                  <p className="text-sm text-muted-foreground">1.0.0</p>
                </div>
              </div>
              
              <div className="border-t border-border p-4">
                <p className="font-medium">Privacy Policy</p>
              </div>
              
              <div className="border-t border-border p-4">
                <p className="font-medium">Terms of Service</p>
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <BottomNav />
    </div>
  );
}
