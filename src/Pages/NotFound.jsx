import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-white">
      <h1 className="text-4xl font-bold mb-4">404</h1>
      <p className="text-xl mb-4">Oops! Esta página no existe.</p>
      <Link to="/" className="text-blue-500 hover:underline">
        Regresar a Home
      </Link>
    </div>
  );
};

export default NotFound;