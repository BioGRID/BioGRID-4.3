<template>
    <div class="biogrid-pgroup-result align-center">
        <SearchResultBox
            :result-type="resultType"
            :result-link="resultLink"
            :result-title="resultTitle"
            :result-subtitle="resultSubtitle"
            :result-body="resultBody"
            :result-footer="resultFooter"
            :stats="stats"
        />
    </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'nuxt-property-decorator'
import SearchResultBox from '@/components/search/SearchResultBox.vue'

@Component({
    components: {
        SearchResultBox
    }
})
export default class PGroupResult extends Vue {
    @Prop({ type: Object, default: null }) private searchResult!: any
    @Prop({ type: String, default: 'pg' }) private searchType!: string
    private readMoreActivated: boolean = false;
    private maxBodyLength: number = 400;

    get resultTitle () {
        return this.searchResult.title
    }

    get resultBody () {
        if (this.searchResult.abstract !== undefined && this.searchResult.abstract.length > 0) {
            return this.searchResult.abstract
        }
        return ''
    }

    get resultSubtitle () {
        if (this.searchResult.authors !== undefined && this.searchResult.authors.length > 0) {
            if (this.searchResult.authors.length <= 30) {
                return this.searchResult.authors.join(', ')
            } else {
                return this.searchResult.authors.slice(0, 30).join(', ') + ', ... et al.'
            }
        }
        if (this.searchResult.collectives !== undefined && this.searchResult.collectives.length > 0) {
           return this.searchResult.collectives.join(', ')
        }
        return ''
    }

    get resultType () {
        if (this.searchResult.journal !== undefined && this.searchResult.journal.length > 0) {
            return this.searchResult.journal
        }

        return 'unknown journal'
    }

    get resultFooter () {
        const footer = []
        if (this.searchResult.pub_date.length > 0) {
            footer.push(this.searchResult.pub_date)
        }
        if (this.searchResult.volume.length > 0) {
            footer.push('Vol. ' + this.searchResult.volume)
        }
        if (this.searchResult.issue.length > 0) {
            footer.push('Iss. ' + this.searchResult.issue)
        }
        if (this.searchResult.pagination.length > 0) {
            footer.push('Pg. ' + this.searchResult.pagination)
        }
        if (this.searchResult.doi.length > 0) {
            footer.push('DOI:' + this.searchResult.doi)
        }
        if (this.searchResult.pmc_id.length > 0) {
            footer.push(this.searchResult.pmc_id)
        }
        if (this.searchResult.source_type === 'pubmed') {
            footer.push('PUBMED:' + this.searchResult.source_id)
        }
        return footer.join(' / ')
    }

    get stats () {
        return {
            interactions: 33,
            complexes: 18,
            ptms: 84,
            chemicals: 41
        }
    }

    get resultLink () {
        return '/publication/' + String(this.searchResult.dataset_id)
    }
}
</script>

<style lang="scss" scoped>
</style>
