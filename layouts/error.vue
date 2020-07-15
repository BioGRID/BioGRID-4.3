<template>
    <v-container fill-height fluid class="nuxt-error">
        <v-row align="center" justify="center">
            <v-col class="text-center">
                <h1 v-if="error.statusCode === 404">
                    {{ pageNotFound }}
                </h1>
                <h1 v-else>
                    {{ otherError }}
                </h1>
                <NuxtLink to="/">
                    Home page
                </NuxtLink>
            </v-col>
        </v-row>
    </v-container>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'nuxt-property-decorator'

@Component
export default class NuxtError extends Vue {
    @Prop({ type: Object, default: null }) private error!: any
    private pageNotFound: string = '404 Not Found'
    private otherError: string = 'An error occurred'
    private layout: string = 'empty'

    private head () {
        const title = this.error.statusCode === 404 ? this.pageNotFound : this.otherError
        return {
            title
        }
    }
}
</script>

<style scoped>
h1 {
  font-size: 20px;
}
</style>
