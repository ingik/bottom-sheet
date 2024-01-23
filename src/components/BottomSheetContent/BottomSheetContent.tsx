import { RefObject } from "react";
import styled from "styled-components";

interface Props {
  contentRef: RefObject<HTMLDivElement>;
}

const BottomSheetContent: React.FC<Props> = ({ contentRef }) => {
  const arr = [{ index: 0 }, { index: 1 }, { index: 2 }, { index: 3 }];
  return (
    <Container ref={contentRef}>
      {arr.map((list) => {
        return (
          <div
            key={list.index}
            style={{
              backgroundColor: "red",
              opacity: 0.3,
              height: "200px",
              width: "100%",
              marginBottom: 3,
            }}
          />
        );
      })}
    </Container>
  );
};

const Container = styled.div`
  background-color: white;
  width: 100%;
  overflow: auto;
  height: 500px;
  position: relative;
  -webkit-overflow-scrolling: touch;
`;

export default BottomSheetContent;
