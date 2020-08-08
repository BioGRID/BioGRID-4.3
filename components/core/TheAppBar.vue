<template>
    <header class="the-app-bar">
        <v-app-bar
            :clipped-left="clipped"
            fixed
            color="secondary"
            app
            class="white--text"
            :elevate-on-scroll="true"
            :src="backgroundImage()"
            :fade-img-on-scroll="true"
        >
            <v-app-bar-nav-icon
                color="white"
                class="hidden-md-and-up mr-3"
                @click.stop="toggleNavDrawerVisible"
            />
            <v-toolbar-title class="pl-0">
                <nuxt-link to="/">
                    <v-img
                        :src="logoImage()"
                        max-height="60"
                        contain
                        position="left center"
                    />
                </nuxt-link>
            </v-toolbar-title>
            <v-spacer />
            <v-btn
                text
                dark
                large
                nuxt
                to="/"
                class="hidden-sm-and-down"
            >
                Home
            </v-btn>
            <v-btn
                icon
                dark
                class="hidden-sm-and-down"
            >
                <v-icon>
                    mdi-twitter
                </v-icon>
            </v-btn>
        </v-app-bar>
    </header>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'

@Component
export default class TheFooter extends Vue {
    private clipped: boolean = false;
    private title: string = process.env.SHORT_TITLE || 'BioGRID';

    private toggleNavDrawerVisible () {
        this.$store.dispatch('toggleNavDrawerVisible')
    }

    private backgroundImage () {
        if (this.$route.path === '/' || this.$route.path === '/home') {
            return process.env.BASE_URL + '/images/banner_bg_appbar.png'
        } else {
            return ''
        }
    }

    private logoImage () {
        return process.env.BASE_URL + '/images/biogrid_logo.png'
    }
}
</script>

<style lang="scss" scoped>
     ::v-deep .v-toolbar__image .v-image__image--cover {
        background-size: auto !important;
    }
</style>
