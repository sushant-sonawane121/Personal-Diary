import { Link } from "react-router-dom";
const NotFound = () => {
  return (
    <>
      <div className="container vh-100">
        <div className="wraper h-100 d-flex align-items-center justify-content-center flex-column">
          <h1 className="text-white">Error 404</h1>
          <h2 className="text-white">Page Not Found</h2>

          <Link to={"/"} className="btn btn-primary w-25">
            Home
          </Link>
        </div>
      </div>
    </>
  );
};

export default NotFound;
