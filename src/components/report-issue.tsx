import { useState, useRef, useEffect } from 'react';
import { Camera, MapPin, X, Upload, Users, Clock, CheckCircle, Image, Star, ChevronDown } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Alert, AlertDescription } from './ui/alert';
import { LocationSuggestions } from './location-suggestions';
import { CameraPermissionGuide } from './camera-permission-guide';

interface ReportIssueProps {
  onClose: () => void;
  language: 'en' | 'hi';
}

export function ReportIssue({ onClose, language }: ReportIssueProps) {
  const [selectedImages, setSelectedImages] = useState<string[]>([]);
  const [location, setLocation] = useState('');
  const [isDetectingLocation, setIsDetectingLocation] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [assignedStaff, setAssignedStaff] = useState<any>(null);
  const [showCamera, setShowCamera] = useState(false);
  const [currentLocation, setCurrentLocation] = useState<any>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showLocationSuggestions, setShowLocationSuggestions] = useState(false);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [cameraPermission, setCameraPermission] = useState<'granted' | 'denied' | 'prompt' | 'unknown'>('unknown');
  
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Mock staff data for auto-assignment
  const staffDatabase = [
    { 
      id: 1, 
      name: 'Rajesh Kumar', 
      department: 'road', 
      zone: 'Zone A',
      coordinates: { lat: 28.6139, lng: 77.2090 },
      availability: 'available',
      rating: 4.7,
      workload: 'light',
      phone: '+91 98765 43210'
    },
    { 
      id: 2, 
      name: 'Priya Sharma', 
      department: 'water', 
      zone: 'Zone B',
      coordinates: { lat: 28.6289, lng: 77.2065 },
      availability: 'available',
      rating: 4.5,
      workload: 'moderate',
      phone: '+91 98765 43211'
    },
    { 
      id: 3, 
      name: 'Amit Singh', 
      department: 'electricity', 
      zone: 'Zone C',
      coordinates: { lat: 28.5989, lng: 77.2154 },
      availability: 'busy',
      rating: 4.2,
      workload: 'heavy',
      phone: '+91 98765 43212'
    },
    { 
      id: 4, 
      name: 'Sneha Patel', 
      department: 'garbage', 
      zone: 'Zone A',
      coordinates: { lat: 28.6150, lng: 77.2100 },
      availability: 'available',
      rating: 4.6,
      workload: 'light',
      phone: '+91 98765 43213'
    },
  ];

  const text = {
    en: {
      title: 'Report New Issue',
      subtitle: 'Help improve your community',
      photos: 'Add Photos',
      takePhoto: 'Take Photo',
      choosePhoto: 'Choose from Gallery',
      issueTitle: 'Issue Title',
      titlePlaceholder: 'Brief description of the issue',
      description: 'Description',
      descPlaceholder: 'Provide detailed information about the issue...',
      location: 'Location',
      detectLocation: 'Detect My Location',
      category: 'Category',
      selectCategory: 'Select category',
      submit: 'Submit Report',
      submitting: 'Submitting...',
      assignedStaff: 'Auto-Assigned Staff',
      estimatedTime: 'Estimated Resolution',
      locationDetected: 'Location Detected',
      cameraAccess: 'Camera Access',
      staffContact: 'Contact Staff',
      priority: 'Priority Level',
      urgent: 'Urgent',
      categories: {
        road: '🛣️ Road & Infrastructure',
        water: '💧 Water & Drainage',
        garbage: '🗑️ Garbage & Sanitation',
        electricity: '⚡ Electricity',
        other: '🏢 Other'
      }
    },
    hi: {
      title: 'नई समस्या रिपोर्ट करें',
      subtitle: 'अपने समुदाय को बेहतर बनाने में मदद करें',
      photos: 'फोटो जोड़ें',
      takePhoto: 'फोटो लें',
      choosePhoto: 'गैलरी से चुनें',
      issueTitle: 'समस्या का शीर्षक',
      titlePlaceholder: 'समस्या का संक्षिप्त विवरण',
      description: 'विवरण',
      descPlaceholder: 'समस्या के बारे में विस्तृत जानकारी प्रदान करें...',
      location: 'स्थान',
      detectLocation: 'मेरा स्थान पता करें',
      category: 'श्रेणी',
      selectCategory: 'श्रेणी चुनें',
      submit: 'रिपोर्ट जमा करें',
      submitting: 'जमा कर रहे हैं...',
      assignedStaff: 'स्वचालित असाइन स्टाफ',
      estimatedTime: 'अनुमानित समाधान समय',
      locationDetected: 'स्थान का पता लगाया गया',
      cameraAccess: 'कैमरा एक्सेस',
      staffContact: 'स्टाफ से संपर्क करें',
      priority: 'प्राथमिकता स्तर',
      urgent: 'तत्काल',
      categories: {
        road: '🛣️ सड़क और बुनियादी ढांचा',
        water: '💧 पानी और जल निकासी',
        garbage: '🗑️ कचरा और स्वच्छता',
        electricity: '⚡ बिजली',
        other: '🏢 अन्य'
      }
    }
  };

  const t = text[language];

  // Auto-assign staff based on category and location
  const assignStaffAutomatically = (category: string) => {
    const availableStaff = staffDatabase.filter(staff => 
      staff.department === category && 
      staff.availability === 'available'
    );

    if (availableStaff.length === 0) {
      // Fallback to any staff in the department
      const fallbackStaff = staffDatabase.filter(staff => staff.department === category);
      if (fallbackStaff.length > 0) {
        return fallbackStaff[0];
      }
      return null;
    }

    // Sort by workload and rating
    availableStaff.sort((a, b) => {
  const workloadScore: Record<string, number> = { light: 3, moderate: 2, heavy: 1 };
  const aScore = workloadScore[a.workload as keyof typeof workloadScore] + a.rating;
  const bScore = workloadScore[b.workload as keyof typeof workloadScore] + b.rating;
      return bScore - aScore;
    });

    return availableStaff[0];
  };

  // Check camera permission status
  const checkCameraPermission = async () => {
    try {
      if (navigator.permissions) {
        const permission = await navigator.permissions.query({ name: 'camera' as PermissionName });
        setCameraPermission(permission.state);
        
        // Listen for permission changes
        permission.onchange = () => {
          setCameraPermission(permission.state);
        };
      } else {
        // Fallback for browsers that don't support permissions API
        setCameraPermission('unknown');
      }
    } catch (error) {
      console.warn('Could not check camera permission:', error);
      setCameraPermission('unknown');
    }
  };

  // Request camera permission explicitly
  const requestCameraPermission = async () => {
    try {
      if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
        setCameraPermission('denied');
        return;
      }

      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      // If successful, stop the stream and update permission status
      stream.getTracks().forEach(track => track.stop());
      setCameraPermission('granted');
      
      // Show success message
      if (language === 'en') {
        alert('Camera access granted! You can now take photos.');
      } else {
        alert('कैमरा एक्सेस मिल गया! अब आप फोटो ले सकते हैं।');
      }
    } catch (error) {
      console.error('Permission request failed:', error);
      setCameraPermission('denied');
    }
  };

  const detectLocation = async () => {
    setIsDetectingLocation(true);
    
    try {
      // Request geolocation
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const { latitude, longitude } = position.coords;
            
            // Mock reverse geocoding with multiple location options
            const nearbyLocations = [
              {
                address: 'MG Road, Sector 15, Noida, Uttar Pradesh',
                area: 'Sector 15',
                zone: 'Zone A',
                pincode: '201301',
                coordinates: { lat: latitude, lng: longitude },
                landmark: 'Near Metro Station',
                type: 'main_road'
              },
              {
                address: 'Sector 15 Market, Noida, Uttar Pradesh',
                area: 'Sector 15',
                zone: 'Zone A',
                pincode: '201301',
                coordinates: { lat: latitude + 0.001, lng: longitude + 0.001 },
                landmark: 'Near Local Market',
                type: 'market'
              }
            ];
            
            // Select the most relevant location
            const selectedLocationData = nearbyLocations[0];
            
            setCurrentLocation(selectedLocationData);
            setLocation(selectedLocationData.address);
            
            // Auto-assign staff if category is selected
            if (selectedCategory) {
              const staff = assignStaffAutomatically(selectedCategory);
              setAssignedStaff(staff);
            }
            
            setIsDetectingLocation(false);
          },
          (error) => {
            console.error('Location error:', error);
            // Fallback to mock location
            const mockLocation = {
              address: 'Sector 15, Noida, Uttar Pradesh',
              area: 'Sector 15',
              zone: 'Zone A',
              coordinates: { lat: 28.6139, lng: 77.2090 },
              landmark: 'Near Metro Station'
            };
            setCurrentLocation(mockLocation);
            setLocation(mockLocation.address);
            setIsDetectingLocation(false);
          }
        );
      }
    } catch (error) {
      setIsDetectingLocation(false);
    }
  };

  const startCamera = async () => {
    try {
      // Check if mediaDevices is supported
      if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
        console.warn('Camera not supported on this device');
        fileInputRef.current?.click();
        return;
      }

      // Request camera permission
      const stream = await navigator.mediaDevices.getUserMedia({ 
        video: { 
          facingMode: 'environment',
          width: { ideal: 1280 },
          height: { ideal: 720 }
        } 
      });
      
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        setShowCamera(true);
        setCameraPermission('granted');
      }
    } catch (error) {
      console.error('Camera access error:', error);
      
      // Handle specific error types and update permission state
      if (error instanceof DOMException) {
        switch (error.name) {
          case 'NotAllowedError':
            setCameraPermission('denied');
            break;
          case 'NotFoundError':
            setCameraPermission('denied');
            alert(language === 'en' 
              ? 'No camera found on this device. Please choose a photo from gallery.' 
              : 'इस डिवाइस पर कोई कैमरा नहीं मिला। कृपया गैलरी से फोटो चुनें।'
            );
            break;
          case 'NotReadableError':
            setCameraPermission('denied');
            alert(language === 'en' 
              ? 'Camera is being used by another application. Please close other camera apps and try again.' 
              : 'कैमरा दूसरे एप्लिकेशन द्वारा उपयोग में है। कृपया अन्य कैमरा ऐप्स बंद करें और पुनः प्रयास करें।'
            );
            break;
          default:
            setCameraPermission('denied');
        }
      } else {
        setCameraPermission('denied');
      }
      
      // Fallback to file input
      fileInputRef.current?.click();
    }
  };

  const capturePhoto = () => {
    if (videoRef.current && canvasRef.current) {
      const video = videoRef.current;
      const canvas = canvasRef.current;
      const context = canvas.getContext('2d');
      
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      
      context?.drawImage(video, 0, 0);
      
      const imageDataUrl = canvas.toDataURL('image/jpeg', 0.8);
      setSelectedImages(prev => [...prev, imageDataUrl]);
      
      stopCamera();
    }
  };

  const stopCamera = () => {
    if (videoRef.current && videoRef.current.srcObject) {
      const stream = videoRef.current.srcObject as MediaStream;
      stream.getTracks().forEach(track => track.stop());
    }
    setShowCamera(false);
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files) {
      Array.from(files).forEach(file => {
        const reader = new FileReader();
        reader.onload = (e) => {
          const result = e.target && 'result' in e.target ? (e.target as FileReader).result : null;
          if (result) {
            setSelectedImages(prev => [...prev, result as string]);
          }
        };
        reader.readAsDataURL(file);
      });
    }
  };

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
    
    // Auto-assign staff when category changes
    if (currentLocation) {
  const staff = assignStaffAutomatically(category);
      setAssignedStaff(staff);
    }
  };

  const handleLocationSelect = (selectedLoc: any) => {
    setCurrentLocation(selectedLoc);
    setLocation(selectedLoc.address);
    setShowLocationSuggestions(false);
    
    // Auto-assign staff if category is selected
    if (selectedCategory) {
  const staff = assignStaffAutomatically(selectedCategory);
      setAssignedStaff(staff);
    }
  };

  const removeImage = (index: number) => {
    setSelectedImages(prev => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    
    // Prepare submission data
    const reportData = {
      title,
      description,
      location: currentLocation || location,
      category: selectedCategory,
      images: selectedImages,
      assignedStaff: assignedStaff,
      timestamp: new Date().toISOString(),
      priority: 'normal'
    };
    
    console.log('Submitting report:', reportData);
    
    // Simulate API submission
    setTimeout(() => {
      setIsSubmitting(false);
      onClose();
      // Here you would typically show a success message
    }, 2000);
  };

  const getEstimatedTime = (category: string) => {
    const timeEstimates: Record<string, string> = {
      road: '2-3 days',
      water: '1-2 days',
      electricity: '4-6 hours',
      garbage: '24 hours',
      other: '1-3 days'
    };
    return timeEstimates[category as keyof typeof timeEstimates] || '1-3 days';
  };

  // Helper to get category label with proper index signature


  const isFormValid = location && selectedCategory && title.trim();

  // Initialize camera permission check and cleanup
  useEffect(() => {
    checkCameraPermission();
    
    return () => {
      if (videoRef.current && videoRef.current.srcObject) {
        const stream = videoRef.current.srcObject as MediaStream;
        stream.getTracks().forEach(track => track.stop());
      }
    };
  }, []);

  if (showCamera) {
    return (
      <div className="fixed inset-0 bg-black z-50">
        <div className="relative w-full h-full">
          <video
            ref={videoRef}
            autoPlay
            playsInline
            className="w-full h-full object-cover"
          />
          <canvas ref={canvasRef} className="hidden" />
          
          {/* Camera Controls */}
          <div className="absolute bottom-8 left-0 right-0 flex justify-center items-center gap-6 px-4">
            <Button
              variant="outline"
              size="lg"
              onClick={stopCamera}
              className="bg-red-500/80 text-white border-red-500 hover:bg-red-600 backdrop-blur-sm"
            >
              <X className="w-6 h-6" />
            </Button>
            
            <Button
              size="lg"
              onClick={capturePhoto}
              className="w-20 h-20 rounded-full bg-white text-black hover:bg-gray-100 border-4 border-white shadow-2xl"
            >
              <Camera className="w-10 h-10" />
            </Button>
            
            <Button
              variant="outline"
              size="lg"
              onClick={() => fileInputRef.current?.click()}
              className="bg-blue-500/80 text-white border-blue-500 hover:bg-blue-600 backdrop-blur-sm"
            >
              <Image className="w-6 h-6" />
            </Button>
          </div>
          
          {/* Camera Info Overlay */}
          <div className="absolute top-4 left-4 right-4">
            <div className="bg-black/60 text-white p-4 rounded-xl backdrop-blur-sm">
              <p className="text-sm text-center">
                {language === 'en' ? 'Position the issue in the center and tap the capture button' : 'समस्या को केंद्र में रखें और कैप्चर बटन दबाएं'}
              </p>
              <div className="mt-2 flex justify-center">
                <div className="w-32 h-32 border-2 border-white/50 border-dashed rounded-lg"></div>
              </div>
            </div>
          </div>
          
          {/* Photo Counter */}
          <div className="absolute top-4 right-4">
            <div className="bg-black/60 text-white px-3 py-2 rounded-lg backdrop-blur-sm">
              <span className="text-sm">{selectedImages.length}/6</span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-white z-50 overflow-y-auto">
      <div className="min-h-screen p-4 pb-20">
        <Card className="max-w-md mx-auto shadow-blue-green border-0" style={{ background: 'rgba(255, 255, 255, 0.95)' }}>
          <CardHeader className="pb-4">
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-xl text-blue-green-gradient">{t.title}</CardTitle>
                <p className="text-gray-600 text-sm mt-1">{t.subtitle}</p>
              </div>
              <Button variant="ghost" size="sm" onClick={onClose}>
                <X size={20} />
              </Button>
            </div>
          </CardHeader>

          <CardContent className="space-y-6">
            {/* Enhanced Photo Section */}
            <div className="space-y-3">
              <Label className="flex items-center gap-2">
                <Camera className="w-4 h-4" />
                {t.photos} <span className="text-xs text-gray-500">({selectedImages.length}/6)</span>
              </Label>
              
              {/* Photo Grid */}
              <div className="grid grid-cols-3 gap-3">
                {selectedImages.map((image, index) => (
                  <div key={index} className="relative aspect-square">
                    <img
                      src={image}
                      alt={`Photo ${index + 1}`}
                      className="w-full h-full object-cover rounded-lg border-2 border-blue-200 shadow-sm"
                    />
                    <button
                      onClick={() => removeImage(index)}
                      className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center shadow-lg hover:bg-red-600 transition-colors"
                    >
                      <X size={12} />
                    </button>
                  </div>
                ))}
                
                {/* Camera Button */}
                {selectedImages.length < 6 && (
                  <button
                    onClick={startCamera}
                    className={`aspect-square border-2 border-dashed rounded-lg flex flex-col items-center justify-center transition-all duration-200 ${
                      cameraPermission === 'denied' 
                        ? 'border-red-300 text-red-600 hover:border-red-500 hover:bg-red-50' 
                        : 'border-blue-300 text-blue-600 hover:border-blue-500 hover:bg-blue-50'
                    }`}
                    title={
                      cameraPermission === 'denied' 
                        ? (language === 'en' ? 'Camera access denied - Click to try again' : 'कैमरा एक्सेस अस्वीकृत - पुनः प्रयास के लिए क्लिक करें')
                        : (language === 'en' ? 'Take photo with camera' : 'कैमरे से फोटो लें')
                    }
                  >
                    <Camera size={20} />
                    <span className="text-xs mt-1 text-center leading-tight">
                      {cameraPermission === 'denied' ? '📵' : ''} {t.takePhoto}
                    </span>
                    {cameraPermission === 'granted' && (
                      <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 rounded-full"></div>
                    )}
                  </button>
                )}
                
                {/* Gallery Button */}
                {selectedImages.length < 5 && (
                  <button
                    onClick={() => fileInputRef.current?.click()}
                    className="aspect-square border-2 border-dashed border-green-300 rounded-lg flex flex-col items-center justify-center text-green-600 hover:border-green-500 hover:bg-green-50 transition-all duration-200"
                  >
                    <Image size={20} />
                    <span className="text-xs mt-1 text-center leading-tight">{t.choosePhoto}</span>
                  </button>
                )}
              </div>
              
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                multiple
                className="hidden"
                onChange={handleFileUpload}
              />
              
              {/* Camera Permission Info */}
              {cameraPermission === 'denied' && (
                <CameraPermissionGuide 
                  language={language} 
                  onRetry={requestCameraPermission}
                />
              )}
              
              {cameraPermission === 'prompt' && (
                <Alert className="border-blue-200 bg-blue-50">
                  <Camera className="h-4 w-4 text-blue-600" />
                  <AlertDescription className="text-blue-800">
                    {language === 'en' 
                      ? 'Click the camera button to request camera access for taking photos.'
                      : 'फोटो लेने के लिए कैमरा एक्सेस का अनुरोध करने हेतु कैमरा बटन पर क्लिक करें।'
                    }
                  </AlertDescription>
                </Alert>
              )}
              
              {cameraPermission === 'granted' && selectedImages.length === 0 && (
                <Alert className="border-green-200 bg-green-50">
                  <CheckCircle className="h-4 w-4 text-green-600" />
                  <AlertDescription className="text-green-800">
                    {language === 'en' 
                      ? '✓ Camera access granted! Click the camera button to take photos of the issue.'
                      : '✓ कैमरा एक्सेस मिल गया! समस्या की फोटो लेने के लिए कैमरा बटन पर क्लिक करें।'
                    }
                  </AlertDescription>
                </Alert>
              )}
            </div>

            {/* Issue Title */}
            <div className="space-y-2">
              <Label htmlFor="title">{t.issueTitle} *</Label>
              <Input
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder={t.titlePlaceholder}
                className="border-blue-200 focus:border-blue-400"
              />
            </div>

            {/* Description */}
            <div className="space-y-2">
              <Label htmlFor="description">{t.description}</Label>
              <Textarea
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder={t.descPlaceholder}
                rows={4}
                className="border-blue-200 focus:border-blue-400"
              />
            </div>

            {/* Enhanced Location Section */}
            <div className="space-y-2 relative">
              <Label htmlFor="location" className="flex items-center gap-2">
                <MapPin className="w-4 h-4" />
                {t.location} *
              </Label>
              <div className="flex gap-2">
                <Input
                  id="location"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  placeholder="Enter location or detect automatically"
                  className="flex-1 border-blue-200 focus:border-blue-400"
                  onFocus={() => setShowLocationSuggestions(true)}
                />
                <Button
                  type="button"
                  variant="outline"
                  onClick={detectLocation}
                  disabled={isDetectingLocation}
                  className="flex-shrink-0 border-blue-300 text-blue-600 hover:bg-blue-50"
                >
                  <MapPin size={16} className={isDetectingLocation ? 'animate-spin' : ''} />
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => setShowLocationSuggestions(!showLocationSuggestions)}
                  className="border-gray-300 text-gray-600"
                >
                  <ChevronDown className={`w-4 h-4 transition-transform ${showLocationSuggestions ? 'rotate-180' : ''}`} />
                </Button>
              </div>
              
              {isDetectingLocation && (
                <div className="bg-blue-50 p-3 rounded-lg border border-blue-200">
                  <p className="text-sm text-blue-800 flex items-center gap-2">
                    <div className="w-4 h-4 border-2 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
                    {t.detectLocation}...
                  </p>
                </div>
              )}
              
              {currentLocation && (
                <Alert className="border-green-200 bg-green-50">
                  <CheckCircle className="h-4 w-4 text-green-600" />
                  <AlertDescription className="text-green-800">
                    <strong>{t.locationDetected}:</strong> {currentLocation.area}, {currentLocation.zone}
                    <br />
                    <span className="text-sm">📍 {currentLocation.landmark}</span>
                  </AlertDescription>
                </Alert>
              )}
              
              {showLocationSuggestions && (
                <LocationSuggestions 
                  onSelectLocation={handleLocationSelect} 
                  language={language} 
                />
              )}
            </div>

            {/* Category Selection */}
            <div className="space-y-2">
              <Label>{t.category} *</Label>
              <Select value={selectedCategory} onValueChange={handleCategoryChange}>
                <SelectTrigger className="border-blue-200 focus:border-blue-400">
                  <SelectValue placeholder={t.selectCategory} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="road">{t.categories.road}</SelectItem>
                  <SelectItem value="water">{t.categories.water}</SelectItem>
                  <SelectItem value="garbage">{t.categories.garbage}</SelectItem>
                  <SelectItem value="electricity">{t.categories.electricity}</SelectItem>
                  <SelectItem value="other">{t.categories.other}</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Auto-Assigned Staff Display */}
            {assignedStaff && (
              <Card className="border border-green-200 bg-green-50">
                <CardContent className="p-4">
                  <div className="flex items-center gap-2 mb-3">
                    <Users className="w-5 h-5 text-green-600" />
                    <Label className="text-green-800">{t.assignedStaff}</Label>
                  </div>
                  <div className="space-y-3">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <p className="font-semibold text-green-900">{assignedStaff.name}</p>
                        <p className="text-sm text-green-700">{assignedStaff.zone} • {t.categories[assignedStaff.department as keyof typeof t.categories]}</p>
                        <p className="text-xs text-green-600 mt-1">{assignedStaff.phone}</p>
                      </div>
                      <div className="flex flex-col items-end gap-1">
                        <div className="flex items-center gap-1">
                          <Star className="w-4 h-4 text-yellow-500 fill-current" />
                          <span className="text-sm font-medium">{assignedStaff.rating}</span>
                        </div>
                        <Badge className={
                          assignedStaff.availability === 'available' ? 'bg-green-100 text-green-800' :
                          assignedStaff.availability === 'busy' ? 'bg-yellow-100 text-yellow-800' :
                          'bg-red-100 text-red-800'
                        }>
                          {assignedStaff.availability}
                        </Badge>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div className="flex items-center gap-1">
                        <Clock className="w-4 h-4 text-blue-600" />
                        <div>
                          <p className="font-medium text-blue-800">{t.estimatedTime}</p>
                          <p className="text-blue-600">{getEstimatedTime(selectedCategory)}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-1">
                        <div className="w-4 h-4 rounded-full bg-blue-600 flex items-center justify-center">
                          <div className="w-2 h-2 bg-white rounded-full"></div>
                        </div>
                        <div>
                          <p className="font-medium text-gray-700">Workload</p>
                          <Badge className={
                            assignedStaff.workload === 'light' ? 'bg-green-100 text-green-800' :
                            assignedStaff.workload === 'moderate' ? 'bg-yellow-100 text-yellow-800' :
                            'bg-red-100 text-red-800'
                          }>
                            {assignedStaff.workload}
                          </Badge>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Submit Button */}
            <Button
              onClick={handleSubmit}
              disabled={isSubmitting || !isFormValid}
              className="w-full bg-blue-green-gradient hover:opacity-90 h-12 shadow-blue-green transform hover:scale-[1.02] transition-all duration-200 disabled:opacity-50 disabled:transform-none"
            >
              {isSubmitting ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                  {t.submitting}
                </>
              ) : (
                <>
                  <Upload size={20} className="mr-2" />
                  {t.submit}
                  {assignedStaff && <Badge className="ml-2 bg-white/20 text-white">Auto-Assigned</Badge>}
                </>
              )}
            </Button>
            
            {/* Form Validation Info */}
            <div className="text-center space-y-1">
              <p className="text-xs text-gray-500">
                {language === 'en' 
                  ? 'Title, location and category are required' 
                  : 'शीर्षक, स्थान और श्रेणी आवश्यक हैं'}
              </p>
              {assignedStaff && (
                <p className="text-xs text-green-600">
                  {language === 'en' 
                    ? `✓ Staff automatically assigned based on location and category` 
                    : '✓ स्थान और श्रेणी के आधार पर स्टाफ स्वचालित रूप से असाइन किया गया'}
                </p>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}