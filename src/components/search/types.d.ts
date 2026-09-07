export interface SearchProps {
  placeholder?: string;
  value?: string;
  setValue?: (value: string) => void;
  label?: string;
  hasIcon?: boolean;
  className?: string;
  children?: React.ReactNode;
}
