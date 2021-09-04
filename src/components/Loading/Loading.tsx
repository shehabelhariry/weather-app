import ReactLoading from "react-loading";

const Loading = () => (
  <div className="h-screen flex justify-center items-center">
    <ReactLoading type="spin" color="grey" height={100} width={100} />
  </div>
);

export default Loading;
