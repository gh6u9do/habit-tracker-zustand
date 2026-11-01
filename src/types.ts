// as const позволяет заморозить массив и сделать его неизменяемым, а значения - точными литералами а не просто строками 
export const categoriesArr = ['health', 'sport', 'mind'] as const;

// такая запись позволяет получить тип всех элементов, которые можно получить по числовому индексу
export type TCategory = typeof categoriesArr[number] ;

export type THabit = {
    id: string,
    name: string,
    createdAt: string,
    completedDates: string[],
    // номера дней недели в которые выполняется привычка 1-7
    numDays: number[]
    category: TCategory
}