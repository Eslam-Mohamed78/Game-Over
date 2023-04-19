import style from './Notfound.module.scss'
import image from './../../Assets/Images/404-error-not-found-page-background-design-vector-20395260.jpg'

export default function Notfound() {
  return (
    <>
    
    <div className={style.notFound}>
      <div className={style.overLay}></div>
      <img className='h-100 w-100' src={image} alt="NotFound" />
    </div>
    
    </>
  )
}
