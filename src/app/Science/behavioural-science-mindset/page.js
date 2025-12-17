import ScienceDetailPage from "../../../components/ScienceDetailPage";
import { sciencePillarsData } from "../../data/sciencePillarsData";

export default function BehaviouralScienceMindsetPage() {
  const pillarData = sciencePillarsData["behavioural-science-mindset"];
  
  return (
    <ScienceDetailPage 
      pillarData={pillarData} 
      currentPage="behavioural-science-mindset" 
    />
  );
}
