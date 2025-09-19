import { useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { UserRegistration } from './user-registration';
import { ArrowRight, UserPlus } from 'lucide-react';

interface AuthScreenProps {
  onLogin: (userRole: 'user' | 'staff' | 'admin', userData: any) => void;
}

export function AuthScreen({ onLogin }: AuthScreenProps) {
  const [loginType, setLoginType] = useState<'email' | 'phone' | 'aadhar'>('email');
  const [showOTP, setShowOTP] = useState(false);
  const [userRole, setUserRole] = useState<'user' | 'staff' | 'admin'>('user');
  const [showDetailedRegistration, setShowDetailedRegistration] = useState(false);
  const [language, setLanguage] = useState<'en' | 'hi'>('en');

  const handleLogin = () => {
    const userData = {
      name: userRole === 'admin' ? 'Admin User' : userRole === 'staff' ? 'Staff Member' : 'Regular User',
      email: 'demo@example.com',
      role: userRole,
      loginMethod: loginType
    };
    onLogin(userRole, userData);
  };

  const handleRegistrationComplete = (userData: any) => {
    onLogin('user', userData);
  };

  if (showDetailedRegistration) {
    return (
      <UserRegistration
        onComplete={handleRegistrationComplete}
        onBack={() => setShowDetailedRegistration(false)}
        language={language}
      />
    );
  }

  return (
    <div className="min-h-screen bg-blue-green-light flex flex-col justify-center p-4" style={{
      background: 'linear-gradient(135deg, #E0F2FE 0%, #ECFDF5 100%)'
    }}>
      <div className="max-w-md mx-auto w-full space-y-6">
        {/* Header with illustration */}
        <div className="text-center space-y-4">
          <div className="w-36 h-36 mx-auto rounded-3xl overflow-hidden bg-blue-green-gradient p-1 shadow-blue-green">
            <div className="w-full h-full rounded-3xl overflow-hidden bg-white p-2">
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1661964538633-c23cf610274a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb21tdW5pdHklMjBjaXZpYyUyMGlsbHVzdHJhdGlvbiUyMG1pbmltYWx8ZW58MXx8fHwxNzU3MzE3Mzk0fDA&ixlib=rb-4.1.0&q=80&w=1080"
                alt="Community illustration"
                className="w-full h-full object-cover rounded-2xl"
              />
            </div>
          </div>
          <div>
            <h1 className="text-4xl font-bold text-blue-green-gradient">CIVIC SOLUTIONS</h1>
            <p className="text-gray-600 mt-2 text-lg font-bold ">Report civic issues,track complaints,and collabrate with local authorities to build a better  community for everyone</p>
          </div>
        </div>

        {/* Auth Card */}
        <Card className="shadow-blue-green border-0 backdrop-blur-sm" style={{
          background: 'rgba(255, 255, 255, 0.9)'
        }}>
          <CardHeader className="text-center">
            <CardTitle>Welcome Back</CardTitle>
            <CardDescription>Login to report and track civic issues</CardDescription>
          </CardHeader>
          <CardContent>
            {/* User Role Selection */}
            <div className="mb-6">
              <Label htmlFor="userRole" className="text-sm font-medium mb-2 block">Login As</Label>
              <Select value={userRole} onValueChange={(value: 'user' | 'staff' | 'admin') => setUserRole(value)}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select user type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="user">👤 Citizen</SelectItem>
                  <SelectItem value="staff">👨‍💼 Staff Member</SelectItem>
                  <SelectItem value="admin">🔐 Administrator</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <Tabs defaultValue="login" className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="login">Login</TabsTrigger>
                <TabsTrigger value="signup">Sign Up</TabsTrigger>
              </TabsList>
              
              <TabsContent value="login" className="space-y-4 mt-6">
                {!showOTP ? (
                  <>
                    <div className="space-y-4">
                      <div className="flex gap-2">
                        <Button
                          variant={loginType === 'email' ? 'default' : 'outline'}
                          size="sm"
                          onClick={() => setLoginType('email')}
                          className="flex-1 text-xs"
                        >
                          📧 Email
                        </Button>
                        <Button
                          variant={loginType === 'phone' ? 'default' : 'outline'}
                          size="sm"
                          onClick={() => setLoginType('phone')}
                          className="flex-1 text-xs"
                        >
                          📱 Phone
                        </Button>
                        <Button
                          variant={loginType === 'aadhar' ? 'default' : 'outline'}
                          size="sm"
                          onClick={() => setLoginType('aadhar')}
                          className="flex-1 text-xs"
                        >
                          🆔 Aadhar
                        </Button>
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="login">
                          {loginType === 'email' ? 'Email Address' : 
                           loginType === 'phone' ? 'Mobile Number' : 'Aadhar Number'}
                        </Label>
                        <Input
                          id="login"
                          type={loginType === 'email' ? 'email' : 'tel'}
                          placeholder={
                            loginType === 'email' ? 'Enter your email' : 
                            loginType === 'phone' ? '+91 9876543210' : 
                            'XXXX XXXX XXXX'
                          }
                          maxLength={loginType === 'aadhar' ? 12 : undefined}
                        />
                      </div>
                      
                      {loginType === 'email' && (
                        <div className="space-y-2">
                          <Label htmlFor="password">Password</Label>
                          <Input id="password" type="password" placeholder="Enter your password" />
                        </div>
                      )}

                      {(loginType === 'phone' || loginType === 'aadhar') && (
                        <div className="bg-blue-50 p-3 rounded-lg border border-blue-200">
                          <p className="text-sm text-blue-800">
                            {loginType === 'phone' ? 
                              '📱 OTP will be sent to your mobile number' : 
                              '🆔 OTP will be sent to your registered mobile number'}
                          </p>
                        </div>
                      )}
                    </div>
                    
                    <Button 
                      className="w-full bg-blue-green-gradient hover:opacity-90 h-12 shadow-blue-green transform hover:scale-[1.02] transition-all duration-200" 
                      onClick={() => {
                        if (loginType === 'phone' || loginType === 'aadhar') {
                          setShowOTP(true);
                        } else {
                          handleLogin();
                        }
                      }}
                    >
                      {loginType === 'email' ? 'Sign In' : 'Send OTP'}
                    </Button>
                  </>
                ) : (
                  <div className="space-y-4">
                    <div className="text-center">
                      <p className="text-sm text-gray-600">
                        {loginType === 'aadhar' ? 
                          'Enter the 6-digit OTP sent to your registered mobile' :
                          'Enter the 6-digit code sent to your phone'}
                      </p>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="otp">OTP Verification</Label>
                      <Input id="otp" placeholder="000000" className="text-center tracking-widest" maxLength={6} />
                    </div>
                    <Button className="w-full bg-blue-green-gradient hover:opacity-90 h-12 shadow-blue-green" onClick={handleLogin}>
                      Verify & Login
                    </Button>
                    <Button variant="ghost" className="w-full" onClick={() => setShowOTP(false)}>
                      Back
                    </Button>
                  </div>
                )}
              </TabsContent>
              
              <TabsContent value="signup" className="space-y-4 mt-6">
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="firstName">First Name</Label>
                      <Input id="firstName" placeholder="First name" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="lastName">Last Name</Label>
                      <Input id="lastName" placeholder="Last name" />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="signupEmail">Email</Label>
                    <Input id="signupEmail" type="email" placeholder="Enter your email" />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="signupPhone">Phone Number</Label>
                    <Input id="signupPhone" type="tel" placeholder="+91 9876543210" />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="signupAadhar">Aadhar Number (Optional)</Label>
                    <Input id="signupAadhar" placeholder="XXXX XXXX XXXX" maxLength={12} />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="signupPassword">Password</Label>
                    <Input id="signupPassword" type="password" placeholder="Create a password" />
                  </div>
                </div>
                
                <div className="space-y-3">
                  <Button className="w-full bg-secondary hover:opacity-90 h-12 shadow-blue-green transform hover:scale-[1.02] transition-all duration-200" onClick={handleLogin}>
                    Quick Sign Up
                  </Button>
                  
                  <Button 
                    variant="outline" 
                    className="w-full h-12 border-blue-green hover:bg-blue-green-gradient hover:text-white transform hover:scale-[1.02] transition-all duration-200" 
                    onClick={() => setShowDetailedRegistration(true)}
                  >
                    <div className="flex items-center justify-center space-x-2">
                      <UserPlus className="w-4 h-4" />
                      <span>Complete Registration</span>
                      <ArrowRight className="w-4 h-4" />
                    </div>
                  </Button>
                  
                  <p className="text-xs text-center text-gray-500">
                    Get a complete profile with detailed registration
                  </p>
                </div>
              </TabsContent>
            </Tabs>
            
            <div className="mt-6 pt-4 border-t space-y-3">
              <Button variant="outline" className="w-full" onClick={() => onLogin('user', { name: 'Guest User', role: 'user' })}>
                Continue as Guest
              </Button>
              
              <div className="flex items-center justify-center">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setLanguage(language === 'en' ? 'hi' : 'en')}
                  className="text-xs"
                >
                  {language === 'en' ? '🇮🇳 हिंदी' : '🇺🇸 English'}
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}