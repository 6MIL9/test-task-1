
export const authAPI = {
    getCompanies() {
        return fetch('https://dispex.org/api/vtest/Request/companies').then((res) =>  res.json())
    },

};
