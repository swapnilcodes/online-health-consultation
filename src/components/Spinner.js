import CircularProgress from "@material-ui/core/CircularProgress";

const style = {
  display: "block",
  margin: "auto",
  marginTop: "40vh",
};

const Spinner = () => {
  return (
    <CircularProgress color="secondary" className="spinner" style={style} />
  );
};

export default Spinner;
