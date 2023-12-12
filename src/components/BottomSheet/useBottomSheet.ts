import { useEffect } from "react";

const useBottomSheet = (
  sheetRef: React.RefObject<HTMLDivElement>,
  isOpen?: boolean,
  snapPoint?: string[]
) => {

  
  useEffect(() => {
    if (isOpen) {
      sheetRef.current?.style.setProperty("transform", "translateY(0)");
      console.log(" OPEN !!");
    } else {
      sheetRef.current?.style.setProperty("transform", "translateY(400px)");
      console.log(" CLOSE !!");
    }
  }, [isOpen]);
  return sheetRef;
};

export default useBottomSheet;
