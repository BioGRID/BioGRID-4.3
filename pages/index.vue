<template>
    <v-container fluid class="index-page pa-0">
        <v-sheet class="bannerBackground">
            <v-container class="pa-0 constrainSize">
                <v-card color="transparent" dark class="pa-0 ma-0 white--text text-center" flat rounded="0">
                    <v-img
                        :src="logoImage"
                        contain
                        position="center center"
                        max-height="100"
                        class="mr-12 hidden-sm-and-down"
                    />
                    <h1 class="accent--text">
                        Welcome to the <span class="hidden-sm-and-down">Biological</span> General Repository for Interaction Datasets
                    </h1>
                    <div class="subtitle-1 grey--text text--lighten-4 ml-3 mr-3">
                        BioGRID is an open access, molecular interaction database with data compiled through comprehensive literature curation efforts. All data are freely provided via our search index and available for download in multiple standardized formats.
                    </div>
                    <v-row no-gutters class="mt-7 mb-7">
                        <v-col
                            lg="8"
                            md="10"
                            sm="12"
                            cols="12"
                            offset="0"
                            offset-lg="2"
                            offset-md="1"
                            offset-sm="0"
                        >
                            <SearchForm />
                        </v-col>
                    </v-row>
                    <v-row no-gutters>
                        <v-col
                            lg="10"
                            md="10"
                            offset-lg="1"
                            offset-md="1"
                            class="mb-2"
                        >
                            <HighlightCards :items="highlightItems" />
                        </v-col>
                    </v-row>
                </v-card>
            </v-container>
        </v-sheet>

        <AlertBar />

        <v-container class="pa-0 constrainSize">
            <h2 class="mt-3 mb-n3 font-weight-regular text-uppercase text-center">
                Latest News
            </h2>
            <SubheaderUnderline
                top-margin="5"
                bot-margin="2"
                width="120px"
            />
            <NewsSummaryBlock :news-items="newsItems" :max-body-length="maxNewsBodyLength" />
        </v-container>

        <v-sheet color="grey lighten-2">
            <v-container class="pa-0 pt-4 pb-2 constrainSize text-center">
                <h2 class="mt-3 mb-n3 font-weight-regular text-uppercase">
                    Our Partners
                </h2>
                <SubheaderUnderline
                    top-margin="5"
                    bot-margin="0"
                    width="120px"
                />
                <v-row>
                    <template
                        v-for="(partner,i) in partners"
                    >
                        <v-col
                            :key="i"
                            lg="2"
                            md="2"
                            cols="4"
                        >
                            <v-card
                                flat
                                class="pt-6 pl-6 pr-6 pb-3"
                                :href="partner.to"
                                target="_BLANK"
                                color="grey lighten-2"
                            >
                                <v-img
                                    :src="partner.image"
                                    :title="partner.title"
                                />
                            </v-card>
                        </v-col>
                    </template>
                </v-row>
            </v-container>
        </v-sheet>
    </v-container>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
import { Linkout, NewsItem } from '@/utilities/types'
import HighlightCards from '@/components/content/HighlightCards.vue'
import SearchForm from '@/components/search/SearchForm.vue'
import AlertBar from '@/components/content/AlertBar.vue'
import SubheaderUnderline from '@/components/content/SubheaderUnderline.vue'
import NewsSummaryBlock from '@/components/news/NewsSummaryBlock.vue'

@Component({
    components: {
        HighlightCards,
        SearchForm,
        AlertBar,
        SubheaderUnderline,
        NewsSummaryBlock
    }
})
export default class IndexPage extends Vue {
    private newsItems: NewsItem[] = []
    private maxNewsItems!: number // Set in Async Data
    private maxNewsBodyLength: number = 300;
    private highlightItems: Linkout[] = [
        { to: '/test', text: 'Featured Datasets', title: 'BioGRID Featured Datasets', icon: 'mdi-star', internal: true },
        { to: '/test', text: 'Curation Projects', title: 'BioGRID Curation Projects', icon: 'mdi-brain', internal: true },
        { to: 'https://orcs.thebiogrid.org', text: 'BioGRID ORCS', title: 'BioGRID ORCS CRISPR Database', icon: 'mdi-dna', internal: false },
        { to: '/test', text: 'YouTube Tutorials', title: 'BioGRID Youtube Tutorial Videos', icon: 'mdi-youtube', internal: true },
        { to: '/test', text: 'Latest Updates', title: 'Follow @biogrid on Twitter', icon: 'mdi-twitter', internal: true },
        { to: 'http://yahoo.com', text: 'Yahoo', title: 'Yahoo News', icon: 'mdi-yahoo', internal: false }
    ]

    private partners: Linkout[] = [
         { to: 'https://www.nih.gov/', text: 'National Institutes of Health', title: 'National Instatitues of Health', internal: false, image: 'images/partners/nih.png' },
         { to: 'https://orip.nih.gov/', text: 'Office of Research and Infrastructure Programs', title: 'Office of Research and Infrastructure Programs', internal: false, image: 'images/partners/ORIP.png' },
        { to: 'http://www.cihr-irsc.gc.ca/e/193.html', text: 'Canadian Institutes of Health Research', title: 'Canadian Institutes of Health Research', internal: false, image: 'images/partners/cihr.png' },
        { to: 'https://www.mountsinai.on.ca/', text: 'Mount Sinai Hospital', title: 'Mount Sinai Hospital', internal: false, image: 'images/partners/mountsinai.png' },
        { to: 'https://www.princeton.edu/', text: 'Princeton University', title: 'Princeton University', internal: false, image: 'images/partners/princeton.png' },
        { to: 'https://www.umontreal.ca/en/', text: 'Universite de Montreal', title: 'Universite de Montreal', internal: false, image: 'images/partners/montreal.png' }
    ]

    private head () {
        return {
            title: process.env.FULL_TITLE
        }
    }

    get logoImage () {
        return process.env.BASE_URL + '/images/biogrid_logo.png'
    }

    private async asyncData (context: any) {
        const maxNewsItems = 6
        try {
            const news = await context.$pubapi.newsitems({ count: maxNewsItems })
            return { newsItems: news.data.data, maxNewsItems }
        } catch (error) {
            return { newsItems: undefined, maxNewsItems }
        }
    }
}
</script>

<style lang="scss" scoped>
    .constrainSize {
        max-width: 1190px;
    }

    .bannerBackground {
        background-image: url( '~@/assets/images/banner_bg.png' ), linear-gradient(#3E405B, #000);
        background-size: auto;
        background-repeat: no-repeat;
        background-position: top center;
    }
</style>
