import { Link, useLocation } from "react-router-dom";



const Nav = () => {
  // TODO: Add necessary code to display the navigation bar and link between the pages

  return (
    <div>
      <Link className={useLocation().pathname === "/" ? "nav-link nav-item active" : "nav-link nav-item"} to={"/"}>Search</Link>
      <Link className={useLocation().pathname === "/SavedCandidates" ? "nav-link nav-item active" : "nav-link nav-item"} to={"/SavedCandidates"}>Saved Candidates</Link>
    </div>
  )
};

export default Nav;
