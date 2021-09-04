import Button from "../Button/Button";

type RefreshButtonProps = {
  refreshWeatherData: Function;
};
const RefreshButton = ({ refreshWeatherData }: RefreshButtonProps) => {
  return (
    <Button className="m-10" onClick={refreshWeatherData}>
      Refresh
    </Button>
  );
};

export default RefreshButton;
