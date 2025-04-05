const plantDiseaseData = {
  // Apple Diseases
  Apple___Apple_scab: {
    title: "Apple Scab",
    description:
      "A fungal disease caused by Venturia inaequalis that affects both leaves and fruit, creating olive-green to black spots.",
    causes: [
      "Fungus overwinters in infected leaves on the ground",
      "Spreads during wet spring weather",
      "Poor air circulation in orchards",
    ],
    prevention: [
      "Plant resistant varieties like Liberty or Freedom",
      "Rake and destroy fallen leaves in autumn",
      "Apply fungicides in early spring before symptoms appear",
      "Prune trees to improve air circulation",
    ],
    treatment: [
      "Apply sulfur or copper-based fungicides",
      "Use myclobutanil or trifloxystrobin during growing season",
      "Remove and destroy severely infected fruit",
    ],
  },
  Apple___Black_rot: {
    title: "Black Rot",
    description:
      "A fungal disease caused by Botryosphaeria obtusa that causes fruit rot, leaf spots, and cankers on branches.",
    causes: [
      "Fungus survives in mummified fruit and cankers",
      "Warm, wet weather promotes infection",
      "Poor sanitation in orchards",
    ],
    prevention: [
      "Remove and destroy all mummified fruit",
      "Prune out dead or cankered branches",
      "Avoid wounding trees during maintenance",
      "Space trees properly for good air circulation",
    ],
    treatment: [
      "Apply fungicides containing captan or thiophanate-methyl",
      "Prune infected branches 12 inches below visible symptoms",
      "Disinfect pruning tools between cuts",
    ],
  },
  Apple___Cedar_apple_rust: {
    title: "Cedar Apple Rust",
    description:
      "A fungal disease caused by Gymnosporangium juniperi-virginianae that requires both apple and cedar trees to complete its life cycle.",
    causes: [
      "Alternates between junipers/cedars and apple trees",
      "Spores spread from junipers in spring",
      "Wet conditions during spore release",
    ],
    prevention: [
      "Remove nearby junipers within 2 miles if possible",
      "Plant resistant varieties like Redfree or William's Pride",
      "Apply protective fungicides in early spring",
    ],
    treatment: [
      "Use fungicides containing myclobutanil or triadimefon",
      "Remove galls from junipers in winter",
      "Apply fungicides at pink bud stage on apples",
    ],
  },
  Apple___healthy: {
    title: "Healthy Apple",
    description: "The plant shows no signs of disease and is in good health.",
    causes: [],
    prevention: [
      "Maintain proper watering and fertilization",
      "Monitor regularly for early signs of disease",
      "Practice good orchard sanitation",
    ],
    treatment: [
      "No treatment needed for healthy plants",
      "Continue preventive care measures",
    ],
  },

  // Blueberry
  Blueberry___healthy: {
    title: "Healthy Blueberry",
    description: "The plant shows no signs of disease and is in good health.",
    causes: [],
    prevention: [
      "Maintain acidic soil pH (4.0-5.0)",
      "Provide adequate mulch",
      "Ensure proper spacing for air circulation",
    ],
    treatment: [],
  },

  // Cherry
  "Cherry_(including_sour)___Powdery_mildew": {
    title: "Powdery Mildew",
    description:
      "A fungal disease that appears as white powdery spots on leaves and shoots.",
    causes: [
      "Warm, dry days followed by cool, humid nights",
      "Poor air circulation",
      "Dense foliage",
    ],
    prevention: [
      "Plant resistant varieties",
      "Prune to improve air circulation",
      "Avoid overhead watering",
    ],
    treatment: [
      "Apply sulfur or potassium bicarbonate",
      "Use horticultural oils",
      "Remove severely infected leaves",
    ],
  },
  "Cherry_(including_sour)___healthy": {
    title: "Healthy Cherry",
    description: "The plant shows no signs of disease and is in good health.",
    causes: [],
    prevention: [
      "Prune annually to maintain tree health",
      "Monitor for pests and diseases",
      "Provide balanced fertilization",
    ],
    treatment: [],
  },

  // Corn (Maize)
  "Corn_(maize)___Cercospora_leaf_spot Gray_leaf_spot": {
    title: "Gray Leaf Spot",
    description:
      "A fungal disease causing rectangular lesions on leaves that can significantly reduce yields.",
    causes: [
      "Fungus survives in crop residue",
      "Warm, humid weather",
      "Continuous corn planting",
    ],
    prevention: [
      "Plant resistant hybrids",
      "Rotate crops with non-host plants",
      "Plow under crop residue after harvest",
    ],
    treatment: [
      "Apply fungicides containing azoxystrobin or pyraclostrobin",
      "Remove infected plant debris",
      "Avoid overhead irrigation",
    ],
  },
  "Corn_(maize)___Common_rust_": {
    title: "Common Rust",
    description:
      "A fungal disease characterized by small, round to elongate pustules on leaves.",
    causes: [
      "Puccinia sorghi fungus",
      "Cool temperatures (60-70°F) with high humidity",
      "Spores blown from southern regions",
    ],
    prevention: [
      "Plant early-maturing hybrids",
      "Use resistant varieties",
      "Avoid late planting",
    ],
    treatment: [
      "Apply fungicides if infection occurs early",
      "Use products containing chlorothalonil",
      "Monitor field regularly",
    ],
  },
  "Corn_(maize)___Northern_Leaf_Blight": {
    title: "Northern Leaf Blight",
    description:
      "A fungal disease causing long, elliptical gray-green lesions that turn tan as they age.",
    causes: [
      "Exserohilum turcicum fungus",
      "Warm, humid conditions",
      "Infected crop residue",
    ],
    prevention: [
      "Plant resistant hybrids",
      "Rotate crops with soybeans or small grains",
      "Plow under infected residue",
    ],
    treatment: [
      "Apply fungicides at first sign of disease",
      "Use products containing propiconazole",
      "Monitor fields after tasseling",
    ],
  },
  "Corn_(maize)___healthy": {
    title: "Healthy Corn",
    description: "The plant shows no signs of disease and is in good health.",
    causes: [],
    prevention: [
      "Maintain proper plant spacing",
      "Use balanced fertilization",
      "Practice crop rotation",
    ],
    treatment: [],
  },

  // Grape
  Grape___Black_rot: {
    title: "Black Rot",
    description:
      "A fungal disease that causes circular lesions on leaves and rotting of berries.",
    causes: [
      "Guignardia bidwellii fungus",
      "Warm, wet weather during bloom",
      "Infected canes and mummified fruit",
    ],
    prevention: [
      "Plant resistant varieties like Concord",
      "Prune to improve air circulation",
      "Remove and destroy mummified berries",
    ],
    treatment: [
      "Apply fungicides containing mancozeb or myclobutanil",
      "Time sprays from pre-bloom through 3-4 weeks after bloom",
      "Remove infected plant parts",
    ],
  },
  "Grape___Esca_(Black_Measles)": {
    title: "Esca (Black Measles)",
    description:
      "A complex disease caused by several fungi that leads to wood decay and foliar symptoms.",
    causes: [
      "Fungal complex including Phaeomoniella spp.",
      "Pruning wounds provide entry points",
      "Older vineyards more susceptible",
    ],
    prevention: [
      "Use certified disease-free planting stock",
      "Avoid severe pruning",
      "Paint large pruning wounds",
    ],
    treatment: [
      "No effective chemical control",
      "Remove severely affected vines",
      "Maintain vine vigor",
    ],
  },
  "Grape___Leaf_blight_(Isariopsis_Leaf_Spot)": {
    title: "Leaf Blight",
    description:
      "A fungal disease causing angular brown spots on leaves that can lead to defoliation.",
    causes: [
      "Pseudocercospora vitis fungus",
      "Warm, humid conditions",
      "Poor air circulation",
    ],
    prevention: [
      "Plant resistant varieties",
      "Prune to improve air flow",
      "Avoid overhead irrigation",
    ],
    treatment: [
      "Apply copper-based fungicides",
      "Use mancozeb or chlorothalonil",
      "Remove infected leaves",
    ],
  },
  Grape___healthy: {
    title: "Healthy Grape",
    description: "The plant shows no signs of disease and is in good health.",
    causes: [],
    prevention: [
      "Proper trellising and pruning",
      "Monitor for pests and diseases",
      "Maintain balanced soil fertility",
    ],
    treatment: [],
  },

  // Orange
  "Orange___Haunglongbing_(Citrus_greening)": {
    title: "Citrus Greening (HLB)",
    description:
      "A bacterial disease transmitted by psyllids that causes yellow shoots and misshapen fruit.",
    causes: [
      "Candidatus Liberibacter asiaticus bacteria",
      "Asian citrus psyllid vector",
      "Infected nursery stock",
    ],
    prevention: [
      "Use certified disease-free trees",
      "Control psyllids with insecticides",
      "Remove infected trees promptly",
    ],
    treatment: [
      "No cure once tree is infected",
      "Nutritional programs may help maintain production",
      "Strict psyllid control essential",
    ],
  },

  // Peach
  Peach___Bacterial_spot: {
    title: "Bacterial Spot",
    description:
      "A bacterial disease causing lesions on leaves, fruit, and twigs that can reduce yields.",
    causes: [
      "Xanthomonas arboricola pv. pruni bacteria",
      "Warm, wet spring weather",
      "Overhead irrigation",
    ],
    prevention: [
      "Plant resistant varieties like Contender",
      "Use drip irrigation",
      "Prune to improve air circulation",
    ],
    treatment: [
      "Apply copper sprays during dormancy",
      "Use streptomycin during bloom",
      "Remove severely infected twigs",
    ],
  },
  Peach___healthy: {
    title: "Healthy Peach",
    description: "The plant shows no signs of disease and is in good health.",
    causes: [],
    prevention: [
      "Annual pruning to maintain tree health",
      "Monitor for pests and diseases",
      "Provide adequate irrigation",
    ],
    treatment: [],
  },

  // Pepper
  "Pepper,_bell___Bacterial_spot": {
    title: "Bacterial Spot",
    description:
      "A bacterial disease causing water-soaked lesions on leaves and fruit that become necrotic.",
    causes: [
      "Xanthomonas spp. bacteria",
      "Warm, wet conditions",
      "Infected seed or transplants",
    ],
    prevention: [
      "Use disease-free seed and transplants",
      "Avoid overhead irrigation",
      "Rotate crops with non-hosts",
    ],
    treatment: [
      "Apply copper-based bactericides",
      "Use streptomycin for severe cases",
      "Remove and destroy infected plants",
    ],
  },
  "Pepper,_bell___healthy": {
    title: "Healthy Bell Pepper",
    description: "The plant shows no signs of disease and is in good health.",
    causes: [],
    prevention: [
      "Proper plant spacing",
      "Balanced fertilization",
      "Regular monitoring",
    ],
    treatment: [],
  },

  // Potato
  Potato___Early_blight: {
    title: "Early Blight",
    description:
      "A fungal disease causing concentric rings on leaves and stems that can reduce yields.",
    causes: [
      "Alternaria solani fungus",
      "Warm, humid conditions",
      "Stress from drought or poor nutrition",
    ],
    prevention: [
      "Plant certified seed potatoes",
      "Maintain adequate nitrogen levels",
      "Use mulch to prevent soil splash",
    ],
    treatment: [
      "Apply chlorothalonil or mancozeb",
      "Begin sprays when plants are 6-8 inches tall",
      "Remove infected plant debris",
    ],
  },
  Potato___Late_blight: {
    title: "Late Blight",
    description:
      "A devastating fungal disease that can destroy entire fields rapidly under wet conditions.",
    causes: [
      "Phytophthora infestans fungus",
      "Cool, wet weather",
      "Infected seed potatoes or volunteer plants",
    ],
    prevention: [
      "Plant resistant varieties like Defender",
      "Destroy cull piles and volunteers",
      "Avoid overhead irrigation",
    ],
    treatment: [
      "Apply fungicides containing chlorothalonil or metalaxyl",
      "Begin sprays before disease appears in wet weather",
      "Destroy infected plants immediately",
    ],
  },
  Potato___healthy: {
    title: "Healthy Potato",
    description: "The plant shows no signs of disease and is in good health.",
    causes: [],
    prevention: [
      "Use certified disease-free seed potatoes",
      "Practice crop rotation",
      "Monitor for pests and diseases",
    ],
    treatment: [],
  },

  // Raspberry
  Raspberry___healthy: {
    title: "Healthy Raspberry",
    description: "The plant shows no signs of disease and is in good health.",
    causes: [],
    prevention: [
      "Annual pruning of old canes",
      "Proper trellising for air circulation",
      "Monitor for pests",
    ],
    treatment: [],
  },

  // Soybean
  Soybean___healthy: {
    title: "Healthy Soybean",
    description: "The plant shows no signs of disease and is in good health.",
    causes: [],
    prevention: [
      "Practice crop rotation",
      "Use disease-free seed",
      "Maintain proper soil fertility",
    ],
    treatment: [],
  },

  // Squash
  Squash___Powdery_mildew: {
    title: "Powdery Mildew",
    description:
      "A fungal disease appearing as white powdery spots on leaves that can reduce yields.",
    causes: [
      "Several Podosphaera and Erysiphe species",
      "Warm days and cool nights",
      "High humidity",
    ],
    prevention: [
      "Plant resistant varieties",
      "Space plants for good air circulation",
      "Avoid overhead watering",
    ],
    treatment: [
      "Apply sulfur or potassium bicarbonate",
      "Use horticultural oils",
      "Remove severely infected leaves",
    ],
  },

  // Strawberry
  Strawberry___Leaf_scorch: {
    title: "Leaf Scorch",
    description:
      "A fungal disease causing purple spots on leaves that can lead to defoliation.",
    causes: [
      "Diplocarpon earlianum fungus",
      "Wet foliage from rain or irrigation",
      "Infected plant debris",
    ],
    prevention: [
      "Plant resistant varieties",
      "Use drip irrigation",
      "Remove old infected leaves",
    ],
    treatment: [
      "Apply fungicides containing myclobutanil",
      "Begin sprays at first sign of disease",
      "Remove severely infected plants",
    ],
  },
  Strawberry___healthy: {
    title: "Healthy Strawberry",
    description: "The plant shows no signs of disease and is in good health.",
    causes: [],
    prevention: [
      "Renovate beds annually",
      "Use mulch to prevent soil splash",
      "Monitor for pests and diseases",
    ],
    treatment: [],
  },

  // Tomato
  Tomato___Bacterial_spot: {
    title: "Bacterial Spot",
    description:
      "A bacterial disease causing small, water-soaked spots on leaves, stems and fruit.",
    causes: [
      "Xanthomonas spp. bacteria",
      "Warm, wet weather",
      "Infected seed or transplants",
    ],
    prevention: [
      "Use disease-free seed and transplants",
      "Avoid overhead irrigation",
      "Rotate crops with non-hosts",
    ],
    treatment: [
      "Apply copper-based bactericides",
      "Use streptomycin for severe cases",
      "Remove and destroy infected plants",
    ],
  },
  Tomato___Early_blight: {
    title: "Early Blight",
    description:
      "A fungal disease causing target-like lesions on leaves that can defoliate plants.",
    causes: [
      "Alternaria solani fungus",
      "Warm, humid conditions",
      "Stress from drought or poor nutrition",
    ],
    prevention: [
      "Plant resistant varieties",
      "Use mulch to prevent soil splash",
      "Space plants for good air circulation",
    ],
    treatment: [
      "Apply chlorothalonil or copper fungicides",
      "Begin sprays at first sign of disease",
      "Remove infected leaves",
    ],
  },
  Tomato___Late_blight: {
    title: "Late Blight",
    description:
      "A devastating fungal disease that can kill plants rapidly under cool, wet conditions.",
    causes: [
      "Phytophthora infestans fungus",
      "Cool, wet weather",
      "Infected seed potatoes or tomato transplants",
    ],
    prevention: [
      "Plant resistant varieties",
      "Avoid overhead irrigation",
      "Destroy volunteer potatoes and tomatoes",
    ],
    treatment: [
      "Apply fungicides containing chlorothalonil or metalaxyl",
      "Begin sprays before disease appears in wet weather",
      "Destroy infected plants immediately",
    ],
  },
  Tomato___Leaf_Mold: {
    title: "Leaf Mold",
    description:
      "A fungal disease causing yellow spots on upper leaf surfaces with fuzzy gray mold underneath.",
    causes: [
      "Passalora fulva fungus",
      "High humidity (>85%)",
      "Poor air circulation",
    ],
    prevention: [
      "Plant resistant varieties",
      "Space plants for good air flow",
      "Use drip irrigation",
    ],
    treatment: [
      "Apply chlorothalonil or copper fungicides",
      "Remove infected leaves promptly",
      "Reduce humidity in greenhouses",
    ],
  },
  Tomato___Septoria_leaf_spot: {
    title: "Septoria Leaf Spot",
    description:
      "A fungal disease causing small circular spots with dark margins and light centers on leaves.",
    causes: [
      "Septoria lycopersici fungus",
      "Wet, humid conditions",
      "Infected plant debris",
    ],
    prevention: [
      "Use disease-free transplants",
      "Mulch to prevent soil splash",
      "Rotate crops with non-hosts",
    ],
    treatment: [
      "Apply chlorothalonil or copper fungicides",
      "Remove infected lower leaves",
      "Avoid overhead watering",
    ],
  },
  "Tomato___Spider_mites Two-spotted_spider_mite": {
    title: "Spider Mites",
    description:
      "Tiny arachnids that feed on plant sap, causing stippling and webbing on leaves.",
    causes: [
      "Hot, dry conditions",
      "Dusty environments",
      "Overuse of broad-spectrum insecticides",
    ],
    prevention: [
      "Maintain adequate irrigation",
      "Avoid excessive nitrogen fertilization",
      "Encourage natural predators",
    ],
    treatment: [
      "Apply insecticidal soaps or horticultural oils",
      "Use miticides for severe infestations",
      "Spray plants with strong water stream",
    ],
  },
  Tomato___Target_Spot: {
    title: "Target Spot",
    description:
      "A fungal disease causing circular spots with concentric rings that can defoliate plants.",
    causes: [
      "Corynespora cassiicola fungus",
      "Warm, humid conditions",
      "Infected plant debris",
    ],
    prevention: [
      "Plant resistant varieties",
      "Space plants for good air flow",
      "Remove infected plant debris",
    ],
    treatment: [
      "Apply chlorothalonil or azoxystrobin",
      "Begin sprays at first sign of disease",
      "Remove severely infected leaves",
    ],
  },
  Tomato___Tomato_Yellow_Leaf_Curl_Virus: {
    title: "Yellow Leaf Curl Virus",
    description:
      "A viral disease causing upward curling of leaves, yellowing, and stunted growth.",
    causes: [
      "Tomato yellow leaf curl virus",
      "Transmitted by whiteflies",
      "Infected transplants or weeds",
    ],
    prevention: [
      "Plant resistant varieties",
      "Control whiteflies with insecticides",
      "Remove infected plants promptly",
    ],
    treatment: [
      "No cure for infected plants",
      "Remove and destroy infected plants",
      "Control whitefly populations",
    ],
  },
  Tomato___Tomato_mosaic_virus: {
    title: "Mosaic Virus",
    description:
      "A viral disease causing mottled light and dark green areas on leaves and stunted growth.",
    causes: [
      "Tobacco mosaic virus or Tomato mosaic virus",
      "Mechanical transmission through tools or hands",
      "Infected seed or transplants",
    ],
    prevention: [
      "Use virus-free seed and transplants",
      "Disinfect tools between plants",
      "Wash hands after handling tobacco",
    ],
    treatment: [
      "No cure for infected plants",
      "Remove and destroy infected plants",
      "Control weeds that may harbor virus",
    ],
  },
  Tomato___healthy: {
    title: "Healthy Tomato",
    description: "The plant shows no signs of disease and is in good health.",
    causes: [],
    prevention: [
      "Proper plant spacing",
      "Balanced fertilization",
      "Regular monitoring",
    ],
    treatment: [],
  },
};

export default plantDiseaseData;
