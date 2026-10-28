export type TCategory = 'health' | 'sport' | 'mind';

export type THabit = {
    id: string,
    name: string,
    createdAt: string,
    completedDates: string[]
    category: TCategory
}