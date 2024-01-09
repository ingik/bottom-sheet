import { useCallback, useEffect, useRef, useState } from "react";
import { findClosestPoint } from "../utils";

interface SheetMetrics {
  touchStart: {
    sheetY: number;
    touchY: number;
  };
  touchMove: {
    movingDirection: "up" | "down" | "none";
    prevTouchY?: number;
  };
  // isContentAreaTouched: boolean;
}

const useBottomSheet = (
  sheetRef: React.RefObject<HTMLDivElement>,
  headerRef: React.RefObject<HTMLDivElement>,
  snapPoint: string[],
  isOpen?: boolean
) => {
  const contentRef = useRef<HTMLDivElement>(null);

  const metrics = useRef<SheetMetrics>({
    touchStart: {
      sheetY: 0,
      touchY: 0,
    },
    touchMove: {
      movingDirection: "none",
      prevTouchY: undefined,
    },
  });
  const viewHeight = window.innerHeight;
  const headerHeight = parseInt(headerRef.current?.style.height || "0");
  const MIN_Y = headerHeight;
  const MAX_Y = viewHeight - headerHeight;

  const pointFirst = parseInt(snapPoint[0]);
  const pointLast = parseInt(snapPoint[snapPoint.length - 1]);

  const dragStart = (e: TouchEvent) => {
    // 첫 좌표 저장
    const { touchStart } = metrics.current;
    touchStart.touchY = e.changedTouches[0].clientY;
    touchStart.sheetY = sheetRef.current?.getBoundingClientRect().top || 0;
  };

  const dragMove = (e: TouchEvent) => {
    const { touchMove, touchStart } = metrics.current;
    let dragOffset = e.changedTouches[0].clientY - touchStart.touchY;
    const currentTouch = e.touches[0];

    console.log(" METRICS >>", metrics.current.touchMove.movingDirection);

    if (touchMove.prevTouchY === undefined) {
      touchMove.prevTouchY = touchStart.touchY;
    }

    if (touchMove.prevTouchY < currentTouch.clientY) {
      touchMove.movingDirection = "down";
    }

    if (touchMove.prevTouchY > currentTouch.clientY) {
      touchMove.movingDirection = "up";
    }
    const getSheetY = sheetRef.current?.getBoundingClientRect().top;

    if (!getSheetY) return;
    const sheetOffset = getSheetY + dragOffset;
    let nextSheetY = sheetOffset;

    if (nextSheetY <= MIN_Y) {
      nextSheetY = MIN_Y;
    }

    if (nextSheetY >= MAX_Y) {
      nextSheetY = MAX_Y;
    }

    sheetRef.current?.style.setProperty(
      "transform",
      `translateY(${nextSheetY}px)`
    );
  };

  const dragEnd = () => {
    const getSheetY = sheetRef.current?.getBoundingClientRect().top;
    if (!sheetRef.current) return;
    if (!getSheetY) return;

    const closestPoint = findClosestPoint(snapPoint, viewHeight - getSheetY);

    console.log("dragEnd Point  >>", closestPoint);
    if (!closestPoint) return;
    sheetRef.current?.style.setProperty(
      "transform",
      `translateY(${MAX_Y - closestPoint}px)`
    );
  };

  useEffect(() => {
    console.log(" use mount !");
    sheetRef.current?.addEventListener("touchstart", dragStart);
    sheetRef.current?.addEventListener("touchmove", dragMove);
    sheetRef.current?.addEventListener("touchend", dragEnd);

    return () => {
      sheetRef.current?.removeEventListener("touchstart", dragStart);
      sheetRef.current?.removeEventListener("touchmove", dragMove);
      sheetRef.current?.removeEventListener("touchend", dragEnd);
    };
  }, [sheetRef.current]);

  return { sheetRef, contentRef };
};

export default useBottomSheet;
