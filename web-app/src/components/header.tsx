import { Search, Bell, Moon, Sun, Globe } from 'lucide-react';
import { Button } from './ui/button';

interface HeaderProps {
  isDark: boolean;
  onToggleDark: () => void;
  language: 'en' | 'hi';
  onToggleLanguage: () => void;
  onSearchClick?: () => void;
  onNotificationClick?: () => void;
  userRole?: 'user' | 'staff' | 'admin';
}

// Custom CivicFix Logo Component
function CivicFixLogo({ userRole = 'user' }: { userRole?: 'user' | 'staff' | 'admin' }) {
  const getRoleColor = () => {
    switch (userRole) {
      case 'admin':
        return 'from-red-500 to-red-600';
      case 'staff':
        return 'from-purple-500 to-purple-600';
      default:
        return 'from-blue-500 to-green-500';
    }
  };

  return (
    <div className={`w-11 h-11 bg-gradient-to-br ${getRoleColor()} rounded-xl flex items-center justify-center shadow-lg transform hover:scale-105 transition-all duration-200`}>
      <div className="relative">
        {/* Main logo shape - representing connectivity and civic engagement */}
        <div className="w-6 h-6 relative">
          {/* Center circle */}
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-2 h-2 bg-white rounded-full"></div>
          
          {/* Connecting nodes */}
          <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-1.5 h-1.5 bg-white rounded-full opacity-90"></div>
          <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-1.5 h-1.5 bg-white rounded-full opacity-90"></div>
          <div className="absolute left-0 top-1/2 transform -translate-y-1/2 w-1.5 h-1.5 bg-white rounded-full opacity-90"></div>
          <div className="absolute right-0 top-1/2 transform -translate-y-1/2 w-1.5 h-1.5 bg-white rounded-full opacity-90"></div>
          
          {/* Connecting lines */}
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-px h-6 bg-white opacity-60"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-6 h-px bg-white opacity-60"></div>
        </div>
      </div>
    </div>
  );
}

export function Header({ 
  isDark, 
  onToggleDark, 
  language, 
  onToggleLanguage,
  onSearchClick,
  onNotificationClick,
  userRole = 'user'
}: HeaderProps) {
  const getRoleIcon = () => {
    switch (userRole) {
      case 'admin':
        return '🔐';
      case 'staff':
        return '👨‍💼';
      default:
        return '👤';
    }
  };

  return (
    <div className="sticky top-0 backdrop-blur-sm border-b border-border px-4 py-3 z-10 bg-card/90">
      <div className="flex items-center justify-between max-w-md mx-auto">
        <div className="flex items-center space-x-3">
          <CivicFixLogo userRole={userRole} />
          <div>
            <h1 className="text-xl text-blue-green-gradient">
              {language === 'en' ? 'CivicFix' : 'नागरिक समाधान'}
            </h1>
            {userRole !== 'user' && (
              <p className="text-xs text-muted-foreground flex items-center gap-1">
                <span>{getRoleIcon()}</span>
                <span>
                  {userRole === 'admin' 
                    ? (language === 'en' ? 'Administrator' : 'प्रशासक')
                    : (language === 'en' ? 'Staff Member' : 'स्टाफ सदस्य')
                  }
                </span>
              </p>
            )}
          </div>
        </div>
        
        <div className="flex items-center space-x-2">
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={onSearchClick}
            className="p-2 hover:bg-accent/50 text-foreground"
          >
            <Search size={20} />
          </Button>
          
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={onNotificationClick}
            className="p-2 relative hover:bg-accent/50 text-foreground"
          >
            <Bell size={20} />
            <div className="absolute -top-1 -right-1 w-3 h-3 bg-destructive rounded-full"></div>
          </Button>
          
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={onToggleLanguage}
            className="p-2 hover:bg-accent/50 text-foreground"
          >
            <Globe size={18} />
            <span className="ml-1 text-xs font-medium">
              {language === 'en' ? 'हिं' : 'EN'}
            </span>
          </Button>
          
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={onToggleDark}
            className="p-2 hover:bg-accent/50 text-foreground"
          >
            {isDark ? <Sun size={18} /> : <Moon size={18} />}
          </Button>
        </div>
      </div>
    </div>
  );
}