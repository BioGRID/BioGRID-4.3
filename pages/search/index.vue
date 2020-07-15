<template>
    <v-container class="biogrid-search-page" fluid>
        <v-card
            class="pa-3"
        >
            <template v-if="!isPending">
                <v-card-title><h2>Search Results</h2></v-card-title>
                <v-card-subtitle class="ml-2">
                    Your search for XXX returned
                </v-card-subtitle>
            </template>
            <template v-if="isPending">
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
                            <v-chip
                                color="primary"
                                text-color="white"
                                class="font-weight-bold"
                            >
                                <v-icon left>
                                    mdi-magnify
                                </v-icon>
                                {{ this.$route.query.query }}
                            </v-chip>
                            <v-chip
                                color="secondary"
                                text-color="white"
                                class="font-weight-bold"
                            >
                                <v-icon left>
                                    mdi-star
                                </v-icon>
                                {{ queryType }}
                            </v-chip>
                            <v-chip
                                v-if="organismList.length > 0"
                                color="warning"
                                text-color="white"
                                class="font-weight-bold"
                            >
                                <v-icon left>
                                    mdi-ladybug
                                </v-icon>
                                {{ buildOrganismString() }}
                            </v-chip>
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
            </template>
        </v-card>
    </v-container>
</template>

<script lang="ts">
import { Component, Vue, State } from 'nuxt-property-decorator'
import { SelectOption, OrganismMap } from '@/utilities/types'

@Component
export default class SearchPage extends Vue {
    @State private searchOptions!: SelectOption[];
    @State private organisms!: OrganismMap;
    private title: string = process.env.SHORT_TITLE || 'BioGRID';
    private organismList: string[] = [];
    private isPending: boolean = true;

    private created () {
        if (!this.isValidSearch()) {
            this.loadOrganismList()
        } else {
            this.$nuxt.error({ statusCode: 404, message: 'The search parameters entered are invalid' })
        }
    }

    private loadOrganismList () {
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
                    }
                }
            }
        }
    }

    private buildOrganismString () {
        return this.organismList.join(', ')
    }

    private isValidSearch () {
        if (this.$route.query.query === null || this.$route.query.query === undefined || this.$route.query.query === '') {
            return false
        }

        if (this.$route.query.type === null || this.$route.query.type === undefined || this.$route.query.type === '') {
            return false
        }

        let foundMatch = false
        let searchOption: SelectOption
        for (searchOption of Object.values(this.searchOptions)) {
            if (searchOption.value === this.$route.query.type) {
                foundMatch = true
                break
            }
        }

        if (!foundMatch) {
            return false
        }

        return true
    }

    get queryType () {
        if (this.$route.query.type !== null) {
            if (this.$route.query.type === 'pg') {
                return 'Proteins & Genes'
            } else if (this.$route.query.type === 'go') {
                return 'Proteins & Genes by Gene Ontology'
            } else if (this.$route.query.type === 'chem') {
                return 'Chemical Compounds'
            } else if (this.$route.query.type === 'pub') {
                return 'Publications'
            }
        }

        return 'Invalid'
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
