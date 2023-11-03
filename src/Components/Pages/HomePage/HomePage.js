import React from 'react'
import styles from './HomePage.module.css'
import { useNavigate } from 'react-router-dom'

function HomePage() {
    const navigate = useNavigate()

    const handleClick = () => {
        navigate('/managetasks')
    }

  return (
    <>
    <div className={styles.wrapper} id='home'>
         <section className={styles.description}>
            <span>
                <h1>TODO</h1>
                <span className={styles.para}>
                <p>Build UI for onboarding flow </p> 
                <p>Build UI for search</p>
                <p>Click on <strong>Get Started</strong> and <strong>Boost your productivity</strong>.</p>
                </span>
            </span>
            <button className={styles.btn} onClick={handleClick}>Get Started</button>
        </section>
        <section className={styles.sideImg}>
            <img src='https://hygger.io/wp-content/uploads/2019/04/ce5e4258e08e36c337f68f7d7c54764c.jpg' alt='ToDo List'/>
        </section>
    </div>
    <div className={styles.overview}>
     <section id='overview'>
     <img src='https://t3.ftcdn.net/jpg/00/80/73/10/360_F_80731064_fe6wouwQAgdkHFiC8iiIFUCcpJAZcn08.jpg' alt='<h1>Overview</h1>'/>
         <div className={styles.overviewpara}>
         <p>Kanban board is a visual way to manage work. It helps teams to visualize their work, identify bottlenecks, and continuously improve their processes.</p> <br/>
         <p>Kanban board is made up of columns, each of which represents a stage in the workflow. For example, a Kanban board for software development might have columns for "To Do", "In Progress", and "Done".</p><br/>
         <p>Each work item is represented by a card that is placed on the board. As the work item moves through the workflow, the card is moved from column to column. This allows the team to see at a glance which tasks are in progress, which tasks are waiting, and which tasks have been completed.</p>
         </div>
     </section>
     </div>
     </>
  )
}

export default HomePage
