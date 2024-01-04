import styled from "styled-components";
import { Header } from "../Header";
import { BottomSheetContent } from "../BottomSheetContent";
import {
  PropsWithChildren,
  RefObject,
  useEffect,
  useLayoutEffect,
} from "react";
import { createPortal } from "react-dom";
import useBottomSheet from "./useBottomSheet";

interface Props extends PropsWithChildren {
  sheetRef: RefObject<HTMLDivElement>;
  isOpen?: boolean;
  snapPoint: string[];
  handleHeight?: number;
}

const BottomSheet: React.FC<Props> = ({
  sheetRef,
  isOpen,
  snapPoint,
  children,
  handleHeight,
}) => {
  const { sheetRef: useSheetRef, contentRef } = useBottomSheet(
    sheetRef,
    snapPoint,
    isOpen
  );

  return createPortal(
    <Container ref={useSheetRef} height={"500px"}>
      <Header />
      <BottomSheetContent contentRef={contentRef} />
      {children}
    </Container>,
    document.body
  );
};

export default BottomSheet;

const Container = styled.div<{ height: string }>`
  width: 100%;
  height: ${() => `${window.innerHeight - 40}px`};
  left: 0;
  /* bottom: ${({ height }) => `-${height}`}; */
  bottom: 0;
  z-index: 1;
  transition-duration: 500ms;
  position: absolute;
  visibility: hidden;
`;
