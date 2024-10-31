import React, { useState, useEffect } from 'react';
import {
  BsCart3, BsGrid1X2Fill, BsFillArchiveFill, BsFillGrid3X3GapFill,
  BsPeopleFill, BsListCheck, BsMenuButtonWideFill, BsFillGearFill
} from 'react-icons/bs';
import './Sidebar.css';

function Sidebar() {
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [isCompaniesOpen, setCompaniesOpen] = useState(false);
  const [isReportsOpen, setReportsOpen] = useState(false);

  // Function to toggle sidebar open/close state
  const toggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen);
  };

  // Close sidebar when clicking outside of it
  const closeSidebar = () => {
    setSidebarOpen(false);
  };

  // Toggle "Companies" submenu
  const toggleCompanies = () => {
    setCompaniesOpen(!isCompaniesOpen);
  };

  // Toggle "Reports" submenu
  const toggleReports = () => {
    setReportsOpen(!isReportsOpen);
  };

  // Close sidebar on window resize (when width is above 992px)
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 992) {
        setSidebarOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <>
      {/* Sidebar Toggle Button */}
      <button className="menu-toggle" onClick={toggleSidebar}>
        <BsCart3 className="icon_header" />
      </button>

      {/* Overlay to close sidebar when clicked outside */}
      {isSidebarOpen && <div className="overlay" onClick={closeSidebar}></div>}

      {/* Sidebar Content */}
      <aside className={`sidebar ${isSidebarOpen ? 'sidebar-open' : ''}`}>
        <div className='sidebar-title'>
          <div className='sidebar-brand'>
            <BsCart3 className='icon_header' /> STOCKS
          </div>
          <span className='icon close_icon' onClick={closeSidebar}>X</span>
        </div>

        <ul className='sidebar-list'>
          <li className='sidebar-list-item'>
            <a href="#">
              <BsGrid1X2Fill className='icon' /> Dashboard
            </a>
          </li>
          <li className='sidebar-list-item'>
            <a href="#">
              <BsFillArchiveFill className='icon' /> Stocks
            </a>
          </li>

          {/* Companies item with dropdown */}
          <li className='sidebar-list-item' onClick={toggleCompanies} style={{ cursor: 'pointer' }}>
            <div>
              <BsFillGrid3X3GapFill className='icon' /> Companies
            </div>
            {isCompaniesOpen && (
              <ul className="submenu submenu-open">
                <li className='submenu-item'><a href="#">AAPL</a></li>
                <li className='submenu-item'><a href="#">GOOG</a></li>
                <li className='submenu-item'><a href="#">AMZN</a></li>
                <li className='submenu-item'><a href="#">MSFT</a></li>
              </ul>
            )}
          </li>

          <li className='sidebar-list-item'>
            <a href="#">
              <BsPeopleFill className='icon' /> Customers
            </a>
          </li>
          <li className='sidebar-list-item'>
            <a href="#">
              <BsListCheck className='icon' /> Inventory
            </a>
          </li>

          {/* Reports item with dropdown */}
          <li className='sidebar-list-item' onClick={toggleReports} style={{ cursor: 'pointer' }}>
            <div>
              <BsMenuButtonWideFill className='icon' /> Reports
            </div>
            {isReportsOpen && (
              <ul className="submenu submenu-open">
                <li className='submenu-item'><a href="#">2018</a></li>
                <li className='submenu-item'><a href="#">2019</a></li>
                <li className='submenu-item'><a href="#">2020</a></li>
                <li className='submenu-item'><a href="#">2021</a></li>
                <li className='submenu-item'><a href="#">2022</a></li>
              </ul>
            )}
          </li>

          <li className='sidebar-list-item'>
            <a href="#">
              <BsFillGearFill className='icon' /> Settings
            </a>
          </li>
        </ul>
      </aside>
    </>
  );
}

export default Sidebar;
