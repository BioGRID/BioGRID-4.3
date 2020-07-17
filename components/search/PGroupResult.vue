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
import { formatOrganismAbbreviation } from '@/utilities/formatting'
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
        const names = []
        if (this.searchResult !== undefined) {
            if (this.searchResult.dbxrefs !== undefined) {
                if (this.searchResult.dbxrefs['SWISS-PROT'] !== null && this.searchResult.dbxrefs['SWISS-PROT'].length > 0) {
                    names.push(this.searchResult.dbxrefs['SWISS-PROT'][0])
                } else if (this.searchResult.dbxrefs.TREMBL !== null && this.searchResult.dbxrefs.TREMBL.length > 0) {
                    names.push(this.searchResult.dbxrefs.TREMBL[0])
                }
            }

            if (this.searchResult.official_symbol !== undefined) {
                for (const officialSymbol of this.searchResult.official_symbol) {
                    names.push(officialSymbol)
                }
            }
        }

        return names.join(' / ')
    }

    get resultBody () {
        if (this.searchResult.description.length > 0) {
            return this.searchResult.description
        }
        return ''
    }

    get resultSubtitle () {
        const names = []
        if (this.searchResult !== undefined) {
            if (this.searchResult.ordered_locus !== undefined) {
                for (const orderedLocus of this.searchResult.ordered_locus) {
                    names.push(orderedLocus)
                }
            }

            if (this.searchResult.orf !== undefined) {
                for (const orf of this.searchResult.orf) {
                    names.push(orf)
                }
            }

            if (this.searchResult.synonyms !== undefined) {
                for (const synonyms of this.searchResult.synonyms) {
                    names.push(synonyms)
                }
            }
        }

        return names.join(' / ')
    }

    get resultType () {
        return formatOrganismAbbreviation(this.searchResult.organism)
    }

    get resultFooter () {
        return ''
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
        return '/protein/' + String(this.searchResult.pgroup_id)
    }
}
</script>

<style lang="scss" scoped>
</style>
