<template>
    <div class="biogrid-view-selector">
        <v-chip-group
            v-model="selectedView"
            mandatory
            active-class="light-blue darken-3 white--text"
            class="mt-2"
            show-arrows
        >
            <v-chip
                v-for="(option,i) in viewOptions"
                :key="i"
                class="elevation-1 defaultChip text-uppercase"
                label
            >
                <v-avatar left>
                    <v-icon color="white">
                        {{ option.icon }}
                    </v-icon>
                </v-avatar>
                {{ option.text }} ({{ option.count }})
            </v-chip>
        </v-chip-group>
    </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'nuxt-property-decorator'
import { formatEntityTypesFromStats } from '@/utilities/formatting'

@Component
export default class ViewSelector extends Vue {
    @Prop() private stats!: Record<string, Record<string, number>>
    private selectedView: number = 0

    get viewOptions () {
        return formatEntityTypesFromStats(this.stats)
    }
}
</script>

<style lang="scss">
    .defaultChip {
        background-color: #AAA !important;
        color: #333 !important;
    }
</style>
