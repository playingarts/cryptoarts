import { FC, HTMLAttributes } from "react";

const Instagram: FC<HTMLAttributes<SVGElement>> = (props) => (
  <>
    <svg
      width="26"
      height="26"
      viewBox="0 0 26 26"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      css={{
        transition: "fill, fill-opacity 2s ease-out",
        // fill: "#333333",
        fillOpacity: 1,
      }}
    >
      <g clip-path="url(#clip0_98_1189)">
        {/* outer */}
        <path
          d="M18.7391 1H7.26087C3.80309 1 1 3.80309 1 7.26087V18.7391C1 22.1969 3.80309 25 7.26087 25H18.7391C22.1969 25 25 22.1969 25 18.7391V7.26087C25 3.80309 22.1969 1 18.7391 1Z"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        {/* inner circle */}
        <path
          d="M12.9996 18.2175C15.8811 18.2175 18.217 15.8816 18.217 13.0001C18.217 10.1186 15.8811 7.78271 12.9996 7.78271C10.1181 7.78271 7.78223 10.1186 7.78223 13.0001C7.78223 15.8816 10.1181 18.2175 12.9996 18.2175Z"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
          // fill="white"
          // fill="#333334"
        />
        {/* dot */}
        <path
          d="M19.7829 7.52166C20.5032 7.52166 21.0872 6.93768 21.0872 6.21731C21.0872 5.49694 20.5032 4.91296 19.7829 4.91296C19.0625 4.91296 18.4785 5.49694 18.4785 6.21731C18.4785 6.93768 19.0625 7.52166 19.7829 7.52166Z"
          fill="currentColor"
          // fill="white"
        />
      </g>
      <defs>
        <clipPath id="clip0_98_1189">
          <rect width="26" height="26" />
        </clipPath>
      </defs>
    </svg>
    {/* <svg
      width="26"
      height="26"
      viewBox="0 0 26 26"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M0 7.26087C0 3.2508 3.2508 0 7.26087 0H18.7391C22.7492 0 26 3.2508 26 7.26087V18.7391C26 22.7492 22.7492 26 18.7391 26H7.26087C3.2508 26 0 22.7492 0 18.7391V7.26087ZM9 13C9 10.7909 10.7909 9 13 9C15.2091 9 17 10.7909 17 13C17 15.2091 15.2091 17 13 17C10.7909 17 9 15.2091 9 13ZM21.0872 6.21719C21.0872 6.93756 20.5032 7.52154 19.7829 7.52154C19.0625 7.52154 18.4785 6.93756 18.4785 6.21719C18.4785 5.49682 19.0625 4.91284 19.7829 4.91284C20.5032 4.91284 21.0872 5.49682 21.0872 6.21719Z"
        fill="#333333"
      />
    </svg> */}
  </>
);

export default Instagram;
