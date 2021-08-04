// import { AuthUserData } from './authReducer';

let initialState = {
    menuStatus: false
};


const appReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'app/MENU_STATUS': {
            return {
                ...state,
                status: action.status
            };
        }

        default:
            return state;
    }
}

export const actions = {
    setMenuStatus: (status) => ({ type: 'app/MENU_STATUS' }, status )
}

export default appReducer;
