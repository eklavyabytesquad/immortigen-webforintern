'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import ThreeDBodyPatient from './3dbody-patient'
import VitalsContent from './vitals-content'
import ReportsContent from './reports-content'
import PersonalInfoContent from './personal-info-content'
import BiomarkerChart from './biomarker-chart'
import PatientDropdown from './patient-dropdown'

export default function PatientDetailsContent({ patientId }) {
  const router = useRouter()
  const [activeTab, setActiveTab] = useState('Organ Health')
  const [selectedOrgan, setSelectedOrgan] = useState(null)
  const [selectedBiomarkerTab, setSelectedBiomarkerTab] = useState('Genetic markers')
  const [currentPatientId, setCurrentPatientId] = useState(patientId)

  // Dummy patient data - in real app, fetch based on patientId
  const patientData = {
    '0000001': {
      id: '0000001',
      name: 'Anika Joshi',
      age: 25,
      gender: 'Female',
      healthRisk: 'Low',
      lastUpdate: '3d ago',
      email: 'anika.joshi@example.com',
      phone: '+1 234 567 8900',
      address: '123 Main St, New York, NY 10001',
      bloodType: 'A+',
      height: '165 cm',
      weight: '58 kg'
    },
    '0000002': {
      id: '0000002',
      name: 'Priya Sharma',
      age: 25,
      gender: 'Female',
      healthRisk: 'Moderate',
      lastUpdate: '3d ago',
      email: 'priya.sharma@example.com',
      phone: '+1 234 567 8901',
      address: '456 Park Ave, New York, NY 10002',
      bloodType: 'B+',
      height: '162 cm',
      weight: '55 kg'
    },
    '0000003': {
      id: '0000003',
      name: 'Rohan Kumar',
      age: 25,
      gender: 'Male',
      healthRisk: 'Low',
      lastUpdate: '3d ago',
      email: 'rohan.kumar@example.com',
      phone: '+1 234 567 8902',
      address: '789 Broadway, New York, NY 10003',
      bloodType: 'O+',
      height: '175 cm',
      weight: '70 kg'
    },
    '0000004': {
      id: '0000004',
      name: 'Divya Patel',
      age: 25,
      gender: 'Female',
      healthRisk: 'Low',
      lastUpdate: '3d ago',
      email: 'divya.patel@example.com',
      phone: '+1 234 567 8903',
      address: '321 5th Ave, New York, NY 10004',
      bloodType: 'AB+',
      height: '160 cm',
      weight: '52 kg'
    },
    '0000005': {
      id: '0000005',
      name: 'Raj Malhotra',
      age: 25,
      gender: 'Male',
      healthRisk: 'Low',
      lastUpdate: '3d ago',
      email: 'raj.malhotra@example.com',
      phone: '+1 234 567 8904',
      address: '654 Madison Ave, New York, NY 10005',
      bloodType: 'A-',
      height: '178 cm',
      weight: '75 kg'
    },
    '0000006': {
      id: '0000006',
      name: 'Sneha Kapoor',
      age: 25,
      gender: 'Female',
      healthRisk: 'Low',
      lastUpdate: '3d ago',
      email: 'sneha.kapoor@example.com',
      phone: '+1 234 567 8905',
      address: '987 Lexington Ave, New York, NY 10006',
      bloodType: 'B-',
      height: '168 cm',
      weight: '60 kg'
    },
    '0000007': {
      id: '0000007',
      name: 'Arjun Reddy',
      age: 25,
      gender: 'Male',
      healthRisk: 'Low',
      lastUpdate: '3d ago',
      email: 'arjun.reddy@example.com',
      phone: '+1 234 567 8906',
      address: '147 Park Ave, New York, NY 10007',
      bloodType: 'O-',
      height: '180 cm',
      weight: '78 kg'
    }
  }

  const patient = patientData[currentPatientId] || patientData['0000001']

  const tabs = ['Organ Health', 'Vitals', 'Reports', 'Personal Information']

  // Get all patients for dropdown
  const allPatients = Object.values(patientData)

  // Handle patient change from dropdown
  const handlePatientChange = (newPatientId) => {
    setCurrentPatientId(newPatientId)
    setSelectedOrgan(null) // Reset organ selection when switching patients
    router.push(`/dashboard/patients/${newPatientId}`)
  }

  // Organ health data
  const organHealthData = [
    { name: 'Brain', status: 'Optimal', color: 'rgba(21, 182, 108, 1)', progress: 100, image: '/downloads/Brain.png' },
    { name: 'Thyroid', status: 'Optimal', color: 'rgba(21, 182, 108, 1)', progress: 100, image: '/downloads/Thyroid.png' },
    { name: 'Lungs', status: 'Optimal', color: 'rgba(21, 182, 108, 1)', progress: 100, image: '/downloads/Lungs.png' },
    { name: 'Heart', status: 'Need attention', color: 'rgba(255, 79, 69, 1)', progress: 30, image: '/downloads/heart.png' },
    { name: 'Gut', status: 'Optimal', color: 'rgba(21, 182, 108, 1)', progress: 100, image: '/downloads/Gut.png' },
    { name: 'Kidney', status: 'Optimal', color: 'rgba(21, 182, 108, 1)', progress: 100, image: '/downloads/Kidney.png' },
    { name: 'Stomach', status: 'Optimal', color: 'rgba(21, 182, 108, 1)', progress: 100, image: '/downloads/Stomach.png' },
    { name: 'Liver', status: 'Optimal', color: 'rgba(21, 182, 108, 1)', progress: 100, image: '/downloads/Liver.png' },
    { name: 'Bladder', status: 'Borderline', color: 'rgba(246, 155, 27, 1)', progress: 60, image: '/downloads/Bladder.png' },
    { name: 'Legs', status: 'Optimal', color: 'rgba(21, 182, 108, 1)', progress: 100, image: '/downloads/Legs.png' },
    { name: 'Blood', status: 'Optimal', color: 'rgba(21, 182, 108, 1)', progress: 100, image: '/downloads/Blood.png' },
    { name: 'Spleen', status: 'Optimal', color: 'rgba(21, 182, 108, 1)', progress: 100, image: '/downloads/Spleen.png' },
  ]

  // Genetic markers data for each organ
  const geneticMarkersData = {
    Brain: [
      { name: 'Dementia', status: 'Normal' },
      { name: 'Alzheimer\'s disease', status: 'Normal' },
      { name: 'Epilepsy', status: 'Normal' },
      { name: 'Narcolepsy', status: 'Normal' },
      { name: 'Multiple sclerosis', status: 'Normal' },
      { name: 'ADHD', status: 'Normal' },
      { name: 'Schizophrenia', status: 'Normal' },
      { name: 'Autism', status: 'Normal' },
      { name: 'Parkinson\'s disease', status: 'Normal' },
    ],
    Thyroid: [
      { name: 'Thyroid cancer', status: 'Normal' },
    ],
    Lungs: [
      { name: 'Lung Function (FVC)', status: 'Normal' },
      { name: 'Lung Function (FEV1/FVC)', status: 'Normal' },
      { name: 'Lung Function (FEV1)', status: 'Normal' },
      { name: 'Lung Cancer', status: 'Normal' },
      { name: 'Asthma', status: 'Normal' },
    ],
    Heart: [
      { name: 'HDL Cholesterol Levels', status: 'Low' },
      { name: 'Hypertension', status: 'High' },
      { name: 'Heart Failure', status: 'Normal' },
      { name: 'Coronary Artery Disease', status: 'Elevated' },
      { name: 'Atrial Fibrillation', status: 'Normal' },
      { name: 'Myocardial Infarction', status: 'Normal' },
      { name: 'Peripheral Artery Disease', status: 'Normal' },
      { name: 'Venous Thromboembolism', status: 'Normal' },
    ],
    Gut: [
      { name: 'C-reactive protein levels', status: 'Normal' },
      { name: 'Rheumatoid arthritis', status: 'Normal' },
      { name: 'Systemic lupus erythematosus', status: 'Normal' },
    ],
    Kidney: [
      { name: 'Chronic kidney disease', status: 'Normal' },
      { name: 'Glomerular filtration rate', status: 'Normal' },
    ],
    Stomach: [
      { name: 'CDH1 Gene', status: 'Normal' },
      { name: 'TP53 Gene', status: 'Normal' },
      { name: 'ARID1A Gene', status: 'Normal' },
      { name: 'MLH1 Gene', status: 'Normal' },
      { name: 'MUC6 Gene', status: 'Normal' },
    ],
    Liver: [
      { name: 'Nonalcoholic fatty liver disease', status: 'Normal' },
    ],
    Bladder: [
      { name: 'FGFR3 Gene', status: 'Borderline' },
      { name: 'TP53 Gene', status: 'Normal' },
      { name: 'RB1 Gene', status: 'Normal' },
      { name: 'HRAS Gene', status: 'Borderline' },
      { name: 'PIK3CA Gene', status: 'Normal' },
    ],
    Legs: [
      { name: 'Factor V Leiden', status: 'Normal' },
      { name: 'Prothrombin Gene', status: 'Normal' },
      { name: 'MTHFR Gene', status: 'Normal' },
      { name: 'PAI-1 Gene', status: 'Normal' },
      { name: 'ACE Gene', status: 'Normal' },
    ],
    Blood: [
      { name: 'HBB Gene', status: 'Normal' },
      { name: 'HBA Gene', status: 'Normal' },
      { name: 'G6PD Gene', status: 'Normal' },
      { name: 'Factor VIII Gene', status: 'Normal' },
      { name: 'Factor IX Gene', status: 'Normal' },
    ],
    Spleen: [
      { name: 'SPTA1 Gene', status: 'Normal' },
      { name: 'ANK1 Gene', status: 'Normal' },
      { name: 'SLC4A1 Gene', status: 'Normal' },
      { name: 'PIEZO1 Gene', status: 'Normal' },
      { name: 'JAK2 Gene', status: 'Normal' },
    ]
  }

  // Blood biomarkers for selected organ
  const biomarkersData = {
    Brain: [
      { name: 'Homocysteine', value: '9.5 μmol/L', status: 'Normal', range: '< 11 μmol/L' },
      { name: 'Vitamin B12', value: '485 pg/mL', status: 'Normal', range: '200-900 pg/mL' },
      { name: 'Vitamin B9 (Folate)', value: '12.5 ng/mL', status: 'Normal', range: '> 5.4 ng/mL' },
    ],
    Thyroid: [
      { name: 'T3', value: '120 ng/dL', status: 'Normal', range: '80-200 ng/dL' },
      { name: 'T4', value: '8.5 μg/dL', status: 'Normal', range: '5-12 μg/dL' },
      { name: 'Ultra sensitive TSH', value: '2.5 mIU/L', status: 'Normal', range: '0.4-4.0 mIU/L' },
      { name: 'T3/T4', value: '14.1', status: 'Normal', range: '10-25' },
    ],
    Lungs: [
      { name: 'hsCRP (High Sensitive CRP)', value: '1.2 mg/L', status: 'Normal', range: '< 3 mg/L' },
      { name: 'ESR (Erythrocyte Sedimentation Rate)', value: '18 mm/h', status: 'Normal', range: '< 20 mm/h' },
      { name: 'Hb (Hemoglobin)', value: '14.5 g/dL', status: 'Normal', range: '13.5-17.5 g/dL' },
    ],
    Heart: [
      { name: 'Cholesterol - Total, Serum', value: '220 mg/dL', status: 'High', range: '< 200 mg/dL' },
      { name: 'CHOL/HDL Ratio', value: '4.8', status: 'Elevated', range: '< 4.0' },
      { name: 'HDL Cholesterol Direct', value: '38 mg/dL', status: 'Low', range: '> 50 mg/dL' },
      { name: 'LDL Cholesterol - Calculated', value: '155 mg/dL', status: 'High', range: '< 100 mg/dL' },
      { name: 'LDL/HDL Ratio', value: '4.1', status: 'Elevated', range: '< 3.0' },
      { name: 'Non-HDL Cholesterol, Serum', value: '182 mg/dL', status: 'High', range: '< 130 mg/dL' },
      { name: 'Triglycerides, Serum', value: '185 mg/dL', status: 'Elevated', range: '< 150 mg/dL' },
      { name: 'VLDL', value: '37 mg/dL', status: 'Elevated', range: '< 30 mg/dL' },
      { name: 'Homocysteine', value: '12.5 μmol/L', status: 'Elevated', range: '< 11 μmol/L' },
      { name: 'HbA1c (Glycosylated Hemoglobin)', value: '5.8%', status: 'Borderline', range: '< 5.7%' },
      { name: 'Apo A1', value: '110 mg/dL', status: 'Low', range: '> 120 mg/dL' },
      { name: 'Apo B', value: '125 mg/dL', status: 'Elevated', range: '< 100 mg/dL' },
    ],
    Gut: [
      { name: 'hsCRP (High Sensitive CRP)', value: '1.8 mg/L', status: 'Normal', range: '< 3 mg/L' },
      { name: 'ESR (Erythrocyte Sedimentation Rate)', value: '15 mm/h', status: 'Normal', range: '< 20 mm/h' },
      { name: 'WBC - Total Counts Leucocytes', value: '7,200/μL', status: 'Normal', range: '4,000-11,000/μL' },
    ],
    Kidney: [
      { name: 'Blood Urea', value: '16 mg/dL', status: 'Normal', range: '7-20 mg/dL' },
      { name: 'BUN', value: '18 mg/dL', status: 'Normal', range: '7-20 mg/dL' },
      { name: 'BUN/Creatinine Ratio', value: '18', status: 'Normal', range: '10-20' },
      { name: 'Calcium', value: '9.2 mg/dL', status: 'Normal', range: '8.5-10.2 mg/dL' },
      { name: 'Chloride', value: '102 mEq/L', status: 'Normal', range: '96-106 mEq/L' },
      { name: 'Creatinine', value: '1.0 mg/dL', status: 'Normal', range: '0.7-1.3 mg/dL' },
      { name: 'eGFR', value: '95 mL/min', status: 'Normal', range: '> 90 mL/min' },
      { name: 'Phosphorus', value: '3.5 mg/dL', status: 'Normal', range: '2.5-4.5 mg/dL' },
      { name: 'Potassium', value: '4.2 mEq/L', status: 'Normal', range: '3.5-5.0 mEq/L' },
      { name: 'Sodium', value: '138 mEq/L', status: 'Normal', range: '135-145 mEq/L' },
      { name: 'Uric Acid', value: '5.8 mg/dL', status: 'Normal', range: '3.5-7.2 mg/dL' },
    ],
    Stomach: [
      { name: 'Pepsinogen I', value: '65 μg/L', status: 'Normal', range: '28-100 μg/L' },
      { name: 'Gastrin', value: '55 pg/mL', status: 'Normal', range: '< 100 pg/mL' },
      { name: 'H. pylori Antibodies', value: 'Negative', status: 'Normal', range: 'Negative' },
      { name: 'pH Level', value: '2.0', status: 'Normal', range: '1.5-3.5' },
    ],
    Liver: [
      { name: 'A/G Ratio', value: '1.8', status: 'Normal', range: '1.0-2.5' },
      { name: 'Albumin, Serum', value: '4.5 g/dL', status: 'Normal', range: '3.5-5.5 g/dL' },
      { name: 'Bilirubin Direct, Serum', value: '0.2 mg/dL', status: 'Normal', range: '0.0-0.3 mg/dL' },
      { name: 'Bilirubin - Indirect, Serum', value: '0.6 mg/dL', status: 'Normal', range: '0.0-0.9 mg/dL' },
      { name: 'Bilirubin Total, Serum', value: '0.8 mg/dL', status: 'Normal', range: '0.1-1.2 mg/dL' },
      { name: 'GGTP (Gamma GT)', value: '32 U/L', status: 'Normal', range: '9-48 U/L' },
      { name: 'Globulin', value: '2.5 g/dL', status: 'Normal', range: '2.3-3.5 g/dL' },
      { name: 'Proteins, Serum', value: '7.0 g/dL', status: 'Normal', range: '6.0-8.3 g/dL' },
      { name: 'SGOT/AST', value: '32 U/L', status: 'Normal', range: '10-40 U/L' },
      { name: 'SGOT/SGPT Ratio', value: '1.0', status: 'Normal', range: '0.5-1.5' },
      { name: 'SGPT/ALT', value: '28 U/L', status: 'Normal', range: '7-56 U/L' },
    ],
    Bladder: [
      { name: 'Specific Gravity', value: '1.025', status: 'Borderline', range: '1.005-1.030' },
      { name: 'pH', value: '6.5', status: 'Normal', range: '4.5-8.0' },
      { name: 'WBC Count', value: '5 cells/μL', status: 'Normal', range: '< 5 cells/μL' },
      { name: 'Bacteria', value: 'Few', status: 'Borderline', range: 'None' },
    ],
    Legs: [
      { name: 'D-Dimer', value: '0.3 μg/mL', status: 'Normal', range: '< 0.5 μg/mL' },
      { name: 'CK (Creatine Kinase)', value: '145 U/L', status: 'Normal', range: '30-200 U/L' },
      { name: 'Lactate', value: '1.2 mmol/L', status: 'Normal', range: '0.5-2.2 mmol/L' },
      { name: 'Blood Flow Index', value: 'Normal', status: 'Normal', range: 'Adequate' },
    ],
    Blood: [
      { name: 'Red Blood Cells', value: '5.2 million/μL', status: 'Normal', range: '4.5-5.5 million/μL' },
      { name: 'White Blood Cells', value: '7,500/μL', status: 'Normal', range: '4,000-11,000/μL' },
      { name: 'Hemoglobin', value: '14.8 g/dL', status: 'Normal', range: '13-17 g/dL' },
      { name: 'Platelets', value: '250,000/μL', status: 'Normal', range: '150,000-400,000/μL' },
      { name: 'Hematocrit', value: '45%', status: 'Normal', range: '38-50%' },
    ],
    Spleen: [
      { name: 'Spleen Size', value: '12 cm', status: 'Normal', range: '8-13 cm' },
      { name: 'Platelet Count', value: '250,000/μL', status: 'Normal', range: '150,000-400,000/μL' },
      { name: 'White Blood Cells', value: '7,200/μL', status: 'Normal', range: '4,000-11,000/μL' },
      { name: 'Lymphocytes', value: '30%', status: 'Normal', range: '20-40%' },
      { name: 'Monocytes', value: '8%', status: 'Normal', range: '2-10%' },
    ]
  }

  // Protein markers data for each organ
  const proteinMarkersData = {
    Brain: [
      { name: 'ACE2', value: '35 ng/mL', status: 'Normal', range: '< 45 ng/mL' },
      { name: 'AHNAK', value: '125 ng/mL', status: 'Normal', range: '< 150 ng/mL' },
      { name: 'APBB1IP', value: '48 pg/mL', status: 'Normal', range: '< 60 pg/mL' },
      { name: 'BACE1', value: '22 U/L', status: 'Normal', range: '< 30 U/L' },
      { name: 'CEMIP2', value: '38 ng/mL', status: 'Normal', range: '< 50 ng/mL' },
      { name: 'CD33', value: '65 pg/mL', status: 'Normal', range: '< 80 pg/mL' },
      { name: 'CTF1', value: '95 ng/mL', status: 'Normal', range: '< 120 ng/mL' },
      { name: 'CHRM1', value: '72 ng/mL', status: 'Normal', range: '< 85 ng/mL' },
      { name: 'CHRM3', value: '58 pg/mL', status: 'Normal', range: '< 70 pg/mL' },
      { name: 'DNAJC6', value: '42 ng/mL', status: 'Normal', range: '< 55 ng/mL' },
      { name: 'ERBB4', value: '52 pg/mL', status: 'Normal', range: '< 65 pg/mL' },
      { name: 'GALNT10', value: '68 ng/mL', status: 'Normal', range: '< 80 ng/mL' },
      { name: 'GALNT2', value: '85 ng/mL', status: 'Normal', range: '< 100 ng/mL' },
      { name: 'GALNT3', value: '78 ng/mL', status: 'Normal', range: '< 95 ng/mL' },
      { name: 'GAP43', value: '215 ng/mL', status: 'Normal', range: '< 250 ng/mL' },
      { name: 'GCNT1', value: '35 U/L', status: 'Normal', range: '< 45 U/L' },
      { name: 'GDNF', value: '128 pg/mL', status: 'Normal', range: '< 150 pg/mL' },
      { name: 'GFAP', value: '65 ng/L', status: 'Normal', range: '< 100 ng/L' },
      { name: 'HDAC5', value: '125 U/L', status: 'Normal', range: '< 150 U/L' },
      { name: 'HDAC9', value: '145 U/L', status: 'Normal', range: '< 170 U/L' },
      { name: 'LRRN1', value: '48 ng/mL', status: 'Normal', range: '< 60 ng/mL' },
      { name: 'MAPT', value: '185 pg/mL', status: 'Normal', range: '< 250 pg/mL' },
      { name: 'NBEAL2', value: '55 ng/mL', status: 'Normal', range: '< 70 ng/mL' },
      { name: 'NCAN', value: '92 ng/mL', status: 'Normal', range: '< 110 ng/mL' },
      { name: 'NCS1', value: '38 pg/mL', status: 'Normal', range: '< 50 pg/mL' },
      { name: 'NEFL', value: '12 pg/mL', status: 'Normal', range: '< 20 pg/mL' },
      { name: 'NLGN1', value: '68 ng/mL', status: 'Normal', range: '< 85 ng/mL' },
      { name: 'NPTXR', value: '45 ng/mL', status: 'Normal', range: '< 60 ng/mL' },
      { name: 'NPY', value: '125 pg/mL', status: 'Normal', range: '< 150 pg/mL' },
      { name: 'NTF3', value: '32 ng/mL', status: 'Normal', range: '< 45 ng/mL' },
      { name: 'PTRN2', value: '58 ng/mL', status: 'Normal', range: '< 75 ng/mL' },
      { name: 'PTPRR', value: '42 U/L', status: 'Normal', range: '< 55 U/L' },
      { name: 'PTPRZ1', value: '85 ng/mL', status: 'Normal', range: '< 105 ng/mL' },
      { name: 'PRTG', value: '35 pg/mL', status: 'Normal', range: '< 50 pg/mL' },
      { name: 'PTGES2', value: '48 pg/mL', status: 'Normal', range: '< 60 pg/mL' },
      { name: 'RET', value: '32 ng/mL', status: 'Normal', range: '< 45 ng/mL' },
      { name: 'RYK', value: '55 ng/mL', status: 'Normal', range: '< 70 ng/mL' },
      { name: 'SIRT1', value: '125 U/L', status: 'Normal', range: '< 150 U/L' },
      { name: 'SIRT2', value: '95 U/L', status: 'Normal', range: '< 120 U/L' },
      { name: 'SNAP25', value: '185 ng/mL', status: 'Normal', range: '< 220 ng/mL' },
      { name: 'SNCG', value: '42 ng/mL', status: 'Normal', range: '< 60 ng/mL' },
      { name: 'ST3GAL1', value: '68 U/L', status: 'Normal', range: '< 85 U/L' },
      { name: 'SYT1', value: '125 ng/mL', status: 'Normal', range: '< 150 ng/mL' },
      { name: 'VGF', value: '165 pg/mL', status: 'Normal', range: '< 200 pg/mL' },
    ],
    Thyroid: [
      { name: 'ATG16L1', value: '52 ng/mL', status: 'Normal', range: '< 65 ng/mL' },
      { name: 'CTSH', value: '32 U/L', status: 'Normal', range: '< 40 U/L' },
      { name: 'ITGA11', value: '42 ng/mL', status: 'Normal', range: '< 50 ng/mL' },
      { name: 'ITGAL', value: '55 pg/mL', status: 'Normal', range: '< 65 pg/mL' },
      { name: 'ITGAV', value: '85 ng/mL', status: 'Normal', range: '< 100 ng/mL' },
      { name: 'ITGB1BP2', value: '48 ng/mL', status: 'Normal', range: '< 60 ng/mL' },
      { name: 'ITGB6', value: '48 ng/mL', status: 'Normal', range: '< 60 ng/mL' },
      { name: 'ITGB7', value: '72 ng/mL', status: 'Normal', range: '< 85 ng/mL' },
      { name: 'PRTG', value: '35 pg/mL', status: 'Normal', range: '< 50 pg/mL' },
      { name: 'PTGES2', value: '48 pg/mL', status: 'Normal', range: '< 60 pg/mL' },
      { name: 'PTH', value: '65 pg/mL', status: 'Normal', range: '12-88 pg/mL' },
      { name: 'PTH1R', value: '72 ng/mL', status: 'Normal', range: '< 85 ng/mL' },
      { name: 'RET', value: '32 ng/mL', status: 'Normal', range: '< 45 ng/mL' },
      { name: 'TAB2', value: '52 ng/mL', status: 'Normal', range: '< 65 ng/mL' },
      { name: 'TG', value: '25 ng/mL', status: 'Normal', range: '1.4-78 ng/mL' },
      { name: 'TGFA', value: '52 pg/mL', status: 'Normal', range: '< 65 pg/mL' },
      { name: 'TGFB1', value: '125 pg/mL', status: 'Normal', range: '< 150 pg/mL' },
      { name: 'TGFBR1', value: '78 ng/mL', status: 'Normal', range: '< 90 ng/mL' },
      { name: 'TRIP11', value: '42 ng/mL', status: 'Normal', range: '< 55 ng/mL' },
    ],
    Lungs: [
      { name: 'ACE2', value: '38 ng/mL', status: 'Normal', range: '< 45 ng/mL' },
      { name: 'BMP4', value: '215 pg/mL', status: 'Normal', range: '< 250 pg/mL' },
      { name: 'BTC', value: '52 ng/mL', status: 'Normal', range: '< 60 ng/mL' },
      { name: 'BTN3A2', value: '45 pg/mL', status: 'Normal', range: '< 55 pg/mL' },
      { name: 'CSF2', value: '28 pg/mL', status: 'Normal', range: '< 35 pg/mL' },
      { name: 'CHRM1', value: '68 ng/mL', status: 'Normal', range: '< 75 ng/mL' },
      { name: 'CTSH', value: '32 U/L', status: 'Normal', range: '< 40 U/L' },
      { name: 'ITGAV', value: '85 ng/mL', status: 'Normal', range: '< 100 ng/mL' },
      { name: 'ITGA11', value: '42 ng/mL', status: 'Normal', range: '< 50 ng/mL' },
      { name: 'ITGAL', value: '55 pg/mL', status: 'Normal', range: '< 65 pg/mL' },
      { name: 'ITGB6', value: '48 ng/mL', status: 'Normal', range: '< 60 ng/mL' },
      { name: 'ITGB7', value: '72 ng/mL', status: 'Normal', range: '< 85 ng/mL' },
      { name: 'MUC13', value: '125 ng/mL', status: 'Normal', range: '< 150 ng/mL' },
      { name: 'MUC16', value: '95 U/mL', status: 'Normal', range: '< 110 U/mL' },
      { name: 'MUC20', value: '58 pg/mL', status: 'Normal', range: '< 70 pg/mL' },
      { name: 'PLA2G10', value: '18 ng/mL', status: 'Normal', range: '< 25 ng/mL' },
      { name: 'PTGES2', value: '45 pg/mL', status: 'Normal', range: '< 55 pg/mL' },
      { name: 'RET', value: '32 ng/mL', status: 'Normal', range: '< 40 ng/mL' },
      { name: 'SFTPA2', value: '78 ng/mL', status: 'Normal', range: '< 90 ng/mL' },
      { name: 'TGFA', value: '52 pg/mL', status: 'Normal', range: '< 65 pg/mL' },
      { name: 'TGFB1', value: '125 pg/mL', status: 'Normal', range: '< 150 pg/mL' },
    ],
    Heart: [
      { name: 'ACE2', value: '42 ng/mL', status: 'Elevated', range: '< 35 ng/mL' },
      { name: 'BMP4', value: '285 pg/mL', status: 'High', range: '< 250 pg/mL' },
      { name: 'CTF1', value: '125 ng/mL', status: 'Elevated', range: '< 100 ng/mL' },
      { name: 'ERBB4', value: '58 pg/mL', status: 'Elevated', range: '< 50 pg/mL' },
      { name: 'GALNT10', value: '72 ng/mL', status: 'High', range: '< 60 ng/mL' },
      { name: 'GALNT2', value: '95 ng/mL', status: 'Elevated', range: '< 80 ng/mL' },
      { name: 'GALNT3', value: '88 ng/mL', status: 'Elevated', range: '< 70 ng/mL' },
      { name: 'HDAC5', value: '145 U/L', status: 'High', range: '< 120 U/L' },
      { name: 'HDAC9', value: '165 U/L', status: 'High', range: '< 140 U/L' },
    ],
    Gut: [
      { name: 'APBB1IP', value: '48 pg/mL', status: 'Normal', range: '< 60 pg/mL' },
      { name: 'ATG16L1', value: '52 ng/mL', status: 'Normal', range: '< 65 ng/mL' },
      { name: 'BTN3A2', value: '45 pg/mL', status: 'Normal', range: '< 55 pg/mL' },
      { name: 'B3GNT7', value: '38 U/L', status: 'Normal', range: '< 50 U/L' },
      { name: 'BTNL9', value: '42 ng/mL', status: 'Normal', range: '< 55 ng/mL' },
      { name: 'C1QA', value: '125 μg/mL', status: 'Normal', range: '< 150 μg/mL' },
      { name: 'C1QL2', value: '68 ng/mL', status: 'Normal', range: '< 85 ng/mL' },
      { name: 'C1QTNF6', value: '55 pg/mL', status: 'Normal', range: '< 70 pg/mL' },
      { name: 'CCL11', value: '15 pg/mL', status: 'Normal', range: '< 25 pg/mL' },
      { name: 'CCL19', value: '28 pg/mL', status: 'Normal', range: '< 40 pg/mL' },
      { name: 'CCL2', value: '22 pg/mL', status: 'Normal', range: '< 35 pg/mL' },
      { name: 'CCL20', value: '18 pg/mL', status: 'Normal', range: '< 30 pg/mL' },
      { name: 'CCL23', value: '12 pg/mL', status: 'Normal', range: '< 20 pg/mL' },
      { name: 'CCL25', value: '32 pg/mL', status: 'Normal', range: '< 45 pg/mL' },
      { name: 'CCL26', value: '25 pg/mL', status: 'Normal', range: '< 35 pg/mL' },
      { name: 'CCL28', value: '35 pg/mL', status: 'Normal', range: '< 50 pg/mL' },
      { name: 'CCL3', value: '28 pg/mL', status: 'Normal', range: '< 40 pg/mL' },
      { name: 'CCL4', value: '32 pg/mL', status: 'Normal', range: '< 45 pg/mL' },
      { name: 'CCL7', value: '24 pg/mL', status: 'Normal', range: '< 35 pg/mL' },
      { name: 'CCL8', value: '20 pg/mL', status: 'Normal', range: '< 30 pg/mL' },
      { name: 'CD101', value: '85 ng/mL', status: 'Normal', range: '< 100 ng/mL' },
      { name: 'CD160', value: '72 pg/mL', status: 'Normal', range: '< 85 pg/mL' },
      { name: 'CD200', value: '95 ng/mL', status: 'Normal', range: '< 110 ng/mL' },
      { name: 'CD200R1', value: '68 ng/mL', status: 'Normal', range: '< 80 ng/mL' },
      { name: 'CD207', value: '42 ng/mL', status: 'Normal', range: '< 55 ng/mL' },
      { name: 'CD22', value: '58 ng/mL', status: 'Normal', range: '< 70 ng/mL' },
      { name: 'CD226', value: '75 ng/mL', status: 'Normal', range: '< 90 ng/mL' },
      { name: 'CD244', value: '52 ng/mL', status: 'Normal', range: '< 65 ng/mL' },
      { name: 'CD274', value: '38 ng/mL', status: 'Normal', range: '< 50 ng/mL' },
      { name: 'CD28', value: '85 ng/mL', status: 'Normal', range: '< 100 ng/mL' },
      { name: 'CD300E', value: '45 ng/mL', status: 'Normal', range: '< 60 ng/mL' },
      { name: 'CD300LB', value: '52 ng/mL', status: 'Normal', range: '< 65 ng/mL' },
      { name: 'CD302', value: '48 ng/mL', status: 'Normal', range: '< 60 ng/mL' },
      { name: 'CD33', value: '65 pg/mL', status: 'Normal', range: '< 80 pg/mL' },
      { name: 'CD38', value: '72 ng/mL', status: 'Normal', range: '< 85 ng/mL' },
      { name: 'CD4', value: '950/μL', status: 'Normal', range: '500-1500/μL' },
      { name: 'CD40LG', value: '85 pg/mL', status: 'Normal', range: '< 100 pg/mL' },
      { name: 'CD5', value: '78 ng/mL', status: 'Normal', range: '< 90 ng/mL' },
      { name: 'CD6', value: '62 ng/mL', status: 'Normal', range: '< 75 ng/mL' },
      { name: 'CD63', value: '48 ng/mL', status: 'Normal', range: '< 60 ng/mL' },
      { name: 'CD7', value: '88 ng/mL', status: 'Normal', range: '< 100 ng/mL' },
      { name: 'CD70', value: '32 ng/mL', status: 'Normal', range: '< 45 ng/mL' },
      { name: 'CD79B', value: '55 ng/mL', status: 'Normal', range: '< 70 ng/mL' },
      { name: 'CD83', value: '42 ng/mL', status: 'Normal', range: '< 55 ng/mL' },
      { name: 'CD84', value: '58 ng/mL', status: 'Normal', range: '< 70 ng/mL' },
      { name: 'CD86', value: '75 ng/mL', status: 'Normal', range: '< 90 ng/mL' },
      { name: 'CSF1', value: '125 pg/mL', status: 'Normal', range: '< 150 pg/mL' },
      { name: 'CSF2', value: '28 pg/mL', status: 'Normal', range: '< 35 pg/mL' },
      { name: 'CSF3', value: '95 pg/mL', status: 'Normal', range: '< 110 pg/mL' },
      { name: 'CSF2RB', value: '48 ng/mL', status: 'Normal', range: '< 60 ng/mL' },
      { name: 'CXCL1', value: '22 pg/mL', status: 'Normal', range: '< 35 pg/mL' },
      { name: 'CXCL10', value: '85 pg/mL', status: 'Normal', range: '< 100 pg/mL' },
      { name: 'CXCL11', value: '72 pg/mL', status: 'Normal', range: '< 85 pg/mL' },
      { name: 'CXCL12', value: '38 pg/mL', status: 'Normal', range: '< 50 pg/mL' },
      { name: 'CXCL17', value: '28 pg/mL', status: 'Normal', range: '< 40 pg/mL' },
      { name: 'CXCL6', value: '32 pg/mL', status: 'Normal', range: '< 45 pg/mL' },
      { name: 'CXCL8', value: '18 pg/mL', status: 'Normal', range: '< 30 pg/mL' },
      { name: 'CXCL9', value: '42 pg/mL', status: 'Normal', range: '< 55 pg/mL' },
      { name: 'DAPP1', value: '52 ng/mL', status: 'Normal', range: '< 65 ng/mL' },
      { name: 'EBI3_IL27', value: '48 ng/mL', status: 'Normal', range: '< 60 ng/mL' },
      { name: 'FCAR', value: '65 ng/mL', status: 'Normal', range: '< 80 ng/mL' },
      { name: 'FCER1A', value: '78 ng/mL', status: 'Normal', range: '< 90 ng/mL' },
      { name: 'FLT3LG', value: '35 pg/mL', status: 'Normal', range: '< 50 pg/mL' },
      { name: 'GALNT10', value: '68 ng/mL', status: 'Normal', range: '< 80 ng/mL' },
      { name: 'GALNT2', value: '85 ng/mL', status: 'Normal', range: '< 100 ng/mL' },
      { name: 'GALNT3', value: '78 ng/mL', status: 'Normal', range: '< 95 ng/mL' },
      { name: 'GCNT1', value: '35 U/L', status: 'Normal', range: '< 45 U/L' },
      { name: 'GPA33', value: '52 ng/mL', status: 'Normal', range: '< 65 ng/mL' },
      { name: 'IFNAR1', value: '88 ng/mL', status: 'Normal', range: '< 100 ng/mL' },
      { name: 'IFNB1', value: '42 pg/mL', status: 'Normal', range: '< 55 pg/mL' },
      { name: 'IFNG', value: '58 pg/mL', status: 'Normal', range: '< 70 pg/mL' },
      { name: 'IFNGR1', value: '72 ng/mL', status: 'Normal', range: '< 85 ng/mL' },
      { name: 'IFNGR2', value: '65 ng/mL', status: 'Normal', range: '< 80 ng/mL' },
      { name: 'IFNL4', value: '38 pg/mL', status: 'Normal', range: '< 50 pg/mL' },
      { name: 'IFNLR1', value: '48 ng/mL', status: 'Normal', range: '< 60 ng/mL' },
      { name: 'IGBP1', value: '52 ng/mL', status: 'Normal', range: '< 65 ng/mL' },
      { name: 'IGSF3', value: '45 ng/mL', status: 'Normal', range: '< 60 ng/mL' },
      { name: 'IL10', value: '35 pg/mL', status: 'Normal', range: '< 50 pg/mL' },
      { name: 'IL10RA', value: '68 ng/mL', status: 'Normal', range: '< 80 ng/mL' },
      { name: 'IL11', value: '28 pg/mL', status: 'Normal', range: '< 40 pg/mL' },
      { name: 'IL11RA', value: '52 ng/mL', status: 'Normal', range: '< 65 ng/mL' },
      { name: 'IL12A_IL12B', value: '45 pg/mL', status: 'Normal', range: '< 60 pg/mL' },
      { name: 'IL12B', value: '32 pg/mL', status: 'Normal', range: '< 45 pg/mL' },
      { name: 'IL12RB1', value: '88 ng/mL', status: 'Normal', range: '< 100 ng/mL' },
      { name: 'IL13', value: '18 pg/mL', status: 'Normal', range: '< 30 pg/mL' },
      { name: 'IL15', value: '42 pg/mL', status: 'Normal', range: '< 55 pg/mL' },
      { name: 'IL15RA', value: '62 ng/mL', status: 'Normal', range: '< 75 ng/mL' },
      { name: 'IL16', value: '35 pg/mL', status: 'Normal', range: '< 50 pg/mL' },
      { name: 'IL17A', value: '22 pg/mL', status: 'Normal', range: '< 35 pg/mL' },
      { name: 'IL17C', value: '18 pg/mL', status: 'Normal', range: '< 30 pg/mL' },
      { name: 'IL17D', value: '15 pg/mL', status: 'Normal', range: '< 25 pg/mL' },
      { name: 'IL17F', value: '28 pg/mL', status: 'Normal', range: '< 40 pg/mL' },
      { name: 'IL17RB', value: '52 ng/mL', status: 'Normal', range: '< 65 ng/mL' },
      { name: 'IL18', value: '65 pg/mL', status: 'Normal', range: '< 80 pg/mL' },
      { name: 'IL18R1', value: '78 ng/mL', status: 'Normal', range: '< 90 ng/mL' },
      { name: 'IL18RAP', value: '48 ng/mL', status: 'Normal', range: '< 60 ng/mL' },
      { name: 'IL1A', value: '32 pg/mL', status: 'Normal', range: '< 45 pg/mL' },
      { name: 'IL1B', value: '38 pg/mL', status: 'Normal', range: '< 50 pg/mL' },
      { name: 'IL1RL2', value: '25 pg/mL', status: 'Normal', range: '< 40 pg/mL' },
      { name: 'IL2', value: '28 pg/mL', status: 'Normal', range: '< 40 pg/mL' },
      { name: 'IL20', value: '35 pg/mL', status: 'Normal', range: '< 50 pg/mL' },
      { name: 'IL20RA', value: '62 ng/mL', status: 'Normal', range: '< 75 ng/mL' },
      { name: 'IL22', value: '18 pg/mL', status: 'Normal', range: '< 30 pg/mL' },
      { name: 'IL22RA1', value: '52 ng/mL', status: 'Normal', range: '< 65 ng/mL' },
      { name: 'IL23R', value: '45 ng/mL', status: 'Normal', range: '< 60 ng/mL' },
      { name: 'IL2RB', value: '68 ng/mL', status: 'Normal', range: '< 80 ng/mL' },
      { name: 'IL31RA', value: '55 ng/mL', status: 'Normal', range: '< 70 ng/mL' },
      { name: 'IL32', value: '42 pg/mL', status: 'Normal', range: '< 55 pg/mL' },
      { name: 'IL33', value: '38 pg/mL', status: 'Normal', range: '< 50 pg/mL' },
      { name: 'IL36B', value: '22 pg/mL', status: 'Normal', range: '< 35 pg/mL' },
      { name: 'IL36G', value: '18 pg/mL', status: 'Normal', range: '< 30 pg/mL' },
      { name: 'IL3RA', value: '65 ng/mL', status: 'Normal', range: '< 80 ng/mL' },
      { name: 'IL4', value: '28 pg/mL', status: 'Normal', range: '< 40 pg/mL' },
      { name: 'IL4R', value: '82 ng/mL', status: 'Normal', range: '< 95 ng/mL' },
      { name: 'IL5RA', value: '52 ng/mL', status: 'Normal', range: '< 65 ng/mL' },
      { name: 'IL6', value: '15 pg/mL', status: 'Normal', range: '< 25 pg/mL' },
      { name: 'IL7', value: '22 pg/mL', status: 'Normal', range: '< 35 pg/mL' },
      { name: 'IL9', value: '18 pg/mL', status: 'Normal', range: '< 30 pg/mL' },
      { name: 'IRAK1', value: '72 ng/mL', status: 'Normal', range: '< 85 ng/mL' },
      { name: 'IRAK1BP1', value: '48 ng/mL', status: 'Normal', range: '< 60 ng/mL' },
      { name: 'IRAK4', value: '58 ng/mL', status: 'Normal', range: '< 70 ng/mL' },
      { name: 'KIR2DL2_KIR2DL3', value: '62 ng/mL', status: 'Normal', range: '< 75 ng/mL' },
      { name: 'KIR3DL1', value: '52 ng/mL', status: 'Normal', range: '< 65 ng/mL' },
      { name: 'KLRD1', value: '78 ng/mL', status: 'Normal', range: '< 90 ng/mL' },
      { name: 'LAIR2', value: '42 ng/mL', status: 'Normal', range: '< 55 ng/mL' },
      { name: 'LILRB4', value: '65 ng/mL', status: 'Normal', range: '< 80 ng/mL' },
      { name: 'LRIG1', value: '48 ng/mL', status: 'Normal', range: '< 60 ng/mL' },
      { name: 'LY9', value: '72 ng/mL', status: 'Normal', range: '< 85 ng/mL' },
      { name: 'MS4A1', value: '58 ng/mL', status: 'Normal', range: '< 70 ng/mL' },
      { name: 'MUC20NCR1', value: '35 ng/mL', status: 'Normal', range: '< 50 ng/mL' },
      { name: 'NCR3', value: '45 ng/mL', status: 'Normal', range: '< 60 ng/mL' },
      { name: 'NCR3LG1', value: '52 ng/mL', status: 'Normal', range: '< 65 ng/mL' },
      { name: 'NUDCD3', value: '38 ng/mL', status: 'Normal', range: '< 50 ng/mL' },
      { name: 'OCLN', value: '125 ng/mL', status: 'Normal', range: '< 150 ng/mL' },
      { name: 'PDCD1', value: '42 ng/mL', status: 'Normal', range: '< 55 ng/mL' },
      { name: 'PDCD1LG2', value: '58 ng/mL', status: 'Normal', range: '< 70 ng/mL' },
      { name: 'PLA2G10', value: '18 ng/mL', status: 'Normal', range: '< 25 ng/mL' },
      { name: 'PTGES2', value: '48 pg/mL', status: 'Normal', range: '< 60 pg/mL' },
      { name: 'ST3GAL1', value: '68 U/L', status: 'Normal', range: '< 85 U/L' },
      { name: 'TAB2TAFA5', value: '52 ng/mL', status: 'Normal', range: '< 65 ng/mL' },
      { name: 'TNF', value: '32 pg/mL', status: 'Normal', range: '< 45 pg/mL' },
      { name: 'TNFAIP6', value: '42 ng/mL', status: 'Normal', range: '< 55 ng/mL' },
      { name: 'TNFAIP8', value: '38 ng/mL', status: 'Normal', range: '< 50 ng/mL' },
      { name: 'TNFRSF10A', value: '65 ng/mL', status: 'Normal', range: '< 80 ng/mL' },
      { name: 'TNFRSF10B', value: '72 ng/mL', status: 'Normal', range: '< 85 ng/mL' },
      { name: 'TNFRSF11A', value: '48 ng/mL', status: 'Normal', range: '< 60 ng/mL' },
      { name: 'TNFRSF11B', value: '85 ng/mL', status: 'Normal', range: '< 100 ng/mL' },
      { name: 'TNFRSF13B', value: '52 ng/mL', status: 'Normal', range: '< 65 ng/mL' },
      { name: 'TNFRSF13C', value: '58 ng/mL', status: 'Normal', range: '< 70 ng/mL' },
      { name: 'TNFRSF19', value: '42 ng/mL', status: 'Normal', range: '< 55 ng/mL' },
      { name: 'TNFRSF6B', value: '68 ng/mL', status: 'Normal', range: '< 80 ng/mL' },
      { name: 'TNFRSF9', value: '62 ng/mL', status: 'Normal', range: '< 75 ng/mL' },
      { name: 'TNFSF11', value: '38 pg/mL', status: 'Normal', range: '< 50 pg/mL' },
      { name: 'TNFSF12', value: '28 pg/mL', status: 'Normal', range: '< 40 pg/mL' },
      { name: 'TNFSF13', value: '32 pg/mL', status: 'Normal', range: '< 45 pg/mL' },
      { name: 'TNFSF14', value: '25 pg/mL', status: 'Normal', range: '< 35 pg/mL' },
      { name: 'TNFSF15', value: '35 pg/mL', status: 'Normal', range: '< 50 pg/mL' },
      { name: 'TNIP1', value: '52 ng/mL', status: 'Normal', range: '< 65 ng/mL' },
      { name: 'UNG', value: '42 U/L', status: 'Normal', range: '< 55 U/L' },
      { name: 'VSIG10L', value: '48 ng/mL', status: 'Normal', range: '< 60 ng/mL' },
    ],
    Kidney: [
      { name: 'ACE2', value: '38 ng/mL', status: 'Normal', range: '< 45 ng/mL' },
      { name: 'CTSH', value: '32 U/L', status: 'Normal', range: '< 40 U/L' },
      { name: 'CST5', value: '28 ng/mL', status: 'Normal', range: '< 40 ng/mL' },
      { name: 'GAP43', value: '215 ng/mL', status: 'Normal', range: '< 250 ng/mL' },
      { name: 'FOLH1', value: '52 ng/mL', status: 'Normal', range: '< 65 ng/mL' },
      { name: 'GDNF', value: '128 pg/mL', status: 'Normal', range: '< 150 pg/mL' },
      { name: 'MUC13', value: '125 ng/mL', status: 'Normal', range: '< 150 ng/mL' },
      { name: 'MUC20', value: '58 pg/mL', status: 'Normal', range: '< 70 pg/mL' },
      { name: 'MYO1E', value: '42 ng/mL', status: 'Normal', range: '< 55 ng/mL' },
      { name: 'MYO9B', value: '48 ng/mL', status: 'Normal', range: '< 60 ng/mL' },
      { name: 'RET', value: '32 ng/mL', status: 'Normal', range: '< 45 ng/mL' },
      { name: 'RYK', value: '55 ng/mL', status: 'Normal', range: '< 70 ng/mL' },
      { name: 'TGFA', value: '52 pg/mL', status: 'Normal', range: '< 65 pg/mL' },
      { name: 'TGFB1', value: '125 pg/mL', status: 'Normal', range: '< 150 pg/mL' },
    ],
    Stomach: [
      { name: 'Pepsinogen I/II Ratio', value: '4.2', status: 'Normal', range: '> 3.0' },
      { name: 'Gastrin-17', value: '8 pmol/L', status: 'Normal', range: '< 15 pmol/L' },
      { name: 'H. pylori IgG', value: 'Negative', status: 'Normal', range: 'Negative' },
      { name: 'Ghrelin', value: '650 pg/mL', status: 'Normal', range: '150-1500 pg/mL' },
      { name: 'GLP-1', value: '35 pmol/L', status: 'Normal', range: '< 50 pmol/L' },
    ],
    Liver: [
      { name: 'ABL1', value: '65 ng/mL', status: 'Normal', range: '< 80 ng/mL' },
      { name: 'ACP1', value: '32 U/L', status: 'Normal', range: '< 45 U/L' },
      { name: 'ACP3', value: '28 U/L', status: 'Normal', range: '< 40 U/L' },
      { name: 'ACP6', value: '35 U/L', status: 'Normal', range: '< 50 U/L' },
      { name: 'AHNAK', value: '125 ng/mL', status: 'Normal', range: '< 150 ng/mL' },
      { name: 'CAST', value: '48 ng/mL', status: 'Normal', range: '< 60 ng/mL' },
      { name: 'CDCP1', value: '52 ng/mL', status: 'Normal', range: '< 65 ng/mL' },
      { name: 'CEBPA', value: '72 ng/mL', status: 'Normal', range: '< 85 ng/mL' },
      { name: 'CEBPB', value: '65 ng/mL', status: 'Normal', range: '< 80 ng/mL' },
      { name: 'CPE', value: '42 ng/mL', status: 'Normal', range: '< 55 ng/mL' },
      { name: 'CPVL', value: '38 ng/mL', status: 'Normal', range: '< 50 ng/mL' },
      { name: 'CTF1', value: '95 ng/mL', status: 'Normal', range: '< 120 ng/mL' },
      { name: 'DAPP1', value: '52 ng/mL', status: 'Normal', range: '< 65 ng/mL' },
      { name: 'DCPS', value: '35 U/L', status: 'Normal', range: '< 50 U/L' },
      { name: 'FGF19', value: '28 pg/mL', status: 'Normal', range: '< 40 pg/mL' },
      { name: 'FGF2', value: '35 pg/mL', status: 'Normal', range: '< 50 pg/mL' },
      { name: 'FGF21', value: '32 pg/mL', status: 'Normal', range: '< 45 pg/mL' },
      { name: 'FGF23', value: '42 pg/mL', status: 'Normal', range: '< 55 pg/mL' },
      { name: 'FGF5', value: '25 pg/mL', status: 'Normal', range: '< 35 pg/mL' },
      { name: 'FGFBP3', value: '48 ng/mL', status: 'Normal', range: '< 60 ng/mL' },
      { name: 'GRP', value: '38 pg/mL', status: 'Normal', range: '< 50 pg/mL' },
      { name: 'GALNT10', value: '68 ng/mL', status: 'Normal', range: '< 80 ng/mL' },
      { name: 'GALNT2', value: '85 ng/mL', status: 'Normal', range: '< 100 ng/mL' },
      { name: 'GALNT3', value: '78 ng/mL', status: 'Normal', range: '< 95 ng/mL' },
      { name: 'LIPF', value: '52 U/L', status: 'Normal', range: '< 65 U/L' },
      { name: 'LGL', value: '45 ng/mL', status: 'Normal', range: '< 60 ng/mL' },
      { name: 'MAPT', value: '185 pg/mL', status: 'Normal', range: '< 250 pg/mL' },
      { name: 'MMP12', value: '48 ng/mL', status: 'Normal', range: '< 60 ng/mL' },
      { name: 'MPST', value: '42 U/L', status: 'Normal', range: '< 55 U/L' },
      { name: 'NAGA', value: '35 U/L', status: 'Normal', range: '< 50 U/L' },
      { name: 'ODAM', value: '52 ng/mL', status: 'Normal', range: '< 65 ng/mL' },
      { name: 'PIK3AP1', value: '48 ng/mL', status: 'Normal', range: '< 60 ng/mL' },
      { name: 'PNMA1', value: '38 ng/mL', status: 'Normal', range: '< 50 ng/mL' },
      { name: 'SCPEP1', value: '42 U/L', status: 'Normal', range: '< 55 U/L' },
      { name: 'SH2B3', value: '52 ng/mL', status: 'Normal', range: '< 65 ng/mL' },
      { name: 'SIRT1', value: '125 U/L', status: 'Normal', range: '< 150 U/L' },
      { name: 'SIRT2', value: '95 U/L', status: 'Normal', range: '< 120 U/L' },
      { name: 'SIT1', value: '48 ng/mL', status: 'Normal', range: '< 60 ng/mL' },
      { name: 'SLA2', value: '65 ng/mL', status: 'Normal', range: '< 80 ng/mL' },
      { name: 'SNAP25', value: '185 ng/mL', status: 'Normal', range: '< 220 ng/mL' },
      { name: 'SYT1', value: '125 ng/mL', status: 'Normal', range: '< 150 ng/mL' },
      { name: 'TGFB1', value: '125 pg/mL', status: 'Normal', range: '< 150 pg/mL' },
    ],
    Bladder: [
      { name: 'NMP22', value: '8 U/mL', status: 'Borderline', range: '< 10 U/mL' },
      { name: 'BTA (Bladder Tumor Ag)', value: 'Negative', status: 'Normal', range: 'Negative' },
      { name: 'Cytokeratin 20', value: '2.5 ng/mL', status: 'Normal', range: '< 5 ng/mL' },
      { name: 'Uroplakin III', value: '45 ng/mL', status: 'Borderline', range: '< 50 ng/mL' },
      { name: 'Survivin', value: '0.8 ng/mL', status: 'Normal', range: '< 2 ng/mL' },
    ],
    Legs: [
      { name: 'Myoglobin', value: '45 ng/mL', status: 'Normal', range: '< 107 ng/mL' },
      { name: 'Creatine Kinase', value: '155 U/L', status: 'Normal', range: '30-200 U/L' },
      { name: 'LDH', value: '185 U/L', status: 'Normal', range: '140-280 U/L' },
      { name: 'Troponin T', value: '0.008 ng/mL', status: 'Normal', range: '< 0.014 ng/mL' },
      { name: 'Fibrinogen', value: '310 mg/dL', status: 'Normal', range: '200-400 mg/dL' },
    ],
    Blood: [
      { name: 'Hemoglobin A1c', value: '5.4%', status: 'Normal', range: '< 5.7%' },
      { name: 'Ferritin', value: '145 ng/mL', status: 'Normal', range: '30-400 ng/mL' },
      { name: 'Transferrin Saturation', value: '32%', status: 'Normal', range: '20-50%' },
      { name: 'Haptoglobin', value: '95 mg/dL', status: 'Normal', range: '30-200 mg/dL' },
      { name: 'Fibrinogen', value: '295 mg/dL', status: 'Normal', range: '200-400 mg/dL' },
    ],
    Spleen: [
      { name: 'Immunoglobulin G', value: '1150 mg/dL', status: 'Normal', range: '700-1600 mg/dL' },
      { name: 'Immunoglobulin M', value: '125 mg/dL', status: 'Normal', range: '40-230 mg/dL' },
      { name: 'Immunoglobulin A', value: '240 mg/dL', status: 'Normal', range: '70-400 mg/dL' },
      { name: 'Complement C3', value: '125 mg/dL', status: 'Normal', range: '90-180 mg/dL' },
      { name: 'Complement C4', value: '28 mg/dL', status: 'Normal', range: '10-40 mg/dL' },
    ]
  }

  const handleOrganClick = (organ, index) => {
    setSelectedOrgan({ ...organ, index })
  }

  return (
    <div className="space-y-6">
      {/* Breadcrumb */}
      <div className="flex items-center text-sm mt-6" style={{ color: 'rgba(142, 142, 142, 1)' }}>
        <button 
          onClick={() => router.push('/dashboard/patients')}
          className="hover:opacity-70"
        >
          <svg className="w-4 h-4 inline mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <span className="mx-2">Immortigen</span>
        <span>/</span>
        <span className="mx-2 cursor-pointer hover:opacity-70" onClick={() => router.push('/dashboard/patients')}>
          Patients
        </span>
        <span>/</span>
        <span className="mx-2" style={{ color: 'rgba(0, 0, 0, 1)' }}>{patient.name}</span>
      </div>

      {/* Tabs and Patient Selector */}
      <div className="flex items-center justify-between" style={{ marginTop: '24px' }}>
        <div className="flex gap-8">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className="pb-3 text-sm font-medium transition-all"
              style={{
                color: activeTab === tab ? 'rgba(0, 0, 0, 1)' : 'rgba(142, 142, 142, 1)'
              }}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Patient Dropdown Selector */}
        <PatientDropdown
          patients={allPatients}
          value={currentPatientId}
          onChange={handlePatientChange}
        />
      </div>

      {/* Tab Content */}
      {activeTab === 'Organ Health' && (
        <div className="grid grid-cols-12 gap-6">
          {/* Left: 3D Body Component */}
          <div className="col-span-5">
            <ThreeDBodyPatient onOrganClick={handleOrganClick} />
          </div>

          {/* Right: Organ Cards or Biomarkers */}
          <div className="col-span-7">
            {!selectedOrgan ? (
              /* Organ Health Cards Grid */
              <div className="grid grid-cols-3 gap-4">
                {organHealthData.map((organ, index) => (
                  <div
                    key={index}
                    onClick={() => handleOrganClick(organ, index)}
                    className="rounded-lg p-4 cursor-pointer hover:shadow-lg transition-all"
                    style={{ backgroundColor: 'rgba(255, 255, 255, 0.4)' }}
                  >
                    <div className="flex items-center justify-between mb-3">
                      <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center">
                        <Image
                          src={organ.image}
                          alt={organ.name}
                          width={organ.name === 'Legs' || organ.name === 'Blood' ? 24 : 32}
                          height={organ.name === 'Legs' || organ.name === 'Blood' ? 24 : 32}
                          className="object-contain"
                        />
                      </div>
                      <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                        <circle cx="8" cy="8" r="8" fill={organ.color} />
                      </svg>
                    </div>
                    <h3 className="text-sm font-semibold mb-2" style={{ color: 'rgba(0, 0, 0, 1)' }}>
                      {organ.name}
                    </h3>
                    <p className="text-xs mb-3" style={{ color: organ.color }}>
                      {organ.status}
                    </p>
                    {/* Progress bar with diagonal lines */}
                    <div className="w-full h-2 rounded-full overflow-hidden" style={{ backgroundColor: 'rgba(229, 231, 235, 0.3)' }}>
                      <div
                        className="h-full rounded-full relative"
                        style={{
                          backgroundColor: organ.color,
                          width: `${organ.progress}%`,
                          backgroundImage: `repeating-linear-gradient(
                            45deg,
                            transparent,
                            transparent 2px,
                            rgba(255, 255, 255, 0.1) 2px,
                            rgba(255, 255, 255, 0.1) 4px
                          )`
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              /* Blood Biomarkers View */
              <div className="rounded-lg p-6" style={{ backgroundColor: 'rgba(255, 255, 255, 0.4)' }}>
                {/* Header with Icon and Title */}
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-full flex items-center justify-center" style={{ backgroundColor: 'rgba(255, 255, 255, 0.4)', border: '1px solid rgba(229, 231, 235, 1)' }}>
                    <Image
                      src={selectedOrgan.image}
                      alt={selectedOrgan.name}
                      width={selectedOrgan.name === 'Legs' || selectedOrgan.name === 'Blood' ? 22 : 28}
                      height={selectedOrgan.name === 'Legs' || selectedOrgan.name === 'Blood' ? 22 : 28}
                      className="object-contain"
                    />
                  </div>
                  <h2 className="text-lg font-semibold" style={{ color: 'rgba(0, 0, 0, 1)' }}>
                    {selectedOrgan.name}
                  </h2>
                  <button
                    onClick={() => setSelectedOrgan(null)}
                    className="ml-auto hover:opacity-70"
                    style={{ color: 'rgba(142, 142, 142, 1)' }}
                  >
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                      <path d="M15 5L5 15M5 5L15 15" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                    </svg>
                  </button>
                </div>

                {/* Capsule-style Tab Navigation */}
                <div className="flex gap-3 mb-6">
                  <button 
                    onClick={() => setSelectedBiomarkerTab('Genetic markers')}
                    className="px-6 py-2 text-sm font-medium rounded-full"
                    style={{ 
                      backgroundColor: selectedBiomarkerTab === 'Genetic markers' ? 'rgba(85, 92, 245, 1)' : 'rgba(255, 255, 255, 0.4)',
                      color: selectedBiomarkerTab === 'Genetic markers' ? 'rgba(255, 255, 255, 1)' : 'rgba(142, 142, 142, 1)',
                      border: '1px solid rgba(225, 225, 225, 1)'
                    }}
                  >
                    Genetic markers
                  </button>
                  <button 
                    onClick={() => setSelectedBiomarkerTab('Blood biomarkers')}
                    className="px-6 py-2 text-sm font-medium rounded-full"
                    style={{ 
                      backgroundColor: selectedBiomarkerTab === 'Blood biomarkers' ? 'rgba(85, 92, 245, 1)' : 'rgba(255, 255, 255, 0.4)',
                      color: selectedBiomarkerTab === 'Blood biomarkers' ? 'rgba(255, 255, 255, 1)' : 'rgba(142, 142, 142, 1)',
                      border: '1px solid rgba(225, 225, 225, 1)'
                    }}
                  >
                    Blood biomarkers
                  </button>
                  <button 
                    onClick={() => setSelectedBiomarkerTab('Protein markers')}
                    className="px-6 py-2 text-sm font-medium rounded-full"
                    style={{ 
                      backgroundColor: selectedBiomarkerTab === 'Protein markers' ? 'rgba(85, 92, 245, 1)' : 'rgba(255, 255, 255, 0.4)',
                      color: selectedBiomarkerTab === 'Protein markers' ? 'rgba(255, 255, 255, 1)' : 'rgba(142, 142, 142, 1)',
                      border: '1px solid rgba(225, 225, 225, 1)'
                    }}
                  >
                    Protein markers
                  </button>
                </div>

                {/* Tab Content */}
                {selectedBiomarkerTab === 'Genetic markers' && (
                  <div className="space-y-3">
                    {geneticMarkersData[selectedOrgan.name]?.map((biomarker, index) => {
                      const getRiskColor = (status) => {
                        if (status === 'Normal') return 'rgba(21, 182, 108, 1)'
                        if (status === 'Elevated' || status === 'High') return 'rgba(255, 79, 69, 1)'
                        if (status === 'Borderline') return 'rgba(246, 155, 27, 1)'
                        return 'rgba(142, 142, 142, 1)'
                      }
                      
                      const getRiskText = (status) => {
                        if (status === 'Normal') return 'Low Risk'
                        if (status === 'Elevated' || status === 'High') return 'High Risk'
                        if (status === 'Borderline') return 'Moderate Risk'
                        return 'Low Risk'
                      }

                      return (
                        <div
                          key={index}
                          className="flex items-center justify-between py-3 px-4"
                          style={{ 
                            backgroundColor: 'rgba(255, 255, 255, 0.4)',
                            border: '1px solid rgba(225, 225, 225, 1)'
                          }}
                        >
                          <span className="text-sm" style={{ color: 'rgba(75, 75, 75, 1)' }}>
                            {biomarker.name}
                          </span>
                          <span className="text-sm font-medium" style={{ color: getRiskColor(biomarker.status) }}>
                            {getRiskText(biomarker.status)}
                          </span>
                        </div>
                      )
                    })}
                  </div>
                )}

                {selectedBiomarkerTab === 'Blood biomarkers' && (
                  <div>
                    {/* Blood markers header */}
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-sm font-medium" style={{ color: 'rgba(142, 142, 142, 1)' }}>
                        Blood markers
                      </h3>
                      <h3 className="text-sm font-medium" style={{ color: 'rgba(142, 142, 142, 1)' }}>
                        History
                      </h3>
                    </div>

                    {/* Blood biomarkers list with charts */}
                    <div className="space-y-3">
                      {biomarkersData[selectedOrgan.name]?.map((biomarker, index) => {
                        const getRiskColor = (status) => {
                          if (status === 'Normal') return 'rgba(21, 182, 108, 1)'
                          if (status === 'Elevated' || status === 'High') return 'rgba(255, 79, 69, 1)'
                          if (status === 'Borderline') return 'rgba(246, 155, 27, 1)'
                          return 'rgba(142, 142, 142, 1)'
                        }

                        // Generate varied sample data for each biomarker
                        const getChartData = (index) => {
                          const dataPatterns = [
                            [{ value: 25, date: '2024-09-15' }, { value: 50, date: '2024-10-01' }, { value: 75, date: '2024-10-15' }],
                            [{ value: 80, date: '2024-09-15' }, { value: 50, date: '2024-10-01' }, { value: 30, date: '2024-10-15' }],
                            [{ value: 45, date: '2024-09-15' }, { value: 75, date: '2024-10-01' }, { value: 50, date: '2024-10-15' }],
                            [{ value: 30, date: '2024-09-15' }, { value: 30, date: '2024-10-01' }, { value: 75, date: '2024-10-15' }],
                            [{ value: 70, date: '2024-09-15' }, { value: 50, date: '2024-10-01' }, { value: 70, date: '2024-10-15' }],
                          ]
                          return dataPatterns[index % dataPatterns.length]
                        }

                        return (
                          <div
                            key={index}
                            className="py-3 px-4"
                            style={{ 
                              backgroundColor: 'rgba(255, 255, 255, 0.4)',
                              border: '1px solid rgba(225, 225, 225, 1)'
                            }}
                          >
                            <div className="flex items-center justify-between">
                              <div className="flex-1">
                                <h4 className="text-sm font-semibold mb-1" style={{ color: 'rgba(0, 0, 0, 1)' }}>
                                  {biomarker.name}
                                </h4>
                                <p className="text-xs" style={{ color: getRiskColor(biomarker.status) }}>
                                  {biomarker.value}
                                </p>
                              </div>
                              <div className="flex items-center">
                                <BiomarkerChart 
                                  data={getChartData(index)}
                                />
                              </div>
                            </div>
                          </div>
                        )
                      })}
                    </div>
                  </div>
                )}

                {selectedBiomarkerTab === 'Protein markers' && (
                  <div>
                    {/* Protein markers header */}
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-sm font-medium" style={{ color: 'rgba(142, 142, 142, 1)' }}>
                        Protein markers
                      </h3>
                      <h3 className="text-sm font-medium" style={{ color: 'rgba(142, 142, 142, 1)' }}>
                        History
                      </h3>
                    </div>

                    {/* Protein markers list with charts */}
                    <div className="space-y-3">
                      {proteinMarkersData[selectedOrgan.name]?.map((biomarker, index) => {
                        const getRiskColor = (status) => {
                          if (status === 'Normal') return 'rgba(21, 182, 108, 1)'
                          if (status === 'Elevated' || status === 'High') return 'rgba(255, 79, 69, 1)'
                          if (status === 'Borderline') return 'rgba(246, 155, 27, 1)'
                          return 'rgba(142, 142, 142, 1)'
                        }

                        // Generate different varied sample data for protein markers
                        const getChartData = (index) => {
                          const dataPatterns = [
                            [{ value: 60, date: '2024-09-15' }, { value: 45, date: '2024-10-01' }, { value: 30, date: '2024-10-15' }],
                            [{ value: 35, date: '2024-09-15' }, { value: 70, date: '2024-10-01' }, { value: 80, date: '2024-10-15' }],
                            [{ value: 50, date: '2024-09-15' }, { value: 30, date: '2024-10-01' }, { value: 50, date: '2024-10-15' }],
                            [{ value: 75, date: '2024-09-15' }, { value: 80, date: '2024-10-01' }, { value: 40, date: '2024-10-15' }],
                            [{ value: 40, date: '2024-09-15' }, { value: 50, date: '2024-10-01' }, { value: 25, date: '2024-10-15' }],
                          ]
                          return dataPatterns[index % dataPatterns.length]
                        }

                        return (
                          <div
                            key={index}
                            className="py-3 px-4"
                            style={{ 
                              backgroundColor: 'rgba(255, 255, 255, 0.4)',
                              border: '1px solid rgba(225, 225, 225, 1)'
                            }}
                          >
                            <div className="flex items-center justify-between">
                              <div className="flex-1">
                                <h4 className="text-sm font-semibold mb-1" style={{ color: 'rgba(0, 0, 0, 1)' }}>
                                  {biomarker.name}
                                </h4>
                                <p className="text-xs" style={{ color: getRiskColor(biomarker.status) }}>
                                  {biomarker.value}
                                </p>
                              </div>
                              <div className="flex items-center">
                                <BiomarkerChart 
                                  data={getChartData(index)}
                                />
                              </div>
                            </div>
                          </div>
                        )
                      })}
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      )}

      {activeTab === 'Vitals' && <VitalsContent patient={patient} />}

      {activeTab === 'Reports' && <ReportsContent patient={patient} />}

      {activeTab === 'Personal Information' && <PersonalInfoContent patient={patient} />}
    </div>
  )
}
