import { FunctionComponent, useEffect, useRef, useState } from "react";
import { BottomSheet } from "../../components/BottomSheet";
import styled from "styled-components";

const TestScreen: FunctionComponent = () => {
  const ref = useRef<HTMLDivElement>(null);
  const [open, setOpen] = useState(false);
  const buttonPress = () => {
    console.log("!! click !!");
    setOpen(!open);
  };

  const snapPoint = ["240px", "500px"];

  return (
    <>
      <Screen>
        <button title="dd" onClick={buttonPress}>
          {"TEST BUTTON"}
        </button>
      </Screen>
      <BottomSheet sheetRef={ref} isOpen={open} snapPoint={snapPoint} />
    </>
  );
};

export default TestScreen;

const Screen = styled.div`
  background-color: white;
  width: 100vw;
  height: 100%;
`;
