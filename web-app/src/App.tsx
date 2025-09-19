import { useState } from "react";
import { Navigation } from "./components/navigation";
import { Header } from "./components/header";
import { AuthScreen } from "./components/auth-screen";
import { HomeFeed } from "./components/home-feed";
import { ReportIssue } from "./components/report-issue";
import { UserProfile } from "./components/user-profile";
import { Notifications } from "./components/notifications";
import { SearchFilters } from "./components/search-filters";
import { TransparencyDashboard } from "./components/transparency-dashboard";
import { AdminDashboard } from "./components/admin-dashboard";
import { StaffDashboard } from "./components/staff-dashboard";

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userRole, setUserRole] = useState<"user" | "staff" | "admin">("user");
  const [userData, setUserData] = useState<any>(null);
  const [activeScreen, setActiveScreen] = useState("home");
  const [showReportIssue, setShowReportIssue] = useState(false);
  const [isDark, setIsDark] = useState(false);
  const [language, setLanguage] = useState<"en" | "hi">("en");

  const handleLogin = (role: "user" | "staff" | "admin", data: any) => {
    setIsAuthenticated(true);
    setUserRole(role);
    setUserData(data);
    if (role === "admin") {
      setActiveScreen("admin");
    } else if (role === "staff") {
      setActiveScreen("staff");
    } else {
      setActiveScreen("home");
    }
  };

  const handleScreenChange = (screen: string) => {
    if (screen === "report") {
      setShowReportIssue(true);
    } else {
      setActiveScreen(screen);
      setShowReportIssue(false);
    }
  };

  const toggleDark = () => {
    setIsDark(!isDark);
    document.documentElement.classList.toggle("dark");
  };

  const toggleLanguage = () => {
    setLanguage(language === "en" ? "hi" : "en");
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setUserRole("user");
    setUserData(null);
    setActiveScreen("home");
  };

  if (!isAuthenticated) {
    return <AuthScreen onLogin={handleLogin} />;
  }

  const renderScreen = () => {
    switch (activeScreen) {
      case "home":
        return <HomeFeed />;
      case "admin":
        return userRole === "admin" ? (
          <AdminDashboard language={language} />
        ) : (
          <div className="text-center p-8">
            <p className="text-red-600">Access denied. Admin privileges required.</p>
          </div>
        );
      case "staff":
        return userRole === "staff" || userRole === "admin" ? (
          <StaffDashboard language={language} />
        ) : (
          <div className="text-center p-8">
            <p className="text-red-600">Access denied. Staff privileges required.</p>
          </div>
        );
      case "search":
        return <SearchFilters language={language} />;
      case "notifications":
        return <Notifications language={language} />;
      case "profile":
        return (
          <UserProfile
            language={language}
            isDark={isDark}
            onToggleDark={toggleDark}
            userRole={userRole}
            userData={userData}
            onLogout={handleLogout}
          />
        );
      case "dashboard":
        return <TransparencyDashboard language={language} />;
      default:
        return <HomeFeed />;
    }
  };

  return (
    <div
      className={`min-h-screen ${isDark ? "dark" : ""}`}
      style={{
        background: isDark
          ? "linear-gradient(135deg, #0F172A 0%, #134E4A 100%)"
          : "linear-gradient(135deg, #E3F2FD 0%, #E8F5E8 100%)",
      }}
    >
      <Header
        isDark={isDark}
        onToggleDark={toggleDark}
        language={language}
        onToggleLanguage={toggleLanguage}
        onSearchClick={() => setActiveScreen("search")}
        onNotificationClick={() => setActiveScreen("notifications")}
        userRole={userRole}
      />

      {activeScreen === "home" && (
        <div className="px-4 py-2 space-y-2">
          {userRole === "admin" && (
            <button
              onClick={() => setActiveScreen("admin")}
              className="w-full bg-red-500 text-white p-4 rounded-xl font-medium shadow-lg transform hover:scale-[1.02] transition-all duration-200"
            >
              <div className="flex items-center justify-center space-x-2">
                <span className="text-lg">🔐</span>
                <span>{language === "en" ? "Admin Dashboard" : "एडमिन डैशबोर्ड"}</span>
              </div>
            </button>
          )}

          {(userRole === "staff" || userRole === "admin") && (
            <button
              onClick={() => setActiveScreen("staff")}
              className="w-full bg-purple-500 text-white p-4 rounded-xl font-medium shadow-lg transform hover:scale-[1.02] transition-all duration-200"
            >
              <div className="flex items-center justify-center space-x-2">
                <span className="text-lg">👨‍💼</span>
                <span>{language === "en" ? "Staff Dashboard" : "स्टाफ डैशबोर्ड"}</span>
              </div>
            </button>
          )}

          <button
            onClick={() => setActiveScreen("dashboard")}
            className="w-full bg-blue-green-gradient text-white p-4 rounded-xl font-medium shadow-blue-green transform hover:scale-[1.02] transition-all duration-200"
          >
            <div className="flex items-center justify-center space-x-2">
              <span className="text-lg">📊</span>
              <span>
                {language === "en"
                  ? "View Transparency Dashboard"
                  : "पारदर्शिता डैशबोर्ड देखें"}
              </span>
            </div>
          </button>
        </div>
      )}

      <main className="px-4 py-4 max-w-md mx-auto">
        {renderScreen()}
      </main>

      <Navigation
        activeScreen={activeScreen}
        onScreenChange={handleScreenChange}
        userRole={userRole}
      />

      {showReportIssue && (
        <ReportIssue
          onClose={() => setShowReportIssue(false)}
          language={language}
        />
      )}
    </div>
  );
}