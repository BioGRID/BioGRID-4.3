<template>
    <div class="biogrid-news-summary">
        <v-card>
            <v-img
                :src="summaryImage"
            />
            <v-card-title>
                {{ summaryTitle }}
            </v-card-title>
            <v-card-subtitle>
                {{ summaryDetails }}
            </v-card-subtitle>
            <v-card-text>
                {{ summaryBody }}
            </v-card-text>
            <v-card-actions>
              <v-spacer /></v-spacer>

              <v-btn
                block
                color="primary"
              >
                <v-icon>mdi-chevron-down</v-icon>
                Read More
              </v-btn>
            </v-card-actions>
        </v-card>
    </div>
</template>

<script lang="ts">
import moment from 'moment'
import { Component, Vue, Prop } from 'nuxt-property-decorator'
import { NewsItem } from '@/utilities/types'

@Component
export default class NewsSummary extends Vue {
    @Prop() private newsItem!: NewsItem;
    @Prop() private maxBodyLength!: number;

    get summaryTitle () {
        if (this.newsItem !== undefined) {
            return this.newsItem.title
        }

        return ''
    }

    get summaryImage () {
        if (this.newsItem !== undefined) {
            return 'images/news/' + this.newsItem.image
        }

        return ''
    }

    get summaryBody () {
        if (this.newsItem !== undefined) {
            return this.newsItem.body.slice(0, this.maxBodyLength) + ' ...'
        }

        return ''
    }

    get summaryDetails () {
        if (this.newsItem !== undefined) {
            const date = moment(this.newsItem.added_date, moment.ISO_8601)
            console.log(date)
            return date.format('MMMM Do, YYYY - hh:mm a')
        }

        return ''
    }
}
</script>

<style lang="scss" scoped>
    ::v-deep .v-card__title {
        word-break: normal; /* maybe !important  */
        line-height: 1.6rem;
    }
</style>
