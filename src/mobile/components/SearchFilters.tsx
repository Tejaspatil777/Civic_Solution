import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  TextInput,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Icon from 'react-native-vector-icons/Feather';

import { useTheme } from '../theme/ThemeContext';

interface SearchFiltersProps {
  language: 'en' | 'hi';
}

export const SearchFilters: React.FC<SearchFiltersProps> = ({ language }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('');
  const [selectedLocation, setSelectedLocation] = useState('');

  const { theme } = useTheme();

  const categories = [
    { id: 'all', label: language === 'en' ? 'All Categories' : 'सभी श्रेणियां', icon: '🏢' },
    { id: 'roads', label: language === 'en' ? 'Roads' : 'सड़कें', icon: '🛣️' },
    { id: 'water', label: language === 'en' ? 'Water' : 'पानी', icon: '💧' },
    { id: 'garbage', label: language === 'en' ? 'Garbage' : 'कचरा', icon: '🗑️' },
    { id: 'electricity', label: language === 'en' ? 'Electricity' : 'बिजली', icon: '⚡' },
  ];

  const statuses = [
    { id: 'all', label: language === 'en' ? 'All Status' : 'सभी स्थिति' },
    { id: 'pending', label: language === 'en' ? 'Pending' : 'लंबित' },
    { id: 'in-progress', label: language === 'en' ? 'In Progress' : 'प्रगति में' },
    { id: 'resolved', label: language === 'en' ? 'Resolved' : 'हल' },
  ];

  const locations = [
    { id: 'all', label: language === 'en' ? 'All Locations' : 'सभी स्थान' },
    { id: 'sector-15', label: 'Sector 15, Noida' },
    { id: 'sector-16', label: 'Sector 16, Noida' },
    { id: 'sector-18', label: 'Sector 18, Noida' },
    { id: 'mg-road', label: 'MG Road' },
  ];

  const clearFilters = () => {
    setSearchQuery('');
    setSelectedCategory('');
    setSelectedStatus('');
    setSelectedLocation('');
  };

  return (
    <ScrollView 
      style={[styles.container, { backgroundColor: theme.colors.background }]}
      showsVerticalScrollIndicator={false}
    >
      <View style={styles.content}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={[styles.title, { color: theme.colors.foreground }]}>
            {language === 'en' ? 'Search & Filter Issues' : 'समस्याएं खोजें और फ़िल्टर करें'}
          </Text>
          <Text style={[styles.subtitle, { color: theme.colors.mutedForeground }]}>
            {language === 'en' ? 'Find specific civic issues in your area' : 'अपने क्षेत्र की विशिष्ट नागरिक समस्याएं खोजें'}
          </Text>
        </View>

        {/* Search Bar */}
        <View style={[styles.searchContainer, { backgroundColor: theme.colors.card }, theme.shadows.small]}>
          <Icon name="search" size={20} color={theme.colors.mutedForeground} />
          <TextInput
            style={[styles.searchInput, { color: theme.colors.foreground }]}
            placeholder={language === 'en' ? 'Search issues...' : 'समस्याएं खोजें...'}
            placeholderTextColor={theme.colors.mutedForeground}
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
          {searchQuery.length > 0 && (
            <TouchableOpacity onPress={() => setSearchQuery('')}>
              <Icon name="x" size={18} color={theme.colors.mutedForeground} />
            </TouchableOpacity>
          )}
        </View>

        {/* Category Filter */}
        <View style={[styles.filterSection, { backgroundColor: theme.colors.card }, theme.shadows.small]}>
          <Text style={[styles.filterTitle, { color: theme.colors.foreground }]}>
            {language === 'en' ? 'Category' : 'श्रेणी'}
          </Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {categories.map((category) => (
              <TouchableOpacity
                key={category.id}
                style={[
                  styles.filterChip,
                  { borderColor: theme.colors.border },
                  selectedCategory === category.id && { 
                    backgroundColor: theme.colors.primary,
                    borderColor: theme.colors.primary 
                  }
                ]}
                onPress={() => setSelectedCategory(category.id)}
              >
                <Text style={styles.chipIcon}>{category.icon}</Text>
                <Text style={[
                  styles.chipText,
                  { color: selectedCategory === category.id ? '#ffffff' : theme.colors.foreground }
                ]}>
                  {category.label}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {/* Status Filter */}
        <View style={[styles.filterSection, { backgroundColor: theme.colors.card }, theme.shadows.small]}>
          <Text style={[styles.filterTitle, { color: theme.colors.foreground }]}>
            {language === 'en' ? 'Status' : 'स्थिति'}
          </Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {statuses.map((status) => (
              <TouchableOpacity
                key={status.id}
                style={[
                  styles.filterChip,
                  { borderColor: theme.colors.border },
                  selectedStatus === status.id && { 
                    backgroundColor: theme.colors.secondary,
                    borderColor: theme.colors.secondary 
                  }
                ]}
                onPress={() => setSelectedStatus(status.id)}
              >
                <Text style={[
                  styles.chipText,
                  { color: selectedStatus === status.id ? '#ffffff' : theme.colors.foreground }
                ]}>
                  {status.label}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {/* Location Filter */}
        <View style={[styles.filterSection, { backgroundColor: theme.colors.card }, theme.shadows.small]}>
          <Text style={[styles.filterTitle, { color: theme.colors.foreground }]}>
            {language === 'en' ? 'Location' : 'स्थान'}
          </Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {locations.map((location) => (
              <TouchableOpacity
                key={location.id}
                style={[
                  styles.filterChip,
                  { borderColor: theme.colors.border },
                  selectedLocation === location.id && { 
                    backgroundColor: theme.colors.accent,
                    borderColor: theme.colors.accent 
                  }
                ]}
                onPress={() => setSelectedLocation(location.id)}
              >
                <Icon 
                  name="map-pin" 
                  size={14} 
                  color={selectedLocation === location.id ? '#ffffff' : theme.colors.mutedForeground} 
                />
                <Text style={[
                  styles.chipText,
                  { color: selectedLocation === location.id ? '#ffffff' : theme.colors.foreground }
                ]}>
                  {location.label}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {/* Active Filters */}
        {(selectedCategory || selectedStatus || selectedLocation || searchQuery) && (
          <View style={[styles.activeFilters, { backgroundColor: theme.colors.card }, theme.shadows.small]}>
            <View style={styles.activeFiltersHeader}>
              <Text style={[styles.activeFiltersTitle, { color: theme.colors.foreground }]}>
                {language === 'en' ? 'Active Filters' : 'सक्रिय फ़िल्टर'}
              </Text>
              <TouchableOpacity onPress={clearFilters}>
                <Text style={[styles.clearButton, { color: theme.colors.destructive }]}>
                  {language === 'en' ? 'Clear All' : 'सभी साफ़ करें'}
                </Text>
              </TouchableOpacity>
            </View>
            <View style={styles.activeFiltersList}>
              {searchQuery && (
                <View style={[styles.activeFilterChip, { backgroundColor: theme.colors.primary + '20' }]}>
                  <Text style={[styles.activeFilterText, { color: theme.colors.primary }]}>
                    "{searchQuery}"
                  </Text>
                </View>
              )}
              {selectedCategory && selectedCategory !== 'all' && (
                <View style={[styles.activeFilterChip, { backgroundColor: theme.colors.primary + '20' }]}>
                  <Text style={[styles.activeFilterText, { color: theme.colors.primary }]}>
                    {categories.find(c => c.id === selectedCategory)?.label}
                  </Text>
                </View>
              )}
              {selectedStatus && selectedStatus !== 'all' && (
                <View style={[styles.activeFilterChip, { backgroundColor: theme.colors.secondary + '20' }]}>
                  <Text style={[styles.activeFilterText, { color: theme.colors.secondary }]}>
                    {statuses.find(s => s.id === selectedStatus)?.label}
                  </Text>
                </View>
              )}
              {selectedLocation && selectedLocation !== 'all' && (
                <View style={[styles.activeFilterChip, { backgroundColor: theme.colors.accent + '20' }]}>
                  <Text style={[styles.activeFilterText, { color: theme.colors.accent }]}>
                    {locations.find(l => l.id === selectedLocation)?.label}
                  </Text>
                </View>
              )}
            </View>
          </View>
        )}

        {/* Apply Filters Button */}
        <TouchableOpacity style={styles.applyButton}>
          <LinearGradient
            colors={theme.gradients.blueGreen}
            style={styles.applyGradient}
          >
            <Icon name="filter" size={20} color="#ffffff" />
            <Text style={styles.applyText}>
              {language === 'en' ? 'Apply Filters' : 'फ़िल्टर लागू करें'}
            </Text>
          </LinearGradient>
        </TouchableOpacity>

        {/* Results Placeholder */}
        <View style={[styles.resultsContainer, { backgroundColor: theme.colors.card }, theme.shadows.small]}>
          <Icon name="search" size={40} color={theme.colors.mutedForeground} />
          <Text style={[styles.resultsText, { color: theme.colors.mutedForeground }]}>
            {language === 'en' 
              ? 'Search results will appear here' 
              : 'खोज परिणाम यहाँ दिखाई देंगे'}
          </Text>
          <Text style={[styles.resultsSubtext, { color: theme.colors.mutedForeground }]}>
            {language === 'en' 
              ? 'Use filters above to find specific issues' 
              : 'विशिष्ट समस्याएं खोजने के लिए ऊपर फ़िल्टर का उपयोग करें'}
          </Text>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    padding: 16,
    paddingBottom: 100, // For tab bar
  },
  header: {
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 16,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 12,
    marginBottom: 16,
  },
  searchInput: {
    flex: 1,
    marginLeft: 12,
    fontSize: 16,
  },
  filterSection: {
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
  },
  filterTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 12,
  },
  filterChip: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
    marginRight: 8,
  },
  chipIcon: {
    fontSize: 16,
    marginRight: 6,
  },
  chipText: {
    fontSize: 14,
    fontWeight: '500',
  },
  activeFilters: {
    padding: 16,
    borderRadius: 12,
    marginBottom: 16,
  },
  activeFiltersHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  activeFiltersTitle: {
    fontSize: 16,
    fontWeight: '600',
  },
  clearButton: {
    fontSize: 14,
    fontWeight: '500',
  },
  activeFiltersList: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  activeFilterChip: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
  },
  activeFilterText: {
    fontSize: 12,
    fontWeight: '500',
  },
  applyButton: {
    borderRadius: 12,
    overflow: 'hidden',
    marginBottom: 20,
  },
  applyGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    gap: 8,
  },
  applyText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
  },
  resultsContainer: {
    alignItems: 'center',
    paddingVertical: 40,
    borderRadius: 12,
  },
  resultsText: {
    fontSize: 16,
    fontWeight: '500',
    marginTop: 16,
    textAlign: 'center',
  },
  resultsSubtext: {
    fontSize: 14,
    marginTop: 8,
    textAlign: 'center',
  },
});