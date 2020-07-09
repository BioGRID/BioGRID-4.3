/**
 * This file is for declaring shared interfaces that can be
 * re-used in different areas of the site for typescript verification
 **/

export interface Linkout {
    to: string;
    text: string;
    title: string;
    icon?: string;
    internal: boolean;
    target?: string;
}

export interface SelectOption {
    value?: string;
    text?: string;
    chipText?: string;
    header?: string;
}

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
