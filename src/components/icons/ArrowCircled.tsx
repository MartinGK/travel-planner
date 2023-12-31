import { memo, SVGAttributes } from "react";

enum direction {
  left = "rotate-0",
  right = "rotate-180",
}

type AdditionalProps = {
  direction: keyof typeof direction;
};

const ArrowCircled = memo(
  (props: AdditionalProps & SVGAttributes<SVGElement>) => {
    return (
      <svg
        stroke="currentColor"
        fill="currentColor"
        strokeWidth="0"
        aria-label="arrow-circled"
        role="icon"
        viewBox="0 0 16 16"
        height="1em"
        width="1em"
        xmlns="http://www.w3.org/2000/svg"
        {...props}
        className={`svg-arrow-circled ${props.className || ""} ${
          direction[props.direction]
        }`}
      >
        <path d="M8 0a8 8 0 1 0 0 16A8 8 0 0 0 8 0zm3.5 7.5a.5.5 0 0 1 0 1H5.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L5.707 7.5H11.5z"></path>
      </svg>
    );
  }
);

ArrowCircled.displayName = "ArrowCircled";
export default ArrowCircled;
