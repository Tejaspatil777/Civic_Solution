import React from 'react';
import { Camera, Smartphone } from 'lucide-react';
import { Alert, AlertDescription } from './ui/alert';
import { Button } from './ui/button';

interface CameraPermissionGuideProps {
  language: 'en' | 'hi';
  onRetry: () => void;
}

export function CameraPermissionGuide({ language, onRetry }: CameraPermissionGuideProps) {
  const text = {
    en: {
      title: 'Enable Camera Access',
      steps: [
        'Click the camera icon 📷 in your browser address bar',
        'Select "Allow" for camera permission',
        'Refresh the page if needed',
        'Or use the gallery button to upload photos'
      ],
      alternativeTitle: 'Alternative Options:',
      alternatives: [
        'Use the gallery button to select existing photos',
        'Take photos with your device camera and upload them',
        'Continue without photos (optional)'
      ],
      tryAgain: 'Try Camera Again',
      browserHelp: 'Need help? Look for the camera icon in your browser\'s address bar and click "Allow".'
    },
    hi: {
      title: 'कैमरा एक्सेस सक्षम करें',
      steps: [
        'अपने ब्राउज़र के एड्रेस बार में कैमरा आइकन 📷 पर क्लिक करें',
        'कैमरा अनुमति के लिए "अनुमति दें" चुनें',
        'यदि आवश्यक हो तो पेज रीफ्रेश करें',
        'या फोटो अपलोड करने के लिए गैलरी बटन का उपयोग करें'
      ],
      alternativeTitle: 'वैकल्पिक विकल्प:',
      alternatives: [
        'मौजूदा फोटो चुनने के लिए गैलरी बटन का उपयोग करें',
        'अपने डिवाइस कैमरे से फोटो लें और उन्हें अपलोड करें',
        'फोटो के बिना जारी रखें (वैकल्पिक)'
      ],
      tryAgain: 'कैमरा पुनः प्रयास करें',
      browserHelp: 'सहायता चाहिए? अपने ब्राउज़र के एड्रेस बार में कैमरा आइकन देखें और "अनुमति दें" पर क्लिक करें।'
    }
  };

  const t = text[language];

  return (
    <Alert className="border-orange-200 bg-orange-50">
      <Camera className="h-4 w-4 text-orange-600" />
      <AlertDescription className="text-orange-800">
        <div className="space-y-3">
          <div>
            <strong>{t.title}</strong>
          </div>
          
          <div className="space-y-1">
            {t.steps.map((step, index) => (
              <div key={index} className="flex items-start gap-2 text-sm">
                <span className="flex-shrink-0 w-5 h-5 bg-orange-100 text-orange-700 rounded-full flex items-center justify-center text-xs font-medium">
                  {index + 1}
                </span>
                <span>{step}</span>
              </div>
            ))}
          </div>

          <div className="pt-2 border-t border-orange-200">
            <div className="font-medium text-sm mb-2">{t.alternativeTitle}</div>
            <div className="space-y-1">
              {t.alternatives.map((alt, index) => (
                <div key={index} className="flex items-start gap-2 text-sm">
                  <span className="flex-shrink-0">•</span>
                  <span>{alt}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="flex gap-2 pt-2">
            <Button
              variant="outline"
              size="sm"
              onClick={onRetry}
              className="border-orange-300 text-orange-700 hover:bg-orange-100"
            >
              <Camera className="w-4 h-4 mr-1" />
              {t.tryAgain}
            </Button>
          </div>

          <div className="text-xs text-orange-600 bg-orange-100 p-2 rounded">
            <Smartphone className="w-4 h-4 inline mr-1" />
            {t.browserHelp}
          </div>
        </div>
      </AlertDescription>
    </Alert>
  );
}