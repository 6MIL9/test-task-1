import React, { useState, useEffect, useRef } from 'react';
import "./App.css"
import { CSSTransition } from 'react-transition-group';

function App() {
  return (
    <Menu>
      <MenuItem text="1" />
      <MenuItem text="2" />
      <MenuItem text="3" />

      <MenuItem text="4">
        <DropdownMenu></DropdownMenu>
      </MenuItem>
    </Menu>
  );
}

function Menu(props) {
  return (
    <div className="container">
      <ul className="container-item">{props.children}</ul>
    </div>
  );
}

function MenuItem(props) {
  const [open, setOpen] = useState(false);

  return (
    <li className="menu-item">
      <a href="#" className="button" onClick={() => setOpen(!open)}>
        {props.text}
      </a>

      {open && props.children}
    </li>
  );
}

function DropdownMenu() {
  const [activeMenu, setActiveMenu] = useState('main');
  const [menuHeight, setMenuHeight] = useState(null);
  const dropdownRef = useRef(null);

  useEffect(() => {
    setMenuHeight(dropdownRef.current?.firstChild.offsetHeight)
  }, [])

  function calcHeight(el) {
    const height = el.offsetHeight;
    setMenuHeight(height);
  }

  function DropdownItem(props) {
    return (
      <a href="#" className="item" onClick={() => props.goToMenu && setActiveMenu(props.goToMenu)}>
        {props.children}
      </a>
    );
  }

  return (
    <div className="dropdown" style={{ height: menuHeight }} ref={dropdownRef}>

      <CSSTransition
        in={activeMenu === 'main'}
        timeout={500}
        classNames="menu-primary"
        unmountOnExit
        onEnter={calcHeight}>
        <div className="menu">
          <DropdownItem goToMenu="company-1">
            Компания 1
          </DropdownItem>
          <DropdownItem goToMenu="company-2">
            Компания 2
          </DropdownItem>
          <DropdownItem goToMenu="company-3">
            Компания нужная
          </DropdownItem>

        </div>
      </CSSTransition>

      <CSSTransition
        in={activeMenu === 'company-1'}
        timeout={500}
        classNames="menu-secondary"
        unmountOnExit
        onEnter={calcHeight}>
        <div className="menu">
          <DropdownItem goToMenu="main" >
            <h2>Назад</h2>
          </DropdownItem>
          <DropdownItem >1</DropdownItem>
          <DropdownItem >2</DropdownItem>
          <DropdownItem >3</DropdownItem>
          <DropdownItem >4</DropdownItem>
        </div>
      </CSSTransition>

      <CSSTransition
        in={activeMenu === 'company-2'}
        timeout={500}
        classNames="menu-secondary"
        unmountOnExit
        onEnter={calcHeight}>
        <div className="menu">
          <DropdownItem goToMenu="main" >
            <h2>Назад</h2>
          </DropdownItem>
          <DropdownItem >1</DropdownItem>
          <DropdownItem >2</DropdownItem>
          <DropdownItem >3</DropdownItem>
          <DropdownItem >4</DropdownItem>
        </div>
      </CSSTransition>

      <CSSTransition
        in={activeMenu === 'company-3'}
        timeout={500}
        classNames="menu-secondary"
        unmountOnExit
        onEnter={calcHeight}>
        <div className="menu">
          <DropdownItem goToMenu="main" >
            <h2>Назад</h2>
          </DropdownItem>
          <DropdownItem >1</DropdownItem>
          <DropdownItem >2</DropdownItem>
          <DropdownItem >3</DropdownItem>
          <DropdownItem >4</DropdownItem>
        </div>
      </CSSTransition>
    </div>
  );
}


export default App;
