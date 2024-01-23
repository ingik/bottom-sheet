import styled from "styled-components";
import { Header } from "../Header";
import { BottomSheetContent } from "../BottomSheetContent";
import { PropsWithChildren, RefObject, useRef } from "react";
import { createPortal } from "react-dom";
import useBottomSheet from "../../hooks/useBottomSheet";

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
  const headerRef = useRef<HTMLDivElement>(null);

  const { sheetRef: useSheetRef, contentRef: useContentRef } = useBottomSheet(
    sheetRef,
    headerRef,
    snapPoint
  );

  const test = () => {};
  return createPortal(
    <Container ref={useSheetRef}>
      <Header headerRef={headerRef} />
      <BottomSheetContent contentRef={useContentRef} />
      {children}
    </Container>,
    document.body
  );
};

export default BottomSheet;

const Container = styled.div`
  width: 100%;
  height: ${() => `${window.innerHeight - 1}px`};
  left: 0;
  bottom: 0;
  flex-direction: column;
  z-index: 1;
  transition-duration: 300ms;
  position: fixed;
  display: flex;
`;
