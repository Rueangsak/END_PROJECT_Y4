/** Inline SVG icons — avoids @mui/icons-material → @mui/material/utils require chain in Vite dev */
const iconProps = (props) => ({
  width: '1em',
  height: '1em',
  viewBox: '0 0 24 24',
  fill: 'currentColor',
  'aria-hidden': true,
  ...props,
});

export function CloudOutlinedIcon(props) {
  return (
    <svg {...iconProps(props)}>
      <path d="M12 6c2.62 0 4.88 1.86 5.39 4.43l.3 1.5 1.53.11c1.56.1 2.78 1.41 2.78 2.96 0 1.65-1.35 3-3 3H6c-2.21 0-4-1.79-4-4 0-2.05 1.53-3.76 3.56-3.97l1.07-.11.5-.95C8.08 7.14 9.94 6 12 6m0-2C9.11 4 6.6 5.64 5.35 8.04 2.34 8.36 0 10.91 0 14c0 3.31 2.69 6 6 6h13c2.76 0 5-2.24 5-5 0-2.64-2.05-4.78-4.65-4.96C18.67 6.59 15.64 4 12 4z" />
    </svg>
  );
}

export function PollOutlinedIcon(props) {
  return (
    <svg {...iconProps(props)}>
      <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zM9 17H7v-7h2v7zm4 0h-2V7h2v10zm4 0h-2v-4h2v4z" />
    </svg>
  );
}

export function QuestionAnswerOutlinedIcon(props) {
  return (
    <svg {...iconProps(props)}>
      <path d="M15 8v2H7v-2h8zm4-6H5c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h4v2l4-2h6c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm0 14H5V4h14v12z" />
    </svg>
  );
}

export function LeaderboardOutlinedIcon(props) {
  return (
    <svg {...iconProps(props)}>
      <path d="M16 11c1.66 0 2.99-1.34 2.99-3L19 4c0-1.66-1.34-3-3-3s-3 1.34-3 3v4c0 1.66 1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3L11 4c0-1.66-1.34-3-3-3S5 2.34 5 4v4c0 1.66 1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V20h14v-3.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V20h6v-3.5c0-2.33-4.67-3.5-7-3.5z" />
    </svg>
  );
}
