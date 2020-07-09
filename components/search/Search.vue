<template>
    <div class="biogrid-search align-center">
        <v-row no-gutters>
            <v-col
                lg="11"
                md="9"
                sm="9"
                cols="9"
                offset-lg="0"
                offset-md="1"
                offset-sm="1"
                offset="1"
            >
                <v-sheet
                    color="white"
                    class="pa-2 black--text rounded-l-lg"
                    elevation="8"
                >
                    <v-row no-gutters>
                        <v-col
                            lg="8"
                            md="8"
                            sm="8"
                            cols="7"
                        >
                            <v-text-field
                                :autofocus="true"
                                solo
                                flat
                                light
                                color="white"
                                placeholder="What are you looking for?"
                                hide-details="auto"
                            />
                        </v-col>
                        <v-col
                            lg="4"
                            md="4"
                            sm="4"
                            cols="5"
                            class="black--text"
                        >
                            <v-select
                                v-model="searchType"
                                outlined
                                dense
                                light
                                hide-details="auto"
                                prepend-icon="mdi-arrow-right"
                                class="mt-1 searchTypeSelect"
                                :items="searchOptions"
                            />
                        </v-col>
                    </v-row>
                </v-sheet>
            </v-col>
            <v-col
                lg="1"
                md="1"
                sm="1"
                cols="1"
            >
                <v-btn
                    color="accent"
                    width="100%"
                    height="100%"
                    class="rounded-0 rounded-r-lg rounded-r-md rounded-r-sm"
                >
                    <v-icon x-large>
                        mdi-chevron-double-right
                    </v-icon>
                </v-btn>
            </v-col>
        </v-row>
        <v-row
            v-if="showOrganismSelect()"
            no-gutters
            class="mt-2"
        >
            <v-col
                lg="1"
                md="1"
                sm="1"
                offset-sm="2"
                offset-md="2"
                offset-lg="2"
                class="hidden-xs-only"
            >
                <v-icon
                    x-large
                    color="warning"
                    class="mt-1"
                >
                    mdi-subdirectory-arrow-right
                </v-icon>
            </v-col>
            <v-col
                lg="6"
                md="6"
                sm="6"
                offset-sm="0"
                offset-md="0"
                offset-lg="0"
                cols="8"
                offset="1"
            >
                <v-autocomplete
                    v-model="selectedOrganisms"
                    solo
                    light
                    hide-details="auto"
                    multiple
                    deletable-chips
                    chips
                    small-chips
                    class="mt-1 searchTypeSelect"
                    :items="organismSelectOptions"
                />
            </v-col>
        </v-row>
    </div>
</template>

<script lang="ts">
import { Component, Vue, State, Watch } from 'nuxt-property-decorator'
import { SelectOption, OrganismMap } from '@/utilities/interfaces.ts'

@Component
export default class Search extends Vue {
    @State private organisms!: OrganismMap;
    private searchType: string = 'pg';
    private selectedOrganisms: string[] = ['all'];
    private searchOptions: SelectOption[] = [
        { value: 'pg', text: 'Proteins & Genes' },
        { value: 'chem', text: 'Chemical Compounds' },
        { value: 'pub', text: 'Publications' },
        { value: 'go', text: 'GO Terms' }
    ];

    @Watch('selectedOrganisms')
    onSelectedOrganismsChanged () {
        if (this.selectedOrganisms.length <= 0) {
            this.selectedOrganisms = ['all']
        } else if (this.selectedOrganisms.length > 1) {
            const index = this.selectedOrganisms.indexOf('all')
            if (index !== -1) {
                this.selectedOrganisms.splice(index, 1)
            }
        }
    }

    private showOrganismSelect () {
        if (this.searchType === 'pg' || this.searchType === 'go') {
            return true
        }

        return false
    }

    private organismCompare (a: SelectOption, b: SelectOption) {
        if (a.text === undefined || b.text === undefined) { return -1 }
        if (a.text < b.text) { return -1 }
        if (a.text > b.text) { return 1 }
        return 0
    }

    get organismSelectOptions () {
        const popularOptions: SelectOption[] = []
        const options: SelectOption[] = []

        for (const [organismID, organismInfo] of Object.entries(this.organisms)) {
            if (organismInfo.deprecated === 0) {
                let text = organismInfo.officialName
                let chipText = organismInfo.abbreviation
                if (organismInfo.strain !== undefined && organismInfo.strain !== '') {
                    text += ' (' + organismInfo.strain + ')'
                    chipText += ' (' + organismInfo.strain + ')'
                }

                if (organismInfo.commonName !== organismInfo.officialName) {
                    text += ' [' + organismInfo.commonName + ']'
                }

                options.push({ value: organismID, text, chipText })
                if (organismInfo.popular) {
                    popularOptions.push({ value: organismID, text, chipText })
                }
            }
        }

        popularOptions.sort(this.organismCompare)
        options.sort(this.organismCompare)

        const allOrgs: SelectOption[] = [{ value: 'all', text: 'All Organisms', chipText: 'All Organisms' }, { header: 'Popular Organisms (Alphabetical)' }]
        const allOptsHeader: SelectOption[] = [{ header: 'All Organisms (Alphabetical)' }]
        const sortedOptions = allOrgs.concat(popularOptions, allOptsHeader, options)
        return sortedOptions
    }
}
</script>

<style lang="scss" scoped>
    ::v-deep .v-select__selection {
        line-height: 22px !important;
    }
    .testMe {
        background-color: salmon;
        color: orange;
    }
</style>
