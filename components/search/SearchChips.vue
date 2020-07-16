<template>
    <div class="biogrid-search-chips align-center">
        <v-chip
            color="primary"
            text-color="white"
            class="font-weight-bold"
        >
            <v-icon left small>
                mdi-magnify
            </v-icon>
            {{ searchTerms }}
        </v-chip>
        <v-chip
            color="secondary"
            text-color="white"
            class="font-weight-bold"
        >
            <v-icon left small>
                mdi-star
            </v-icon>
            {{ searchTypeFullName }}
        </v-chip>
        <v-chip
            v-if="organismString.length > 0"
            color="quaternary"
            text-color="white"
            class="font-weight-bold"
        >
            <v-icon left small>
                mdi-ladybug
            </v-icon>
            {{ organismString }}
        </v-chip>
    </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'nuxt-property-decorator'

@Component
export default class SearchChips extends Vue {
     @Prop({ type: String, default: '' }) private searchTerms!: string
     @Prop({ type: String, default: '' }) private searchType!: string
     @Prop({ type: String, default: '' }) private organismString!: string

     get searchTypeFullName () {
        if (this.searchType !== null) {
            if (this.searchType === 'pg') {
                return 'Proteins & Genes'
            } else if (this.searchType === 'go') {
                return 'Proteins & Genes by Gene Ontology'
            } else if (this.searchType === 'chem') {
                return 'Chemical Compounds'
            } else if (this.searchType === 'pub') {
                return 'Publications'
            }
        }

        return 'Invalid'
    }
}
</script>

<style lang="scss" scoped>
</style>
