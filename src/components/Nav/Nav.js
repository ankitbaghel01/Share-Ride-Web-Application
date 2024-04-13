import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { GoHome } from "react-icons/go";
import { MdMiscellaneousServices } from "react-icons/md";
import { IoMdContacts } from "react-icons/io";
import './navbar.css'; // Import CSS for styling
import { LuMessageCircle } from "react-icons/lu";
import { AiOutlineSafety } from "react-icons/ai";
import { FaBlog } from "react-icons/fa6";
import { CiLogout } from "react-icons/ci";
import Button from 'react-bootstrap/Button';
import { RiPagesLine } from "react-icons/ri";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [showSidebar, setShowSidebar] = useState(false);
  const navbarRef = useRef(null);

  const toggleNavbar = () => {
    setIsOpen(!isOpen);
  };

  const toggleSidebar = () => {
    setShowSidebar(!showSidebar);
  };

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (navbarRef.current && !navbarRef.current.contains(event.target)) {
        setShowSidebar(false);
      }
    };

    document.addEventListener('mousedown', handleOutsideClick);

    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  }, []);

  return (
    <div ref={navbarRef}>
      <nav className="navbar">
        <div className="navbar-container">
          {/* <div className='right-nav'>
            <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQXf0PTf9RzcAvn-7u9ddNFJTBrvxQ5JVZdz1oWSSh97g&s" alt="Profile" className="profile-image" />
          </div> */}
          <div className="profile-image-container">
      
        <div className="profile-letter">B</div>
      </div>
          <br/>        

          <div className={`navbar-links ${isOpen ? 'active' : ''}`}>
            <Link to="/"><GoHome style={{ fontSize: '24px', marginLeft: '10px' }} /> <span>Home</span></Link>           
            <Link to="/services"><AiOutlineSafety style={{ fontSize: '24px', marginLeft: '10px' }}/> <span>Safety</span></Link>
            <Link to="/services"><FaBlog style={{ fontSize: '24px', marginLeft: '10px' }}/> <span>Blog</span></Link>
            <Link to="/services"><RiPagesLine style={{ fontSize: '24px', marginLeft: '10px' }}/> <span>Pages</span></Link>
            <Link to="/contact"><IoMdContacts style={{ fontSize: '24px', marginLeft: '10px' }}/> <span>Contact Us</span></Link>
            
          </div>
          <div className='bottom'>
              <div className='bottom-btn'>
              <Button variant="secondary" style={{ display: 'flex', alignItems: 'center' }}>
          <CiLogout style={{ fontSize: '24px', marginRight: '10px' }} />
          Sign out
        </Button>
              </div>
            </div>
          <div className="navbar-toggle" onClick={toggleNavbar}>
            <i className={`fas ${isOpen ? 'fa-times' : 'fa-bars'}`}></i>
          </div>
        </div>
      </nav>
      <button className="sidebar-toggle" onClick={toggleSidebar}>
        <i className="fas fa-bars"></i>
      </button>
      <div className={`sidebar ${showSidebar ? 'active' : ''}`}>
        {/* <ul>
          <li><Link to="/"><GoHome /> <span>Home</span></Link></li>
          <li><Link to="/about"><span>About</span></Link></li>
          <li><Link to="/services"><MdMiscellaneousServices /> <span>Services</span></Link></li>
          <li><Link to="/contact"><IoMdContacts /> <span>Contact</span></Link></li>
        </ul> */}



<div className="profile-image-container">
<div className="profile-letter">B</div>
        </div>
        <ul>
          <li><Link to="/"><GoHome style={{ fontSize: '24px', marginLeft: '10px' }}/> <span>Home</span></Link></li>
          <li><Link to="/services"><AiOutlineSafety style={{ fontSize: '24px', marginLeft: '10px' }}/> <span>Safety</span></Link></li>
          <li><Link to="/services"><FaBlog style={{ fontSize: '24px', marginLeft: '10px' }}/> <span>Blog</span></Link></li>
          <li><Link to="/services"><RiPagesLine style={{ fontSize: '24px', marginLeft: '10px' }}/> <span>Pages</span></Link></li>
          <li><Link to="/contact"><IoMdContacts style={{ fontSize: '24px', marginLeft: '10px' }}/> <span>Contact</span></Link></li>
          <li ><Link className='Logout btn' variant="secondary" type='button'  to="/logout"><CiLogout style={{ fontSize: '24px', marginLeft: '10px' }}/> <span>Sign out</span></Link></li>
        </ul>
      </div>
    </div>
  );
};

export default Navbar;


