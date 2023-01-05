import { NavigationContainer } from '@react-navigation/native';

export const parameters = {
  actions: { argTypesRegex: '^on[A-Z].*' },
  layout: 'centered',
};

export const decorators = [
  (Story) => (
    <NavigationContainer>
      <Story />
    </NavigationContainer>
  ),
];
