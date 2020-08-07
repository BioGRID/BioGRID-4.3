<template>
    <div class="biogrid-news-list">
        <AlertBar />
        <v-container fluid>
            <v-card
                class="pa-3"
            >
                <h1>
                    Latest News Articles
                </h1>
                <div class="subtitle-1">
                    Showing articles {{ startArticleNumber }} to {{ startArticleNumber + newsItems.length }} of {{ totalNewsItems }} news articles ...
                </div>

                <v-list three-line>
                    <template v-for="(newsItem) in newsItems">
                        <v-list-item
                            :key="newsItem.title"
                            nuxt
                            :to="generateNewsItemLink(newsItem)"
                        >
                            <v-list-item-icon>
                                <v-icon color="accent">
                                    mdi-newspaper-variant-multiple
                                </v-icon>
                            </v-list-item-icon>

                            <v-list-item-content>
                                <v-list-item-title class="mt-2 font-weight-bold">
                                    {{ newsItem.title }}
                                </v-list-item-title>
                                <v-list-item-subtitle>
                                    {{ generateNewsItemDetails(newsItem) }}
                                </v-list-item-subtitle>
                                <div class="grey--text font-weight-regular mt-2 mb-2">
                                    {{ generateNewsItemContent(newsItem) }}
                                </div>
                            </v-list-item-content>
                            <div style="width: 120px; height: 70px;" class="ml-5 hidden-sm-and-down">
                                <v-img
                                    :src="generateNewsItemImage(newsItem)"
                                />
                            </div>
                        </v-list-item>
                        <v-divider :key="newsItem.news_id" />
                    </template>
                </v-list>

                <v-pagination
                    v-model="page"
                    color="accent"
                    :length="paginationSize"
                    :total-visible="7"
                />
            </v-card>
        </v-container>
    </div>
</template>

<script lang="ts">
import moment from 'moment'
import { Component, Vue, Watch } from 'nuxt-property-decorator'
import AlertBar from '@/components/content/AlertBar.vue'
import { NewsItem } from '@/utilities/types'

@Component({
    components: {
        AlertBar
    }
})
export default class NewsArticle extends Vue {
    private newsItems: NewsItem[] = []
    private maxNewsItems!: number // Set in Async Data
    private maxNewsBodyLength: number = 300
    private start: number = 0
    private page: number = 1
    private totalNewsItems!: number // Set in Async Data

    @Watch('page')
    onPageChanged () {
        this.getNewsItems()
    }

    private head () {
        return {
            title: 'BioGRID News Articles'
        }
    }

    get paginationSize () {
        if (this.totalNewsItems !== undefined && this.totalNewsItems > 0) {
            let paginationSize = Math.floor(this.totalNewsItems / this.maxNewsItems)
            if ((this.totalNewsItems % this.maxNewsItems) !== 0) {
                paginationSize += 1
            }
            return paginationSize
        }

        return 0
    }

    get startArticleNumber () {
        return ((this.page - 1) * this.maxNewsItems) + 1
    }

    private generateNewsItemLink (item: NewsItem) {
        if (item !== undefined) {
            return '/news/' + item.news_id
        }

        return ''
    }

    private generateNewsItemContent (item: NewsItem) {
        if (item !== undefined) {
            // Strip HTML tags from summary body
            const body = item.body.replace(/(<([^>]+)>)/ig, '')
            return body.slice(0, this.maxNewsBodyLength) + ' ...'
        }

        return ''
    }

    private generateNewsItemDetails (item: NewsItem) {
        if (item !== undefined) {
            const date = moment(item.added_date, moment.ISO_8601)
            return 'Posted: ' + date.format('MMMM Do, YYYY - hh:mm a')
        }

        return ''
    }

    private generateNewsItemImage (item: NewsItem) {
        if (item !== undefined) {
            return process.env.BASE_URL + '/images/news/' + item.image
        }

        return ''
    }

    private async getNewsItems () {
        const offset = (this.page - 1) * this.maxNewsItems
        try {
            const news = await this.$pubapi.newsitems({ count: this.maxNewsItems, offset })
            this.newsItems = news.data.data
        } catch (error) {
            this.newsItems = []
        }
    }

    private async asyncData (context: any) {
        const maxNewsItems = 20
        try {
            const newsCount = await context.$pubapi.newsitems({ countonly: 1 })
            const news = await context.$pubapi.newsitems({ count: maxNewsItems, offset: 0 })
            return { newsItems: news.data.data, maxNewsItems, totalNewsItems: newsCount.data.data }
        } catch (error) {
            return { newsItems: undefined, maxNewsItems, totalNewsItems: 0 }
        }
    }
}
</script>

<style lang="scss" scoped>
    h1 {
        line-height: 40px;
    }
</style>
