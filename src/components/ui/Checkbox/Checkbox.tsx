import type { TCategory } from '../../../types'
import styles from './Checkbox.module.css'

type TCheckbox = {
    isChecked: boolean, 
    title: string,
    onChange: (isChecked: boolean) => void,
    category: TCategory
}

export const Checkbox = ({isChecked, title, onChange, category}: TCheckbox) => {
    


    return (
        <label className={styles['wrapper']}>
            {/* нативный инпут скрыт, но он управляет состоянием */}
            <input 
                type="checkbox" 
                className={styles['hiddenInput']}
                checked={isChecked}
                onChange={(e) => onChange(e.target.checked)}
            />

            {/* кастомный чекбокс */}
            <span className={styles['customCheckbox']}></span>

            <span className={styles['checkboxTitle']}>
                {title}
            </span>

        </label>
    )


}