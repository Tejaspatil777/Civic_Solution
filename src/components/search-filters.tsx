import { useState } from 'react';
import { Search, Filter, MapPin, Calendar, X } from 'lucide-react';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from './ui/sheet';

interface SearchFiltersProps {
  language: 'en' | 'hi';
}

export function SearchFilters({ language }: SearchFiltersProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilters, setSelectedFilters] = useState<string[]>([]);
  const [activeLocation, setActiveLocation] = useState('');
  const [activeCategory, setActiveCategory] = useState('');
  const [activeStatus, setActiveStatus] = useState('');
  const [activeDate, setActiveDate] = useState('');

  const text = {
    en: {
      searchPlaceholder: 'Search issues...',
      filters: 'Filters',
      location: 'Location',
      category: 'Category',
      status: 'Status',
      dateRange: 'Date Range',
      apply: 'Apply Filters',
      clear: 'Clear All',
      results: 'Search Results',
      noResults: 'No issues found',
      locations: {
        all: 'All Locations',
        noida: 'Noida',
        delhi: 'Delhi',
        bengaluru: 'Bengaluru',
        mumbai: 'Mumbai'
      },
      categories: {
        all: 'All Categories',
        road: 'Road & Infrastructure',
        water: 'Water & Drainage',
        garbage: 'Garbage & Sanitation',
        electricity: 'Electricity',
        other: 'Other'
      },
      statuses: {
        all: 'All Status',
        pending: 'Pending',
        'in-progress': 'In Progress',
        resolved: 'Resolved'
      },
      dates: {
        all: 'All Time',
        today: 'Today',
        week: 'This Week',
        month: 'This Month'
      }
    },
    hi: {
      searchPlaceholder: 'मुद्दे खोजें...',
      filters: 'फिल्टर',
      location: 'स्थान',
      category: 'श्रेणी',
      status: 'स्थिति',
      dateRange: 'दिनांक सीमा',
      apply: 'फिल्टर लागू करें',
      clear: 'सभी साफ़ करें',
      results: 'खोज परिणाम',
      noResults: 'कोई मुद्दा नहीं मिला',
      locations: {
        all: 'सभी स्थान',
        noida: 'नोएडा',
        delhi: 'दिल्ली',
        bengaluru: 'बेंगलुरु',
        mumbai: 'मुंबई'
      },
      categories: {
        all: 'सभी श्रेणियां',
        road: 'सड़क और बुनियादी ढांचा',
        water: 'पानी और जल निकासी',
        garbage: 'कचरा और स्वच्छता',
        electricity: 'बिजली',
        other: 'अन्य'
      },
      statuses: {
        all: 'सभी स्थिति',
        pending: 'लंबित',
        'in-progress': 'प्रगति में',
        resolved: 'हल किया गया'
      },
      dates: {
        all: 'सभी समय',
        today: 'आज',
        week: 'इस सप्ताह',
        month: 'इस महीने'
      }
    }
  };

  const t = text[language];

  const addFilter = (type: string, value: string) => {
    const filterString = `${type}:${value}`;
    if (!selectedFilters.includes(filterString)) {
      setSelectedFilters(prev => [...prev, filterString]);
    }
  };

  const removeFilter = (filter: string) => {
    setSelectedFilters(prev => prev.filter(f => f !== filter));
  };

  const clearAllFilters = () => {
    setSelectedFilters([]);
    setActiveLocation('');
    setActiveCategory('');
    setActiveStatus('');
    setActiveDate('');
  };

  const getFilterDisplayName = (filter: string) => {
    const [type, value] = filter.split(':');
    switch (type) {
      case 'location':
        return `📍 ${t.locations[value as keyof typeof t.locations] || value}`;
      case 'category':
        return `🏷️ ${t.categories[value as keyof typeof t.categories] || value}`;
      case 'status':
        return `📊 ${t.statuses[value as keyof typeof t.statuses] || value}`;
      case 'date':
        return `📅 ${t.dates[value as keyof typeof t.dates] || value}`;
      default:
        return filter;
    }
  };

  return (
    <div className="space-y-4 pb-20">
      {/* Search Bar */}
      <div className="relative">
        <Search size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
        <Input
          placeholder={t.searchPlaceholder}
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-10 pr-12 h-12 bg-input-background border-border text-foreground placeholder:text-muted-foreground"
        />
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="ghost" size="sm" className="absolute right-2 top-1/2 transform -translate-y-1/2 text-foreground hover:text-accent-foreground hover:bg-accent">
              <Filter size={20} />
            </Button>
          </SheetTrigger>
          <SheetContent side="bottom" className="h-[80vh] bg-card border-border">
            <SheetHeader>
              <SheetTitle className="text-card-foreground">{t.filters}</SheetTitle>
              <SheetDescription className="text-muted-foreground">
                Refine your search with filters
              </SheetDescription>
            </SheetHeader>
            
            <div className="space-y-6 mt-6">
              {/* Location Filter */}
              <div className="space-y-2">
                <label className="flex items-center space-x-2 font-medium text-foreground">
                  <MapPin size={16} className="text-muted-foreground" />
                  <span>{t.location}</span>
                </label>
                <Select value={activeLocation} onValueChange={(value: string) => {
                  setActiveLocation(value);
                  if (value && value !== 'all') addFilter('location', value);
                }}>
                  <SelectTrigger>
                    <SelectValue placeholder={t.locations.all} />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">{t.locations.all}</SelectItem>
                    <SelectItem value="noida">{t.locations.noida}</SelectItem>
                    <SelectItem value="delhi">{t.locations.delhi}</SelectItem>
                    <SelectItem value="bengaluru">{t.locations.bengaluru}</SelectItem>
                    <SelectItem value="mumbai">{t.locations.mumbai}</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Category Filter */}
              <div className="space-y-2">
                <label className="flex items-center space-x-2 font-medium text-foreground">
                  <span>🏷️</span>
                  <span>{t.category}</span>
                </label>
                <Select value={activeCategory} onValueChange={(value: string) => {
                  setActiveCategory(value);
                  if (value && value !== 'all') addFilter('category', value);
                }}>
                  <SelectTrigger>
                    <SelectValue placeholder={t.categories.all} />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">{t.categories.all}</SelectItem>
                    <SelectItem value="road">{t.categories.road}</SelectItem>
                    <SelectItem value="water">{t.categories.water}</SelectItem>
                    <SelectItem value="garbage">{t.categories.garbage}</SelectItem>
                    <SelectItem value="electricity">{t.categories.electricity}</SelectItem>
                    <SelectItem value="other">{t.categories.other}</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Status Filter */}
              <div className="space-y-2">
                <label className="flex items-center space-x-2 font-medium text-foreground">
                  <span>📊</span>
                  <span>{t.status}</span>
                </label>
                <Select value={activeStatus} onValueChange={(value: string) => {
                  setActiveStatus(value);
                  if (value && value !== 'all') addFilter('status', value);
                }}>
                  <SelectTrigger>
                    <SelectValue placeholder={t.statuses.all} />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">{t.statuses.all}</SelectItem>
                    <SelectItem value="pending">{t.statuses.pending}</SelectItem>
                    <SelectItem value="in-progress">{t.statuses['in-progress']}</SelectItem>
                    <SelectItem value="resolved">{t.statuses.resolved}</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Date Filter */}
              <div className="space-y-2">
                <label className="flex items-center space-x-2 font-medium text-foreground">
                  <Calendar size={16} className="text-muted-foreground" />
                  <span>{t.dateRange}</span>
                </label>
                <Select value={activeDate} onValueChange={(value: string) => {
                  setActiveDate(value);
                  if (value && value !== 'all') addFilter('date', value);
                }}>
                  <SelectTrigger>
                    <SelectValue placeholder={t.dates.all} />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">{t.dates.all}</SelectItem>
                    <SelectItem value="today">{t.dates.today}</SelectItem>
                    <SelectItem value="week">{t.dates.week}</SelectItem>
                    <SelectItem value="month">{t.dates.month}</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex space-x-3 pt-4">
                <Button onClick={clearAllFilters} variant="outline" className="flex-1">
                  {t.clear}
                </Button>
                <Button className="flex-1 bg-blue-green-gradient hover:opacity-90">
                  {t.apply}
                </Button>
              </div>
            </div>
          </SheetContent>
        </Sheet>
      </div>

      {/* Active Filters */}
      {selectedFilters.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {selectedFilters.map((filter, index) => (
            <Badge key={index} variant="secondary" className="flex items-center gap-1">
              {getFilterDisplayName(filter)}
              <button 
                onClick={() => removeFilter(filter)}
                className="ml-1 hover:text-red-500"
              >
                <X size={12} />
              </button>
            </Badge>
          ))}
        </div>
      )}

      {/* Results */}
      <div>
        <h3 className="font-medium mb-4 text-foreground">
          {t.results} {searchQuery && `for "${searchQuery}"`}
        </h3>
      </div>
    </div>
  );
}