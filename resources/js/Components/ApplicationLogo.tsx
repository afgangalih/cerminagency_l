import React, { SVGAttributes } from 'react';

export default function ApplicationLogo(props: SVGAttributes<SVGElement>) {
  return (
    <div className="flex items-center gap-2.5">
      <img
        src="/images/cermin-logo.png"
        alt="Cermin Kreatif Logo"
        className="w-9 h-9 rounded-full object-cover shrink-0 shadow-xs border border-zinc-200/80"
      />
      <div className="flex flex-col leading-tight">
        <span className="font-bold tracking-tight text-zinc-950 text-base font-sans">
          Cermin Kreatif
        </span>
        <span className="text-[10px] font-mono tracking-wider text-[#01A0CA] font-semibold -mt-0.5">
          Studio OS
        </span>
      </div>
    </div>
  );
}
