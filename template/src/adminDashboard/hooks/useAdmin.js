import { useState } from "react";
import { useHistory } from "react-router";
import { useRecoilState } from "recoil";
import isAdminAtom from "chatComponents/stateManager/atoms/isAdminAtom";
import isOnlineAtom from "chatComponents/stateManager/atoms/isOnlineAtom";
import selectedDarkThemeAtom from "chatComponents/stateManager/atoms/selectedDarkThemeAtom";
import { removeUserSession } from "Utils/Common";

const useAdmin = () => {
  // eslint-disable-next-line no-unused-vars
  const [isAdmin, setIsAdmin] = useRecoilState(isAdminAtom);
  const [selectedDarkTheme] = useRecoilState(selectedDarkThemeAtom);
  const [isLoaded, setIsLoaded] = useState(true);
  let history = useHistory();
  // eslint-disable-next-line no-unused-vars
  const [isOnline, setIsOnline] = useRecoilState(isOnlineAtom);
  const [clickedHomeDashboard, setClickedHomeDashboard] = useState(true);
  const [clickedProduct, setClickedProduct] = useState(false);
  const [clickedOtherList, setClickedOtherList] = useState(false);
  const [clickedAnalytics, setClickedAnalytics] = useState(false);
  const [clickedStock, setClickedStock] = useState(false);
  const [clickedTotalOrder, setClickedTotalOrder] = useState(false);
  const [clickedTeam, setClickedTeam] = useState(false);
  const [clickedMessages, setClickedMessages] = useState(false);
  const [clickedFavorites, setClickedFavorites] = useState(false);
  const [clickedSetting, setClickedSetting] = useState(false);

  // handle click event of logout button
  const handleLogout = () => {
    removeUserSession();
    setIsAdmin(false);
    setTimeout(() => {
      history.push("/");
    }, 20);
  };

  const handleClickedHomeDashboard = () => {
    setClickedSetting(false);
    setClickedFavorites(false);
    setClickedProduct(false);
    setClickedHomeDashboard(true);
    setClickedAnalytics(false);
    setClickedOtherList(false);
    setClickedStock(false);
    setClickedTotalOrder(false);
    setClickedTeam(false);
    setClickedMessages(false);
  };

  const handleClickedProduct = () => {
    setClickedSetting(false);
    setClickedFavorites(false);
    setClickedProduct(true);
    setClickedHomeDashboard(false);
    setClickedAnalytics(false);
    setClickedOtherList(false);
    setClickedStock(false);
    setClickedTotalOrder(false);
    setClickedTeam(false);
    setClickedMessages(false);
    console.log("clickedProduct", clickedProduct);
  };

  const handleClickedOtherList = () => {
    setClickedSetting(false);
    setClickedFavorites(false);
    setClickedOtherList(true);
    setClickedHomeDashboard(false);
    setClickedProduct(false);
    setClickedAnalytics(false);
    setClickedStock(false);
    setClickedTotalOrder(false);
    setClickedTeam(false);
    setClickedMessages(false);
  };

  const handleClickedAnalytics = () => {
    setClickedSetting(false);
    setClickedFavorites(false);
    setClickedAnalytics(true);
    setClickedOtherList(false);
    setClickedHomeDashboard(false);
    setClickedProduct(false);
    setClickedStock(false);
    setClickedTotalOrder(false);
    setClickedTeam(false);
    setClickedMessages(false);
  };
  const handleClickedStock = () => {
    setClickedSetting(false);
    setClickedFavorites(false);
    setClickedStock(true);
    setClickedAnalytics(false);
    setClickedOtherList(false);
    setClickedHomeDashboard(false);
    setClickedProduct(false);
    setClickedTotalOrder(false);
    setClickedTeam(false);
    setClickedMessages(false);
  };
  const handleClickedTotalOrder = () => {
    setClickedSetting(false);
    setClickedFavorites(false);
    setClickedTotalOrder(true);
    setClickedStock(false);
    setClickedAnalytics(false);
    setClickedOtherList(false);
    setClickedHomeDashboard(false);
    setClickedProduct(false);
    setClickedTeam(false);
    setClickedMessages(false);
  };
  const handleClickedTeam = () => {
    setClickedSetting(false);
    setClickedFavorites(false);
    setClickedTeam(true);
    setClickedTotalOrder(false);
    setClickedStock(false);
    setClickedAnalytics(false);
    setClickedOtherList(false);
    setClickedHomeDashboard(false);
    setClickedProduct(false);
    setClickedMessages(false);
  };
  const handleClickedMessages = () => {
    setClickedSetting(false);
    setClickedFavorites(false);
    setClickedMessages(true);
    setClickedTeam(false);
    setClickedTotalOrder(false);
    setClickedStock(false);
    setClickedAnalytics(false);
    setClickedOtherList(false);
    setClickedHomeDashboard(false);
    setClickedProduct(false);
  };
  const handleClickedFavorites = () => {
    setClickedSetting(false);
    setClickedFavorites(true);
    setClickedMessages(false);
    setClickedTeam(false);
    setClickedTotalOrder(false);
    setClickedStock(false);
    setClickedAnalytics(false);
    setClickedOtherList(false);
    setClickedHomeDashboard(false);
    setClickedProduct(false);
  };
  const handleClickedSetting = () => {
    setClickedSetting(true);
    setClickedFavorites(false);
    setClickedMessages(false);
    setClickedTeam(false);
    setClickedTotalOrder(false);
    setClickedStock(false);
    setClickedAnalytics(false);
    setClickedOtherList(false);
    setClickedHomeDashboard(false);
    setClickedProduct(false);
  };

  return {
    selectedDarkTheme,
    isLoaded,
    setIsLoaded,
    handleLogout,
    handleClickedProduct,
    handleClickedHomeDashboard,
    history,
    clickedProduct,
    clickedHomeDashboard,
    handleClickedOtherList,
    clickedOtherList,
    isOnline,
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
  };
};

export default useAdmin;
