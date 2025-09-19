import { useState, useCallback } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Badge } from './ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Textarea } from './ui/textarea';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line } from 'recharts';
import { Users, FileText, CheckCircle, Clock, UserPlus, Settings, BarChart3, MapPin, MessageSquare, Calendar, Star, TrendingUp, Search, Filter, X, ChevronDown, Sliders } from 'lucide-react';

interface AdminDashboardProps {
  language: 'en' | 'hi';
}

export function AdminDashboard({ language }: AdminDashboardProps) {
  const [activeTab, setActiveTab] = useState('overview');
  
  // Filter states
  const [showFilters, setShowFilters] = useState(false);
  const [staffFilters, setStaffFilters] = useState({
    search: '',
    department: 'all',
    status: 'all',
    role: 'all'
  });
  
  const [feedbackFilters, setFeedbackFilters] = useState({
    search: '',
    rating: 'all',
    category: 'all',
    dateRange: 'all'
  });
  
  const [eventFilters, setEventFilters] = useState({
    search: '',
    status: 'all',
    type: 'all',
    dateRange: 'all'
  });

  // Mock data
  const overviewStats = [
    { title: 'Total Users', value: '2,847', icon: Users, color: 'bg-blue-500', change: '+12%' },
    { title: 'Total Issues', value: '1,234', icon: FileText, color: 'bg-green-500', change: '+8%' },
    { title: 'Pending Issues', value: '156', icon: Clock, color: 'bg-yellow-500', change: '-15%' },
    { title: 'Resolved Issues', value: '891', icon: CheckCircle, color: 'bg-emerald-500', change: '+22%' },
  ];

  const issuesData = [
    { month: 'Jan', reported: 120, resolved: 98, satisfaction: 85 },
    { month: 'Feb', reported: 145, resolved: 132, satisfaction: 88 },
    { month: 'Mar', reported: 189, resolved: 167, satisfaction: 91 },
    { month: 'Apr', reported: 156, resolved: 143, satisfaction: 87 },
    { month: 'May', reported: 178, resolved: 156, satisfaction: 93 },
    { month: 'Jun', reported: 134, resolved: 125, satisfaction: 89 },
  ];

  const categoryData = [
    { name: 'Roads', value: 35, color: '#0EA5E9', issues: 432 },
    { name: 'Water', value: 25, color: '#10B981', issues: 308 },
    { name: 'Electricity', value: 20, color: '#F59E0B', issues: 246 },
    { name: 'Sanitation', value: 15, color: '#EF4444', issues: 185 },
    { name: 'Others', value: 5, color: '#8B5CF6', issues: 63 },
  ];

  const mockStaff = [
    { 
      id: 1, 
      name: 'Rajesh Kumar', 
      email: 'rajesh@civicfix.com', 
      role: 'Senior Staff', 
      department: 'Roads & Infrastructure',
      location: 'Zone A',
      issuesAssigned: 45, 
      issuesCompleted: 38, 
      avgRating: 4.7,
      status: 'active',
      joinDate: '2023-01-15',
      phone: '+91 98765 43210'
    },
    { 
      id: 2, 
      name: 'Priya Sharma', 
      email: 'priya@civicfix.com', 
      role: 'Staff', 
      department: 'Water & Sanitation',
      location: 'Zone B',
      issuesAssigned: 32, 
      issuesCompleted: 28, 
      avgRating: 4.5,
      status: 'active',
      joinDate: '2023-03-20',
      phone: '+91 98765 43211'
    },
    { 
      id: 3, 
      name: 'Amit Singh', 
      email: 'amit@civicfix.com', 
      role: 'Junior Staff', 
      department: 'Electricity',
      location: 'Zone C',
      issuesAssigned: 28, 
      issuesCompleted: 22, 
      avgRating: 4.2,
      status: 'on-leave',
      joinDate: '2023-06-10',
      phone: '+91 98765 43212'
    },
  ];

  const mockLocations = [
    { 
      id: 1, 
      name: 'Zone A - Central District', 
      area: 'Central Business District',
      population: 45000,
      activeIssues: 23,
      resolvedIssues: 156,
      staffAssigned: 8,
      avgResolutionTime: '2.3 days',
      satisfactionScore: 4.2,
      coordinates: '28.6139, 77.2090'
    },
    { 
      id: 2, 
      name: 'Zone B - Residential Area', 
      area: 'Housing Societies',
      population: 62000,
      activeIssues: 34,
      resolvedIssues: 198,
      staffAssigned: 12,
      avgResolutionTime: '1.8 days',
      satisfactionScore: 4.5,
      coordinates: '28.6289, 77.2065'
    },
    { 
      id: 3, 
      name: 'Zone C - Industrial Area', 
      area: 'Manufacturing District',
      population: 28000,
      activeIssues: 18,
      resolvedIssues: 89,
      staffAssigned: 6,
      avgResolutionTime: '3.1 days',
      satisfactionScore: 3.9,
      coordinates: '28.5989, 77.2154'
    },
  ];

  const mockFeedbacks = [
    {
      id: 1,
      issueId: 'ISS-001',
      issueTitle: 'Pothole Repair on MG Road',
      userName: 'Rahul Verma',
      rating: 5,
      comment: 'Excellent work! The road is much better now.',
      date: '2024-03-15',
      staffName: 'Rajesh Kumar',
      category: 'Roads'
    },
    {
      id: 2,
      issueId: 'ISS-002',
      issueTitle: 'Water Supply Issue',
      userName: 'Sunita Devi',
      rating: 4,
      comment: 'Good service, but took a bit longer than expected.',
      date: '2024-03-14',
      staffName: 'Priya Sharma',
      category: 'Water'
    },
    {
      id: 3,
      issueId: 'ISS-003',
      issueTitle: 'Street Light Repair',
      userName: 'Mohammad Ali',
      rating: 3,
      comment: 'Average service. Could be improved.',
      date: '2024-03-13',
      staffName: 'Amit Singh',
      category: 'Electricity'
    },
  ];

  const mockEvents = [
    {
      id: 1,
      title: 'Community Clean-up Drive',
      description: 'Organizing a city-wide cleaning campaign',
      date: '2024-04-15',
      time: '08:00 AM',
      location: 'Central Park',
      type: 'Community Event',
      status: 'upcoming',
      participants: 145,
      organizer: 'Municipal Corporation'
    },
    {
      id: 2,
      title: 'Road Safety Awareness',
      description: 'Educational program about traffic rules',
      date: '2024-04-20',
      time: '10:00 AM',
      location: 'City Hall',
      type: 'Educational',
      status: 'upcoming',
      participants: 89,
      organizer: 'Traffic Department'
    },
    {
      id: 3,
      title: 'Water Conservation Workshop',
      description: 'Teaching citizens about water saving techniques',
      date: '2024-03-10',
      time: '02:00 PM',
      location: 'Community Center',
      type: 'Workshop',
      status: 'completed',
      participants: 67,
      organizer: 'Water Department'
    },
  ];

  const reportsData = [
    { name: 'Daily Performance Report', type: 'PDF', date: '2024-03-15', size: '2.3 MB' },
    { name: 'Monthly Issue Analysis', type: 'Excel', date: '2024-03-01', size: '5.1 MB' },
    { name: 'Staff Performance Review', type: 'PDF', date: '2024-03-14', size: '1.8 MB' },
    { name: 'Citizen Satisfaction Survey', type: 'PDF', date: '2024-03-12', size: '3.2 MB' },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'inactive': return 'bg-red-100 text-red-800';
      case 'on-leave': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const clearStaffFilters = useCallback(() => {
    setStaffFilters({
      search: '',
      department: 'all',
      status: 'all',
      role: 'all'
    });
  }, []);

  const clearFeedbackFilters = useCallback(() => {
    setFeedbackFilters({
      search: '',
      rating: 'all',
      category: 'all',
      dateRange: 'all'
    });
  }, []);

  const clearEventFilters = useCallback(() => {
    setEventFilters({
      search: '',
      status: 'all',
      type: 'all',
      dateRange: 'all'
    });
  }, []);

  // Enhanced Staff Filter Component
  const StaffFilterPanel = useCallback(() => (
    <Card className="mb-6 shadow-blue-green border-0" style={{ background: 'rgba(255, 255, 255, 0.95)' }}>
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Filter className="w-5 h-5 text-blue-600" />
            <CardTitle className="text-lg">{language === 'en' ? 'Filter Staff' : 'स्टाफ फिल्टर'}</CardTitle>
          </div>
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={() => setShowFilters(!showFilters)}
            className="text-blue-600"
          >
            <Sliders className="w-4 h-4 mr-1" />
            {showFilters ? 'Hide' : 'Show'} Filters
            <ChevronDown className={`w-4 h-4 ml-1 transition-transform ${showFilters ? 'rotate-180' : ''}`} />
          </Button>
        </div>
      </CardHeader>
      {showFilters && (
        <CardContent className="space-y-4">
          {/* Search Bar */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <Input
              placeholder={language === 'en' ? 'Search by name, email or phone...' : 'नाम, ईमेल या फोन से खोजें...'}
              className="pl-10 bg-white border-blue-200 focus:border-blue-400"
              value={staffFilters.search}
              onChange={(e) => setStaffFilters({...staffFilters, search: e.target.value})}
            />
            {staffFilters.search && (
              <Button
                variant="ghost"
                size="sm"
                className="absolute right-2 top-1/2 transform -translate-y-1/2 p-1 h-6 w-6"
                onClick={() => setStaffFilters({...staffFilters, search: ''})}
              >
                <X className="w-3 h-3" />
              </Button>
            )}
          </div>

          {/* Filter Options Grid */}
          <div className="grid grid-cols-1 gap-4">
            <div className="grid grid-cols-3 gap-3">
              {/* Department Filter */}
              <div className="space-y-2">
                <Label className="text-sm font-medium text-gray-700">Department</Label>
                <Select 
                  value={staffFilters.department} 
                  onValueChange={(value: string) => setStaffFilters({...staffFilters, department: value})}
                >
                  <SelectTrigger className="bg-white border-blue-200">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Departments</SelectItem>
                    <SelectItem value="roads">🛣️ Roads</SelectItem>
                    <SelectItem value="water">💧 Water</SelectItem>
                    <SelectItem value="electricity">⚡ Electricity</SelectItem>
                    <SelectItem value="general">🏢 General</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Status Filter */}
              <div className="space-y-2">
                <Label className="text-sm font-medium text-gray-700">Status</Label>
                <Select 
                  value={staffFilters.status} 
                  onValueChange={(value: string) => setStaffFilters({...staffFilters, status: value})}
                >
                  <SelectTrigger className="bg-white border-blue-200">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Status</SelectItem>
                    <SelectItem value="active">🟢 Active</SelectItem>
                    <SelectItem value="inactive">🔴 Inactive</SelectItem>
                    <SelectItem value="on-leave">🟡 On Leave</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Role Filter */}
              <div className="space-y-2">
                <Label className="text-sm font-medium text-gray-700">Role</Label>
                <Select 
                  value={staffFilters.role} 
                  onValueChange={(value: string) => setStaffFilters({...staffFilters, role: value})}
                >
                  <SelectTrigger className="bg-white border-blue-200">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Roles</SelectItem>
                    <SelectItem value="senior">👔 Senior Staff</SelectItem>
                    <SelectItem value="staff">👨‍💼 Staff</SelectItem>
                    <SelectItem value="junior">👨‍🎓 Junior Staff</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Active Filters Display */}
            <div className="flex flex-wrap gap-2">
              {staffFilters.search && (
                <Badge variant="secondary" className="bg-blue-100 text-blue-800">
                  Search: "{staffFilters.search}"
                  <Button
                    variant="ghost"
                    size="sm"
                    className="p-0 h-4 w-4 ml-2"
                    onClick={() => setStaffFilters({...staffFilters, search: ''})}
                  >
                    <X className="w-3 h-3" />
                  </Button>
                </Badge>
              )}
              {staffFilters.department !== 'all' && (
                <Badge variant="secondary" className="bg-green-100 text-green-800">
                  Dept: {staffFilters.department}
                  <Button
                    variant="ghost"
                    size="sm"
                    className="p-0 h-4 w-4 ml-2"
                    onClick={() => setStaffFilters({...staffFilters, department: 'all'})}
                  >
                    <X className="w-3 h-3" />
                  </Button>
                </Badge>
              )}
              {staffFilters.status !== 'all' && (
                <Badge variant="secondary" className="bg-yellow-100 text-yellow-800">
                  Status: {staffFilters.status}
                  <Button
                    variant="ghost"
                    size="sm"
                    className="p-0 h-4 w-4 ml-2"
                    onClick={() => setStaffFilters({...staffFilters, status: 'all'})}
                  >
                    <X className="w-3 h-3" />
                  </Button>
                </Badge>
              )}
            </div>

            {/* Action Buttons */}
            <div className="flex justify-between items-center pt-2">
              <div className="text-sm text-gray-600">
                {language === 'en' ? 'Showing' : 'दिखाया जा रहा'} {mockStaff.length} {language === 'en' ? 'results' : 'परिणाम'}
              </div>
              <Button 
                variant="outline" 
                size="sm" 
                onClick={clearStaffFilters}
                className="text-gray-600"
              >
                <X className="w-4 h-4 mr-1" />
                Clear All
              </Button>
            </div>
          </div>
        </CardContent>
      )}
    </Card>
  ), [language, showFilters, staffFilters, clearStaffFilters, mockStaff.length]);

  // Enhanced Feedback Filter Component
  const FeedbackFilterPanel = () => (
    <Card className="mb-6 shadow-blue-green border-0" style={{ background: 'rgba(255, 255, 255, 0.95)' }}>
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Filter className="w-5 h-5 text-blue-600" />
            <CardTitle className="text-lg">{language === 'en' ? 'Filter Feedback' : 'फीडबैक फिल्टर'}</CardTitle>
          </div>
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={() => setShowFilters(!showFilters)}
            className="text-blue-600"
          >
            <Sliders className="w-4 h-4 mr-1" />
            {showFilters ? 'Hide' : 'Show'} Filters
            <ChevronDown className={`w-4 h-4 ml-1 transition-transform ${showFilters ? 'rotate-180' : ''}`} />
          </Button>
        </div>
      </CardHeader>
      {showFilters && (
        <CardContent className="space-y-4">
          {/* Search Bar */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <Input
              placeholder={language === 'en' ? 'Search feedback, issues or citizens...' : 'फीडबैक, मुद्दे या नागरिक खोजें...'}
              className="pl-10 bg-white border-blue-200 focus:border-blue-400"
              value={feedbackFilters.search}
              onChange={(e) => setFeedbackFilters({...feedbackFilters, search: e.target.value})}
            />
          </div>

          {/* Rating Filter with Stars */}
          <div className="space-y-2">
            <Label className="text-sm font-medium text-gray-700">Rating Filter</Label>
            <div className="flex gap-2 flex-wrap">
              <Button
                variant={feedbackFilters.rating === 'all' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setFeedbackFilters({...feedbackFilters, rating: 'all'})}
                className="text-xs"
              >
                All Ratings
              </Button>
              {[5, 4, 3, 2, 1].map((rating) => (
                <Button
                  key={rating}
                  variant={feedbackFilters.rating === rating.toString() ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setFeedbackFilters({...feedbackFilters, rating: rating.toString()})}
                  className="text-xs"
                >
                  <div className="flex items-center gap-1">
                    <span>{rating}</span>
                    <Star className="w-3 h-3 fill-current text-yellow-500" />
                  </div>
                </Button>
              ))}
            </div>
          </div>

          {/* Category and Date Filters */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label className="text-sm font-medium text-gray-700">Category</Label>
              <Select 
                value={feedbackFilters.category} 
                onValueChange={(value: string) => setFeedbackFilters({...feedbackFilters, category: value})}
              >
                <SelectTrigger className="bg-white border-blue-200">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  <SelectItem value="roads">🛣️ Roads</SelectItem>
                  <SelectItem value="water">💧 Water</SelectItem>
                  <SelectItem value="electricity">⚡ Electricity</SelectItem>
                  <SelectItem value="sanitation">🗑️ Sanitation</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label className="text-sm font-medium text-gray-700">Date Range</Label>
              <Select 
                value={feedbackFilters.dateRange} 
                onValueChange={(value: string) => setFeedbackFilters({...feedbackFilters, dateRange: value})}
              >
                <SelectTrigger className="bg-white border-blue-200">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Time</SelectItem>
                  <SelectItem value="today">📅 Today</SelectItem>
                  <SelectItem value="week">📅 This Week</SelectItem>
                  <SelectItem value="month">📅 This Month</SelectItem>
                  <SelectItem value="quarter">📅 This Quarter</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-between items-center pt-2">
            <div className="text-sm text-gray-600">
              {language === 'en' ? 'Showing' : 'दिखाया जा रहा'} {mockFeedbacks.length} {language === 'en' ? 'feedback entries' : 'फीडबैक'}
            </div>
            <Button 
              variant="outline" 
              size="sm" 
              onClick={clearFeedbackFilters}
              className="text-gray-600"
            >
              <X className="w-4 h-4 mr-1" />
              Clear All
            </Button>
          </div>
        </CardContent>
      )}
    </Card>
  );

  // Enhanced Event Filter Component
  const EventFilterPanel = () => (
    <Card className="mb-6 shadow-blue-green border-0" style={{ background: 'rgba(255, 255, 255, 0.95)' }}>
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Filter className="w-5 h-5 text-blue-600" />
            <CardTitle className="text-lg">{language === 'en' ? 'Filter Events' : 'इवेंट्स फिल्टर'}</CardTitle>
          </div>
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={() => setShowFilters(!showFilters)}
            className="text-blue-600"
          >
            <Sliders className="w-4 h-4 mr-1" />
            {showFilters ? 'Hide' : 'Show'} Filters
            <ChevronDown className={`w-4 h-4 ml-1 transition-transform ${showFilters ? 'rotate-180' : ''}`} />
          </Button>
        </div>
      </CardHeader>
      {showFilters && (
        <CardContent className="space-y-4">
          {/* Search Bar */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <Input
              placeholder={language === 'en' ? 'Search events, locations or organizers...' : 'इवेंट्स, स्थान या आयोजक खोजें...'}
              className="pl-10 bg-white border-blue-200 focus:border-blue-400"
              value={eventFilters.search}
              onChange={(e) => setEventFilters({...eventFilters, search: e.target.value})}
            />
          </div>

          {/* Status Filter with Colors */}
          <div className="space-y-2">
            <Label className="text-sm font-medium text-gray-700">Event Status</Label>
            <div className="flex gap-2 flex-wrap">
              <Button
                variant={eventFilters.status === 'all' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setEventFilters({...eventFilters, status: 'all'})}
                className="text-xs"
              >
                All Events
              </Button>
              <Button
                variant={eventFilters.status === 'upcoming' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setEventFilters({...eventFilters, status: 'upcoming'})}
                className="text-xs bg-blue-50 text-blue-700 hover:bg-blue-100"
              >
                🔄 Upcoming
              </Button>
              <Button
                variant={eventFilters.status === 'ongoing' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setEventFilters({...eventFilters, status: 'ongoing'})}
                className="text-xs bg-green-50 text-green-700 hover:bg-green-100"
              >
                ▶️ Ongoing
              </Button>
              <Button
                variant={eventFilters.status === 'completed' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setEventFilters({...eventFilters, status: 'completed'})}
                className="text-xs bg-gray-50 text-gray-700 hover:bg-gray-100"
              >
                ✅ Completed
              </Button>
            </div>
          </div>

          {/* Type and Date Filters */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label className="text-sm font-medium text-gray-700">Event Type</Label>
              <Select 
                value={eventFilters.type} 
                onValueChange={(value: string) => setEventFilters({...eventFilters, type: value})}
              >
                <SelectTrigger className="bg-white border-blue-200">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Types</SelectItem>
                  <SelectItem value="community">🏘️ Community Event</SelectItem>
                  <SelectItem value="educational">📚 Educational</SelectItem>
                  <SelectItem value="workshop">🔧 Workshop</SelectItem>
                  <SelectItem value="awareness">📢 Awareness</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label className="text-sm font-medium text-gray-700">Date Range</Label>
              <Select 
                value={eventFilters.dateRange} 
                onValueChange={(value: string) => setEventFilters({...eventFilters, dateRange: value})}
              >
                <SelectTrigger className="bg-white border-blue-200">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Dates</SelectItem>
                  <SelectItem value="today">📅 Today</SelectItem>
                  <SelectItem value="week">📅 This Week</SelectItem>
                  <SelectItem value="month">📅 This Month</SelectItem>
                  <SelectItem value="next-month">📅 Next Month</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-between items-center pt-2">
            <div className="text-sm text-gray-600">
              {language === 'en' ? 'Showing' : 'दिखाया जा रहा'} {mockEvents.length} {language === 'en' ? 'events' : 'इवेंट्स'}
            </div>
            <Button 
              variant="outline" 
              size="sm" 
              onClick={clearEventFilters}
              className="text-gray-600"
            >
              <X className="w-4 h-4 mr-1" />
              Clear All
            </Button>
          </div>
        </CardContent>
      )}
    </Card>
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-blue-green-gradient">
            {language === 'en' ? 'Admin Dashboard' : 'एडमिन डैशबोर्ड'}
          </h1>
          <p className="text-gray-600">
            {language === 'en' ? 'Comprehensive system management and analytics' : 'व्यापक सिस्टम प्रबंधन और विश्लेषण'}
          </p>
        </div>
        <Button className="bg-blue-green-gradient hover:opacity-90 shadow-blue-green">
          <Settings className="w-4 h-4 mr-2" />
          {language === 'en' ? 'Settings' : 'सेटिंग्स'}
        </Button>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <div className="overflow-x-auto">
          <TabsList className="grid w-full grid-cols-7 min-w-max">
            <TabsTrigger value="overview" className="flex items-center gap-1 text-xs">
              <BarChart3 className="w-3 h-3" />
              {language === 'en' ? 'Overview' : 'अवलोकन'}
            </TabsTrigger>
            <TabsTrigger value="staff" className="flex items-center gap-1 text-xs">
              <Users className="w-3 h-3" />
              {language === 'en' ? 'Staff' : 'स्टाफ'}
            </TabsTrigger>
            <TabsTrigger value="locations" className="flex items-center gap-1 text-xs">
              <MapPin className="w-3 h-3" />
              {language === 'en' ? 'Locations' : 'स्थान'}
            </TabsTrigger>
            <TabsTrigger value="feedback" className="flex items-center gap-1 text-xs">
              <MessageSquare className="w-3 h-3" />
              {language === 'en' ? 'Feedback' : 'फीडबैक'}
            </TabsTrigger>
            <TabsTrigger value="events" className="flex items-center gap-1 text-xs">
              <Calendar className="w-3 h-3" />
              {language === 'en' ? 'Events' : 'इवेंट्स'}
            </TabsTrigger>
            <TabsTrigger value="reports" className="flex items-center gap-1 text-xs">
              <FileText className="w-3 h-3" />
              {language === 'en' ? 'Reports' : 'रिपोर्ट'}
            </TabsTrigger>
            <TabsTrigger value="analytics" className="flex items-center gap-1 text-xs">
              <TrendingUp className="w-3 h-3" />
              {language === 'en' ? 'Analytics' : 'विश्लेषण'}
            </TabsTrigger>
          </TabsList>
        </div>

        <TabsContent value="overview" className="space-y-6">
          {/* Enhanced Stats Cards */}
          <div className="grid grid-cols-2 gap-4">
            {overviewStats.map((stat, index) => (
              <Card key={index} className="shadow-blue-green border-0" style={{ background: 'rgba(255, 255, 255, 0.9)' }}>
                <CardContent className="p-4">
                  <div className="flex items-center space-x-3">
                    <div className={`w-12 h-12 rounded-lg ${stat.color} flex items-center justify-center`}>
                      <stat.icon className="w-6 h-6 text-white" />
                    </div>
                    <div className="flex-1">
                      <p className="text-2xl font-bold">{stat.value}</p>
                      <p className="text-sm text-gray-600">{stat.title}</p>
                      <p className={`text-xs ${stat.change.startsWith('+') ? 'text-green-600' : 'text-red-600'}`}>
                        {stat.change} from last month
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Quick Actions Grid */}
          <div className="grid grid-cols-2 gap-4">
            <Card className="shadow-blue-green border-0" style={{ background: 'rgba(255, 255, 255, 0.9)' }}>
              <CardContent className="p-4">
                <Button 
                  variant="outline" 
                  className="w-full h-20 flex flex-col gap-2"
                  onClick={() => setActiveTab('staff')}
                >
                  <UserPlus className="w-6 h-6" />
                  <span className="text-sm">{language === 'en' ? 'Manage Staff' : 'स्टाफ प्रबंधन'}</span>
                </Button>
              </CardContent>
            </Card>
            
            <Card className="shadow-blue-green border-0" style={{ background: 'rgba(255, 255, 255, 0.9)' }}>
              <CardContent className="p-4">
                <Button 
                  variant="outline" 
                  className="w-full h-20 flex flex-col gap-2"
                  onClick={() => setActiveTab('locations')}
                >
                  <MapPin className="w-6 h-6" />
                  <span className="text-sm">{language === 'en' ? 'Location Zones' : 'स्थान क्षेत्र'}</span>
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Performance Overview */}
          <Card className="shadow-blue-green border-0" style={{ background: 'rgba(255, 255, 255, 0.9)' }}>
            <CardHeader>
              <CardTitle>{language === 'en' ? 'System Performance' : 'सिस्टम प्रदर्शन'}</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={200}>
                <LineChart data={issuesData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Line dataKey="reported" stroke="#0EA5E9" strokeWidth={2} name="Reported" />
                  <Line dataKey="resolved" stroke="#10B981" strokeWidth={2} name="Resolved" />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="staff" className="space-y-6">
          {StaffFilterPanel()}
          <Card className="shadow-blue-green border-0" style={{ background: 'rgba(255, 255, 255, 0.9)' }}>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>{language === 'en' ? 'Staff Management' : 'स्टाफ प्रबंधन'}</CardTitle>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button className="bg-blue-green-gradient hover:opacity-90">
                      <UserPlus className="w-4 h-4 mr-2" />
                      {language === 'en' ? 'Add Staff' : 'स्टाफ जोड़ें'}
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-md">
                    <DialogHeader>
                      <DialogTitle>Add New Staff Member</DialogTitle>
                      <DialogDescription>Enter the details of the new staff member.</DialogDescription>
                    </DialogHeader>
                    <div className="space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="staffName">Full Name</Label>
                          <Input id="staffName" placeholder="Enter full name" />
                        </div>
                        <div>
                          <Label htmlFor="staffPhone">Phone</Label>
                          <Input id="staffPhone" placeholder="+91 98765 43210" />
                        </div>
                      </div>
                      <div>
                        <Label htmlFor="staffEmail">Email</Label>
                        <Input id="staffEmail" type="email" placeholder="email@civicfix.com" />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="department">Department</Label>
                          <Select>
                            <SelectTrigger>
                              <SelectValue placeholder="Select department" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="roads">Roads & Infrastructure</SelectItem>
                              <SelectItem value="water">Water & Sanitation</SelectItem>
                              <SelectItem value="electricity">Electricity</SelectItem>
                              <SelectItem value="general">General Services</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div>
                          <Label htmlFor="role">Role</Label>
                          <Select>
                            <SelectTrigger>
                              <SelectValue placeholder="Select role" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="junior">Junior Staff</SelectItem>
                              <SelectItem value="staff">Staff</SelectItem>
                              <SelectItem value="senior">Senior Staff</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                      <div>
                        <Label htmlFor="location">Assigned Location</Label>
                        <Select>
                          <SelectTrigger>
                            <SelectValue placeholder="Select location" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="zone-a">Zone A</SelectItem>
                            <SelectItem value="zone-b">Zone B</SelectItem>
                            <SelectItem value="zone-c">Zone C</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <Button className="w-full bg-blue-green-gradient hover:opacity-90">
                        Add Staff Member
                      </Button>
                    </div>
                  </DialogContent>
                </Dialog>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {mockStaff.map((staff) => (
                  <Card key={staff.id} className="border border-gray-200">
                    <CardContent className="p-4">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <h3 className="font-semibold">{staff.name}</h3>
                            <Badge className={getStatusColor(staff.status)}>
                              {staff.status}
                            </Badge>
                          </div>
                          <div className="grid grid-cols-2 gap-2 text-sm text-gray-600 mb-2">
                            <span>📧 {staff.email}</span>
                            <span>📱 {staff.phone}</span>
                            <span>🏢 {staff.department}</span>
                            <span>📍 {staff.location}</span>
                          </div>
                          <div className="flex items-center gap-4 text-sm">
                            <span className="flex items-center gap-1">
                              <FileText className="w-4 h-4" />
                              {staff.issuesCompleted}/{staff.issuesAssigned} issues
                            </span>
                            <span className="flex items-center gap-1">
                              <Star className="w-4 h-4 text-yellow-500" />
                              {staff.avgRating} rating
                            </span>
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <Button variant="outline" size="sm">
                            View
                          </Button>
                          <Button variant="outline" size="sm">
                            Edit
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="locations" className="space-y-6">
          <Card className="shadow-blue-green border-0" style={{ background: 'rgba(255, 255, 255, 0.9)' }}>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>{language === 'en' ? 'Location Management' : 'स्थान प्रबंधन'}</CardTitle>
                <Button className="bg-blue-green-gradient hover:opacity-90">
                  <MapPin className="w-4 h-4 mr-2" />
                  {language === 'en' ? 'Add Zone' : 'जोन जोड़ें'}
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {mockLocations.map((location) => (
                  <Card key={location.id} className="border border-gray-200">
                    <CardContent className="p-4">
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <h3 className="font-semibold">{location.name}</h3>
                          <p className="text-sm text-gray-600">{location.area}</p>
                        </div>
                        <div className="flex items-center gap-1">
                          <Star className="w-4 h-4 text-yellow-500" />
                          <span className="text-sm">{location.satisfactionScore}</span>
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-2 gap-4 mb-3">
                        <div className="space-y-2">
                          <div className="flex justify-between text-sm">
                            <span>Population:</span>
                            <span className="font-medium">{location.population.toLocaleString()}</span>
                          </div>
                          <div className="flex justify-between text-sm">
                            <span>Active Issues:</span>
                            <span className="font-medium text-red-600">{location.activeIssues}</span>
                          </div>
                          <div className="flex justify-between text-sm">
                            <span>Resolved Issues:</span>
                            <span className="font-medium text-green-600">{location.resolvedIssues}</span>
                          </div>
                        </div>
                        <div className="space-y-2">
                          <div className="flex justify-between text-sm">
                            <span>Staff Assigned:</span>
                            <span className="font-medium">{location.staffAssigned}</span>
                          </div>
                          <div className="flex justify-between text-sm">
                            <span>Avg Resolution:</span>
                            <span className="font-medium">{location.avgResolutionTime}</span>
                          </div>
                          <div className="flex justify-between text-sm">
                            <span>Coordinates:</span>
                            <span className="font-medium text-blue-600">{location.coordinates}</span>
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm">
                          View Details
                        </Button>
                        <Button variant="outline" size="sm">
                          Assign Staff
                        </Button>
                        <Button variant="outline" size="sm">
                          View Map
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="feedback" className="space-y-6">
          {FeedbackFilterPanel()}
          <Card className="shadow-blue-green border-0" style={{ background: 'rgba(255, 255, 255, 0.9)' }}>
            <CardHeader>
              <CardTitle>{language === 'en' ? 'Feedback Management' : 'फीडबैक प्रबंधन'}</CardTitle>
              <CardDescription>
                {language === 'en' ? 'Monitor citizen feedback and ratings' : 'नागरिक फीडबैक और रेटिंग की निगरानी करें'}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex gap-4">
                  <Input placeholder={language === 'en' ? 'Search feedback...' : 'फीडबैक खोजें...'} className="flex-1" />
                  <Select>
                    <SelectTrigger className="w-32">
                      <SelectValue placeholder="Rating" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All</SelectItem>
                      <SelectItem value="5">5 Stars</SelectItem>
                      <SelectItem value="4">4 Stars</SelectItem>
                      <SelectItem value="3">3 Stars</SelectItem>
                      <SelectItem value="2">2 Stars</SelectItem>
                      <SelectItem value="1">1 Star</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-3">
                  {mockFeedbacks.map((feedback) => (
                    <Card key={feedback.id} className="border border-gray-200">
                      <CardContent className="p-4">
                        <div className="flex items-start justify-between mb-2">
                          <div>
                            <h4 className="font-medium">{feedback.issueTitle}</h4>
                            <p className="text-sm text-gray-600">Issue ID: {feedback.issueId}</p>
                          </div>
                          <div className="flex items-center gap-1">
                            {[...Array(5)].map((_, i) => (
                              <Star 
                                key={i} 
                                className={`w-4 h-4 ${i < feedback.rating ? 'text-yellow-500 fill-current' : 'text-gray-300'}`} 
                              />
                            ))}
                          </div>
                        </div>
                        
                        <div className="grid grid-cols-2 gap-4 mb-3 text-sm">
                          <div>
                            <span className="text-gray-600">Citizen: </span>
                            <span className="font-medium">{feedback.userName}</span>
                          </div>
                          <div>
                            <span className="text-gray-600">Staff: </span>
                            <span className="font-medium">{feedback.staffName}</span>
                          </div>
                          <div>
                            <span className="text-gray-600">Category: </span>
                            <Badge variant="outline">{feedback.category}</Badge>
                          </div>
                          <div>
                            <span className="text-gray-600">Date: </span>
                            <span className="font-medium">{feedback.date}</span>
                          </div>
                        </div>
                        
                        <div className="bg-gray-50 p-3 rounded-lg">
                          <p className="text-sm italic">"{feedback.comment}"</p>
                        </div>
                        
                        <div className="flex gap-2 mt-3">
                          <Button variant="outline" size="sm">
                            View Issue
                          </Button>
                          <Button variant="outline" size="sm">
                            Contact Citizen
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="events" className="space-y-6">
          {EventFilterPanel()}
          <Card className="shadow-blue-green border-0" style={{ background: 'rgba(255, 255, 255, 0.9)' }}>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>{language === 'en' ? 'Event Management' : 'इवेंट प्रबंधन'}</CardTitle>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button className="bg-blue-green-gradient hover:opacity-90">
                      <Calendar className="w-4 h-4 mr-2" />
                      {language === 'en' ? 'Create Event' : 'इवेंट बनाएं'}
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-md">
                    <DialogHeader>
                      <DialogTitle>Create New Event</DialogTitle>
                      <DialogDescription>Add a new community event or campaign.</DialogDescription>
                    </DialogHeader>
                    <div className="space-y-4">
                      <div>
                        <Label htmlFor="eventTitle">Event Title</Label>
                        <Input id="eventTitle" placeholder="Enter event title" />
                      </div>
                      <div>
                        <Label htmlFor="eventDesc">Description</Label>
                        <Textarea id="eventDesc" placeholder="Event description" />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="eventDate">Date</Label>
                          <Input id="eventDate" type="date" />
                        </div>
                        <div>
                          <Label htmlFor="eventTime">Time</Label>
                          <Input id="eventTime" type="time" />
                        </div>
                      </div>
                      <div>
                        <Label htmlFor="eventLocation">Location</Label>
                        <Input id="eventLocation" placeholder="Event location" />
                      </div>
                      <div>
                        <Label htmlFor="eventType">Event Type</Label>
                        <Select>
                          <SelectTrigger>
                            <SelectValue placeholder="Select type" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="community">Community Event</SelectItem>
                            <SelectItem value="educational">Educational</SelectItem>
                            <SelectItem value="workshop">Workshop</SelectItem>
                            <SelectItem value="awareness">Awareness Campaign</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <Button className="w-full bg-blue-green-gradient hover:opacity-90">
                        Create Event
                      </Button>
                    </div>
                  </DialogContent>
                </Dialog>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex gap-4">
                  <Input placeholder={language === 'en' ? 'Search events...' : 'इवेंट खोजें...'} className="flex-1" />
                  <Select>
                    <SelectTrigger className="w-32">
                      <SelectValue placeholder="Status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All</SelectItem>
                      <SelectItem value="upcoming">Upcoming</SelectItem>
                      <SelectItem value="ongoing">Ongoing</SelectItem>
                      <SelectItem value="completed">Completed</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-3">
                  {mockEvents.map((event) => (
                    <Card key={event.id} className="border border-gray-200">
                      <CardContent className="p-4">
                        <div className="flex items-start justify-between mb-2">
                          <div>
                            <h4 className="font-medium">{event.title}</h4>
                            <p className="text-sm text-gray-600">{event.description}</p>
                          </div>
                          <Badge className={
                            event.status === 'upcoming' ? 'bg-blue-100 text-blue-800' :
                            event.status === 'ongoing' ? 'bg-green-100 text-green-800' :
                            'bg-gray-100 text-gray-800'
                          }>
                            {event.status}
                          </Badge>
                        </div>
                        
                        <div className="grid grid-cols-2 gap-4 mb-3 text-sm">
                          <div>
                            <span className="text-gray-600">📅 Date: </span>
                            <span className="font-medium">{event.date}</span>
                          </div>
                          <div>
                            <span className="text-gray-600">🕐 Time: </span>
                            <span className="font-medium">{event.time}</span>
                          </div>
                          <div>
                            <span className="text-gray-600">📍 Location: </span>
                            <span className="font-medium">{event.location}</span>
                          </div>
                          <div>
                            <span className="text-gray-600">👥 Participants: </span>
                            <span className="font-medium">{event.participants}</span>
                          </div>
                        </div>
                        
                        <div className="flex items-center justify-between">
                          <div className="text-sm">
                            <span className="text-gray-600">Organizer: </span>
                            <span className="font-medium">{event.organizer}</span>
                          </div>
                          <div className="flex gap-2">
                            <Button variant="outline" size="sm">
                              Edit
                            </Button>
                            <Button variant="outline" size="sm">
                              View Details
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="reports" className="space-y-6">
          <Card className="shadow-blue-green border-0" style={{ background: 'rgba(255, 255, 255, 0.9)' }}>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>{language === 'en' ? 'Reports & Documents' : 'रिपोर्ट और दस्तावेज़'}</CardTitle>
                <Button className="bg-blue-green-gradient hover:opacity-90">
                  <FileText className="w-4 h-4 mr-2" />
                  {language === 'en' ? 'Generate Report' : 'रिपोर्ट बनाएं'}
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <Button variant="outline" className="h-16 flex flex-col gap-2">
                    <FileText className="w-5 h-5" />
                    <span className="text-sm">Daily Report</span>
                  </Button>
                  <Button variant="outline" className="h-16 flex flex-col gap-2">
                    <BarChart3 className="w-5 h-5" />
                    <span className="text-sm">Analytics Report</span>
                  </Button>
                  <Button variant="outline" className="h-16 flex flex-col gap-2">
                    <Users className="w-5 h-5" />
                    <span className="text-sm">Staff Report</span>
                  </Button>
                  <Button variant="outline" className="h-16 flex flex-col gap-2">
                    <Star className="w-5 h-5" />
                    <span className="text-sm">Feedback Report</span>
                  </Button>
                </div>

                <div className="space-y-3">
                  <h4 className="font-medium">{language === 'en' ? 'Recent Reports' : 'हाल की रिपोर्ट'}</h4>
                  {reportsData.map((report, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                          <FileText className="w-5 h-5 text-blue-600" />
                        </div>
                        <div>
                          <p className="font-medium">{report.name}</p>
                          <p className="text-sm text-gray-600">{report.date} • {report.size}</p>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm">
                          Download
                        </Button>
                        <Button variant="outline" size="sm">
                          Share
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-6">
          <div className="grid grid-cols-1 gap-6">
            <Card className="shadow-blue-green border-0" style={{ background: 'rgba(255, 255, 255, 0.9)' }}>
              <CardHeader>
                <CardTitle>{language === 'en' ? 'Performance Trends' : 'प्रदर्शन रुझान'}</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={issuesData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="reported" fill="#0EA5E9" name="Reported" />
                    <Bar dataKey="resolved" fill="#10B981" name="Resolved" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card className="shadow-blue-green border-0" style={{ background: 'rgba(255, 255, 255, 0.9)' }}>
              <CardHeader>
                <CardTitle>{language === 'en' ? 'Issue Categories Distribution' : 'मुद्दा श्रेणी वितरण'}</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={categoryData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                      label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    >
                      {categoryData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card className="shadow-blue-green border-0" style={{ background: 'rgba(255, 255, 255, 0.9)' }}>
              <CardHeader>
                <CardTitle>{language === 'en' ? 'Citizen Satisfaction Trend' : 'नागरिक संतुष्टि प्रवृत्ति'}</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={200}>
                  <LineChart data={issuesData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis domain={[80, 100]} />
                    <Tooltip />
                    <Line dataKey="satisfaction" stroke="#F59E0B" strokeWidth={3} name="Satisfaction %" />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}