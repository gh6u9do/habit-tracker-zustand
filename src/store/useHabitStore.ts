import { create } from "zustand";
import { type THabit } from "../types";
import { persist } from "zustand/middleware";


// типизируем стейт
type THabitsStore = {
    habits: THabit[],
    // храним выбранный в UI день в формате yyyy.mm.dd
    currentDateStr: string,

    // экшены
    addHabit: (habitTitle: string, category: THabit['category'], numDays: number[]) => void,
    deleteHabit: (habitId: string) => void,
    setCurrentDateStr: (newCurrentDateStr: string) => void
    toggleHabit: (habitId: string, dateStr: string) => void
}

export const useHabitStore = create<THabitsStore>()(
    persist((set) => ({

        habits: [],
        currentDateStr: new Date().toLocaleDateString('en-CA'),

        // экшен добавления привычки
        addHabit: (name, category, numDays) => set((state) => ({
            habits: [
                ...state.habits,
                {
                    id: crypto.randomUUID(),
                    name,
                    category,
                    createdAt: new Date().toISOString(),
                    completedDates: [],
                    numDays
                }
            ]
        })),

        // экшен удаления привычки
        deleteHabit: (id) => set((state) => ({
            habits: state.habits.filter((h) => h.id !== id)
        })),

        // экшен установки выбранной даты
        setCurrentDateStr: (newCurrentDateStr) => set((state) => ({
            currentDateStr: newCurrentDateStr
        })),

        // переключение состояния привычки
        toggleHabit: (habitId, dateStr) => set((state) => ({
            habits: state.habits.map((habit) => {

                // если привычка не равна нужной - возвращаем без изменений
                if (habit.id !== habitId) return habit;

                // проверяем является ли она завершенной
                const isCompleted = habit.completedDates.includes(dateStr);

                // Создаем абсолютно новый массив дат
                const newDates = isCompleted
                    ? habit.completedDates.filter((date) => date !== dateStr) 
                    : [...habit.completedDates, dateStr]; 

                // Возвращаем копию привычки с подмененным массивом дат
                return { ...habit, completedDates: newDates };
            })
        })),


    }), {
        name: "habits-storage",
        // в local-storage сохраняем только habits
        partialize: ((state) => ({
            habits: state.habits
        }))
    })
);