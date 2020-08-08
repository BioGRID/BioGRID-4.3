<template>
    <v-container v-if="showAlert()" fluid class="pa-0 biogrid-alert-bar">
        <v-sheet :color="alertBarColor" :class="alertBarClass">
            <v-container class="pa-0 constrainSize text-center">
                <p class="pa-3 mb-0">
                    BioGRID curation of SARS-CoV-2 (COVID-19) and Related Coronaviruses (<a class="primaryLink" href="https://wiki.thebiogrid.org/doku.php/covid" target="_BLANK" title="BioGRID SARS-CoV-2 (COVID-19) and related coronavirus resources">read more</a>)
                    <br>
                    Search BioGRID for <a class="primaryLink" nuxt href="/search?query=SARS-CoV-2*&type=pg&organisms=2697049" title="Search BioGRID for SARS-CoV-2 Proteins">SARS-CoV-2 Protein Interactions</a> | <a class="primaryLink" target="_BLANK" href="https://downloads.thebiogrid.org/File/BioGRID/Latest-Release/BIOGRID-CORONAVIRUS-LATEST.tab3.zip" title="Download SARS-CoV-2 and related coronavirus interactions">Download SARS-CoV-2 and Coronavirus-Related Interactions</a>
                </p>
            </v-container>
        </v-sheet>
    </v-container>
</template>

<script lang="ts">
import { Component, Vue, State } from 'nuxt-property-decorator'

@Component
export default class AlertBar extends Vue {
    @State private showAlertBar!: boolean
    @State private showAlertHome!: boolean
    @State private alertBarColor!: string
    @State private alertBarClass!: string

    private showAlert () {
        if (this.$route.path === '/' || this.$route.path === '/home') {
            return this.showAlertHome
        } else {
            return this.showAlertBar
        }
    }
}
</script>

<style lang="scss" scoped>
    a.primaryLink, a.primaryLink:visited {
        color: var(--v-warning-base);
        font-weight: bold;
        text-decoration: none;
    }
    a.primaryLink:hover {
        color: var(--v-accent-base);
    }
</style>
