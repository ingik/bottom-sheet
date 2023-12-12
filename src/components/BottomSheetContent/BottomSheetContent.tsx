import styled from "styled-components";

const BottomSheetContent = () => {
  const arr = [{ index: 0 }, { idnex: 1 }, { index: 2 }];
  return (
    <Container>
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
          ></div>
        );
      })}
    </Container>
  );
};

const Container = styled.div`
  background-color: white;
  height: 100%;
  width: 100%;
  overflow: scroll;
`;

export default BottomSheetContent;
