import styles from './HabitsList.module.css';
import { useHabitStore } from '../../store/useHabitStore';
import { HabitCard } from '../HabitCard/HabitCard';

export const HabitsList = () => {

    // достаем выбранный день из стора
    const selectedDate = useHabitStore((state) => state.currentDateStr);
    // находим номер выбранного дня, если выбранный день воскресенье то ставим номер 7
    const numSelectedDate = (new Date(selectedDate).getUTCDay()) === 0 ? 7 : new Date(selectedDate).getUTCDay();

    // достаем привычки из стора
    const habits = useHabitStore((state) => state.habits);
    // берем только те привычки, которые есть на выбранный день
    const filteredHabits = habits.filter((habit) => {
        // смотрим есть ли он в массиве выбранных дней
        const isCorrectDay = habit.numDays.includes(numSelectedDate);
        // смотрим существовала ли привычка на выбранный день
        const isAlreadyCreated = selectedDate >= habit.createdAt;

        return isCorrectDay && isAlreadyCreated;
    })



    return (
        <section className={styles['listWrapper']}>
            {
                filteredHabits.length > 0 ? (
                    filteredHabits.map((habit) => (
                        <HabitCard key={habit.id} habit={habit} />
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