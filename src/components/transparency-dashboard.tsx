import { TrendingUp, AlertTriangle, CheckCircle, Clock } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Progress } from './ui/progress';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer, PieChart, Pie, Cell, Legend } from 'recharts';

interface TransparencyDashboardProps {
  language: 'en' | 'hi';
}

const categoryData = [
  { name: 'Road', issues: 45, resolved: 32, pending: 13 },
  { name: 'Water', issues: 32, resolved: 28, pending: 4 },
  { name: 'Garbage', issues: 28, resolved: 18, pending: 10 },
  { name: 'Electricity', issues: 15, resolved: 12, pending: 3 },
  { name: 'Other', issues: 12, resolved: 8, pending: 4 }
];

const statusData = [
  { name: 'Resolved', value: 98, color: '#34C759' },
  { name: 'In Progress', value: 24, color: '#1D9BF0' },
  { name: 'Pending', value: 34, color: '#FF9500' }
];

const monthlyData = [
  { month: 'Jan', issues: 45, resolved: 40 },
  { month: 'Feb', issues: 52, resolved: 48 },
  { month: 'Mar', issues: 38, resolved: 35 },
  { month: 'Apr', issues: 61, resolved: 58 },
  { month: 'May', issues: 55, resolved: 52 },
  { month: 'Jun', issues: 48, resolved: 45 }
];

export function TransparencyDashboard({ language }: TransparencyDashboardProps) {
  const text = {
    en: {
      title: 'Transparency Dashboard',
      subtitle: 'Track community issues and government response',
      totalIssues: 'Total Issues',
      resolvedPercentage: 'Resolved Rate',
      pendingIssues: 'Pending Issues',
      avgResponseTime: 'Avg Response Time',
      categoryBreakdown: 'Issues by Category',
      statusDistribution: 'Status Distribution',
      monthlyTrend: 'Monthly Trend',
      resolutionRate: 'Resolution Rate',
      categories: {
        Road: 'Road & Infrastructure',
        Water: 'Water & Drainage',
        Garbage: 'Garbage & Sanitation',
        Electricity: 'Electricity',
        Other: 'Other'
      },
      statuses: {
        Resolved: 'Resolved',
        'In Progress': 'In Progress',
        Pending: 'Pending'
      },
      days: 'days',
      issues: 'issues',
      resolved: 'resolved'
    },
    hi: {
      title: 'पारदर्शिता डैशबोर्ड',
      subtitle: 'सामुदायिक मुद्दों और सरकारी प्रतिक्रिया को ट्रैक करें',
      totalIssues: 'कुल मुद्दे',
      resolvedPercentage: 'हल दर',
      pendingIssues: 'लंबित मुद्दे',
      avgResponseTime: 'औसत प्रतिक्रिया समय',
      categoryBreakdown: 'श्रेणी के अनुसार मुद्दे',
      statusDistribution: 'स्थिति वितरण',
      monthlyTrend: 'मासिक प्रवृत्ति',
      resolutionRate: 'समाधान दर',
      categories: {
        Road: 'सड़क और बुनियादी ढांचा',
        Water: 'पानी और जल निकासी',
        Garbage: 'कचरा और स्वच्छता',
        Electricity: 'बिजली',
        Other: 'अन्य'
      },
      statuses: {
        Resolved: 'हल किया गया',
        'In Progress': 'प्रगति में',
        Pending: 'लंबित'
      },
      days: 'दिन',
      issues: 'मुद्दे',
      resolved: 'हल किया गया'
    }
  };

  const t = text[language];

  const totalIssues = categoryData.reduce((sum, cat) => sum + cat.issues, 0);
  const totalResolved = categoryData.reduce((sum, cat) => sum + cat.resolved, 0);
  const totalPending = categoryData.reduce((sum, cat) => sum + cat.pending, 0);
  const resolutionRate = Math.round((totalResolved / totalIssues) * 100);

  return (
    <div className="space-y-6 pb-20">
      {/* Header */}
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-900">{t.title}</h2>
        <p className="text-gray-600 text-sm mt-1">{t.subtitle}</p>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-2 gap-4">
        <Card className="border-0 shadow-blue-green backdrop-blur-sm transform hover:scale-105 transition-all duration-200" style={{
          background: 'rgba(255, 255, 255, 0.9)'
        }}>
          <CardContent className="p-4 text-center">
            <div className="flex items-center justify-center mb-2">
              <TrendingUp className="w-6 h-6 text-sky-600 mr-2" />
              <span className="text-2xl font-bold text-sky-600">{totalIssues}</span>
            </div>
            <p className="text-sm text-gray-600">{t.totalIssues}</p>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-blue-green backdrop-blur-sm transform hover:scale-105 transition-all duration-200" style={{
          background: 'rgba(255, 255, 255, 0.9)'
        }}>
          <CardContent className="p-4 text-center">
            <div className="flex items-center justify-center mb-2">
              <CheckCircle className="w-6 h-6 text-emerald-600 mr-2" />
              <span className="text-2xl font-bold text-emerald-600">{resolutionRate}%</span>
            </div>
            <p className="text-sm text-gray-600">{t.resolvedPercentage}</p>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-blue-green backdrop-blur-sm transform hover:scale-105 transition-all duration-200" style={{
          background: 'rgba(255, 255, 255, 0.9)'
        }}>
          <CardContent className="p-4 text-center">
            <div className="flex items-center justify-center mb-2">
              <AlertTriangle className="w-6 h-6 text-cyan-600 mr-2" />
              <span className="text-2xl font-bold text-cyan-600">{totalPending}</span>
            </div>
            <p className="text-sm text-gray-600">{t.pendingIssues}</p>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-blue-green backdrop-blur-sm transform hover:scale-105 transition-all duration-200" style={{
          background: 'rgba(255, 255, 255, 0.9)'
        }}>
          <CardContent className="p-4 text-center">
            <div className="flex items-center justify-center mb-2">
              <Clock className="w-6 h-6 text-teal-600 mr-2" />
              <span className="text-2xl font-bold text-teal-600">3.2</span>
            </div>
            <p className="text-sm text-gray-600">{t.avgResponseTime} {t.days}</p>
          </CardContent>
        </Card>
      </div>

      {/* Resolution Rate Progress */}
      <Card className="border-0 shadow-blue-green backdrop-blur-sm" style={{
        background: 'rgba(255, 255, 255, 0.9)'
      }}>
        <CardHeader className="pb-3">
          <CardTitle className="text-lg">{t.resolutionRate}</CardTitle>
          <CardDescription>Overall community issue resolution progress</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex justify-between text-sm">
              <span>{t.statuses.Resolved}</span>
              <span>{totalResolved}/{totalIssues}</span>
            </div>
            <Progress value={resolutionRate} className="h-3" />
            <p className="text-xs text-gray-500 text-center">
              {resolutionRate}% of issues have been resolved
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Category Breakdown */}
      <Card className="border-0 shadow-sm">
        <CardHeader className="pb-3">
          <CardTitle className="text-lg">{t.categoryBreakdown}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={categoryData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis 
                  dataKey="name" 
                  tick={{ fontSize: 12 }}
                  angle={-45}
                  textAnchor="end"
                  height={60}
                />
                <YAxis tick={{ fontSize: 12 }} />
                <Bar dataKey="resolved" fill="#34C759" name={t.resolved} />
                <Bar dataKey="pending" fill="#FF9500" name="Pending" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      {/* Status Distribution */}
      <Card className="border-0 shadow-sm">
        <CardHeader className="pb-3">
          <CardTitle className="text-lg">{t.statusDistribution}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-48">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={statusData}
                  cx="50%"
                  cy="50%"
                  innerRadius={40}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {statusData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Legend 
                  verticalAlign="bottom" 
                  height={36}
                  iconType="circle"
                  wrapperStyle={{ fontSize: '12px' }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      {/* Monthly Trend */}
      <Card className="border-0 shadow-sm">
        <CardHeader className="pb-3">
          <CardTitle className="text-lg">{t.monthlyTrend}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-48">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={monthlyData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" tick={{ fontSize: 12 }} />
                <YAxis tick={{ fontSize: 12 }} />
                <Bar dataKey="issues" fill="#1D9BF0" name={t.issues} />
                <Bar dataKey="resolved" fill="#34C759" name={t.resolved} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}