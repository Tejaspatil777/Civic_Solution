import { useState } from 'react';
import { MapPin, Navigation, Building, Home } from 'lucide-react';
import { Button } from './ui/button';
import { Card, CardContent } from './ui/card';

interface LocationSuggestionsProps {
  onSelectLocation: (location: any) => void;
  language: 'en' | 'hi';
}

export function LocationSuggestions({ onSelectLocation, language }: LocationSuggestionsProps) {
  const popularLocations = [
    {
      id: 1,
      name: 'Sector 15 Metro Station',
      area: 'Sector 15',
      zone: 'Zone A',
      type: 'transport',
      icon: '🚇',
      coordinates: { lat: 28.6139, lng: 77.2090 }
    },
    {
      id: 2,
      name: 'DLF Mall of India',
      area: 'Sector 18',
      zone: 'Zone A',
      type: 'commercial',
      icon: '🏬',
      coordinates: { lat: 28.6200, lng: 77.2100 }
    },
    {
      id: 3,
      name: 'Botanical Garden',
      area: 'Sector 38A',
      zone: 'Zone B',
      type: 'park',
      icon: '🌳',
      coordinates: { lat: 28.5650, lng: 77.3340 }
    },
    {
      id: 4,
      name: 'City Centre Metro',
      area: 'Sector 32',
      zone: 'Zone B',
      type: 'transport',
      icon: '🚇',
      coordinates: { lat: 28.5750, lng: 77.3200 }
    },
    {
      id: 5,
      name: 'Worlds of Wonder',
      area: 'Sector 38A',
      zone: 'Zone B',
      type: 'entertainment',
      icon: '🎢',
      coordinates: { lat: 28.5680, lng: 77.3350 }
    },
    {
      id: 6,
      name: 'Noida Stadium',
      area: 'Sector 21A',
      zone: 'Zone A',
      type: 'sports',
      icon: '🏟️',
      coordinates: { lat: 28.5920, lng: 77.3100 }
    }
  ];

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'transport': return <Navigation className="w-4 h-4" />;
      case 'commercial': return <Building className="w-4 h-4" />;
      case 'residential': return <Home className="w-4 h-4" />;
      default: return <MapPin className="w-4 h-4" />;
    }
  };

  return (
    <Card className="mt-2 border-blue-200 bg-white shadow-lg">
      <CardContent className="p-3">
        <div className="space-y-2">
          <p className="text-sm font-medium text-gray-700 mb-3">
            {language === 'en' ? 'Popular Locations' : 'लोकप्रिय स्थान'}
          </p>
          <div className="space-y-1 max-h-48 overflow-y-auto">
            {popularLocations.map((loc) => (
              <Button
                key={loc.id}
                variant="ghost"
                className="w-full justify-start p-3 h-auto hover:bg-blue-50"
                onClick={() => onSelectLocation(loc)}
              >
                <div className="flex items-center gap-3 w-full">
                  <div className="flex items-center gap-2">
                    <span className="text-lg">{loc.icon}</span>
                    {getTypeIcon(loc.type)}
                  </div>
                  <div className="flex-1 text-left">
                    <p className="font-medium text-sm">{loc.name}</p>
                    <p className="text-xs text-gray-600">{loc.area} • {loc.zone}</p>
                  </div>
                </div>
              </Button>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}