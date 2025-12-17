import ScienceDetailPage from "../../../components/ScienceDetailPage";
import { sciencePillarsData } from "../../data/sciencePillarsData";

export default function PhysiologicalBalancePage() {
  const pillarData = sciencePillarsData["physiological-balance"];
  
  return (
    <ScienceDetailPage 
      pillarData={pillarData} 
      currentPage="physiological-balance" 
    />
  );
}
