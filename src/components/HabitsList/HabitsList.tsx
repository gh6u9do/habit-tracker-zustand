import styles from './HabitsList.module.css';
import { useHabitStore } from '../../store/useHabitStore';
import { Checkbox } from '../ui/Checkbox/Checkbox';

export const HabitsList = () => {

    // достаем выбранный день из стора
    const selectedDate = useHabitStore((state) => state.currentDateStr);
    // находим номер выбранного дня, если выбранный день воскресенье то ставим номер 7
    const numSelectedDate = (new Date(selectedDate).getUTCDay()) === 0 ? 7 : new Date(selectedDate).getUTCDay();

    // достаем привычки из стора
    const habits = useHabitStore((state) => state.habits);
    // берем только те привычки, которые есть на выбранный день
    const filteredHabits = habits.filter((habit) => habit.numDays.includes(numSelectedDate));

    // достаем из стора переключатель состояния привычки
    const toggleFunction = useHabitStore((state) => state.toggleHabit);

    return (
        <section className={styles['listWrapper']}>
            {
                filteredHabits.length > 0 ? (
                   filteredHabits.map((habit) => (
                    <div key={habit.id} className={styles['habitCard']}>
                        <Checkbox
                            title={habit.name}
                            isChecked={habit.completedDates.includes(String(selectedDate))}
                            category={habit.category}
                            onChange={() => toggleFunction(habit.id, selectedDate) }
                        />
                    </div>
                   ))
                ) : (
                    <div className={styles['emptyContainer']}>
                        <p className={styles['emptyText']}>На сегодня ничего нет</p>
                    </div>
                )
            }
        </section>
    )

} 