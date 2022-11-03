import React from "react";

export const HamburgerMenuIcon: React.FC<{
  onClick?: React.MouseEventHandler<HTMLDivElement>;
  opened: boolean;
  clicked: boolean;
}> = ({ onClick }) => {
  return (
    <div
      className="w-11 h-11 flex items-center justify-center rounded-full hover:bg-zinc-200 transition-all active:bg-zinc-300 cursor-pointer"
      style={{
        minWidth: "2.75rem",
        minHeight: "2.75rem",
        height: "2.75rem",
        width: "2.75rem",
      }}
      onClick={onClick}
    >
      <div className="w-7 h-7 flex-col gap-3 flex items-center justify-center">
        <svg
          viewBox="0 0 24 24"
          preserveAspectRatio="xMidYMid meet"
          focusable="false"
          className="style-scope yt-icon"
          style={{
            pointerEvents: "none",
            display: "block",
            width: "100%",
            height: "100%",
          }}
        >
          <g className="style-scope yt-icon">
            <path
              d="M21,6H3V5h18V6z M21,11H3v1h18V11z M21,17H3v1h18V17z"
              className="style-scope yt-icon"
            ></path>
          </g>
        </svg>
      </div>
    </div>
  );
};
