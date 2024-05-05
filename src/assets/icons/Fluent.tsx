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
  color = "black",
  onClick,
  className
}: IFluentProps) {
  return (
    <svg
      width={size + `px`}
      height={size + `px`}
      viewBox={`0 -960 960 960`}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      onClick={onClick}
      className={className}
    >
      <path
        d="M206.78-100.78q-44.3 0-75.15-30.85-30.85-30.85-30.85-75.15v-546.44q0-44.3 30.85-75.15 30.85-30.85 75.15-30.85h277.74v106H206.78v546.44h277.74v106H206.78Zm425.87-152.09L559-328.39 657.61-427H355.48v-106h302.13L559-631.61l73.65-75.52L859.22-480 632.65-252.87Z"
        fill={color}
      />
    </svg>
  );
}

export function StickerInventory({
  size = 24,
  color = "black",
  onClick,
  className
}: IFluentProps) {
  return (
    <svg
      width={size + `px`}
      height={size + `px`}
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      x={0}
      y={0}
      viewBox="0 0 512 512"
      xmlSpace="preserve"
    >
      <g>
        <rect
          width={272}
          height={376}
          x={144}
          y={56}
          fill="#ffffff"
          rx={24}
          opacity={1}
          data-original="#0093b9"
          className=""
        />
        <path
          fill="#e3e4e2"
          d="M176 88h208v312H176z"
          opacity={1}
          data-original="#e3e4e2"
          className=""
        />
        <path
          fill="#ffc100"
          d="M336 88H224V56h32l-8-32h64l-8 32h32z"
          opacity={1}
          data-original="#57c3c1"
          className=""
        />
        <path
          fill="#ffc100"
          d="M320 488H32V232h144v128h144z"
          opacity={1}
          data-original="#f8bc1e"
          className=""
        />
        <path
          fill="#f9da62"
          d="M224 360h48v48h-48z"
          opacity={1}
          data-original="#f9da62"
          className=""
        />
        <path
          fill="#f5a922"
          d="M320 368h-12a12 12 0 0 0-12 12v20.305A63.7 63.7 0 0 1 232.305 464H196a12 12 0 0 0-12 12v12h136z"
          opacity={1}
          data-original="#f5a922"
          className=""
        />
        <path
          fill="#f9da62"
          d="M80 360h48v48H80z"
          opacity={1}
          data-original="#f9da62"
          className=""
        />
        <path
          fill="#f5a922"
          d="M176 368h-12a12 12 0 0 0-12 12v20.305A63.7 63.7 0 0 1 88.305 464H52a12 12 0 0 0-12 12v12h136z"
          opacity={1}
          data-original="#f5a922"
          className=""
        />
        <path
          fill="#f9da62"
          d="M80 232h48v48H80z"
          opacity={1}
          data-original="#f9da62"
          className=""
        />
        <path
          fill="#f5a922"
          d="M176 240h-12a12 12 0 0 0-12 12v20.305A63.7 63.7 0 0 1 88.305 336H52a12 12 0 0 0-12 12v12h136z"
          opacity={1}
          data-original="#f5a922"
          className=""
        />
        <path
          fill="#ffc100"
          d="m465.844 261.948-214.6 64.208L216 320l26.071-24.5 214.6-64.208a16 16 0 0 1 19.915 10.742 16 16 0 0 1-10.742 19.914z"
          opacity={1}
          data-original="#f8bc1e"
          className=""
        />
        <path
          d="M484.25 239.741a24 24 0 0 0-29.871-16.114l-214.6 64.207a8.016 8.016 0 0 0-3.185 1.835l-26.072 24.5a8 8 0 0 0 4.1 13.711l35.243 6.156a8.019 8.019 0 0 0 3.67-.216l174.128-52.1.754 16.475-55.33 16.554 4.586 15.33 61.314-18.346a8 8 0 0 0 5.7-8.029L443.464 277l24.673-7.382a24 24 0 0 0 16.113-29.872zm-233.49 78.21-17.622-3.078 13.036-12.251 36.512-10.922 4.586 15.328zm51.84-15.511-4.586-15.328 128.142-38.341.754 16.476zm165.7-52.023a7.952 7.952 0 0 1-4.748 3.867l-20.841 6.235-.754-16.475 17.009-5.089a8 8 0 0 1 9.334 11.462z"
          fill="#000000"
          opacity={1}
          data-original="#000000"
          className=""
        />
        <path
          d="M320 352H184V232a8 8 0 0 0-8-8H32a8 8 0 0 0-8 8v256a8 8 0 0 0 8 8h288a8 8 0 0 0 8-8V360a8 8 0 0 0-8-8zm-88 16h32v32h-32zM88 240h32v32H88zm-48 0h32v40a8 8 0 0 0 8 8h48a8 8 0 0 0 8-8v-40h32v112H40zm48 128h32v32H88zm-48 0h32v40a8 8 0 0 0 8 8h48a8 8 0 0 0 8-8v-40h32v112H40zm272 112H184V368h32v40a8 8 0 0 0 8 8h48a8 8 0 0 0 8-8v-40h32z"
          fill="#000000"
          opacity={1}
          data-original="#000000"
          className=""
        />
        <path
          d="M280 448h16v16h-16zM136 448h16v16h-16zM136 320h16v16h-16zM152 80a16.019 16.019 0 0 1 16-16h48v16h-40a8 8 0 0 0-8 8v120h16V96h192v128h16V88a8 8 0 0 0-8-8h-40V64h48a16.019 16.019 0 0 1 16 16v136h16V80a32.036 32.036 0 0 0-32-32h-77.754l5.515-22.06A8 8 0 0 0 312 16h-64a8 8 0 0 0-7.761 9.94L245.754 48H168a32.036 32.036 0 0 0-32 32v128h16zm80-16h24a8 8 0 0 0 7.761-9.94L258.246 32h43.508l-5.515 22.06A8 8 0 0 0 304 64h24v16h-96zM408 408a16.019 16.019 0 0 1-16 16h-48v16h48a32.036 32.036 0 0 0 32-32v-72h-16z"
          fill="#000000"
          opacity={1}
          data-original="#000000"
          className=""
        />
        <path
          d="M392 400v-56h-16v48h-32v16h40a8 8 0 0 0 8-8zM248 120a8 8 0 0 0-8-8h-32a8 8 0 0 0-8 8v32a8 8 0 0 0 8 8h32a8 8 0 0 0 8-8zm-16 24h-16v-16h16zM240 184h-32a8 8 0 0 0-8 8v32a8 8 0 0 0 8 8h32a8 8 0 0 0 8-8v-32a8 8 0 0 0-8-8zm-8 32h-16v-16h16zM264 112h16v16h-16zM264 144h96v16h-96zM296 112h64v16h-64zM264 184h16v16h-16zM264 216h96v16h-96zM296 184h64v16h-64z"
          fill="#000000"
          opacity={1}
          data-original="#000000"
          className=""
        />
      </g>
    </svg>
  );
}


export function SearchFilled({
  size = 24,
  color = "black",
  onClick,
  className
}: IFluentProps) {
  return (
    <svg
      width={`${size}px`}
      height={`${size}px`}
      fill="none"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
      onClick={onClick}
      className={className}
    >
      <path
        d="M10 2.5a7.5 7.5 0 0 1 5.964 12.048l4.743 4.745a1 1 0 0 1-1.32 1.497l-.094-.083-4.745-4.743A7.5 7.5 0 1 1 10 2.5Zm0 2a5.5 5.5 0 1 0 0 11 5.5 5.5 0 0 0 0-11Z"
        fill={color}
      />
    </svg>
  );
}