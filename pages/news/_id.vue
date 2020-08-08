<template>
    <div class="biogrid-news-item">
        <AlertBar />
        <v-container>
            <v-card
                class="pa-3"
            >
                <div class="overline">
                    News Article
                </div>
                <h1>{{ newsTitle }}</h1>
                <div class="subtitle-1 mb-4 mt-3">
                   <span class="accent--text"><strong>Posted</strong></span>: {{ newsDetails }}
                </div>
                <p v-html="newsBody" />
                <v-img
                    :src="newsImage"
                />
                <div class="text-center mt-5">
                    <v-btn
                        color="primary"
                        nuxt
                        to="/news"
                    >
                        Additional News Items
                    </v-btn>
                </div>
            </v-card>
        </v-container>
    </div>
</template>

<script lang="ts">
import moment from 'moment'
import { Component, Vue } from 'nuxt-property-decorator'
import AlertBar from '@/components/content/AlertBar.vue'
import { NewsItem } from '@/utilities/types'

@Component({
    components: {
        AlertBar
    }
})
export default class NewsArticle extends Vue {
    private newsItem: NewsItem | undefined = undefined
    private siteTitle: string = process.env.SHORT_TITLE || 'BioGRID'
    private twitterBodyLength: number = 295

    private head () {
        if (this.newsItem !== undefined) {
            return {
                title: this.newsItem.title,
                meta: [
                    { name: 'twitter:card', content: 'summary_large_image' },
                    { name: 'twitter:site', content: '@biogrid' },
                    { name: 'twitter:title', content: this.newsItem.title },
                    { name: 'twitter:description', content: this.generateTwitterDescription() },
                    { name: 'twitter:image', content: this.generateTwitterImage() }
                ]
            }
        }

        return {}
    }

    get newsTitle () {
        if (this.newsItem !== undefined) {
            return this.newsItem.title
        }

        return ''
    }

    get newsImage () {
        if (this.newsItem !== undefined) {
            return process.env.BASE_URL + '/images/news/' + this.newsItem.image
        }

        return ''
    }

    get newsBody () {
        if (this.newsItem !== undefined) {
            return this.newsItem.body
        }

        return ''
    }

    get newsDetails () {
        if (this.newsItem !== undefined) {
            const date = moment(this.newsItem.added_date, moment.ISO_8601)
            return date.format('MMMM Do, YYYY - hh:mm a')
        }

        return ''
    }

    private async asyncData (context: any) {
        try {
            const news = await context.$pubapi.newsitem(context.route.params.id)
            return { newsItem: news.data }
        } catch (error) {
            if (error.response.status === 404) {
                context.error({ statusCode: 404, message: 'News item does not exist' })
            } else {
                context.error({ statusCode: 500, message: 'An unknown error occurred while fetching this news item. Please try again later!' })
            }
        }
    }

    private generateTwitterImage () {
        if (this.newsItem !== undefined) {
            return process.env.BASE_URL + '/images/news/' + this.newsItem.image
        }

        return ''
    }

    private generateTwitterDescription () {
        if (this.newsItem !== undefined) {
            return this.newsItem.body.slice(0, this.twitterBodyLength) + ' ...'
        }

        return ''
    }
}
</script>

<style lang="scss" scoped>
    h1 {
        line-height: 40px;
    }
    ::v-deep a:not(.v-btn), a:visited:not(.v-btn) {
        font-weight: bold !important;
        text-decoration: none !important;
    }
    ::v-deep a:hover:not(.v-btn) {
        color: red !important;
    }
</style>
