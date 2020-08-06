<template>
    <div class="biogrid-publication-page">
        <AlertBar />
        <v-container fluid>
            <v-row no-gutters>
                <v-col
                    lg="8"
                    md="7"
                    sm="12"
                    cols="12"
                >
                    <DatasetDetails :collapsed="false" :dataset="pubInfo" />
                </v-col>
                <v-col
                    lg="4"
                    md="5"
                    sm="12"
                    cols="12"
                    class="hidden-sm-and-down"
                >
                    <v-card
                        class="pa-3 mt-4 mt-md-0 ml-0 ml-md-4"
                        height="100%"
                    >
                        <h1>STAT DETAILS</h1>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Enim blandit volutpat maecenas volutpat blandit aliquam. Nisl pretium fusce id velit ut. Purus in mollis nunc sed id semper risus in.
                    </v-card>
                </v-col>
            </v-row>
            <v-row no-gutters>
                <v-col
                    cols="12"
                >
                    <v-card
                        class="pa-3 mt-4 mt-md-4"
                        height="60px"
                    >
                    <h1>Curated Data Selector</h1>
                    </v-card>
                </v-col>
            </v-row>
            <v-row no-gutters>
                <v-col
                    cols="12"
                >
                    <v-card
                        class="pa-3 mt-4"
                        height="2000px"
                    >
                    <h1>TABLE BLOCK</h1>
                    </v-card>
                </v-col>
            </v-row>
        </v-container>
    </div>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
import { DatasetSearchResult } from '@/utilities/types'
import DatasetDetails from '@/components/results/DatasetDetails.vue'
import AlertBar from '@/components/content/AlertBar.vue'

@Component({
    components: {
        DatasetDetails,
        AlertBar
    }
})
export default class PublicationResulttwoPage extends Vue {
    private pubInfo: DatasetSearchResult | undefined = undefined

    private head () {
        if (this.pubInfo !== undefined) {
            return {
                title: this.pubInfo.title
            }
        }
        return {}
    }

    private async asyncData (context: any) {
        /* const resp = await context.$pubapi.participant({ participantType: 'dataset', participantID: context.route.params.id })
        console.log(resp.data) */

        try {
            const pub = await context.$pubapi.participant({ participantType: 'dataset', participantID: context.route.params.id })
            return { pubInfo: pub.data.data }
        } catch (error) {
            if (error.response.status === 404) {
                context.error({ statusCode: 404, message: 'The publication ID requested does not exist' })
            } else {
                context.error({ statusCode: 500, message: 'An unknown error occurred while fetching results for this page. Please try again later!' })
            }
        }

        return {}

            /* const [pub] = await Promise.allSettled([
                context.$pubapi.participant({ participantType: 'dataset', participantID: context.route.params.id })
            ]) */

            /* if (pub.reason.response.status === 404) {
                context.error({ statusCode: 404, message: 'The publication ID requested does not exist' })
            } */
    }

    private validate (context: any) {
        // Must be a number
        return /^\d+$/.test(context.params.id)
    }
}
</script>

<style lang="scss" scoped>
</style>
