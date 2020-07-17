import axios from 'axios'
import { SearchRequest } from '@/utilities/types'

// Get search results based on the passed in
// search request
export async function API_SEARCH (payload: SearchRequest) {
    const apiURL = process.env.PUBLIC_API_URL
    const apiKey = process.env.PUBLIC_API_KEY

    try {
        const res = await axios.post(apiURL + '/search', payload, {
            headers: { Authorization: 'Bearer ' + apiKey }
        })

        if (res.status !== 200) {
            console.error(res)
            console.log('Received ' + res.status + ' response code')
        } else {
            return res.data
        }
    } catch (error) {
        console.log(error)
    }

    return undefined
}
