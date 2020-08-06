<template>
    <v-container fill-height fluid class="nuxt-error">
        <v-row align="center" justify="center">
            <v-col class="text-center mt-n12">
                <div v-if="error.statusCode === 404">
                    <v-img
                        :src="notFoundImage"
                        height="400"
                        contain
                    />
                </div>
                <div v-else>
                    <v-img
                        :src="serverErrorImage"
                        height="400"
                        contain
                    />
                </div>
                <h2>
                    Sorry about that!
                </h2>
                <div class="subtitle-1">
                    {{ extraMessage() }}
                </div>
                <h3>
                    Navigate Back To
                    <NuxtLink to="/">
                        Home
                    </NuxtLink>
                </h3>
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
    private otherError: string = '500 Internal Server Error'
    private layout: string = 'empty'

    private head () {
        const title = this.error.statusCode === 404 ? this.pageNotFound : this.otherError
        return {
            title
        }
    }

    get notFoundImage () {
        return process.env.BASE_URL + '/images/404.png'
    }

    get serverErrorImage () {
        return process.env.BASE_URL + '/images/500.png'
    }

    private extraMessage () {
        if (this.error !== null && this.error !== undefined && this.error.message !== undefined && this.error.message.length > 0) {
            if (!this.error.message.includes('statusCode')) {
                return this.error.message
            }
        }

        return ''
    }
}
</script>

<style scoped>
</style>
