import { LeadquelleTheme } from './config/theme.config';

declare module 'styled-components' {
  export type DefaultTheme = LeadquelleTheme;
}
