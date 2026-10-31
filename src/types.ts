export type TCategory = 'health' | 'sport' | 'mind';

export type THabit = {
    id: string,
    name: string,
    createdAt: string,
    completedDates: string[],
    // номера дней недели в которые выполняется привычка 1-7
    numDays: number[]
    category: TCategory
}