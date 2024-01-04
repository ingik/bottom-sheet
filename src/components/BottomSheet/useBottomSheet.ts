import { useCallback, useEffect, useRef, useState } from "react";
import { findClosestPoint } from "./utils";

interface SheetDirection {
  sheet: {
    sheetY: number;
    contentY: number;
  };
  sheetState: "up" | "none" | "down";
}

const useBottomSheet = (
  sheetRef: React.RefObject<HTMLDivElement>,
  snapPoint: string[],
  isOpen?: boolean
) => {
  const contentRef = useRef<HTMLDivElement>(null);
  const [open, setOpen] = useState(isOpen || false);
  const [startY, setStartY] = useState(0);

  const viewHeight = window.innerHeight;
  const MIN_Y = 40;
  const MAX_Y = viewHeight - 40;

  const pointFirst = parseInt(snapPoint[0]);
  const pointLast = parseInt(snapPoint[snapPoint.length - 1]);

  const getSheetY = sheetRef.current?.getBoundingClientRect().top;

  const dragStart = (e: TouchEvent) => {
    console.log("START ! ");
    setStartY(e.changedTouches[0].clientY);
  };

  const dragEnd = () => {
    if (!sheetRef.current) return;
    if (!getSheetY) return;

    // 시트 클릭 좌표 초기화
    setStartY(0);

    const closestPoint = findClosestPoint(
      snapPoint,
      viewHeight - sheetRef.current?.getBoundingClientRect().top
    );

    if (!closestPoint) return;
    if (closestPoint === pointFirst) {
      console.log("CLOSE !");
      setOpen(false);
    }
    if (closestPoint === pointLast) {
      console.log("OPEN !");

      setOpen(true);
    }

    console.log(" CLOSE >>> ", closestPoint);

    sheetRef.current?.style.setProperty(
      "transform",
      `translateY(${MAX_Y - closestPoint}px)`
    );
  };

  const dragMove = (e: TouchEvent) => {
    let dragOffset = e.changedTouches[0].clientY - startY;

    console.log("drag", dragOffset);
    if (!getSheetY) return;
    const sheetOffset = getSheetY + dragOffset;
    let nextSheetY = sheetOffset;

    if (nextSheetY <= MIN_Y) {
      console.log("OVER MIN ! ! ! ! !");
      nextSheetY = MIN_Y;
    }

    if (nextSheetY >= MAX_Y) {
      console.log("OVERMAX ! !  ! ! !");
      nextSheetY = MAX_Y;
    }

    console.log("next point", sheetRef.current?.getBoundingClientRect().top);

    sheetRef.current?.style.setProperty(
      "transform",
      `translateY(${nextSheetY}px)`
    );
  };

  useEffect(() => {
    console.log(" use mount !");
    sheetRef.current?.addEventListener("touchstart", dragStart);
    sheetRef.current?.addEventListener("touchmove", dragMove);
    sheetRef.current?.addEventListener("touchend", dragEnd);
    sheetRef.current?.style.setProperty("visibility", "visible");

    return () => {
      sheetRef.current?.removeEventListener("touchstart", dragStart);
      sheetRef.current?.removeEventListener("touchmove", dragMove);
      sheetRef.current?.removeEventListener("touchend", dragEnd);
    };
  }, [sheetRef.current]);

  return { sheetRef, contentRef };
};

export default useBottomSheet;
