/**
 * This file is for declaring shared interfaces that can be
 * re-used in different areas of the site for typescript verification
 **/

 /**
 * LINKOUT LISTS FOR BUILDING URLS
 */

export interface Linkout {
    to: string;
    text: string;
    title: string;
    icon?: string;
    internal: boolean;
    target?: string;
    prefix?: string;
    image?: string;
}

/**
 * SELECT DROPDOWN OPTIONS
 */

export interface SelectOption {
    value?: string;
    text?: string;
    chipText?: string;
    header?: string;
    longText?: string;
}

/**
 * ORGANISM HANDLING TYPES
 */

export interface OrganismEntry {
    id: number;
    commonName: string;
    officialName: string;
    abbreviation: string;
    strain: string;
    uniprotTaxid: number;
    ncbiTaxid: number;
    deprecated: number;
    popular?: boolean;
}

export interface OrganismMap {
    [organismID: number]: OrganismEntry;
}

/**
 * API ACCESS
 */

export interface SearchRequest {
    search_terms: string;
    search_type: string;
    organisms?: number[];
    from: number;
    size: number;
    preference?: string;
}

export interface SearchResultAction {
    icon?: string;
    color: string;
    text: string;
    count: number;
    dark: boolean;
}

export interface ParticipantRequest {
    participantType: string;
    participantID: number;
}

/**
 *  HANDLING OF SEARCH RESULTS
 */

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
    affiliations?: string[];
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

export interface NewsItem {
    news_id: number;
    title: string;
    body: string;
    added_date: string;
    image: string;
    user_id: number;
}
