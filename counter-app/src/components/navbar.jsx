function Navbar({ totalCounters }) {
  return (
    <nav className="navbar navbar-light bg-light">
      <a className="navbar-brand" href="#top">
        Navbar
        <span className="badge badge-pill bg-secondary m-2">
          {totalCounters}
        </span>
      </a>
    </nav>
  );
}
export default Navbar;
