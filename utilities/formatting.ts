/**
 * This file is for writing small formatting functions
 * that can be re-used in other areas of the site in order
 * to properly display certain types of data
 **/

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
