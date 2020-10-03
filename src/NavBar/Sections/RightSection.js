import React from 'react';
import { Menu } from 'antd';
import { withRouter } from 'react-router-dom';


const { isAutheticated, signout } = require("../../auth/helper");

function RightSection(props) {
    if(!isAutheticated()) {
        return(
            <Menu mode={props.mode}>
                <Menu.Item key="mail">
                    <a href="/signin">Signin</a>
                </Menu.Item>
                <Menu.Item key="app">
                    <a href="/signup">Signup</a>
                </Menu.Item>
            </Menu>
        );
    } 
    else{
        return(
            <Menu mode= {props.mode}>
                <Menu.Item key="fav">
                    <a href="/favorite">Favorite</a>
                </Menu.Item>
                <Menu.Item key="logout">
                  <a 
                    onClick={() => {
                      signout(() => {
                        props.history.push("/");
                      });
                    }}
                  >Logout</a>
                </Menu.Item>
            </Menu>
        );
    }
}

export default withRouter(RightSection);
