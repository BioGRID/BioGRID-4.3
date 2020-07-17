const mutations = {
    TOGGLE_NAV_DRAWER: (state: any) => {
        state.navDrawerVisible = !state.navDrawerVisible
    },
    UPDATE_LAST_SEARCH_TYPE: (state: any, lastSearchType: object) => {
        state.lastSearchType = lastSearchType
    }
}

export default mutations
