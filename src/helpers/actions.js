import React from 'react';

export const actions = React.useMemo(
  () => [
    {
      icon: 'lock-outline',
      name: 'Privacy policy',
      routeName: 'PrivacyPolicy',
    },
    {
      icon: 'shield-lock',
      name: 'Private conversations',
      routeName: 'PrivateMessage',
    },
    {
      icon: 'skull-crossbones-outline',
      name: 'Crash me if you can',
      routeName: 'Crasher',
    },
    {
      icon: 'logout',
      name: 'Logout',
      routeName: null,
    },
  ],
  [],
);
