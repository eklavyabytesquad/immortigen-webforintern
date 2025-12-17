// Biomarkers data structure for the Next.js application
export const healthBiomarkersData = {
    healthBiomarkers: {
        "foundationalHealthPanel": {
            "description": "This panel provides a comprehensive snapshot of current physiological status, covering key areas like heart, metabolic, hormonal, and organ health.",
            "categories": {
                "heartHealth": {
                    "biomarkers": [
                        {
                            "name": "Apolipoprotein B (apoB)",
                            "description": "More accurate predictor of cardiovascular disease risk than LDL-cholesterol alone"
                        },
                        {
                            "name": "HDL-Cholesterol",
                            "description": "\"Good\" cholesterol; protective against heart disease"
                        },
                        {
                            "name": "LDL-Cholesterol",
                            "description": "\"Bad\" cholesterol; high levels increase heart disease risk"
                        },
                        {
                            "name": "Lipoprotein (a) [Lp(a)]",
                            "description": "Genetically determined particle strongly linked to cardiovascular and heart valve disease risk"
                        },
                        {
                            "name": "Non-HDL Cholesterol",
                            "description": "Represents all atherogenic lipoproteins; strong predictor of heart disease risk"
                        },
                        {
                            "name": "TG:HDL-C ratio",
                            "description": "Higher ratio associated with insulin resistance and increased heart disease risk"
                        },
                        {
                            "name": "Total Cholesterol",
                            "description": "Overall measure of blood cholesterol"
                        },
                        {
                            "name": "Triglycerides",
                            "description": "High levels increase risk of heart disease and pancreatitis"
                        }
                    ]
                },
                "energyMetabolism": {
                    "biomarkers": [
                        {
                            "name": "Estimated Average Glucose (eAG)",
                            "description": "Reflects average blood glucose over past 2-3 months"
                        },
                        {
                            "name": "Fasting glucose",
                            "description": "Essential for diagnosing and monitoring diabetes/pre-diabetes"
                        },
                        {
                            "name": "Fasting insulin",
                            "description": "High levels can indicate insulin resistance"
                        },
                        {
                            "name": "Ferritin",
                            "description": "Iron storage protein; indicates iron status"
                        },
                        {
                            "name": "HbA1c (Glycated Hemoglobin)",
                            "description": "Key for diagnosing and managing diabetes (average 2-3 month glucose)"
                        },
                        {
                            "name": "HOMA-IR",
                            "description": "Estimates insulin resistance, assessing metabolic health"
                        },
                        {
                            "name": "Uric Acid",
                            "description": "High levels linked to gout, kidney stones, and may contribute to cardiovascular/metabolic diseases"
                        }
                    ]
                },
                "hormonalHealth": {
                    "biomarkers": [
                        {
                            "name": "Cortisol",
                            "description": "Primary stress hormone; chronic elevation impacts multiple systems and can accelerate aging"
                        },
                        {
                            "name": "Cortisol:DHEA-S Ratio",
                            "description": "Assesses balance between stress and protective hormones; indicator of adrenal health"
                        },
                        {
                            "name": "DHEA-S",
                            "description": "Precursor hormone; levels decline with age/stress, impacting vitality"
                        },
                        {
                            "name": "Estradiol (E2)",
                            "description": "Primary estrogen; crucial for reproductive, bone, cardiovascular, and cognitive health"
                        },
                        {
                            "name": "Follicle-Stimulating Hormone (FSH)",
                            "description": "Regulates reproductive functions; levels change with menopause/aging"
                        },
                        {
                            "name": "Free Testosterone",
                            "description": "Biologically active testosterone; influences libido, muscle, bone, mood, energy"
                        },
                        {
                            "name": "Free Testosterone:Cortisol ratio",
                            "description": "Reflects anabolic/catabolic balance; important for stress and recovery assessment"
                        },
                        {
                            "name": "Free Thyroxine (T4)",
                            "description": "Thyroid hormone essential for metabolism and energy"
                        },
                        {
                            "name": "Luteinizing Hormone (LH)",
                            "description": "Key for reproductive health and hormonal balance"
                        },
                        {
                            "name": "Progesterone",
                            "description": "Involved in menstrual cycle, pregnancy, mood, sleep, bone health"
                        },
                        {
                            "name": "Sex Hormone Binding Globulin (SHBG)",
                            "description": "Regulates availability of sex hormones to tissues"
                        },
                        {
                            "name": "Thyroid Stimulating Hormone (TSH)",
                            "description": "Primary screening for thyroid disorders"
                        },
                        {
                            "name": "Total Testosterone",
                            "description": "Overall assessment of testosterone levels"
                        },
                        {
                            "name": "Triiodothyronine (T3), Free",
                            "description": "Active thyroid hormone; influences metabolism, heart rate, energy"
                        }
                    ]
                },
                "nutrientsVitaminsMinerals": {
                    "biomarkers": [
                        {
                            "name": "Calcium",
                            "description": "Essential for bone, muscle, nerve function"
                        },
                        {
                            "name": "Corrected Calcium",
                            "description": "More accurate measure of biologically active calcium"
                        },
                        {
                            "name": "Folate (Vitamin B9)",
                            "description": "Crucial for DNA synthesis, cell division; deficiency linked to high homocysteine"
                        },
                        {
                            "name": "Homocysteine",
                            "description": "Elevated levels are a risk factor for cardiovascular disease, stroke, cognitive decline"
                        },
                        {
                            "name": "Iron Saturation",
                            "description": "Helps diagnose iron deficiency or overload"
                        },
                        {
                            "name": "Magnesium, RBC",
                            "description": "More accurate indicator of body's magnesium stores; vital for many functions"
                        },
                        {
                            "name": "Total Iron Binding Capacity (TIBC)",
                            "description": "High TIBC suggests iron deficiency"
                        },
                        {
                            "name": "Unsaturated Iron Binding Capacity (UIBC)",
                            "description": "Low UIBC can indicate iron overload"
                        },
                        {
                            "name": "Vitamin B12",
                            "description": "Essential for nerve function, DNA synthesis; deficiency more common with age"
                        },
                        {
                            "name": "Vitamin D (25-hydroxyvitamin D)",
                            "description": "Crucial for bone health, immune function, inflammation regulation"
                        }
                    ]
                },
                "kidneyHealth": {
                    "biomarkers": [
                        {
                            "name": "BUN (Blood Urea Nitrogen)",
                            "description": "Elevated levels can indicate impaired kidney function"
                        },
                        {
                            "name": "BUN/Creatinine Ratio",
                            "description": "Helps determine cause of kidney dysfunction"
                        },
                        {
                            "name": "Creatinine",
                            "description": "Elevated serum levels indicate reduced kidney function"
                        },
                        {
                            "name": "Cystatin C",
                            "description": "Sensitive marker of early kidney dysfunction"
                        },
                        {
                            "name": "Estimated Glomerular Filtration Rate (eGFRcr & eGFRcr-cys)",
                            "description": "Estimates kidney filtration capability"
                        },
                        {
                            "name": "Potassium",
                            "description": "Crucial for nerve/muscle function; regulated by kidneys"
                        },
                        {
                            "name": "Sodium",
                            "description": "Essential for fluid balance, nerve/muscle function; regulated by kidneys"
                        },
                        {
                            "name": "Urine Albumin/Creatinine Ratio (uACR)",
                            "description": "Early and sensitive marker of kidney damage"
                        }
                    ]
                },
                "liverHealth": {
                    "biomarkers": [
                        {
                            "name": "Alanine Transaminase (ALT)",
                            "description": "Elevated levels often indicate liver cell damage"
                        },
                        {
                            "name": "Albumin",
                            "description": "Main blood protein; low levels can indicate liver disease, malnutrition"
                        },
                        {
                            "name": "Alkaline Phosphatase (ALP)",
                            "description": "Elevated levels can indicate liver or bone disorders"
                        },
                        {
                            "name": "Aspartate Transaminase (AST)",
                            "description": "Elevated levels can indicate liver, muscle, or heart damage"
                        },
                        {
                            "name": "Direct Bilirubin",
                            "description": "Elevated levels suggest impaired bile flow or liver dysfunction"
                        },
                        {
                            "name": "Fibrosis-4 Index (FIB-4)",
                            "description": "Estimates degree of liver fibrosis (scarring)"
                        },
                        {
                            "name": "Gamma-glutamyl Transferase (GGT)",
                            "description": "Sensitive to liver damage, particularly from alcohol/drugs"
                        },
                        {
                            "name": "Total Bilirubin",
                            "description": "High levels can indicate liver disease, bile duct obstruction, or hemolysis"
                        },
                        {
                            "name": "Total Protein",
                            "description": "Reflects nutritional status and can indicate liver or kidney disease"
                        }
                    ]
                },
                "inflammationImmunity": {
                    "biomarkers": [
                        {
                            "name": "Erythrocyte Sedimentation Rate (ESR)",
                            "description": "Non-specific marker of inflammation"
                        },
                        {
                            "name": "High-Sensitivity C-Reactive Protein (hsCRP)",
                            "description": "Sensitive marker for chronic low-grade inflammation; linked to cardiovascular and other chronic disease risk"
                        }
                    ]
                },
                "bloodHealth": {
                    "biomarkers": [
                        {
                            "name": "Complete Blood Count (CBC) with differential",
                            "description": "Comprehensive assessment of blood cells, indicating oxygen-carrying capacity, immune status, infection, anemia, and clotting potential",
                            "components": [
                                "Hematocrit",
                                "Hemoglobin",
                                "Red Cell Count",
                                "White Cell Count",
                                "Platelets",
                                "MCV",
                                "MCH",
                                "MCHC",
                                "RDW",
                                "Neutrophils",
                                "Lymphocytes",
                                "Monocytes",
                                "Eosinophils",
                                "Basophils"
                            ]
                        },
                        {
                            "name": "Iron",
                            "description": "Essential mineral for hemoglobin and oxygen transport"
                        }
                    ]
                },
                "cancerScreeningMale": {
                    "biomarkers": [
                        {
                            "name": "Free PSA",
                            "description": "Helps distinguish prostate cancer from benign conditions in men with elevated Total PSA"
                        },
                        {
                            "name": "Prostate Specific Antigen (PSA), Total",
                            "description": "Elevated levels may indicate prostate issues in men"
                        }
                    ]
                },
                "urineAnalysis": {
                    "biomarkers": [
                        {
                            "name": "Comprehensive Urine Analysis",
                            "description": "Provides insights into kidney function, hydration, metabolic state, and potential infections",
                            "components": [
                                "Urine pH",
                                "Specific Gravity",
                                "Glucose",
                                "Protein",
                                "Ketones",
                                "Bilirubin",
                                "Urobilinogen",
                                "Nitrite",
                                "Leukocytes",
                                "Bacteria"
                            ]
                        }
                    ]
                }
            }
        },
        "geneticBlueprintPanel": {
            "description": "This panel focuses on genes and variants with established links to longevity, healthy aging, or significant risk for age-related diseases. Exome sequencing can identify these and other relevant variants",
            "note": "Interpretation requires genetic counseling",
            "genes": [
                {
                    "gene": "APOE",
                    "variantType": "ε2, ε3, ε4 alleles",
                    "relevance": "Major influence on Alzheimer's risk, cardiovascular health, and longevity"
                },
                {
                    "gene": "FOXO3",
                    "variantType": "e.g., rs2802292 G allele",
                    "relevance": "Consistently associated with increased longevity across diverse populations"
                },
                {
                    "gene": "IGF-1 Axis (e.g., IGF-1, GHR)",
                    "variantType": "e.g., IGF-1 Ile91Leu, Ala118Thr; GHR d3-GHR deletion",
                    "relevance": "Variants linked to exceptional longevity and protection from age-related diseases"
                },
                {
                    "gene": "Sirtuins (e.g., SIRT1, SIRT3, SIRT6)",
                    "variantType": "e.g., SIRT1 rs7895833; SIRT3 rs11246020",
                    "relevance": "Involved in cellular health, stress response, metabolism; variants linked to healthy aging or disease risk"
                },
                {
                    "gene": "BPIFB4",
                    "variantType": "LAV-BPIFB4 haplotype",
                    "relevance": "Enriched in centenarians, promotes healthier aging, reduces chronic disease risk"
                },
                {
                    "gene": "ATM",
                    "variantType": "Loss-of-function variants",
                    "relevance": "DNA damage response; variants linked to reduced lifespan and increased cancer risk"
                },
                {
                    "gene": "BRCA1 / BRCA2",
                    "variantType": "Pathogenic variants",
                    "relevance": "DNA repair; variants significantly increase risk of several cancers"
                },
                {
                    "gene": "TTN",
                    "variantType": "Truncating variants (TTNtv)",
                    "relevance": "Muscle protein; variants are a common cause of dilated cardiomyopathy"
                },
                {
                    "gene": "NF-κB Pathway Genes (e.g., NFKB1, RELA, NFKBIA)",
                    "variantType": "Functional non-coding variants",
                    "relevance": "Key inflammatory pathway; variants and pathway dysregulation linked to aging and age-related diseases"
                }
            ],
            "nutrigenomicGenes": [
                {
                    "gene": "ADRB2",
                    "variantType": "e.g., rs1042714, rs1042713",
                    "relevance": "May influence carbohydrate metabolism and risk of type 2 diabetes/obesity"
                },
                {
                    "gene": "PPARG",
                    "variantType": "e.g., rs1801282",
                    "relevance": "May influence insulin sensitivity and protect against obesity/diabetes"
                }
            ],
            "acmgSecondaryFindings": {
                "description": "ACMG SF v3.2 Genes (Selected)",
                "variantType": "Pathogenic/Likely Pathogenic Variants",
                "relevance": "Includes genes where variants are associated with medically actionable conditions (e.g., inherited cancer predispositions, cardiovascular risks)"
            }
        },
        "gutHealthPanel": {
            "description": "This panel assesses the gut microbiome's composition and functional potential, which are crucial for inflammation, immunity, and overall health.  ",
            "categories": {
                "diversityComposition": [
                    {
                        "name": "Alpha Diversity (e.g., Shannon Index, Richness)",
                        "relevance": "Higher diversity generally linked to gut health and resilience; patterns vary with healthy aging"
                    },
                    {
                        "name": "Beta Diversity (Uniqueness)",
                        "relevance": "Increasing uniqueness with age is a hallmark of healthy aging and predicts survival"
                    }
                ],
                "keyBacterialTaxa": [
                    {
                        "name": "Akkermansia muciniphila",
                        "relevance": "Associated with healthy aging, gut barrier integrity, reduced inflammation, metabolic health"
                    },
                    {
                        "name": "Faecalibacterium prausnitzii",
                        "relevance": "Major butyrate producer, anti-inflammatory; important for gut health"
                    },
                    {
                        "name": "Christensenellaceae family",
                        "relevance": "Associated with leanness and healthy aging; enriched in centenarians"
                    },
                    {
                        "name": "Bifidobacterium spp.",
                        "relevance": "Generally beneficial; associated with healthy aging in some cohorts"
                    },
                    {
                        "name": "Ruminococcaceae / Lachnospiraceae families",
                        "relevance": "Key SCFA producers; abundant in healthy individuals"
                    },
                    {
                        "name": "Bacteroides spp. (specific species balance)",
                        "relevance": "Core genus; specific shifts (e.g., B. fragilis enrichment) linked to healthy aging"
                    },
                    {
                        "name": "Desulfovibrio piger",
                        "relevance": "Enriched in centenarians, potentially anti-inflammatory"
                    },
                    {
                        "name": "Clostridium hathewayi (levels)",
                        "relevance": "Elevated levels may be linked to gut permeability and inflammation"
                    },
                    {
                        "name": "Escherichia spp. (levels)",
                        "relevance": "Increase often seen with aging/dysbiosis; can be pro-inflammatory"
                    }
                ],
                "keyMicrobialMetabolites": [
                    {
                        "name": "Short-Chain Fatty Acids (SCFAs: Butyrate, Propionate, Acetate)",
                        "relevance": "Crucial for colonocyte energy, gut barrier, immune regulation, anti-inflammatory effects"
                    },
                    {
                        "name": "Urolithin A (production potential)",
                        "relevance": "Postbiotic from ellagitannins; promotes mitochondrial health, muscle function, anti-inflammatory"
                    },
                    {
                        "name": "Equol (production potential)",
                        "relevance": "Postbiotic from soy isoflavones; phytoestrogenic, antioxidant, potential anti-inflammatory benefits"
                    },
                    {
                        "name": "Indole & Tryptophan Derivatives",
                        "relevance": "Linked to reduced inflammation, improved gut barrier, and fitness in older adults"
                    },
                    {
                        "name": "Secondary Bile Acids (specific profile)",
                        "relevance": "Certain profiles enriched in centenarians; may protect against infection, maintain gut homeostasis"
                    },
                    {
                        "name": "p-Cresol (levels)",
                        "relevance": "Elevated levels linked to renal impairment, frailty; negative association with longevity"
                    },
                    {
                        "name": "Trimethylamine N-oxide (TMAO) (levels/production potential)",
                        "relevance": "High levels associated with increased cardiovascular disease risk"
                    }
                ]
            }
        },
        "biologicalAgePanel": {
            "description": "This panel uses DNA methylation patterns to estimate biological age and the pace of aging, offering insights beyond chronological age.  ",
            "clocks": [
                {
                    "name": "PhenoAge (DNAm PhenoAge)",
                    "primaryAssessment": "Phenotypic Age / Healthspan",
                    "relevance": "Predicts mortality, morbidity, functional decline; reflects immune aging and metabolic stress"
                },
                {
                    "name": "GrimAge (DNAm GrimAge)",
                    "primaryAssessment": "Mortality Risk / Healthspan",
                    "relevance": "Highly predictive of time-to-death, cardiovascular events, cancer; linked to inflammation and hematopoietic aging"
                },
                {
                    "name": "DunedinPACE",
                    "primaryAssessment": "Pace of Biological Aging",
                    "relevance": "Measures current rate of multi-system biological aging; sensitive to interventions and lifestyle changes"
                },
                {
                    "name": "Horvath Clock / Hannum Clock",
                    "primaryAssessment": "Chronological Age Estimation",
                    "relevance": "Foundational age estimators; deviations can indicate accelerated/decelerated aging, though less predictive of health outcomes than newer clocks"
                },
                {
                    "name": "EpiScores (various)",
                    "primaryAssessment": "Specific Health Risks / Physiological States",
                    "relevance": "Targeted methylation scores for inflammation, glycemic control, immunosenescence, specific disease risks"
                }
            ]
        },
        "personalizedMedicationPanel": {
            "description": "This panel identifies genetic variants that influence response to common medications, aiming to optimize efficacy and minimize adverse drug reactions. This is particularly important for managing age-related conditions and polypharmacy.  ",
            "genes": [
                {
                    "gene": "CYP2D6",
                    "variants": "Poor, Intermediate, Ultrarapid Metabolizer Alleles",
                    "affectedDrugs": [
                        "Codeine",
                        "Tramadol",
                        "Tamoxifen",
                        "Antidepressants (e.g., amitriptyline, paroxetine)",
                        "Beta-blockers"
                    ],
                    "implication": "Optimizes pain management, cancer therapy, psychiatric medication by predicting efficacy/toxicity"
                },
                {
                    "gene": "CYP2C19",
                    "variants": "Loss-of-function (*2, *3), Gain-of-function (*17) Alleles",
                    "affectedDrugs": [
                        "Clopidogrel",
                        "Proton pump inhibitors (e.g., omeprazole)",
                        "Some antidepressants (e.g., citalopram)"
                    ],
                    "implication": "Optimizes antiplatelet therapy (critical for cardiovascular health), acid suppression, psychiatric treatment"
                },
                {
                    "gene": "CYP2C9",
                    "variants": "Decreased function Alleles (*2, *3)",
                    "affectedDrugs": [
                        "Warfarin",
                        "NSAIDs (e.g., ibuprofen, celecoxib)",
                        "Phenytoin",
                        "Fluvastatin"
                    ],
                    "implication": "Optimizes anticoagulation, pain/inflammation management, seizure control; impacts statin exposure"
                },
                {
                    "gene": "SLCO1B1",
                    "variants": "c.521T>C (rs4149056) (decreased function)",
                    "affectedDrugs": [
                        "Statins (simvastatin, atorvastatin, rosuvastatin etc.)"
                    ],
                    "implication": "Guides statin choice/dose to prevent myopathy by predicting risk of SAMS"
                },
                {
                    "gene": "ABCG2",
                    "variants": "c.421C>A (rs2231142) (poor function)",
                    "affectedDrugs": [
                        "Rosuvastatin"
                    ],
                    "implication": "Guides rosuvastatin dosing to balance efficacy and safety, especially in certain ancestries"
                },
                {
                    "gene": "VKORC1",
                    "variants": "-1639G>A (rs9923231) (altered sensitivity)",
                    "affectedDrugs": [
                        "Warfarin"
                    ],
                    "implication": "Used in dosing algorithms to achieve therapeutic anticoagulation and reduce bleeding/clotting risk"
                },
                {
                    "gene": "DPYD",
                    "variants": "Variants causing decreased/absent function",
                    "affectedDrugs": [
                        "Fluoropyrimidines (5-fluorouracil, capecitabine)"
                    ],
                    "implication": "Prevents severe, life-threatening toxicity from common chemotherapy agents"
                },
                {
                    "gene": "TPMT & NUDT15",
                    "variants": "Variants causing decreased/absent function",
                    "affectedDrugs": [
                        "Thiopurines (azathioprine, mercaptopurine)"
                    ],
                    "implication": "Guides dosing to prevent severe myelosuppression from immunosuppressants/chemotherapy"
                },
                {
                    "gene": "HLA-B",
                    "variants": "HLA-B*57:01",
                    "affectedDrugs": [
                        "Abacavir"
                    ],
                    "implication": "Prevents severe hypersensitivity reaction to HIV medication"
                },
                {
                    "gene": "HLA-B",
                    "variants": "HLA-B*58:01",
                    "affectedDrugs": [
                        "Allopurinol"
                    ],
                    "implication": "Reduces risk of severe cutaneous adverse reactions to gout medication"
                },
                {
                    "gene": "HLA-B",
                    "variants": "HLA-B*15:02",
                    "affectedDrugs": [
                        "Carbamazepine",
                        "Oxcarbazepine",
                        "Phenytoin"
                    ],
                    "implication": "Reduces risk of SJS/TEN from antiepileptic drugs, especially in Asian populations"
                },
                {
                    "gene": "MT-RNR1",
                    "variants": "m.1555A>G",
                    "affectedDrugs": [
                        "Aminoglycoside antibiotics (gentamicin, tobramycin)"
                    ],
                    "implication": "Prevents irreversible hearing loss (ototoxicity) from common antibiotics"
                }
            ]
        }
    }
};
