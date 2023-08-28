import React from "react";

type Props = {
  children: React.ReactElement;
};

export default function Layout({ children }: Props) {
  return (
    <div className="w-screen h-screen white relative">
      <div className="absolute opacity-30 w-1/2 h-1/2 layout-background rounded-full top-1/2 transform -translate-y-1/3 left-1/2 -translate-x-2/3 -z-50 blur" />
      <div className="absolute opacity-30 w-1/2 h-1/2 layout-background rounded-full top-1/2 transform -translate-y-2/3 left-1/2 -translate-x-1/3 -z-50 blur" />
      {children}
    </div>
  );
}
