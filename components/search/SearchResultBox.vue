<template>
    <div class="biogrid-search-result-box align-center">
        <v-card
            class="black--text mt-2 pa-0 rounded-0 rounded-r-xl searchResultBox"
            nuxt
            :to="searchResultLink"
        >
            <div v-if="searchResultType.length > 0" class="caption rounded-0 font-weight-bold pa-1 ma-0 mt-2 mb-2 pr-3 organismBanner rounded-r-xl grey lighten-2">
                <span class="ml-3">
                    {{ searchResultType }}
                </span>
            </div>
            <v-card-title class="pb-3 mt-0 pt-0 mb-1 font-weight-bold searchResultBoxTitle">
                {{ searchResultTitle }}
                <template v-if="searchType === 'chem' && formattedMolecularFormula.length > 0">
                    (
                    <span class="pb-0 pt-0 green--text text-darken-3 font-weight-bold">
                        <span
                            v-for="(component,i) in formattedMolecularFormula"
                            :key="i"
                        >
                            <span v-if="component.type === 'element'">{{ component.value }}</span><span v-if="component.type === 'atom'"><sub>{{ component.value }}</sub></span>
                        </span>
                    </span>
                    )
                </template>
            </v-card-title>
            <v-card-subtitle class="pb-0 light-blue--text text-darken-3 font-weight-bold">
                {{ searchResultSubtitle }}
            </v-card-subtitle>
            <v-card-text class="pb-0">
                <span v-if="!readMoreActivated && searchResultBody.length >= maxBodyLength">
                    {{ searchResultBody.slice(0, maxBodyLength) }} ...
                </span>
                <span v-if="readMoreActivated || searchResultBody.length < maxBodyLength">
                    {{ searchResultBody }}
                </span>
                <a v-if="searchResultBody.length > maxBodyLength" title="Click to Toggle Description" @click.prevent="readMoreActivated = !readMoreActivated">
                    <v-btn x-small text color="secondary" dark>
                        <span v-if="readMoreActivated">[Less]</span>
                        <span v-if="!readMoreActivated">[More]</span>
                    </v-btn>
                </a>
            </v-card-text>
            <div class="caption ml-4 grey--text">
                {{ searchResultFooter }}
            </div>
            <v-card-actions class="ml-1">
                <v-btn
                    v-for="(searchAction, i) in searchResultActions"
                    :key="i"
                    x-small
                    :color="searchAction.color"
                    :dark="searchAction.dark"
                    depressed
                    class="font-weight-bold"
                >
                    <v-icon
                        x-small
                    >
                        {{ searchAction.icon }}
                    </v-icon>
                    {{ searchAction.text }} ({{ searchAction.count }})
                </v-btn>
            </v-card-actions>
        </v-card>
    </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'nuxt-property-decorator'
import { formatMolecularFormula } from '@/utilities/formatting'
// import { PGroupSearchResult, DatasetSearchResult } from '@/models/search/pgroup'

@Component
export default class SearchResultBox extends Vue {
    @Prop({ type: Object, default: null }) private searchResult!: any
    @Prop({ type: String, default: 'pg' }) private searchType!: string
    private readMoreActivated: boolean = false;
    private maxBodyLength: number = 400;

    get searchResultTitle () {
        if (this.searchType === 'pg') {
            return this.generatePGroupTitle()
        } else if (this.searchType === 'pub') {
            return this.searchResult.title
        } else if (this.searchType === 'chem') {
            return this.searchResult.name
        }

        return ''
    }

    get searchResultBody () {
        if (this.searchType === 'pg') {
            if (this.searchResult.description.length > 0) {
                return this.searchResult.description
            }
        } else if (this.searchType === 'pub') {
            if (this.searchResult.abstract !== undefined && this.searchResult.abstract.length > 0) {
                return this.searchResult.abstract
            }
        } else if (this.searchType === 'chem') {
            if (this.searchResult.description !== undefined && this.searchResult.description.length > 0) {
                return this.searchResult.description
            }
        }

        return ''
    }

    get searchResultSubtitle () {
        if (this.searchType === 'pg') {
            return this.generatePGroupSynonyms()
        } else if (this.searchType === 'pub') {
            return this.generateDatasetAuthors()
        } else if (this.searchType === 'chem') {
            return this.generateChemicalSynonyms()
        }

        return ''
    }

    get searchResultType () {
        if (this.searchType === 'pg') {
            return this.generateOrganismAbbreviation()
        } else if (this.searchType === 'pub') {
            if (this.searchResult.journal !== undefined && this.searchResult.journal.length > 0) {
                return this.searchResult.journal
            }
        } else if (this.searchType === 'chem') {
            return this.searchResult.chemical_type
        }

        return ''
    }

    get searchResultFooter () {
        if (this.searchType === 'pg') {
            return ''
        } else if (this.searchType === 'pub') {
            return this.generateDatasetFooter()
        } else if (this.searchType === 'chem') {
            return this.generateChemicalFooter()
        }

        return ''
    }

    get searchResultActions () {
        if (this.searchType === 'pg') {
            return this.generatePGroupActions()
        } else if (this.searchType === 'pub') {
            return this.generatePGroupActions()
        } else if (this.searchType === 'chem') {
            return this.generatePGroupActions()
        }

        return []
    }

    get searchResultLink () {
        if (this.searchType === 'pg') {
            return '/protein/' + String(this.searchResult.pgroup_id)
        } else if (this.searchType === 'pub') {
            return '/publication/' + String(this.searchResult.dataset_id)
        } else if (this.searchType === 'pub') {
            return '/chemical/' + String(this.searchResult.chemical_id)
        }

        return ''
    }

    get formattedMolecularFormula () {
        return formatMolecularFormula(this.searchResult.formula)
    }

    private generatePGroupTitle () {
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

    private generatePGroupSynonyms () {
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

    private generatePGroupActions () {
        const actions = []
        actions.push({
            icon: 'mdi-graph',
            text: 'interactions',
            count: 33,
            color: 'yellow lighten-3',
            dark: false
        })
        actions.push({
            icon: 'mdi-cube-unfolded',
            text: 'complexes',
            count: 16,
            color: 'purple lighten-4',
            dark: false
        })
        actions.push({
            icon: 'mdi-map-marker',
            text: 'post-translational modifications',
            count: 117,
            color: 'orange lighten-3',
            dark: false
        })
        actions.push({
            icon: 'mdi-flask-outline',
            text: 'chemical interactions',
            count: 81,
            color: 'green lighten-3',
            dark: false
        })
        return actions
    }

    private generateOrganismAbbreviation () {
        let organismAbbr = this.searchResult.organism.abbreviation
        if (this.searchResult.organism.strain !== '') {
            organismAbbr += ' (' + this.searchResult.organism.strain + ')'
        }

        return organismAbbr
    }

    private generateDatasetAuthors () {
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

    private generateDatasetFooter () {
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

    private generateChemicalSynonyms () {
        const names = []
        if (this.searchResult !== undefined) {
            if (this.searchResult.synonyms !== undefined) {
                for (const synonym of this.searchResult.synonyms) {
                    names.push(synonym)
                }
            }
        }

        return names.join(' / ')
    }

    private generateChemicalFooter () {
        const footer: string[] = []

        if (this.searchResult.inchikey !== undefined && this.searchResult.inchikey.length > 0) {
            footer.push('InChi Key: ' + this.searchResult.inchikey)
        }

        const ATC: string[] = []
        const CAS: string[] = []
        if (this.searchResult.dbxrefs !== undefined) {
            if (this.searchResult.dbxrefs.ATC !== undefined && this.searchResult.dbxrefs.ATC.length > 0) {
                for (const atcCode of this.searchResult.dbxrefs.ATC) {
                    ATC.push(atcCode)
                }
            } if (this.searchResult.dbxrefs.CAS !== undefined && this.searchResult.dbxrefs.CAS.length > 0) {
                for (const casCode of this.searchResult.dbxrefs.CAS) {
                    CAS.push(casCode)
                }
            }
        }

        if (ATC.length > 0) {
            footer.push('ATC: ' + ATC.join('|'))
        }

        if (CAS.length > 0) {
            footer.push('CAS: ' + CAS.join('|'))
        }

        return footer.join(' / ')
    }
}
</script>

<style lang="scss" scoped>
    .searchResultBox:hover {
        background-color: #EEE !important;
    }
    .searchResultBoxTitle {
        line-height: 25px;
    }
    .organismBanner {
        display: inline-block;
    }
</style>
