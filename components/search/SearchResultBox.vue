<template>
    <div class="biogrid-search-result-box align-center">
        <v-card
            class="black--text mt-2 pa-0 rounded-0 rounded-r-xl searchResultBox"
            nuxt
            :to="resultLink"
        >
            <div v-if="resultType.length > 0" class="caption rounded-0 font-weight-bold pa-1 ma-0 mt-2 mb-2 pr-3 organismBanner rounded-r-xl grey lighten-2">
                <span class="ml-3">
                    {{ resultType }}
                </span>
            </div>
            <v-card-title class="pb-3 mt-0 pt-0 mb-1 font-weight-bold searchResultBoxTitle">
                {{ resultTitle }}
                <slot name="resultTitleAddon" />
            </v-card-title>
            <v-card-subtitle class="pb-0 light-blue--text text-darken-3 font-weight-bold">
                {{ resultSubtitle }}
            </v-card-subtitle>
            <v-card-text class="pb-0">
                <span v-if="!readMoreActivated && resultBody.length >= maxBodyLength">
                    {{ resultBody.slice(0, maxBodyLength) }} ...
                </span>
                <span v-if="readMoreActivated || resultBody.length < maxBodyLength">
                    {{ resultBody }}
                </span>
                <a v-if="resultBody.length > maxBodyLength" title="Click to Toggle Description" @click.prevent="readMoreActivated = !readMoreActivated">
                    <v-btn x-small text color="secondary" dark>
                        <span v-if="readMoreActivated">[Less]</span>
                        <span v-if="!readMoreActivated">[More]</span>
                    </v-btn>
                </a>
            </v-card-text>
            <div class="caption ml-4 grey--text">
                {{ resultFooter }}
            </div>
            <v-card-actions class="ml-1">
                <SearchResultActions
                    :stats="stats"
                />
            </v-card-actions>
        </v-card>
    </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'nuxt-property-decorator'
import SearchResultActions from '@/components/search/SearchResultActions.vue'

@Component({
    components: {
        SearchResultActions
    }
})
export default class SearchResultBox extends Vue {
    @Prop({ type: String, default: '' }) private resultType!: string
    @Prop({ type: String, default: '' }) private resultLink!: string
    @Prop({ type: String, default: '' }) private resultTitle!: string
    @Prop({ type: String, default: '' }) private resultSubtitle!: string
    @Prop({ type: String, default: '' }) private resultBody!: string
    @Prop({ type: String, default: '' }) private resultFooter!: string
    @Prop({ type: Object, default: '' }) private stats!: Record<string, number>
    private readMoreActivated: boolean = false
    private maxBodyLength: number = 400
}
</script>

<style lang="scss" scoped>
    .searchResultBox:hover {
        background-color: #EEE !important;
    }
    .searchResultBoxTitle {
        line-height: 25px;
    }
    .organismBanner {
        display: inline-block;
    }
</style>
