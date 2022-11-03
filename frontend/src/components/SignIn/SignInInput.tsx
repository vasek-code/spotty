import React from "react";

export const SignInInput: React.FC<{
  placeholder: string;
  type: string;
  id: string;
  name: string;
}> = ({ placeholder, type, id, name }) => {
  return (
    <>
      <input
        className="bg-zinc-200 rounded-lg flex px-4 w-full h-12 border-2 border-transparent focus-visible:border-zinc-300 outline-none transition-all font-semibold"
        placeholder={placeholder}
        name={name}
        type={type}
        id={id}
      />
    </>
  );
};
