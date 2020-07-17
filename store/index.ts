import { v4 as uuidv4 } from 'uuid'
import { organismList } from '@/utilities/organisms.ts'

export const state = () => ({
    navDrawerVisible: false,
    organisms: organismList,
    searchOptions: [
        { value: 'pg', text: 'Proteins & Genes', longText: 'Proteins & Genes' },
        { value: 'chem', text: 'Chemical Compounds', longText: 'Chemical Compounds' },
        { value: 'pub', text: 'Publications', longText: 'Publications' },
        { value: 'go', text: 'GO Terms', longText: 'Proteins & Genes by GO Terms' }
    ],
    preference: uuidv4(),
    lastSearchType: 'pg'
})
