import styles from './App.module.css'
import { HabitsList } from './components/HabitsList/HabitsList';
import { ProgressBar } from './components/ProgressBar/ProgressBar';
import { Checkbox } from './components/ui/Checkbox/Checkbox';
import { WeekStrip } from './components/WeekStrip/WeekStrip';

function App() {

  const currentDate = new Date();
  const month = String(currentDate.getMonth() + 1).padStart(2, '0');
  const day = String(currentDate.getDate()).padStart(2, '0');
  

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
      </main>
    </div>
  )
}

export default App
