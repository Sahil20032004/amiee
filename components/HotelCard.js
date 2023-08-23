import { Slide } from 'react-slideshow-image';
import 'react-slideshow-image/dist/styles.css'
import picture from '../images/nopicture.jpg';
import AddIcon from '@mui/icons-material/Add';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import {Link} from 'react-router-dom';
import './HotelCard.css'
const HotelCard = ({ hotel }) => {
    return (
        <div>
            <div className="searchItem">
                <div className="md:w-2/6 h-full" >
                    {hotel.pictures.length < 1 ? (
                        <div className="h-60 md:-mr-[21.33px]">
                            <img src={picture} alt="Not available" className="w-full h-full object-fill" />
                        </div>
                    ) : (
                        <Slide duration={3000} transitionDuration={400} prevArrow={<ArrowBackIosNewIcon className="text-zinc-200" />} nextArrow={<ArrowForwardIosIcon className="text-zinc-200" />}>
                            {hotel.pictures.map((pic) => (
                                <div className="h-60" key={pic.public_id}>
                                    <img src={pic.url} alt={pic.public_id} className="w-full h-full object-cover" />
                                </div>
                            ))}
                        </Slide>
                    )}
                </div >
                <div className="siDesc">
                    <h1 className="siTitle">{hotel.name}</h1>
                    <span className="siDistance">{hotel.distance}m from center</span>
                    <div className="flex gap-4 flex-wrap mt-6">
                    {hotel.specification?.map((spec) => (
                        <div key={spec} className="py-2 px-3 bg-gray-100 rounded-lg">
                            <AddIcon className="mr-2" />
                            <span>{spec}</span>
                        </div>
                    ))}
                </div>
                    <span className="siSubtitle">
                    {hotel.description}
                    </span>
                    
                    <span className="siCancelOp">Free cancellation </span>
                    <span className="siCancelOpSubtitle">
                        You can cancel later, so lock in this great price today!
                    </span>
                </div>
                <div className="siDetails">
                    <div className="siRating">
                        <span>Excellent</span>
                        <button>8.9</button>
                    </div>
                    <div className="siDetailTexts">
                        <span className="siPrice">$112</span>
                        <span className="siTaxOp">Includes taxes and fees</span>
                        <Link to={`/hotel/${hotel._id}`}className="siCheckButton">See Availabilty</Link>
                    </div>
                </div>
            </div>
        </div >
    )
}
export default HotelCard;