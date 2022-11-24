import { Fragment } from "react";

function Counter(props) {
  // const [counter, setCounter] = useState(props.counter.value);

  function formatCount() {
    return props.counter.value === 0 ? "Zero" : props.counter.value;
  }

  function getBadgeClasses() {
    let classes = "badge m-2 ";
    classes += props.counter.value === 0 ? "bg-warning" : "bg-primary";
    return classes;
  }

  return (
    <div className="row">
      <div className="col-1">
        <h4>Counter #{props.counter.id}</h4>
      </div>
      <div className="col-1">
        <h1 className={getBadgeClasses()}>{formatCount()}</h1>
      </div>
      <div className="col-2">
        <button
          onClick={() => props.onIncrement(props.counter)}
          className="btn btn-secondary btn-sm"
        >
          +
        </button>
        <button
          onClick={() => props.onDecrement(props.counter)}
          className="btn btn-secondary btn-sm m-2"
          disabled={props.counter.value === 0 ? "disabled" : ""}
        >
          -
        </button>
        <button
          onClick={() => props.onDelete(props.counter.id)}
          className="btn btn-danger btn-sm"
        >
          X
        </button>
      </div>
    </div>
  );
}
// const [tags] = useState(["tag1", "tag2", "tag3"]);

// function renderTags() {
//   if (tags.length === 0) return <p>"There are No Tags!"</p>;
//   return (
//     <ul>
//       {tags.map((tag) => (
//         <li key={tag}> {tag} </li>
//       ))}
//     </ul>
//   );
// }

// {/* <div>
//   {tags.length === 0 && "Please create a new Tag!"}
//   {renderTags()}
// </div> */}

export default Counter;
