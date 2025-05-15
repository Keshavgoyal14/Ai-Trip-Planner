import { MdOutlineAttachMoney,MdOutlineFamilyRestroom } from "react-icons/md";
import { TbMoneybag ,TbPigMoney } from "react-icons/tb";
import { GoPersonFill } from "react-icons/go";
import { GiLovers ,GiThreeFriends } from "react-icons/gi";

export const SelectTravelPlans=()=>[{
    id:1,
    title:'Solo',
    icon:<GoPersonFill />,
    desc:'sole travels to exploration',
    people:1,
},{
    id:2,
    title:'Couple',
    icon:<GiLovers/>,
    desc:"Travel with your partner",
    people:2,
},{
    id:3,
    title:"Family",
    icon:<MdOutlineFamilyRestroom/>,
    desc:'Travel with your family',
    people:'3-4',
},{
    id:4,
    title:"Friends",
    icon:<GiThreeFriends/>,
    desc:"Travel with your Friends",
    people:'5-10',
}]
export const SelectBudgetOption=()=>[
    {
        id:1,
        title:'Budget',
        desc:'Budget travel with basic amenities',
        icon:<TbPigMoney/>,
        budget:'$',
    },
    {
        id:2,
        title:'Standard',
        desc:'Standard travel with good amenities',
        icon:<MdOutlineAttachMoney />,
        budget:'$$',
    },
    {
        id:3,
        title:'Luxury',
        desc:'Luxury travel with best amenities',
        icon:<TbMoneybag/>,
        budget:'$$$',
    },
]
export const AI_PROMPT= 'Generate Travel Plan for Location : {location}, for {days} for {travel} with a {budget} budget , Give me a Hotels options list with HotelName, Hotel address, Price, hotel image url, geo coordinates, rating, descriptions and suggest itinerary with placeName, Place Details, Place Image Url, Geo Coordinates, ticket Pricing, rating, Time travel each of the location for {days} with each day plan with best time to visit in JSON format.'