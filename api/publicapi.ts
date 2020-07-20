/**
 * API Class for the Public API
 * Suitable for Axios injection and reuse
 * in the entire site
 */

import { SearchRequest, ParticipantRequest } from '@/utilities/types'

export default class PublicAPI {
    private $axios: any
    private apiURL: string | undefined
    private apiKey: string | undefined

    constructor ($axios: any) {
        this.apiURL = process.env.PUBLIC_API_URL
        this.apiKey = process.env.PUBLIC_API_KEY
        this.$axios = $axios
    }

    public participants (payload: SearchRequest) {
        return this.$axios.post(this.apiURL + '/participants', payload, {
            headers: { Authorization: 'Bearer ' + this.apiKey }
        })
    }

    public participant (payload: ParticipantRequest) {
        return this.$axios.get(this.apiURL + '/participant/' + payload.participantType + '/' + payload.participantID, {
            headers: { Authorization: 'Bearer ' + this.apiKey }
        })
    }
}
