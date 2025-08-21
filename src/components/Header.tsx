import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Menu, Bell, Search, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { useTheme } from '@/components/theme-provider';
import favicon from '@/assets/icons/favicon-1755069960253.ico';
import Screenshot_2025_07_02_123027 from '@/assets/images/screenshot-2025-07-02-123027-1755094744864.png';

interface HeaderProps {
  title?: string;
  onSearch?: (query: string) => void;
}

export function Header({ title = 'Todo App', onSearch }: HeaderProps) {
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();
  const { theme } = useTheme();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (onSearch && searchQuery.trim()) {
      onSearch(searchQuery.trim());
    }
    setSearchOpen(false);
  };

  return (
    <header className="app-header sticky top-0 z-10" style={{ backgroundImage: `url(${Screenshot_2025_07_02_123027})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex items-center">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="text-primary-foreground">
                <Menu className="h-6 w-6" />
              </Button>
            </SheetTrigger>
            <SheetContent side="left">
              <nav className="flex flex-col space-y-4 mt-8">
                <Button 
                  variant="ghost" 
                  className="justify-start" 
                  onClick={() => navigate('/')}
                >
                  Home
                </Button>
                <Button 
                  variant="ghost" 
                  className="justify-start" 
                  onClick={() => navigate('/categories')}
                >
                  Categories
                </Button>
                <Button 
                  variant="ghost" 
                  className="justify-start" 
                  onClick={() => navigate('/statistics')}
                >
                  Statistics
                </Button>
                <Button 
                  variant="ghost" 
                  className="justify-start" 
                  onClick={() => navigate('/settings')}
                >
                  Settings
                </Button>
                <Button 
                  variant="ghost" 
                  className="justify-start" 
                  onClick={() => navigate('/blog')}
                >
                  Blog
                </Button>
                <Button 
                  variant="ghost" 
                  className="justify-start" 
                  onClick={() => navigate('/which')}
                >
                  Which
                </Button>
              </nav>
            </SheetContent>
          </Sheet>
          <img src={favicon} alt="icon" className="h-6 w-6 ml-2" />
          <h1 className="text-xl font-bold ml-2">{title}</h1>
        </div>
        
        <div className="flex items-center space-x-2">
          {searchOpen ? (
            <form onSubmit={handleSearch} className="flex items-center">
              <Input
                type="text"
                placeholder="Search tasks..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="h-9 w-[200px] bg-primary-700 text-primary-foreground placeholder:text-primary-foreground/70 border-primary-600"
                autoFocus
              />
              <Button 
                variant="ghost" 
                size="icon" 
                className="text-primary-foreground ml-1"
                onClick={() => setSearchOpen(false)}
              >
                <X className="h-5 w-5" />
              </Button>
            </form>
          ) : (
            <Button 
              variant="ghost" 
              size="icon" 
              className="text-primary-foreground"
              onClick={() => setSearchOpen(true)}
            >
              <Search className="h-5 w-5" />
            </Button>
          )}
          
          <Button variant="ghost" size="icon" className="text-primary-foreground">
            <Bell className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </header>
  );
}