import { useState, useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Switch } from './ui/switch';
import { Label } from './ui/label';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Settings, User, FileText, Bell, Moon, Sun, LogOut, Shield, Briefcase, Phone, Mail, MapPin, Calendar, Edit, Camera, Star, Trophy, Activity } from 'lucide-react';

interface UserProfileProps {
  language: 'en' | 'hi';
  isDark: boolean;
  onToggleDark: () => void;
  userRole: 'user' | 'staff' | 'admin';
  userData: any;
  onLogout: () => void;
}

export function UserProfile({ language, isDark, onToggleDark, userRole, userData, onLogout }: UserProfileProps) {
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [locationEnabled, setLocationEnabled] = useState(true);

  const mockUserIssues = useMemo(() => [
    { id: 1, title: 'Pothole on Main Road', status: 'resolved', date: '2024-03-10', rating: 5 },
    { id: 2, title: 'Street Light Issue', status: 'in-progress', date: '2024-03-14', rating: null },
    { id: 3, title: 'Water Supply Problem', status: 'pending', date: '2024-03-15', rating: null },
  ], []);

  const roleStats = useMemo(() => ({
    user: {
      issuesReported: 12,
      issuesResolved: 8,
      reputation: 85,
      badges: ['Active Reporter', 'Community Helper']
    },
    staff: {
      issuesAssigned: 45,
      issuesCompleted: 38,
      avgRating: 4.7,
      badges: ['Quick Resolver', 'Top Performer']
    },
    admin: {
      totalIssues: 1234,
      totalUsers: 2847,
      systemUptime: '99.9%',
      badges: ['System Admin', 'Community Leader']
    }
  }), []);

  const currentStats = useMemo(() => roleStats[userRole], [roleStats, userRole]);

  const getRoleIcon = useMemo(() => {
    switch (userRole) {
      case 'admin':
        return <Shield className="w-5 h-5 text-red-500" />;
      case 'staff':
        return <Briefcase className="w-5 h-5 text-purple-500" />;
      default:
        return <User className="w-5 h-5 text-blue-500" />;
    }
  }, [userRole]);

  const getRoleTitle = useMemo(() => {
    switch (userRole) {
      case 'admin':
        return language === 'en' ? 'Administrator' : 'प्रशासक';
      case 'staff':
        return language === 'en' ? 'Staff Member' : 'स्टाफ सदस्य';
      default:
        return language === 'en' ? 'Citizen' : 'नागरिक';
    }
  }, [userRole, language]);

  return (
    <div className="space-y-4">
      {/* Profile Header */}
      <Card className="shadow-blue-green border-0" style={{ background: 'rgba(255, 255, 255, 0.9)' }}>
        <CardContent className="p-6">
          <div className="flex items-start space-x-4">
            <div className="relative">
              <Avatar className="w-24 h-24">
                <AvatarImage 
                  src={userData?.profilePhoto || "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx1c2VyJTIwYXZhdGFyJTIwcG9ydHJhaXR8ZW58MXx8fHwxNzU3MzE3Mzk0fDA&ixlib=rb-4.1.0&q=80&w=200"} 
                  alt="Profile" 
                />
                <AvatarFallback className="bg-blue-green-gradient text-white text-2xl">
                  {userData?.fullName?.charAt(0) || userData?.name?.charAt(0) || 'U'}
                </AvatarFallback>
              </Avatar>
              <Button 
                size="sm" 
                variant="secondary" 
                className="absolute -bottom-2 -right-2 rounded-full w-8 h-8 p-0 bg-white border-2 border-blue-500"
              >
                <Camera className="w-4 h-4" />
              </Button>
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-2">
                <h2 className="text-xl font-bold">{userData?.fullName || userData?.name || 'User Name'}</h2>
                {getRoleIcon}
              </div>
              <div className="space-y-1 mb-3">
                <div className="flex items-center gap-2 text-gray-600">
                  <Mail className="w-4 h-4" />
                  <span className="text-sm">{userData?.email || 'user@example.com'}</span>
                </div>
                {userData?.phone && (
                  <div className="flex items-center gap-2 text-gray-600">
                    <Phone className="w-4 h-4" />
                    <span className="text-sm">{userData.phone}</span>
                  </div>
                )}
                {userData?.address?.city && (
                  <div className="flex items-center gap-2 text-gray-600">
                    <MapPin className="w-4 h-4" />
                    <span className="text-sm">{userData.address.city}, {userData.address.state}</span>
                  </div>
                )}
                {userData?.registrationDate && (
                  <div className="flex items-center gap-2 text-gray-600">
                    <Calendar className="w-4 h-4" />
                    <span className="text-sm">
                      {language === 'en' ? 'Joined' : 'शामिल हुए'} {new Date(userData.registrationDate).toLocaleDateString(language === 'en' ? 'en-US' : 'hi-IN')}
                    </span>
                  </div>
                )}
              </div>
              <div className="flex items-center gap-2 flex-wrap">
                <Badge className={
                  userRole === 'admin' ? 'bg-red-100 text-red-800' :
                  userRole === 'staff' ? 'bg-purple-100 text-purple-800' :
                  'bg-blue-100 text-blue-800'
                }>
                  {getRoleTitle}
                </Badge>
                {userData?.emailVerified && (
                  <Badge variant="secondary" className="bg-green-100 text-green-800">
                    ✓ {language === 'en' ? 'Verified' : 'सत्यापित'}
                  </Badge>
                )}
                {userRole === 'user' && currentStats &&
                  ("reputation" in currentStats ? (
                    <Badge variant="secondary" className="bg-yellow-100 text-yellow-800">
                      <Star className="w-3 h-3 mr-1" />
                      {currentStats.reputation}
                    </Badge>
                  ) : null)
                }
              </div>
            </div>
          </div>
          
          {userData?.bio && (
            <div className="mt-4 pt-4 border-t">
              <p className="text-gray-700 text-sm leading-relaxed">{userData.bio}</p>
            </div>
          )}
        </CardContent>
      </Card>

      <Tabs defaultValue="profile" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="profile">
            {language === 'en' ? 'Profile' : 'प्रोफ़ाइल'}
          </TabsTrigger>
          <TabsTrigger value="stats">
            {language === 'en' ? 'Stats' : 'आंकड़े'}
          </TabsTrigger>
          <TabsTrigger value="issues">
            {language === 'en' ? 'Issues' : 'मुद्दे'}
          </TabsTrigger>
          <TabsTrigger value="settings">
            {language === 'en' ? 'Settings' : 'सेटिंग्स'}
          </TabsTrigger>
        </TabsList>

        <TabsContent value="profile" className="space-y-4">
          {/* Personal Information */}
          <Card className="shadow-blue-green border-0" style={{ background: 'rgba(255, 255, 255, 0.9)' }}>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <User className="w-5 h-5" />
                  {language === 'en' ? 'Personal Information' : 'व्यक्तिगत जानकारी'}
                </div>
                <Button variant="ghost" size="sm">
                  <Edit className="w-4 h-4" />
                </Button>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 gap-4">
                <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                  <User className="w-5 h-5 text-gray-500" />
                  <div>
                    <p className="text-sm text-gray-600">{language === 'en' ? 'Full Name' : 'पूरा नाम'}</p>
                    <p className="font-medium">{userData?.fullName || userData?.name || 'Not provided'}</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                  <Calendar className="w-5 h-5 text-gray-500" />
                  <div>
                    <p className="text-sm text-gray-600">{language === 'en' ? 'Date of Birth' : 'जन्म तिथि'}</p>
                    <p className="font-medium">{userData?.dateOfBirth || 'Not provided'}</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                  <span className="w-5 h-5 text-center text-gray-500">👤</span>
                  <div>
                    <p className="text-sm text-gray-600">{language === 'en' ? 'Gender' : 'लिंग'}</p>
                    <p className="font-medium">{userData?.gender || 'Not provided'}</p>
                  </div>
                </div>
                
                {userData?.aadharNumber && (
                  <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                    <span className="w-5 h-5 text-center text-gray-500">🆔</span>
                    <div>
                      <p className="text-sm text-gray-600">{language === 'en' ? 'Aadhar Number' : 'आधार संख्या'}</p>
                      <p className="font-medium">**** **** {userData.aadharNumber.slice(-4)}</p>
                    </div>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Contact Information */}
          <Card className="shadow-blue-green border-0" style={{ background: 'rgba(255, 255, 255, 0.9)' }}>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Phone className="w-5 h-5" />
                {language === 'en' ? 'Contact Information' : 'संपर्क जानकारी'}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                <Mail className="w-5 h-5 text-gray-500" />
                <div>
                  <p className="text-sm text-gray-600">{language === 'en' ? 'Email Address' : 'ईमेल पता'}</p>
                  <p className="font-medium">{userData?.email || 'Not provided'}</p>
                  {userData?.emailVerified && (
                    <Badge variant="secondary" className="mt-1 text-xs bg-green-100 text-green-800">
                      ✓ {language === 'en' ? 'Verified' : 'सत्यापित'}
                    </Badge>
                  )}
                </div>
              </div>
              
              <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                <Phone className="w-5 h-5 text-gray-500" />
                <div>
                  <p className="text-sm text-gray-600">{language === 'en' ? 'Phone Number' : 'फोन नंबर'}</p>
                  <p className="font-medium">{userData?.phone || 'Not provided'}</p>
                  {userData?.phoneVerified && (
                    <Badge variant="secondary" className="mt-1 text-xs bg-green-100 text-green-800">
                      ✓ {language === 'en' ? 'Verified' : 'सत्यापित'}
                    </Badge>
                  )}
                </div>
              </div>
              
              {userData?.emergencyContact && (
                <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                  <span className="w-5 h-5 text-center text-gray-500">🚨</span>
                  <div>
                    <p className="text-sm text-gray-600">{language === 'en' ? 'Emergency Contact' : 'आपातकालीन संपर्क'}</p>
                    <p className="font-medium">{userData.emergencyContact}</p>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Address Information */}
          <Card className="shadow-blue-green border-0" style={{ background: 'rgba(255, 255, 255, 0.9)' }}>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MapPin className="w-5 h-5" />
                {language === 'en' ? 'Address Information' : 'पता जानकारी'}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <div className="p-3 bg-gray-50 rounded-lg">
                  <p className="text-sm text-gray-600 mb-1">{language === 'en' ? 'Full Address' : 'पूरा पता'}</p>
                  <p className="font-medium">
                    {userData?.address?.fullAddress || 
                     `${userData?.address?.street || ''} ${userData?.address?.area || ''} ${userData?.address?.city || ''} ${userData?.address?.state || ''} ${userData?.address?.pincode || ''}`.trim() || 
                     'Not provided'}
                  </p>
                </div>
                
                {userData?.address && (
                  <div className="grid grid-cols-2 gap-3">
                    {userData.address.city && (
                      <div className="p-3 bg-blue-50 rounded-lg">
                        <p className="text-sm text-blue-600">{language === 'en' ? 'City' : 'शहर'}</p>
                        <p className="font-medium text-blue-800">{userData.address.city}</p>
                      </div>
                    )}
                    
                    {userData.address.state && (
                      <div className="p-3 bg-green-50 rounded-lg">
                        <p className="text-sm text-green-600">{language === 'en' ? 'State' : 'राज्य'}</p>
                        <p className="font-medium text-green-800">{userData.address.state}</p>
                      </div>
                    )}
                    
                    {userData.address.pincode && (
                      <div className="p-3 bg-purple-50 rounded-lg">
                        <p className="text-sm text-purple-600">{language === 'en' ? 'PIN Code' : 'पिन कोड'}</p>
                        <p className="font-medium text-purple-800">{userData.address.pincode}</p>
                      </div>
                    )}
                    
                    {userData.address.district && (
                      <div className="p-3 bg-orange-50 rounded-lg">
                        <p className="text-sm text-orange-600">{language === 'en' ? 'District' : 'जिला'}</p>
                        <p className="font-medium text-orange-800">{userData.address.district}</p>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Account Information */}
          <Card className="shadow-blue-green border-0" style={{ background: 'rgba(255, 255, 255, 0.9)' }}>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Activity className="w-5 h-5" />
                {language === 'en' ? 'Account Information' : 'खाता जानकारी'}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 gap-3">
                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div>
                    <p className="text-sm text-gray-600">{language === 'en' ? 'Member Since' : 'सदस्य बनने की तारीख'}</p>
                    <p className="font-medium">
                      {userData?.registrationDate ? 
                        new Date(userData.registrationDate).toLocaleDateString(language === 'en' ? 'en-US' : 'hi-IN') : 
                        'Not available'}
                    </p>
                  </div>
                  <Badge variant="secondary" className="bg-blue-100 text-blue-800">
                    {getRoleTitle}
                  </Badge>
                </div>
                
                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div>
                    <p className="text-sm text-gray-600">{language === 'en' ? 'Account Status' : 'खाता स्थिति'}</p>
                    <p className="font-medium">{language === 'en' ? 'Active' : 'सक्रिय'}</p>
                  </div>
                  <Badge variant="secondary" className="bg-green-100 text-green-800">
                    ✓ {language === 'en' ? 'Verified' : 'सत्यापित'}
                  </Badge>
                </div>

                {userData?.bio && (
                  <div className="p-3 bg-gray-50 rounded-lg">
                    <p className="text-sm text-gray-600 mb-1">{language === 'en' ? 'Bio' : 'बायो'}</p>
                    <p className="font-medium">{userData.bio}</p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="stats" className="space-y-4">
          <Card className="shadow-blue-green border-0" style={{ background: 'rgba(255, 255, 255, 0.9)' }}>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                {getRoleIcon}
                {language === 'en' ? 'Performance Stats' : 'प्रदर्शन आंकड़े'}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4">
                {userRole === 'user' && currentStats && (
                  <>
                    {'issuesReported' in currentStats ? (
                      <div className="text-center p-4 bg-blue-50 rounded-lg">
                        <p className="text-2xl font-bold text-blue-600">{currentStats.issuesReported || 0}</p>
                        <p className="text-sm text-blue-800">Issues Reported</p>
                      </div>
                    ) : null}
                    {'issuesResolved' in currentStats ? (
                      <div className="text-center p-4 bg-green-50 rounded-lg">
                        <p className="text-2xl font-bold text-green-600">{currentStats.issuesResolved || 0}</p>
                        <p className="text-sm text-green-800">Issues Resolved</p>
                      </div>
                    ) : null}
                  </>
                )}
                {userRole === 'staff' && currentStats && (
                  <>
                    {'issuesAssigned' in currentStats ? (
                      <div className="text-center p-4 bg-purple-50 rounded-lg">
                        <p className="text-2xl font-bold text-purple-600">{currentStats.issuesAssigned || 0}</p>
                        <p className="text-sm text-purple-800">Issues Assigned</p>
                      </div>
                    ) : null}
                    {'issuesCompleted' in currentStats ? (
                      <div className="text-center p-4 bg-green-50 rounded-lg">
                        <p className="text-2xl font-bold text-green-600">{currentStats.issuesCompleted || 0}</p>
                        <p className="text-sm text-green-800">Issues Completed</p>
                      </div>
                    ) : null}
                  </>
                )}
                {userRole === 'admin' && currentStats && (
                  <>
                    {'totalIssues' in currentStats ? (
                      <div className="text-center p-4 bg-red-50 rounded-lg">
                        <p className="text-2xl font-bold text-red-600">{currentStats.totalIssues || 0}</p>
                        <p className="text-sm text-red-800">Total Issues</p>
                      </div>
                    ) : null}
                    {'totalUsers' in currentStats ? (
                      <div className="text-center p-4 bg-blue-50 rounded-lg">
                        <p className="text-2xl font-bold text-blue-600">{currentStats.totalUsers || 0}</p>
                        <p className="text-sm text-blue-800">Total Users</p>
                      </div>
                    ) : null}
                  </>
                )}
              </div>
              
              {/* Additional Role-specific Stats */}
              <div className="mt-4 grid grid-cols-2 gap-4">
                {userRole === 'user' && currentStats && (
                  <>
                    {'reputation' in currentStats ? (
                      <div className="text-center p-4 bg-orange-50 rounded-lg">
                        <p className="text-2xl font-bold text-orange-600">{currentStats.reputation || 0}</p>
                        <p className="text-sm text-orange-800">Reputation Score</p>
                      </div>
                    ) : null}
                    {'issuesReported' in currentStats && 'issuesResolved' in currentStats ? (
                      <div className="text-center p-4 bg-cyan-50 rounded-lg">
                        <p className="text-2xl font-bold text-cyan-600">
                          {currentStats.issuesReported && currentStats.issuesResolved ? 
                            Math.round((currentStats.issuesResolved / currentStats.issuesReported) * 100) : 0}%
                        </p>
                        <p className="text-sm text-cyan-800">Success Rate</p>
                      </div>
                    ) : null}
                  </>
                )}
                {userRole === 'staff' && currentStats && (
                  <>
                    {'avgRating' in currentStats ? (
                      <div className="text-center p-4 bg-yellow-50 rounded-lg">
                        <p className="text-2xl font-bold text-yellow-600">{currentStats.avgRating || 0}</p>
                        <p className="text-sm text-yellow-800">Avg Rating</p>
                      </div>
                    ) : null}
                    {'issuesAssigned' in currentStats && 'issuesCompleted' in currentStats ? (
                      <div className="text-center p-4 bg-cyan-50 rounded-lg">
                        <p className="text-2xl font-bold text-cyan-600">
                          {currentStats.issuesAssigned && currentStats.issuesCompleted ? 
                            Math.round((currentStats.issuesCompleted / currentStats.issuesAssigned) * 100) : 0}%
                        </p>
                        <p className="text-sm text-cyan-800">Completion Rate</p>
                      </div>
                    ) : null}
                  </>
                )}
                {userRole === 'admin' && currentStats && (
                  <>
                    {'systemUptime' in currentStats ? (
                      <div className="text-center p-4 bg-green-50 rounded-lg">
                        <p className="text-2xl font-bold text-green-600">{currentStats.systemUptime || '0%'}</p>
                        <p className="text-sm text-green-800">System Uptime</p>
                      </div>
                    ) : null}
                    {'totalUsers' in currentStats && 'totalIssues' in currentStats ? (
                      <div className="text-center p-4 bg-cyan-50 rounded-lg">
                        <p className="text-2xl font-bold text-cyan-600">
                          {currentStats.totalUsers && currentStats.totalIssues ? 
                            Math.round((currentStats.totalIssues / currentStats.totalUsers) * 100) / 100 : 0}
                        </p>
                        <p className="text-sm text-cyan-800">Issues per User</p>
                      </div>
                    ) : null}
                  </>
                )}
              </div>

              {/* Badges */}
              <div className="mt-6">
                <h4 className="font-medium mb-3">{language === 'en' ? 'Achievements' : 'उपलब्धियाँ'}</h4>
                <div className="flex flex-wrap gap-2">
                  {currentStats?.badges?.map((badge, index) => (
                    <Badge key={index} variant="secondary" className="bg-yellow-100 text-yellow-800">
                      🏆 {badge}
                    </Badge>
                  )) || null}
                </div>
              </div>

              {/* Recent Activity Summary */}
              <div className="mt-6">
                <h4 className="font-medium mb-3">{language === 'en' ? 'Recent Activity' : 'हाल की गतिविधि'}</h4>
                <div className="space-y-2">
                  <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                    <div className="flex items-center gap-2">
                      <Activity className="w-4 h-4 text-blue-600" />
                      <span className="text-sm text-blue-800">
                        {language === 'en' ? 'Last Active' : 'अंतिम सक्रियता'}
                      </span>
                    </div>
                    <span className="text-sm font-medium text-blue-600">
                      {language === 'en' ? 'Today' : 'आज'}
                    </span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                    <div className="flex items-center gap-2">
                      <Trophy className="w-4 h-4 text-green-600" />
                      <span className="text-sm text-green-800">
                        {language === 'en' ? 'Points Earned This Month' : 'इस महीने अर्जित अंक'}
                      </span>
                    </div>
                    <span className="text-sm font-medium text-green-600">+250</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="issues" className="space-y-4">
          {/* Issues Summary */}
          <Card className="shadow-blue-green border-0" style={{ background: 'rgba(255, 255, 255, 0.9)' }}>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="w-5 h-5" />
                {language === 'en' ? 'Issues Overview' : 'मुद्दों का विवरण'}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-3 gap-4 mb-4">
                <div className="text-center p-3 bg-yellow-50 rounded-lg">
                  <p className="text-lg font-bold text-yellow-600">
                    {mockUserIssues.filter(i => i.status === 'pending').length}
                  </p>
                  <p className="text-xs text-yellow-800">{language === 'en' ? 'Pending' : 'लंबित'}</p>
                </div>
                <div className="text-center p-3 bg-blue-50 rounded-lg">
                  <p className="text-lg font-bold text-blue-600">
                    {mockUserIssues.filter(i => i.status === 'in-progress').length}
                  </p>
                  <p className="text-xs text-blue-800">{language === 'en' ? 'In Progress' : 'प्रगति में'}</p>
                </div>
                <div className="text-center p-3 bg-green-50 rounded-lg">
                  <p className="text-lg font-bold text-green-600">
                    {mockUserIssues.filter(i => i.status === 'resolved').length}
                  </p>
                  <p className="text-xs text-green-800">{language === 'en' ? 'Resolved' : 'हल किया गया'}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Issues List */}
          <Card className="shadow-blue-green border-0" style={{ background: 'rgba(255, 255, 255, 0.9)' }}>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <FileText className="w-5 h-5" />
                  {language === 'en' ? 'Recent Issues' : 'हाल के मुद्दे'}
                </div>
                <Button variant="outline" size="sm">
                  {language === 'en' ? 'View All' : 'सभी देखें'}
                </Button>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {mockUserIssues.map((issue) => (
                  <div key={issue.id} className="p-4 bg-gray-50 rounded-lg border-l-4 border-l-blue-500">
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex-1">
                        <h4 className="font-medium text-gray-900 mb-1">{issue.title}</h4>
                        <div className="flex items-center gap-4 text-sm text-gray-600">
                          <span className="flex items-center gap-1">
                            <Calendar className="w-3 h-3" />
                            {issue.date}
                          </span>
                          <span className="flex items-center gap-1">
                            <MapPin className="w-3 h-3" />
                            {language === 'en' ? 'Near City Center' : 'शहर केंद्र के पास'}
                          </span>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge 
                          className={
                            issue.status === 'pending' ? 'status-pending' :
                            issue.status === 'in-progress' ? 'status-in-progress' :
                            'status-resolved'
                          }
                        >
                          {issue.status === 'pending' ? (language === 'en' ? 'Pending' : 'लंबित') :
                           issue.status === 'in-progress' ? (language === 'en' ? 'In Progress' : 'प्रगति में') :
                           (language === 'en' ? 'Resolved' : 'हल किया गया')}
                        </Badge>
                      </div>
                    </div>
                    
                    {issue.rating && (
                      <div className="flex items-center justify-between mt-3 pt-3 border-t border-gray-200">
                        <span className="text-sm text-gray-600">
                          {language === 'en' ? 'Your Rating:' : 'आपकी रेटिंग:'}
                        </span>
                        <div className="flex items-center gap-1">
                          {[...Array(5)].map((_, i) => (
                            <Star 
                              key={i} 
                              className={`w-4 h-4 ${i < issue.rating ? 'text-yellow-500 fill-current' : 'text-gray-300'}`} 
                            />
                          ))}
                          <span className="text-sm ml-2 font-medium">{issue.rating}/5</span>
                        </div>
                      </div>
                    )}
                    
                    {issue.status === 'resolved' && !issue.rating && (
                      <div className="mt-3 pt-3 border-t border-gray-200">
                        <Button variant="outline" size="sm" className="w-full">
                          <Star className="w-4 h-4 mr-2" />
                          {language === 'en' ? 'Rate Resolution' : 'समाधान की रेटिंग दें'}
                        </Button>
                      </div>
                    )}
                  </div>
                ))}
              </div>
              
              <div className="mt-4 text-center">
                <Button variant="ghost" className="text-blue-600">
                  {language === 'en' ? 'Load More Issues' : 'और मुद्दे लोड करें'}
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="settings" className="space-y-4">
          <Card className="shadow-blue-green border-0" style={{ background: 'rgba(255, 255, 255, 0.9)' }}>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Settings className="w-5 h-5" />
                {language === 'en' ? 'App Settings' : 'ऐप सेटिंग्स'}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  {isDark ? <Moon className="w-5 h-5" /> : <Sun className="w-5 h-5" />}
                  <Label htmlFor="dark-mode">
                    {language === 'en' ? 'Dark Mode' : 'डार्क मोड'}
                  </Label>
                </div>
                <Switch
                  id="dark-mode"
                  checked={isDark}
                  onCheckedChange={onToggleDark}
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <Bell className="w-5 h-5" />
                  <Label htmlFor="notifications">
                    {language === 'en' ? 'Push Notifications' : 'पुश नोटिफिकेशन'}
                  </Label>
                </div>
                <Switch
                  id="notifications"
                  checked={notificationsEnabled}
                  onCheckedChange={setNotificationsEnabled}
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <span className="w-5 h-5 text-center">📍</span>
                  <Label htmlFor="location">
                    {language === 'en' ? 'Location Services' : 'स्थान सेवाएं'}
                  </Label>
                </div>
                <Switch
                  id="location"
                  checked={locationEnabled}
                  onCheckedChange={setLocationEnabled}
                />
              </div>

              <div className="pt-4 border-t">
                <p className="text-sm text-gray-600 mb-4">
                  {language === 'en' ? 'Account Actions' : 'खाता कार्य'}
                </p>
                <div className="space-y-2">
                  <Button variant="outline" className="w-full justify-start">
                    🔄 {language === 'en' ? 'Sync Data' : 'डेटा सिंक करें'}
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    📱 {language === 'en' ? 'App Version: 1.0.0' : 'ऐप संस्करण: 1.0.0'}
                  </Button>
                  <Button 
                    variant="destructive" 
                    className="w-full justify-start"
                    onClick={onLogout}
                  >
                    <LogOut className="w-4 h-4 mr-2" />
                    {language === 'en' ? 'Logout' : 'लॉगआउट'}
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