import React, { useState, useEffect, useRef } from 'react';
import "./App.css"
import { CSSTransition } from 'react-transition-group';
import { getCompaniesThunk } from './redux/appReducer';
import { useDispatch } from 'react-redux'


function App() {
  return (
    <Menu>
      <MenuItem text=" Компания 1" />
      <MenuItem text="Компания 2" />
      <MenuItem text="Компания 3" />

      <MenuItem text="Компания нужная">
        <DropdownMenu></DropdownMenu>
      </MenuItem>
    </Menu>
  );
}

function Menu(props) {
  const dispatch = useDispatch()

  return (
    <div className="container">
      <ul className="container-item">{props.children}</ul>
      <button onClick={() => dispatch(getCompaniesThunk())}>get</button>
    </div>
  );
}

function MenuItem(props) {
  const [open, setOpen] = useState(false);

  return (
    <li className="menu-item">
      <a className="button" onClick={() => setOpen(!open)}>
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
      <a className="item" onClick={() => props.goToMenu && setActiveMenu(props.goToMenu)}>
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
          <DropdownItem goToMenu="street-1">
            Улица 1
          </DropdownItem>
          <DropdownItem goToMenu="street-2">
            Улица 2
          </DropdownItem>
          <DropdownItem goToMenu="street-3">
            Улица 3
          </DropdownItem>

        </div>
      </CSSTransition>

      <CSSTransition
        in={activeMenu === 'street-1'}
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
        in={activeMenu === 'street-2'}
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
        in={activeMenu === 'street-3'}
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
