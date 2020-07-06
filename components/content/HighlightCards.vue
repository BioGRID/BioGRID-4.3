<template>
    <div class="highlight-cards align-center">
        <v-slide-group
            show-arrows="always"
            prev-icon="mdi-chevron-left"
            next-icon="mdi-chevron-right"
        >
            <template
                v-for="(link,i) in items"
            >
                <v-card
                    v-if="link.internal"
                    :key="i"
                    :to="link.to"
                    nuxt
                    height="80"
                    width="140"
                    :title="link.title"
                    text
                    align="center"
                    justify="center"
                    rounded
                    flat
                    class="mb-2 ma-1 black--text highlightCard pa-2 pt-3"
                >
                    <v-icon class="pr-1" color="accent" large>
                        {{ link.icon }}
                    </v-icon>
                    <div class="hidden-sm-and-down white--text body-2" style="opacity: 1">
                        {{ link.text }}
                    </div>
                </v-card>
                <v-card
                    v-if="!link.internal"
                    :key="i"
                    :href="link.to"
                    target="_BLANK"
                    height="80"
                    width="140"
                    :title="link.title"
                    text
                    align="center"
                    justify="center"
                    rounded
                    flat
                    class="mb-2 ma-1 black--text highlightCard pa-2 pt-3"
                >
                    <v-icon class="pr-1" color="accent" large>
                        {{ link.icon }}
                    </v-icon>
                    <div class="hidden-sm-and-down white--text body-2" style="opacity: 1">
                        {{ link.text }}
                    </div>
                </v-card>
            </template>
        </v-slide-group>
    </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'nuxt-property-decorator'
import { Linkout } from '@/utilities/interfaces'

@Component
export default class HighlightCards extends Vue {
    @Prop(Array) private items!: Linkout[];
}
</script>

<style lang="scss" scoped>
    .highlightCard {
        background-color: rgb(255,255,255,0.15) !important;
    }
</style>
