import { LeadquelleTheme } from './config/theme.config';

declare module 'styled-components' {
  export interface DefaultTheme extends LeadquelleTheme {}
}
