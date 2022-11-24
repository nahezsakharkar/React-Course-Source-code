import withTooltip from "./withTooltip";

function Movie(props) {
  return (
    <div className="container">
      Movies
      {props.toolTip && <div>some tooltip</div>}
    </div>
  );
}

export default withTooltip(Movie);
