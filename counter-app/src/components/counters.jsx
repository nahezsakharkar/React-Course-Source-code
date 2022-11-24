import Counter from "./counter";

function Counters(props) {
  return (
    <div className="col">
      <div className="col-4">
        <button onClick={props.onReset} className="btn btn-primary btn-sm m-2">
          Reset
        </button>
      </div>
      <div className="row-1 m-auto">
        {props.counters.map((counter) => (
          <Counter
            key={counter.id}
            onDelete={props.onDelete}
            onIncrement={props.onIncrement}
            onDecrement={props.onDecrement}
            counter={counter}
          ></Counter>
        ))}
      </div>
    </div>
  );
}
export default Counters;
