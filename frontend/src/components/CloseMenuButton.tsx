import React from "react";
import { GrFormClose } from "react-icons/gr";

const CloseMenuButton: React.FC<{
  setOpened: React.Dispatch<React.SetStateAction<boolean>>;
  onClick?: () => void;
}> = ({ setOpened, onClick }) => {
  return (
    <div className="w-full flex justify-end">
      <div className="fixed bg-zinc-50 p-2 translate-x-6 -translate-y-5 rounded-xl shadow-xl">
        <button
          onClick={() => {
            setOpened(false);
            if (onClick) onClick();
          }}
          className="rounded-full shrink-0 w-11 h-11 hover:bg-zinc-100 active:bg-zinc-200 transition-all flex items-center justify-center"
        >
          <GrFormClose size={30} />
        </button>
      </div>
    </div>
  );
};

export default CloseMenuButton;
