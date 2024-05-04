export interface IFluentProps {
  size?: number;
  color?: IconColorScheme | string;
  color2?: IconColorScheme | string;
  className?: string;
  onClick?: React.MouseEventHandler<SVGSVGElement>;
}

export enum IconColorScheme {
  primaryText = "#334155",
  secondaryText = "#808fa4",
  primary = "#5f5af7",
  secondary = "#deddf1",
  error = "#ff2c56",
  background = "#ffffff",
  divider = "#b5c2d1"
}
export function IconLogoutOutline({
  size = 24,
  color = 'black',
  onClick,
  className
}: IFluentProps) {
  return (
    <svg
      width={size+`px`}
      height={size+`px`}
      viewBox={`0 -960 960 960`}
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
      onClick={onClick}
      className={className}
    >
      <path
      d='M206.78-100.78q-44.3 0-75.15-30.85-30.85-30.85-30.85-75.15v-546.44q0-44.3 30.85-75.15 30.85-30.85 75.15-30.85h277.74v106H206.78v546.44h277.74v106H206.78Zm425.87-152.09L559-328.39 657.61-427H355.48v-106h302.13L559-631.61l73.65-75.52L859.22-480 632.65-252.87Z'
      fill={color}
      />
    </svg>
  );
}