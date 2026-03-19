import cn from '@/lib/classnames';

export const ShareSVG = ({ className }: { className: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="22"
    height="22"
    viewBox="0 0 22 22"
    fill="none"
    className={cn('stroke-current', className)}
  >
    <path
      d="M16.5 7.33325C18.0188 7.33325 19.25 6.10204 19.25 4.58325C19.25 3.06447 18.0188 1.83325 16.5 1.83325C14.9812 1.83325 13.75 3.06447 13.75 4.58325C13.75 6.10204 14.9812 7.33325 16.5 7.33325Z"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M5.5 13.75C7.01878 13.75 8.25 12.5188 8.25 11C8.25 9.48122 7.01878 8.25 5.5 8.25C3.98122 8.25 2.75 9.48122 2.75 11C2.75 12.5188 3.98122 13.75 5.5 13.75Z"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M16.5 20.1667C18.0188 20.1667 19.25 18.9355 19.25 17.4167C19.25 15.898 18.0188 14.6667 16.5 14.6667C14.9812 14.6667 13.75 15.898 13.75 17.4167C13.75 18.9355 14.9812 20.1667 16.5 20.1667Z"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M7.87402 12.3843L14.1349 16.0326"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M14.1257 5.96753L7.87402 9.61586"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export default ShareSVG;
