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
import { formatEntityTypesFromStats } from '@/utilities/formatting'

@Component
export default class SearchResultActions extends Vue {
    @Prop({ type: Object, default: undefined }) private stats!: Record<string, Record<string, number>>

    get actions () {
        return formatEntityTypesFromStats(this.stats)
    }
}
</script>

<style lang="scss" scoped>
</style>
