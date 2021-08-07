import { authAPI } from './../api/appApi';

let initialState = {
    companies: [],
    initialized: false
};


const appReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'app/COMPANIES_RECEIVED': {
            return {
                ...state,
                companies: action.payload.companies
            };
        }

        case 'app/INITIALIZED_SUCCESS': {
            return {
                ...state,
                initialized: true
            };
        }

        default:
            return state;
    }
}

export const actions = {
    companiesReceived: (companies) => ({
        type: 'app/COMPANIES_RECEIVED', payload: { companies }
    }),
    initializedSuccess: () => ({
        type: 'app/INITIALIZED_SUCCESS'
    })
}

export const getCompaniesThunk = () => {
    return async (dispatch) => {
        let response = await authAPI.getCompanies()
        dispatch(actions.companiesReceived(response));
        dispatch(actions.initializedSuccess());
    }
}

export default appReducer;
