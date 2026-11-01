import styles from './App.module.css'
import { HabitsList } from './components/HabitsList/HabitsList';
import { ModalWindow } from './components/ModalWindow/ModalWindow';
import { ProgressBar } from './components/ProgressBar/ProgressBar';
import { WeekStrip } from './components/WeekStrip/WeekStrip';
import { useState } from 'react';

function App() {

  // получаем текущую дату
  const currentDate = new Date();
  const month = String(currentDate.getMonth() + 1).padStart(2, '0');
  const day = String(currentDate.getDate()).padStart(2, '0');

  // стейт для модалки
  const [isModalOpen, setIsModalOpen] = useState(false);
  

  return (
    <div className={styles['appContainer']}>

      <header className={styles.header}>
        <h1 className={styles.title}>habit tracker</h1>
        <div className={styles.dateContainer}>
          <p>{day}</p>
          <span className={styles.blinkDot}>.</span>
          <p>{month}</p>
          <span className={styles.blinkDot}>.</span>
          <p>{currentDate.getFullYear()}</p>
        </div>
      </header>

      <ProgressBar/>

      <main className={styles.mainContent}>
        <WeekStrip/>
        <HabitsList/>
        <button className={styles['floatingButton']} onClick={() => setIsModalOpen(true)}>+</button>

        {isModalOpen && <ModalWindow onClose={() => setIsModalOpen(false)} />}

      </main>
    </div>
  )
}

export default App
