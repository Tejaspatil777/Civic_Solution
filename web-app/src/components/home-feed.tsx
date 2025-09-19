import { useState } from 'react';
import { Heart, ThumbsUp, MessageCircle, MapPin, MoreVertical } from 'lucide-react';
import { Card, CardContent } from './ui/card';
import { Badge } from './ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Button } from './ui/button';
import { ImageWithFallback } from './figma/ImageWithFallback';

const mockIssues = [
  {
    id: 1,
    user: { name: 'Priya Sharma', avatar: '', location: 'Sector 15, Noida' },
    title: 'Large pothole causing traffic issues',
    description: 'This pothole has been growing for weeks and is now causing major traffic problems during rush hours.',
    image: 'https://images.unsplash.com/photo-1723000933593-837fea88aeae?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwb3Rob2xlJTIwcm9hZCUyMGluZnJhc3RydWN0dXJlfGVufDF8fHx8MTc1NzMxNzM5N3ww&ixlib=rb-4.1.0&q=80&w=1080',
    tags: ['#Pothole', '#Road'],
    status: 'pending',
    likes: 23,
    upvotes: 45,
    comments: 8,
    timestamp: '2 hours ago'
  },
  {
    id: 2,
    user: { name: 'Rajesh Kumar', avatar: '', location: 'MG Road, Bengaluru' },
    title: 'Garbage not collected for 3 days',
    description: 'The garbage collection has been irregular in our area. This is causing hygiene issues.',
    image: 'https://images.unsplash.com/photo-1574676039880-73da8368f0eb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxnYXJiYWdlJTIwd2FzdGUlMjBzdHJlZXR8ZW58MXx8fHwxNzU3MzE3Mzk5fDA&ixlib=rb-4.1.0&q=80&w=1080',
    tags: ['#Garbage', '#Sanitation'],
    status: 'in-progress',
    likes: 15,
    upvotes: 32,
    comments: 5,
    timestamp: '4 hours ago'
  },
  {
    id: 3,
    user: { name: 'Anjali Gupta', avatar: '', location: 'CP, New Delhi' },
    title: 'Water pipe burst on main road',
    description: 'Major water pipe burst causing flooding and traffic disruption. Immediate attention needed.',
    image: 'https://images.unsplash.com/photo-1567946174667-988665467d53?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3YXRlciUyMHBpcGUlMjBicm9rZW4lMjBzdHJlZXR8ZW58MXx8fHwxNzU3MzE3NDAyfDA&ixlib=rb-4.1.0&q=80&w=1080',
    tags: ['#Water', '#Emergency'],
    status: 'resolved',
    likes: 67,
    upvotes: 89,
    comments: 12,
    timestamp: '1 day ago'
  }
];

export function HomeFeed() {
  const [likedIssues, setLikedIssues] = useState(new Set());
  const [upvotedIssues, setUpvotedIssues] = useState(new Set());

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'pending':
        return <Badge className="status-pending">Pending</Badge>;
      case 'in-progress':
        return <Badge className="status-in-progress">In Progress</Badge>;
      case 'resolved':
        return <Badge className="status-resolved">Resolved</Badge>;
      default:
        return null;
    }
  };

  const toggleLike = (issueId: number) => {
    setLikedIssues(prev => {
      const newLiked = new Set(prev);
      if (newLiked.has(issueId)) {
        newLiked.delete(issueId);
      } else {
        newLiked.add(issueId);
      }
      return newLiked;
    });
  };

  const toggleUpvote = (issueId: number) => {
    setUpvotedIssues(prev => {
      const newUpvoted = new Set(prev);
      if (newUpvoted.has(issueId)) {
        newUpvoted.delete(issueId);
      } else {
        newUpvoted.add(issueId);
      }
      return newUpvoted;
    });
  };

  return (
    <div className="space-y-4">
      {mockIssues.map((issue) => (
        <Card key={issue.id} className="overflow-hidden shadow-blue-green border-0 backdrop-blur-sm transform hover:scale-[1.02] transition-all duration-200" style={{
          background: 'rgba(255, 255, 255, 0.9)'
        }}>
          <CardContent className="p-0">
            {/* User Header */}
            <div className="p-4 pb-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <Avatar className="w-12 h-12 border-2 border-transparent bg-blue-green-gradient p-0.5">
                    <AvatarImage src={issue.user.avatar} alt={issue.user.name} className="rounded-full" />
                    <AvatarFallback className="bg-white text-sky-600 font-semibold">
                      {issue.user.name.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-medium text-gray-900">{issue.user.name}</p>
                    <div className="flex items-center text-gray-500 text-sm">
                      <MapPin size={12} className="mr-1" />
                      {issue.user.location} • {issue.timestamp}
                    </div>
                  </div>
                </div>
                <Button variant="ghost" size="sm">
                  <MoreVertical size={16} />
                </Button>
              </div>
            </div>

            {/* Content */}
            <div className="px-4 pb-3">
              <div className="flex items-start justify-between mb-2">
                <h3 className="font-semibold text-gray-900 flex-1">{issue.title}</h3>
                {getStatusBadge(issue.status)}
              </div>
              <p className="text-gray-600 text-sm mb-3">{issue.description}</p>
              
              {/* Tags */}
              <div className="flex flex-wrap gap-1 mb-3">
                {issue.tags.map((tag, index) => (
                  <Badge key={index} variant="secondary" className="text-xs">
                    {tag}
                  </Badge>
                ))}
              </div>
            </div>

            {/* Image */}
            <div className="aspect-video">
              <ImageWithFallback
                src={issue.image}
                alt={issue.title}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Action Bar */}
            <div className="p-4 pt-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-6">
                  <button
                    onClick={() => toggleLike(issue.id)}
                    className={`flex items-center space-x-1 transition-colors ${
                      likedIssues.has(issue.id) ? 'text-red-500' : 'text-gray-500'
                    }`}
                  >
                    <Heart 
                      size={20} 
                      fill={likedIssues.has(issue.id) ? 'currentColor' : 'none'} 
                    />
                    <span className="text-sm">{issue.likes + (likedIssues.has(issue.id) ? 1 : 0)}</span>
                  </button>
                  
                  <button
                    onClick={() => toggleUpvote(issue.id)}
                    className={`flex items-center space-x-1 transition-colors ${
                      upvotedIssues.has(issue.id) ? 'text-blue-500' : 'text-gray-500'
                    }`}
                  >
                    <ThumbsUp 
                      size={20} 
                      fill={upvotedIssues.has(issue.id) ? 'currentColor' : 'none'} 
                    />
                    <span className="text-sm">{issue.upvotes + (upvotedIssues.has(issue.id) ? 1 : 0)}</span>
                  </button>
                  
                  <button className="flex items-center space-x-1 text-gray-500">
                    <MessageCircle size={20} />
                    <span className="text-sm">{issue.comments}</span>
                  </button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}