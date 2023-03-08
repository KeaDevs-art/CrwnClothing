import { Outlet } from "react-router-dom";

import Directory from "../../components/directory/directory.component";

const Home = () => {
  return (
    <div>
      <Outlet />{" "}
      {/* Specifies where to outlet sub-routes - where children routes should render */}
      <Directory />
    </div>
  );
};

export default Home;
