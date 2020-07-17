const actions = {
    // Allow for the collapsing and maximizing of the NavDrawer
    toggleNavDrawerVisible: (context: any) => {
        context.commit('TOGGLE_NAV_DRAWER')
    },
    // Allow remembering the last search type setting
    updateLastSearchType: (context: any, payload: any) => {
        context.commit('UPDATE_LAST_SEARCH_TYPE', payload.value)
    }
}

export default actions
