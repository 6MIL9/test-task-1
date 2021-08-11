import React, { useState, useEffect, useRef } from 'react';
import "./App.css"
import { CSSTransition } from 'react-transition-group';
import { getCompaniesThunk, getHousingStockThunk, actions } from './redux/appReducer';
import { useDispatch, useSelector } from 'react-redux'
import { Preloader } from './Preloader/Preloader';


function App() {
  const dispatch = useDispatch()
  const companies = useSelector((state) => state.companies)
  const initialized = useSelector((state) => state.initialized)

  useEffect(() => {
    dispatch(getCompaniesThunk())
  }, [dispatch]);

  if (initialized === false) {
    return <Preloader />
  } else {
    return (
      <Menu>
        {
          companies.map((item) => {
            return <MenuItem text={item.name} companyId={item.id} ></MenuItem>
          })
        }
      </Menu>
    );
  }
};

function Menu(props) {
  return (
    <div className="container">
      <ul className="container-item">{props.children}</ul>
    </div>
  );
}

function MenuItem(props) {
  const dispatch = useDispatch()
  const [open, setOpen] = useState(false);
  const housingStockStatus = useSelector((state) => state.housingStockStatus)
  const isOpened = useSelector((state) => state.isOpened)

  const handler = () => {
    dispatch(actions.setHousingStockStatus(false))
    dispatch(getHousingStockThunk(props.companyId))
    setOpen(!open)
    dispatch(actions.setIsOpened(!open))
  }

  return (
    <li className="menu-item">
      <button className="button" onClick={handler} disabled={isOpened}>
        {props.text}
      </button>

      {open && <DropdownMenu housingStockStatus={housingStockStatus} setOpen={setOpen} open={open}></DropdownMenu>}
    </li>
  );
}

function DropdownMenu({setOpen, open, housingStockStatus}) {
  const [activeMenu, setActiveMenu] = useState('main');
  const [menuHeight, setMenuHeight] = useState(null);
  const dispatch = useDispatch()
  const dropdownRef = useRef(null);
  const handler = () => {
    setOpen(!open)
    dispatch(actions.setIsOpened(!open))
  }
  useEffect(() => {
    setMenuHeight(dropdownRef.current?.firstChild.offsetHeight)
  }, [])

  function calcHeight(el) {
    const height = el.offsetHeight;
    setMenuHeight(height);
  }

  function DropdownItem(props) {
    return (
      <button className="item" onClick={() => props.goToMenu && setActiveMenu(props.goToMenu)}>
        {props.children}
      </button>
    );
  }
  if (housingStockStatus === false) {
    return <div className="dropdown">Please wait...</div>
  } else {
    return (
      <div className="dropdown" style={{ height: menuHeight }} ref={dropdownRef}>
        <CSSTransition
          in={activeMenu === 'main'}
          timeout={500}
          classNames="menu-primary"
          unmountOnExit
          onEnter={calcHeight}>
          <div className="menu">
            <button onClick={handler} className='item'>Закрыть</button>
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
}



export default App;
