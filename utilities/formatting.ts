/**
 * This file is for writing small formatting functions
 * that can be re-used in other areas of the site in order
 * to properly display certain types of data
 **/

import { OrganismEntry, SearchResultAction } from '@/utilities/types'

 /**
 * Take a molecular formula and format the numbers
 * correctly to look like an actual chemical formula
 * representation
 */
export function formatMolecularFormula (formula: string) {
    if (formula === undefined || formula.trim().length <= 0) {
        return []
    }
    const regex = /(\d+)/gm
    const splitFormula = formula.split(regex)
    const formulaFormatted = []
    for (const item of splitFormula) {
        if (item.trim().length <= 0) { continue }
        if (!isNaN(item as any)) {
            formulaFormatted.push({ type: 'atom', value: item })
        } else {
            formulaFormatted.push({ type: 'element', value: item })
        }
    }
    return formulaFormatted
}

/**
 * Take an organism entry and create a properly formatted
 * organism abbreviation with possible strain
 */
export function formatOrganismAbbreviation (organism: OrganismEntry) {
    let organismAbbr = organism.abbreviation
    if (organism.strain !== '') {
        organismAbbr += ' (' + organism.strain + ')'
    }

    return organismAbbr
}

export function formatEntityTypesFromStats (stats: Record<string, Record<string, number>>) {
    const types: SearchResultAction[] = []

    if (stats.activated['1'] !== undefined) {
        types.push({
            icon: 'mdi-graph',
            text: 'binary interactions',
            count: stats.activated['1'],
            color: 'yellow lighten-3',
            dark: false
        })
    }

    if (stats.activated['2'] !== undefined) {
        types.push({
            icon: 'mdi-cube-unfolded',
            text: 'complexes',
            count: stats.activated['2'],
            color: 'purple lighten-4',
            dark: false
        })
    }

    if (stats.activated['4'] !== undefined) {
        types.push({
            icon: 'mdi-map-marker',
            text: 'post-translational modifications',
            count: stats.activated['4'],
            color: 'orange lighten-3',
            dark: false
        })
    }

    if (stats.activated['3'] !== undefined) {
        types.push({
            icon: 'mdi-flask-outline',
            text: 'chemical interactions',
            count: stats.activated['3'],
            color: 'green lighten-3',
            dark: false
        })
    }

    return types
}
