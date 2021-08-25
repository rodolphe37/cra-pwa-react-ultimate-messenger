/* eslint-disable jsx-a11y/anchor-is-valid */
import "./adminPanel2.css";
import "./common-css.css";
import { useEffect, useState } from "react";
import Loader from "chatComponents/components/loader/Loader";
import Product from "./components/Product";
import useAdmin from "./hooks/useAdmin";
import Dashboard from "./components/Dashboard";
import OtherList from "./components/OtherList";
import Analitycs from "./components/Analitycs";
import Stock from "./components/Stock";
import TotalOrder from "./components/TotalOrder";
import Team from "./components/Team";
import Messages from "./components/Messages";
import Favorites from "./components/Favorites";
import Setting from "./components/Setting";
import Sidebar from "./components/Sidebar";
import HeaderAdmin from "./components/HeaderAdmin";

const AdminPanel2 = () => {
  const [toggleSidebar, setToggleSidebar] = useState(false);
  const {
    isLoaded,
    setIsLoaded,
    handleClickedProduct,
    handleClickedHomeDashboard,
    clickedProduct,
    clickedHomeDashboard,
    handleClickedOtherList,
    clickedOtherList,
    handleClickedAnalytics,
    clickedAnalytics,
    handleClickedStock,
    clickedStock,
    handleClickedTotalOrder,
    clickedTotalOrder,
    handleClickedTeam,
    clickedTeam,
    handleClickedMessages,
    clickedMessages,
    handleClickedFavorites,
    clickedFavorites,
    handleClickedSetting,
    clickedSetting,
  } = useAdmin();

  const handleToggleSidebar = () => {
    if (toggleSidebar) {
      setToggleSidebar(false);
    }
    if (!toggleSidebar) {
      setToggleSidebar(true);
    }
  };

  useEffect(() => {
    if (isLoaded) {
      setTimeout(() => {
        setIsLoaded(false);
      }, 1500);
    }
  }, [isLoaded, setIsLoaded]);
  return (
    <div className="adminDash">
      <Sidebar
        handleClickedSetting={handleClickedSetting}
        handleClickedProduct={handleClickedProduct}
        handleClickedHomeDashboard={handleClickedHomeDashboard}
        handleClickedOtherList={handleClickedOtherList}
        handleClickedAnalytics={handleClickedAnalytics}
        handleClickedStock={handleClickedStock}
        handleClickedTotalOrder={handleClickedTotalOrder}
        handleClickedTeam={handleClickedTeam}
        handleClickedMessages={handleClickedMessages}
        handleClickedFavorites={handleClickedFavorites}
        toggleSidebar={toggleSidebar}
        handleToggleSidebar={handleToggleSidebar}
        clickedProduct={clickedProduct}
        clickedHomeDashboard={clickedHomeDashboard}
        clickedOtherList={clickedOtherList}
        clickedAnalytics={clickedAnalytics}
        clickedStock={clickedStock}
        clickedTotalOrder={clickedTotalOrder}
        clickedTeam={clickedTeam}
        clickedMessages={clickedMessages}
        clickedFavorites={clickedFavorites}
        clickedSetting={clickedSetting}
      />
      {!isLoaded ? (
        <section className="home-section">
          <HeaderAdmin
            toggleSidebar={toggleSidebar}
            handleToggleSidebar={handleToggleSidebar}
          />
          {clickedProduct ? (
            <Product />
          ) : clickedHomeDashboard ? (
            <Dashboard />
          ) : clickedOtherList ? (
            <OtherList />
          ) : clickedAnalytics ? (
            <Analitycs />
          ) : clickedStock ? (
            <Stock />
          ) : clickedTotalOrder ? (
            <TotalOrder />
          ) : clickedTeam ? (
            <Team />
          ) : clickedMessages ? (
            <Messages />
          ) : clickedFavorites ? (
            <Favorites />
          ) : clickedSetting ? (
            <Setting />
          ) : null}
        </section>
      ) : (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: "49%",
            height: "100vh",
            marginLeft: "30%",
            marginRight: "auto",
          }}
          className="messages-container messages-container-spiner"
        >
          <Loader />
        </div>
      )}
    </div>
  );
};

export default AdminPanel2;
