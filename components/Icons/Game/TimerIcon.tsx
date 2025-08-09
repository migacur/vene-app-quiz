import Svg, { Path } from "react-native-svg";

const TimerIcon = () => {
  return (
    <Svg
      width="35"
      height="35"
      viewBox="0 0 24 24"
      fill="#0030AD"
      style={{marginRight:2}}
    >
      <Path d="M12 2C6.486 2 2 6.486 2 12s4.486 10 10 10 10-4.486 10-10S17.514 2 12 2zm0 18c-4.411 0-8-3.589-8-8s3.589-8 8-8 8 3.589 8 8-3.589 8-8 8z" />
      <Path d="M13 7h-2v5.414l3.293 3.293 1.414-1.414L13 11.586z" />
    </Svg>
  );
};

export default TimerIcon;
