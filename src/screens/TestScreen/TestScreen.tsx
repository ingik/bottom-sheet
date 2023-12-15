import { FunctionComponent, useRef, useState } from "react";
import { BottomSheet } from "../../components/BottomSheet";
import styled from "styled-components";

const TestScreen: FunctionComponent = () => {
  const ref = useRef<HTMLDivElement>(null);
  const [open, setOpen] = useState(false);
  const buttonPress = () => {
    console.log("!! click !!");
    setOpen(!open);
  };

  // const snapPoint = ["100px", "300px", "500px"];
  const snapPoint = [400, 600];

  return (
    <>
      <Screen>
        <button title="dd" onClick={buttonPress} style={styles.button}>
          {"TEST BUTTON"}
        </button>

        <div style={{ padding: 30 }}>
          <text>bottom sheet test page</text>
        </div>

        {/* <div
          style={{
            backgroundColor: "red",
            width: "300px",
            height: "300px",
            marginTop: 300,
          }}
        ></div> */}
      </Screen>
      <BottomSheet sheetRef={ref} isOpen={open} snapPoint={snapPoint} />
    </>
  );
};

export default TestScreen;

const Screen = styled.div`
  background-color: gray;
  overflow: hidden;
  width: 100vw;
  height: 100vh;
`;

const styles: { button: React.CSSProperties } = {
  button: {},
};
