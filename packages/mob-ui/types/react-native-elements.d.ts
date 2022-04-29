declare module '@rneui/themed' {
  export interface Colors {
    red: string;
  }
  export interface AvatarProps {
    color: string;
  }
  export interface MyComponentProps {
    width: number;
  }
  export interface ComponentTheme {
    Avatar: Partial<AvatarProps>;
    MyComponent: Partial<MyComponentProps>;
  }
  export interface Theme {
    myColors?: {
      red: string;
    };
  }
}
