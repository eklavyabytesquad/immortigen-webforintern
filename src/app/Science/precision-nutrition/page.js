import ScienceDetailPage from "../../../components/ScienceDetailPage";
import { sciencePillarsData } from "../../data/sciencePillarsData";

export default function PrecisionNutritionPage() {
  const pillarData = sciencePillarsData["precision-nutrition"];
  
  return (
    <ScienceDetailPage 
      pillarData={pillarData} 
      currentPage="precision-nutrition" 
    />
  );
}
