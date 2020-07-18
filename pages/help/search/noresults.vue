<template>
    <v-container class="biogrid-invalid-search-help-page" fluid>
        <v-card
            class="pa-3"
        >
            <v-img
                src="/images/sad_bulldog.jpg"
                height="350"
                width="350"
                class="float-right ml-5 hidden-sm-and-down"
                contain
            />
            <h1>Unfortunately, no results were found for your search ...</h1>
            <div class="subtitle-1">
                The following are some suggestions that may help you find what you're looking for ...
            </div>
            <v-btn
                large
                class="mt-3"
                color="success"
                nuxt
                dark
                to="/"
            >
                <v-icon>mdi-arrow-left-circle</v-icon>
                Back to Search
            </v-btn>
            <v-divider class="mt-5 mb-5" />
            <h2>Useful Links</h2>
            <p>
                <ul>
                    <li class="pa-1">
                        Visit our <nuxt-link class="font-weight-bold plainLink" to="/help/search/advanced">
                            advanced search tips
                        </nuxt-link> page to learn about all the advanced ways you can search our database.
                    </li>
                    <li class="pa-1">
                        Visit our <nuxt-link class="font-weight-bold plainLink" to="/help/search/examples">
                            search examples
                        </nuxt-link> page for a number of common search examples.
                    </li>
                    <li class="pa-1">
                        Visit our <nuxt-link class="font-weight-bold plainLink" to="/help/search/examples">
                            list of supported search identifiers
                        </nuxt-link> page to find out whether or not the identifier your searching for is in our database.
                    </li>
                </ul>
            </p>
            <v-divider class="mt-5 mb-5" />
            <h2>Help for Protein & Gene Searches</h2>
            <p>
                <ul>
                    <li class="pa-1">
                        Try being <span class="font-weight-bold accent--text">less specific</span> with regards to the terms you search for. For example, if you searched for the protein <span class="textHighlighter">BRCA1</span> and it returned no results, try instead searching for <span class="textHighlighter">BRCA</span> or even <span class="textHighlighter">BRC</span> to see if more results return. Better yet, <span class="font-weight-bold accent--text">try a wildcard search</span>. If you search for <span class="textHighlighter">BRCA*</span> it will return all results that start with BRCA. For more advanced searching tips, checkout our <nuxt-link class="font-weight-bold plainLink" to="/help/search/advanced">
                            advanced search tips
                        </nuxt-link>.
                    </li>
                    <li class="pa-1">
                        Try using <span class="font-weight-bold accent--text">correct spelling</span>. It may seem obvious, but a lot of gene and protein names have non-standard name structures that aren't necessarily obvious at first glance.
                    </li>
                    <li class="pa-1">
                        Try <span class="font-weight-bold accent--text">restricting by organism</span> in searches. If you're having a hard time finding exactly what you're looking for, cut down on the excess noise by choosing an organism from our selector instead of defaulting to <span class="textHighlighter">ALL ORGANISMS</span>. Picking a specific organism will limit searches to only within that species. Alternatively, try <span class="font-weight-bold accent--text">unrestricting organism</span> and setting it back to <span class="textHighlighter">ALL ORGANISMS</span> just in case you incorrectly restricted your search field.
                    </li>
                    <li class="pa-1">
                        Instead of a gene name/official symbol search, why not try <span class="font-weight-bold accent--text">using an external database id</span>? The BioGRID supports identifiers used by a wide range of databases including NCBI, UniprotKB, FlyBase, SGD, WormBase, etc. If a name is not recognized maybe the external identifier used by another database will deliver more accurate results.
                    </li>
                    <li class="pa-1">
                        Try not to use <span class="font-weight-bold accent--text">ambiguous names</span>. When possible, search for unique identifiers, names, or systematic names. An ambiguous name makes it harder to pin point exactly which record you were hoping to get, and some ambiguous names in some species will result in hundreds of matches. The more specific you go, the better your chances of finding what you're looking for.
                    </li>
                </ul>
            </p>
            <v-divider class="mt-5 mb-5" />
            <h2>Help for Publication Searches</h2>
            <p>
                <ul>
                    <li class="pa-1">
                        Some words are automatically ignored from searches simply because <span class="font-weight-bold accent--text">they are too common</span>. If you search for just the words "to" and "from", your search will return no results because both words are ignored. If you search for "Protein to Complex" you may get results because protein and complex are both valid while "to" is simply ignored.
                    </li>
                    <li class="pa-1">
                        Try searching for <span class="font-weight-bold accent--text">less terms</span>. For example, if you searched for <span class="textHighlighter">+BREAST +CANCER</span> (and search) and it returned no results, try searching for <span class="textHighlighter">BREAST</span> or <span class="textHighlighter">CANCER</span> alone to see if more results return. Better yet, use do an EITHER/OR search like <span class="textHighlighter">BREAST | CANCER</span>.
                    </li>
                    <li class="pa-1">
                        <span class="font-weight-bold accent--text">Group terms together</span> using quotes " if you are looking for a specific phrase. For example, if you are interested in papers on protein kinase activators, rather than searching for <span class="textHighlighter">PROTEIN KINASE ACTIVATOR</span> which will return papers containing those terms, search for <span class="textHighlighter">"PROTEIN KINASE ACTIVATOR"</span> which will instead search for that exact phrase and only return papers that match that phrase exactly.
                    </li>
                    <li class="pa-1">
                        Try searching by <span class="font-weight-bold accent--text">publication database ID</span>. We currently support searching by PUBMED IDs, DOIs, and PMC IDs. You can also search for multiple by combining them in an OR query. For example <span class="textHighlighter">20634885 | 20605454 | 20237159</span> will return the 3 publications represented by those 3 pubmed ids.
                    </li>
                    <li class="pa-1">
                        If you are getting a large number of results, try <span class="font-weight-bold accent--text">removing keywords from your search</span> to help improve accuracy. For example, if you were looking for Kinase papers, but are not interested in Saccharomyces cerevisiae (Budding Yeast) results, you could search for <span class="textHighlighter">Kinase -cerevisiae</span> or <span class="textHighlighter">Kinase -yeast</span> to retrieve more accurate matches. Even better, why not combine both? <span class="textHighlighter">Kinase -yeast -cerevisiae</span>. You can chain together as many keywords as you like, each preceeded with a hyphen (minus) sign, to negate those words. Check out our <nuxt-link class="font-weight-bold plainLink" to="/help/search/advanced">
                            advanced search tips
                        </nuxt-link> for even more complex queries you can create.
                    </li>
                </ul>
            </p>
            <v-divider class="mt-5 mb-5" />
            <h2>Help for Chemical Searches</h2>
            <p>
                <ul>
                    <li class="pa-1">
                        Try searching by <span class="font-weight-bold accent--text">something other than the chemical name</span>. In addition to searching on chemical names, you can search by SMILE, INCHI-KEY, and INCHI. Moreover, you can even try searching by CAS NUMBERS or ATC CODES, although not all chemical compounds in our database have these identifiers.
                    </li>
                    <li class="pa-1">
                        Try <span class="font-weight-bold accent--text">searching with wildcards</span> to find more complex chemical names. For example, if you searched for <span class="textHighlighter">hydroxy</span> you will find hundreds of results, but if you want all varations of hydroxy, try searching for <span class="textHighlighter">hydrox*</span> or <span class="textHighlighter">hydro*</span> alone to see if more results return.
                    </li>
                    <li class="pa-1">
                        <span class="font-weight-bold accent--text">Group terms together</span> using quotes " if you are looking for a specific chemical. For example, if you are interested in histamine dihydrochloride, rather than searching for <span class="textHighlighter">HISTAMINE | DIHYDROCHLORIDE</span> which will return chemicals containing either of those terms, search for <span class="textHighlighter">"HISTAMINE DIHYDROCHLORIDE"</span> which will instead search for that exact phrase and only return papers that match that phrase exactly.
                    </li>
                    <li class="pa-1">
                        You can also search by <span class="font-weight-bold accent--text">molecular formula</span>. For example to search for the various versions of Testosterone, simply search for <span class="textHighlighter">C19H28O2</span> which returns several different records with the same molecular formula.
                    </li>
                    <li class="pa-1">
                        If you are getting a large number of results, try removing keywords from your search to help improve accuracy. For example, if you were looking for Methyl, but are not interested in any involving phsophate, you could search for <span class="textHighlighter">Methyl -Phospho*</span>. You can chain together as many keywords as you like, each preceeded with a hyphen (minus) sign, to negate those words. Check out our <nuxt-link class="font-weight-bold plainLink" to="/help/search/advanced">
                            advanced search tips
                        </nuxt-link> for even more complex queries you can create.
                    </li>
                </ul>
            </p>
        </v-card>
    </v-container>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'

@Component
export default class SearchNoResultsHelpPage extends Vue {}
</script>

<style lang="scss" scoped>
    .textHighlighter {
        padding-left: 6px;
        padding-right: 6px;
        padding-top: 1px;
        padding-bottom: 1px;
        background-color: #ffd061;
    }
</style>
