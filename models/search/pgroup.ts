import axios from 'axios'
import { OrganismEntry, SearchRequest } from '@/utilities/types'

export interface PGroupSearchResult {
    pgroup_id: number;
    pgroup_type: string;
    source: string;
    source_id: string;
    official_symbol?: string[];
    orf?: string[];
    ordered_locus?: string[];
    synonyms?: string[];
    organism: OrganismEntry;
    description: string;
    dbxrefs?: Record<string, string[]>;
    doc_score?: number;
}

export interface DatasetSearchResult {
    dataset_id: number;
    source_type: string;
    source_id: string;
    author_abbreviation: string;
    authors?: string[];
    collectives?: string[];
    title: string;
    abstract: string;
    mesh_terms?: string[];
    keywords?: string[];
    journal: string;
    journal_abbreviation: string;
    volume?: string;
    issue?: string;
    pagination?: string;
    doi?: string;
    pmc_id?: string;
    pub_date: string;
    doc_score?: number;
}

export interface ChemicalSearchResult {
    chemical_id: number;
    source: string;
    source_id: string;
    synonyms?: string[];
    description: string;
    name: string;
    chemical_type: string;
    formula?: string;
    inchi?: string;
    inchikey?: string;
    smile?: string;
    dbxrefs?: Record<string, string[]>;
}

export interface PGroupSearchResultMap {
    [pgroup_id: number]: PGroupSearchResult;
}

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
