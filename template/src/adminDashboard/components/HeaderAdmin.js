const HeaderAdmin = ({ handleToggleSidebar, toggleSidebar }) => {
  return (
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
  );
};

export default HeaderAdmin;
