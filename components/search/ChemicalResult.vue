<template>
    <div class="biogrid-chemical-result align-center">
        <SearchResultBox
            :result-type="resultType"
            :result-link="resultLink"
            :result-title="resultTitle"
            :result-subtitle="resultSubtitle"
            :result-body="resultBody"
            :result-footer="resultFooter"
            :stats="stats"
        >
            <template slot="customResultTitle">
                <template v-if="formattedMolecularFormula.length > 0">
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
            </template>
        </SearchResultBox>
    </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'nuxt-property-decorator'
import { formatMolecularFormula } from '@/utilities/formatting'
import SearchResultBox from '@/components/search/SearchResultBox.vue'

@Component({
    components: {
        SearchResultBox
    }
})
export default class ChemicalResult extends Vue {
    @Prop({ type: Object, default: null }) private searchResult!: any
    @Prop({ type: String, default: 'pg' }) private searchType!: string
    private readMoreActivated: boolean = false;
    private maxBodyLength: number = 400;

    get resultTitle () {
        return this.searchResult.name
    }

    get resultBody () {
        if (this.searchResult.description !== undefined && this.searchResult.description.length > 0) {
            return this.searchResult.description
        }
        return ''
    }

    get resultSubtitle () {
        return this.generateChemicalSynonyms()
    }

    get resultType () {
        return this.searchResult.chemical_type
    }

    get resultFooter () {
        return this.generateChemicalFooter()
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
        return '/chemical/' + String(this.searchResult.chemical_id)
    }

    get formattedMolecularFormula () {
        return formatMolecularFormula(this.searchResult.formula)
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
</style>
