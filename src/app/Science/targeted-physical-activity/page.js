import ScienceDetailPage from "../../../components/ScienceDetailPage";
import { sciencePillarsData } from "../../data/sciencePillarsData";

export default function TargetedPhysicalActivityPage() {
  const pillarData = sciencePillarsData["targeted-physical-activity"];
  
  return (
    <ScienceDetailPage 
      pillarData={pillarData} 
      currentPage="targeted-physical-activity" 
    />
  );
}
