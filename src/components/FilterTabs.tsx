import { Button } from '@/components/ui/button';

interface FilterTabsProps {
  activeFilter: string;
  onFilterChange: (filter: string) => void;
}

export function FilterTabs({ activeFilter, onFilterChange }: FilterTabsProps) {
  return (
    <div className="flex space-x-2 mb-4 overflow-x-auto pb-2">
      <Button
        variant={activeFilter === 'all' ? 'default' : 'outline'}
        className={activeFilter === 'all' ? 'filter-tab-active' : 'filter-tab-inactive'}
        onClick={() => onFilterChange('all')}
      >
        All
      </Button>
      <Button
        variant={activeFilter === 'today' ? 'default' : 'outline'}
        className={activeFilter === 'today' ? 'filter-tab-active' : 'filter-tab-inactive'}
        onClick={() => onFilterChange('today')}
      >
        Today
      </Button>
      <Button
        variant={activeFilter === 'upcoming' ? 'default' : 'outline'}
        className={activeFilter === 'upcoming' ? 'filter-tab-active' : 'filter-tab-inactive'}
        onClick={() => onFilterChange('upcoming')}
      >
        Upcoming
      </Button>
      <Button
        variant={activeFilter === 'completed' ? 'default' : 'outline'}
        className={activeFilter === 'completed' ? 'filter-tab-active' : 'filter-tab-inactive'}
        onClick={() => onFilterChange('completed')}
      >
        Completed
      </Button>
    </div>
  );
}
