import styles from './ProgressBar.module.css';
import { useHabitStore } from '../../store/useHabitStore';


export const ProgressBar = () => {

    // достаем из стора привычки
    const habits = useHabitStore((state) => state.habits);

    // достаем из стора выбранную дату
    const selectedDate = useHabitStore((state) => state.currentDateStr);
    // считаем номер выбранного дня
    const numSelectedDate = (new Date(selectedDate).getUTCDay() === 0) ? 7 : new Date(selectedDate).getUTCDay();

    // фильтруем привычки только на выбранный день
    const total = habits.filter((habit) => habit.numDays.includes(numSelectedDate));

    // считаем сколько выполненных
    const completed = total.filter((habit) => habit.completedDates.includes(selectedDate));

    // рассчитываем процент выполнения
    const percentage = total.length > 0 ? Math.round((completed.length / total.length) * 100) : 0;

    return (
        <div className={styles['progressWrapper']}>
            <p className={styles['textInfo']}>daily progress</p>
            <p className={styles['textInfo']}>{percentage}%</p>
            <div className={styles['track']}>
                <div className={styles['bar']} style={{ width: `${percentage}%` }}></div>
            </div>
        </div>
    )
}