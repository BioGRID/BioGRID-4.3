import colors from 'vuetify/es5/util/colors'

export default {
    /*
    ** Nuxt rendering mode
    ** See https://nuxtjs.org/api/configuration-mode
    */
    mode: 'universal',
    /*
    ** Nuxt target
    ** See https://nuxtjs.org/api/configuration-target
    */
    target: 'server',
    /*
    ** Headers of the page
    ** See https://nuxtjs.org/api/configuration-head
    */
    head: {
        titleTemplate: '%s | ' + process.env.SHORT_TITLE,
        meta: [
            { charset: 'utf-8' },
            { name: 'viewport', content: 'width=device-width, initial-scale=1' },
            { hid: 'description', name: 'description', content: process.env.npm_package_description || '' }
        ],
        link: [
            { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
        ]
    },
    /*
    ** Global CSS
    */
    css: [
        '~assets/fonts/roboto.css',
        '~assets/globalstyle.scss',
        '@mdi/font/css/materialdesignicons.min.css'
    ],
    /*
    ** Plugins to load before mounting the App
    ** https://nuxtjs.org/guide/plugins
    */
    plugins: [
        '~/plugins/apis'
    ],
    /*
    ** Auto import components
    ** See https://nuxtjs.org/api/configuration-components
    */
    components: true,
    /*
    ** Nuxt.js dev-modules
    */
    buildModules: [
        '@nuxt/typescript-build',
        '@nuxtjs/vuetify',
        '@nuxtjs/dotenv'
    ],
    /*
    ** Nuxt.js modules
    */
    modules: [
        // Doc: https://axios.nuxtjs.org/usage
        '@nuxtjs/axios',
        '@nuxtjs/style-resources'
    ],
    /*
    ** Axios module configuration
    ** See https://axios.nuxtjs.org/options
    */
    axios: {
        retry: { retries: 5 }
    },
    /*
    ** Style Resouces
    */
    styleResources: {
        scss: ['./assets/scss/*.scss']
    },
    /*
    ** vuetify module configuration
    ** https://github.com/nuxt-community/vuetify-module
    */
    vuetify: {
        customVariables: ['~/assets/variables.scss'],
        defaultAssets: false,
        theme: {
            dark: false,
            options: {
                customProperties: true
            },
            themes: {
                light: {
                    primary: '#1B4079',
                    accent: '#50C2BD',
                    secondary: '#3E405B',
                    tertiary: '#FCD0A1',
                    quaternary: '#5c462c',
                    info: '#BDADEA',
                    warning: '#EC9A29',
                    error: '#901532',
                    success: '#3E5622'
                },
                dark: {
                    primary: colors.blue.darken2,
                    accent: colors.grey.darken3,
                    secondary: colors.amber.darken3,
                    info: colors.teal.lighten1,
                    warning: colors.amber.base,
                    error: colors.deepOrange.accent4,
                    success: colors.green.accent3
                }
            }
        }
    },
    /*
    ** Build configuration
    ** See https://nuxtjs.org/api/configuration-build/
    */
    build: {
    },

    /**
     ** Watch Configuration
     ** Additional directories to watch for changes
     */
    watch: [
        '~utilities/*.ts',
        '~api/*.ts'
    ]
}
