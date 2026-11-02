import type { THabit } from '../../types'
import { Checkbox } from '../ui/Checkbox/Checkbox'
import styles from './HabitCard.module.css'
import { useHabitStore } from '../../store/useHabitStore'
import { Button } from '../ui/Button/Button'


type THabitCard = {
    habit: THabit,
}

export const HabitCard = ({habit}: THabitCard) => {

    // достаем выбранную дату из стора
    const selectedDate = useHabitStore((state) => state.currentDateStr);
    // достаем из стора переключатель состояния привычки
    const toggleFunction = useHabitStore((state) => state.toggleHabit);
    // достаем функцию удаления привычки из стора
    const deleteFunction = useHabitStore((state) => state.deleteHabit)

    // функция удаления привычки
    function deleteHabitFromStore(id: string) {
        deleteFunction(id);
    }

    // собираем классы карточки
    const habitCardClasses = [
        styles['habitCard'],
        habit.category && styles[habit.category]
    ]
        .filter(Boolean)
        .join(' ');

    return (
        <div className={habitCardClasses}>
            <div className={styles['content']}>
                <Checkbox
                    title={habit.name}
                    isChecked={habit.completedDates.includes(String(selectedDate))}
                    category={habit.category}
                    onChange={() => toggleFunction(habit.id, selectedDate)}
                />
            </div>
            <div className={styles['deleteButton']}>
                <Button
                    variant='danger'
                    title='X'
                    type='button'
                    onClick={() => {deleteHabitFromStore(habit.id)}}
                >X</Button>
            </div>
        </div>
    )

}