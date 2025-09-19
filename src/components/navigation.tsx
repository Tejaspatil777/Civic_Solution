import { Home, Search, Plus, Bell, User, Shield, Briefcase } from 'lucide-react';

interface NavigationProps {
  activeScreen: string;
  onScreenChange: (screen: string) => void;
  userRole: 'user' | 'staff' | 'admin';
}

export function Navigation({ activeScreen, onScreenChange, userRole }: NavigationProps) {
  const baseNavItems = [
    { id: 'home', icon: Home, label: 'Home' },
    { id: 'search', icon: Search, label: 'Search' },
    { id: 'report', icon: Plus, label: 'Report' },
    { id: 'notifications', icon: Bell, label: 'Alerts' },
    { id: 'profile', icon: User, label: 'Profile' },
  ];

  // Add role-specific navigation items
  const getNavItems = () => {
    let navItems = [...baseNavItems];
    
    if (userRole === 'admin') {
      navItems.splice(4, 0, { id: 'admin', icon: Shield, label: 'Admin' });
    } else if (userRole === 'staff') {
      navItems.splice(4, 0, { id: 'staff', icon: Briefcase, label: 'Work' });
    }
    
    return navItems;
  };

  const navItems = getNavItems();

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white/90 backdrop-blur-sm border-t border-blue-200 z-50">
      <div className="max-w-md mx-auto">
        <nav className={`flex justify-around py-2 ${navItems.length > 5 ? 'text-xs' : ''}`}>
          {navItems.map((item) => {
            const isActive = activeScreen === item.id;
            return (
              <button
                key={item.id}
                onClick={() => onScreenChange(item.id)}
                className={`flex flex-col items-center py-2 px-1 transition-colors duration-200 ${
                  isActive
                    ? 'text-blue-600'
                    : 'text-gray-600 hover:text-blue-600'
                }`}
              >
                <item.icon
                  size={navItems.length > 5 ? 20 : 24}
                  className={`${
                    isActive ? 'text-blue-600' : 'text-gray-600'
                  } ${item.id === 'report' ? 'bg-blue-green-gradient text-white rounded-full p-1' : ''}`}
                />
                <span className={`mt-1 ${navItems.length > 5 ? 'text-xs' : 'text-sm'} ${isActive ? 'font-medium' : ''}`}>
                  {item.label}
                </span>
              </button>
            );
          })}
        </nav>
      </div>
    </div>
  );
}