import React, { useState } from 'react';
import styles from './Navbar.module.css';
import { FaBars } from "react-icons/fa";
import { FcTodoList } from "react-icons/fc";
import { AiOutlineClose } from "react-icons/ai";
import { NavLink, Link, useLocation, useNavigate } from 'react-router-dom';

function Navbar() {
  const [isShow, setIsShow] = useState(true);
  const location = useLocation();

  const navigate = useNavigate();

  const handleMenuClick = () => {
    if (!isShow) {
      setIsShow(true);
    }
  };

  const handleHomeClick = (e) => {
    if (location.pathname === '/') {
      e.preventDefault();
      window.scrollTo({
        top: 0,
        behavior: 'smooth',
      });
    } else {
      navigate('/')
    }
  };

  const showOverviewAndManageTasks = location.pathname !== '/managetasks';

  return (
    <nav>
      <Link to='/'>
        <p>
          <FcTodoList className={styles.logo} /> TODO
        </p>
      </Link>
      <div className={styles.menu}>
        {isShow ? (
          <FaBars onClick={() => setIsShow(false)} />
        ) : (
          <AiOutlineClose onClick={() => setIsShow(true)} />
        )}
      </div>
      <ul className={styles.navbar} id={isShow ? "" : styles.menu} onClick={handleMenuClick}>
        <li>
          <a href="#home" onClick={handleHomeClick}>Home</a>
        </li>
        {showOverviewAndManageTasks && (
          <>
            <li>
              <a href="#overview">Overview</a>
            </li>
            <li>
              <NavLink to="/managetasks">Manage Tasks</NavLink>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
}

export default Navbar;
