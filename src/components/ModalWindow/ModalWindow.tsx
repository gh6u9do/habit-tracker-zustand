import { useHabitStore } from '../../store/useHabitStore';
import { categoriesArr, type TCategory } from '../../types';
import { Button } from '../ui/Button/Button';
import { Input } from '../ui/Input/Input';
import styles from './ModalWindow.module.css';
import { useState } from 'react';


type TModalWindow = {
    onClose: () => void;
}

export const ModalWindow = ({onClose}: TModalWindow) => {

    // стейт для выбранного имени привычки
    const [newHabitName, setNewHabitName] = useState('');

    // стейт для выбранной категории
    const [newHabitCategory, setNewHabitCategory] = useState<TCategory>('mind');

    // стейт с выбранными днями недели для новой привычки
    const [newHabitDays, setNewHabitDays] = useState<number[]>([]);

    // достаем из стора метод для добавления привычки
    const addHabitFunc = useHabitStore((state) => state.addHabit);

    // функция обработчик сабмита формы
    function submitModalWindow(e: React.SubmitEvent<HTMLFormElement>) {
        // отменяем дефолтное поведение
        e.preventDefault();

        // добавляем в стор новую привычку
        addHabitFunc(newHabitName, newHabitCategory, newHabitDays);

        // очищаем поля модалки
        setNewHabitName('');
        setNewHabitDays([]);

        // закрываем модалку
        onClose();

    }

    // функция отвечает за включение/исключение дня недели из массива дней недели
    function toggleDay(numDay: number) {
        // проверяем есть ли номер дня в массиве
        const isExistDay = newHabitDays.includes(numDay);

        // в зависимости от того есть день в массиве или нет добавляем/исключаем
        if(isExistDay) {
            setNewHabitDays((prev) => prev.filter((num) => num !== numDay));
        } else {
            setNewHabitDays((prev) => [...prev, numDay]);
        }
    }

    const daysOfWeek = ['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun'];
    
    return (
        <div className={styles['modalWrapper']} onClick={(e) => onClose()}>
            <form className={styles['form']} onSubmit={submitModalWindow} onClick={(e) => e.stopPropagation()}>

                <Input 
                    type='text' 
                    minLength={2} 
                    placeholder='brush teeth'
                    value={newHabitName}
                    onChange={(e) => setNewHabitName(e.target.value)}
                ></Input>

                <select 
                    className={styles['selectCategory']}
                    onChange={(e) => setNewHabitCategory(e.target.value as TCategory)}
                >
                    {categoriesArr.map((value) => (
                        <option value={value}>{value}</option>
                    ))}
                </select>

                <div className={styles['daysGrid']}>
                    {
                        daysOfWeek.map((dayName, index) => {

                            // проверяем есть ли день в массиве
                            const isExistDay = newHabitDays.includes(index+1);

                            // собираем массив с классами в зависимости от условий
                            const dayClasses = [
                                styles.day,
                                isExistDay ? styles.dayActive : ''
                            ]
                            // убираем пустые строки
                            .filter(Boolean)
                            // соединяем все классы в строку через пробел
                            .join(' ');

                            return (
                                <button key={index} type='button' className={dayClasses} onClick={() => toggleDay(index+1)}>
                                    {dayName}
                                </button>
                            )

                        })
                    }
                </div>

                <Button type='submit' variant='primary'>create habit</Button>

            </form>
        </div>
    )

}