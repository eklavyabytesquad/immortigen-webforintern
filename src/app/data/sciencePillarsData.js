import precisionImg from "../../../public/assets/precision-nutri.png";
import physicalImg from "../../../public/assets/physical-activity.png";
import physicoImg from "../../../public/assets/sleeping-girl.png";
import brainImg from "../../../public/assets/brain.jpg";
import bubbleImg from "../../../public/assets/bubble.jpg";

export const sciencePillarsData = {
  "precision-nutrition": {
    id: 1,
    heading: "Precision Nutrition",
    subHeading: "Fueling Your Cells for Longevity",
    imageUrl: precisionImg,
    science: "What you eat is fundamental to how you age. Nutrition impacts everything from cellular energy production (mitochondria) and repair mechanisms (autophagy) to inflammation levels and metabolic health. Deficiencies or imbalances can accelerate age-related decline, while optimal nutrition provides the building blocks for cellular health and resilience. Factors like gut microbiome health are also crucial, influencing nutrient absorption, immunity, and even mood.",
    howWeAssess: [
      "Advanced Biomarker Analysis: We go beyond standard blood tests, analyzing markers related to nutrient status (vitamins, minerals), metabolic health (glucose, insulin, lipids), inflammation (e.g., hs-CRP), and organ function relevant to nutritional impact.",
      "Dietary Intake Analysis: Detailed tracking and analysis of your current eating patterns to identify habits, potential deficiencies, or excesses.",
      "Microbiome Testing: Assessing the composition and health of your gut bacteria, which plays a critical role in digestion, immunity, and nutrient synthesis.",
      "Nutrigenomic Insights: Leveraging your genomic data (see Pillar 4) to understand how your specific genes influence your response to different nutrients (e.g., caffeine metabolism, vitamin D processing).",
    ],
    customizedApproach: {
      description: "Based on your unique biochemical profile, genetic predispositions, and lifestyle goals, we develop personalized nutritional strategies. This isn't a one-size-fits-all diet plan. It may include:",
      strategies: [
        "Tailored macronutrient (protein, fat, carbs) and micronutrient (vitamins, minerals) targets.",
        "Specific food recommendations to boost beneficial compounds and support cellular processes.",
        "Targeted supplementation protocols to address identified deficiencies or support specific pathways (e.g., mitochondrial support, anti-inflammatory compounds).",
        "Guidance on meal timing and dietary patterns (e.g., intermittent fasting, if appropriate).",
        "Strategies to optimize gut health.",
      ],
    },
  },

  "targeted-physical-activity": {
    id: 2,
    heading: "Targeted Physical Activity",
    subHeading: "Building Resilience from Muscle to Mind",
    imageUrl: physicalImg,
    science: "Movement is medicine. Regular, appropriate physical activity is crucial for combating age-related muscle loss (sarcopenia), maintaining cardiovascular health, supporting metabolic flexibility, enhancing cognitive function, and improving mood. Exercise stimulates beneficial processes like mitochondrial biogenesis (creating new mitochondria), improves insulin sensitivity, and reduces chronic inflammation. The type, intensity, and consistency of exercise matter significantly.",
    howWeAssess: [
      "Functional Movement & Fitness Testing: Evaluating your strength, cardiovascular endurance, flexibility, and balance to establish a baseline.",
      "Body Composition Analysis: Understanding your muscle mass, fat percentage, and distribution.",
      "Lifestyle & Activity Review: Assessing your current activity levels, preferences, and potential limitations.",
      "(Optional Add-on): Biomarkers & Genomics: Analyzing markers related to muscle health, endurance capacity, and potential genetic influences on exercise response.",
    ],
    customizedApproach: {
      description: "We design personalized physical activity plans that align with your current fitness level, health status, goals, and preferences. Our focus is on sustainable, effective routines that build resilience:",
      strategies: [
        "Specific Exercise Prescriptions: Tailored combinations of resistance training (to build/maintain muscle), cardiovascular exercise (for heart and metabolic health), flexibility, and balance work (to prevent falls).",
        "Progressive Overload Guidance: Ensuring your plan adapts as you get fitter, continuing to challenge your body appropriately.",
        "Integration with Lifestyle: Finding ways to incorporate movement naturally into your daily life.",
        "Recovery Strategies: Emphasizing the importance of rest and recovery for optimal adaptation.",
      ],
    },
  },

  "physiological-balance": {
    id: 3,
    heading: "Physiological Balance",
    subHeading: "Harmonising Your Body's Systems",
    imageUrl: physicoImg,
    scienceDescription: "Physiological balance focuses on optimizing the intricate interplay between your body's key regulatory systems - hormonal, nervous, circulatory, and immune. Through comprehensive testing and targeted interventions, we address stress responses, sleep quality, circadian rhythms, and inflammatory processes to create an internal environment that supports optimal health, resilience, and longevity. Our approach recognizes that true wellness emerges from the harmonious functioning of all your body's systems working in synergy.",
    assess: [
      "Comprehensive Hormonal Analysis: Detailed testing of key hormones including cortisol patterns, thyroid function, sex hormones, and metabolic markers to understand your body's regulatory state and identify imbalances.",
      "Stress Response Evaluation: Heart Rate Variability (HRV) testing and comprehensive stress questionnaires to assess your autonomic nervous system function and stress resilience capacity.",
      "Sleep Quality Assessment: Comprehensive sleep analysis using validated questionnaires and wearable technology to evaluate sleep patterns, quality, duration, and recovery effectiveness.",
      "Inflammatory and Immune Markers: Testing for key inflammatory markers and immune system function to identify potential areas of imbalance, chronic inflammation, or immune dysfunction.",
    ],
    approachDescription: "Based on your physiological assessment, we create targeted interventions to restore balance and optimize your body's regulatory systems.",
    approach: [
      "Stress Management Protocols: Evidence-based interventions including mindfulness practices, breathwork, HRV biofeedback, and personalized relaxation techniques tailored to your specific stress profile.",
      "Sleep Optimization Strategies: Personalized sleep hygiene protocols considering your chronotype, sleep environment, light exposure patterns, and lifestyle factors that affect sleep quality.",
      "Circadian Rhythm Alignment: Targeted lifestyle modifications to support healthy circadian rhythms through strategic light therapy, meal timing optimization, and activity scheduling.",
      "Detoxification Support: Nutritional and lifestyle interventions to support your body's natural detoxification pathways and reduce environmental toxic burden on your systems.",
      "Hormone Balance Support: Targeted interventions and clinical collaboration for hormone optimization when indicated, using natural and medical approaches as appropriate.",
    ],
  },

  "genomic-epigenomic-insights": {
    id: 4,
    heading: "Genomic & Epigenomic Insights",
    subHeading: "Understanding & Influencing Your Blueprint",
    imageUrl: bubbleImg,
    scienceDescription: "Genomic and epigenomic insights provide the deepest level of personalization by analyzing your genetic blueprint and how environmental factors influence gene expression. Through advanced genetic testing and epigenetic analysis, we can identify your predispositions, optimize interventions based on your unique genetic makeup, and track how lifestyle changes influence your biological age and cellular health over time. This cutting-edge approach allows us to understand not just what genes you have, but how they're being expressed and how we can positively influence that expression through targeted interventions.",
    assess: [
      "Comprehensive Genetic Analysis: Targeted longevity panels or whole-exome sequencing to identify genetic variants affecting metabolism, disease risk, nutrient processing, exercise response, and aging pathways specific to your genetic profile.",
      "Epigenetic Testing: Advanced DNA methylation analysis to quantify your biological age and understand how environmental factors, lifestyle choices, and interventions are influencing your gene expression patterns over time.",
    ],
    approachDescription: "Using your genetic and epigenetic data, we create highly personalized interventions that work with your unique biology.",
    approach: [
      "Personalized Risk Mitigation: Hyper-personalized strategies to mitigate genetic predispositions through targeted lifestyle, nutrition, and supplement interventions designed specifically for your genetic variants and risk factors.",
      "Precision Nutrition & Supplementation: Nutrigenomic insights to optimize food choices and pharmacogenomic analysis for supplement selection based on your genetic makeup, ensuring maximum efficacy and minimal adverse effects.",
      "Exercise & Lifestyle Optimization: Tailoring physical activity recommendations, recovery protocols, and lifestyle modifications based on genetic insights about exercise response, injury risk, and optimal training approaches for your genotype.",
      "Biological Age Tracking: Ongoing monitoring of epigenetic markers to track your biological age progression and assess the effectiveness of interventions over time, allowing for continuous optimization of your longevity protocol.",
    ],
  },

  "behavioural-science-mindset": {
    id: 5,
    heading: "Behavioural Science & Mindset",
    subHeading: "Sustaining Positive Change",
    imageUrl: brainImg,
    scienceDescription: "Behavioural science and mindset optimization recognize that lasting health transformation requires more than just knowledge - it requires sustainable behavior change and the right psychological framework. Through evidence-based coaching techniques, habit formation strategies, and mindset cultivation, we help you develop the mental resilience and behavioral patterns necessary to maintain long-term health improvements and navigate life's challenges with greater ease. Our approach integrates insights from psychology, neuroscience, and behavioral economics to create lasting positive change that becomes second nature.",
    assess: [
      "Psychological Readiness Assessment: Comprehensive evaluation using validated questionnaires to assess your readiness for change, self-efficacy levels, intrinsic motivation, and perceived stress to understand your psychological starting point and potential barriers.",
      "Habit and Routine Analysis: Detailed mapping of your current habits, daily routines, and behavioral patterns to identify opportunities for positive change and potential obstacles that might derail your progress.",
      "Goals and Values Alignment: In-depth workshops and assessments to ensure your health goals are deeply aligned with your core values and life priorities, creating a foundation for sustainable long-term motivation and commitment.",
    ],
    approachDescription: "We combine evidence-based behavioral science with personalized coaching to help you develop lasting positive habits and the mindset needed for long-term success.",
    approach: [
      "Motivational Interviewing & Coaching: Personalized one-on-one coaching sessions using evidence-based motivational interviewing techniques to enhance your intrinsic motivation and resolve any ambivalence about making positive changes.",
      "Habit Formation Frameworks: Implementation of scientifically-proven behavior change models using the cue → routine → reward cycle to create lasting positive habits while systematically eliminating counterproductive behavioral patterns.",
      "SMART Action Planning: Development of Specific, Measurable, Achievable, Relevant, and Time-bound goals with built-in tracking systems, regular check-ins, and accountability measures to ensure consistent progress toward your objectives.",
      "Mindset Cultivation: Comprehensive training in growth mindset principles, resilience building techniques, and positive self-talk strategies to overcome mental barriers, maintain motivation during challenges, and build unshakeable confidence.",
      "Stress Resilience & Support Systems: Evidence-based strategies for building emotional resilience, managing stress effectively, and leveraging your social support networks to create an environment that naturally supports your success and well-being.",
    ],
  },
};
