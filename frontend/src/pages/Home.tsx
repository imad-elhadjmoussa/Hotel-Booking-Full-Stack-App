import HeroSection from '../components/Hero'
import NewestHotels from '../components/NewestHotels'
import NewestSection from '../components/NewestLetter'
import RecommendedHotels from '../components/RecommendedHotels'

const Home = () => {
    return (
        <div>
            <HeroSection />

            <div className=' pt-44 md:pt-24 '>
                <RecommendedHotels />
            </div>

            <div className=' py-10 '>
                <NewestHotels />
            </div>

            <div className=' py-10 '>
                <NewestSection />
            </div>
        </div>
    )
}

export default Home