import React from 'react';
import { ActivityIndicator } from 'react-native';

import { COLORS } from '../styles';

export const Spinner: React.FC = () => <ActivityIndicator size="large" color={COLORS.MAIN_DARK} />;
