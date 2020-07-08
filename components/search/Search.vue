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
                <v-select
                    v-model="searchType"
                    solo
                    light
                    hide-details="auto"
                    class="mt-1 searchTypeSelect"
                    :items="searchOptions"
                />
            </v-col>
        </v-row>
    </div>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
import { SelectOption } from '@/utilities/interfaces.ts'

@Component
export default class Search extends Vue {
    private searchType: string = 'pg';
    private searchOptions: SelectOption[] = [
        { value: 'pg', text: 'Proteins & Genes' },
        { value: 'chem', text: 'Chemical Compounds' },
        { value: 'pub', text: 'Publications' },
        { value: 'go', text: 'GO Terms' }
    ];

    private showOrganismSelect () {
        if (this.searchType === 'pg' || this.searchType === 'go') {
            return true
        }

        return false
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
