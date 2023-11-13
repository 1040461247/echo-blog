import { memo, type FC } from 'react'
import styles from './styles.module.scss'

const MainFooter: FC<IProps> = memo(() => {
  return (
    <footer className={styles['main-footer']}>
      <div className={styles['inner']}>
        <div className={styles['left']}></div>
        <div className={styles['center']}>footer content</div>
        <div className={styles['right']}></div>
      </div>
    </footer>
  )
})

export default MainFooter
MainFooter.displayName = 'MainFooter'

// Types
export interface IProps {
  children?: React.ReactElement
}
