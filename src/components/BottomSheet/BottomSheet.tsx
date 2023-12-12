import styled from "styled-components";
import { Header } from "../Header";
import { BottomSheetContent } from "../BottomSheetContent";
import {
  PropsWithChildren,
  RefObject,
  useCallback,
  useEffect,
  useState,
} from "react";

interface Props extends PropsWithChildren {
  sheetRef: RefObject<HTMLDivElement>;
  isOpen?: boolean;
  snapPoint: number[];
}

const BottomSheet: React.FC<Props> = ({
  sheetRef,
  isOpen,
  snapPoint,
  children,
}) => {
  const [startY, setStartY] = useState(0);

  console.log("VIEWPORT ", window.innerHeight);

  const viewHeight = window.innerHeight;

  const pointLast = snapPoint[snapPoint.length - 1];

  const map = snapPoint?.map((list) => {
    if (typeof list === "number") return viewHeight + list;
    else return list;
  });

  // const map = [viewHeight, ...convert];

  console.log("MAP >>", map);

  const findClosestPoint = (arr: number[], target: number) => {
    if (arr.length === 0) {
      return null;
    }

    let closestValue = arr[0];
    let minDifference = Math.abs(target - closestValue);

    for (let i = 1; i < arr.length; i++) {
      let currentDifference = Math.abs(target - arr[i]);

      if (currentDifference < minDifference) {
        closestValue = arr[i];
        minDifference = currentDifference;
      }
    }

    return closestValue;
  };

  let bottom = sheetRef.current?.getBoundingClientRect().bottom;

  const dragStart = useCallback((e: React.TouchEvent) => {
    console.log("start >>", e.changedTouches[0].clientY);
    setStartY(e.changedTouches[0].clientY);
  }, []);

  const dragEnd = () => {
    if (!map) return;
    if (sheetRef.current) {
      const end = findClosestPoint(
        map,
        sheetRef.current?.getBoundingClientRect().bottom
      );

      console.log("FINDPOINT ! >", end);
      if (!end) return;

      console.log("END >>", end);

      sheetRef.current?.style.setProperty(
        "transform",
        `translateY(${end - viewHeight}px)`
      );
    }
  };

  const dragMove = (e: React.TouchEvent) => {
    let dragOffset = e.changedTouches[0].clientY - startY;

    if (!bottom) return;

    const sheetOffset = bottom + dragOffset;

    console.log("이동", viewHeight - bottom);
    console.log("dragOffset >>", dragOffset);
    console.log("bottom >>", bottom);

    if (sheetOffset <= viewHeight) {
      sheetRef.current?.style.setProperty("transform", `translateY(0)`);
    } else {
      sheetRef.current?.style.setProperty(
        "transform",
        `translateY(${sheetOffset - viewHeight}px)`
      );
    }
  };

  useEffect(() => {
    if (isOpen) {
      sheetRef.current?.style.setProperty("transform", "translateY(0)");
      console.log(" OPEN !!");
    } else {
      sheetRef.current?.style.setProperty(
        "transform",
        `translateY(${pointLast}px)`
      );
      console.log(" CLOSE !!");
    }
  }, [isOpen]);

  return (
    <Container
      ref={sheetRef}
      onTouchStart={dragStart}
      onTouchEnd={dragEnd}
      onTouchMove={dragMove}
      height={pointLast}
    >
      <Header />
      <BottomSheetContent />
      {children}
    </Container>
  );
};

export default BottomSheet;

const Container = styled.div<{ height: number }>`
  width: 100%;
  height: ${(props) => props.height};
  left: 0;
  bottom: 0;
  position: fixed;
  transition-duration: 500ms;
`;
