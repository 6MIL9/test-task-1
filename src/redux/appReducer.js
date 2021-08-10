import { appAPI } from './../api/appApi';

let initialState = {
    companies: [],
    initialized: false,
    housingStock: [],
    housingStockStatus: false
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

        case 'app/HOUSING_STOCK_RECEIVED': {
            return {
                ...state,
                housingStock: action.payload.housingStock
            };
        }

        case 'app/SET_HOUSING_STOCK_STATUS': {
            return {
                ...state,
                housingStockStatus: action.status
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
    }),
    housingStockReceived: (housingStock) => ({
        type: 'app/HOUSING_STOCK_RECEIVED', payload: { housingStock }
    }),
    setHousingStockStatus: (status) => ({
        type: 'app/SET_HOUSING_STOCK_STATUS', status
    })
}

export const getCompaniesThunk = () => {
    return async (dispatch) => {
        let response = await appAPI.getCompanies()
        dispatch(actions.companiesReceived(response));
        dispatch(actions.initializedSuccess());
    }
}

export const getHousingStockThunk = (id) => {
    return async (dispatch) => {
        let response = await appAPI.getHousingStock(id)
        dispatch(actions.housingStockReceived(response));
        dispatch(actions.setHousingStockStatus(true))
    }
}

export default appReducer;
