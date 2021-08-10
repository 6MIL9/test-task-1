
export const appAPI = {
    getCompanies() {
        return fetch('https://dispex.org/api/vtest/Request/companies').then((res) =>  res.json())
    },
    getHousingStock(id) {
        return fetch(`https://dispex.org/api/vtest/HousingStock?companyId=${id}`).then((res) =>  res.json())
    }
};
