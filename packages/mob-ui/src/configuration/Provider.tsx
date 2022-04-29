import * as React from 'react';
import { StatusBar, Platform } from 'react-native';
// import { Provider as PaperProvider, DefaultTheme } from 'react-native-paper';
import { ThemeProvider, CreateThemeOptions } from '@rneui/themed';
import { ActionSheetProvider } from '@expo/react-native-action-sheet';

// import { ThemeProvider } from '@rneui/themed';

interface AppProviderProps {
  theme: CreateThemeOptions;
  children: React.ReactNode;
}

// const AppProvider = ({ theme, children }: AppProviderProps) => {
//   return (
//     <ActionSheetProvider>
//       <PaperProvider {...{ theme }}>
//         <>
//           {Platform.OS === 'ios' && <StatusBar barStyle={'dark-content'} />}
//           {children}
//         </>
//       </PaperProvider>
//     </ActionSheetProvider>
//   );
// };

const AppProvider = ({ theme, children }: AppProviderProps) => {
  return (
    <ActionSheetProvider>
      <ThemeProvider {...{ theme }}>
        <>
          {Platform.OS === 'ios' && <StatusBar barStyle={'dark-content'} />}
          {children}
        </>
      </ThemeProvider>
    </ActionSheetProvider>
  );
};

export default AppProvider;
