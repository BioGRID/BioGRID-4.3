<template>
    <div class="biogrid-news-summary-block">
        <v-row v-if="newsItems !== undefined && newsItems.length > 0" class="pl-5 pr-5 pb-3">
            <template
                v-for="(item,i) in newsItems"
            >
                <v-col :key="i" cols="12" lg="4" md="4" sm="6">
                    <NewsSummary :news-item="item" :max-body-length="maxBodyLength" />
                </v-col>
            </template>
            <v-col cols="12" class="text-center">
                <v-btn
                    outlined
                    nuxt
                    to="/news"
                >
                    Additional News Items
                </v-btn>
            </v-col>
        </v-row>
        <v-row v-if="newsItems !== undefined && newsItems.length <= 0">
            <v-col class="text-center">
                Loading news ...
                <v-progress-circular
                    :width="3"
                    color="grey"
                    indeterminate
                />
            </v-col>
        </v-row>
        <v-row v-if="newsItems === undefined">
            <v-col class="text-center">
                Temporarily, unable to locate latest news items ...
            </v-col>
        </v-row>
    </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'nuxt-property-decorator'
import { NewsItem } from '@/utilities/types'
import NewsSummary from '@/components/news/NewsSummary.vue'

@Component({
    components: {
        NewsSummary
    }
})
export default class NewsSummaryBlock extends Vue {
    @Prop() private newsItems!: NewsItem[] | undefined
    @Prop() private maxBodyLength!: number;
}
</script>

<style lang="scss" scoped>

</style>
