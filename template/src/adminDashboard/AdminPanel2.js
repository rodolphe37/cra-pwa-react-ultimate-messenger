/* eslint-disable jsx-a11y/anchor-is-valid */
import "./adminPanel2.css";
import LogoAdmin from "../logo.svg";
import SunglassesIcon from "./images/sunglasses.jpg";
import JeansIcon from "./images/jeans.jpg";
import NikeIcon from "./images/nike.jpg";
import Scarves from "./images/scarves.jpg";
import BlueBag from "./images/blueBag.jpg";
import BagIcon from "./images/bag.jpg";
import Addidas from "./images/addidas.jpg";
import Shirt from "./images/shirt.jpg";
import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { useRecoilState } from "recoil";
import usernameAtom from "../chatComponents/stateManager/atoms/usernameAtom";
import passwordAtom from "../chatComponents/stateManager/atoms/passwordAtom";
import useAxios from "../chatComponents/hooks/useAxios";
import Loader from "../chatComponents/components/loader/Loader";
import selectedDarkThemeAtom from "../chatComponents/stateManager/atoms/selectedDarkThemeAtom";
import isOnlineAtom from "../chatComponents/stateManager/atoms/isOnlineAtom";
import OfflineMessage from "../chatComponents/components/offlineMessage/OfflineMessage";
import { useTranslation } from "react-i18next";

const AdminPanel2 = ({ isAdmin, setIsAdmin }) => {
  const { response } = useAxios({
    method: "GET",
    url: "/users",
    header: {
      accept: "*/*",
    },
  });
  const [selectedDarkTheme] = useRecoilState(selectedDarkThemeAtom);
  const [isLoaded, setIsLoaded] = useState(true);
  const [name] = useRecoilState(usernameAtom);
  const [encryptedPassword] = useRecoilState(passwordAtom);
  let history = useHistory();
  const [toggleSidebar, setToggleSidebar] = useState(false);
  // eslint-disable-next-line no-unused-vars
  const [isOnline, setIsOnline] = useRecoilState(isOnlineAtom);
  const { t } = useTranslation();

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
  }, [isLoaded]);
  return (
    <div className="adminDash">
      <div className={toggleSidebar ? "sidebar active" : "sidebar"}>
        <div className="logo-details">
          <img className="bx bxl-c-plus-plus" src={LogoAdmin} alt="" />
          <span className="logo_name">RUM Admin</span>
        </div>
        <ul className="nav-links">
          <li>
            <a
              onClick={() =>
                history.push(
                  `/admin-alternate/name=${name}&password=${encryptedPassword}`
                )
              }
              href="#"
              className="active"
            >
              <i className="bx bx-grid-alt"></i>
              <span className="links_name">Dashboard alternative</span>
            </a>
          </li>
          <li>
            <a href="#">
              <i className="bx bx-box"></i>
              <span className="links_name">Product</span>
            </a>
          </li>
          <li>
            <a href="#">
              <i className="bx bx-list-ul"></i>
              <span className="links_name">Order list</span>
            </a>
          </li>
          <li>
            <a href="#">
              <i className="bx bx-pie-chart-alt-2"></i>
              <span className="links_name">Analytics</span>
            </a>
          </li>
          <li>
            <a href="#">
              <i className="bx bx-coin-stack"></i>
              <span className="links_name">Stock</span>
            </a>
          </li>
          <li>
            <a href="#">
              <i className="bx bx-book-alt"></i>
              <span className="links_name">Total order</span>
            </a>
          </li>
          <li>
            <a href="#">
              <i className="bx bx-user"></i>
              <span className="links_name">Team</span>
            </a>
          </li>
          <li>
            <a href="#">
              <i className="bx bx-message"></i>
              <span className="links_name">Messages</span>
            </a>
          </li>
          <li>
            <a href="#">
              <i className="bx bx-heart"></i>
              <span className="links_name">Favrorites</span>
            </a>
          </li>
          <li>
            <a href="#">
              <i className="bx bx-cog"></i>
              <span className="links_name">Setting</span>
            </a>
          </li>
          <li className="log_out">
            <button
              onClick={() => {
                setIsAdmin(false);
                sessionStorage.removeItem("password");
                history.push("/");
              }}
            >
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
      {!isLoaded ? (
        <section className="home-section">
          <nav>
            <div onClick={handleToggleSidebar} className="sidebar-button">
              <i
                className={
                  toggleSidebar
                    ? "bx bx-menu-alt-right sidebarBtn"
                    : "bx bx-menu sidebarBtn"
                }
              ></i>
              <span className="dashboard">Dashboard</span>
            </div>
            <div className="search-box">
              <input type="text" placeholder="Search..." />
              <i className="bx bx-search"></i>
            </div>
            <div className="profile-details">
              <img
                src="https://avatars.githubusercontent.com/u/50537655?s=400&u=d37301e7f3d4a819b2be2da2460a1fba3b3d8d7a&v=4"
                alt=""
              />
              <span className="admin_name">Rodolphe AUGUSTO</span>
              <i className="bx bx-chevron-down"></i>
            </div>
          </nav>
          <div className="home-content">
            {isOnline === "offline" ? (
              <OfflineMessage type="danger" content="offlineMessage" />
            ) : null}
            <div className="overview-boxes">
              <div className="box">
                <div className="right-side">
                  <div className="box-topic">Total Order</div>
                  <div className="number">40,876</div>
                  <div className="indicator">
                    <i className="bx bx-up-arrow-alt"></i>
                    <span className="text">Up from yesterday</span>
                  </div>
                </div>
                <i className="bx bx-cart-alt cart"></i>
              </div>
              <div className="box">
                <div className="right-side">
                  <div className="box-topic">Total Sales</div>
                  <div className="number">38,876</div>
                  <div className="indicator">
                    <i className="bx bx-up-arrow-alt"></i>
                    <span className="text">Up from yesterday</span>
                  </div>
                </div>
                <i className="bx bxs-cart-add cart two"></i>
              </div>
              <div className="box">
                <div className="right-side">
                  <div className="box-topic">Total Profit</div>
                  <div className="number">$12,876</div>
                  <div className="indicator">
                    <i className="bx bx-up-arrow-alt"></i>
                    <span className="text">Up from yesterday</span>
                  </div>
                </div>
                <i className="bx bx-cart cart three"></i>
              </div>
              <div className="box">
                <div className="right-side">
                  <div className="box-topic">Total Return</div>
                  <div className="number">11,086</div>
                  <div className="indicator">
                    <i className="bx bx-down-arrow-alt down"></i>
                    <span className="text">Down From Today</span>
                  </div>
                </div>
                <i className="bx bxs-cart-download cart four"></i>
              </div>
            </div>
            <div className="sales-boxes">
              <div className="recent-sales box">
                <div className="title">Recent Sales</div>
                <div className="sales-details">
                  <ul className="details">
                    <li className="topic">Date</li>
                    {response &&
                      response.map((res) => (
                        <li key={res.id}>
                          <a href="#">02/01/21</a>
                        </li>
                      ))}
                  </ul>
                  <ul className="details">
                    <li className="topic">Customer</li>
                    {response &&
                      response.map((res) => (
                        <li key={res.id}>
                          <a href="#">{`${res.username}`}</a>
                        </li>
                      ))}
                  </ul>
                  <ul className="details">
                    <li className="topic">email</li>
                    {response &&
                      response.map((res) => (
                        <li key={res.id}>
                          <a href="#">{res.email}</a>
                        </li>
                      ))}
                  </ul>
                  <ul className="details">
                    <li className="topic">Phone</li>
                    {response &&
                      response.map((res) => (
                        <li key={res.id}>
                          <a href="#">{res.phone}</a>
                        </li>
                      ))}
                  </ul>
                </div>
                <div className="button-admin">
                  <a href="#">See All</a>
                </div>
              </div>
              <div className="top-sales box">
                <div className="title">Top Seling Product</div>
                <ul className="top-sales-details">
                  <li>
                    <a href="#">
                      <img src={SunglassesIcon} alt="" />
                      <span className="product">Vuitton Sunglasses</span>
                    </a>
                    <span className="price">$1107</span>
                  </li>
                  <li>
                    <a href="#">
                      <img src={JeansIcon} alt="" />
                      <span className="product">Hourglass Jeans </span>
                    </a>
                    <span className="price">$1567</span>
                  </li>
                  <li>
                    <a href="#">
                      <img src={NikeIcon} alt="" />
                      <span className="product">Nike Sport Shoe</span>
                    </a>
                    <span className="price">$1234</span>
                  </li>
                  <li>
                    <a href="#">
                      <img src={Scarves} alt="" />
                      <span className="product">Hermes Silk Scarves.</span>
                    </a>
                    <span className="price">$2312</span>
                  </li>
                  <li>
                    <a href="#">
                      <img src={BlueBag} alt="" />
                      <span className="product">Succi Ladies Bag</span>
                    </a>
                    <span className="price">$1456</span>
                  </li>
                  <li>
                    <a href="#">
                      <img src={BagIcon} alt="" />
                      <span className="product">Gucci Womens's Bags</span>
                    </a>
                    <span className="price">$2345</span>
                  </li>
                  <li>
                    <a href="#">
                      <img src={Addidas} alt="" />
                      <span className="product">Addidas Running Shoe</span>
                    </a>
                    <span className="price">$2345</span>
                  </li>
                  <li>
                    <a href="#">
                      <img src={Shirt} alt="" />
                      <span className="product">Bilack Wear's Shirt</span>
                    </a>
                    <span className="price">$1245</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
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
          className={`${
            !selectedDarkTheme
              ? "messages-container messages-container-spiner light-background"
              : "messages-container messages-container-spiner dark-background"
          }`}
        >
          <Loader />
        </div>
      )}
    </div>
  );
};

export default AdminPanel2;
