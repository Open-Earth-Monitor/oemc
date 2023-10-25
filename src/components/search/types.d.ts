export interface SearchProps extends AriaSearchFieldProps {
  theme?: 'dark' | 'light';
  placeholder?: string;
  value?: string;
  setValue?: (value: string) => void;
  label?: string;
}
