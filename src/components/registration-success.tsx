import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { CheckCircle, ArrowRight, User, Mail, Phone, MapPin } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface RegistrationSuccessProps {
  userData: any;
  onContinue: () => void;
  language: 'en' | 'hi';
}

export function RegistrationSuccess({ userData, onContinue, language }: RegistrationSuccessProps) {
  const text = {
    en: {
      title: 'Welcome to CivicFix!',
      subtitle: 'Your account has been created successfully',
      accountDetails: 'Account Details',
      name: 'Name',
      email: 'Email',
      phone: 'Phone',
      location: 'Location',
      startExploring: 'Start Exploring',
      features: {
        report: 'Report civic issues in your area',
        track: 'Track progress of your reports',
        community: 'Connect with your community',
        transparency: 'View transparency dashboard'
      }
    },
    hi: {
      title: 'CivicFix में आपका स्वागत है!',
      subtitle: 'आपका खाता सफलतापूर्वक बनाया गया है',
      accountDetails: 'खाता विवरण',
      name: 'नाम',
      email: 'ईमेल',
      phone: 'फोन',
      location: 'स्थान',
      startExploring: 'खोजना शुरू करें',
      features: {
        report: 'अपने क्षेत्र में नागरिक समस्याओं की रिपोर्ट करें',
        track: 'अपनी रिपोर्ट की प्रगति को ट्रैक करें',
        community: 'अपने समुदाय से जुड़ें',
        transparency: 'पारदर्शिता डैशबोर्ड देखें'
      }
    }
  };

  const t = text[language];

  return (
    <div className="min-h-screen bg-blue-green-light flex flex-col justify-center p-4" style={{
      background: 'linear-gradient(135deg, #E0F2FE 0%, #ECFDF5 100%)'
    }}>
      <div className="max-w-md mx-auto w-full space-y-6">
        {/* Success Animation */}
        <div className="text-center space-y-4">
          <div className="relative">
            <div className="w-32 h-32 mx-auto rounded-3xl overflow-hidden bg-blue-green-gradient p-1 shadow-blue-green">
              <div className="w-full h-full rounded-3xl overflow-hidden bg-white p-2">
                <ImageWithFallback
                  src="https://images.unsplash.com/photo-1709339792481-dbab89e64df0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb21tdW5pdHklMjBjaXZpYyUyMHJlZ2lzdHJhdGlvbiUyMHdlbGNvbWV8ZW58MXx8fHwxNzU4MDg4MzMyfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                  alt="Welcome to community"
                  className="w-full h-full object-cover rounded-2xl"
                />
              </div>
            </div>
            <div className="absolute -bottom-2 -right-2">
              <div className="w-12 h-12 rounded-full bg-green-500 flex items-center justify-center animate-bounce shadow-lg">
                <CheckCircle className="w-8 h-8 text-white" />
              </div>
            </div>
          </div>
          <div>
            <h1 className="text-2xl font-bold text-blue-green-gradient">{t.title}</h1>
            <p className="text-gray-600 mt-2">{t.subtitle}</p>
          </div>
        </div>

        {/* Account Summary Card */}
        <Card className="shadow-blue-green border-0 backdrop-blur-sm" style={{
          background: 'rgba(255, 255, 255, 0.9)'
        }}>
          <CardHeader className="text-center">
            <CardTitle className="flex items-center justify-center space-x-2">
              <User className="w-5 h-5" />
              <span>{t.accountDetails}</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Profile Picture */}
            {userData.profilePicture && (
              <div className="flex justify-center">
                <div className="w-20 h-20 rounded-full overflow-hidden border-2 border-blue-green-gradient">
                  <img 
                    src={userData.profilePicture} 
                    alt="Profile" 
                    className="w-full h-full object-cover" 
                  />
                </div>
              </div>
            )}

            {/* User Details */}
            <div className="space-y-3">
              <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                <User className="w-4 h-4 text-gray-600" />
                <div>
                  <p className="text-sm text-gray-600">{t.name}</p>
                  <p className="font-medium">{userData.firstName} {userData.lastName}</p>
                </div>
              </div>

              <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                <Mail className="w-4 h-4 text-gray-600" />
                <div>
                  <p className="text-sm text-gray-600">{t.email}</p>
                  <p className="font-medium">{userData.email}</p>
                </div>
              </div>

              <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                <Phone className="w-4 h-4 text-gray-600" />
                <div>
                  <p className="text-sm text-gray-600">{t.phone}</p>
                  <p className="font-medium">{userData.phone}</p>
                </div>
              </div>

              {userData.city && (
                <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                  <MapPin className="w-4 h-4 text-gray-600" />
                  <div>
                    <p className="text-sm text-gray-600">{t.location}</p>
                    <p className="font-medium">{userData.city}, {userData.state}</p>
                  </div>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Features Preview */}
        <Card className="shadow-blue-green border-0 backdrop-blur-sm" style={{
          background: 'rgba(255, 255, 255, 0.9)'
        }}>
          <CardHeader>
            <CardTitle>What you can do now:</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center">
                  <span className="text-sm">📝</span>
                </div>
                <p className="text-sm">{t.features.report}</p>
              </div>
              
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center">
                  <span className="text-sm">📊</span>
                </div>
                <p className="text-sm">{t.features.track}</p>
              </div>
              
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 rounded-full bg-purple-100 flex items-center justify-center">
                  <span className="text-sm">🤝</span>
                </div>
                <p className="text-sm">{t.features.community}</p>
              </div>
              
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 rounded-full bg-orange-100 flex items-center justify-center">
                  <span className="text-sm">🔍</span>
                </div>
                <p className="text-sm">{t.features.transparency}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Continue Button */}
        <Button 
          onClick={onContinue}
          className="w-full bg-blue-green-gradient hover:opacity-90 h-12 shadow-blue-green transform hover:scale-[1.02] transition-all duration-200"
        >
          <div className="flex items-center justify-center space-x-2">
            <span>{t.startExploring}</span>
            <ArrowRight className="w-4 h-4" />
          </div>
        </Button>
      </div>
    </div>
  );
}