/* eslint-disable jsx-a11y/anchor-is-valid */
import useAxios from "../../chatComponents/hooks/useAxios";
import OfflineMessage from "../../chatComponents/components/offlineMessage/OfflineMessage";
import useAdmin from "../hooks/useAdmin";
import { DataProduct } from "../constants/DataProduct";

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
                    <a style={{ fontSize: 15, fontWeight: "bold" }} href="#">
                      02/01/21
                    </a>
                  </li>
                ))}
            </ul>
            <ul className="details">
              <li className="topic">Customer</li>
              {response &&
                response.map((res) => (
                  <li key={res.id}>
                    <a
                      style={{ fontSize: 15, fontWeight: "bold" }}
                      href="#"
                    >{`${res.username}`}</a>
                  </li>
                ))}
            </ul>
            <ul className="details">
              <li className="topic">email</li>
              {response &&
                response.map((res) => (
                  <li key={res.id}>
                    <a style={{ fontSize: 14 }} href="#">
                      {res.email}
                    </a>
                  </li>
                ))}
            </ul>
            <ul className="details">
              <li className="topic">Phone</li>
              {response &&
                response.map((res) => (
                  <li key={res.id}>
                    <a style={{ fontSize: 13, fontWeight: "bold" }} href="#">
                      {res.phone.split("x")}
                    </a>
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
            {DataProduct.map((res) => (
              <li key={res.id}>
                <a href="#">
                  <img src={res.picture} alt="" />
                  <span className="product">{res.name}</span>
                </a>
                <span className="price">${res.price}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
