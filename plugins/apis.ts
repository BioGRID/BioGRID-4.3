/**
 * Create a plugin for the entire API
 * that allows us to call it from any context
 * with the correct axios and parameters already
 * put in place
 */

import { Plugin } from '@nuxt/types'
import '@nuxtjs/axios'
import PublicAPI from '@/api/publicapi'

declare module 'vue/types/vue' {
    interface Vue {
        $pubapi: PublicAPI
    }
}

declare module '@nuxt/types' {
    interface NuxtAppOptions {
        $pubapi: PublicAPI
    }
}

declare module 'vuex/types/index' {
    interface Store<S> {
        $pubapi: PublicAPI
    }
}

const myPlugin: Plugin = (ctx, inject) => {
    const pubAPI = new PublicAPI(ctx.$axios)
    inject('pubapi', pubAPI)
}

export default myPlugin
