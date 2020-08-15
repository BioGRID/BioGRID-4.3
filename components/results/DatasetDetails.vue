<template>
    <div class="biogrid-dataset-details">
        <v-card
            tile
            class="pa-4"
            :color="color"
            :dark="dark"
        >
            <template v-if="dataset !== undefined">
                <v-icon
                    color="warning"
                    title="Click to show/hide dataset details"
                    class="float-right"
                    @click="toggleDatasetCollapsed()"
                >
                    mdi-arrow-split-horizontal
                </v-icon>

                <div class="overline">
                    Publication
                </div>
                <div class="headline font-weight-bold">
                    {{ dataset.title }}
                </div>
                <p class="body-2 mb-0 mt-1 font-weight-regular">
                    {{ pubDetails }}
                    <template v-if="pubLinks.length > 0">
                        <span
                            v-for="(link, i) in pubLinks"
                            :key="i"
                        >
                            / {{ link.prefix }}
                            <a
                                :target="link.target"
                                :title="link.title"
                                :href="link.to"
                                class="plainLink font-weight-bold"
                            >
                                {{ link.text }}
                            </a>
                        </span>
                    </template>
                </p>
                <div v-if="datasetAuthors.length > 0 && !datasetCollapsed" class="mb-3">
                    <p class="pt-3 mb-0 subtitle-1 light-blue--text text-darken-3 font-weight-bold datasetAuthors">
                        {{ datasetAuthors }}
                    </p>
                    <v-btn
                        outlined
                        x-small
                        color="primary"
                        class="mt-2"
                        @click="showAffiliations = !showAffiliations"
                    >
                        {{ showAffiliations ? 'Hide' : 'Show' }} Affiliations
                        <v-icon small>
                            {{ showAffiliations ? 'mdi-minus' : 'mdi-plus' }}
                        </v-icon>
                    </v-btn>
                    <div v-if="datasetAffiliations.length > 0 && showAffiliations && !datasetCollapsed" class="mb-3 mt-3">
                        <v-sheet
                            v-for="(affiliation,i) in datasetAffiliations"
                            :key="i"
                            dark
                            color="primary lighten-1"
                            class="pa-3 mt-1 body-2"
                        >
                            {{ affiliation }}
                        </v-sheet>
                    </div>
                </div>
                <div v-if="dataset.abstract.length > 0 && !datasetCollapsed" class="body-1 mb-2">
                    <v-sheet
                        color="grey lighten-3"
                        class="pa-3"
                    >
                        <span v-if="!readMoreActivated && dataset.abstract.length >= maxAbstractLength">
                            {{ dataset.abstract.slice(0, maxAbstractLength) }} ...
                        </span>
                        <span v-if="readMoreActivated || dataset.abstract.length < maxAbstractLength">
                            {{ dataset.abstract }}
                        </span>
                        <div v-if="dataset.abstract.length >= maxAbstractLength" title="Click to Toggle Full Abstract" class="text-center">
                            <v-btn
                                x-small
                                outlined
                                color="primary"
                                class="mt-3"
                                dark
                                @click.prevent="readMoreActivated = !readMoreActivated"
                            >
                                <span v-if="readMoreActivated">
                                    <v-icon>mdi-chevron-up</v-icon>
                                    Less
                                </span>
                                <span v-if="!readMoreActivated">
                                    <v-icon>mdi-chevron-down</v-icon>
                                    Show More
                                </span>
                            </v-btn>
                        </div>
                    </v-sheet>
                </div>

                <div>
                    <span v-if="keywords.length > 0 && !datasetCollapsed" class="subtitle-2 font-weight-medium mb-0">
                        <v-btn
                            outlined
                            x-small
                            color="quaternary"
                            @click="showKeywords = !showKeywords"
                        >
                            {{ showKeywords ? 'Hide' : 'Show' }} Keywords
                            <v-icon small>
                                {{ showKeywords ? 'mdi-minus' : 'mdi-plus' }}
                            </v-icon>
                        </v-btn>
                    </span>
                    <span v-if="meshTerms.length > 0 && !datasetCollapsed" class="subtitle-2 font-weight-medium mb-0">
                        <v-btn
                            outlined
                            x-small
                            color="tertiary darken-3"
                            @click="showMeshTerms = !showMeshTerms"
                        >
                            {{ showMeshTerms ? 'Hide' : 'Show' }} Mesh Terms
                            <v-icon small>
                                {{ showMeshTerms ? 'mdi-minus' : 'mdi-plus' }}
                            </v-icon>
                        </v-btn>
                    </span>
                    <div v-if="showKeywords && !datasetCollapsed" class="mb-3 mt-3">
                        <v-sheet
                            color="quaternary lighten-5"
                            class="pa-3 mt-1 body-2 text-lowercase"
                        >
                            {{ keywords }}
                        </v-sheet>
                    </div>
                    <div v-if="showMeshTerms && !datasetCollapsed" class="mb-3 mt-3">
                        <v-sheet
                            color="tertiary lighten-1"
                            class="pa-3 mt-1 body-2 text-lowercase"
                        >
                            {{ meshTerms }}
                        </v-sheet>
                    </div>
                </div>
            </template>
        </v-card>
    </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'nuxt-property-decorator'
import { Linkout, DatasetSearchResult } from '@/utilities/types'

@Component
export default class DatasetDetails extends Vue {
    @Prop() private dataset!: DatasetSearchResult
    @Prop({ type: String, default: '' }) private color!: string
    @Prop({ type: Boolean, default: false }) private dark!: boolean
    @Prop({ type: Boolean, default: false }) private collapsed!: boolean
    private datasetCollapsed: boolean = false
    private readMoreActivated: boolean = false
    private maxAbstractLength: number = 400
    private showAffiliations: boolean = false
    private showKeywords: boolean = false
    private showMeshTerms: boolean = false

    private created () {
        this.datasetCollapsed = this.collapsed
    }

    get datasetAuthors () {
        if (this.dataset.authors !== undefined && this.dataset.authors.length > 0) {
            return this.dataset.authors.join(', ')
        } else if (this.dataset.collectives !== undefined && this.dataset.collectives.length > 0) {
            return this.dataset.collectives.join(', ')
        }
        return ''
    }

    get keywords () {
        if (this.dataset.keywords !== undefined && this.dataset.keywords.length > 0) {
            return this.dataset.keywords.join(', ')
        }
        return ''
    }

    get meshTerms () {
        if (this.dataset.mesh_terms !== undefined && this.dataset.mesh_terms.length > 0) {
            return this.dataset.mesh_terms.join(', ')
        }
        return ''
    }

    get journal () {
        if (this.dataset.journal_abbreviation !== '') {
            return this.dataset.journal_abbreviation
        }
        return ''
    }

    get pubDate () {
        if (this.dataset.pub_date !== '') {
            return this.dataset.pub_date
        }
        return ''
    }

    get pubDetails () {
        const pubDetails: string[] = []
        if (this.dataset.journal_abbreviation !== '') {
            pubDetails.push(this.dataset.journal_abbreviation)
        }

        if (this.dataset.pub_date !== '') {
            pubDetails.push(this.dataset.pub_date)
        }

        if (this.dataset.volume !== undefined && this.dataset.volume !== '') {
            pubDetails.push('vol: ' + this.dataset.volume)
        }

        if (this.dataset.issue !== undefined && this.dataset.issue !== '') {
            pubDetails.push('iss: ' + this.dataset.issue)
        }

        if (this.dataset.pagination !== undefined && this.dataset.pagination !== '') {
            pubDetails.push('pg: ' + this.dataset.pagination)
        }

        return pubDetails.join(' / ')
    }

    get pubLinks () {
        const pubLinks: Linkout[] = []
        if (this.dataset.doi !== undefined && this.dataset.doi !== '') {
            pubLinks.push({
                to: 'https://doi.org/' + this.dataset.doi,
                target: '_BLANK',
                internal: false,
                title: 'View this Publication in Original DOI Linkout Source',
                text: this.dataset.doi,
                prefix: 'doi: '
            })
        }

        if (this.dataset.source_type === 'pubmed') {
            pubLinks.push({
                to: 'https://pubmed.ncbi.nlm.nih.gov/' + this.dataset.source_id,
                target: '_BLANK',
                internal: false,
                title: 'View this Publication in Pubmed',
                text: this.dataset.source_id,
                prefix: 'pubmed: '
            })
        }

        if (this.dataset.pmc_id !== undefined && this.dataset.pmc_id !== '') {
            pubLinks.push({
                to: 'https://www.ncbi.nlm.nih.gov/pmc/articles/' + this.dataset.pmc_id,
                target: '_BLANK',
                internal: false,
                title: 'View this Publication in Pubmed Central',
                text: this.dataset.pmc_id,
                prefix: 'pmc: '
            })
        }

        return pubLinks
    }

    get datasetAffiliations () {
        if (this.dataset.affiliations !== undefined && this.dataset.affiliations.length > 0) {
            return this.dataset.affiliations
        }
        return []
    }

    private toggleDatasetCollapsed () {
        this.datasetCollapsed = !this.datasetCollapsed
    }
}
</script>

<style lang="scss">
    .datasetAuthors {
        line-height: 22px !important;
    }
</style>
