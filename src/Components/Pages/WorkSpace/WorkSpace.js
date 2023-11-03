import Styles from './WorkSpace.module.css'

import Dashboard from '../../Atoms/SideBar/SideBar';


export default function WorkSpace(){
    
    return(
        <div className={Styles.outer}>
        <header className={Styles.nav}>
         
        </header>

        <section className={Styles.Main}>
         
        
          <Dashboard />
          
        
        </section>


        </div>
    )
}