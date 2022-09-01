
import styles from './Page404.module.css';


/**
 * Landing Page View Component.
 * @returns {JSX.Element} View Of The Landing Page.
 */
const Page404 = (): JSX.Element => {

    return (

        <>
            <div className={`${styles.intro} bg-image vh-100 shadow-1-strong`}>
                <video className={`${styles.video}`} playsInline autoPlay={true} muted loop>
                    <source className="h-100" src="/videos/landing-bar.mp4" type="video/mp4" />
                </video>
            </div>

            <div className={`${styles.wrapper}`}>
                <h1 className={`${styles.h1} mb-3 text-center`}>Pocket Bar</h1>
                <div className="container d-flex align-items-center justify-content-center text-center h-100">
                    <div className="text-white">
                        <h5 className={`${styles.h5} mb-4`}>Page You Are Looking For Doesn't Exist</h5>
                    </div>
                </div>
            </div>
        </>

    )

}


export default Page404;