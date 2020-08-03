<template>
    <div class="biogrid-search-page">
        <AlertBar />
        <v-container fluid>
            <template v-if="isError">
                <v-alert type="error">
                    An error has occurred while attempting to perform your search request. This is hopefully just temporary, so please try your search again ... If the problem persists, please contact us at <a class="yellow--text" :href="'mailto:' + contactEmail" title="Contact Us By Email">{{ contactEmail }}</a>. We apologize for the inconvenience.
                </v-alert>
            </template>
            <template v-if="!isPending && !isError">
                <v-card
                    class="pa-2 rounded-0 rounded-r-xl"
                >
                    <h1 class="font-weight-bold">
                        Search Results
                        <v-icon x-large color="accent">
                            mdi-magnify
                        </v-icon>
                    </h1>
                    <div class="ml-2">
                        Your search returned
                        <span class="font-weight-bold red--text text--darken-3">{{ totalHits }}</span> total results.
                        Currently showing results <span class="font-weight-bold red--text text--darken-3">{{ startRange }}</span>
                        through <span class="font-weight-bold red--text text--darken-3">{{ endRange }}</span> below ...
                    </div>
                    <div class="ml-2 mt-3 pb-2">
                        <SearchChips :search-terms="searchTerms" :search-type="searchType" :organism-string="organismString" />
                    </div>
                </v-card>
                <div v-if="searchResults.length <= 0">
                    <v-progress-circular
                        :size="70"
                        :width="7"
                        color="accent"
                        class="ma-2"
                        indeterminate
                    />
                </div>
                <template v-if="searchType === 'chem'">
                    <ChemicalResult
                        v-for="(result,i) in searchResults"
                        :key="i"
                        :search-result="result"
                        :search-type="searchType"
                    />
                </template>
                <template v-if="searchType === 'pg' || searchType === 'go'">
                    <PGroupResult
                        v-for="(result,i) in searchResults"
                        :key="i"
                        :search-result="result"
                        :search-type="searchType"
                    />
                </template>
                <template v-if="searchType === 'pub'">
                    <DatasetResult
                        v-for="(result,i) in searchResults"
                        :key="i"
                        :search-result="result"
                        :search-type="searchType"
                    />
                </template>
                <div class="mt-2">
                    <v-pagination
                        v-model="page"
                        color="accent"
                        :length="paginationSize"
                        :total-visible="7"
                    />
                </div>
            </template>
            <template v-if="isPending && !isError">
                <v-card
                    class="pa-2 rounded-0 rounded-r-xl"
                >
                    <v-row no-gutters>
                        <v-col
                            lg="11"
                            md="11"
                            sm="9"
                            cols="9"
                        >
                            <h1 class="font-weight-bold">
                                Searching {{ title }} Records ...
                                <v-icon x-large color="accent">
                                    mdi-magnify
                                </v-icon>
                            </h1>
                            <div class="ml-2">
                                Please stand by while we search for optimal matches ...
                            </div>
                            <div class="mt-2 ml-12">
                                <SearchChips :search-terms="searchTerms" :search-type="searchType" :organism-string="organismString" />
                            </div>
                        </v-col>
                        <v-col
                            lg="1"
                            md="1"
                            sm="3"
                            cols="3"
                        >
                            <v-progress-circular
                                :size="70"
                                :width="7"
                                color="accent"
                                class="float-right ma-2"
                                indeterminate
                            />
                        </v-col>
                    </v-row>
                </v-card>
            </template>
        </v-container>
    </div>
</template>

<script lang="ts">
import { Component, Vue, State, Watch } from 'nuxt-property-decorator'
import { SelectOption, OrganismMap, SearchRequest } from '@/utilities/types'
import ChemicalResult from '@/components/search/ChemicalResult.vue'
import PGroupResult from '@/components/search/PGroupResult.vue'
import AlertBar from '@/components/content/AlertBar.vue'

@Component({
    components: {
        ChemicalResult,
        PGroupResult,
        AlertBar
    }
})
export default class SearchPage extends Vue {
    @State private searchOptions!: SelectOption[];
    @State private organisms!: OrganismMap;
    @State private preference!: string;
    private title: string = process.env.SHORT_TITLE || 'BioGRID';
    private contactEmail: string = process.env.CONTACT_EMAIL || 'BioGRID';
    private organismList: string[] = [];
    private isPending: boolean = true;
    private searchTerms: string = '';
    private searchType: string = 'pg';
    private organismIDs: number[] = []
    private organismString: string = '';
    private searchResults = []
    private page: number = 1
    private size: number = 15
    private totalHits: number = 0;
    private isError: boolean = false;

    private created () {
        this.searchTerms = this.fetchProcessedSearchTerms()
        this.searchType = this.fetchProcessedSearchType()
        this.loadOrganismListAndIDs()

        if (this.isValidSearch()) {
            this.executeSearch()
        } else {
            this.$nuxt.error({ statusCode: 404, message: 'The search parameters entered are invalid' })
        }
    }

    @Watch('page')
    onPageChanged () {
        this.executeSearch()
    }

    get paginationSize () {
        let paginationSize = Math.floor(this.totalHits / this.size)
        if ((this.totalHits % this.size) !== 0) {
            paginationSize += 1
        }
        return paginationSize
    }

    private async executeSearch () {
        this.searchResults = []
        const req: SearchRequest = {
            search_terms: this.searchTerms,
            search_type: this.searchType,
            from: (this.page - 1) * this.size,
            size: this.size,
            preference: this.preference
        }

        this.$store.dispatch('updateLastSearchType', { value: this.searchType })

        if (req.search_type === 'pg' || req.search_type === 'go') {
            if (this.organismIDs.length > 0) {
                req.organisms = this.organismIDs
            }
        }

        try {
            const resp = await this.$pubapi.participants(req)
            if (resp.status !== 200) {
                this.$nuxt.error({ statusCode: 500, message: resp.statusText })
            } else {
                const results = resp.data
                if (results.returned_hits === undefined || results.returned_hits <= 0) {
                    this.$nuxt.$router.push('/help/search/noresults')
                } else {
                    this.searchResults = results.data
                    this.totalHits = results.total_hits
                    this.isPending = false
                }
            }
        } catch (error) {
            this.isError = true
        }
    }

    private fetchProcessedSearchTerms () {
        let searchTerms: string | null = ''
        if (this.$route.query.query !== null && this.$route.query.query !== undefined && this.$route.query.query) {
            if (Array.isArray(this.$route.query.query)) {
                searchTerms = this.$route.query.query[0]
            } else {
                searchTerms = this.$route.query.query
            }
        }

        if (searchTerms !== null) {
            return searchTerms
        }

        return ''
    }

    private fetchProcessedSearchType () {
        let searchType: string | null = 'pg'
        if (this.$route.query.type !== null && this.$route.query.type !== undefined && this.$route.query.type) {
            if (Array.isArray(this.$route.query.type)) {
                searchType = this.$route.query.type[0]
            } else {
                searchType = this.$route.query.type
            }
        }

        if (searchType !== null) {
            return searchType
        }

        return 'pg'
    }

    private loadOrganismListAndIDs () {
        this.organismList = []
        if (this.$route.query.organisms !== null && this.$route.query.organisms !== undefined) {
            let organismSet = this.$route.query.organisms
            if (!Array.isArray(organismSet)) {
                organismSet = [organismSet]
            }
            for (const organismID of organismSet) {
                if (organismID !== null && organismID !== undefined) {
                    const orgInfo = this.organisms[Number(organismID)]
                    if (orgInfo !== undefined) {
                        if (orgInfo.strain !== '') {
                            this.organismList.push(orgInfo.abbreviation + ' (' + orgInfo.strain + ')')
                        } else {
                            this.organismList.push(orgInfo.abbreviation)
                        }
                        this.organismIDs.push(Number(organismID))
                    }
                }
            }
        }

        this.buildOrganismString()
    }

    private buildOrganismString () {
        this.organismString = this.organismList.join(', ')
    }

    private isValidSearch () {
        if (this.searchTerms === '') {
            return false
        }

        if (this.searchType === '') {
            return false
        }

        let foundMatch = false
        let searchOption: SelectOption
        for (searchOption of Object.values(this.searchOptions)) {
            if (searchOption.value === this.searchType) {
                foundMatch = true
                break
            }
        }

        if (!foundMatch) {
            return false
        }

        return true
    }

    get queryTerm () {
        if (this.$route.query.query !== null) {
            return this.$route.query.query
        }
    }

    get startRange () {
        const start: number = (this.page - 1) * this.size
        return start + 1
    }

    get endRange () {
        const end: number = (this.page) * this.size
        if (end > this.totalHits) {
            return this.totalHits
        }

        return end
    }
}
</script>

<style lang="scss" scoped>
</style>
