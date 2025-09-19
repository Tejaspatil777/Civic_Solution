import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Badge } from './ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './ui/table';
import { Textarea } from './ui/textarea';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog';
import { Label } from './ui/label';
import { FileText, Clock, CheckCircle, AlertTriangle, Users, MapPin, MessageSquare } from 'lucide-react';

interface StaffDashboardProps {
  language: 'en' | 'hi';
}

export function StaffDashboard({ language }: StaffDashboardProps) {
  const [activeTab, setActiveTab] = useState('assigned');

  const staffStats = [
    { title: 'Assigned Issues', value: '24', icon: FileText, color: 'bg-blue-500' },
    { title: 'In Progress', value: '8', icon: Clock, color: 'bg-yellow-500' },
    { title: 'Completed Today', value: '3', icon: CheckCircle, color: 'bg-green-500' },
    { title: 'High Priority', value: '5', icon: AlertTriangle, color: 'bg-red-500' },
  ];

  const assignedIssues = [
    { 
      id: 1, 
      title: 'Pothole on MG Road', 
      category: 'Roads', 
      status: 'pending', 
      priority: 'high', 
      reporter: 'Rahul Sharma', 
      date: '2024-03-15', 
      location: 'MG Road, Sector 12',
      description: 'Large pothole causing traffic issues and vehicle damage.',
      estimatedTime: '2-3 days'
    },
    { 
      id: 2, 
      title: 'Water Supply Disruption', 
      category: 'Water', 
      status: 'in-progress', 
      priority: 'medium', 
      reporter: 'Priya Patel', 
      date: '2024-03-14', 
      location: 'Block A, Residential Area',
      description: 'No water supply for the past 12 hours in the residential block.',
      estimatedTime: '1 day'
    },
    { 
      id: 3, 
      title: 'Street Light Malfunction', 
      category: 'Electricity', 
      status: 'pending', 
      priority: 'low', 
      reporter: 'Amit Kumar', 
      date: '2024-03-13', 
      location: 'Park Street, Near Community Center',
      description: 'Multiple street lights not working, affecting night visibility.',
      estimatedTime: '1-2 days'
    },
    { 
      id: 4, 
      title: 'Garbage Collection Missed', 
      category: 'Sanitation', 
      status: 'pending', 
      priority: 'medium', 
      reporter: 'Sneha Singh', 
      date: '2024-03-12', 
      location: 'Lane 5, Housing Society',
      description: 'Garbage not collected for 3 days, creating unhygienic conditions.',
      estimatedTime: '1 day'
    },
  ];

  const completedIssues = [
    { 
      id: 5, 
      title: 'Traffic Signal Repair', 
      category: 'Traffic', 
      status: 'resolved', 
      priority: 'high', 
      reporter: 'Vikash Gupta', 
      date: '2024-03-10', 
      completedDate: '2024-03-12',
      location: 'Main Intersection, City Center'
    },
    { 
      id: 6, 
      title: 'Park Cleaning', 
      category: 'Sanitation', 
      status: 'resolved', 
      priority: 'low', 
      reporter: 'Maya Sharma', 
      date: '2024-03-08', 
      completedDate: '2024-03-11',
      location: 'Central Park, Zone 3'
    },
  ];

  const updateIssueStatus = (issueId: number, newStatus: string) => {
    // Mock update function
    console.log(`Updating issue ${issueId} to status: ${newStatus}`);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-blue-green-gradient">
            {language === 'en' ? 'Staff Dashboard' : 'स्टाफ डैशबोर्ड'}
          </h1>
          <p className="text-gray-600">
            {language === 'en' ? 'Manage and resolve assigned civic issues' : 'असाइन किए गए नागरिक मुद्दों का प्रबंधन और समाधान करें'}
          </p>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 gap-4">
        {staffStats.map((stat, index) => (
          <Card key={index} className="shadow-blue-green border-0" style={{ background: 'rgba(255, 255, 255, 0.9)' }}>
            <CardContent className="p-4">
              <div className="flex items-center space-x-3">
                <div className={`w-12 h-12 rounded-lg ${stat.color} flex items-center justify-center`}>
                  <stat.icon className="w-6 h-6 text-white" />
                </div>
                <div>
                  <p className="text-2xl font-bold">{stat.value}</p>
                  <p className="text-sm text-gray-600">{stat.title}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="assigned" className="flex items-center gap-2">
            <FileText className="w-4 h-4" />
            {language === 'en' ? 'Assigned' : 'असाइन्ड'}
          </TabsTrigger>
          <TabsTrigger value="completed" className="flex items-center gap-2">
            <CheckCircle className="w-4 h-4" />
            {language === 'en' ? 'Completed' : 'पूर्ण'}
          </TabsTrigger>
          <TabsTrigger value="reports" className="flex items-center gap-2">
            <Users className="w-4 h-4" />
            {language === 'en' ? 'Reports' : 'रिपोर्ट'}
          </TabsTrigger>
        </TabsList>

        <TabsContent value="assigned" className="space-y-4">
          <Card className="shadow-blue-green border-0" style={{ background: 'rgba(255, 255, 255, 0.9)' }}>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>{language === 'en' ? 'Assigned Issues' : 'असाइन किए गए मुद्दे'}</CardTitle>
                <div className="flex gap-2">
                  <Select>
                    <SelectTrigger className="w-32">
                      <SelectValue placeholder="Priority" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All</SelectItem>
                      <SelectItem value="high">High</SelectItem>
                      <SelectItem value="medium">Medium</SelectItem>
                      <SelectItem value="low">Low</SelectItem>
                    </SelectContent>
                  </Select>
                  <Select>
                    <SelectTrigger className="w-32">
                      <SelectValue placeholder="Category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All</SelectItem>
                      <SelectItem value="roads">Roads</SelectItem>
                      <SelectItem value="water">Water</SelectItem>
                      <SelectItem value="electricity">Electricity</SelectItem>
                      <SelectItem value="sanitation">Sanitation</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {assignedIssues.map((issue) => (
                  <Card key={issue.id} className="border border-gray-200">
                    <CardContent className="p-4">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <h3 className="font-semibold">{issue.title}</h3>
                            <Badge variant="outline">{issue.category}</Badge>
                            <Badge 
                              className={
                                issue.status === 'pending' ? 'status-pending' :
                                issue.status === 'in-progress' ? 'status-in-progress' :
                                'status-resolved'
                              }
                            >
                              {issue.status}
                            </Badge>
                            <Badge variant={issue.priority === 'high' ? 'destructive' : issue.priority === 'medium' ? 'default' : 'secondary'}>
                              {issue.priority}
                            </Badge>
                          </div>
                          <div className="flex items-center gap-4 text-sm text-gray-600 mb-2">
                            <span className="flex items-center gap-1">
                              <Users className="w-4 h-4" />
                              {issue.reporter}
                            </span>
                            <span className="flex items-center gap-1">
                              <MapPin className="w-4 h-4" />
                              {issue.location}
                            </span>
                            <span>{issue.date}</span>
                          </div>
                          <p className="text-sm text-gray-700 mb-3">{issue.description}</p>
                          <p className="text-sm text-blue-600">
                            <Clock className="w-4 h-4 inline mr-1" />
                            Est. completion: {issue.estimatedTime}
                          </p>
                        </div>
                      </div>
                      <div className="flex gap-2 mt-4">
                        {issue.status === 'pending' && (
                          <Button 
                            size="sm" 
                            className="bg-blue-600 hover:bg-blue-700"
                            onClick={() => updateIssueStatus(issue.id, 'in-progress')}
                          >
                            Start Work
                          </Button>
                        )}
                        {issue.status === 'in-progress' && (
                          <Button 
                            size="sm" 
                            className="bg-green-600 hover:bg-green-700"
                            onClick={() => updateIssueStatus(issue.id, 'resolved')}
                          >
                            Mark Complete
                          </Button>
                        )}
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button variant="outline" size="sm">
                              <MessageSquare className="w-4 h-4 mr-1" />
                              Update
                            </Button>
                          </DialogTrigger>
                          <DialogContent className="max-w-md">
                            <DialogHeader>
                              <DialogTitle>Update Issue Status</DialogTitle>
                              <DialogDescription>
                                Add progress notes and update the status of this issue.
                              </DialogDescription>
                            </DialogHeader>
                            <div className="space-y-4">
                              <div>
                                <Label htmlFor="status">Status</Label>
                                <Select defaultValue={issue.status}>
                                  <SelectTrigger>
                                    <SelectValue />
                                  </SelectTrigger>
                                  <SelectContent>
                                    <SelectItem value="pending">Pending</SelectItem>
                                    <SelectItem value="in-progress">In Progress</SelectItem>
                                    <SelectItem value="resolved">Resolved</SelectItem>
                                  </SelectContent>
                                </Select>
                              </div>
                              <div>
                                <Label htmlFor="notes">Progress Notes</Label>
                                <Textarea 
                                  id="notes" 
                                  placeholder="Add details about the work progress..."
                                  className="min-h-24"
                                />
                              </div>
                              <div>
                                <Label htmlFor="photos">Upload Photos (Optional)</Label>
                                <Input type="file" accept="image/*" multiple />
                                <p className="text-xs text-gray-500 mt-1">Upload progress photos or completion evidence</p>
                              </div>
                              <Button className="w-full bg-blue-green-gradient hover:opacity-90">
                                Update Issue
                              </Button>
                            </div>
                          </DialogContent>
                        </Dialog>
                        <Button variant="outline" size="sm">
                          <MapPin className="w-4 h-4 mr-1" />
                          Navigate
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="completed" className="space-y-4">
          <Card className="shadow-blue-green border-0" style={{ background: 'rgba(255, 255, 255, 0.9)' }}>
            <CardHeader>
              <CardTitle>{language === 'en' ? 'Completed Issues' : 'पूर्ण किए गए मुद्दे'}</CardTitle>
              <CardDescription>
                {language === 'en' ? 'Issues you have successfully resolved' : 'आपके द्वारा सफलतापूर्वक हल किए गए मुद्दे'}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Issue</TableHead>
                    <TableHead>Category</TableHead>
                    <TableHead>Completed</TableHead>
                    <TableHead>Rating</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {completedIssues.map((issue) => (
                    <TableRow key={issue.id}>
                      <TableCell>
                        <div>
                          <p className="font-medium">{issue.title}</p>
                          <p className="text-sm text-gray-600">{issue.location}</p>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline">{issue.category}</Badge>
                      </TableCell>
                      <TableCell>{issue.completedDate}</TableCell>
                      <TableCell>
                        <div className="flex items-center">
                          <span className="text-yellow-500">★★★★★</span>
                          <span className="ml-1 text-sm text-gray-600">(4.8)</span>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="reports" className="space-y-4">
          <Card className="shadow-blue-green border-0" style={{ background: 'rgba(255, 255, 255, 0.9)' }}>
            <CardHeader>
              <CardTitle>{language === 'en' ? 'Work Reports' : 'कार्य रिपोर्ट'}</CardTitle>
              <CardDescription>
                {language === 'en' ? 'Generate and view your work performance reports' : 'अपने कार्य प्रदर्शन रिपोर्ट उत्पन्न करें और देखें'}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <Card className="p-4 bg-blue-50 border-blue-200">
                    <div className="text-center">
                      <p className="text-2xl font-bold text-blue-600">24</p>
                      <p className="text-sm text-blue-800">Issues Resolved This Month</p>
                    </div>
                  </Card>
                  <Card className="p-4 bg-green-50 border-green-200">
                    <div className="text-center">
                      <p className="text-2xl font-bold text-green-600">4.7</p>
                      <p className="text-sm text-green-800">Average Rating</p>
                    </div>
                  </Card>
                </div>
                
                <div className="space-y-2">
                  <Button variant="outline" className="w-full justify-start">
                    📊 Monthly Performance Report
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    📈 Issue Resolution Trends
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    📋 Work Summary Report
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    ⭐ Citizen Feedback Report
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}