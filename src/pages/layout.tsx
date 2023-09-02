import React from "react";

type Props = {
  children: React.ReactElement;
};

export default function Layout({ children }: Props) {
  return (
    <div className="h-screen w-screen flex justify-center sm:items-center items-baseline ">
      {children}
    </div>
  );
}
