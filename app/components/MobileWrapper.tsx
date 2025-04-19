import React from "react";

interface MobileWrapperProps {
  children: React.ReactNode;
}

export default function MobileWrapper({ children }: MobileWrapperProps) {
  return (
    <div className="w-screen h-screen bg-black flex items-center justify-center">
      <div className="relative w-full h-full max-w-[430px] max-h-[932px] overflow-hidden rounded-3xl border-8 border-black shadow-2xl">
        <div className="h-full w-full bg-white overflow-hidden">{children}</div>
      </div>
    </div>
  );
}
