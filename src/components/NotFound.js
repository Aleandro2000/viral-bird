import logo from "../resources/logo.png";
import { Link } from "react-router-dom";

const NotFound = () =>{
  return(
    <center className="card">
      <img alt="" src={logo}/>
      <h1>
        <span className="normal-box">
          Page not found! :(
        </span>
      </h1>
      <Link to="/">
        <button className="button"><i class="fa fa-arrow-left"/> BACK</button>
      </Link>
    </center>
  );
}

export default NotFound;