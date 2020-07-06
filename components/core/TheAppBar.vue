<template>
    <header class="the-app-bar">
        <v-app-bar
            :clipped-left="clipped"
            fixed
            color="secondary"
            app
            class="white--text"
            :elevate-on-scroll="true"
        >
            <v-app-bar-nav-icon color="white" @click.stop="toggleNavDrawerVisible" />
            <v-toolbar-title>
                <nuxt-link to="/">
                    <v-img
                        src="/images/biogrid_logo.png"
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
                to="/test"
            >
                Test
            </v-btn>
            <v-btn
                icon
                dark
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
    private title: string = process.env.SHORT_TITLE || 'BioGRIDasdfasdf';

    private toggleNavDrawerVisible () {
        this.$store.dispatch('toggleNavDrawerVisible')
    }
}
</script>
