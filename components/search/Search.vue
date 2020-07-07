<template>
    <div class="biogrid-search align-center">
        <v-sheet
            color="white"
            class="pa-2 black--text"
            rounded
            elevation="8"
        >
            <v-row no-gutters>
                <v-col
                    lg="7"
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
                    lg="3"
                    class="black--text"
                >
                    Select Box
                </v-col>
                <v-col
                    lg="2"
                >
                    BTN
                </v-col>
            </v-row>
        </v-sheet>
    </div>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'

@Component
export default class Search extends Vue {
}
</script>

<style lang="scss" scoped>
</style>
