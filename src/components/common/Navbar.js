import React ,{useState} from 'react'
import { Menu } from 'antd';

function Navbar (){
    let [curent,setCurrent] = useState('home');
     let handleClick = e => {
        console.log('click ', e);
        setCurrent(e.key);
      }
    
    return (
        <Menu onClick={handleClick} selectedKeys={curent} mode="horizontal">
          <Menu.Item >
            Team Reporter
          </Menu.Item>
          <Menu.Item key='home' >
            Home
          </Menu.Item>
          
        </Menu>
      );
}

export default Navbar;