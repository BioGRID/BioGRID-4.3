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
            <v-toolbar-title v-text="title" />
            <v-spacer />
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
