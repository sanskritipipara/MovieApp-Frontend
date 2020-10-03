import React, {useState} from 'react';
import {Drawer, Button} from 'antd';
import RightSection from './Sections/RightSection';
import './Sections/NavBar.css'
import { Link, withRouter } from 'react-router-dom';
import { isAutheticated, signout } from '../auth/helper';
const Logo = require("./Sections/Icon.png")

function NavBar({history}) {
    const [visible, setVisible] = useState(false);

    const showDrawer = () => {
        setVisible(true)
    };

    const onClose = () => {
        setVisible(false)
    };

    return(
        <nav className="menu" style={{ position: 'fixed', zIndex: 1, width: '100%' }}>
      <div className="menu__logo">
        <a href="/"><img src={Logo} alt="Logo" style={{ width: '100%', marginTop: '-5px' }} /></a>
      </div>
      <div>
        <ul className="nav nav-tabs bg-warning"> 
          {isAutheticated() && (
            <li className="nav-item">
            <Link className="nav-link" to="/favorite">
                  Favorite
            </Link>
            </li>
          )}
          {!isAutheticated() && (
            <li className="nav-item">
              <Link className="nav-link" to="/signin">
                Signin
              </Link>
            </li>
          )}
          {!isAutheticated() && (
            <li className="nav-item">
              <Link className="nav-link" to="/signup">
                Signup
              </Link>
            </li>
          )}
          {isAutheticated() && (
            <li className="nav-item">
            <Link className="nav-link" 
             onClick={() => {
              signout(() => {
                history.push("/");
              });
            }}
            >
              Signout
            </Link>
          </li>
          )}
        </ul>  
        
        <Button
          className="herebutton"
          type="primary"
          onClick={showDrawer}
        >
          {/* <Icon type="align-right" /> */}
          HERE
        </Button>
        <Drawer
          width={200}
          title="Basic Drawer"
          placement="right"
          className="menu_drawer"
          closable={false}
          onClose={onClose}
          visible={visible}
        >
          <RightSection mode="inline" />
          <button className="btn btn-small btn-primary space " 
          onClick={onClose}
          >Close</button>
        </Drawer>
      </div>
    </nav>
    )
}

export default withRouter(NavBar);