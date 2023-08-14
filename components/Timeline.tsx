"use client";
import { differenceInDays, getDaysInYear, getYear, isSameYear } from "date-fns";
import React from "react";

interface Point {
  x: number;
  y: number;
  hoverComponent: React.ReactElement;
}

interface Props {
  y: number[];
  x: number[];
  points: Point[];
  xLabel: string;
  yLabel: string;
}

const Timeline = ({ x, y, points, xLabel, yLabel }: Props) => {
  const width = `${x.length * 140}px`;
  const columns = `repeat(${x.length}, minmax(0, 1fr))`;
  const rows = `repeat(${y.length - 1}, minmax(0, 1fr))`;

  const pointsByYear = points.reduce(
    (acc: { [key: number]: { [key: number]: any[] } }, point) => {
      const year = getYear(point.x);

      const idxOfY = y.findIndex((yVal) => point.y <= yVal);

      if (idxOfY === -1) {
        console.log("Value omitted: " + point.y);
        return acc;
      }

      const category = idxOfY !== 0 ? y[idxOfY - 1] : y[idxOfY];

      //if idx is 0 then do not subtract

      if (!acc[year]) {
        return {
          ...acc,
          [year]: {
            [category]: [point],
          },
        };
      }

      if (!acc[year][category]) {
        return {
          ...acc,
          [year]: {
            ...acc[year],
            [category]: [point],
          },
        };
      }

      return {
        ...acc,
        [year]: {
          ...acc[year],
          [category]: [...acc[year][category], point],
        },
      };
    },
    {},
  );

  const boxes = y
    .slice()
    .reverse()
    .map((yVal, yIdx, yArr) => {
      if (yIdx === 0) return null;
      const xs = x.map((xVal, xIdx, xArr) => {
        const daysInYear = 365;
        const year = new Date(xVal, 0, 1);

        const pointsInYear = pointsByYear[xVal];
        const pointsInRange = pointsInYear[yVal];

        const pointsWithPosition = pointsInRange
          ? pointsInRange.map((point) => {
              const diff = point.y - yVal;
              const divider = yArr[yIdx - 1] - yVal;
              const bottomPercentage = Math.round((diff / divider) * 100);

              const dateDiff = differenceInDays(point.x, year);
              const leftPercentage = Math.round((dateDiff / daysInYear) * 100);

              return {
                ...point,
                bottom: bottomPercentage,
                left: leftPercentage,
              };
            })
          : [];

        const isBorderLeft = xIdx === 0;
        const isBorderTop = yIdx === 0;
        const isBorderBottom = yIdx === y.length - 1;
        const isBorderRight = xIdx === x.length - 1;

        const borderLeft = isBorderLeft
          ? { style: "solid", width: "0px", color: "rgb(100,116,139)" }
          : { style: "solid", width: "1px", color: "rgb(71,85,105)" };
        const borderTop = isBorderTop
          ? { style: "solid", width: "2px", color: "rgb(71,85,105)" }
          : { style: "solid", width: "1px", color: "rgb(71,85,105)" };
        const borderBottom = isBorderBottom
          ? { style: "solid", width: "5px", color: "rgb(100,116,139)" }
          : { style: "solid", width: "1px", color: "rgb(71,85,105)" };
        const borderRight = isBorderRight
          ? { style: "solid", width: "2px", color: "rgb(71,85,105)" }
          : { style: "solid", width: "1px", color: "rgb(71,85,105)" };

        const isBottomHalf = yIdx > Math.floor(yArr.length / 2);
        const isNearEnd = xIdx > xArr.length - Math.floor(xArr.length / 4);

        return (
          <div
            key={`${xIdx}-${yIdx}`}
            style={{
              borderColor: "rgb(71,85,105)",
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
            className="relative border-slate-500 text-white"
          >
            {pointsWithPosition.map((point, idx, pointArr) => {
              const bottom = `calc(${point.bottom}% - 6px)`;
              const left = `calc(${point.left}% - 6px)`;
              const transform = `translate(${
                isNearEnd ? "calc(-100% + 12px)" : "0%"
              }, ${isBottomHalf ? "calc(-100% + 12px)" : "0%"})`;

              return (
                <div
                  className="absolute h-[12px] w-[12px]"
                  style={{ bottom, left }}
                  key={`${point.x}-${point.y}-${yIdx}-${xIdx}`}
                >
                  <div
                    key={`${point.x}-${point.y}`}
                    // Adjust top/left value if transformed
                    style={{ transform }}
                    // style={{ transform: isBottomHalf ? 'translateY(-100%)' : 'translateY(0%)' }}
                    className="group relative z-[12] h-[12px] w-[12px] overflow-hidden rounded-[50%] border-[6px] border-red-400 [transition:width_0.4s_ease,height_0.4s_ease,border-radius_0.2s_0.4s_ease,z-index_0s_0.4s_ease] hover:z-[100] hover:h-[240px] hover:w-[340px] hover:rounded-[4px] hover:[transition:width_0.4s_0.2s_ease,height_0.4s_0.2s_ease,border-radius_0.2s_ease]"
                  >
                    <div className="z-[11] h-full w-full bg-slate-800 [&>*:first-child]:overflow-hidden [&>*:first-child]:opacity-0 [&>*:first-child]:transition-opacity [&>*:first-child]:delay-0 [&>*:first-child]:duration-[0.4s] group-hover:[&>*:first-child]:overflow-auto group-hover:[&>*:first-child]:opacity-100 group-hover:[&>*:first-child]:delay-[0.5s]">
                      {point.hoverComponent}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        );
      });
      return xs;
    });

  return (
    <div className="isolate grid h-full w-[fit-content] grid-cols-[120px_1fr_120px] grid-rows-[20px_1fr_120px] pr-20 pt-8 text-slate-300">
      <div className="sticky left-0 z-[19] bg-slate-800"></div>
      <div></div>
      <div></div>
      <div className="sticky left-0 z-20 border-r-[5px] border-slate-500 bg-slate-800 pr-2">
        <div className="relative h-full">
          {y
            .slice()
            .reverse()
            .map((yVal, idx, arr) => {
              const top = `${(1 / (arr.length - 1)) * idx * 100}%`;
              return (
                <div
                  key={yVal}
                  style={{ top, right: "8px", transform: "translateY(-50%)" }}
                  className="absolute text-xl text-slate-300"
                >
                  {yVal}
                </div>
              );
            })}
          <div className="absolute left-[20px] top-[50%] translate-y-[-50%] text-3xl tracking-[-0.65rem] [text-orientation:upright] [writing-mode:vertical-rl] ">
            {yLabel}
          </div>
        </div>
      </div>
      <div
        style={{ width, gridTemplateColumns: columns, gridTemplateRows: rows }}
        className={`grid h-full`}
      >
        {boxes.flat().map((box) => box)}
      </div>
      <div className="sticky right-0 z-[30] bg-gradient-to-r from-transparent to-slate-800"></div>
      <div className="sticky left-0 z-[13] border-t-8 border-slate-800 bg-gradient-to-r from-slate-800 to-transparent" />
      <div className="relative pt-2">
        {x.map((xVal, idx, arr) => {
          const left = `${idx * 140}px`;
          return (
            <div
              key={xVal}
              style={{ left }}
              className="absolute translate-x-[-50%] text-xl"
            >
              {xVal}
            </div>
          );
        })}
        <div className="sticky left-[50%] flex h-full w-fit translate-x-[-50%] items-end pb-6 text-3xl">
          {xLabel}
        </div>
      </div>
      <div className="sticky right-0 z-[30] bg-gradient-to-r from-transparent to-slate-800"></div>
    </div>
  );
};

export default Timeline;
