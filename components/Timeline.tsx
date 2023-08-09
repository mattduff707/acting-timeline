'use client';
import React from 'react';

interface Point {
  x: number;
  y: number;
  label: string;
}

interface Props {
  y: number[];
  x: number[];
  points: Point[];
}

const Timeline = ({ x, y, points }: Props) => {
  const width = `${x.length * 140}px`;
  const columns = `repeat(${x.length}, minmax(0, 1fr))`;
  const rows = `repeat(${y.length - 1}, minmax(0, 1fr))`;
  console.log(x);

  const boxes = y
    .slice()
    .reverse()
    .map((yVal, yIdx) => {
      const xs = x.map((xVal, xIdx) => {
        const isBorderLeft = xIdx === 0;
        const isBorderTop = yIdx === 0;
        const isBorderBottom = yIdx === y.length - 1;
        const isBorderRight = xIdx === x.length - 1;

        const borderLeft = isBorderLeft
          ? { style: 'solid', width: '0px', color: 'rgb(100,116,139)' }
          : { style: 'solid', width: '1px', color: 'rgb(71,85,105)' };
        const borderTop = isBorderTop
          ? { style: 'solid', width: '2px', color: 'rgb(71,85,105)' }
          : { style: 'solid', width: '1px', color: 'rgb(71,85,105)' };
        const borderBottom = isBorderBottom
          ? { style: 'solid', width: '5px', color: 'rgb(100,116,139)' }
          : { style: 'solid', width: '1px', color: 'rgb(71,85,105)' };
        const borderRight = isBorderRight
          ? { style: 'solid', width: '2px', color: 'rgb(71,85,105)' }
          : { style: 'solid', width: '1px', color: 'rgb(71,85,105)' };

        return (
          <div
            key={`${xIdx}-${yIdx}`}
            style={{
              borderColor: 'rgb(71,85,105)',
              //@ts-ignore
              borderLeftStyle: borderLeft.style,
              borderLeftWidth: borderLeft.width,
              borderLeftColor: borderLeft.color,
              //@ts-ignore
              borderTopStyle: borderTop.style,
              borderTopWidth: borderTop.width,
              borderTopColor: borderTop.color,
              //@ts-ignore
              borderBottomStyle: borderBottom.style,
              borderBottomWidth: borderBottom.width,
              borderBottomColor: borderBottom.color,
              //@ts-ignore
              borderRightStyle: borderRight.style,
              borderRightWidth: borderRight.width,
              borderRightColor: borderRight.color,
            }}
            className="border-slate-500 text-white"
          >
            {/* {`${xVal}-${yVal}`} */}
          </div>
        );
      });
      return xs;
    });

  return (
    <div className="h-full grid w-[fit-content] grid-cols-[120px_1fr] grid-rows-[1fr_120px] pt-8 pr-20 text-slate-300">
      <div className="sticky left-0 border-r-[5px] bg-slate-800 border-slate-500 pr-2 z-20">
        <div className="relative h-full">
          {y
            .slice()
            .reverse()
            .map((yVal, idx, arr) => {
              const top = `${(1 / (arr.length - 1)) * idx * 100}%`;
              return (
                <div
                  key={yVal}
                  style={{ top, right: '8px', transform: 'translateY(-50%)' }}
                  className="absolute text-slate-300 text-xl"
                >
                  {yVal}
                </div>
              );
            })}
        </div>
      </div>
      <div
        style={{ width, gridTemplateColumns: columns, gridTemplateRows: rows }}
        className={`h-full grid overflow-auto`}
      >
        {boxes.flat().map((box) => box)}
      </div>
      <div className="bg-slate-800 sticky left-0 z-10 shadow-[12px_6px_8px_0px_black] shadow-slate-800" />
      <div className="relative pt-2">
        {x.map((xVal, idx, arr) => {
          const left = `${(idx + 1) * 140}px`;
          return (
            <div key={xVal} style={{ left }} className="absolute translate-x-[-50%] text-xl">
              {xVal}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Timeline;
