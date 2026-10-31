import { getCurrentWeekDays } from "../../utils/dateHelpers";
import { useHabitStore } from "../../store/useHabitStore";
import styles from './WeekStrip.module.css'

export const WeekStrip = () => {

    // получаем массив с днями текущей недели
    const daysArr = getCurrentWeekDays();

    // достаем выбраный день из стора
    const selectedDay = useHabitStore((state) => state.currentDateStr);
    
    // достаем экшен для смены выбранной даты
    const changeSelectedDate = useHabitStore((state) => state.setCurrentDateStr);

    return (
        <div className={styles.daysContainer}>
            {daysArr.map((day, index) => {

                // проверяем выбранный ли это день
                const isActive = day === selectedDay;

                // в зависимости от того выбран день или нет вешаем классы
                const dayClasses = [
                    styles.day,
                    isActive ? styles.dayActive: ''
                ]
                // убираем пустые строки
                .filter(Boolean)
                // склеиваем через пробел
                .join(' ');

                return (
                    <div 
                        key={index} 
                        className={dayClasses}
                        onClick={() => changeSelectedDate(day)}
                    >
                        <p className={styles.dayNum}>{day.split('-')[2]}</p>
                        <p className={styles.dayTitle}>{new Date(day).toLocaleDateString('en-US', { weekday: "short", timeZone: 'UTC' }).toLowerCase()}</p>
                    </div>
                )
            })}
        </div>
    );

}