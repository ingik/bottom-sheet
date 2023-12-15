import styled from "styled-components";

const Header = () => {
  return (
    <Container>
      <Indicator />
    </Container>
  );
};

const Container = styled.div`
  background-color: white;
  border-top-right-radius: 20px;
  border-top-left-radius: 20px;
  height: 36px;
  align-items: center;
  justify-content: center;
  display: flex;
  box-shadow: 0px -5px 15px -5px gray;
`;

const Indicator = styled.div`
  background-color: #777777;
  width: 40px;
  height: 4px;
  border-radius: 6px;
`;

export default Header;
