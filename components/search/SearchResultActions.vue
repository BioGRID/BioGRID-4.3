<template>
    <div class="biogrid-search-result-actions align-center">
        <v-slide-group
            show-arrows
        >
            <v-slide-item
                v-for="(action, i) in actions"
                :key="i"
            >
                <v-btn
                    small
                    :color="action.color"
                    :dark="action.dark"
                    depressed
                    class="font-weight-bold mr-1"
                >
                    <v-icon
                        small
                    >
                        {{ action.icon }}
                    </v-icon>
                    {{ action.text }} ({{ action.count }})
                </v-btn>
            </v-slide-item>
        </v-slide-group>
    </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'nuxt-property-decorator'
import { SearchResultAction } from '@/utilities/types'

@Component
export default class SearchResultActions extends Vue {
    @Prop({ type: Object, default: undefined }) private stats!: Record<string, Record<string, number>>

    get actions () {
        const actions: SearchResultAction[] = []

        if (this.stats.activated['1'] !== undefined) {
            actions.push({
                icon: 'mdi-graph',
                text: 'interactions',
                count: this.stats.activated['1'],
                color: 'yellow lighten-3',
                dark: false
            })
        }

        if (this.stats.activated['2'] !== undefined) {
            actions.push({
                icon: 'mdi-cube-unfolded',
                text: 'complexes',
                count: this.stats.activated['2'],
                color: 'purple lighten-4',
                dark: false
            })
        }

        if (this.stats.activated['4'] !== undefined) {
            actions.push({
                icon: 'mdi-map-marker',
                text: 'post-translational modifications',
                count: this.stats.activated['4'],
                color: 'orange lighten-3',
                dark: false
            })
        }

        if (this.stats.activated['3'] !== undefined) {
            actions.push({
                icon: 'mdi-flask-outline',
                text: 'chemical interactions',
                count: this.stats.activated['3'],
                color: 'green lighten-3',
                dark: false
            })
        }

        return actions
    }
}
</script>

<style lang="scss" scoped>
</style>
