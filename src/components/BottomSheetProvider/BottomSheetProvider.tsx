import { Children, FunctionComponent } from "react";

interface Props {
  children: JSX.Element;
}

const BottomSheetProvider: FunctionComponent<Props> = ({ children }) => {
  return <>{children}</>;
};

export default BottomSheetProvider;
