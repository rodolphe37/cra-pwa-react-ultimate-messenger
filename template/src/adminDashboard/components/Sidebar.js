/* eslint-disable jsx-a11y/anchor-is-valid */
import useAdmin from "../hooks/useAdmin";
import LogoAdmin from "../../logo.svg";

const Sidebar = ({
  handleClickedSetting,
  handleClickedFavorites,
  handleClickedMessages,
  handleClickedTeam,
  handleClickedTotalOrder,
  handleClickedStock,
  handleClickedAnalytics,
  handleClickedOtherList,
  handleClickedHomeDashboard,
  handleClickedProduct,
  toggleSidebar,
  clickedProduct,
  clickedHomeDashboard,
  clickedOtherList,
  clickedAnalytics,
  clickedStock,
  clickedTotalOrder,
  clickedTeam,
  clickedMessages,
  clickedFavorites,
  clickedSetting,
}) => {
  const { handleLogout, history } = useAdmin();
  return (
    <div className={toggleSidebar ? "sidebar active" : "sidebar"}>
      <div className="logo-details">
        <img className="bx bxl-c-plus-plus" src={LogoAdmin} alt="" />
        <span
          style={{ cursor: "pointer" }}
          onClick={handleClickedHomeDashboard}
          className="logo_name"
        >
          RUM Admin
        </span>
      </div>
      <ul className="nav-links">
        <li>
          <a
            className={clickedHomeDashboard ? "active" : ""}
            onClick={handleClickedHomeDashboard}
          >
            <i className="bx bx-grid-alt"></i>
            <span className="links_name">Dashboard</span>
          </a>
        </li>
        <li>
          <a
            className={clickedProduct ? "active" : ""}
            onClick={handleClickedProduct}
          >
            <i className="bx bx-box"></i>
            <span className="links_name">Product</span>
          </a>
        </li>
        <li>
          <a
            className={clickedOtherList ? "active" : ""}
            onClick={handleClickedOtherList}
          >
            <i className="bx bx-list-ul"></i>
            <span className="links_name">Order list</span>
          </a>
        </li>
        <li>
          <a
            className={clickedAnalytics ? "active" : ""}
            onClick={handleClickedAnalytics}
          >
            <i className="bx bx-pie-chart-alt-2"></i>
            <span className="links_name">Analytics</span>
          </a>
        </li>
        <li>
          <a
            className={clickedStock ? "active" : ""}
            onClick={handleClickedStock}
          >
            <i className="bx bx-coin-stack"></i>
            <span className="links_name">Stock</span>
          </a>
        </li>
        <li>
          <a
            className={clickedTotalOrder ? "active" : ""}
            onClick={handleClickedTotalOrder}
          >
            <i className="bx bx-book-alt"></i>
            <span className="links_name">Total order</span>
          </a>
        </li>
        <li>
          <a
            className={clickedTeam ? "active" : ""}
            onClick={handleClickedTeam}
          >
            <i className="bx bx-user"></i>
            <span className="links_name">Team</span>
          </a>
        </li>
        <li>
          <a
            className={clickedMessages ? "active" : ""}
            onClick={handleClickedMessages}
          >
            <i className="bx bx-message"></i>
            <span className="links_name">Messages</span>
          </a>
        </li>
        <li>
          <a
            className={clickedFavorites ? "active" : ""}
            onClick={handleClickedFavorites}
          >
            <i className="bx bx-heart"></i>
            <span className="links_name">Favorites</span>
          </a>
        </li>
        <li>
          <a
            className={clickedSetting ? "active" : ""}
            onClick={handleClickedSetting}
          >
            <i className="bx bx-cog"></i>
            <span className="links_name">Setting</span>
          </a>
        </li>
        <li>
          <a onClick={() => history.push(`/admin-alternate/`)} href="#">
            <i className="bx bx-grid-alt"></i>
            <span className="links_name">Dashboard alternative</span>
          </a>
        </li>
        <li className="log_out">
          <button onClick={handleLogout}>
            {" "}
            <i className="bx bx-log-out"></i>
            <span
              className={
                toggleSidebar
                  ? "links_name links_name-littleSidebar"
                  : "links_name"
              }
            >
              Log out
            </span>
          </button>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
