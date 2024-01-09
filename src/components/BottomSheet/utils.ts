export const convertToPixels = (value: string, unit: string) => {
  // 측정을 위한 임시 요소 생성
  const tempElement = document.createElement("div");
  tempElement.style.height = "1" + unit;
  tempElement.style.visibility = "hidden";
  tempElement.style.position = "absolute";

  // 크기를 측정
  document.body.appendChild(tempElement);
  const oneUnitInPixels = tempElement.getBoundingClientRect().height;
  console.log("convert Pixel >>", oneUnitInPixels);

  // 임시 요소 제거
  document.body.removeChild(tempElement);

  // 값과 단위를 픽셀로 변환
  const valueInPixels = parseFloat(value) * oneUnitInPixels;
  return valueInPixels;
};

function parseCssSize(cssSize: string) {
  // 정규식을 사용하여 숫자 부분과 단위 부분을 추출
  const match = cssSize.match(/^([+-]?\d*\.?\d+)([a-zA-Z%]*)$/);

  if (!match) {
    throw new Error("Invalid CSS size format");
  }

  // 추출한 값을 반환
  const value = match[1];
  const unit = match[2];

  return { value, unit };
}

export const findClosestPoint = (arr: string[], target: number) => {
  if (arr.length === 0) {
    return null;
  }

  const convertArr = arr.map((list) => {
    const { value, unit } = parseCssSize(list);
    return convertToPixels(value, unit);
  });

  console.log("CONVERT ARR >>", convertArr);
  console.log("TARGET !>>", target);

  let closestValue = convertArr[0];
  let minDifference = Math.abs(target - closestValue);

  for (let i = 1; i < convertArr.length; i++) {
    let currentDifference = Math.abs(target - convertArr[i]);

    if (currentDifference < minDifference) {
      closestValue = convertArr[i];
      minDifference = currentDifference;
    }
  }

  return closestValue;
};
