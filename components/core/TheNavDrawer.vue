<template>
    <div class="the-navigation-drawer">
        <v-navigation-drawer
            :value="navDrawerVisible"
            :mini-variant="miniVariant"
            :clipped="clipped"
            :disable-resize-watcher="true"
            color="secondary"
            fixed
            app
        >
            NAV DRAWER
            <v-list>
                <v-list-item
                v-for="(item, i) in items"
                :key="i"
                :to="item.to"
                router
                exact
                >
                <v-list-item-action>
                    <v-icon>{{ item.icon }}</v-icon>
                </v-list-item-action>
                <v-list-item-content>
                    <v-list-item-title v-text="item.title" />
                </v-list-item-content>
                </v-list-item>
            </v-list>
        </v-navigation-drawer>
    </div>
</template>

<script lang="ts">
import { Component, Vue, State } from 'nuxt-property-decorator'

@Component
export default class TheNavDrawer extends Vue {
    @State private navDrawerVisible!: boolean;
    private clipped: boolean = false;
    private miniVariant: boolean = false;
    private title: string = process.env.SHORT_TITLE || 'BioGRID';
    private items = [
        { to: '/inspire', icon: 'mdi-up-arrow', title: 'INSPIRE' }
    ]
}
</script>
