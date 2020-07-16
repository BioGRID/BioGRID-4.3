<template>
    <v-container class="biogrid-search-page" fluid>
        <template v-if="!isPending">
            <v-card
                class="pa-2"
            >
                <h1 class="font-weight-bold">
                    Search Results
                    <v-icon x-large color="accent">
                        mdi-magnify
                    </v-icon>
                </h1>
                <div class="ml-2">
                    Your search for XXX returned
                </div>
                <div class="ml-2 mt-3 pb-2">
                    <SearchChips :search-terms="searchTerms" :search-type="searchType" :organism-string="organismString" />
                </div>
            </v-card>
            <SearchResultBox
                v-for="(result,i) in searchResults"
                :key="i"
            />
        </template>
        <template v-if="isPending">
            <v-card
                class="pa-3"
            >
                <v-row no-gutters>
                    <v-col
                        lg="11"
                        md="11"
                        sm="9"
                        cols="9"
                    >
                        <h1 class="font-weight-bold">
                            <v-icon x-large color="accent">
                                mdi-magnify
                            </v-icon>
                            Searching {{ title }} Records ...
                        </h1>
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
</template>

<script lang="ts">
import { Component, Vue, State } from 'nuxt-property-decorator'
import { SelectOption, OrganismMap, SearchRequest } from '@/utilities/types'
import { API_SEARCH } from '@/models/search/pgroup'
import SearchResultBox from '@/components/search/SearchResultBox.vue'

@Component({
    components: {
        SearchResultBox
    }
})
export default class SearchPage extends Vue {
    @State private searchOptions!: SelectOption[];
    @State private organisms!: OrganismMap;
    private title: string = process.env.SHORT_TITLE || 'BioGRID';
    private organismList: string[] = [];
    private isPending: boolean = true;
    private searchTerms: string = '';
    private searchType: string = 'pg';
    private organismIDs: number[] = []
    private organismString: string = '';
    private searchResults = []
    private start: number = 0
    private size: number = 50
    private maxResults: number = 0;

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

    private async executeSearch () {
        const req: SearchRequest = {
            search_terms: this.searchTerms,
            search_type: this.searchType,
            from: this.start,
            size: this.size
        }

        if (req.search_type === 'pg' || req.search_type === 'go') {
            if (this.organismIDs.length > 0) {
                req.organisms = this.organismIDs
            }
        }

        const results = await API_SEARCH(req)
        this.searchResults = results.data
        this.isPending = false
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
        if (this.$route.query.organisms !== null && this.$route.query.organisms !== undefined && this.$route.query.organisms.length > 0) {
            for (const organismID of this.$route.query.organisms) {
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
}
</script>

<style lang="scss" scoped>
</style>
