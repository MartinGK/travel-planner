import React from "react";

type Props = { children: React.ReactNode };

export default function Card({ children }: Props) {
  return (
    <div className="rounded-3xl max-w-screen-md h-auto grid bg-white shadow-md px-14 py-8 w-full xs:w-fit">
      {children}
    </div>
  );
}
