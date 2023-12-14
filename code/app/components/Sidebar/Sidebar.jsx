import styles from './Sidebar.module.css'

const Sidebar = ({ open }) => {

  return (
    <div className={`p-4 transition-all duration-sidebar ${styles.container} ${open ? styles.show : styles.hide}`}>
      <p>Sidebar</p>
    </div>
  )
}

export default Sidebar;