import { useState, useRef } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Progress } from './ui/progress';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Checkbox } from './ui/checkbox';
import { ArrowLeft, ArrowRight, Camera, Upload, MapPin, Shield, User, Mail, CheckCircle } from 'lucide-react';
import { LocationSuggestions } from './location-suggestions';

interface UserRegistrationProps {
  onComplete: (userData: any) => void;
  onBack: () => void;
  language: 'en' | 'hi';
}

interface FormData {
  // Personal Info
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  password: string;
  confirmPassword: string;
  dateOfBirth: string;
  gender: string;
  
  // Address Info
  address: string;
  city: string;
  state: string;
  pincode: string;
  locality: string;
  
  // Profile Info
  profilePicture: string | null;
  bio: string;
  
  // Verification
  emailOTP: string;
  phoneOTP: string;
  
  // Agreements
  acceptTerms: boolean;
  acceptPrivacy: boolean;
  allowNotifications: boolean;
}

export function UserRegistration({ onComplete, onBack, language }: UserRegistrationProps) {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<FormData>({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    dateOfBirth: '',
    gender: '',
    address: '',
    city: '',
    state: '',
    pincode: '',
    locality: '',
    profilePicture: null,
    bio: '',
    emailOTP: '',
    phoneOTP: '',
    acceptTerms: false,
    acceptPrivacy: false,
    allowNotifications: true,
  });
  
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = useState(false);
  const [profilePreview, setProfilePreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const cameraInputRef = useRef<HTMLInputElement>(null);
  
  const totalSteps = 5;
  const progress = (currentStep / totalSteps) * 100;

  const text = {
    en: {
      title: 'Create Your Account',
      subtitle: 'Join the CivicFix community',
      steps: {
        1: 'Personal Information',
        2: 'Contact & Security',
        3: 'Address Details',
        4: 'Profile Setup',
        5: 'Verification & Terms'
      },
      fields: {
        firstName: 'First Name',
        lastName: 'Last Name',
        email: 'Email Address',
        phone: 'Phone Number',
        password: 'Password',
        confirmPassword: 'Confirm Password',
        dateOfBirth: 'Date of Birth',
        gender: 'Gender',
        address: 'Street Address',
        city: 'City',
        state: 'State',
        pincode: 'PIN Code',
        locality: 'Locality/Area',
        bio: 'About You (Optional)',
        emailOTP: 'Email OTP',
        phoneOTP: 'Phone OTP'
      },
      placeholders: {
        firstName: 'Enter your first name',
        lastName: 'Enter your last name',
        email: 'your.email@example.com',
        phone: '+91 9876543210',
        password: 'Create a strong password',
        confirmPassword: 'Re-enter your password',
        address: 'House/Flat No., Street Name',
        city: 'Enter your city',
        pincode: '400001',
        locality: 'Enter locality or area',
        bio: 'Tell us about yourself...'
      },
      buttons: {
        next: 'Next',
        previous: 'Previous',
        complete: 'Complete Registration',
        sendOTP: 'Send OTP',
        verify: 'Verify',
        uploadPhoto: 'Upload Photo',
        takePhoto: 'Take Photo',
        skipPhoto: 'Skip for Now'
      },
      messages: {
        profilePicture: 'Add a profile picture to help others recognize you',
        verification: 'We\'ll send verification codes to your email and phone',
        terms: 'I agree to the Terms of Service',
        privacy: 'I agree to the Privacy Policy',
        notifications: 'Allow notifications for issue updates'
      }
    },
    hi: {
      title: 'अपना खाता बनाएं',
      subtitle: 'CivicFix समुदाय में शामिल हों',
      steps: {
        1: 'व्यक्तिगत जानकारी',
        2: 'संपर्क और सुरक्षा',
        3: 'पता विवरण',
        4: 'प्रोफ़ाइल सेटअप',
        5: 'सत्यापन और नियम'
      },
      fields: {
        firstName: 'पहला नाम',
        lastName: 'अंतिम नाम',
        email: 'ईमेल पता',
        phone: 'फ़ोन नंबर',
        password: 'पासवर्ड',
        confirmPassword: 'पासवर्ड की पुष्टि करें',
        dateOfBirth: 'जन्म की तारीख',
        gender: 'लिंग',
        address: 'सड़क का पता',
        city: 'शहर',
        state: 'राज्य',
        pincode: 'पिन कोड',
        locality: 'इलाका/क्षेत्र',
        bio: 'आपके बारे में (वैकल्पिक)',
        emailOTP: 'ईमेल OTP',
        phoneOTP: 'फ़ोन OTP'
      },
      placeholders: {
        firstName: 'अपना पहला नाम दर्ज करें',
        lastName: 'अपना अंतिम नाम दर्ज करें',
        email: 'your.email@example.com',
        phone: '+91 9876543210',
        password: 'एक मजबूत पासवर्ड बनाएं',
        confirmPassword: 'अपना पासवर्ड फिर से दर्ज करें',
        address: 'घर/फ्लैट नं., सड़क का नाम',
        city: 'अपना शहर दर्ज करें',
        pincode: '400001',
        locality: 'इलाका या क्षेत्र दर्ज करें',
        bio: 'अपने बारे में बताएं...'
      },
      buttons: {
        next: 'आगे',
        previous: 'पिछला',
        complete: 'पंजीकरण पूरा करें',
        sendOTP: 'OTP भेजें',
        verify: 'सत्यापित करें',
        uploadPhoto: 'फोटो अपलोड करें',
        takePhoto: 'फोटो लें',
        skipPhoto: 'अभी छोड़ें'
      },
      messages: {
        profilePicture: 'अपनी पहचान के लिए प्रोफ़ाइल फोटो जोड़ें',
        verification: 'हम आपके ईमेल और फोन पर सत्यापन कोड भेजेंगे',
        terms: 'मैं सेवा की शर्तों से सहमत हूं',
        privacy: 'मैं गोपनीयता नीति से सहमत हूं',
        notifications: 'समस्या अपडेट के लिए सूचनाओं की अनुमति दें'
      }
    }
  };

  const t = text[language];

  const validateStep = (step: number): boolean => {
    const newErrors: Record<string, string> = {};

    switch (step) {
      case 1:
        if (!formData.firstName.trim()) newErrors.firstName = 'First name is required';
        if (!formData.lastName.trim()) newErrors.lastName = 'Last name is required';
        if (!formData.dateOfBirth) newErrors.dateOfBirth = 'Date of birth is required';
        if (!formData.gender) newErrors.gender = 'Gender is required';
        break;
      
      case 2:
        if (!formData.email.trim()) newErrors.email = 'Email is required';
        if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Invalid email format';
        if (!formData.phone.trim()) newErrors.phone = 'Phone number is required';
        if (!/^\+91\d{10}$/.test(formData.phone)) newErrors.phone = 'Invalid phone number format';
        if (!formData.password) newErrors.password = 'Password is required';
        if (formData.password.length < 8) newErrors.password = 'Password must be at least 8 characters';
        if (formData.password !== formData.confirmPassword) {
          newErrors.confirmPassword = 'Passwords do not match';
        }
        break;
      
      case 3:
        if (!formData.address.trim()) newErrors.address = 'Address is required';
        if (!formData.city.trim()) newErrors.city = 'City is required';
        if (!formData.state.trim()) newErrors.state = 'State is required';
        if (!formData.pincode.trim()) newErrors.pincode = 'PIN code is required';
        if (!/^\d{6}$/.test(formData.pincode)) newErrors.pincode = 'Invalid PIN code';
        break;
      
      case 5:
        if (!formData.acceptTerms) newErrors.acceptTerms = 'You must accept the terms';
        if (!formData.acceptPrivacy) newErrors.acceptPrivacy = 'You must accept the privacy policy';
        break;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateStep(currentStep)) {
      setCurrentStep(prev => Math.min(prev + 1, totalSteps));
    }
  };

  const handlePrevious = () => {
    setCurrentStep(prev => Math.max(prev - 1, 1));
  };

  const handleInputChange = (field: keyof FormData, value: string | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const result = e.target?.result as string;
        setProfilePreview(result);
        setFormData(prev => ({ ...prev, profilePicture: result }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleLocationSelect = (location: any) => {
    setFormData(prev => ({
      ...prev,
      address: location.name,
      city: 'Noida', // Default city for the mock data
      state: 'uttar-pradesh',
      pincode: '201301', // Default pincode
      locality: location.area
    }));
  };

  const handleComplete = () => {
    if (validateStep(currentStep)) {
      setIsLoading(true);
      // Simulate registration process
      setTimeout(() => {
        onComplete({
          ...formData,
          registrationDate: new Date().toISOString(),
          isVerified: true,
          role: 'user'
        });
      }, 2000);
    }
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-4">
            <div className="flex items-center space-x-2 mb-4">
              <User className="w-5 h-5 text-primary" />
              <h3 className="font-medium">{t.steps[1]}</h3>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="firstName">{t.fields.firstName} *</Label>
                <Input
                  id="firstName"
                  value={formData.firstName}
                  onChange={(e) => handleInputChange('firstName', e.target.value)}
                  placeholder={t.placeholders.firstName}
                  className={errors.firstName ? 'border-red-500' : ''}
                />
                {errors.firstName && <p className="text-red-500 text-sm">{errors.firstName}</p>}
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="lastName">{t.fields.lastName} *</Label>
                <Input
                  id="lastName"
                  value={formData.lastName}
                  onChange={(e) => handleInputChange('lastName', e.target.value)}
                  placeholder={t.placeholders.lastName}
                  className={errors.lastName ? 'border-red-500' : ''}
                />
                {errors.lastName && <p className="text-red-500 text-sm">{errors.lastName}</p>}
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="dateOfBirth">{t.fields.dateOfBirth} *</Label>
              <Input
                id="dateOfBirth"
                type="date"
                value={formData.dateOfBirth}
                onChange={(e) => handleInputChange('dateOfBirth', e.target.value)}
                className={errors.dateOfBirth ? 'border-red-500' : ''}
              />
              {errors.dateOfBirth && <p className="text-red-500 text-sm">{errors.dateOfBirth}</p>}
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="gender">{t.fields.gender} *</Label>
              <Select value={formData.gender} onValueChange={(value: string) => handleInputChange('gender', value)}>
                <SelectTrigger className={errors.gender ? 'border-red-500' : ''}>
                  <SelectValue placeholder="Select gender" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="male">Male / पुरुष</SelectItem>
                  <SelectItem value="female">Female / महिला</SelectItem>
                  <SelectItem value="other">Other / अन्य</SelectItem>
                  <SelectItem value="prefer-not-to-say">Prefer not to say / कहना नहीं चाहता</SelectItem>
                </SelectContent>
              </Select>
              {errors.gender && <p className="text-red-500 text-sm">{errors.gender}</p>}
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-4">
            <div className="flex items-center space-x-2 mb-4">
              <Mail className="w-5 h-5 text-primary" />
              <h3 className="font-medium">{t.steps[2]}</h3>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="email">{t.fields.email} *</Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => handleInputChange('email', e.target.value)}
                placeholder={t.placeholders.email}
                className={errors.email ? 'border-red-500' : ''}
              />
              {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="phone">{t.fields.phone} *</Label>
              <Input
                id="phone"
                type="tel"
                value={formData.phone}
                onChange={(e) => handleInputChange('phone', e.target.value)}
                placeholder={t.placeholders.phone}
                className={errors.phone ? 'border-red-500' : ''}
              />
              {errors.phone && <p className="text-red-500 text-sm">{errors.phone}</p>}
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="password">{t.fields.password} *</Label>
              <Input
                id="password"
                type="password"
                value={formData.password}
                onChange={(e) => handleInputChange('password', e.target.value)}
                placeholder={t.placeholders.password}
                className={errors.password ? 'border-red-500' : ''}
              />
              {errors.password && <p className="text-red-500 text-sm">{errors.password}</p>}
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="confirmPassword">{t.fields.confirmPassword} *</Label>
              <Input
                id="confirmPassword"
                type="password"
                value={formData.confirmPassword}
                onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
                placeholder={t.placeholders.confirmPassword}
                className={errors.confirmPassword ? 'border-red-500' : ''}
              />
              {errors.confirmPassword && <p className="text-red-500 text-sm">{errors.confirmPassword}</p>}
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-4">
            <div className="flex items-center space-x-2 mb-4">
              <MapPin className="w-5 h-5 text-primary" />
              <h3 className="font-medium">{t.steps[3]}</h3>
            </div>
            
            <LocationSuggestions
              onSelectLocation={handleLocationSelect}
              language={language}
            />
            
            <div className="space-y-2">
              <Label htmlFor="address">{t.fields.address} *</Label>
              <Input
                id="address"
                value={formData.address}
                onChange={(e) => handleInputChange('address', e.target.value)}
                placeholder={t.placeholders.address}
                className={errors.address ? 'border-red-500' : ''}
              />
              {errors.address && <p className="text-red-500 text-sm">{errors.address}</p>}
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="city">{t.fields.city} *</Label>
                <Input
                  id="city"
                  value={formData.city}
                  onChange={(e) => handleInputChange('city', e.target.value)}
                  placeholder={t.placeholders.city}
                  className={errors.city ? 'border-red-500' : ''}
                />
                {errors.city && <p className="text-red-500 text-sm">{errors.city}</p>}
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="pincode">{t.fields.pincode} *</Label>
                <Input
                  id="pincode"
                  value={formData.pincode}
                  onChange={(e) => handleInputChange('pincode', e.target.value)}
                  placeholder={t.placeholders.pincode}
                  maxLength={6}
                  className={errors.pincode ? 'border-red-500' : ''}
                />
                {errors.pincode && <p className="text-red-500 text-sm">{errors.pincode}</p>}
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="state">{t.fields.state} *</Label>
              <Select value={formData.state} onValueChange={(value: string) => handleInputChange('state', value)}>
                <SelectTrigger className={errors.state ? 'border-red-500' : ''}>
                  <SelectValue placeholder="Select state" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="maharashtra">Maharashtra</SelectItem>
                  <SelectItem value="delhi">Delhi</SelectItem>
                  <SelectItem value="karnataka">Karnataka</SelectItem>
                  <SelectItem value="gujarat">Gujarat</SelectItem>
                  <SelectItem value="rajasthan">Rajasthan</SelectItem>
                  <SelectItem value="punjab">Punjab</SelectItem>
                  <SelectItem value="haryana">Haryana</SelectItem>
                  <SelectItem value="uttar-pradesh">Uttar Pradesh</SelectItem>
                  <SelectItem value="tamil-nadu">Tamil Nadu</SelectItem>
                  <SelectItem value="kerala">Kerala</SelectItem>
                </SelectContent>
              </Select>
              {errors.state && <p className="text-red-500 text-sm">{errors.state}</p>}
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="locality">{t.fields.locality}</Label>
              <Input
                id="locality"
                value={formData.locality}
                onChange={(e) => handleInputChange('locality', e.target.value)}
                placeholder={t.placeholders.locality}
              />
            </div>
          </div>
        );

      case 4:
        return (
          <div className="space-y-6">
            <div className="flex items-center space-x-2 mb-4">
              <Camera className="w-5 h-5 text-primary" />
              <h3 className="font-medium">{t.steps[4]}</h3>
            </div>
            
            <div className="text-center space-y-4">
              <div className="w-32 h-32 mx-auto rounded-full overflow-hidden bg-gray-100 border-4 border-dashed border-gray-300">
                {profilePreview ? (
                  <img src={profilePreview} alt="Profile" className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <User className="w-12 h-12 text-gray-400" />
                  </div>
                )}
              </div>
              
              <p className="text-sm text-gray-600">{t.messages.profilePicture}</p>
              
              <div className="flex gap-2 justify-center">
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => fileInputRef.current?.click()}
                  className="flex items-center space-x-2"
                >
                  <Upload className="w-4 h-4" />
                  <span>{t.buttons.uploadPhoto}</span>
                </Button>
                
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => cameraInputRef.current?.click()}
                  className="flex items-center space-x-2"
                >
                  <Camera className="w-4 h-4" />
                  <span>{t.buttons.takePhoto}</span>
                </Button>
              </div>
              
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleFileUpload}
                className="hidden"
              />
              
              <input
                ref={cameraInputRef}
                type="file"
                accept="image/*"
                capture="user"
                onChange={handleFileUpload}
                className="hidden"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="bio">{t.fields.bio}</Label>
              <textarea
                id="bio"
                value={formData.bio}
                onChange={(e) => handleInputChange('bio', e.target.value)}
                placeholder={t.placeholders.bio}
                rows={4}
                className="w-full px-3 py-2 border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-ring"
              />
            </div>
          </div>
        );

      case 5:
        return (
          <div className="space-y-6">
            <div className="flex items-center space-x-2 mb-4">
              <Shield className="w-5 h-5 text-primary" />
              <h3 className="font-medium">{t.steps[5]}</h3>
            </div>
            
            <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
              <p className="text-sm text-blue-800 mb-3">
                {t.messages.verification}
              </p>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="emailOTP">{t.fields.emailOTP}</Label>
                  <Input
                    id="emailOTP"
                    value={formData.emailOTP}
                    onChange={(e) => handleInputChange('emailOTP', e.target.value)}
                    placeholder="000000"
                    maxLength={6}
                    className="text-center tracking-widest"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="phoneOTP">{t.fields.phoneOTP}</Label>
                  <Input
                    id="phoneOTP"
                    value={formData.phoneOTP}
                    onChange={(e) => handleInputChange('phoneOTP', e.target.value)}
                    placeholder="000000"
                    maxLength={6}
                    className="text-center tracking-widest"
                  />
                </div>
              </div>
              
              <div className="flex gap-2 mt-3">
                <Button variant="outline" size="sm" className="flex-1">
                  {t.buttons.sendOTP} (Email)
                </Button>
                <Button variant="outline" size="sm" className="flex-1">
                  {t.buttons.sendOTP} (Phone)
                </Button>
              </div>
            </div>
            
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <Checkbox
                  id="acceptTerms"
                  checked={formData.acceptTerms}
                  onCheckedChange={(checked: boolean) => handleInputChange('acceptTerms', !!checked)}
                  className={errors.acceptTerms ? 'border-red-500' : ''}
                />
                <Label htmlFor="acceptTerms" className="text-sm leading-relaxed">
                  {t.messages.terms}
                </Label>
              </div>
              {errors.acceptTerms && <p className="text-red-500 text-sm">{errors.acceptTerms}</p>}
              
              <div className="flex items-start space-x-3">
                <Checkbox
                  id="acceptPrivacy"
                  checked={formData.acceptPrivacy}
                  onCheckedChange={(checked: boolean) => handleInputChange('acceptPrivacy', !!checked)}
                  className={errors.acceptPrivacy ? 'border-red-500' : ''}
                />
                <Label htmlFor="acceptPrivacy" className="text-sm leading-relaxed">
                  {t.messages.privacy}
                </Label>
              </div>
              {errors.acceptPrivacy && <p className="text-red-500 text-sm">{errors.acceptPrivacy}</p>}
              
              <div className="flex items-start space-x-3">
                <Checkbox
                  id="allowNotifications"
                  checked={formData.allowNotifications}
                  onCheckedChange={(checked: boolean) => handleInputChange('allowNotifications', !!checked)}
                />
                <Label htmlFor="allowNotifications" className="text-sm leading-relaxed">
                  {t.messages.notifications}
                </Label>
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-blue-green-light flex flex-col p-4" style={{
      background: 'linear-gradient(135deg, #E0F2FE 0%, #ECFDF5 100%)'
    }}>
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <Button variant="ghost" size="sm" onClick={onBack} className="p-2">
          <ArrowLeft className="w-5 h-5" />
        </Button>
        <div className="text-center">
          <h1 className="text-blue-green-gradient font-bold">{t.title}</h1>
          <p className="text-sm text-gray-600">{t.subtitle}</p>
        </div>
        <div className="w-9" /> {/* Spacer */}
      </div>

      {/* Progress */}
      <div className="mb-6">
        <div className="flex justify-between text-sm mb-2">
          <span>Step {currentStep} of {totalSteps}</span>
          <span>{Math.round(progress)}%</span>
        </div>
        <Progress value={progress} className="h-2" />
      </div>

      {/* Registration Form */}
      <div className="flex-1 max-w-md mx-auto w-full">
        <Card className="shadow-blue-green border-0 backdrop-blur-sm" style={{
          background: 'rgba(255, 255, 255, 0.9)'
        }}>
          <CardHeader>
            <CardTitle>{t.steps[currentStep as keyof typeof t.steps]}</CardTitle>
            <CardDescription>
              Step {currentStep} of {totalSteps}
            </CardDescription>
          </CardHeader>
          <CardContent>
            {renderStep()}
          </CardContent>
        </Card>
      </div>

      {/* Navigation */}
      <div className="flex gap-3 mt-6 max-w-md mx-auto w-full">
        {currentStep > 1 && (
          <Button
            variant="outline"
            onClick={handlePrevious}
            className="flex items-center space-x-2 flex-1"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>{t.buttons.previous}</span>
          </Button>
        )}
        
        {currentStep < totalSteps ? (
          <Button
            onClick={handleNext}
            className="bg-blue-green-gradient hover:opacity-90 flex items-center space-x-2 flex-1 shadow-blue-green transform hover:scale-[1.02] transition-all duration-200"
          >
            <span>{t.buttons.next}</span>
            <ArrowRight className="w-4 h-4" />
          </Button>
        ) : (
          <Button
            onClick={handleComplete}
            disabled={isLoading}
            className="bg-secondary hover:opacity-90 flex items-center space-x-2 flex-1 shadow-blue-green transform hover:scale-[1.02] transition-all duration-200"
          >
            {isLoading ? (
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
            ) : (
              <CheckCircle className="w-4 h-4" />
            )}
            <span>{isLoading ? 'Creating Account...' : t.buttons.complete}</span>
          </Button>
        )}
      </div>
    </div>
  );
}