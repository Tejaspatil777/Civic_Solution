import { CheckCircle, Eye, MessageCircle, ThumbsUp, Clock, Bell } from 'lucide-react';
import { Card, CardContent } from './ui/card';
import { Badge } from './ui/badge';
import { Avatar, AvatarFallback } from './ui/avatar';

interface NotificationsProps {
  language: 'en' | 'hi';
}

const mockNotifications = [
  {
    id: 1,
    type: 'status_update',
    title: 'Issue Status Updated',
    message: 'Your pothole report has been marked as "In Progress" by Municipal Corporation',
    timestamp: '2 hours ago',
    icon: Eye,
    color: 'blue',
    unread: true
  },
  {
    id: 2,
    type: 'comment',
    title: 'New Comment',
    message: 'Rajesh Kumar commented on your garbage collection issue',
    timestamp: '4 hours ago',
    icon: MessageCircle,
    color: 'green',
    unread: true
  },
  {
    id: 3,
    type: 'upvote',
    title: 'Issue Upvoted',
    message: '5 people upvoted your water pipe burst report',
    timestamp: '6 hours ago',
    icon: ThumbsUp,
    color: 'purple',
    unread: false
  },
  {
    id: 4,
    type: 'resolved',
    title: 'Issue Resolved',
    message: 'Your streetlight repair request has been completed',
    timestamp: '1 day ago',
    icon: CheckCircle,
    color: 'green',
    unread: false
  },
  {
    id: 5,
    type: 'reminder',
    title: 'Follow-up Reminder',
    message: 'Don\'t forget to update your drainage issue with photos',
    timestamp: '2 days ago',
    icon: Clock,
    color: 'orange',
    unread: false
  }
];

export function Notifications({ language }: NotificationsProps) {
  const text = {
    en: {
      title: 'Notifications',
      markAllRead: 'Mark all as read',
      noNotifications: 'No notifications yet',
      types: {
        status_update: 'Status Update',
        comment: 'New Comment',
        upvote: 'Upvoted',
        resolved: 'Resolved',
        reminder: 'Reminder'
      }
    },
    hi: {
      title: 'सूचनाएं',
      markAllRead: 'सभी को पढ़ा हुआ चिह्नित करें',
      noNotifications: 'अभी तक कोई सूचना नहीं',
      types: {
        status_update: 'स्थिति अपडेट',
        comment: 'नई टिप्पणी',
        upvote: 'अपवोट किया गया',
        resolved: 'हल किया गया',
        reminder: 'अनुस्मारक'
      }
    }
  };

  const t = text[language];

  const getColorClasses = (color: string, unread: boolean) => {
    const baseClasses = unread ? 'bg-opacity-20 dark:bg-opacity-30' : 'bg-opacity-10 dark:bg-opacity-20';
    
    switch (color) {
      case 'blue':
        return `bg-blue-500 ${baseClasses} text-blue-700 dark:text-blue-300`;
      case 'green':
        return `bg-green-500 ${baseClasses} text-green-700 dark:text-green-300`;
      case 'purple':
        return `bg-purple-500 ${baseClasses} text-purple-700 dark:text-purple-300`;
      case 'orange':
        return `bg-orange-500 ${baseClasses} text-orange-700 dark:text-orange-300`;
      default:
        return `bg-gray-500 ${baseClasses} text-gray-700 dark:text-gray-300`;
    }
  };

  return (
    <div className="space-y-4 pb-20">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold text-foreground">{t.title}</h2>
        <button className="text-sm text-primary hover:text-primary/80">
          {t.markAllRead}
        </button>
      </div>

      <div className="space-y-3">
        {mockNotifications.map((notification) => {
          const Icon = notification.icon;
          
          return (
            <Card 
              key={notification.id} 
              className={`border-border shadow-blue-green transition-all duration-200 backdrop-blur-sm hover:scale-[1.02] bg-card/90 ${
                notification.unread ? 'border-primary/20' : ''
              }`}
            >
              <CardContent className="p-4">
                <div className="flex items-start space-x-3">
                  <div className={`p-2 rounded-full ${getColorClasses(notification.color, notification.unread)}`}>
                    <Icon size={16} />
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-1">
                      <h4 className="font-medium text-card-foreground truncate">
                        {notification.title}
                      </h4>
                      {notification.unread && (
                        <div className="w-2 h-2 bg-primary rounded-full flex-shrink-0"></div>
                      )}
                    </div>
                    
                    <p className="text-sm text-muted-foreground mb-2 line-clamp-2">
                      {notification.message}
                    </p>
                    
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-muted-foreground">
                        {notification.timestamp}
                      </span>
                      <Badge 
                        variant="secondary" 
                        className="text-xs"
                      >
                        {t.types[notification.type as keyof typeof t.types]}
                      </Badge>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {mockNotifications.length === 0 && (
        <Card className="border-border shadow-sm bg-card">
          <CardContent className="p-8 text-center">
            <Bell size={48} className="mx-auto text-muted-foreground mb-4" />
            <p className="text-muted-foreground">{t.noNotifications}</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}