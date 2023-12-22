import Link from 'next/link';
import Icons from '../Icons/Icons';
import styles from './LeftSidebar.module.css'

const LeftSidebar = ({ open, setOpen }) => {

  const menuItems = [{
    title: 'Início',
    link: '/',
    icon: 'home'
  }, {
    title: 'Shorts',
    link: '',
    icon: 'cube'
  }, {
    title: 'Inscrições',
    link: '',
    icon: 'play-circle'
  }, {
    title: 'Seu canal',
    link: '',
    icon: 'play-circle'
  }, {
    title: 'Histórico',
    link: '',
    icon: 'play-circle'
  }, {
    title: 'Seus vídeos',
    link: '',
    icon: 'play-circle'
  }, {
    title: 'Assistir mais tarde',
    link: '',
    icon: 'play-circle'
  }, {
    title: 'Favoritos',
    link: '',
    icon: 'play-circle'
  }];

  return (
    <>
      {open && (
        <div className={`bg-gray-800 absolute w-full h-screen bg-opacity-80 transition-all duration-1000 fixed ${styles.overlay_sidebar}`} id="teeste" onClick={() => setOpen(false)}></div>
      )}
      <div className={`absolute p-4 transition-all duration-sidebar z-40 fixed p-4 bg-white dark:bg-gray-800 ${styles.container} ${open ? styles.show : styles.hide}`}>
        <nav>
          <ul>
            {menuItems.map(item => (
              <li key={item.title} className='w-full p-2'>
                <Link className='flex text-black gap-4 hover:text-red-600 transition-all' href={item.link}>{Icons(item.icon)}{item.title}</Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </>
  )
}

export default LeftSidebar;