import ScienceDetailPage from "../../../components/ScienceDetailPage";
import { sciencePillarsData } from "../../data/sciencePillarsData";

export default function GenomicEpigenomicInsightsPage() {
  const pillarData = sciencePillarsData["genomic-epigenomic-insights"];
  
  return (
    <ScienceDetailPage 
      pillarData={pillarData} 
      currentPage="genomic-epigenomic-insights" 
    />
  );
}
