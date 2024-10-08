import { AriaSearchFieldProps } from '@react-aria/searchfield';

export interface SearchProps extends AriaSearchFieldProps {
  placeholder?: string;
  value?: string;
  setValue?: (value: string) => void;
  label?: string;
  className?: string;
}
