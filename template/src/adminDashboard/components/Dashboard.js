/* eslint-disable jsx-a11y/anchor-is-valid */
import SunglassesIcon from "../images/sunglasses.jpg";
import JeansIcon from "../images/jeans.jpg";
import NikeIcon from "../images/nike.jpg";
import Scarves from "../images/scarves.jpg";
import BlueBag from "../images/blueBag.jpg";
import BagIcon from "../images/bag.jpg";
import Addidas from "../images/addidas.jpg";
import Shirt from "../images/shirt.jpg";
import useAxios from "../../chatComponents/hooks/useAxios";
import OfflineMessage from "../../chatComponents/components/offlineMessage/OfflineMessage";
import useAdmin from "../hooks/useAdmin";

const Dashboard = () => {
  const { isOnline } = useAdmin();
  const { response } = useAxios({
    method: "GET",
    url: "/users",
    header: {
      accept: "*/*",
    },
  });
  return (
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
  );
};

export default Dashboard;
