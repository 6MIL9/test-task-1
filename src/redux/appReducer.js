// import { AuthUserData } from './authReducer';
import { authAPI } from './../api/appApi';

let initialState = {
    companies: []
};


const appReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'app/COMPANIES_RECEIVED': {
            return {
                ...state,
                companies: action.payload.companies
            };
        }

        default:
            return state;
    }
}

export const actions = {
    companiesReceived: (companies) => ({
        type: 'app/COMPANIES_RECEIVED', payload: { companies }
    }
    )
}

export const getCompaniesThunk = () => {
    return async (dispatch) => {
        let response = await authAPI.getCompanies()
        debugger
        dispatch(actions.companiesReceived(response));
    }
}

export default appReducer;
