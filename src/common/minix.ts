import React, { useEffect, useState } from 'react';
import { useWindowDimensions, Dimensions, Platform } from 'react-native';

export const useWindow = () => {
  const [windowDimensions, setWindowDimensions] = useState({
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  });

  useEffect(() => {
    if (Platform.OS === 'web') {
      const onChange = ({ window }) => {
        setWindowDimensions({ width: window.width, height: window.height });
        return true
      };
  
      Dimensions.addEventListener('change', onChange);
  
      return () => {
        Dimensions.removeEventListener('change', onChange);
      };
    }
  }, []);

  const RESPONSIVE_WIDTH = (size) => windowDimensions.width * size
  const RESPONSIVE_HEIGHT = (size) => windowDimensions.height * size
  
  return {RESPONSIVE_WIDTH, RESPONSIVE_HEIGHT};
};