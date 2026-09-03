// ─────────────────────────────────────────────
// 1. DONNÉES
// ─────────────────────────────────────────────
const CATEGORIES = [
  { id: "fleuve",                 label: "A un fleuve dans son nom" },
  { id: "montagne",               label: "A une montagne dans son nom" },
  { id: "multiple5",              label: "Numéro multiple de 5" },
  { id: "cotier",                 label: "Est côtier" },
  { id: "frontalier",             label: "Est frontalier" },
  { id: "plus4voisins",           label: "A plus de 4 départements limitrophes" },
  { id: "sup6000km2",             label: "Superficie supérieure à 6 000 km²" },
  { id: "inf3500km2",             label: "Superficie inférieure à 3 500 km²" },
  { id: "pop1M",                  label: "Population supérieure à 1 million" },
  { id: "pop500k",                label: "Population inférieure à 500 000" },
  { id: "sansE",                  label: "Ne contient pas la lettre E" },
  { id: "voyelle",                label: "Commence par une voyelle" },
  { id: "sans100villes",          label: "Sans grande ville (top 100)" },
  { id: "moins300Clermont",       label: "À moins de 300 km de Clermont-Ferrand" },
  { id: "plus300Clermont",        label: "À plus de 300 km de Clermont-Ferrand" },
  { id: "zoneL",                  label: "Faisait partie de la zone Libre en 1941" },
  { id: "zoneO",                  label: "Faisait partie de la zone Occupée en 1941" },
  { id: "voteMacron2022",         label: "A voté Macron au second tour en 2022" },
  { id: "voteLepen2022",          label: "A voté Le Pen au second tour en 2022" },
  { id: "genreMasc",              label: "Est au masculin" },
  { id: "genreFem",               label: "Est au féminin" },
  { id: "motCarafe",              label: "Où l'on utilise le mot Carafe" },
  { id: "motPichet",              label: "Où l'on utilise le mot Pichet" },
  { id: "motCruche",              label: "Où l'on utilise le mot Cruche" },
  { id: "motPotDeau",             label: "Où l'on utilise le mot Pot d'eau" },
  { id: "asterixVisite",          label: "Visité par Astérix dans ses aventures" },
  { id: "zenith",                 label: "Possède un Zénith" },
  { id: "plusNordVancouver",      label: "Est plus au nord que Vancouver" },
  { id: "clubL1L2",               label: "A une équipe en Ligue 1 ou Ligue 2" },
  { id: "reg_ARA",                label: "En région Auvergne-Rhône-Alpes" },
  { id: "reg_BFC",                label: "En région Bourgogne-Franche-Comté" },
  { id: "reg_BRE",                label: "En région Bretagne" },
  { id: "reg_CVL",                label: "En région Centre-Val de Loire" },
  { id: "reg_GE",                 label: "En région Grand Est" },
  { id: "reg_HDF",                label: "En région Hauts-de-France" },
  { id: "reg_IDF",                label: "En région Île-de-France" },
  { id: "reg_NOR",                label: "En région Normandie" },
  { id: "reg_NAQ",                label: "En région Nouvelle-Aquitaine" },
  { id: "reg_OCC",                label: "En région Occitanie" },
  { id: "reg_PDL",                label: "En région Pays de la Loire" },
  { id: "reg_PAC",                label: "En région Provence-Alpes-Côte d'Azur" },
  { id: "nomCompose",             label: "A un nom composé (avec tiret)" },
  { id: "sansTiret",              label: "Nom en un seul mot (sans tiret)" },
  { id: "lettreR",                label: "Contient la lettre R" },
  { id: "lettreL",                label: "Contient la lettre L" },
  { id: "lettreA",                label: "Contient la lettre A" },
  { id: "sansLettreA",            label: "Ne contient pas la lettre A" },
  { id: "nomCourt",               label: "Nom court (6 lettres ou moins)" },
  { id: "nomLong",                label: "Nom long (8 lettres ou plus)" },
  { id: "terrestre",              label: "Totalement enclavé (sans accès à la mer)" },
  { id: "numeroPair",             label: "Numéro de département pair" },
  { id: "numeroImpair",           label: "Numéro de département impair" },
  { id: "numInf50",               label: "Numéro inférieur à 50 (01 à 49)" },
  { id: "numSup50",               label: "Numéro supérieur ou égal à 50" },
  { id: "axeParisLyonMarseille",  label: "Traversé par l'autoroute A6 ou A7" },
  { id: "facadeAtlantiqueManche", label: "Borde l'océan Atlantique ou la Manche" },
  { id: "nordDeLaLoire",          label: "Situé au nord de la Loire" },
  { id: "pointCulminant1000m",    label: "Point culminant supérieur à 1 000 m" }
];

const REGION_VERS_ID = {
  "Auvergne-Rhône-Alpes":        "reg_ARA",
  "Bourgogne-Franche-Comté":     "reg_BFC",
  "Bretagne":                    "reg_BRE",
  "Centre-Val de Loire":         "reg_CVL",
  "Grand Est":                   "reg_GE",
  "Hauts-de-France":             "reg_HDF",
  "Île-de-France":               "reg_IDF",
  "Normandie":                   "reg_NOR",
  "Nouvelle-Aquitaine":          "reg_NAQ",
  "Occitanie":                   "reg_OCC",
  "Pays de la Loire":            "reg_PDL",
  "Provence-Alpes-Côte d'Azur":  "reg_PAC"
};

const DEPARTEMENTS = [
  { num:"01", nom:"Ain", region:"Auvergne-Rhône-Alpes", cats:{ fleuve:false, montagne:false, multiple5:false, cotier:false, frontalier:true, plus4voisins:true, sup6000km2:false, inf3500km2:false, pop1M:false, pop500k:false, sans100villes:true, moins300Clermont:true, plus300Clermont:false, zoneL:false, zoneO:true, voteMacron2022:true, voteLepen2022:false, genreMasc:true, genreFem:false, motCarafe:true, motPichet:false, motCruche:false, motPotDeau:true, asterixVisite:false, zenith:false, plusNordVancouver:false, clubL1L2:false, nomCompose:false, sansTiret:true, lettreR:false, lettreL:false, lettreA:true, sansLettreA:false, nomCourt:true, nomLong:false, terrestre:true, numeroPair:false, numeroImpair:true, numInf50:true, numSup50:false, axeParisLyonMarseille:false, facadeAtlantiqueManche:false, nordDeLaLoire:false, pointCulminant1000m:true } },
  { num:"02", nom:"Aisne", region:"Hauts-de-France", cats:{ fleuve:false, montagne:false, multiple5:false, cotier:false, frontalier:true, plus4voisins:true, sup6000km2:true, inf3500km2:false, pop1M:false, pop500k:false, sans100villes:false, moins300Clermont:false, plus300Clermont:true, zoneL:false, zoneO:true, voteMacron2022:false, voteLepen2022:true, genreMasc:false, genreFem:true, motCarafe:true, motPichet:false, motCruche:false, motPotDeau:false, asterixVisite:false, zenith:false, plusNordVancouver:true, clubL1L2:false, nomCompose:false, sansTiret:true, lettreR:false, lettreL:false, lettreA:true, sansLettreA:false, nomCourt:true, nomLong:false, terrestre:true, numeroPair:true, numeroImpair:false, numInf50:true, numSup50:false, axeParisLyonMarseille:false, facadeAtlantiqueManche:false, nordDeLaLoire:true, pointCulminant1000m:false } },
  { num:"03", nom:"Allier", region:"Auvergne-Rhône-Alpes", cats:{ fleuve:false, montagne:false, multiple5:false, cotier:false, frontalier:false, plus4voisins:true, sup6000km2:true, inf3500km2:false, pop1M:false, pop500k:true, sans100villes:true, moins300Clermont:true, plus300Clermont:false, zoneL:true, zoneO:false, voteMacron2022:true, voteLepen2022:false, genreMasc:true, genreFem:false, motCarafe:false, motPichet:true, motCruche:false, motPotDeau:false, asterixVisite:false, zenith:false, plusNordVancouver:false, clubL1L2:false, nomCompose:false, sansTiret:true, lettreR:true, lettreL:true, lettreA:true, sansLettreA:false, nomCourt:true, nomLong:false, terrestre:true, numeroPair:false, numeroImpair:true, numInf50:true, numSup50:false, axeParisLyonMarseille:false, facadeAtlantiqueManche:false, nordDeLaLoire:false, pointCulminant1000m:true } },
  { num:"04", nom:"Alpes-de-Haute-Provence", region:"Provence-Alpes-Côte d'Azur", cats:{ fleuve:false, montagne:true, multiple5:false, cotier:false, frontalier:true, plus4voisins:true, sup6000km2:true, inf3500km2:false, pop1M:false, pop500k:true, sans100villes:true, moins300Clermont:true, plus300Clermont:false, zoneL:true, zoneO:false, voteMacron2022:false, voteLepen2022:true, genreMasc:false, genreFem:true, motCarafe:false, motPichet:false, motCruche:false, motPotDeau:true, asterixVisite:false, zenith:false, plusNordVancouver:false, clubL1L2:false, nomCompose:true, sansTiret:false, lettreR:true, lettreL:true, lettreA:true, sansLettreA:false, nomCourt:false, nomLong:true, terrestre:true, numeroPair:true, numeroImpair:false, numInf50:true, numSup50:false, axeParisLyonMarseille:false, facadeAtlantiqueManche:false, nordDeLaLoire:false, pointCulminant1000m:true } },
  { num:"05", nom:"Hautes-Alpes", region:"Provence-Alpes-Côte d'Azur", cats:{ fleuve:false, montagne:true, multiple5:true, cotier:false, frontalier:true, plus4voisins:true, sup6000km2:false, inf3500km2:false, pop1M:false, pop500k:true, sans100villes:true, moins300Clermont:true, plus300Clermont:false, zoneL:true, zoneO:false, voteMacron2022:true, voteLepen2022:false, genreMasc:false, genreFem:true, motCarafe:false, motPichet:false, motCruche:false, motPotDeau:true, asterixVisite:false, zenith:false, plusNordVancouver:false, clubL1L2:false, nomCompose:true, sansTiret:false, lettreR:false, lettreL:true, lettreA:true, sansLettreA:false, nomCourt:false, nomLong:true, terrestre:true, numeroPair:false, numeroImpair:true, numInf50:true, numSup50:false, axeParisLyonMarseille:false, facadeAtlantiqueManche:false, nordDeLaLoire:false, pointCulminant1000m:true } },
  { num:"06", nom:"Alpes-Maritimes", region:"Provence-Alpes-Côte d'Azur", cats:{ fleuve:false, montagne:true, multiple5:false, cotier:true, frontalier:true, plus4voisins:false, sup6000km2:false, inf3500km2:false, pop1M:true, pop500k:false, sans100villes:false, moins300Clermont:false, plus300Clermont:true, zoneL:true, zoneO:false, voteMacron2022:true, voteLepen2022:false, genreMasc:false, genreFem:true, motCarafe:true, motPichet:false, motCruche:false, motPotDeau:false, asterixVisite:true, zenith:false, plusNordVancouver:false, clubL1L2:true, nomCompose:true, sansTiret:false, lettreR:true, lettreL:true, lettreA:true, sansLettreA:false, nomCourt:false, nomLong:true, terrestre:false, numeroPair:true, numeroImpair:false, numInf50:true, numSup50:false, axeParisLyonMarseille:false, facadeAtlantiqueManche:false, nordDeLaLoire:false, pointCulminant1000m:true } },
  { num:"07", nom:"Ardèche", region:"Auvergne-Rhône-Alpes", cats:{ fleuve:false, montagne:false, multiple5:false, cotier:false, frontalier:false, plus4voisins:true, sup6000km2:false, inf3500km2:false, pop1M:false, pop500k:true, sans100villes:true, moins300Clermont:true, plus300Clermont:false, zoneL:true, zoneO:false, voteMacron2022:true, voteLepen2022:false, genreMasc:false, genreFem:true, motCarafe:false, motPichet:false, motCruche:false, motPotDeau:true, asterixVisite:false, zenith:false, plusNordVancouver:false, clubL1L2:false, nomCompose:false, sansTiret:true, lettreR:true, lettreL:false, lettreA:true, sansLettreA:false, nomCourt:false, nomLong:false, terrestre:true, numeroPair:false, numeroImpair:true, numInf50:true, numSup50:false, axeParisLyonMarseille:true, facadeAtlantiqueManche:false, nordDeLaLoire:false, pointCulminant1000m:true } },
  { num:"08", nom:"Ardennes", region:"Grand Est", cats:{ fleuve:false, montagne:false, multiple5:false, cotier:false, frontalier:true, plus4voisins:false, sup6000km2:false, inf3500km2:false, pop1M:false, pop500k:true, sans100villes:true, moins300Clermont:false, plus300Clermont:true, zoneL:false, zoneO:true, voteMacron2022:false, voteLepen2022:true, genreMasc:false, genreFem:true, motCarafe:false, motPichet:false, motCruche:true, motPotDeau:false, asterixVisite:false, zenith:false, plusNordVancouver:true, clubL1L2:false, nomCompose:false, sansTiret:true, lettreR:true, lettreL:false, lettreA:true, sansLettreA:false, nomCourt:false, nomLong:true, terrestre:true, numeroPair:true, numeroImpair:false, numInf50:true, numSup50:false, axeParisLyonMarseille:false, facadeAtlantiqueManche:false, nordDeLaLoire:true, pointCulminant1000m:false } },
  { num:"09", nom:"Ariège", region:"Occitanie", cats:{ fleuve:false, montagne:false, multiple5:false, cotier:false, frontalier:true, plus4voisins:false, sup6000km2:false, inf3500km2:false, pop1M:false, pop500k:true, sans100villes:true, moins300Clermont:false, plus300Clermont:true, zoneL:true, zoneO:false, voteMacron2022:true, voteLepen2022:false, genreMasc:false, genreFem:true, motCarafe:true, motPichet:false, motCruche:false, motPotDeau:false, asterixVisite:false, zenith:false, plusNordVancouver:false, clubL1L2:false, nomCompose:false, sansTiret:true, lettreR:true, lettreL:false, lettreA:true, sansLettreA:false, nomCourt:true, nomLong:false, terrestre:true, numeroPair:false, numeroImpair:true, numInf50:true, numSup50:false, axeParisLyonMarseille:false, facadeAtlantiqueManche:false, nordDeLaLoire:false, pointCulminant1000m:true } },
  { num:"10", nom:"Aube", region:"Grand Est", cats:{ fleuve:false, montagne:false, multiple5:true, cotier:false, frontalier:false, plus4voisins:true, sup6000km2:true, inf3500km2:false, pop1M:false, pop500k:true, sans100villes:false, moins300Clermont:true, plus300Clermont:false, zoneL:false, zoneO:true, voteMacron2022:false, voteLepen2022:true, genreMasc:false, genreFem:true, motCarafe:false, motPichet:false, motCruche:true, motPotDeau:false, asterixVisite:false, zenith:false, plusNordVancouver:false, clubL1L2:true, nomCompose:false, sansTiret:true, lettreR:false, lettreL:false, lettreA:true, sansLettreA:false, nomCourt:true, nomLong:false, terrestre:true, numeroPair:true, numeroImpair:false, numInf50:true, numSup50:false, axeParisLyonMarseille:false, facadeAtlantiqueManche:false, nordDeLaLoire:true, pointCulminant1000m:false } },
  { num:"11", nom:"Aude", region:"Occitanie", cats:{ fleuve:false, montagne:false, multiple5:false, cotier:true, frontalier:false, plus4voisins:true, sup6000km2:true, inf3500km2:false, pop1M:false, pop500k:true, sans100villes:true, moins300Clermont:true, plus300Clermont:false, zoneL:true, zoneO:false, voteMacron2022:false, voteLepen2022:true, genreMasc:false, genreFem:true, motCarafe:true, motPichet:false, motCruche:false, motPotDeau:false, asterixVisite:false, zenith:false, plusNordVancouver:false, clubL1L2:false, nomCompose:false, sansTiret:true, lettreR:false, lettreL:false, lettreA:true, sansLettreA:false, nomCourt:true, nomLong:false, terrestre:false, numeroPair:false, numeroImpair:true, numInf50:true, numSup50:false, axeParisLyonMarseille:false, facadeAtlantiqueManche:false, nordDeLaLoire:false, pointCulminant1000m:true } },
  { num:"12", nom:"Aveyron", region:"Occitanie", cats:{ fleuve:false, montagne:false, multiple5:false, cotier:false, frontalier:false, plus4voisins:true, sup6000km2:true, inf3500km2:false, pop1M:false, pop500k:true, sans100villes:true, moins300Clermont:true, plus300Clermont:false, zoneL:true, zoneO:false, voteMacron2022:true, voteLepen2022:false, genreMasc:true, genreFem:false, motCarafe:true, motPichet:false, motCruche:false, motPotDeau:false, asterixVisite:false, zenith:false, plusNordVancouver:false, clubL1L2:true, nomCompose:false, sansTiret:true, lettreR:true, lettreL:false, lettreA:true, sansLettreA:false, nomCourt:false, nomLong:false, terrestre:true, numeroPair:true, numeroImpair:false, numInf50:true, numSup50:false, axeParisLyonMarseille:false, facadeAtlantiqueManche:false, nordDeLaLoire:false, pointCulminant1000m:true } },
  { num:"13", nom:"Bouches-du-Rhône", region:"Provence-Alpes-Côte d'Azur", cats:{ fleuve:true, montagne:false, multiple5:false, cotier:true, frontalier:false, plus4voisins:false, sup6000km2:false, inf3500km2:false, pop1M:true, pop500k:false, sans100villes:false, moins300Clermont:false, plus300Clermont:true, zoneL:true, zoneO:false, voteMacron2022:true, voteLepen2022:false, genreMasc:false, genreFem:true, motCarafe:false, motPichet:false, motCruche:false, motPotDeau:true, asterixVisite:true, zenith:false, plusNordVancouver:false, clubL1L2:true, nomCompose:true, sansTiret:false, lettreR:true, lettreL:false, lettreA:false, sansLettreA:true, nomCourt:false, nomLong:true, terrestre:false, numeroPair:false, numeroImpair:true, numInf50:true, numSup50:false, axeParisLyonMarseille:true, facadeAtlantiqueManche:false, nordDeLaLoire:false, pointCulminant1000m:true } },
  { num:"14", nom:"Calvados", region:"Normandie", cats:{ fleuve:false, montagne:false, multiple5:false, cotier:true, frontalier:false, plus4voisins:false, sup6000km2:false, inf3500km2:false, pop1M:false, pop500k:false, sans100villes:false, moins300Clermont:false, plus300Clermont:true, zoneL:false, zoneO:true, voteMacron2022:true, voteLepen2022:false, genreMasc:true, genreFem:false, motCarafe:false, motPichet:true, motCruche:false, motPotDeau:false, asterixVisite:false, zenith:true, plusNordVancouver:true, clubL1L2:true, nomCompose:false, sansTiret:true, lettreR:false, lettreL:true, lettreA:true, sansLettreA:false, nomCourt:false, nomLong:true, terrestre:false, numeroPair:true, numeroImpair:false, numInf50:true, numSup50:false, axeParisLyonMarseille:false, facadeAtlantiqueManche:true, nordDeLaLoire:true, pointCulminant1000m:false } },
  { num:"15", nom:"Cantal", region:"Auvergne-Rhône-Alpes", cats:{ fleuve:false, montagne:true, multiple5:true, cotier:false, frontalier:false, plus4voisins:false, sup6000km2:false, inf3500km2:false, pop1M:false, pop500k:true, sans100villes:true, moins300Clermont:true, plus300Clermont:false, zoneL:true, zoneO:false, voteMacron2022:true, voteLepen2022:false, genreMasc:true, genreFem:false, motCarafe:false, motPichet:true, motCruche:false, motPotDeau:false, asterixVisite:false, zenith:false, plusNordVancouver:false, clubL1L2:false, nomCompose:false, sansTiret:true, lettreR:false, lettreL:true, lettreA:true, sansLettreA:false, nomCourt:true, nomLong:false, terrestre:true, numeroPair:false, numeroImpair:true, numInf50:true, numSup50:false, axeParisLyonMarseille:false, facadeAtlantiqueManche:false, nordDeLaLoire:false, pointCulminant1000m:true } },
  { num:"16", nom:"Charente", region:"Nouvelle-Aquitaine", cats:{ fleuve:true, montagne:false, multiple5:false, cotier:false, frontalier:false, plus4voisins:true, sup6000km2:false, inf3500km2:false, pop1M:false, pop500k:true, sans100villes:true, moins300Clermont:true, plus300Clermont:false, zoneL:false, zoneO:true, voteMacron2022:true, voteLepen2022:false, genreMasc:false, genreFem:true, motCarafe:false, motPichet:true, motCruche:false, motPotDeau:false, asterixVisite:false, zenith:false, plusNordVancouver:false, clubL1L2:false, nomCompose:false, sansTiret:true, lettreR:true, lettreL:false, lettreA:true, sansLettreA:false, nomCourt:false, nomLong:true, terrestre:true, numeroPair:true, numeroImpair:false, numInf50:true, numSup50:false, axeParisLyonMarseille:false, facadeAtlantiqueManche:false, nordDeLaLoire:false, pointCulminant1000m:false } },
  { num:"17", nom:"Charente-Maritime", region:"Nouvelle-Aquitaine", cats:{ fleuve:true, montagne:false, multiple5:false, cotier:true, frontalier:false, plus4voisins:true, sup6000km2:true, inf3500km2:false, pop1M:false, pop500k:false, sans100villes:false, moins300Clermont:false, plus300Clermont:true, zoneL:false, zoneO:true, voteMacron2022:true, voteLepen2022:false, genreMasc:false, genreFem:true, motCarafe:false, motPichet:true, motCruche:false, motPotDeau:false, asterixVisite:false, zenith:false, plusNordVancouver:false, clubL1L2:false, nomCompose:true, sansTiret:false, lettreR:true, lettreL:false, lettreA:true, sansLettreA:false, nomCourt:false, nomLong:true, terrestre:false, numeroPair:false, numeroImpair:true, numInf50:true, numSup50:false, axeParisLyonMarseille:false, facadeAtlantiqueManche:true, nordDeLaLoire:false, pointCulminant1000m:false } },
  { num:"18", nom:"Cher", region:"Centre-Val de Loire", cats:{ fleuve:false, montagne:false, multiple5:false, cotier:false, frontalier:false, plus4voisins:true, sup6000km2:true, inf3500km2:false, pop1M:false, pop500k:true, sans100villes:false, moins300Clermont:true, plus300Clermont:false, zoneL:false, zoneO:true, voteMacron2022:true, voteLepen2022:false, genreMasc:true, genreFem:false, motCarafe:false, motPichet:true, motCruche:false, motPotDeau:false, asterixVisite:false, zenith:false, plusNordVancouver:false, clubL1L2:false, nomCompose:false, sansTiret:true, lettreR:true, lettreL:false, lettreA:false, sansLettreA:true, nomCourt:true, nomLong:false, terrestre:true, numeroPair:true, numeroImpair:false, numInf50:true, numSup50:false, axeParisLyonMarseille:false, facadeAtlantiqueManche:false, nordDeLaLoire:false, pointCulminant1000m:false } },
  { num:"19", nom:"Corrèze", region:"Nouvelle-Aquitaine", cats:{ fleuve:false, montagne:false, multiple5:false, cotier:false, frontalier:false, plus4voisins:true, sup6000km2:false, inf3500km2:false, pop1M:false, pop500k:true, sans100villes:true, moins300Clermont:true, plus300Clermont:false, zoneL:true, zoneO:false, voteMacron2022:true, voteLepen2022:false, genreMasc:false, genreFem:true, motCarafe:false, motPichet:true, motCruche:false, motPotDeau:false, asterixVisite:false, zenith:false, plusNordVancouver:false, clubL1L2:false, nomCompose:false, sansTiret:true, lettreR:true, lettreL:false, lettreA:false, sansLettreA:true, nomCourt:false, nomLong:false, terrestre:true, numeroPair:false, numeroImpair:true, numInf50:true, numSup50:false, axeParisLyonMarseille:false, facadeAtlantiqueManche:false, nordDeLaLoire:false, pointCulminant1000m:false } },
  { num:"21", nom:"Côte-d'Or", region:"Bourgogne-Franche-Comté", cats:{ fleuve:false, montagne:false, multiple5:false, cotier:false, frontalier:false, plus4voisins:true, sup6000km2:true, inf3500km2:false, pop1M:false, pop500k:false, sans100villes:false, moins300Clermont:true, plus300Clermont:false, zoneL:false, zoneO:true, voteMacron2022:true, voteLepen2022:false, genreMasc:false, genreFem:true, motCarafe:false, motPichet:false, motCruche:false, motPotDeau:true, asterixVisite:false, zenith:true, plusNordVancouver:false, clubL1L2:false, nomCompose:true, sansTiret:false, lettreR:true, lettreL:false, lettreA:false, sansLettreA:true, nomCourt:false, nomLong:false, terrestre:true, numeroPair:false, numeroImpair:true, numInf50:true, numSup50:false, axeParisLyonMarseille:true, facadeAtlantiqueManche:false, nordDeLaLoire:true, pointCulminant1000m:false } },
  { num:"22", nom:"Côtes-d'Armor", region:"Bretagne", cats:{ fleuve:false, montagne:false, multiple5:false, cotier:true, frontalier:false, plus4voisins:false, sup6000km2:true, inf3500km2:false, pop1M:false, pop500k:false, sans100villes:false, moins300Clermont:false, plus300Clermont:true, zoneL:false, zoneO:true, voteMacron2022:true, voteLepen2022:false, genreMasc:false, genreFem:true, motCarafe:false, motPichet:true, motCruche:false, motPotDeau:false, asterixVisite:true, zenith:false, plusNordVancouver:false, clubL1L2:true, nomCompose:true, sansTiret:false, lettreR:true, lettreL:false, lettreA:true, sansLettreA:false, nomCourt:false, nomLong:true, terrestre:false, numeroPair:true, numeroImpair:false, numInf50:true, numSup50:false, axeParisLyonMarseille:false, facadeAtlantiqueManche:true, nordDeLaLoire:true, pointCulminant1000m:false } },
  { num:"23", nom:"Creuse", region:"Nouvelle-Aquitaine", cats:{ fleuve:false, montagne:false, multiple5:false, cotier:false, frontalier:false, plus4voisins:true, sup6000km2:false, inf3500km2:false, pop1M:false, pop500k:true, sans100villes:true, moins300Clermont:true, plus300Clermont:false, zoneL:true, zoneO:false, voteMacron2022:true, voteLepen2022:false, genreMasc:false, genreFem:true, motCarafe:false, motPichet:true, motCruche:false, motPotDeau:false, asterixVisite:false, zenith:false, plusNordVancouver:false, clubL1L2:false, nomCompose:false, sansTiret:true, lettreR:true, lettreL:false, lettreA:false, sansLettreA:true, nomCourt:true, nomLong:false, terrestre:true, numeroPair:false, numeroImpair:true, numInf50:true, numSup50:false, axeParisLyonMarseille:false, facadeAtlantiqueManche:false, nordDeLaLoire:false, pointCulminant1000m:false } },
  { num:"24", nom:"Dordogne", region:"Nouvelle-Aquitaine", cats:{ fleuve:true, montagne:false, multiple5:false, cotier:false, frontalier:false, plus4voisins:true, sup6000km2:true, inf3500km2:false, pop1M:false, pop500k:true, sans100villes:true, moins300Clermont:true, plus300Clermont:false, zoneL:true, zoneO:false, voteMacron2022:true, voteLepen2022:false, genreMasc:false, genreFem:true, motCarafe:false, motPichet:true, motCruche:false, motPotDeau:false, asterixVisite:false, zenith:false, plusNordVancouver:false, clubL1L2:false, nomCompose:false, sansTiret:true, lettreR:true, lettreL:false, lettreA:false, sansLettreA:true, nomCourt:false, nomLong:true, terrestre:true, numeroPair:true, numeroImpair:false, numInf50:true, numSup50:false, axeParisLyonMarseille:false, facadeAtlantiqueManche:false, nordDeLaLoire:false, pointCulminant1000m:false } },
  { num:"25", nom:"Doubs", region:"Bourgogne-Franche-Comté", cats:{ fleuve:false, montagne:false, multiple5:true, cotier:false, frontalier:true, plus4voisins:false, sup6000km2:false, inf3500km2:false, pop1M:false, pop500k:false, sans100villes:false, moins300Clermont:false, plus300Clermont:true, zoneL:false, zoneO:true, voteMacron2022:true, voteLepen2022:false, genreMasc:true, genreFem:false, motCarafe:false, motPichet:false, motCruche:true, motPotDeau:false, asterixVisite:false, zenith:false, plusNordVancouver:false, clubL1L2:false, nomCompose:false, sansTiret:true, lettreR:false, lettreL:false, lettreA:false, sansLettreA:true, nomCourt:true, nomLong:false, terrestre:true, numeroPair:false, numeroImpair:true, numInf50:true, numSup50:false, axeParisLyonMarseille:false, facadeAtlantiqueManche:false, nordDeLaLoire:false, pointCulminant1000m:true } },
  { num:"26", nom:"Drôme", region:"Auvergne-Rhône-Alpes", cats:{ fleuve:false, montagne:false, multiple5:false, cotier:false, frontalier:false, plus4voisins:true, sup6000km2:true, inf3500km2:false, pop1M:false, pop500k:false, sans100villes:false, moins300Clermont:true, plus300Clermont:false, zoneL:true, zoneO:false, voteMacron2022:true, voteLepen2022:false, genreMasc:false, genreFem:true, motCarafe:false, motPichet:false, motCruche:false, motPotDeau:true, asterixVisite:false, zenith:false, plusNordVancouver:false, clubL1L2:false, nomCompose:false, sansTiret:true, lettreR:true, lettreL:false, lettreA:false, sansLettreA:true, nomCourt:true, nomLong:false, terrestre:true, numeroPair:true, numeroImpair:false, numInf50:true, numSup50:false, axeParisLyonMarseille:true, facadeAtlantiqueManche:false, nordDeLaLoire:false, pointCulminant1000m:true } },
  { num:"27", nom:"Eure", region:"Normandie", cats:{ fleuve:false, montagne:false, multiple5:false, cotier:false, frontalier:false, plus4voisins:true, sup6000km2:true, inf3500km2:false, pop1M:false, pop500k:false, sans100villes:false, moins300Clermont:false, plus300Clermont:true, zoneL:false, zoneO:true, voteMacron2022:true, voteLepen2022:false, genreMasc:false, genreFem:true, motCarafe:true, motPichet:false, motCruche:true, motPotDeau:false, asterixVisite:false, zenith:false, plusNordVancouver:false, clubL1L2:false, nomCompose:false, sansTiret:true, lettreR:true, lettreL:false, lettreA:false, sansLettreA:true, nomCourt:true, nomLong:false, terrestre:true, numeroPair:false, numeroImpair:true, numInf50:true, numSup50:false, axeParisLyonMarseille:false, facadeAtlantiqueManche:false, nordDeLaLoire:true, pointCulminant1000m:false } },
  { num:"28", nom:"Eure-et-Loir", region:"Centre-Val de Loire", cats:{ fleuve:false, montagne:false, multiple5:false, cotier:false, frontalier:false, plus4voisins:true, sup6000km2:false, inf3500km2:false, pop1M:false, pop500k:true, sans100villes:true, moins300Clermont:false, plus300Clermont:true, zoneL:false, zoneO:true, voteMacron2022:true, voteLepen2022:false, genreMasc:true, genreFem:false, motCarafe:false, motPichet:true, motCruche:false, motPotDeau:false, asterixVisite:false, zenith:false, plusNordVancouver:false, clubL1L2:false, nomCompose:true, sansTiret:false, lettreR:true, lettreL:true, lettreA:false, sansLettreA:true, nomCourt:false, nomLong:true, terrestre:true, numeroPair:true, numeroImpair:false, numInf50:true, numSup50:false, axeParisLyonMarseille:false, facadeAtlantiqueManche:false, nordDeLaLoire:true, pointCulminant1000m:false } },
  { num:"29", nom:"Finistère", region:"Bretagne", cats:{ fleuve:false, montagne:false, multiple5:false, cotier:true, frontalier:false, plus4voisins:false, sup6000km2:true, inf3500km2:false, pop1M:false, pop500k:false, sans100villes:false, moins300Clermont:false, plus300Clermont:true, zoneL:false, zoneO:true, voteMacron2022:true, voteLepen2022:false, genreMasc:true, genreFem:false, motCarafe:false, motPichet:true, motCruche:false, motPotDeau:false, asterixVisite:false, zenith:false, plusNordVancouver:false, clubL1L2:true, nomCompose:false, sansTiret:true, lettreR:true, lettreL:false, lettreA:false, sansLettreA:true, nomCourt:false, nomLong:true, terrestre:false, numeroPair:false, numeroImpair:true, numInf50:true, numSup50:false, axeParisLyonMarseille:false, facadeAtlantiqueManche:true, nordDeLaLoire:true, pointCulminant1000m:false } },
  { num:"30", nom:"Gard", region:"Occitanie", cats:{ fleuve:false, montagne:false, multiple5:true, cotier:true, frontalier:false, plus4voisins:true, sup6000km2:false, inf3500km2:false, pop1M:false, pop500k:false, sans100villes:false, moins300Clermont:true, plus300Clermont:false, zoneL:true, zoneO:false, voteMacron2022:false, voteLepen2022:true, genreMasc:true, genreFem:false, motCarafe:true, motPichet:false, motCruche:false, motPotDeau:false, asterixVisite:false, zenith:false, plusNordVancouver:false, clubL1L2:false, nomCompose:false, sansTiret:true, lettreR:true, lettreL:false, lettreA:true, sansLettreA:false, nomCourt:true, nomLong:false, terrestre:false, numeroPair:true, numeroImpair:false, numInf50:true, numSup50:false, axeParisLyonMarseille:false, facadeAtlantiqueManche:false, nordDeLaLoire:false, pointCulminant1000m:true } },
  { num:"31", nom:"Haute-Garonne", region:"Occitanie", cats:{ fleuve:true, montagne:false, multiple5:false, cotier:false, frontalier:true, plus4voisins:true, sup6000km2:true, inf3500km2:false, pop1M:true, pop500k:false, sans100villes:false, moins300Clermont:true, plus300Clermont:false, zoneL:true, zoneO:false, voteMacron2022:true, voteLepen2022:false, genreMasc:false, genreFem:true, motCarafe:true, motPichet:false, motCruche:false, motPotDeau:false, asterixVisite:true, zenith:true, plusNordVancouver:false, clubL1L2:true, nomCompose:true, sansTiret:false, lettreR:true, lettreL:false, lettreA:true, sansLettreA:false, nomCourt:false, nomLong:true, terrestre:true, numeroPair:false, numeroImpair:true, numInf50:true, numSup50:false, axeParisLyonMarseille:false, facadeAtlantiqueManche:false, nordDeLaLoire:false, pointCulminant1000m:true } },
  { num:"32", nom:"Gers", region:"Occitanie", cats:{ fleuve:false, montagne:false, multiple5:false, cotier:false, frontalier:false, plus4voisins:true, sup6000km2:true, inf3500km2:false, pop1M:false, pop500k:true, sans100villes:true, moins300Clermont:false, plus300Clermont:true, zoneL:true, zoneO:false, voteMacron2022:true, voteLepen2022:false, genreMasc:true, genreFem:false, motCarafe:false, motPichet:true, motCruche:false, motPotDeau:false, asterixVisite:false, zenith:false, plusNordVancouver:false, clubL1L2:false, nomCompose:false, sansTiret:true, lettreR:true, lettreL:false, lettreA:false, sansLettreA:true, nomCourt:true, nomLong:false, terrestre:true, numeroPair:true, numeroImpair:false, numInf50:true, numSup50:false, axeParisLyonMarseille:false, facadeAtlantiqueManche:false, nordDeLaLoire:false, pointCulminant1000m:false } },
  { num:"33", nom:"Gironde", region:"Nouvelle-Aquitaine", cats:{ fleuve:true, montagne:false, multiple5:false, cotier:true, frontalier:false, plus4voisins:true, sup6000km2:true, inf3500km2:false, pop1M:true, pop500k:false, sans100villes:false, moins300Clermont:false, plus300Clermont:true, zoneL:false, zoneO:true, voteMacron2022:true, voteLepen2022:false, genreMasc:false, genreFem:true, motCarafe:false, motPichet:true, motCruche:false, motPotDeau:false, asterixVisite:true, zenith:false, plusNordVancouver:false, clubL1L2:false, nomCompose:false, sansTiret:true, lettreR:true, lettreL:false, lettreA:false, sansLettreA:true, nomCourt:false, nomLong:false, terrestre:false, numeroPair:false, numeroImpair:true, numInf50:true, numSup50:false, axeParisLyonMarseille:false, facadeAtlantiqueManche:true, nordDeLaLoire:false, pointCulminant1000m:false } },
  { num:"34", nom:"Hérault", region:"Occitanie", cats:{ fleuve:true, montagne:false, multiple5:false, cotier:true, frontalier:false, plus4voisins:true, sup6000km2:true, inf3500km2:false, pop1M:true, pop500k:false, sans100villes:false, moins300Clermont:true, plus300Clermont:false, zoneL:true, zoneO:false, voteMacron2022:false, voteLepen2022:true, genreMasc:true, genreFem:false, motCarafe:true, motPichet:false, motCruche:false, motPotDeau:false, asterixVisite:false, zenith:true, plusNordVancouver:false, clubL1L2:true, nomCompose:false, sansTiret:true, lettreR:true, lettreL:true, lettreA:true, sansLettreA:false, nomCourt:false, nomLong:false, terrestre:false, numeroPair:true, numeroImpair:false, numInf50:true, numSup50:false, axeParisLyonMarseille:false, facadeAtlantiqueManche:false, nordDeLaLoire:false, pointCulminant1000m:true } },
  { num:"35", nom:"Ille-et-Vilaine", region:"Bretagne", cats:{ fleuve:false, montagne:false, multiple5:true, cotier:true, frontalier:false, plus4voisins:false, sup6000km2:true, inf3500km2:false, pop1M:true, pop500k:false, sans100villes:false, moins300Clermont:false, plus300Clermont:true, zoneL:false, zoneO:true, voteMacron2022:true, voteLepen2022:false, genreMasc:false, genreFem:true, motCarafe:false, motPichet:true, motCruche:false, motPotDeau:false, asterixVisite:true, zenith:false, plusNordVancouver:false, clubL1L2:true, nomCompose:true, sansTiret:false, lettreR:false, lettreL:true, lettreA:true, sansLettreA:false, nomCourt:false, nomLong:true, terrestre:false, numeroPair:false, numeroImpair:true, numInf50:true, numSup50:false, axeParisLyonMarseille:false, facadeAtlantiqueManche:true, nordDeLaLoire:true, pointCulminant1000m:false } },
  { num:"36", nom:"Indre", region:"Centre-Val de Loire", cats:{ fleuve:false, montagne:false, multiple5:false, cotier:false, frontalier:false, plus4voisins:true, sup6000km2:true, inf3500km2:false, pop1M:false, pop500k:true, sans100villes:true, moins300Clermont:true, plus300Clermont:false, zoneL:true, zoneO:false, voteMacron2022:true, voteLepen2022:false, genreMasc:false, genreFem:true, motCarafe:false, motPichet:true, motCruche:false, motPotDeau:false, asterixVisite:false, zenith:false, plusNordVancouver:false, clubL1L2:false, nomCompose:false, sansTiret:true, lettreR:true, lettreL:false, lettreA:false, sansLettreA:true, nomCourt:true, nomLong:false, terrestre:true, numeroPair:true, numeroImpair:false, numInf50:true, numSup50:false, axeParisLyonMarseille:false, facadeAtlantiqueManche:false, nordDeLaLoire:false, pointCulminant1000m:false } },
  { num:"37", nom:"Indre-et-Loire", region:"Centre-Val de Loire", cats:{ fleuve:true, montagne:false, multiple5:false, cotier:false, frontalier:false, plus4voisins:true, sup6000km2:true, inf3500km2:false, pop1M:false, pop500k:false, sans100villes:false, moins300Clermont:true, plus300Clermont:false, zoneL:false, zoneO:true, voteMacron2022:true, voteLepen2022:false, genreMasc:false, genreFem:true, motCarafe:false, motPichet:true, motCruche:false, motPotDeau:false, asterixVisite:false, zenith:false, plusNordVancouver:false, clubL1L2:false, nomCompose:true, sansTiret:false, lettreR:true, lettreL:true, lettreA:false, sansLettreA:true, nomCourt:false, nomLong:true, terrestre:true, numeroPair:false, numeroImpair:true, numInf50:true, numSup50:false, axeParisLyonMarseille:false, facadeAtlantiqueManche:false, nordDeLaLoire:false, pointCulminant1000m:false } },
  { num:"38", nom:"Isère", region:"Auvergne-Rhône-Alpes", cats:{ fleuve:false, montagne:false, multiple5:false, cotier:false, frontalier:false, plus4voisins:true, sup6000km2:true, inf3500km2:false, pop1M:true, pop500k:false, sans100villes:false, moins300Clermont:true, plus300Clermont:false, zoneL:true, zoneO:false, voteMacron2022:true, voteLepen2022:false, genreMasc:false, genreFem:true, motCarafe:false, motPichet:false, motCruche:false, motPotDeau:true, asterixVisite:false, zenith:false, plusNordVancouver:false, clubL1L2:true, nomCompose:false, sansTiret:true, lettreR:true, lettreL:false, lettreA:false, sansLettreA:true, nomCourt:true, nomLong:false, terrestre:true, numeroPair:true, numeroImpair:false, numInf50:true, numSup50:false, axeParisLyonMarseille:false, facadeAtlantiqueManche:false, nordDeLaLoire:false, pointCulminant1000m:true } },
  { num:"39", nom:"Jura", region:"Bourgogne-Franche-Comté", cats:{ fleuve:false, montagne:true, multiple5:false, cotier:false, frontalier:true, plus4voisins:true, sup6000km2:false, inf3500km2:false, pop1M:false, pop500k:true, sans100villes:true, moins300Clermont:true, plus300Clermont:false, zoneL:false, zoneO:true, voteMacron2022:true, voteLepen2022:false, genreMasc:true, genreFem:false, motCarafe:false, motPichet:false, motCruche:false, motPotDeau:true, asterixVisite:false, zenith:false, plusNordVancouver:false, clubL1L2:false, nomCompose:false, sansTiret:true, lettreR:true, lettreL:false, lettreA:true, sansLettreA:false, nomCourt:true, nomLong:false, terrestre:true, numeroPair:false, numeroImpair:true, numInf50:true, numSup50:false, axeParisLyonMarseille:false, facadeAtlantiqueManche:false, nordDeLaLoire:false, pointCulminant1000m:true } },
  { num:"40", nom:"Landes", region:"Nouvelle-Aquitaine", cats:{ fleuve:false, montagne:false, multiple5:true, cotier:true, frontalier:false, plus4voisins:false, sup6000km2:true, inf3500km2:false, pop1M:false, pop500k:true, sans100villes:true, moins300Clermont:false, plus300Clermont:true, zoneL:false, zoneO:true, voteMacron2022:true, voteLepen2022:false, genreMasc:false, genreFem:true, motCarafe:false, motPichet:true, motCruche:false, motPotDeau:false, asterixVisite:false, zenith:false, plusNordVancouver:false, clubL1L2:false, nomCompose:false, sansTiret:true, lettreR:false, lettreL:true, lettreA:true, sansLettreA:false, nomCourt:true, nomLong:false, terrestre:false, numeroPair:true, numeroImpair:false, numInf50:true, numSup50:false, axeParisLyonMarseille:false, facadeAtlantiqueManche:true, nordDeLaLoire:false, pointCulminant1000m:false } },
  { num:"41", nom:"Loir-et-Cher", region:"Centre-Val de Loire", cats:{ fleuve:true, montagne:false, multiple5:false, cotier:false, frontalier:false, plus4voisins:true, sup6000km2:true, inf3500km2:false, pop1M:false, pop500k:true, sans100villes:true, moins300Clermont:true, plus300Clermont:false, zoneL:false, zoneO:true, voteMacron2022:true, voteLepen2022:false, genreMasc:true, genreFem:false, motCarafe:false, motPichet:true, motCruche:false, motPotDeau:false, asterixVisite:false, zenith:false, plusNordVancouver:false, clubL1L2:false, nomCompose:true, sansTiret:false, lettreR:true, lettreL:true, lettreA:false, sansLettreA:true, nomCourt:false, nomLong:true, terrestre:true, numeroPair:false, numeroImpair:true, numInf50:true, numSup50:false, axeParisLyonMarseille:false, facadeAtlantiqueManche:false, nordDeLaLoire:false, pointCulminant1000m:false } },
  { num:"42", nom:"Loire", region:"Auvergne-Rhône-Alpes", cats:{ fleuve:true, montagne:false, multiple5:false, cotier:false, frontalier:false, plus4voisins:true, sup6000km2:false, inf3500km2:false, pop1M:false, pop500k:false, sans100villes:false, moins300Clermont:true, plus300Clermont:false, zoneL:true, zoneO:false, voteMacron2022:true, voteLepen2022:false, genreMasc:false, genreFem:true, motCarafe:false, motPichet:false, motCruche:false, motPotDeau:true, asterixVisite:false, zenith:true, plusNordVancouver:false, clubL1L2:true, nomCompose:false, sansTiret:true, lettreR:true, lettreL:true, lettreA:false, sansLettreA:true, nomCourt:true, nomLong:false, terrestre:true, numeroPair:true, numeroImpair:false, numInf50:true, numSup50:false, axeParisLyonMarseille:false, facadeAtlantiqueManche:false, nordDeLaLoire:false, pointCulminant1000m:true } },
  { num:"43", nom:"Haute-Loire", region:"Auvergne-Rhône-Alpes", cats:{ fleuve:true, montagne:false, multiple5:false, cotier:false, frontalier:false, plus4voisins:true, sup6000km2:false, inf3500km2:false, pop1M:false, pop500k:true, sans100villes:true, moins300Clermont:true, plus300Clermont:false, zoneL:true, zoneO:false, voteMacron2022:true, voteLepen2022:false, genreMasc:false, genreFem:true, motCarafe:false, motPichet:true, motCruche:false, motPotDeau:false, asterixVisite:false, zenith:false, plusNordVancouver:false, clubL1L2:false, nomCompose:true, sansTiret:false, lettreR:true, lettreL:true, lettreA:true, sansLettreA:false, nomCourt:false, nomLong:true, terrestre:true, numeroPair:false, numeroImpair:true, numInf50:true, numSup50:false, axeParisLyonMarseille:false, facadeAtlantiqueManche:false, nordDeLaLoire:false, pointCulminant1000m:true } },
  { num:"44", nom:"Loire-Atlantique", region:"Pays de la Loire", cats:{ fleuve:true, montagne:false, multiple5:false, cotier:true, frontalier:false, plus4voisins:false, sup6000km2:true, inf3500km2:false, pop1M:true, pop500k:false, sans100villes:false, moins300Clermont:false, plus300Clermont:true, zoneL:false, zoneO:true, voteMacron2022:true, voteLepen2022:false, genreMasc:false, genreFem:true, motCarafe:false, motPichet:true, motCruche:false, motPotDeau:false, asterixVisite:false, zenith:true, plusNordVancouver:false, clubL1L2:true, nomCompose:true, sansTiret:false, lettreR:true, lettreL:true, lettreA:true, sansLettreA:false, nomCourt:false, nomLong:true, terrestre:false, numeroPair:true, numeroImpair:false, numInf50:true, numSup50:false, axeParisLyonMarseille:false, facadeAtlantiqueManche:true, nordDeLaLoire:false, pointCulminant1000m:false } },
  { num:"45", nom:"Loiret", region:"Centre-Val de Loire", cats:{ fleuve:false, montagne:false, multiple5:true, cotier:false, frontalier:false, plus4voisins:true, sup6000km2:true, inf3500km2:false, pop1M:false, pop500k:false, sans100villes:false, moins300Clermont:true, plus300Clermont:false, zoneL:false, zoneO:true, voteMacron2022:true, voteLepen2022:false, genreMasc:true, genreFem:false, motCarafe:false, motPichet:true, motCruche:false, motPotDeau:false, asterixVisite:false, zenith:false, plusNordVancouver:false, clubL1L2:false, nomCompose:false, sansTiret:true, lettreR:true, lettreL:true, lettreA:false, sansLettreA:true, nomCourt:true, nomLong:false, terrestre:true, numeroPair:false, numeroImpair:true, numInf50:true, numSup50:false, axeParisLyonMarseille:false, facadeAtlantiqueManche:false, nordDeLaLoire:true, pointCulminant1000m:false } },
  { num:"46", nom:"Lot", region:"Occitanie", cats:{ fleuve:false, montagne:false, multiple5:false, cotier:false, frontalier:false, plus4voisins:true, sup6000km2:false, inf3500km2:false, pop1M:false, pop500k:true, sans100villes:true, moins300Clermont:true, plus300Clermont:false, zoneL:true, zoneO:false, voteMacron2022:true, voteLepen2022:false, genreMasc:true, genreFem:false, motCarafe:true, motPichet:false, motCruche:false, motPotDeau:false, asterixVisite:false, zenith:false, plusNordVancouver:false, clubL1L2:false, nomCompose:false, sansTiret:true, lettreR:false, lettreL:true, lettreA:false, sansLettreA:true, nomCourt:true, nomLong:false, terrestre:true, numeroPair:true, numeroImpair:false, numInf50:true, numSup50:false, axeParisLyonMarseille:false, facadeAtlantiqueManche:false, nordDeLaLoire:false, pointCulminant1000m:false } },
  { num:"47", nom:"Lot-et-Garonne", region:"Nouvelle-Aquitaine", cats:{ fleuve:true, montagne:false, multiple5:false, cotier:false, frontalier:false, plus4voisins:true, sup6000km2:false, inf3500km2:false, pop1M:false, pop500k:true, sans100villes:true, moins300Clermont:true, plus300Clermont:false, zoneL:true, zoneO:false, voteMacron2022:true, voteLepen2022:false, genreMasc:true, genreFem:false, motCarafe:false, motPichet:true, motCruche:false, motPotDeau:false, asterixVisite:true, zenith:false, plusNordVancouver:false, clubL1L2:false, nomCompose:true, sansTiret:false, lettreR:true, lettreL:true, lettreA:true, sansLettreA:false, nomCourt:false, nomLong:true, terrestre:true, numeroPair:false, numeroImpair:true, numInf50:true, numSup50:false, axeParisLyonMarseille:false, facadeAtlantiqueManche:false, nordDeLaLoire:false, pointCulminant1000m:false } },
  { num:"48", nom:"Lozère", region:"Occitanie", cats:{ fleuve:false, montagne:false, multiple5:false, cotier:false, frontalier:false, plus4voisins:true, sup6000km2:false, inf3500km2:false, pop1M:false, pop500k:true, sans100villes:true, moins300Clermont:true, plus300Clermont:false, zoneL:true, zoneO:false, voteMacron2022:true, voteLepen2022:false, genreMasc:false, genreFem:true, motCarafe:true, motPichet:false, motCruche:false, motPotDeau:false, asterixVisite:false, zenith:false, plusNordVancouver:false, clubL1L2:false, nomCompose:false, sansTiret:true, lettreR:true, lettreL:true, lettreA:false, sansLettreA:true, nomCourt:true, nomLong:false, terrestre:true, numeroPair:true, numeroImpair:false, numInf50:true, numSup50:false, axeParisLyonMarseille:false, facadeAtlantiqueManche:false, nordDeLaLoire:false, pointCulminant1000m:true } },
  { num:"49", nom:"Maine-et-Loire", region:"Pays de la Loire", cats:{ fleuve:true, montagne:false, multiple5:false, cotier:false, frontalier:false, plus4voisins:true, sup6000km2:true, inf3500km2:false, pop1M:false, pop500k:false, sans100villes:false, moins300Clermont:false, plus300Clermont:true, zoneL:false, zoneO:true, voteMacron2022:true, voteLepen2022:false, genreMasc:true, genreFem:false, motCarafe:false, motPichet:true, motCruche:false, motPotDeau:false, asterixVisite:false, zenith:false, plusNordVancouver:false, clubL1L2:true, nomCompose:true, sansTiret:false, lettreR:true, lettreL:true, lettreA:true, sansLettreA:false, nomCourt:false, nomLong:true, terrestre:true, numeroPair:false, numeroImpair:true, numInf50:true, numSup50:false, axeParisLyonMarseille:false, facadeAtlantiqueManche:false, nordDeLaLoire:false, pointCulminant1000m:false } },
  { num:"50", nom:"Manche", region:"Normandie", cats:{ fleuve:false, montagne:false, multiple5:true, cotier:true, frontalier:false, plus4voisins:false, sup6000km2:false, inf3500km2:false, pop1M:false, pop500k:true, sans100villes:false, moins300Clermont:false, plus300Clermont:true, zoneL:false, zoneO:true, voteMacron2022:true, voteLepen2022:false, genreMasc:false, genreFem:true, motCarafe:false, motPichet:true, motCruche:false, motPotDeau:false, asterixVisite:false, zenith:false, plusNordVancouver:true, clubL1L2:false, nomCompose:false, sansTiret:true, lettreR:false, lettreL:false, lettreA:true, sansLettreA:false, nomCourt:true, nomLong:false, terrestre:false, numeroPair:true, numeroImpair:false, numInf50:false, numSup50:true, axeParisLyonMarseille:false, facadeAtlantiqueManche:true, nordDeLaLoire:true, pointCulminant1000m:false } },
  { num:"51", nom:"Marne", region:"Grand Est", cats:{ fleuve:false, montagne:false, multiple5:false, cotier:false, frontalier:false, plus4voisins:true, sup6000km2:true, inf3500km2:false, pop1M:false, pop500k:false, sans100villes:false, moins300Clermont:false, plus300Clermont:true, zoneL:false, zoneO:true, voteMacron2022:true, voteLepen2022:false, genreMasc:false, genreFem:true, motCarafe:false, motPichet:false, motCruche:true, motPotDeau:false, asterixVisite:false, zenith:false, plusNordVancouver:true, clubL1L2:true, nomCompose:false, sansTiret:true, lettreR:true, lettreL:false, lettreA:true, sansLettreA:false, nomCourt:true, nomLong:false, terrestre:true, numeroPair:false, numeroImpair:true, numInf50:false, numSup50:true, axeParisLyonMarseille:false, facadeAtlantiqueManche:false, nordDeLaLoire:true, pointCulminant1000m:false } },
  { num:"52", nom:"Haute-Marne", region:"Grand Est", cats:{ fleuve:false, montagne:false, multiple5:false, cotier:false, frontalier:false, plus4voisins:true, sup6000km2:true, inf3500km2:false, pop1M:false, pop500k:true, sans100villes:true, moins300Clermont:true, plus300Clermont:false, zoneL:false, zoneO:true, voteMacron2022:false, voteLepen2022:true, genreMasc:false, genreFem:true, motCarafe:false, motPichet:false, motCruche:true, motPotDeau:false, asterixVisite:false, zenith:false, plusNordVancouver:false, clubL1L2:false, nomCompose:true, sansTiret:false, lettreR:true, lettreL:false, lettreA:true, sansLettreA:false, nomCourt:false, nomLong:true, terrestre:true, numeroPair:true, numeroImpair:false, numInf50:false, numSup50:true, axeParisLyonMarseille:false, facadeAtlantiqueManche:false, nordDeLaLoire:true, pointCulminant1000m:false } },
  { num:"53", nom:"Mayenne", region:"Pays de la Loire", cats:{ fleuve:false, montagne:false, multiple5:false, cotier:false, frontalier:false, plus4voisins:true, sup6000km2:false, inf3500km2:false, pop1M:false, pop500k:true, sans100villes:true, moins300Clermont:false, plus300Clermont:true, zoneL:false, zoneO:true, voteMacron2022:true, voteLepen2022:false, genreMasc:false, genreFem:true, motCarafe:false, motPichet:true, motCruche:false, motPotDeau:false, asterixVisite:false, zenith:false, plusNordVancouver:false, clubL1L2:true, nomCompose:false, sansTiret:true, lettreR:false, lettreL:false, lettreA:true, sansLettreA:false, nomCourt:false, nomLong:false, terrestre:true, numeroPair:false, numeroImpair:true, numInf50:false, numSup50:true, axeParisLyonMarseille:false, facadeAtlantiqueManche:false, nordDeLaLoire:true, pointCulminant1000m:false } },
  { num:"54", nom:"Meurthe-et-Moselle", region:"Grand Est", cats:{ fleuve:false, montagne:false, multiple5:false, cotier:false, frontalier:true, plus4voisins:true, sup6000km2:false, inf3500km2:false, pop1M:false, pop500k:false, sans100villes:false, moins300Clermont:false, plus300Clermont:true, zoneL:false, zoneO:true, voteMacron2022:true, voteLepen2022:false, genreMasc:false, genreFem:true, motCarafe:false, motPichet:false, motCruche:true, motPotDeau:false, asterixVisite:false, zenith:true, plusNordVancouver:true, clubL1L2:true, nomCompose:true, sansTiret:false, lettreR:true, lettreL:true, lettreA:false, sansLettreA:true, nomCourt:false, nomLong:true, terrestre:true, numeroPair:true, numeroImpair:false, numInf50:false, numSup50:true, axeParisLyonMarseille:false, facadeAtlantiqueManche:false, nordDeLaLoire:true, pointCulminant1000m:false } },
  { num:"55", nom:"Meuse", region:"Grand Est", cats:{ fleuve:true, montagne:false, multiple5:true, cotier:false, frontalier:true, plus4voisins:true, sup6000km2:true, inf3500km2:false, pop1M:false, pop500k:true, sans100villes:true, moins300Clermont:false, plus300Clermont:true, zoneL:false, zoneO:true, voteMacron2022:false, voteLepen2022:true, genreMasc:false, genreFem:true, motCarafe:false, motPichet:false, motCruche:true, motPotDeau:false, asterixVisite:false, zenith:false, plusNordVancouver:true, clubL1L2:false, nomCompose:false, sansTiret:true, lettreR:false, lettreL:false, lettreA:false, sansLettreA:true, nomCourt:true, nomLong:false, terrestre:true, numeroPair:false, numeroImpair:true, numInf50:false, numSup50:true, axeParisLyonMarseille:false, facadeAtlantiqueManche:false, nordDeLaLoire:true, pointCulminant1000m:false } },
  { num:"56", nom:"Morbihan", region:"Bretagne", cats:{ fleuve:false, montagne:false, multiple5:false, cotier:true, frontalier:false, plus4voisins:false, sup6000km2:true, inf3500km2:false, pop1M:false, pop500k:false, sans100villes:false, moins300Clermont:false, plus300Clermont:true, zoneL:false, zoneO:true, voteMacron2022:true, voteLepen2022:false, genreMasc:true, genreFem:false, motCarafe:false, motPichet:true, motCruche:false, motPotDeau:false, asterixVisite:true, zenith:false, plusNordVancouver:false, clubL1L2:true, nomCompose:false, sansTiret:true, lettreR:true, lettreL:false, lettreA:true, sansLettreA:false, nomCourt:false, nomLong:true, terrestre:false, numeroPair:true, numeroImpair:false, numInf50:false, numSup50:true, axeParisLyonMarseille:false, facadeAtlantiqueManche:true, nordDeLaLoire:true, pointCulminant1000m:false } },
  { num:"57", nom:"Moselle", region:"Grand Est", cats:{ fleuve:false, montagne:false, multiple5:false, cotier:false, frontalier:true, plus4voisins:false, sup6000km2:true, inf3500km2:false, pop1M:true, pop500k:false, sans100villes:false, moins300Clermont:false, plus300Clermont:true, zoneL:false, zoneO:true, voteMacron2022:true, voteLepen2022:false, genreMasc:false, genreFem:true, motCarafe:false, motPichet:false, motCruche:true, motPotDeau:false, asterixVisite:false, zenith:false, plusNordVancouver:true, clubL1L2:true, nomCompose:false, sansTiret:true, lettreR:false, lettreL:true, lettreA:false, sansLettreA:true, nomCourt:false, nomLong:false, terrestre:true, numeroPair:false, numeroImpair:true, numInf50:false, numSup50:true, axeParisLyonMarseille:false, facadeAtlantiqueManche:false, nordDeLaLoire:true, pointCulminant1000m:false } },
  { num:"58", nom:"Nièvre", region:"Bourgogne-Franche-Comté", cats:{ fleuve:false, montagne:false, multiple5:false, cotier:false, frontalier:false, plus4voisins:true, sup6000km2:true, inf3500km2:false, pop1M:false, pop500k:true, sans100villes:true, moins300Clermont:true, plus300Clermont:false, zoneL:false, zoneO:true, voteMacron2022:true, voteLepen2022:false, genreMasc:false, genreFem:true, motCarafe:false, motPichet:true, motCruche:false, motPotDeau:false, asterixVisite:false, zenith:false, plusNordVancouver:false, clubL1L2:false, nomCompose:false, sansTiret:true, lettreR:true, lettreL:false, lettreA:false, sansLettreA:true, nomCourt:true, nomLong:false, terrestre:true, numeroPair:true, numeroImpair:false, numInf50:false, numSup50:true, axeParisLyonMarseille:false, facadeAtlantiqueManche:false, nordDeLaLoire:false, pointCulminant1000m:false } },
  { num:"59", nom:"Nord", region:"Hauts-de-France", cats:{ fleuve:false, montagne:false, multiple5:false, cotier:true, frontalier:true, plus4voisins:false, sup6000km2:false, inf3500km2:false, pop1M:true, pop500k:false, sans100villes:false, moins300Clermont:false, plus300Clermont:true, zoneL:false, zoneO:true, voteMacron2022:false, voteLepen2022:true, genreMasc:true, genreFem:false, motCarafe:true, motPichet:true, motCruche:false, motPotDeau:false, asterixVisite:false, zenith:true, plusNordVancouver:true, clubL1L2:true, nomCompose:false, sansTiret:true, lettreR:true, lettreL:false, lettreA:false, sansLettreA:true, nomCourt:true, nomLong:false, terrestre:false, numeroPair:false, numeroImpair:true, numInf50:false, numSup50:true, axeParisLyonMarseille:false, facadeAtlantiqueManche:true, nordDeLaLoire:true, pointCulminant1000m:false } },
  { num:"60", nom:"Oise", region:"Hauts-de-France", cats:{ fleuve:false, montagne:false, multiple5:true, cotier:false, frontalier:false, plus4voisins:true, sup6000km2:false, inf3500km2:false, pop1M:false, pop500k:false, sans100villes:false, moins300Clermont:false, plus300Clermont:true, zoneL:false, zoneO:true, voteMacron2022:true, voteLepen2022:false, genreMasc:false, genreFem:true, motCarafe:true, motPichet:false, motCruche:false, motPotDeau:false, asterixVisite:false, zenith:false, plusNordVancouver:true, clubL1L2:false, nomCompose:false, sansTiret:true, lettreR:false, lettreL:false, lettreA:false, sansLettreA:true, nomCourt:true, nomLong:false, terrestre:true, numeroPair:true, numeroImpair:false, numInf50:false, numSup50:true, axeParisLyonMarseille:false, facadeAtlantiqueManche:false, nordDeLaLoire:true, pointCulminant1000m:false } },
  { num:"61", nom:"Orne", region:"Normandie", cats:{ fleuve:true, montagne:false, multiple5:false, cotier:false, frontalier:false, plus4voisins:true, sup6000km2:true, inf3500km2:false, pop1M:false, pop500k:true, sans100villes:true, moins300Clermont:false, plus300Clermont:true, zoneL:false, zoneO:true, voteMacron2022:true, voteLepen2022:false, genreMasc:false, genreFem:true, motCarafe:false, motPichet:true, motCruche:false, motPotDeau:false, asterixVisite:false, zenith:false, plusNordVancouver:false, clubL1L2:false, nomCompose:false, sansTiret:true, lettreR:true, lettreL:false, lettreA:false, sansLettreA:true, nomCourt:true, nomLong:false, terrestre:true, numeroPair:false, numeroImpair:true, numInf50:false, numSup50:true, axeParisLyonMarseille:false, facadeAtlantiqueManche:false, nordDeLaLoire:true, pointCulminant1000m:false } },
  { num:"62", nom:"Pas-de-Calais", region:"Hauts-de-France", cats:{ fleuve:false, montagne:false, multiple5:false, cotier:true, frontalier:false, plus4voisins:false, sup6000km2:true, inf3500km2:false, pop1M:true, pop500k:false, sans100villes:false, moins300Clermont:false, plus300Clermont:true, zoneL:false, zoneO:true, voteMacron2022:false, voteLepen2022:true, genreMasc:true, genreFem:false, motCarafe:true, motPichet:true, motCruche:false, motPotDeau:false, asterixVisite:true, zenith:false, plusNordVancouver:true, clubL1L2:true, nomCompose:true, sansTiret:false, lettreR:false, lettreL:true, lettreA:true, sansLettreA:false, nomCourt:false, nomLong:true, terrestre:false, numeroPair:true, numeroImpair:false, numInf50:false, numSup50:true, axeParisLyonMarseille:false, facadeAtlantiqueManche:true, nordDeLaLoire:true, pointCulminant1000m:false } },
  { num:"63", nom:"Puy-de-Dôme", region:"Auvergne-Rhône-Alpes", cats:{ fleuve:false, montagne:true, multiple5:false, cotier:false, frontalier:false, plus4voisins:true, sup6000km2:true, inf3500km2:false, pop1M:false, pop500k:false, sans100villes:false, moins300Clermont:true, plus300Clermont:false, zoneL:true, zoneO:false, voteMacron2022:true, voteLepen2022:false, genreMasc:true, genreFem:false, motCarafe:false, motPichet:true, motCruche:false, motPotDeau:false, asterixVisite:true, zenith:true, plusNordVancouver:false, clubL1L2:true, nomCompose:true, sansTiret:false, lettreR:false, lettreL:false, lettreA:false, sansLettreA:true, nomCourt:false, nomLong:true, terrestre:true, numeroPair:false, numeroImpair:true, numInf50:false, numSup50:true, axeParisLyonMarseille:false, facadeAtlantiqueManche:false, nordDeLaLoire:false, pointCulminant1000m:true } },
  { num:"64", nom:"Pyrénées-Atlantiques", region:"Nouvelle-Aquitaine", cats:{ fleuve:false, montagne:true, multiple5:false, cotier:true, frontalier:true, plus4voisins:false, sup6000km2:true, inf3500km2:false, pop1M:false, pop500k:false, sans100villes:false, moins300Clermont:false, plus300Clermont:true, zoneL:true, zoneO:false, voteMacron2022:true, voteLepen2022:false, genreMasc:false, genreFem:true, motCarafe:false, motPichet:true, motCruche:false, motPotDeau:false, asterixVisite:false, zenith:true, plusNordVancouver:false, clubL1L2:true, nomCompose:true, sansTiret:false, lettreR:true, lettreL:true, lettreA:true, sansLettreA:false, nomCourt:false, nomLong:true, terrestre:false, numeroPair:true, numeroImpair:false, numInf50:false, numSup50:true, axeParisLyonMarseille:false, facadeAtlantiqueManche:true, nordDeLaLoire:false, pointCulminant1000m:true } },
  { num:"65", nom:"Hautes-Pyrénées", region:"Occitanie", cats:{ fleuve:false, montagne:true, multiple5:true, cotier:false, frontalier:true, plus4voisins:false, sup6000km2:false, inf3500km2:false, pop1M:false, pop500k:true, sans100villes:true, moins300Clermont:false, plus300Clermont:true, zoneL:true, zoneO:false, voteMacron2022:true, voteLepen2022:false, genreMasc:false, genreFem:true, motCarafe:false, motPichet:true, motCruche:false, motPotDeau:false, asterixVisite:false, zenith:false, plusNordVancouver:false, clubL1L2:false, nomCompose:true, sansTiret:false, lettreR:true, lettreL:false, lettreA:true, sansLettreA:false, nomCourt:false, nomLong:true, terrestre:true, numeroPair:false, numeroImpair:true, numInf50:false, numSup50:true, axeParisLyonMarseille:false, facadeAtlantiqueManche:false, nordDeLaLoire:false, pointCulminant1000m:true } },
  { num:"66", nom:"Pyrénées-Orientales", region:"Occitanie", cats:{ fleuve:false, montagne:true, multiple5:false, cotier:true, frontalier:true, plus4voisins:false, sup6000km2:false, inf3500km2:false, pop1M:false, pop500k:true, sans100villes:false, moins300Clermont:false, plus300Clermont:true, zoneL:true, zoneO:false, voteMacron2022:false, voteLepen2022:true, genreMasc:false, genreFem:true, motCarafe:true, motPichet:false, motCruche:false, motPotDeau:false, asterixVisite:false, zenith:false, plusNordVancouver:false, clubL1L2:false, nomCompose:true, sansTiret:false, lettreR:true, lettreL:true, lettreA:true, sansLettreA:false, nomCourt:false, nomLong:true, terrestre:false, numeroPair:true, numeroImpair:false, numInf50:false, numSup50:true, axeParisLyonMarseille:false, facadeAtlantiqueManche:false, nordDeLaLoire:false, pointCulminant1000m:true } },
  { num:"67", nom:"Bas-Rhin", region:"Grand Est", cats:{ fleuve:true, montagne:false, multiple5:false, cotier:false, frontalier:true, plus4voisins:false, sup6000km2:false, inf3500km2:false, pop1M:true, pop500k:false, sans100villes:false, moins300Clermont:false, plus300Clermont:true, zoneL:false, zoneO:true, voteMacron2022:true, voteLepen2022:false, genreMasc:true, genreFem:false, motCarafe:false, motPichet:false, motCruche:true, motPotDeau:false, asterixVisite:false, zenith:true, plusNordVancouver:false, clubL1L2:true, nomCompose:true, sansTiret:false, lettreR:true, lettreL:false, lettreA:true, sansLettreA:false, nomCourt:false, nomLong:false, terrestre:true, numeroPair:false, numeroImpair:true, numInf50:false, numSup50:true, axeParisLyonMarseille:false, facadeAtlantiqueManche:false, nordDeLaLoire:true, pointCulminant1000m:true } },
  { num:"68", nom:"Haut-Rhin", region:"Grand Est", cats:{ fleuve:true, montagne:false, multiple5:false, cotier:false, frontalier:true, plus4voisins:false, sup6000km2:false, inf3500km2:false, pop1M:false, pop500k:false, sans100villes:false, moins300Clermont:false, plus300Clermont:true, zoneL:false, zoneO:true, voteMacron2022:true, voteLepen2022:false, genreMasc:true, genreFem:false, motCarafe:false, motPichet:false, motCruche:true, motPotDeau:false, asterixVisite:false, zenith:false, plusNordVancouver:false, clubL1L2:false, nomCompose:true, sansTiret:false, lettreR:true, lettreL:false, lettreA:true, sansLettreA:false, nomCourt:false, nomLong:false, terrestre:true, numeroPair:true, numeroImpair:false, numInf50:false, numSup50:true, axeParisLyonMarseille:false, facadeAtlantiqueManche:false, nordDeLaLoire:false, pointCulminant1000m:true } },
  { num:"69", nom:"Rhône", region:"Auvergne-Rhône-Alpes", cats:{ fleuve:true, montagne:false, multiple5:false, cotier:false, frontalier:false, plus4voisins:true, sup6000km2:false, inf3500km2:true, pop1M:true, pop500k:false, sans100villes:false, moins300Clermont:true, plus300Clermont:false, zoneL:true, zoneO:false, voteMacron2022:true, voteLepen2022:false, genreMasc:true, genreFem:false, motCarafe:false, motPichet:false, motCruche:false, motPotDeau:true, asterixVisite:true, zenith:false, plusNordVancouver:false, clubL1L2:true, nomCompose:false, sansTiret:true, lettreR:true, lettreL:false, lettreA:false, sansLettreA:true, nomCourt:true, nomLong:false, terrestre:true, numeroPair:false, numeroImpair:true, numInf50:false, numSup50:true, axeParisLyonMarseille:true, facadeAtlantiqueManche:false, nordDeLaLoire:false, pointCulminant1000m:true } },
  { num:"70", nom:"Haute-Saône", region:"Bourgogne-Franche-Comté", cats:{ fleuve:false, montagne:false, multiple5:true, cotier:false, frontalier:false, plus4voisins:true, sup6000km2:false, inf3500km2:false, pop1M:false, pop500k:true, sans100villes:true, moins300Clermont:false, plus300Clermont:true, zoneL:false, zoneO:true, voteMacron2022:false, voteLepen2022:true, genreMasc:false, genreFem:true, motCarafe:false, motPichet:false, motCruche:true, motPotDeau:false, asterixVisite:false, zenith:false, plusNordVancouver:false, clubL1L2:false, nomCompose:true, sansTiret:false, lettreR:false, lettreL:false, lettreA:true, sansLettreA:false, nomCourt:false, nomLong:true, terrestre:true, numeroPair:true, numeroImpair:false, numInf50:false, numSup50:true, axeParisLyonMarseille:false, facadeAtlantiqueManche:false, nordDeLaLoire:true, pointCulminant1000m:false } },
  { num:"71", nom:"Saône-et-Loire", region:"Bourgogne-Franche-Comté", cats:{ fleuve:false, montagne:false, multiple5:false, cotier:false, frontalier:false, plus4voisins:true, sup6000km2:true, inf3500km2:false, pop1M:false, pop500k:false, sans100villes:true, moins300Clermont:true, plus300Clermont:false, zoneL:false, zoneO:true, voteMacron2022:true, voteLepen2022:false, genreMasc:false, genreFem:true, motCarafe:false, motPichet:false, motCruche:false, motPotDeau:true, asterixVisite:false, zenith:false, plusNordVancouver:false, clubL1L2:false, nomCompose:true, sansTiret:false, lettreR:true, lettreL:true, lettreA:true, sansLettreA:false, nomCourt:false, nomLong:true, terrestre:true, numeroPair:false, numeroImpair:true, numInf50:false, numSup50:true, axeParisLyonMarseille:true, facadeAtlantiqueManche:false, nordDeLaLoire:false, pointCulminant1000m:false } },
  { num:"72", nom:"Sarthe", region:"Pays de la Loire", cats:{ fleuve:false, montagne:false, multiple5:false, cotier:false, frontalier:false, plus4voisins:true, sup6000km2:true, inf3500km2:false, pop1M:false, pop500k:false, sans100villes:false, moins300Clermont:false, plus300Clermont:true, zoneL:false, zoneO:true, voteMacron2022:true, voteLepen2022:false, genreMasc:false, genreFem:true, motCarafe:false, motPichet:true, motCruche:false, motPotDeau:false, asterixVisite:false, zenith:false, plusNordVancouver:false, clubL1L2:true, nomCompose:false, sansTiret:true, lettreR:true, lettreL:false, lettreA:true, sansLettreA:false, nomCourt:true, nomLong:false, terrestre:true, numeroPair:true, numeroImpair:false, numInf50:false, numSup50:true, axeParisLyonMarseille:false, facadeAtlantiqueManche:false, nordDeLaLoire:true, pointCulminant1000m:false } },
  { num:"73", nom:"Savoie", region:"Auvergne-Rhône-Alpes", cats:{ fleuve:false, montagne:false, multiple5:false, cotier:false, frontalier:true, plus4voisins:false, sup6000km2:true, inf3500km2:false, pop1M:false, pop500k:true, sans100villes:false, moins300Clermont:true, plus300Clermont:false, zoneL:true, zoneO:false, voteMacron2022:true, voteLepen2022:false, genreMasc:false, genreFem:true, motCarafe:true, motPichet:false, motCruche:false, motPotDeau:false, asterixVisite:false, zenith:false, plusNordVancouver:false, clubL1L2:false, nomCompose:false, sansTiret:true, lettreR:false, lettreL:false, lettreA:true, sansLettreA:false, nomCourt:true, nomLong:false, terrestre:true, numeroPair:false, numeroImpair:true, numInf50:false, numSup50:true, axeParisLyonMarseille:false, facadeAtlantiqueManche:false, nordDeLaLoire:false, pointCulminant1000m:true } },
  { num:"74", nom:"Haute-Savoie", region:"Auvergne-Rhône-Alpes", cats:{ fleuve:false, montagne:false, multiple5:false, cotier:false, frontalier:true, plus4voisins:false, sup6000km2:false, inf3500km2:false, pop1M:false, pop500k:false, sans100villes:false, moins300Clermont:true, plus300Clermont:false, zoneL:true, zoneO:false, voteMacron2022:true, voteLepen2022:false, genreMasc:false, genreFem:true, motCarafe:true, motPichet:false, motCruche:false, motPotDeau:false, asterixVisite:false, zenith:false, plusNordVancouver:false, clubL1L2:true, nomCompose:true, sansTiret:false, lettreR:false, lettreL:false, lettreA:true, sansLettreA:false, nomCourt:false, nomLong:true, terrestre:true, numeroPair:true, numeroImpair:false, numInf50:false, numSup50:true, axeParisLyonMarseille:false, facadeAtlantiqueManche:false, nordDeLaLoire:false, pointCulminant1000m:true } },
  { num:"75", nom:"Paris", region:"Île-de-France", cats:{ fleuve:false, montagne:false, multiple5:true, cotier:false, frontalier:false, plus4voisins:false, sup6000km2:false, inf3500km2:true, pop1M:true, pop500k:false, sans100villes:false, moins300Clermont:false, plus300Clermont:true, zoneL:false, zoneO:true, voteMacron2022:true, voteLepen2022:false, genreMasc:true, genreFem:false, motCarafe:true, motPichet:false, motCruche:false, motPotDeau:false, asterixVisite:true, zenith:true, plusNordVancouver:false, clubL1L2:true, nomCompose:false, sansTiret:true, lettreR:true, lettreL:false, lettreA:true, sansLettreA:false, nomCourt:true, nomLong:false, terrestre:true, numeroPair:false, numeroImpair:true, numInf50:false, numSup50:true, axeParisLyonMarseille:true, facadeAtlantiqueManche:false, nordDeLaLoire:true, pointCulminant1000m:false } },
  { num:"76", nom:"Seine-Maritime", region:"Normandie", cats:{ fleuve:true, montagne:false, multiple5:false, cotier:true, frontalier:false, plus4voisins:false, sup6000km2:true, inf3500km2:false, pop1M:true, pop500k:false, sans100villes:false, moins300Clermont:false, plus300Clermont:true, zoneL:false, zoneO:true, voteMacron2022:true, voteLepen2022:false, genreMasc:false, genreFem:true, motCarafe:false, motPichet:false, motCruche:true, motPotDeau:false, asterixVisite:true, zenith:true, plusNordVancouver:true, clubL1L2:true, nomCompose:true, sansTiret:false, lettreR:true, lettreL:false, lettreA:true, sansLettreA:false, nomCourt:false, nomLong:true, terrestre:false, numeroPair:true, numeroImpair:false, numInf50:false, numSup50:true, axeParisLyonMarseille:false, facadeAtlantiqueManche:true, nordDeLaLoire:true, pointCulminant1000m:false } },
  { num:"77", nom:"Seine-et-Marne", region:"Île-de-France", cats:{ fleuve:true, montagne:false, multiple5:false, cotier:false, frontalier:false, plus4voisins:true, sup6000km2:true, inf3500km2:false, pop1M:true, pop500k:false, sans100villes:false, moins300Clermont:false, plus300Clermont:true, zoneL:false, zoneO:true, voteMacron2022:true, voteLepen2022:false, genreMasc:false, genreFem:true, motCarafe:true, motPichet:false, motCruche:false, motPotDeau:false, asterixVisite:false, zenith:false, plusNordVancouver:false, clubL1L2:false, nomCompose:true, sansTiret:false, lettreR:true, lettreL:false, lettreA:true, sansLettreA:false, nomCourt:false, nomLong:true, terrestre:true, numeroPair:false, numeroImpair:true, numInf50:false, numSup50:true, axeParisLyonMarseille:true, facadeAtlantiqueManche:false, nordDeLaLoire:true, pointCulminant1000m:false } },
  { num:"78", nom:"Yvelines", region:"Île-de-France", cats:{ fleuve:false, montagne:false, multiple5:false, cotier:false, frontalier:false, plus4voisins:true, sup6000km2:false, inf3500km2:true, pop1M:true, pop500k:false, sans100villes:false, moins300Clermont:false, plus300Clermont:true, zoneL:false, zoneO:true, voteMacron2022:true, voteLepen2022:false, genreMasc:false, genreFem:true, motCarafe:true, motPichet:false, motCruche:false, motPotDeau:false, asterixVisite:false, zenith:false, plusNordVancouver:false, clubL1L2:false, nomCompose:false, sansTiret:true, lettreR:false, lettreL:true, lettreA:false, sansLettreA:true, nomCourt:false, nomLong:true, terrestre:true, numeroPair:true, numeroImpair:false, numInf50:false, numSup50:true, axeParisLyonMarseille:false, facadeAtlantiqueManche:false, nordDeLaLoire:true, pointCulminant1000m:false } },
  { num:"79", nom:"Deux-Sèvres", region:"Nouvelle-Aquitaine", cats:{ fleuve:true, montagne:false, multiple5:false, cotier:false, frontalier:false, plus4voisins:true, sup6000km2:false, inf3500km2:false, pop1M:false, pop500k:true, sans100villes:false, moins300Clermont:true, plus300Clermont:false, zoneL:false, zoneO:true, voteMacron2022:true, voteLepen2022:false, genreMasc:false, genreFem:true, motCarafe:false, motPichet:true, motCruche:false, motPotDeau:false, asterixVisite:false, zenith:false, plusNordVancouver:false, clubL1L2:false, nomCompose:true, sansTiret:false, lettreR:true, lettreL:false, lettreA:false, sansLettreA:true, nomCourt:false, nomLong:true, terrestre:true, numeroPair:false, numeroImpair:true, numInf50:false, numSup50:true, axeParisLyonMarseille:false, facadeAtlantiqueManche:false, nordDeLaLoire:false, pointCulminant1000m:false } },
  { num:"80", nom:"Somme", region:"Hauts-de-France", cats:{ fleuve:true, montagne:false, multiple5:true, cotier:true, frontalier:false, plus4voisins:true, sup6000km2:true, inf3500km2:false, pop1M:false, pop500k:false, sans100villes:false, moins300Clermont:false, plus300Clermont:true, zoneL:false, zoneO:true, voteMacron2022:false, voteLepen2022:true, genreMasc:false, genreFem:true, motCarafe:true, motPichet:false, motCruche:false, motPotDeau:false, asterixVisite:true, zenith:true, plusNordVancouver:true, clubL1L2:true, nomCompose:false, sansTiret:true, lettreR:false, lettreL:false, lettreA:false, sansLettreA:true, nomCourt:true, nomLong:false, terrestre:false, numeroPair:true, numeroImpair:false, numInf50:false, numSup50:true, axeParisLyonMarseille:false, facadeAtlantiqueManche:true, nordDeLaLoire:true, pointCulminant1000m:false } },
  { num:"81", nom:"Tarn", region:"Occitanie", cats:{ fleuve:false, montagne:false, multiple5:false, cotier:false, frontalier:false, plus4voisins:true, sup6000km2:false, inf3500km2:false, pop1M:false, pop500k:true, sans100villes:true, moins300Clermont:true, plus300Clermont:false, zoneL:true, zoneO:false, voteMacron2022:true, voteLepen2022:false, genreMasc:true, genreFem:false, motCarafe:true, motPichet:false, motCruche:false, motPotDeau:false, asterixVisite:false, zenith:false, plusNordVancouver:false, clubL1L2:false, nomCompose:false, sansTiret:true, lettreR:true, lettreL:false, lettreA:true, sansLettreA:false, nomCourt:true, nomLong:false, terrestre:true, numeroPair:false, numeroImpair:true, numInf50:false, numSup50:true, axeParisLyonMarseille:false, facadeAtlantiqueManche:false, nordDeLaLoire:false, pointCulminant1000m:true } },
  { num:"82", nom:"Tarn-et-Garonne", region:"Occitanie", cats:{ fleuve:true, montagne:false, multiple5:false, cotier:false, frontalier:false, plus4voisins:true, sup6000km2:false, inf3500km2:false, pop1M:false, pop500k:true, sans100villes:false, moins300Clermont:true, plus300Clermont:false, zoneL:true, zoneO:false, voteMacron2022:false, voteLepen2022:true, genreMasc:true, genreFem:false, motCarafe:true, motPichet:false, motCruche:false, motPotDeau:false, asterixVisite:false, zenith:false, plusNordVancouver:false, clubL1L2:false, nomCompose:true, sansTiret:false, lettreR:true, lettreL:false, lettreA:true, sansLettreA:false, nomCourt:false, nomLong:true, terrestre:true, numeroPair:true, numeroImpair:false, numInf50:false, numSup50:true, axeParisLyonMarseille:false, facadeAtlantiqueManche:false, nordDeLaLoire:false, pointCulminant1000m:false } },
  { num:"83", nom:"Var", region:"Provence-Alpes-Côte d'Azur", cats:{ fleuve:true, montagne:false, multiple5:false, cotier:true, frontalier:false, plus4voisins:false, sup6000km2:true, inf3500km2:false, pop1M:true, pop500k:false, sans100villes:false, moins300Clermont:false, plus300Clermont:true, zoneL:true, zoneO:false, voteMacron2022:false, voteLepen2022:true, genreMasc:true, genreFem:false, motCarafe:true, motPichet:false, motCruche:false, motPotDeau:true, asterixVisite:false, zenith:true, plusNordVancouver:false, clubL1L2:false, nomCompose:false, sansTiret:true, lettreR:true, lettreL:false, lettreA:true, sansLettreA:false, nomCourt:true, nomLong:false, terrestre:false, numeroPair:false, numeroImpair:true, numInf50:false, numSup50:true, axeParisLyonMarseille:false, facadeAtlantiqueManche:false, nordDeLaLoire:false, pointCulminant1000m:true } },
  { num:"84", nom:"Vaucluse", region:"Provence-Alpes-Côte d'Azur", cats:{ fleuve:false, montagne:false, multiple5:false, cotier:false, frontalier:false, plus4voisins:true, sup6000km2:false, inf3500km2:false, pop1M:false, pop500k:false, sans100villes:false, moins300Clermont:true, plus300Clermont:false, zoneL:true, zoneO:false, voteMacron2022:false, voteLepen2022:true, genreMasc:true, genreFem:false, motCarafe:false, motPichet:false, motCruche:false, motPotDeau:true, asterixVisite:false, zenith:false, plusNordVancouver:false, clubL1L2:false, nomCompose:false, sansTiret:true, lettreR:false, lettreL:true, lettreA:true, sansLettreA:false, nomCourt:false, nomLong:true, terrestre:true, numeroPair:true, numeroImpair:false, numInf50:false, numSup50:true, axeParisLyonMarseille:true, facadeAtlantiqueManche:false, nordDeLaLoire:false, pointCulminant1000m:true } },
  { num:"85", nom:"Vendée", region:"Pays de la Loire", cats:{ fleuve:false, montagne:false, multiple5:true, cotier:true, frontalier:false, plus4voisins:false, sup6000km2:true, inf3500km2:false, pop1M:false, pop500k:false, sans100villes:false, moins300Clermont:false, plus300Clermont:true, zoneL:false, zoneO:true, voteMacron2022:true, voteLepen2022:false, genreMasc:false, genreFem:true, motCarafe:false, motPichet:true, motCruche:false, motPotDeau:false, asterixVisite:false, zenith:false, plusNordVancouver:false, clubL1L2:false, nomCompose:false, sansTiret:true, lettreR:false, lettreL:false, lettreA:false, sansLettreA:true, nomCourt:true, nomLong:false, terrestre:false, numeroPair:false, numeroImpair:true, numInf50:false, numSup50:true, axeParisLyonMarseille:false, facadeAtlantiqueManche:true, nordDeLaLoire:false, pointCulminant1000m:false } },
  { num:"86", nom:"Vienne", region:"Nouvelle-Aquitaine", cats:{ fleuve:false, montagne:false, multiple5:false, cotier:false, frontalier:false, plus4voisins:true, sup6000km2:true, inf3500km2:false, pop1M:false, pop500k:true, sans100villes:false, moins300Clermont:true, plus300Clermont:false, zoneL:false, zoneO:true, voteMacron2022:true, voteLepen2022:false, genreMasc:false, genreFem:true, motCarafe:false, motPichet:true, motCruche:false, motPotDeau:false, asterixVisite:false, zenith:false, plusNordVancouver:false, clubL1L2:false, nomCompose:false, sansTiret:true, lettreR:false, lettreL:false, lettreA:false, sansLettreA:true, nomCourt:true, nomLong:false, terrestre:true, numeroPair:true, numeroImpair:false, numInf50:false, numSup50:true, axeParisLyonMarseille:false, facadeAtlantiqueManche:false, nordDeLaLoire:false, pointCulminant1000m:false } },
  { num:"87", nom:"Haute-Vienne", region:"Nouvelle-Aquitaine", cats:{ fleuve:false, montagne:false, multiple5:false, cotier:false, frontalier:false, plus4voisins:true, sup6000km2:false, inf3500km2:false, pop1M:false, pop500k:true, sans100villes:false, moins300Clermont:true, plus300Clermont:false, zoneL:true, zoneO:false, voteMacron2022:true, voteLepen2022:false, genreMasc:false, genreFem:true, motCarafe:false, motPichet:true, motCruche:false, motPotDeau:false, asterixVisite:false, zenith:true, plusNordVancouver:false, clubL1L2:false, nomCompose:true, sansTiret:false, lettreR:false, lettreL:false, lettreA:true, sansLettreA:false, nomCourt:false, nomLong:true, terrestre:true, numeroPair:false, numeroImpair:true, numInf50:false, numSup50:true, axeParisLyonMarseille:false, facadeAtlantiqueManche:false, nordDeLaLoire:false, pointCulminant1000m:false } },
  { num:"88", nom:"Vosges", region:"Grand Est", cats:{ fleuve:false, montagne:true, multiple5:false, cotier:false, frontalier:false, plus4voisins:true, sup6000km2:false, inf3500km2:false, pop1M:false, pop500k:true, sans100villes:true, moins300Clermont:false, plus300Clermont:true, zoneL:false, zoneO:true, voteMacron2022:false, voteLepen2022:true, genreMasc:false, genreFem:true, motCarafe:false, motPichet:false, motCruche:true, motPotDeau:false, asterixVisite:false, zenith:false, plusNordVancouver:false, clubL1L2:false, nomCompose:false, sansTiret:true, lettreR:false, lettreL:false, lettreA:false, sansLettreA:true, nomCourt:true, nomLong:false, terrestre:true, numeroPair:true, numeroImpair:false, numInf50:false, numSup50:true, axeParisLyonMarseille:false, facadeAtlantiqueManche:false, nordDeLaLoire:true, pointCulminant1000m:true } },
  { num:"89", nom:"Yonne", region:"Bourgogne-Franche-Comté", cats:{ fleuve:false, montagne:false, multiple5:false, cotier:false, frontalier:false, plus4voisins:true, sup6000km2:true, inf3500km2:false, pop1M:false, pop500k:true, sans100villes:true, moins300Clermont:true, plus300Clermont:false, zoneL:false, zoneO:true, voteMacron2022:true, voteLepen2022:false, genreMasc:false, genreFem:true, motCarafe:true, motPichet:false, motCruche:true, motPotDeau:false, asterixVisite:false, zenith:false, plusNordVancouver:false, clubL1L2:true, nomCompose:false, sansTiret:true, lettreR:false, lettreL:false, lettreA:false, sansLettreA:true, nomCourt:true, nomLong:false, terrestre:true, numeroPair:false, numeroImpair:true, numInf50:false, numSup50:true, axeParisLyonMarseille:true, facadeAtlantiqueManche:false, nordDeLaLoire:true, pointCulminant1000m:false } },
  { num:"90", nom:"Territoire de Belfort", region:"Bourgogne-Franche-Comté", cats:{ fleuve:false, montagne:false, multiple5:true, cotier:false, frontalier:true, plus4voisins:false, sup6000km2:false, inf3500km2:true, pop1M:false, pop500k:true, sans100villes:true, moins300Clermont:false, plus300Clermont:true, zoneL:false, zoneO:true, voteMacron2022:true, voteLepen2022:false, genreMasc:true, genreFem:false, motCarafe:false, motPichet:false, motCruche:true, motPotDeau:false, asterixVisite:false, zenith:false, plusNordVancouver:false, clubL1L2:false, nomCompose:false, sansTiret:true, lettreR:true, lettreL:true, lettreA:false, sansLettreA:true, nomCourt:false, nomLong:true, terrestre:true, numeroPair:true, numeroImpair:false, numInf50:false, numSup50:true, axeParisLyonMarseille:false, facadeAtlantiqueManche:false, nordDeLaLoire:true, pointCulminant1000m:false } },
  { num:"91", nom:"Essonne", region:"Île-de-France", cats:{ fleuve:false, montagne:false, multiple5:false, cotier:false, frontalier:false, plus4voisins:true, sup6000km2:false, inf3500km2:true, pop1M:true, pop500k:false, sans100villes:false, moins300Clermont:false, plus300Clermont:true, zoneL:false, zoneO:true, voteMacron2022:true, voteLepen2022:false, genreMasc:false, genreFem:true, motCarafe:true, motPichet:false, motCruche:false, motPotDeau:false, asterixVisite:false, zenith:false, plusNordVancouver:false, clubL1L2:false, nomCompose:false, sansTiret:true, lettreR:false, lettreL:false, lettreA:false, sansLettreA:true, nomCourt:false, nomLong:false, terrestre:true, numeroPair:false, numeroImpair:true, numInf50:false, numSup50:true, axeParisLyonMarseille:true, facadeAtlantiqueManche:false, nordDeLaLoire:true, pointCulminant1000m:false } },
  { num:"92", nom:"Hauts-de-Seine", region:"Île-de-France", cats:{ fleuve:true, montagne:false, multiple5:false, cotier:false, frontalier:false, plus4voisins:true, sup6000km2:false, inf3500km2:true, pop1M:true, pop500k:false, sans100villes:false, moins300Clermont:false, plus300Clermont:true, zoneL:false, zoneO:true, voteMacron2022:true, voteLepen2022:false, genreMasc:false, genreFem:true, motCarafe:true, motPichet:false, motCruche:false, motPotDeau:false, asterixVisite:false, zenith:false, plusNordVancouver:false, clubL1L2:false, nomCompose:true, sansTiret:false, lettreR:false, lettreL:false, lettreA:true, sansLettreA:false, nomCourt:false, nomLong:true, terrestre:true, numeroPair:true, numeroImpair:false, numInf50:false, numSup50:true, axeParisLyonMarseille:false, facadeAtlantiqueManche:false, nordDeLaLoire:true, pointCulminant1000m:false } },
  { num:"93", nom:"Seine-Saint-Denis", region:"Île-de-France", cats:{ fleuve:true, montagne:false, multiple5:false, cotier:false, frontalier:false, plus4voisins:true, sup6000km2:false, inf3500km2:true, pop1M:true, pop500k:false, sans100villes:false, moins300Clermont:false, plus300Clermont:true, zoneL:false, zoneO:true, voteMacron2022:true, voteLepen2022:false, genreMasc:false, genreFem:true, motCarafe:true, motPichet:false, motCruche:false, motPotDeau:false, asterixVisite:false, zenith:false, plusNordVancouver:false, clubL1L2:true, nomCompose:true, sansTiret:false, lettreR:false, lettreL:false, lettreA:true, sansLettreA:false, nomCourt:false, nomLong:true, terrestre:true, numeroPair:false, numeroImpair:true, numInf50:false, numSup50:true, axeParisLyonMarseille:false, facadeAtlantiqueManche:false, nordDeLaLoire:true, pointCulminant1000m:false } },
  { num:"94", nom:"Val-de-Marne", region:"Île-de-France", cats:{ fleuve:false, montagne:false, multiple5:false, cotier:false, frontalier:false, plus4voisins:true, sup6000km2:false, inf3500km2:true, pop1M:true, pop500k:false, sans100villes:false, moins300Clermont:false, plus300Clermont:true, zoneL:false, zoneO:true, voteMacron2022:true, voteLepen2022:false, genreMasc:true, genreFem:false, motCarafe:true, motPichet:false, motCruche:false, motPotDeau:false, asterixVisite:false, zenith:false, plusNordVancouver:false, clubL1L2:false, nomCompose:true, sansTiret:false, lettreR:true, lettreL:true, lettreA:true, sansLettreA:false, nomCourt:false, nomLong:true, terrestre:true, numeroPair:true, numeroImpair:false, numInf50:false, numSup50:true, axeParisLyonMarseille:false, facadeAtlantiqueManche:false, nordDeLaLoire:true, pointCulminant1000m:false } },
  { num:"95", nom:"Val-d'Oise", region:"Île-de-France", cats:{ fleuve:false, montagne:false, multiple5:true, cotier:false, frontalier:false, plus4voisins:true, sup6000km2:false, inf3500km2:true, pop1M:true, pop500k:false, sans100villes:false, moins300Clermont:false, plus300Clermont:true, zoneL:false, zoneO:true, voteMacron2022:true, voteLepen2022:false, genreMasc:true, genreFem:false, motCarafe:true, motPichet:false, motCruche:false, motPotDeau:false, asterixVisite:false, zenith:false, plusNordVancouver:false, clubL1L2:false, nomCompose:true, sansTiret:false, lettreR:false, lettreL:true, lettreA:true, sansLettreA:false, nomCourt:false, nomLong:true, terrestre:true, numeroPair:false, numeroImpair:true, numInf50:false, numSup50:true, axeParisLyonMarseille:false, facadeAtlantiqueManche:false, nordDeLaLoire:true, pointCulminant1000m:false } }
];

DEPARTEMENTS.forEach(d => {
  d.cats.sansE = !/e/i.test(d.nom);
  d.cats.voyelle = /^[AEIOUÀÂÉÈÊËÎÏÔÙÛÜÆŒaeiouàâéèêëîïôùûüæœ]/i.test(d.nom);
  const idReg = REGION_VERS_ID[d.region];
  if (idReg) d.cats[idReg] = true;
  Object.values(REGION_VERS_ID).forEach(id => { if (!(id in d.cats)) d.cats[id] = false; });
});

// ─────────────────────────────────────────────
// 3. GÉNÉRATION INTELLIGENTE DES GRILLES
// ─────────────────────────────────────────────
const CATEGORY_HISTORY_KEY = "deptdoku_category_history_v2";
const NB_JOURS_HISTORIQUE = 10;
const NB_CANDIDATS = 12000;

function melanger(tableau, rng) {
  const t = [...tableau];
  for (let i = t.length - 1; i > 0; i--) {
    const j = Math.floor(rng() * (i + 1));
    [t[i], t[j]] = [t[j], t[i]];
  }
  return t;
}

function chargerHistoriqueCategories() {
  try {
    const raw = localStorage.getItem(CATEGORY_HISTORY_KEY);
    if (!raw) return [];
    const data = JSON.parse(raw);
    if (!Array.isArray(data)) return [];
    return data
      .filter(j => j && typeof j.date === "string" && Array.isArray(j.categories))
      .slice(0, NB_JOURS_HISTORIQUE);
  } catch (e) {
    console.warn("Impossible de charger l'historique des catégories", e);
    return [];
  }
}

function sauverHistoriqueCategories(historique) {
  try {
    localStorage.setItem(CATEGORY_HISTORY_KEY, JSON.stringify(historique.slice(0, NB_JOURS_HISTORIQUE)));
  } catch (e) {
    console.warn("Impossible de sauvegarder l'historique des catégories", e);
  }
}

function dateHistorique(decalage = 0) {
  const d = new Date();
  if (decalage !== 0) d.setDate(d.getDate() - decalage);
  return [
    d.getFullYear(),
    String(d.getMonth() + 1).padStart(2, "0"),
    String(d.getDate()).padStart(2, "0")
  ].join("-");
}

function enregistrerGrilleDansHistorique(grille) {
  if (!grille) return;
  const categories = [...grille.lignes, ...grille.colonnes];
  let historique = chargerHistoriqueCategories();
  const aujourdHui = dateHistorique(0);
  historique = historique.filter(j => j.date !== aujourdHui);
  historique.unshift({ date: aujourdHui, categories });
  historique = historique.slice(0, NB_JOURS_HISTORIQUE);
  sauverHistoriqueCategories(historique);
}

const FAMILLES = [
  ["moins300Clermont", "plus300Clermont"],
  ["zoneL", "zoneO"],
  ["voteMacron2022", "voteLepen2022"],
  ["genreMasc", "genreFem"],
  ["sup6000km2", "inf3500km2"],
  ["pop1M", "pop500k"],
  ["nomCompose", "sansTiret"],
  ["lettreA", "sansLettreA"],
  ["nomCourt", "nomLong"],
  ["cotier", "terrestre"],
  ["numeroPair", "numeroImpair"],
  ["numInf50", "numSup50"],
  ["motCarafe", "motPichet", "motCruche", "motPotDeau"]
];

function getMembresFamille(id) {
  for (const f of FAMILLES) {
    if (f.includes(id)) return f;
  }
  return [id];
}

function sontIncompatibles(id1, id2) {
  if (id1 === id2) return true;
  for (const f of FAMILLES) {
    if (f.includes(id1) && f.includes(id2)) return true;
  }
  if (id1.startsWith("reg_") && id2.startsWith("reg_")) return true;
  return false;
}

function categorieDansHistorique(id, historique) {
  return historique.findIndex(j => j.categories.includes(id));
}

function joursDepuisCategorie(id, historique) {
  const index = categorieDansHistorique(id, historique);
  if (index === -1) return Infinity;
  return index + 1;
}

function familleDansHistorique(id, historique) {
  const famille = getMembresFamille(id);
  return historique.findIndex(j => j.categories.some(cat => famille.includes(cat)));
}

function scoreCategorie(id, historique) {
  const jours = joursDepuisCategorie(id, historique);
  if (jours === Infinity) return 150;
  if (jours >= 10) return 130;
  if (jours >= 8)  return 110;
  if (jours >= 6)  return 90;
  if (jours >= 5)  return 70;
  if (jours >= 4)  return 50;
  if (jours >= 3)  return 30;
  if (jours >= 2)  return 10;
  return -100;
}

function nombreCategoriesCommunes(categoriesA, categoriesB) {
  const setB = new Set(categoriesB);
  return categoriesA.filter(id => setB.has(id)).length;
}

function scoreAntiRepetition(grille, historique) {
  const categories = [...grille.lignes, ...grille.colonnes];
  let score = 0;
  historique.forEach((jour, index) => {
    const communes = nombreCategoriesCommunes(categories, jour.categories);
    if (index === 0) score -= communes * 45;
    else if (index === 1) score -= communes * 25;
    else if (index === 2) score -= communes * 15;
    else score -= communes * 6;
  });
  return score;
}

function scoreGrille(grille, historique) {
  const categories = [...grille.lignes, ...grille.colonnes];
  let score = 0;
  categories.forEach(id => { score += scoreCategorie(id, historique); });
  const familles = new Set();
  categories.forEach(id => {
    const famille = getMembresFamille(id);
    familles.add(famille[0]);
  });
  score += familles.size * 5;
  categories.forEach(id => {
    const indexFamille = familleDansHistorique(id, historique);
    if (indexFamille === 0) score -= 100;
    else if (indexFamille === 1) score -= 45;
    else if (indexFamille === 2) score -= 20;
  });
  score += scoreAntiRepetition(grille, historique);
  return score;
}

function reponsesValides(idL, idC) {
  return DEPARTEMENTS.filter(d => d.cats[idL] === true && d.cats[idC] === true).map(d => d.nom);
}

function verifierGrilleValide(lignes, colonnes, minRep = 3) {
  if (lignes.some((l, i) => lignes.slice(i + 1).some(l2 => sontIncompatibles(l, l2)))) return false;
  if (colonnes.some((c, i) => colonnes.slice(i + 1).some(c2 => sontIncompatibles(c, c2)))) return false;
  for (let r = 0; r < 3; r++) {
    for (let c = 0; c < 3; c++) {
      if (sontIncompatibles(lignes[r], colonnes[c])) return false;
      if (reponsesValides(lignes[r], colonnes[c]).length < minRep) return false;
    }
  }
  return true;
}

function graineDuJour(decalage = 0) {
  const d = new Date();
  if (decalage !== 0) d.setDate(d.getDate() - decalage);
  return d.getFullYear() * 10000 + (d.getMonth() + 1) * 100 + d.getDate();
}

function creerAleatoire(graine) {
  let s = graine;
  return () => { s = (s * 1664525 + 1013904223) & 0xffffffff; return (s >>> 0) / 0xffffffff; };
}

function trouverGrille(pool, rng, minRep = 3, historique = []) {
  let meilleureGrille = null;
  let meilleurScore = -Infinity;
  const grillesVues = new Set();

  for (let essai = 0; essai < NB_CANDIDATS; essai++) {
    const m = melanger(pool, rng);
    const lignes = m.slice(0, 3);
    const colonnes = m.slice(3, 6);
    const cle = [...lignes, ...colonnes].sort().join("|");

    if (grillesVues.has(cle)) continue;
    grillesVues.add(cle);

    if (!verifierGrilleValide(lignes, colonnes, minRep)) continue;

    const grille = { lignes, colonnes };
    const score = scoreGrille(grille, historique);

    if (score > meilleurScore) {
      meilleureGrille = grille;
      meilleuroScore = score;
    }
  }
  return meilleureGrille;
}

function choisirCategories() {
  const tous = CATEGORIES.map(c => c.id);
  const historique = chargerHistoriqueCategories();
  const hier = historique.find(j => j.date === dateHistorique(1));
  const catsHier = hier ? hier.categories : [];

  const bannis = new Set();
  catsHier.forEach(id => {
    bannis.add(id);
    getMembresFamille(id).forEach(m => bannis.add(m));
  });

  const poolAujourdhui = tous.filter(id => !bannis.has(id));
  const rng = creerAleatoire(graineDuJour(0));
  let grille = trouverGrille(poolAujourdhui, rng, 3, historique);

  if (!grille) {
    grille = trouverGrille(tous, rng, 3, historique);
  }

  if (!grille) {
    return {
      lignes: ["nomCompose", "lettreR", "numeroPair"],
      colonnes: ["clubL1L2", "sans100villes", "plus4voisins"]
    };
  }

  enregistrerGrilleDansHistorique(grille);
  return grille;
}

const { lignes, colonnes } = choisirCategories();
const ROWS = lignes.map(id => ({ id, label: CATEGORIES.find(c => c.id === id).label }));
const COLS = colonnes.map(id => ({ id, label: CATEGORIES.find(c => c.id === id).label }));
const ANSWERS = ROWS.map(r => COLS.map(c => reponsesValides(r.id, c.id)));
const ALL_DEPS = DEPARTEMENTS.map(d => d.nom);

// Calcul déterministe des pourcentages et des points par case (Somme = 100.0 %)
const STATS = ROWS.map((r, rIdx) => COLS.map((c, cIdx) => {
  const deps = ANSWERS[rIdx][cIdx];
  if (deps.length === 0) return {};

  const weights = {};
  let totalW = 0;

  deps.forEach(nom => {
    const d = DEPARTEMENTS.find(item => item.nom === nom);
    let w = 15;
    if (d.cats.pop1M) w += 40;
    if (!d.cats.sans100villes) w += 20;
    if (d.cats.pop500k) w -= 8;

    const pseudoRand = ((parseInt(d.num, 10) * 17 + rIdx * 31 + cIdx * 13 + graineDuJour()) % 40) / 10;
    w = Math.max(1, w + pseudoRand);
    weights[nom] = w;
    totalW += w;
  });

  let distributed = 0;
  const items = deps.map(nom => {
    const exact = (weights[nom] / totalW) * 1000;
    const base = Math.floor(exact);
    const remainder = exact - base;
    distributed += base;
    return { nom, base, remainder };
  });

  let diff = 1000 - distributed;
  items.sort((a, b) => b.remainder - a.remainder);
  for (let i = 0; i < diff; i++) {
    items[i].base += 1;
  }

  const pcts = {};
  let minPct = 100, maxPct = 0;
  items.forEach(item => {
    const p = parseFloat((item.base / 10).toFixed(1));
    pcts[item.nom] = p;
    if (p < minPct) minPct = p;
    if (p > maxPct) maxPct = p;
  });

  const cellData = {};
  items.forEach(item => {
    const p = pcts[item.nom];
    let pts = 100;
    if (maxPct !== minPct) {
      pts = Math.round(100 - 80 * ((p - minPct) / (maxPct - minPct)));
    }
    cellData[item.nom] = { pct: p, pts: pts };
  });

  return cellData;
}));
// ─────────────────────────────────────────────
// 3. ÉTAT & SAUVEGARDE QUOTIDIENNE (PARTIE UNIQUE)
// ─────────────────────────────────────────────
const STORAGE_KEY = 'deptdoku_' + graineDuJour();

let gridState = Array.from({length: 3}, () => Array(3).fill(null));
let usedAnswers = new Set();
let selectedCell = null;
let mistakes = 0;
const MAX_MISTAKES = 5;
let sugSelected = -1;
let gameOver = false;
let currentScore = 0;
let isFreePlay = false;

function calculerBonus() {
  const won = gridState.every(row => row.every(cell => cell !== null));
  if (!won) return 0;
  return Math.max(0, 100 - (mistakes * 20));
}

function calculerScoreTotal() {
  return currentScore + calculerBonus();
}

function saveGameProgress() {
  const data = {
    gridState,
    mistakes,
    gameOver,
    currentScore,
    usedAnswers: Array.from(usedAnswers),
    isFreePlay
  };
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}

function loadSavedGame() {
  const saved = localStorage.getItem(STORAGE_KEY);
  if (!saved) return false;
  try {
    const data = JSON.parse(saved);
    gridState = data.gridState || gridState;
    mistakes = data.mistakes || 0;
    gameOver = data.gameOver || false;
    currentScore = data.currentScore || 0;
    usedAnswers = new Set(data.usedAnswers || []);
    isFreePlay = data.isFreePlay || false;

    for (let i = 0; i < mistakes; i++) {
      const d = document.getElementById('d' + i);
      if (d) d.classList.add('used');
    }
    updateScoreDisplay();
    return true;
  } catch (e) {
    return false;
  }
}

function updateScoreDisplay() {
  document.getElementById('totalScore').textContent = calculerScoreTotal();
}

function setDateDisplay() {
  const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
  const d = new Date();
  const dateFormatted = d.toLocaleDateString('fr-FR', options);
  document.getElementById('todayDate').textContent = `Grille du ${dateFormatted}`;
}

// ─────────────────────────────────────────────
// 4. RENDU GRILLE & CARTE D3 SANS CORSE
// ─────────────────────────────────────────────
function buildGrid() {
  const table = document.getElementById('grid');
  table.innerHTML = '';
  const thead = table.createTHead();
  const hr = thead.insertRow();
  hr.insertCell();
  COLS.forEach(c => { const th = document.createElement('th'); th.textContent = c.label; hr.appendChild(th); });
  const tbody = table.createTBody();
  ROWS.forEach((row, r) => {
    const tr = tbody.insertRow();
    const th = document.createElement('th'); th.textContent = row.label; tr.appendChild(th);
    COLS.forEach((_, c) => {
      const td = tr.insertCell();
      renderCell(td, r, c);
      td.addEventListener('click', () => handleCellClick(td, r, c));
    });
  });
}

function renderCell(td, r, c) {
  td.innerHTML = '';
  const cellData = gridState[r][c];

  if (cellData) {
    td.className = 'filled' + (gameOver && !isFreePlay ? ' game-over-clickable' : '');
    td.innerHTML = `
      <div class="cell-answer">
        <div class="cell-answer-name">${cellData.nom} (${cellData.num})</div>
        <div class="cell-answer-details">
          <span class="cell-answer-pct">${cellData.pct}%</span>
          <span class="cell-answer-pts">+${cellData.pts}</span>
        </div>
      </div>`;
  } else {
    td.className = (gameOver && !isFreePlay) ? 'game-over-clickable' : '';
    td.innerHTML = `<span class="cell-placeholder">${gameOver && !isFreePlay ? '?' : ''}</span>`;
  }
}

function handleCellClick(td, r, c) {
  if (gameOver && !isFreePlay) {
    openModal(r, c);
    return;
  }
  selectCell(td, r, c);
}

function selectCell(td, r, c) {
  if (td.classList.contains('filled')) return;
  if (mistakes >= MAX_MISTAKES && !isFreePlay) return;
  if (selectedCell) selectedCell.td.classList.remove('selected');
  selectedCell = { r, c, td };
  td.classList.add('selected');

  const nbReponses = ANSWERS[r][c].length;
  searchEl.placeholder = `${nbReponses} réponse${nbReponses > 1 ? 's' : ''} possible${nbReponses > 1 ? 's' : ''}…`;

  searchEl.disabled = false;
  searchEl.value = '';
  searchEl.focus();
  document.getElementById('hint').textContent = `Case : ${ROWS[r].label} × ${COLS[c].label}`;
  document.getElementById('hint').className = 'search-hint active';
  closeSuggestions();
}

function checkGameOver() {
  const won = gridState.every(row => row.every(cell => cell !== null));
  if (won) {
    if (isFreePlay) {
      searchEl.disabled = true;
      searchEl.placeholder = 'Tapez au moins 3 lettres…';
      if (selectedCell) { selectedCell.td.classList.remove('selected'); selectedCell = null; }
      document.getElementById('hint').textContent = `Grille complétée ! (Mode sans score)`;
      document.getElementById('hint').className = 'search-hint';
      retirerBoutonAbandon();
      saveGameProgress();
      return;
    }

    gameOver = true;
    searchEl.disabled = true;
    searchEl.placeholder = 'Tapez au moins 3 lettres…';
    if (selectedCell) { selectedCell.td.classList.remove('selected'); selectedCell = null; }
    
    updateScoreDisplay();
    const finalScore = calculerScoreTotal();
    const bonus = calculerBonus();
    
    document.getElementById('hint').textContent = `Victoire ! Score final : ${finalScore} / 1000 (dont ${bonus} pts de bonus)`;
    document.getElementById('hint').className = 'search-hint';
    activateGameOverMode();
    showEndGamePopup(true);
    saveGameProgress();
  }
}

function activateGameOverMode() {
  const tds = document.querySelectorAll('#grid tbody td');
  let idx = 0;
  for (let r = 0; r < 3; r++) {
    for (let c = 0; c < 3; c++) {
      renderCell(tds[idx], r, c);
      idx++;
    }
  }
  if (!document.querySelector('.game-over-hint')) {
    const hint = document.createElement('p');
    hint.className = 'game-over-hint';
    hint.textContent = 'Clique sur une case pour explorer les réponses possibles';
    document.querySelector('.left-pane').appendChild(hint);
  }
}

function afficherBoutonAbandon() {
  if (document.getElementById('btnAbandonFreePlay')) return;
  const btn = document.createElement('button');
  btn.id = 'btnAbandonFreePlay';
  btn.className = 'btn-secondary';
  btn.style.marginTop = '6px';
  btn.style.maxWidth = '360px';
  btn.textContent = 'Abandonner et explorer la grille';
  btn.addEventListener('click', abandonnerModeLibre);
  document.querySelector('.search-section').appendChild(btn);
}

function retirerBoutonAbandon() {
  const btn = document.getElementById('btnAbandonFreePlay');
  if (btn) btn.remove();
}

function abandonnerModeLibre() {
  isFreePlay = false;
  gameOver = true;
  searchEl.disabled = true;
  searchEl.placeholder = 'Tapez au moins 3 lettres…';
  if (selectedCell) {
    selectedCell.td.classList.remove('selected');
    selectedCell = null;
  }
  closeSuggestions();
  retirerBoutonAbandon();

  document.getElementById('hint').textContent = `Partie terminée (${calculerScoreTotal()} pts) — Clique sur une case pour voir les réponses`;
  document.getElementById('hint').className = 'search-hint';

  activateGameOverMode();
  saveGameProgress();
}

const tooltip = document.getElementById('mapTooltip');

async function initMap() {
  try {
    const res = await fetch('https://cdn.jsdelivr.net/gh/gregoiredavid/france-geojson@master/departements.geojson');
    const geojson = await res.json();
    const svg = d3.select('#map-svg');

    // Exclusion de la Corse (2A et 2B)
    const featuresSansCorse = geojson.features.filter(
      d => d.properties.code !== '2A' && d.properties.code !== '2B'
    );

    const projection = d3.geoConicConformal()
      .center([2.65, 46.4])
      .scale(2550)
      .translate([250, 250]);

    const path = d3.geoPath().projection(projection);

    svg.selectAll('path.dept')
      .data(featuresSansCorse)
      .enter()
      .append('path')
      .attr('class', 'dept')
      .attr('d', path)
      .attr('id', d => 'map-' + d.properties.code)
      .on('mousemove', function(event, d) {
        if (d3.select(this).classed('correct')) {
          const deptObj = DEPARTEMENTS.find(item => item.num === d.properties.code);
          const name = deptObj ? deptObj.nom : d.properties.nom;
          const rect = document.querySelector('.right-pane').getBoundingClientRect();
          
          tooltip.style.display = 'block';
          tooltip.style.left = (event.clientX - rect.left) + 'px';
          tooltip.style.top = (event.clientY - rect.top) + 'px';
          tooltip.textContent = `${name} (${d.properties.code})`;
        }
      })
      .on('mouseleave', function() {
        tooltip.style.display = 'none';
      });

    gridState.forEach(row => row.forEach(cell => {
      if (cell) colorMap(cell.num, true);
    }));
  } catch (e) {
    console.error("Erreur de chargement de la carte", e);
  }
}

function colorMap(num, isCorrect) {
  const el = document.getElementById('map-' + num);
  if (!el) return;
  if (isCorrect) {
    el.classList.remove('wrong');
    el.classList.add('correct');
  } else {
    el.classList.add('wrong');
    setTimeout(() => el.classList.remove('wrong'), 1000);
  }
}

// ─────────────────────────────────────────────
// 5. POP-UP DE FIN & PARTAGE
// ─────────────────────────────────────────────
function showEndGamePopup(isWon) {
  const modal = document.getElementById('endGameModal');
  let foundCount = 0;
  let rarest = null;

  gridState.forEach(row => row.forEach(cell => {
    if (cell) {
      foundCount++;
      if (!rarest || cell.pct < rarest.pct) {
        rarest = cell;
      }
    }
  }));

  const bonus = calculerBonus();
  const finalScore = calculerScoreTotal();

  document.getElementById('endGameTitle').textContent = isWon ? 'Victoire !' : 'Partie terminée';
  document.getElementById('endGameSubtitle').textContent = isWon ? 'Grille entièrement complétée' : 'Limite des 5 erreurs atteinte';
  document.getElementById('endScore').textContent = `${finalScore} / 1000`;
  document.getElementById('endFound').textContent = `${foundCount} / 9`;
  document.getElementById('endMistakes').textContent = `${mistakes} / 5`;

  const btnFree = document.getElementById('btnFreePlayTrigger');
  if (!isWon && foundCount < 9) {
    btnFree.style.display = 'block';
  } else {
    btnFree.style.display = 'none';
  }

  if (isWon) {
    document.getElementById('endBonusBox').style.display = 'block';
    document.getElementById('endBonusVal').textContent = `+${bonus} pts (départ 100 - ${mistakes * 20})`;
  } else {
    document.getElementById('endBonusBox').style.display = 'none';
  }

  if (rarest) {
    document.getElementById('endRarest').textContent = `${rarest.nom} (${rarest.pct} %)`;
  } else {
    document.getElementById('endRarest').textContent = 'Aucun département trouvé';
  }

  modal.classList.add('open');
}

function genererTextePartage() {
  let foundCount = 0;
  let gridVisual = '';

  for (let r = 0; r < 3; r++) {
    for (let c = 0; c < 3; c++) {
      if (gridState[r][c]) {
        foundCount++;
        gridVisual += '🟩';
      } else {
        gridVisual += '⬜';
      }
    }
    gridVisual += '\n';
  }

  let rarestText = '';
  let rarest = null;
  gridState.forEach(row => row.forEach(cell => {
    if (cell && (!rarest || cell.pct < rarest.pct)) rarest = cell;
  }));
  if (rarest) rarestText = `\nDépartement le plus rare : ${rarest.nom} (${rarest.pct} %)`;

  const bonus = calculerBonus();
  const finalScore = calculerScoreTotal();
  const bonusText = foundCount === 9 ? ` (dont bonus : +${bonus} pts)` : '';

  const d = new Date();
  const dateStr = `${d.getDate()}/${d.getMonth()+1}/${d.getFullYear()}`;

  return `Départementdoku (${dateStr})\nScore : ${finalScore}/1000 pts${bonusText} (${foundCount}/9)\nErreurs : ${mistakes}/5${rarestText}\n\n${gridVisual}`;
}

document.getElementById('btnShare').addEventListener('click', async () => {
  const text = genererTextePartage();
  const btn = document.getElementById('btnShare');
  try {
    await navigator.clipboard.writeText(text);
    btn.textContent = 'Copié !';
    setTimeout(() => { btn.textContent = 'Copier / Partager mon score'; }, 2500);
  } catch (err) {
    alert(text);
  }
});

// ─────────────────────────────────────────────
// 6. GESTION DES MODALS
// ─────────────────────────────────────────────
function openModal(r, c) {
  const cellStats = STATS[r][c];
  const sortedDeps = Object.keys(cellStats).sort((a, b) => cellStats[a].pct - cellStats[b].pct);
  const played = gridState[r][c];

  document.getElementById('modalCats').innerHTML =
    `<span>${ROWS[r].label}</span> × <span>${COLS[c].label}</span>`;

  const total = sortedDeps.length;
  document.getElementById('modalSubtitle').textContent =
    `${total} département${total > 1 ? 's' : ''} valide${total > 1 ? 's' : ''} :`;

  const container = document.getElementById('modalAnswers');
  container.innerHTML = '';

  sortedDeps.forEach(dep => {
    const isChosen = played && played.nom === dep;
    const info = cellStats[dep];
    const row = document.createElement('div');
    row.className = 'answer-row' + (isChosen ? ' chosen' : '');
    row.innerHTML = `
      <span>${isChosen ? '✓ ' : ''}${dep}</span>
      <div class="answer-row-right">
        <span class="answer-row-pct">${info.pct} %</span>
        <span class="answer-row-pts">+${info.pts} pts</span>
      </div>
    `;
    container.appendChild(row);
  });

  const countEl = document.getElementById('modalCount');
  countEl.textContent = played
    ? `Ton choix : ${played.nom} (${played.pct} % — +${played.pts} pts)`
    : 'Case non répondue';

  document.getElementById('modalOverlay').classList.add('open');
}

function closeModal() {
  document.getElementById('modalOverlay').classList.remove('open');
}

document.getElementById('modalClose').addEventListener('click', closeModal);
document.getElementById('modalOverlay').addEventListener('click', e => {
  if (e.target === document.getElementById('modalOverlay')) closeModal();
});

// Modal Règles
const rulesModal = document.getElementById('rulesModal');
document.getElementById('btnOpenRules').addEventListener('click', () => rulesModal.classList.add('open'));
document.getElementById('btnStartGame').addEventListener('click', () => rulesModal.classList.remove('open'));
document.getElementById('btnCloseRulesCross').addEventListener('click', () => rulesModal.classList.remove('open'));
rulesModal.addEventListener('click', e => { if (e.target === rulesModal) rulesModal.classList.remove('open'); });

// Modal En savoir plus
const aboutModal = document.getElementById('aboutModal');
document.getElementById('btnOpenAbout').addEventListener('click', () => aboutModal.classList.add('open'));
document.getElementById('btnCloseAbout').addEventListener('click', () => aboutModal.classList.remove('open'));
document.getElementById('btnCloseAboutCross').addEventListener('click', () => aboutModal.classList.remove('open'));
aboutModal.addEventListener('click', e => { if (e.target === aboutModal) aboutModal.classList.remove('open'); });

// Modal Mentions Légales
const legalModal = document.getElementById('legalModal');
document.getElementById('btnOpenLegal').addEventListener('click', () => legalModal.classList.add('open'));
document.getElementById('btnCloseLegal').addEventListener('click', () => legalModal.classList.remove('open'));
document.getElementById('btnCloseLegalCross').addEventListener('click', () => legalModal.classList.remove('open'));
legalModal.addEventListener('click', e => { if (e.target === legalModal) legalModal.classList.remove('open'); });

// Modal Mode Libre (Jouer sans score)
const freePlayModal = document.getElementById('freePlayModal');
document.getElementById('btnFreePlayTrigger').addEventListener('click', () => {
  document.getElementById('endGameModal').classList.remove('open');
  freePlayModal.classList.add('open');
});

document.getElementById('btnConfirmFreePlay').addEventListener('click', () => {
  freePlayModal.classList.remove('open');
  isFreePlay = true;
  const existingHint = document.querySelector('.game-over-hint');
  if (existingHint) existingHint.remove();

  const tds = document.querySelectorAll('#grid tbody td');
  let idx = 0;
  for (let r = 0; r < 3; r++) {
    for (let c = 0; c < 3; c++) {
      renderCell(tds[idx], r, c);
      idx++;
    }
  }

  afficherBoutonAbandon();
  document.getElementById('hint').textContent = 'Mode détente actif : remplis la grille pour le plaisir !';
  document.getElementById('hint').className = 'search-hint';
  saveGameProgress();
});
freePlayModal.addEventListener('click', e => { if (e.target === freePlayModal) freePlayModal.classList.remove('open'); });

// Fermeture globale à la touche Échap
document.addEventListener('keydown', e => {
  if (e.key === 'Escape') {
    closeModal();
    rulesModal.classList.remove('open');
    aboutModal.classList.remove('open');
    legalModal.classList.remove('open');
    document.getElementById('endGameModal').classList.remove('open');
    freePlayModal.classList.remove('open');
  }
});

// ─────────────────────────────────────────────
// 7. AUTOCOMPLETE
// ─────────────────────────────────────────────
const searchEl = document.getElementById('search');
const sugBox = document.getElementById('suggestions');

searchEl.addEventListener('input', () => { sugSelected = -1; updateSuggestions(searchEl.value); });

searchEl.addEventListener('keydown', e => {
  const items = sugBox.querySelectorAll('.sug-item');
  if (e.key === 'ArrowDown') {
    e.preventDefault();
    sugSelected = Math.min(sugSelected + 1, items.length - 1);
    highlightSug(items);
  } else if (e.key === 'ArrowUp') {
    e.preventDefault();
    sugSelected = Math.max(sugSelected - 1, 0);
    highlightSug(items);
  } else if (e.key === 'Enter') {
    if (sugSelected >= 0 && items[sugSelected]) submit(items[sugSelected].dataset.val);
    else if (items.length === 1) submit(items[0].dataset.val);
  } else if (e.key === 'Escape') {
    closeSuggestions();
  }
});

function highlightSug(items) {
  items.forEach((el, i) => el.classList.toggle('selected', i === sugSelected));
  if (items[sugSelected]) items[sugSelected].scrollIntoView({ block: 'nearest' });
}

function updateSuggestions(q) {
  if (!selectedCell) { closeSuggestions(); return; }
  const norm = normalize(q.trim());
  if (norm.length < 3) { closeSuggestions(); return; }
  const matches = ALL_DEPS.filter(d => !usedAnswers.has(d) && normalize(d).includes(norm));
  if (matches.length === 0) { closeSuggestions(); return; }
  sugBox.innerHTML = '';
  matches.slice(0, 20).forEach(dep => {
    const div = document.createElement('div');
    div.className = 'sug-item';
    div.dataset.val = dep;
    div.innerHTML = highlightText(dep, q.trim());
    div.addEventListener('mousedown', e => { e.preventDefault(); submit(dep); });
    sugBox.appendChild(div);
  });
  sugBox.classList.add('open');
}

function highlightText(text, q) {
  if (!q) return text;
  const chars = normalize(q).split('').map(c => c.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'));
  if (chars.length === 0) return text;
  const pattern = chars.map(c => `[${c}]`).join("[\\s\\-']?");
  try {
    const cleanText = text.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
    const match = cleanText.match(new RegExp(pattern, 'i'));
    if (!match) return text;
    const start = match.index;
    const len = match[0].length;
    return text.slice(0, start) + '<mark>' + text.slice(start, start + len) + '</mark>' + text.slice(start + len);
  } catch (e) {
    return text;
  }
}

function normalize(s) {
  return s.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/[^a-z0-9]/g, '');
}

function closeSuggestions() {
  sugBox.classList.remove('open');
  sugBox.innerHTML = '';
  sugSelected = -1;
}

// ─────────────────────────────────────────────
// 8. VALIDATION DU TOUR
// ─────────────────────────────────────────────
function submit(dep) {
  if (!selectedCell) return;
  const { r, c, td } = selectedCell;
  const valid = ANSWERS[r][c].includes(dep);
  const depObj = DEPARTEMENTS.find(d => d.nom === dep);
  closeSuggestions();
  searchEl.value = '';

  if (valid) {
    const info = STATS[r][c][dep];
    const ptsWon = isFreePlay ? 0 : info.pts;
    if (!isFreePlay) {
      currentScore += info.pts;
      updateScoreDisplay();
    }

    gridState[r][c] = { nom: dep, num: depObj.num, pct: info.pct, pts: ptsWon };
    usedAnswers.add(dep);
    if (depObj) colorMap(depObj.num, true);
    selectedCell = null;
    searchEl.disabled = true;
    searchEl.placeholder = 'Tapez au moins 3 lettres…';
    document.getElementById('hint').textContent = isFreePlay 
      ? `${dep} (${info.pct}%) — Validé !`
      : `${dep} (${info.pct}% — +${info.pts} pts) — Validé !`;
    document.getElementById('hint').className = 'search-hint';
    renderCell(td, r, c);
    saveGameProgress();
    checkGameOver();
  } else {
    if (isFreePlay) {
      td.classList.add('wrong');
      setTimeout(() => { td.classList.remove('wrong'); td.classList.add('selected'); }, 400);
      document.getElementById('hint').textContent = `"${dep}" n'est pas valide ici`;
      return;
    }

    mistakes++;
    if (depObj) colorMap(depObj.num, false);
    document.getElementById('d' + (mistakes - 1)).classList.add('used');
    td.classList.add('wrong');
    setTimeout(() => { td.classList.remove('wrong'); td.classList.add('selected'); }, 400);
    document.getElementById('hint').textContent = `"${dep}" n'est pas valide ici`;
    saveGameProgress();
    if (mistakes >= MAX_MISTAKES) {
      gameOver = true;
      searchEl.disabled = true;
      searchEl.placeholder = 'Tapez au moins 3 lettres…';
      selectedCell.td.classList.remove('selected');
      selectedCell = null;
      document.getElementById('hint').textContent = `5 erreurs — partie terminée ! (${calculerScoreTotal()} pts)`;
      document.getElementById('hint').className = 'search-hint';
      activateGameOverMode();
      showEndGamePopup(false);
      saveGameProgress();
    }
  }
}

document.addEventListener('click', e => { if (!e.target.closest('.search-section')) closeSuggestions(); });

// ─────────────────────────────────────────────
// INITIALISATION GLOBALE
// ─────────────────────────────────────────────
setDateDisplay();
const hasPlayed = loadSavedGame();
buildGrid();
initMap();
updateScoreDisplay();

if (hasPlayed) {
  document.getElementById('rulesModal').classList.remove('open');
  if (gameOver && !isFreePlay) {
    searchEl.disabled = true;
    searchEl.placeholder = 'Tapez au moins 3 lettres…';
    const isWon = gridState.every(row => row.every(cell => cell !== null));
    document.getElementById('hint').textContent = `Partie terminée (${calculerScoreTotal()} pts) — Clique sur une case pour voir les réponses`;
    activateGameOverMode();
    showEndGamePopup(isWon);
  } else if (isFreePlay) {
    const isFull = gridState.every(row => row.every(cell => cell !== null));
    if (isFull) {
      document.getElementById('hint').textContent = 'Grille complétée ! (Mode sans score)';
    } else {
      document.getElementById('hint').textContent = 'Mode détente actif : remplis la grille pour le plaisir !';
      afficherBoutonAbandon();
    }
  }
}
const CATEGORIES = [
  { id: "fleuve",           label: "A un fleuve dans son nom" },
  { id: "montagne",         label: "A une montagne dans son nom" },
  { id: "multiple5",        label: "Numéro multiple de 5" },
  { id: "cotier",           label: "Est côtier" },
  { id: "frontalier",       label: "Est frontalier" },
  { id: "plus4voisins",     label: "A plus de 4 départements limitrophes" },
  { id: "sup6000km2",       label: "Superficie supérieure à 6 000 km²" },
  { id: "inf3500km2",       label: "Superficie inférieure à 3 500 km²" },
  { id: "pop1M",            label: "Population supérieure à 1 million" },
  { id: "pop500k",          label: "Population inférieure à 500 000" },
  { id: "sansE",            label: "Ne contient pas la lettre E" },
  { id: "voyelle",          label: "Commence par une voyelle" },
  { id: "sans100villes",    label: "Sans grande ville (top 100)" },
  { id: "moins300Clermont", label: "À moins de 300 km de Clermont-Ferrand" },
  { id: "plus300Clermont",  label: "À plus de 300 km de Clermont-Ferrand"},
  { id: "zoneL",            label: "Faisait partie de la zone Libre en 1941" },
  { id: "zoneO",            label: "Faisait partie de la zone Occupée en 1941"},
  { id: "voteMacron2022",   label: "A voté Macron au second tour des élections présidentielles de 2022 "},
  { id: "voteLepen2022",     label: "A voté Lepen au second tour des élections présidentielles de 2022" },
  { id: "genreMasc",        label: "Est au masculin" },
  { id: "genreFem",         label: "Est au féminin " },
  { id: "motCarafe",        label: "Où l'on utilise le mot Carafe " },
  { id: "motPichet",        label: "Où l'on utilise le mot Pichet " },
  { id: "motCruche",        label: "Où l'on utilise le mot Cruche " },
  { id: "motPotDeau",       label: "Où l'on utilise le mot Pot d'eau " },
  { id: "asterixVisite",    label: "Visité par Asterix lors de ses aventures" },
  { id: "zenith",           label: "Possède une salle de spectacle Zénith" },
  { id: "plusNordVancouver",label: "Est plus au nord que Vancouver" },
  { id: "clubL1L2",         label: "A une équipe en Ligue 1 ou Ligue 2" },
  { id: "reg_ARA", label: "En région Auvergne-Rhône-Alpes" },
  { id: "reg_BFC", label: "En région Bourgogne-Franche-Comté" },
  { id: "reg_BRE", label: "En région Bretagne" },
  { id: "reg_CVL", label: "En région Centre-Val de Loire" },
  { id: "reg_GE",  label: "En région Grand Est" },
  { id: "reg_HDF", label: "En région Hauts-de-France" },
  { id: "reg_IDF", label: "En région Île-de-France" },
  { id: "reg_NOR", label: "En région Normandie" },
  { id: "reg_NAQ", label: "En région Nouvelle-Aquitaine" },
  { id: "reg_OCC", label: "En région Occitanie" },
  { id: "reg_PDL", label: "En région Pays de la Loire" },
  { id: "reg_PAC", label: "En région Provence-Alpes-Côte d'Azur" },
];

const REGION_VERS_ID = {
  "Auvergne-Rhône-Alpes":        "reg_ARA",
  "Bourgogne-Franche-Comté":     "reg_BFC",
  "Bretagne":                    "reg_BRE",
  "Centre-Val de Loire":         "reg_CVL",
  "Grand Est":                   "reg_GE",
  "Hauts-de-France":             "reg_HDF",
  "Île-de-France":               "reg_IDF",
  "Normandie":                   "reg_NOR",
  "Nouvelle-Aquitaine":          "reg_NAQ",
  "Occitanie":                   "reg_OCC",
  "Pays de la Loire":            "reg_PDL",
  "Provence-Alpes-Côte d'Azur":  "reg_PAC",
};

const DEPARTEMENTS = [
  { num:"01", nom:"Ain",                     region:"Auvergne-Rhône-Alpes",        cats:{ fleuve:false, montagne:false, multiple5:false, cotier:false, frontalier:true,  plus4voisins:true,  sup6000km2:false, inf3500km2:false, pop1M:false, pop500k:false, sans100villes:true,  moins300Clermont:true,  plus300Clermont:false, zoneL:false, zoneO:true,  voteMacron2022:true,  voteLepen2022:false, genreMasc:true,  genreFem:false, motCarafe:true,  motPichet:false, motCruche:false, motPotDeau:true,  asterixVisite:false, zenith:false, plusNordVancouver:false, clubL1L2:false } },
  { num:"02", nom:"Aisne",                   region:"Hauts-de-France",             cats:{ fleuve:false, montagne:false, multiple5:false, cotier:false, frontalier:true,  plus4voisins:true,  sup6000km2:true,  inf3500km2:false, pop1M:false, pop500k:false, sans100villes:false, moins300Clermont:false, plus300Clermont:true,  zoneL:false, zoneO:true,  voteMacron2022:false, voteLepen2022:true,  genreMasc:false, genreFem:true,  motCarafe:true,  motPichet:false, motCruche:false, motPotDeau:false, asterixVisite:false, zenith:false, plusNordVancouver:true,  clubL1L2:false } },
  { num:"03", nom:"Allier",                  region:"Auvergne-Rhône-Alpes",        cats:{ fleuve:false, montagne:false, multiple5:false, cotier:false, frontalier:false, plus4voisins:true,  sup6000km2:true,  inf3500km2:false, pop1M:false, pop500k:true,  sans100villes:true,  moins300Clermont:true,  plus300Clermont:false, zoneL:true,  zoneO:false, voteMacron2022:true,  voteLepen2022:false, genreMasc:true,  genreFem:false, motCarafe:false, motPichet:true,  motCruche:false, motPotDeau:false, asterixVisite:false, zenith:false, plusNordVancouver:false, clubL1L2:false } },
  { num:"04", nom:"Alpes-de-Haute-Provence", region:"Provence-Alpes-Côte d'Azur",  cats:{ fleuve:false, montagne:true,  multiple5:false, cotier:false, frontalier:true,  plus4voisins:true,  sup6000km2:true,  inf3500km2:false, pop1M:false, pop500k:true,  sans100villes:true,  moins300Clermont:true,  plus300Clermont:false, zoneL:true,  zoneO:false, voteMacron2022:false, voteLepen2022:true,  genreMasc:false, genreFem:true,  motCarafe:false, motPichet:false, motCruche:false, motPotDeau:true,  asterixVisite:false, zenith:false, plusNordVancouver:false, clubL1L2:false } },
  { num:"05", nom:"Hautes-Alpes",            region:"Provence-Alpes-Côte d'Azur",  cats:{ fleuve:false, montagne:true,  multiple5:true,  cotier:false, frontalier:true,  plus4voisins:true,  sup6000km2:false, inf3500km2:false, pop1M:false, pop500k:true,  sans100villes:true,  moins300Clermont:true,  plus300Clermont:false, zoneL:true,  zoneO:false, voteMacron2022:true,  voteLepen2022:false, genreMasc:false, genreFem:true,  motCarafe:false, motPichet:false, motCruche:false, motPotDeau:true,  asterixVisite:false, zenith:false, plusNordVancouver:false, clubL1L2:false } },
  { num:"06", nom:"Alpes-Maritimes",        region:"Provence-Alpes-Côte d'Azur",  cats:{ fleuve:false, montagne:true,  multiple5:false, cotier:true,  frontalier:true,  plus4voisins:false, sup6000km2:false, inf3500km2:false, pop1M:true,  pop500k:false, sans100villes:false, moins300Clermont:false, plus300Clermont:true,  zoneL:true,  zoneO:false, voteMacron2022:true,  voteLepen2022:false, genreMasc:false, genreFem:true,  motCarafe:true,  motPichet:false, motCruche:false, motPotDeau:false, asterixVisite:true,  zenith:false, plusNordVancouver:false, clubL1L2:true  } },
  { num:"07", nom:"Ardèche",                region:"Auvergne-Rhône-Alpes",        cats:{ fleuve:false, montagne:false, multiple5:false, cotier:false, frontalier:false, plus4voisins:true,  sup6000km2:false, inf3500km2:false, pop1M:false, pop500k:true,  sans100villes:true,  moins300Clermont:true,  plus300Clermont:false, zoneL:true,  zoneO:false, voteMacron2022:true,  voteLepen2022:false, genreMasc:false, genreFem:true,  motCarafe:false, motPichet:false, motCruche:false, motPotDeau:true,  asterixVisite:false, zenith:false, plusNordVancouver:false, clubL1L2:false } },
  { num:"08", nom:"Ardennes",                region:"Grand Est",                   cats:{ fleuve:false, montagne:false, multiple5:false, cotier:false, frontalier:true,  plus4voisins:false, sup6000km2:false, inf3500km2:false, pop1M:false, pop500k:true,  sans100villes:true,  moins300Clermont:false, plus300Clermont:true,  zoneL:false, zoneO:true,  voteMacron2022:false, voteLepen2022:true,  genreMasc:false, genreFem:true,  motCarafe:false, motPichet:false, motCruche:true,  motPotDeau:false, asterixVisite:false, zenith:false, plusNordVancouver:true,  clubL1L2:false } },
  { num:"09", nom:"Ariège",                  region:"Occitanie",                   cats:{ fleuve:false, montagne:false, multiple5:false, cotier:false, frontalier:true,  plus4voisins:false, sup6000km2:false, inf3500km2:false, pop1M:false, pop500k:true,  sans100villes:true,  moins300Clermont:false, plus300Clermont:true,  zoneL:true,  zoneO:false, voteMacron2022:true,  voteLepen2022:false, genreMasc:false, genreFem:true,  motCarafe:true,  motPichet:false, motCruche:false, motPotDeau:false, asterixVisite:false, zenith:false, plusNordVancouver:false, clubL1L2:false } },
  { num:"10", nom:"Aube",                    region:"Grand Est",                   cats:{ fleuve:false, montagne:false, multiple5:true,  cotier:false, frontalier:false, plus4voisins:true,  sup6000km2:true,  inf3500km2:false, pop1M:false, pop500k:true,  sans100villes:false, moins300Clermont:true,  plus300Clermont:false, zoneL:false, zoneO:true,  voteMacron2022:false, voteLepen2022:true,  genreMasc:false, genreFem:true,  motCarafe:false, motPichet:false, motCruche:true,  motPotDeau:false, asterixVisite:false, zenith:false, plusNordVancouver:false, clubL1L2:true  } },
  { num:"11", nom:"Aude",                    region:"Occitanie",                   cats:{ fleuve:false, montagne:false, multiple5:false, cotier:true,  frontalier:false, plus4voisins:true,  sup6000km2:true,  inf3500km2:false, pop1M:false, pop500k:true,  sans100villes:true,  moins300Clermont:true,  plus300Clermont:false, zoneL:true,  zoneO:false, voteMacron2022:false, voteLepen2022:true,  genreMasc:false, genreFem:true,  motCarafe:true,  motPichet:false, motCruche:false, motPotDeau:false, asterixVisite:false, zenith:false, plusNordVancouver:false, clubL1L2:false } },
  { num:"12", nom:"Aveyron",                 region:"Occitanie",                   cats:{ fleuve:false, montagne:false, multiple5:false, cotier:false, frontalier:false, plus4voisins:true,  sup6000km2:true,  inf3500km2:false, pop1M:false, pop500k:true,  sans100villes:true,  moins300Clermont:true,  plus300Clermont:false, zoneL:true,  zoneO:false, voteMacron2022:true,  voteLepen2022:false, genreMasc:true,  genreFem:false, motCarafe:true,  motPichet:false, motCruche:false, motPotDeau:false, asterixVisite:false, zenith:false, plusNordVancouver:false, clubL1L2:true  } },
  { num:"13", nom:"Bouches-du-Rhône",       region:"Provence-Alpes-Côte d'Azur",  cats:{ fleuve:true,  montagne:false, multiple5:false, cotier:true,  frontalier:false, plus4voisins:false, sup6000km2:false, inf3500km2:false, pop1M:true,  pop500k:false, sans100villes:false, moins300Clermont:false, plus300Clermont:true,  zoneL:true,  zoneO:false, voteMacron2022:true,  voteLepen2022:false, genreMasc:false, genreFem:true,  motCarafe:false, motPichet:false, motCruche:false, motPotDeau:true,  asterixVisite:true,  zenith:false, plusNordVancouver:false, clubL1L2:true  } },
  { num:"14", nom:"Calvados",                region:"Normandie",                   cats:{ fleuve:false, montagne:false, multiple5:false, cotier:true,  frontalier:false, plus4voisins:false, sup6000km2:false, inf3500km2:false, pop1M:false, pop500k:false, sans100villes:false, moins300Clermont:false, plus300Clermont:true,  zoneL:false, zoneO:true,  voteMacron2022:true,  voteLepen2022:false, genreMasc:true,  genreFem:false, motCarafe:false, motPichet:true,  motCruche:false, motPotDeau:false, asterixVisite:false, zenith:true,  plusNordVancouver:true,  clubL1L2:true  } },
  { num:"15", nom:"Cantal",                  region:"Auvergne-Rhône-Alpes",        cats:{ fleuve:false, montagne:true,  multiple5:true,  cotier:false, frontalier:false, plus4voisins:false, sup6000km2:false, inf3500km2:false, pop1M:false, pop500k:true,  sans100villes:true,  moins300Clermont:true,  plus300Clermont:false, zoneL:true,  zoneO:false, voteMacron2022:true,  voteLepen2022:false, genreMasc:true,  genreFem:false, motCarafe:false, motPichet:true,  motCruche:false, motPotDeau:false, asterixVisite:false, zenith:false, plusNordVancouver:false, clubL1L2:false } },
  { num:"16", nom:"Charente",                region:"Nouvelle-Aquitaine",          cats:{ fleuve:true,  montagne:false, multiple5:false, cotier:false, frontalier:false, plus4voisins:true,  sup6000km2:false, inf3500km2:false, pop1M:false, pop500k:true,  sans100villes:true,  moins300Clermont:true,  plus300Clermont:false, zoneL:false, zoneO:true,  voteMacron2022:true,  voteLepen2022:false, genreMasc:false, genreFem:true,  motCarafe:false, motPichet:true,  motCruche:false, motPotDeau:false, asterixVisite:false, zenith:false, plusNordVancouver:false, clubL1L2:false } },
  { num:"17", nom:"Charente-Maritime",      region:"Nouvelle-Aquitaine",          cats:{ fleuve:true,  montagne:false, multiple5:false, cotier:true,  frontalier:false, plus4voisins:true,  sup6000km2:true,  inf3500km2:false, pop1M:false, pop500k:false, sans100villes:false, moins300Clermont:false, plus300Clermont:true,  zoneL:false, zoneO:true,  voteMacron2022:true,  voteLepen2022:false, genreMasc:false, genreFem:true,  motCarafe:false, motPichet:true,  motCruche:false, motPotDeau:false, asterixVisite:false, zenith:false, plusNordVancouver:false, clubL1L2:false } },
  { num:"18", nom:"Cher",                    region:"Centre-Val de Loire",         cats:{ fleuve:false, montagne:false, multiple5:false, cotier:false, frontalier:false, plus4voisins:true,  sup6000km2:true,  inf3500km2:false, pop1M:false, pop500k:true,  sans100villes:false, moins300Clermont:true,  plus300Clermont:false, zoneL:false, zoneO:true,  voteMacron2022:true,  voteLepen2022:false, genreMasc:true,  genreFem:false, motCarafe:false, motPichet:true,  motCruche:false, motPotDeau:false, asterixVisite:false, zenith:false, plusNordVancouver:false, clubL1L2:false } },
  { num:"19", nom:"Corrèze",                 region:"Nouvelle-Aquitaine",          cats:{ fleuve:false, montagne:false, multiple5:false, cotier:false, frontalier:false, plus4voisins:true,  sup6000km2:false, inf3500km2:false, pop1M:false, pop500k:true,  sans100villes:true,  moins300Clermont:true,  plus300Clermont:false, zoneL:true,  zoneO:false, voteMacron2022:true,  voteLepen2022:false, genreMasc:false, genreFem:true,  motCarafe:false, motPichet:true,  motCruche:false, motPotDeau:false, asterixVisite:false, zenith:false, plusNordVancouver:false, clubL1L2:false } },
  { num:"21", nom:"Côte-d'Or",              region:"Bourgogne-Franche-Comté",     cats:{ fleuve:false, montagne:false, multiple5:false, cotier:false, frontalier:false, plus4voisins:true,  sup6000km2:true,  inf3500km2:false, pop1M:false, pop500k:false, sans100villes:false, moins300Clermont:true,  plus300Clermont:false, zoneL:false, zoneO:true,  voteMacron2022:true,  voteLepen2022:false, genreMasc:false, genreFem:true,  motCarafe:false, motPichet:false, motCruche:false, motPotDeau:true,  asterixVisite:false, zenith:true,  plusNordVancouver:false, clubL1L2:false } },
  { num:"22", nom:"Côtes-d'Armor",          region:"Bretagne",                    cats:{ fleuve:false, montagne:false, multiple5:false, cotier:true,  frontalier:false, plus4voisins:false, sup6000km2:true,  inf3500km2:false, pop1M:false, pop500k:false, sans100villes:false, moins300Clermont:false, plus300Clermont:true,  zoneL:false, zoneO:true,  voteMacron2022:true,  voteLepen2022:false, genreMasc:false, genreFem:true,  motCarafe:false, motPichet:true,  motCruche:false, motPotDeau:false, asterixVisite:true,  zenith:false, plusNordVancouver:false, clubL1L2:true  } },
  { num:"23", nom:"Creuse",                  region:"Nouvelle-Aquitaine",          cats:{ fleuve:false, montagne:false, multiple5:false, cotier:false, frontalier:false, plus4voisins:true,  sup6000km2:false, inf3500km2:false, pop1M:false, pop500k:true,  sans100villes:true,  moins300Clermont:true,  plus300Clermont:false, zoneL:true,  zoneO:false, voteMacron2022:true,  voteLepen2022:false, genreMasc:false, genreFem:true,  motCarafe:false, motPichet:true,  motCruche:false, motPotDeau:false, asterixVisite:false, zenith:false, plusNordVancouver:false, clubL1L2:false } },
  { num:"24", nom:"Dordogne",                region:"Nouvelle-Aquitaine",          cats:{ fleuve:true,  montagne:false, multiple5:false, cotier:false, frontalier:false, plus4voisins:true,  sup6000km2:true,  inf3500km2:false, pop1M:false, pop500k:true,  sans100villes:true,  moins300Clermont:true,  plus300Clermont:false, zoneL:true,  zoneO:false, voteMacron2022:true,  voteLepen2022:false, genreMasc:false, genreFem:true,  motCarafe:false, motPichet:true,  motCruche:false, motPotDeau:false, asterixVisite:false, zenith:false, plusNordVancouver:false, clubL1L2:false } },
  { num:"25", nom:"Doubs",                   region:"Bourgogne-Franche-Comté",     cats:{ fleuve:false, montagne:false, multiple5:true,  cotier:false, frontalier:true,  plus4voisins:false, sup6000km2:false, inf3500km2:false, pop1M:false, pop500k:false, sans100villes:false, moins300Clermont:false, plus300Clermont:true,  zoneL:false, zoneO:true,  voteMacron2022:true,  voteLepen2022:false, genreMasc:true,  genreFem:false, motCarafe:false, motPichet:false, motCruche:true,  motPotDeau:false, asterixVisite:false, zenith:false, plusNordVancouver:false, clubL1L2:false } },
  { num:"26", nom:"Drôme",                   region:"Auvergne-Rhône-Alpes",        cats:{ fleuve:false, montagne:false, multiple5:false, cotier:false, frontalier:false, plus4voisins:true,  sup6000km2:true,  inf3500km2:false, pop1M:false, pop500k:false, sans100villes:false, moins300Clermont:true,  plus300Clermont:false, zoneL:true,  zoneO:false, voteMacron2022:true,  voteLepen2022:false, genreMasc:false, genreFem:true,  motCarafe:false, motPichet:false, motCruche:false, motPotDeau:true,  asterixVisite:false, zenith:false, plusNordVancouver:false, clubL1L2:false } },
  { num:"27", nom:"Eure",                    region:"Normandie",                   cats:{ fleuve:false, montagne:false, multiple5:false, cotier:false, frontalier:false, plus4voisins:true,  sup6000km2:true,  inf3500km2:false, pop1M:false, pop500k:false, sans100villes:false, moins300Clermont:false, plus300Clermont:true,  zoneL:false, zoneO:true,  voteMacron2022:true,  voteLepen2022:false, genreMasc:false, genreFem:true,  motCarafe:true,  motPichet:false, motCruche:true,  motPotDeau:false, asterixVisite:false, zenith:false, plusNordVancouver:false, clubL1L2:false } },
  { num:"28", nom:"Eure-et-Loir",            region:"Centre-Val de Loire",         cats:{ fleuve:false, montagne:false, multiple5:false, cotier:false, frontalier:false, plus4voisins:true,  sup6000km2:false, inf3500km2:false, pop1M:false, pop500k:true,  sans100villes:true,  moins300Clermont:false, plus300Clermont:true,  zoneL:false, zoneO:true,  voteMacron2022:true,  voteLepen2022:false, genreMasc:true,  genreFem:false, motCarafe:false, motPichet:true,  motCruche:false, motPotDeau:false, asterixVisite:false, zenith:false, plusNordVancouver:false, clubL1L2:false } },
  { num:"29", nom:"Finistère",               region:"Bretagne",                    cats:{ fleuve:false, montagne:false, multiple5:false, cotier:true,  frontalier:false, plus4voisins:false, sup6000km2:true,  inf3500km2:false, pop1M:false, pop500k:false, sans100villes:false, moins300Clermont:false, plus300Clermont:true,  zoneL:false, zoneO:true,  voteMacron2022:true,  voteLepen2022:false, genreMasc:true,  genreFem:false, motCarafe:false, motPichet:true,  motCruche:false, motPotDeau:false, asterixVisite:false, zenith:false, plusNordVancouver:false, clubL1L2:true  } },
  { num:"30", nom:"Gard",                    region:"Occitanie",                   cats:{ fleuve:false, montagne:false, multiple5:true,  cotier:true,  frontalier:false, plus4voisins:true,  sup6000km2:false, inf3500km2:false, pop1M:false, pop500k:false, sans100villes:false, moins300Clermont:true,  plus300Clermont:false, zoneL:true,  zoneO:false, voteMacron2022:false, voteLepen2022:true,  genreMasc:true,  genreFem:false, motCarafe:true,  motPichet:false, motCruche:false, motPotDeau:false, asterixVisite:false, zenith:false, plusNordVancouver:false, clubL1L2:false } },
  { num:"31", nom:"Haute-Garonne",           region:"Occitanie",                   cats:{ fleuve:true,  montagne:false, multiple5:false, cotier:false, frontalier:true,  plus4voisins:true,  sup6000km2:true,  inf3500km2:false, pop1M:true,  pop500k:false, sans100villes:false, moins300Clermont:true,  plus300Clermont:false, zoneL:true,  zoneO:false, voteMacron2022:true,  voteLepen2022:false, genreMasc:false, genreFem:true,  motCarafe:true,  motPichet:false, motCruche:false, motPotDeau:false, asterixVisite:true,  zenith:true,  plusNordVancouver:false, clubL1L2:true  } },
  { num:"32", nom:"Gers",                    region:"Occitanie",                   cats:{ fleuve:false, montagne:false, multiple5:false, cotier:false, frontalier:false, plus4voisins:true,  sup6000km2:true,  inf3500km2:false, pop1M:false, pop500k:true,  sans100villes:true,  moins300Clermont:false, plus300Clermont:true,  zoneL:true,  zoneO:false, voteMacron2022:true,  voteLepen2022:false, genreMasc:true,  genreFem:false, motCarafe:false, motPichet:true,  motCruche:false, motPotDeau:false, asterixVisite:false, zenith:false, plusNordVancouver:false, clubL1L2:false } },
  { num:"33", nom:"Gironde",                 region:"Nouvelle-Aquitaine",          cats:{ fleuve:true,  montagne:false, multiple5:false, cotier:true,  frontalier:false, plus4voisins:true,  sup6000km2:true,  inf3500km2:false, pop1M:true,  pop500k:false, sans100villes:false, moins300Clermont:false, plus300Clermont:true,  zoneL:false, zoneO:true,  voteMacron2022:true,  voteLepen2022:false, genreMasc:false, genreFem:true,  motCarafe:false, motPichet:true,  motCruche:false, motPotDeau:false, asterixVisite:true,  zenith:false, plusNordVancouver:false, clubL1L2:false } },
  { num:"34", nom:"Hérault",                 region:"Occitanie",                   cats:{ fleuve:true,  montagne:false, multiple5:false, cotier:true,  frontalier:false, plus4voisins:true,  sup6000km2:true,  inf3500km2:false, pop1M:true,  pop500k:false, sans100villes:false, moins300Clermont:true,  plus300Clermont:false, zoneL:true,  zoneO:false, voteMacron2022:false, voteLepen2022:true,  genreMasc:true,  genreFem:false, motCarafe:true,  motPichet:false, motCruche:false, motPotDeau:false, asterixVisite:false, zenith:true,  plusNordVancouver:false, clubL1L2:true  } },
  { num:"35", nom:"Ille-et-Vilaine",        region:"Bretagne",                    cats:{ fleuve:false, montagne:false, multiple5:true,  cotier:true,  frontalier:false, plus4voisins:false, sup6000km2:true,  inf3500km2:false, pop1M:true,  pop500k:false, sans100villes:false, moins300Clermont:false, plus300Clermont:true,  zoneL:false, zoneO:true,  voteMacron2022:true,  voteLepen2022:false, genreMasc:false, genreFem:true,  motCarafe:false, motPichet:true,  motCruche:false, motPotDeau:false, asterixVisite:true,  zenith:false, plusNordVancouver:false, clubL1L2:true  } },
  { num:"36", nom:"Indre",                   region:"Centre-Val de Loire",         cats:{ fleuve:false, montagne:false, multiple5:false, cotier:false, frontalier:false, plus4voisins:true,  sup6000km2:true,  inf3500km2:false, pop1M:false, pop500k:true,  sans100villes:true,  moins300Clermont:true,  plus300Clermont:false, zoneL:true,  zoneO:false, voteMacron2022:true,  voteLepen2022:false, genreMasc:false, genreFem:true,  motCarafe:false, motPichet:true,  motCruche:false, motPotDeau:false, asterixVisite:false, zenith:false, plusNordVancouver:false, clubL1L2:false } },
  { num:"37", nom:"Indre-et-Loire",          region:"Centre-Val de Loire",         cats:{ fleuve:true,  montagne:false, multiple5:false, cotier:false, frontalier:false, plus4voisins:true,  sup6000km2:true,  inf3500km2:false, pop1M:false, pop500k:false, sans100villes:false, moins300Clermont:true,  plus300Clermont:false, zoneL:false, zoneO:true,  voteMacron2022:true,  voteLepen2022:false, genreMasc:false, genreFem:true,  motCarafe:false, motPichet:true,  motCruche:false, motPotDeau:false, asterixVisite:false, zenith:false, plusNordVancouver:false, clubL1L2:false } },
  { num:"38", nom:"Isère",                   region:"Auvergne-Rhône-Alpes",        cats:{ fleuve:false, montagne:false, multiple5:false, cotier:false, frontalier:false, plus4voisins:true,  sup6000km2:true,  inf3500km2:false, pop1M:true,  pop500k:false, sans100villes:false, moins300Clermont:true,  plus300Clermont:false, zoneL:true,  zoneO:false, voteMacron2022:true,  voteLepen2022:false, genreMasc:false, genreFem:true,  motCarafe:false, motPichet:false, motCruche:false, motPotDeau:true,  asterixVisite:false, zenith:false, plusNordVancouver:false, clubL1L2:true  } },
  { num:"39", nom:"Jura",                    region:"Bourgogne-Franche-Comté",     cats:{ fleuve:false, montagne:true,  multiple5:false, cotier:false, frontalier:true,  plus4voisins:true,  sup6000km2:false, inf3500km2:false, pop1M:false, pop500k:true,  sans100villes:true,  moins300Clermont:true,  plus300Clermont:false, zoneL:false, zoneO:true,  voteMacron2022:true,  voteLepen2022:false, genreMasc:true,  genreFem:false, motCarafe:false, motPichet:false, motCruche:false, motPotDeau:true,  asterixVisite:false, zenith:false, plusNordVancouver:false, clubL1L2:false } },
  { num:"40", nom:"Landes",                  region:"Nouvelle-Aquitaine",          cats:{ fleuve:false, montagne:false, multiple5:true,  cotier:true,  frontalier:false, plus4voisins:false, sup6000km2:true,  inf3500km2:false, pop1M:false, pop500k:true,  sans100villes:true,  moins300Clermont:false, plus300Clermont:true,  zoneL:false, zoneO:true,  voteMacron2022:true,  voteLepen2022:false, genreMasc:false, genreFem:true,  motCarafe:false, motPichet:true,  motCruche:false, motPotDeau:false, asterixVisite:false, zenith:false, plusNordVancouver:false, clubL1L2:false } },
  { num:"41", nom:"Loir-et-Cher",            region:"Centre-Val de Loire",         cats:{ fleuve:true,  montagne:false, multiple5:false, cotier:false, frontalier:false, plus4voisins:true,  sup6000km2:true,  inf3500km2:false, pop1M:false, pop500k:true,  sans100villes:true,  moins300Clermont:true,  plus300Clermont:false, zoneL:false, zoneO:true,  voteMacron2022:true,  voteLepen2022:false, genreMasc:true,  genreFem:false, motCarafe:false, motPichet:true,  motCruche:false, motPotDeau:false, asterixVisite:false, zenith:false, plusNordVancouver:false, clubL1L2:false } },
  { num:"42", nom:"Loire",                   region:"Auvergne-Rhône-Alpes",        cats:{ fleuve:true,  montagne:false, multiple5:false, cotier:false, frontalier:false, plus4voisins:true,  sup6000km2:false, inf3500km2:false, pop1M:false, pop500k:false, sans100villes:false, moins300Clermont:true,  plus300Clermont:false, zoneL:true,  zoneO:false, voteMacron2022:true,  voteLepen2022:false, genreMasc:false, genreFem:true,  motCarafe:false, motPichet:false, motCruche:false, motPotDeau:true,  asterixVisite:false, zenith:true,  plusNordVancouver:false, clubL1L2:true  } },
  { num:"43", nom:"Haute-Loire",             region:"Auvergne-Rhône-Alpes",        cats:{ fleuve:true,  montagne:false, multiple5:false, cotier:false, frontalier:false, plus4voisins:true,  sup6000km2:false, inf3500km2:false, pop1M:false, pop500k:true,  sans100villes:true,  moins300Clermont:true,  plus300Clermont:false, zoneL:true,  zoneO:false, voteMacron2022:true,  voteLepen2022:false, genreMasc:false, genreFem:true,  motCarafe:false, motPichet:true,  motCruche:false, motPotDeau:false, asterixVisite:false, zenith:false, plusNordVancouver:false, clubL1L2:false } },
  { num:"44", nom:"Loire-Atlantique",        region:"Pays de la Loire",            cats:{ fleuve:true,  montagne:false, multiple5:false, cotier:true,  frontalier:false, plus4voisins:false, sup6000km2:true,  inf3500km2:false, pop1M:true,  pop500k:false, sans100villes:false, moins300Clermont:false, plus300Clermont:true,  zoneL:false, zoneO:true,  voteMacron2022:true,  voteLepen2022:false, genreMasc:false, genreFem:true,  motCarafe:false, motPichet:true,  motCruche:false, motPotDeau:false, asterixVisite:false, zenith:true,  plusNordVancouver:false, clubL1L2:true  } },
  { num:"45", nom:"Loiret",                  region:"Centre-Val de Loire",         cats:{ fleuve:false, montagne:false, multiple5:true,  cotier:false, frontalier:false, plus4voisins:true,  sup6000km2:true,  inf3500km2:false, pop1M:false, pop500k:false, sans100villes:false, moins300Clermont:true,  plus300Clermont:false, zoneL:false, zoneO:true,  voteMacron2022:true,  voteLepen2022:false, genreMasc:true,  genreFem:false, motCarafe:false, motPichet:true,  motCruche:false, motPotDeau:false, asterixVisite:false, zenith:false, plusNordVancouver:false, clubL1L2:false } },
  { num:"46", nom:"Lot",                     region:"Occitanie",                   cats:{ fleuve:false, montagne:false, multiple5:false, cotier:false, frontalier:false, plus4voisins:true,  sup6000km2:false, inf3500km2:false, pop1M:false, pop500k:true,  sans100villes:true,  moins300Clermont:true,  plus300Clermont:false, zoneL:true,  zoneO:false, voteMacron2022:true,  voteLepen2022:false, genreMasc:true,  genreFem:false, motCarafe:true,  motPichet:false, motCruche:false, motPotDeau:false, asterixVisite:false, zenith:false, plusNordVancouver:false, clubL1L2:false } },
  { num:"47", nom:"Lot-et-Garonne",          region:"Nouvelle-Aquitaine",          cats:{ fleuve:true,  montagne:false, multiple5:false, cotier:false, frontalier:false, plus4voisins:true,  sup6000km2:false, inf3500km2:false, pop1M:false, pop500k:true,  sans100villes:true,  moins300Clermont:true,  plus300Clermont:false, zoneL:true,  zoneO:false, voteMacron2022:true,  voteLepen2022:false, genreMasc:true,  genreFem:false, motCarafe:false, motPichet:true,  motCruche:false, motPotDeau:false, asterixVisite:true,  zenith:false, plusNordVancouver:false, clubL1L2:false } },
  { num:"48", nom:"Lozère",                  region:"Occitanie",                   cats:{ fleuve:false, montagne:false, multiple5:false, cotier:false, frontalier:false, plus4voisins:true,  sup6000km2:false, inf3500km2:false, pop1M:false, pop500k:true,  sans100villes:true,  moins300Clermont:true,  plus300Clermont:false, zoneL:true,  zoneO:false, voteMacron2022:true,  voteLepen2022:false, genreMasc:false, genreFem:true,  motCarafe:true,  motPichet:false, motCruche:false, motPotDeau:false, asterixVisite:false, zenith:false, plusNordVancouver:false, clubL1L2:false } },
  { num:"49", nom:"Maine-et-Loire",          region:"Pays de la Loire",            cats:{ fleuve:true,  montagne:false, multiple5:false, cotier:false, frontalier:false, plus4voisins:true,  sup6000km2:true,  inf3500km2:false, pop1M:false, pop500k:false, sans100villes:false, moins300Clermont:false, plus300Clermont:true,  zoneL:false, zoneO:true,  voteMacron2022:true,  voteLepen2022:false, genreMasc:true,  genreFem:false, motCarafe:false, motPichet:true,  motCruche:false, motPotDeau:false, asterixVisite:false, zenith:false, plusNordVancouver:false, clubL1L2:true  } },
  { num:"50", nom:"Manche",                  region:"Normandie",                   cats:{ fleuve:false, montagne:false, multiple5:true,  cotier:true,  frontalier:false, plus4voisins:false, sup6000km2:false, inf3500km2:false, pop1M:false, pop500k:true,  sans100villes:false, moins300Clermont:false, plus300Clermont:true,  zoneL:false, zoneO:true,  voteMacron2022:true,  voteLepen2022:false, genreMasc:false, genreFem:true,  motCarafe:false, motPichet:true,  motCruche:false, motPotDeau:false, asterixVisite:false, zenith:false, plusNordVancouver:true,  clubL1L2:false } },
  { num:"51", nom:"Marne",                   region:"Grand Est",                   cats:{ fleuve:false, montagne:false, multiple5:false, cotier:false, frontalier:false, plus4voisins:true,  sup6000km2:true,  inf3500km2:false, pop1M:false, pop500k:false, sans100villes:false, moins300Clermont:false, plus300Clermont:true,  zoneL:false, zoneO:true,  voteMacron2022:true,  voteLepen2022:false, genreMasc:false, genreFem:true,  motCarafe:false, motPichet:false, motCruche:true,  motPotDeau:false, asterixVisite:false, zenith:false, plusNordVancouver:true,  clubL1L2:true  } },
  { num:"52", nom:"Haute-Marne",             region:"Grand Est",                   cats:{ fleuve:false, montagne:false, multiple5:false, cotier:false, frontalier:false, plus4voisins:true,  sup6000km2:true,  inf3500km2:false, pop1M:false, pop500k:true,  sans100villes:true,  moins300Clermont:true,  plus300Clermont:false, zoneL:false, zoneO:true,  voteMacron2022:false, voteLepen2022:true,  genreMasc:false, genreFem:true,  motCarafe:false, motPichet:false, motCruche:true,  motPotDeau:false, asterixVisite:false, zenith:false, plusNordVancouver:false, clubL1L2:false } },
  { num:"53", nom:"Mayenne",                 region:"Pays de la Loire",            cats:{ fleuve:false, montagne:false, multiple5:false, cotier:false, frontalier:false, plus4voisins:true,  sup6000km2:false, inf3500km2:false, pop1M:false, pop500k:true,  sans100villes:true,  moins300Clermont:false, plus300Clermont:true,  zoneL:false, zoneO:true,  voteMacron2022:true,  voteLepen2022:false, genreMasc:false, genreFem:true,  motCarafe:false, motPichet:true,  motCruche:false, motPotDeau:false, asterixVisite:false, zenith:false, plusNordVancouver:false, clubL1L2:true  } },
  { num:"54", nom:"Meurthe-et-Moselle",     region:"Grand Est",                   cats:{ fleuve:false, montagne:false, multiple5:false, cotier:false, frontalier:true,  plus4voisins:true,  sup6000km2:false, inf3500km2:false, pop1M:false, pop500k:false, sans100villes:false, moins300Clermont:false, plus300Clermont:true,  zoneL:false, zoneO:true,  voteMacron2022:true,  voteLepen2022:false, genreMasc:false, genreFem:true,  motCarafe:false, motPichet:false, motCruche:true,  motPotDeau:false, asterixVisite:false, zenith:true,  plusNordVancouver:true,  clubL1L2:true  } },
  { num:"55", nom:"Meuse",                   region:"Grand Est",                   cats:{ fleuve:true,  montagne:false, multiple5:true,  cotier:false, frontalier:true,  plus4voisins:true,  sup6000km2:true,  inf3500km2:false, pop1M:false, pop500k:true,  sans100villes:true,  moins300Clermont:false, plus300Clermont:true,  zoneL:false, zoneO:true,  voteMacron2022:false, voteLepen2022:true,  genreMasc:false, genreFem:true,  motCarafe:false, motPichet:false, motCruche:true,  motPotDeau:false, asterixVisite:false, zenith:false, plusNordVancouver:true,  clubL1L2:false } },
  { num:"56", nom:"Morbihan",                region:"Bretagne",                    cats:{ fleuve:false, montagne:false, multiple5:false, cotier:true,  frontalier:false, plus4voisins:false, sup6000km2:true,  inf3500km2:false, pop1M:false, pop500k:false, sans100villes:false, moins300Clermont:false, plus300Clermont:true,  zoneL:false, zoneO:true,  voteMacron2022:true,  voteLepen2022:false, genreMasc:true,  genreFem:false, motCarafe:false, motPichet:true,  motCruche:false, motPotDeau:false, asterixVisite:true,  zenith:false, plusNordVancouver:false, clubL1L2:true  } },
  { num:"57", nom:"Moselle",                 region:"Grand Est",                   cats:{ fleuve:false, montagne:false, multiple5:false, cotier:false, frontalier:true,  plus4voisins:false, sup6000km2:true,  inf3500km2:false, pop1M:true,  pop500k:false, sans100villes:false, moins300Clermont:false, plus300Clermont:true,  zoneL:false, zoneO:true,  voteMacron2022:true,  voteLepen2022:false, genreMasc:false, genreFem:true,  motCarafe:false, motPichet:false, motCruche:true,  motPotDeau:false, asterixVisite:false, zenith:false, plusNordVancouver:true,  clubL1L2:true  } },
  { num:"58", nom:"Nièvre",                  region:"Bourgogne-Franche-Comté",     cats:{ fleuve:false, montagne:false, multiple5:false, cotier:false, frontalier:false, plus4voisins:true,  sup6000km2:true,  inf3500km2:false, pop1M:false, pop500k:true,  sans100villes:true,  moins300Clermont:true,  plus300Clermont:false, zoneL:false, zoneO:true,  voteMacron2022:true,  voteLepen2022:false, genreMasc:false, genreFem:true,  motCarafe:false, motPichet:true,  motCruche:false, motPotDeau:false, asterixVisite:false, zenith:false, plusNordVancouver:false, clubL1L2:false } },
  { num:"59", nom:"Nord",                    region:"Hauts-de-France",             cats:{ fleuve:false, montagne:false, multiple5:false, cotier:true,  frontalier:true,  plus4voisins:false, sup6000km2:false, inf3500km2:false, pop1M:true,  pop500k:false, sans100villes:false, moins300Clermont:false, plus300Clermont:true,  zoneL:false, zoneO:true,  voteMacron2022:false, voteLepen2022:true,  genreMasc:true,  genreFem:false, motCarafe:true,  motPichet:true,  motCruche:false, motPotDeau:false, asterixVisite:false, zenith:true,  plusNordVancouver:true,  clubL1L2:true  } },
  { num:"60", nom:"Oise",                    region:"Hauts-de-France",             cats:{ fleuve:false, montagne:false, multiple5:true,  cotier:false, frontalier:false, plus4voisins:true,  sup6000km2:false, inf3500km2:false, pop1M:false, pop500k:false, sans100villes:false, moins300Clermont:false, plus300Clermont:true,  zoneL:false, zoneO:true,  voteMacron2022:true,  voteLepen2022:false, genreMasc:false, genreFem:true,  motCarafe:true,  motPichet:false, motCruche:false, motPotDeau:false, asterixVisite:false, zenith:false, plusNordVancouver:true,  clubL1L2:false } },
  { num:"61", nom:"Orne",                    region:"Normandie",                   cats:{ fleuve:true,  montagne:false, multiple5:false, cotier:false, frontalier:false, plus4voisins:true,  sup6000km2:true,  inf3500km2:false, pop1M:false, pop500k:true,  sans100villes:true,  moins300Clermont:false, plus300Clermont:true,  zoneL:false, zoneO:true,  voteMacron2022:true,  voteLepen2022:false, genreMasc:false, genreFem:true,  motCarafe:false, motPichet:true,  motCruche:false, motPotDeau:false, asterixVisite:false, zenith:false, plusNordVancouver:false, clubL1L2:false } },
  { num:"62", nom:"Pas-de-Calais",          region:"Hauts-de-France",             cats:{ fleuve:false, montagne:false, multiple5:false, cotier:true,  frontalier:false, plus4voisins:false, sup6000km2:true,  inf3500km2:false, pop1M:true,  pop500k:false, sans100villes:false, moins300Clermont:false, plus300Clermont:true,  zoneL:false, zoneO:true,  voteMacron2022:false, voteLepen2022:true,  genreMasc:true,  genreFem:false, motCarafe:true,  motPichet:true,  motCruche:false, motPotDeau:false, asterixVisite:true,  zenith:false, plusNordVancouver:true,  clubL1L2:true  } },
  { num:"63", nom:"Puy-de-Dôme",            region:"Auvergne-Rhône-Alpes",        cats:{ fleuve:false, montagne:true,  multiple5:false, cotier:false, frontalier:false, plus4voisins:true,  sup6000km2:true,  inf3500km2:false, pop1M:false, pop500k:false, sans100villes:false, moins300Clermont:true,  plus300Clermont:false, zoneL:true,  zoneO:false, voteMacron2022:true,  voteLepen2022:false, genreMasc:true,  genreFem:false, motCarafe:false, motPichet:true,  motCruche:false, motPotDeau:false, asterixVisite:true,  zenith:true,  plusNordVancouver:false, clubL1L2:true  } },
  { num:"64", nom:"Pyrénées-Atlantiques",   region:"Nouvelle-Aquitaine",          cats:{ fleuve:false, montagne:true,  multiple5:false, cotier:true,  frontalier:true,  plus4voisins:false, sup6000km2:true,  inf3500km2:false, pop1M:false, pop500k:false, sans100villes:false, moins300Clermont:false, plus300Clermont:true,  zoneL:true,  zoneO:false, voteMacron2022:true,  voteLepen2022:false, genreMasc:false, genreFem:true,  motCarafe:false, motPichet:true,  motCruche:false, motPotDeau:false, asterixVisite:false, zenith:true,  plusNordVancouver:false, clubL1L2:true  } },
  { num:"65", nom:"Hautes-Pyrénées",        region:"Occitanie",                   cats:{ fleuve:false, montagne:true,  multiple5:true,  cotier:false, frontalier:true,  plus4voisins:false, sup6000km2:false, inf3500km2:false, pop1M:false, pop500k:true,  sans100villes:true,  moins300Clermont:false, plus300Clermont:true,  zoneL:true,  zoneO:false, voteMacron2022:true,  voteLepen2022:false, genreMasc:false, genreFem:true,  motCarafe:false, motPichet:true,  motCruche:false, motPotDeau:false, asterixVisite:false, zenith:false, plusNordVancouver:false, clubL1L2:false } },
  { num:"66", nom:"Pyrénées-Orientales",    region:"Occitanie",                   cats:{ fleuve:false, montagne:true,  multiple5:false, cotier:true,  frontalier:true,  plus4voisins:false, sup6000km2:false, inf3500km2:false, pop1M:false, pop500k:true,  sans100villes:false, moins300Clermont:false, plus300Clermont:true,  zoneL:true,  zoneO:false, voteMacron2022:false, voteLepen2022:true,  genreMasc:false, genreFem:true,  motCarafe:true,  motPichet:false, motCruche:false, motPotDeau:false, asterixVisite:false, zenith:false, plusNordVancouver:false, clubL1L2:false } },
  { num:"67", nom:"Bas-Rhin",                region:"Grand Est",                   cats:{ fleuve:true,  montagne:false, multiple5:false, cotier:false, frontalier:true,  plus4voisins:false, sup6000km2:false, inf3500km2:false, pop1M:true,  pop500k:false, sans100villes:false, moins300Clermont:false, plus300Clermont:true,  zoneL:false, zoneO:true,  voteMacron2022:true,  voteLepen2022:false, genreMasc:true,  genreFem:false, motCarafe:false, motPichet:false, motCruche:true,  motPotDeau:false, asterixVisite:false, zenith:true,  plusNordVancouver:false, clubL1L2:true  } },
  { num:"68", nom:"Haut-Rhin",               region:"Grand Est",                   cats:{ fleuve:true,  montagne:false, multiple5:false, cotier:false, frontalier:true,  plus4voisins:false, sup6000km2:false, inf3500km2:false, pop1M:false, pop500k:false, sans100villes:false, moins300Clermont:false, plus300Clermont:true,  zoneL:false, zoneO:true,  voteMacron2022:true,  voteLepen2022:false, genreMasc:true,  genreFem:false, motCarafe:false, motPichet:false, motCruche:true,  motPotDeau:false, asterixVisite:false, zenith:false, plusNordVancouver:false, clubL1L2:false } },
  { num:"69", nom:"Rhône",                   region:"Auvergne-Rhône-Alpes",        cats:{ fleuve:true,  montagne:false, multiple5:false, cotier:false, frontalier:false, plus4voisins:true,  sup6000km2:false, inf3500km2:true,  pop1M:true,  pop500k:false, sans100villes:false, moins300Clermont:true,  plus300Clermont:false, zoneL:true,  zoneO:false, voteMacron2022:true,  voteLepen2022:false, genreMasc:true,  genreFem:false, motCarafe:false, motPichet:false, motCruche:false, motPotDeau:true,  asterixVisite:true,  zenith:false, plusNordVancouver:false, clubL1L2:true  } },
  { num:"70", nom:"Haute-Saône",             region:"Bourgogne-Franche-Comté",     cats:{ fleuve:false, montagne:false, multiple5:true,  cotier:false, frontalier:false, plus4voisins:true,  sup6000km2:false, inf3500km2:false, pop1M:false, pop500k:true,  sans100villes:true,  moins300Clermont:false, plus300Clermont:true,  zoneL:false, zoneO:true,  voteMacron2022:false, voteLepen2022:true,  genreMasc:false, genreFem:true,  motCarafe:false, motPichet:false, motCruche:true,  motPotDeau:false, asterixVisite:false, zenith:false, plusNordVancouver:false, clubL1L2:false } },
  { num:"71", nom:"Saône-et-Loire",          region:"Bourgogne-Franche-Comté",     cats:{ fleuve:false, montagne:false, multiple5:false, cotier:false, frontalier:false, plus4voisins:true,  sup6000km2:true,  inf3500km2:false, pop1M:false, pop500k:false, sans100villes:true,  moins300Clermont:true,  plus300Clermont:false, zoneL:false, zoneO:true,  voteMacron2022:true,  voteLepen2022:false, genreMasc:false, genreFem:true,  motCarafe:false, motPichet:false, motCruche:false, motPotDeau:true,  asterixVisite:false, zenith:false, plusNordVancouver:false, clubL1L2:false } },
  { num:"72", nom:"Sarthe",                  region:"Pays de la Loire",            cats:{ fleuve:false, montagne:false, multiple5:false, cotier:false, frontalier:false, plus4voisins:true,  sup6000km2:true,  inf3500km2:false, pop1M:false, pop500k:false, sans100villes:false, moins300Clermont:false, plus300Clermont:true,  zoneL:false, zoneO:true,  voteMacron2022:true,  voteLepen2022:false, genreMasc:false, genreFem:true,  motCarafe:false, motPichet:true,  motCruche:false, motPotDeau:false, asterixVisite:false, zenith:false, plusNordVancouver:false, clubL1L2:true  } },
  { num:"73", nom:"Savoie",                  region:"Auvergne-Rhône-Alpes",        cats:{ fleuve:false, montagne:false, multiple5:false, cotier:false, frontalier:true,  plus4voisins:false, sup6000km2:true,  inf3500km2:false, pop1M:false, pop500k:true,  sans100villes:false, moins300Clermont:true,  plus300Clermont:false, zoneL:true,  zoneO:false, voteMacron2022:true,  voteLepen2022:false, genreMasc:false, genreFem:true,  motCarafe:true,  motPichet:false, motCruche:false, motPotDeau:false, asterixVisite:false, zenith:false, plusNordVancouver:false, clubL1L2:false } },
  { num:"74", nom:"Haute-Savoie",            region:"Auvergne-Rhône-Alpes",        cats:{ fleuve:false, montagne:false, multiple5:false, cotier:false, frontalier:true,  plus4voisins:false, sup6000km2:false, inf3500km2:false, pop1M:false, pop500k:false, sans100villes:false, moins300Clermont:true,  plus300Clermont:false, zoneL:true,  zoneO:false, voteMacron2022:true,  voteLepen2022:false, genreMasc:false, genreFem:true,  motCarafe:true,  motPichet:false, motCruche:false, motPotDeau:false, asterixVisite:false, zenith:false, plusNordVancouver:false, clubL1L2:true  } },
  { num:"75", nom:"Paris",                   region:"Île-de-France",               cats:{ fleuve:false, montagne:false, multiple5:true,  cotier:false, frontalier:false, plus4voisins:false, sup6000km2:false, inf3500km2:true,  pop1M:true,  pop500k:false, sans100villes:false, moins300Clermont:false, plus300Clermont:true,  zoneL:false, zoneO:true,  voteMacron2022:true,  voteLepen2022:false, genreMasc:true,  genreFem:false, motCarafe:true,  motPichet:false, motCruche:false, motPotDeau:false, asterixVisite:true,  zenith:true,  plusNordVancouver:false, clubL1L2:true  } },
  { num:"76", nom:"Seine-Maritime",          region:"Normandie",                   cats:{ fleuve:true,  montagne:false, multiple5:false, cotier:true,  frontalier:false, plus4voisins:false, sup6000km2:true,  inf3500km2:false, pop1M:true,  pop500k:false, sans100villes:false, moins300Clermont:false, plus300Clermont:true,  zoneL:false, zoneO:true,  voteMacron2022:true,  voteLepen2022:false, genreMasc:false, genreFem:true,  motCarafe:false, motPichet:false, motCruche:true,  motPotDeau:false, asterixVisite:true,  zenith:true,  plusNordVancouver:true,  clubL1L2:true  } },
  { num:"77", nom:"Seine-et-Marne",          region:"Île-de-France",               cats:{ fleuve:true,  montagne:false, multiple5:false, cotier:false, frontalier:false, plus4voisins:true,  sup6000km2:true,  inf3500km2:false, pop1M:true,  pop500k:false, sans100villes:false, moins300Clermont:false, plus300Clermont:true,  zoneL:false, zoneO:true,  voteMacron2022:true,  voteLepen2022:false, genreMasc:false, genreFem:true,  motCarafe:true,  motPichet:false, motCruche:false, motPotDeau:false, asterixVisite:false, zenith:false, plusNordVancouver:false, clubL1L2:false } },
  { num:"78", nom:"Yvelines",                region:"Île-de-France",               cats:{ fleuve:false, montagne:false, multiple5:false, cotier:false, frontalier:false, plus4voisins:true,  sup6000km2:false, inf3500km2:true,  pop1M:true,  pop500k:false, sans100villes:false, moins300Clermont:false, plus300Clermont:true,  zoneL:false, zoneO:true,  voteMacron2022:true,  voteLepen2022:false, genreMasc:false, genreFem:true,  motCarafe:true,  motPichet:false, motCruche:false, motPotDeau:false, asterixVisite:false, zenith:false, plusNordVancouver:false, clubL1L2:false } },
  { num:"79", nom:"Deux-Sèvres",             region:"Nouvelle-Aquitaine",          cats:{ fleuve:true,  montagne:false, multiple5:false, cotier:false, frontalier:false, plus4voisins:true,  sup6000km2:false, inf3500km2:false, pop1M:false, pop500k:true,  sans100villes:false, moins300Clermont:true,  plus300Clermont:false, zoneL:false, zoneO:true,  voteMacron2022:true,  voteLepen2022:false, genreMasc:false, genreFem:true,  motCarafe:false, motPichet:true,  motCruche:false, motPotDeau:false, asterixVisite:false, zenith:false, plusNordVancouver:false, clubL1L2:false } },
  { num:"80", nom:"Somme",                   region:"Hauts-de-France",             cats:{ fleuve:true,  montagne:false, multiple5:true,  cotier:true,  frontalier:false, plus4voisins:true,  sup6000km2:true,  inf3500km2:false, pop1M:false, pop500k:false, sans100villes:false, moins300Clermont:false, plus300Clermont:true,  zoneL:false, zoneO:true,  voteMacron2022:false, voteLepen2022:true,  genreMasc:false, genreFem:true,  motCarafe:true,  motPichet:false, motCruche:false, motPotDeau:false, asterixVisite:true,  zenith:true,  plusNordVancouver:true,  clubL1L2:true  } },
  { num:"81", nom:"Tarn",                    region:"Occitanie",                   cats:{ fleuve:false, montagne:false, multiple5:false, cotier:false, frontalier:false, plus4voisins:true,  sup6000km2:false, inf3500km2:false, pop1M:false, pop500k:true,  sans100villes:true,  moins300Clermont:true,  plus300Clermont:false, zoneL:true,  zoneO:false, voteMacron2022:true,  voteLepen2022:false, genreMasc:true,  genreFem:false, motCarafe:true,  motPichet:false, motCruche:false, motPotDeau:false, asterixVisite:false, zenith:false, plusNordVancouver:false, clubL1L2:false } },
  { num:"82", nom:"Tarn-et-Garonne",         region:"Occitanie",                   cats:{ fleuve:true,  montagne:false, multiple5:false, cotier:false, frontalier:false, plus4voisins:true,  sup6000km2:false, inf3500km2:false, pop1M:false, pop500k:true,  sans100villes:false, moins300Clermont:true,  plus300Clermont:false, zoneL:true,  zoneO:false, voteMacron2022:false, voteLepen2022:true,  genreMasc:true,  genreFem:false, motCarafe:true,  motPichet:false, motCruche:false, motPotDeau:false, asterixVisite:false, zenith:false, plusNordVancouver:false, clubL1L2:false } },
  { num:"83", nom:"Var",                     region:"Provence-Alpes-Côte d'Azur",  cats:{ fleuve:true,  montagne:false, multiple5:false, cotier:true,  frontalier:false, plus4voisins:false, sup6000km2:true,  inf3500km2:false, pop1M:true,  pop500k:false, sans100villes:false, moins300Clermont:false, plus300Clermont:true,  zoneL:true,  zoneO:false, voteMacron2022:false, voteLepen2022:true,  genreMasc:true,  genreFem:false, motCarafe:true,  motPichet:false, motCruche:false, motPotDeau:true,  asterixVisite:false, zenith:true,  plusNordVancouver:false, clubL1L2:false } },
  { num:"84", nom:"Vaucluse",                region:"Provence-Alpes-Côte d'Azur",  cats:{ fleuve:false, montagne:false, multiple5:false, cotier:false, frontalier:false, plus4voisins:true,  sup6000km2:false, inf3500km2:false, pop1M:false, pop500k:false, sans100villes:false, moins300Clermont:true,  plus300Clermont:false, zoneL:true,  zoneO:false, voteMacron2022:false, voteLepen2022:true,  genreMasc:true,  genreFem:false, motCarafe:false, motPichet:false, motCruche:false, motPotDeau:true,  asterixVisite:false, zenith:false, plusNordVancouver:false, clubL1L2:false } },
  { num:"85", nom:"Vendée",                  region:"Pays de la Loire",            cats:{ fleuve:false, montagne:false, multiple5:true,  cotier:true,  frontalier:false, plus4voisins:false, sup6000km2:true,  inf3500km2:false, pop1M:false, pop500k:false, sans100villes:false, moins300Clermont:false, plus300Clermont:true,  zoneL:false, zoneO:true,  voteMacron2022:true,  voteLepen2022:false, genreMasc:false, genreFem:true,  motCarafe:false, motPichet:true,  motCruche:false, motPotDeau:false, asterixVisite:false, zenith:false, plusNordVancouver:false, clubL1L2:false } },
  { num:"86", nom:"Vienne",                  region:"Nouvelle-Aquitaine",          cats:{ fleuve:false, montagne:false, multiple5:false, cotier:false, frontalier:false, plus4voisins:true,  sup6000km2:true,  inf3500km2:false, pop1M:false, pop500k:true,  sans100villes:false, moins300Clermont:true,  plus300Clermont:false, zoneL:false, zoneO:true,  voteMacron2022:true,  voteLepen2022:false, genreMasc:false, genreFem:true,  motCarafe:false, motPichet:true,  motCruche:false, motPotDeau:false, asterixVisite:false, zenith:false, plusNordVancouver:false, clubL1L2:false } },
  { num:"87", nom:"Haute-Vienne",            region:"Nouvelle-Aquitaine",          cats:{ fleuve:false, montagne:false, multiple5:false, cotier:false, frontalier:false, plus4voisins:true,  sup6000km2:false, inf3500km2:false, pop1M:false, pop500k:true,  sans100villes:false, moins300Clermont:true,  plus300Clermont:false, zoneL:true,  zoneO:false, voteMacron2022:true,  voteLepen2022:false, genreMasc:false, genreFem:true,  motCarafe:false, motPichet:true,  motCruche:false, motPotDeau:false, asterixVisite:false, zenith:true,  plusNordVancouver:false, clubL1L2:false } },
  { num:"88", nom:"Vosges",                  region:"Grand Est",                   cats:{ fleuve:false, montagne:true,  multiple5:false, cotier:false, frontalier:false, plus4voisins:true,  sup6000km2:false, inf3500km2:false, pop1M:false, pop500k:true,  sans100villes:true,  moins300Clermont:false, plus300Clermont:true,  zoneL:false, zoneO:true,  voteMacron2022:false, voteLepen2022:true,  genreMasc:false, genreFem:true,  motCarafe:false, motPichet:false, motCruche:true,  motPotDeau:false, asterixVisite:false, zenith:false, plusNordVancouver:false, clubL1L2:false } },
  { num:"89", nom:"Yonne",                   region:"Bourgogne-Franche-Comté",     cats:{ fleuve:false, montagne:false, multiple5:false, cotier:false, frontalier:false, plus4voisins:true,  sup6000km2:true,  inf3500km2:false, pop1M:false, pop500k:true,  sans100villes:true,  moins300Clermont:true,  plus300Clermont:false, zoneL:false, zoneO:true,  voteMacron2022:true,  voteLepen2022:false, genreMasc:false, genreFem:true,  motCarafe:true,  motPichet:false, motCruche:true,  motPotDeau:false, asterixVisite:false, zenith:false, plusNordVancouver:false, clubL1L2:true  } },
  { num:"90", nom:"Territoire de Belfort",   region:"Bourgogne-Franche-Comté",     cats:{ fleuve:false, montagne:false, multiple5:true,  cotier:false, frontalier:true,  plus4voisins:false, sup6000km2:false, inf3500km2:true,  pop1M:false, pop500k:true,  sans100villes:true,  moins300Clermont:false, plus300Clermont:true,  zoneL:false, zoneO:true,  voteMacron2022:true,  voteLepen2022:false, genreMasc:true,  genreFem:false, motCarafe:false, motPichet:false, motCruche:true,  motPotDeau:false, asterixVisite:false, zenith:false, plusNordVancouver:false, clubL1L2:false } },
  { num:"91", nom:"Essonne",                 region:"Île-de-France",               cats:{ fleuve:false, montagne:false, multiple5:false, cotier:false, frontalier:false, plus4voisins:true,  sup6000km2:false, inf3500km2:true,  pop1M:true,  pop500k:false, sans100villes:false, moins300Clermont:false, plus300Clermont:true,  zoneL:false, zoneO:true,  voteMacron2022:true,  voteLepen2022:false, genreMasc:false, genreFem:true,  motCarafe:true,  motPichet:false, motCruche:false, motPotDeau:false, asterixVisite:false, zenith:false, plusNordVancouver:false, clubL1L2:false } },
  { num:"92", nom:"Hauts-de-Seine",          region:"Île-de-France",               cats:{ fleuve:true,  montagne:false, multiple5:false, cotier:false, frontalier:false, plus4voisins:true,  sup6000km2:false, inf3500km2:true,  pop1M:true,  pop500k:false, sans100villes:false, moins300Clermont:false, plus300Clermont:true,  zoneL:false, zoneO:true,  voteMacron2022:true,  voteLepen2022:false, genreMasc:false, genreFem:true,  motCarafe:true,  motPichet:false, motCruche:false, motPotDeau:false, asterixVisite:false, zenith:false, plusNordVancouver:false, clubL1L2:false } },
  { num:"93", nom:"Seine-Saint-Denis",       region:"Île-de-France",               cats:{ fleuve:true,  montagne:false, multiple5:false, cotier:false, frontalier:false, plus4voisins:true,  sup6000km2:false, inf3500km2:true,  pop1M:true,  pop500k:false, sans100villes:false, moins300Clermont:false, plus300Clermont:true,  zoneL:false, zoneO:true,  voteMacron2022:true,  voteLepen2022:false, genreMasc:false, genreFem:true,  motCarafe:true,  motPichet:false, motCruche:false, motPotDeau:false, asterixVisite:false, zenith:false, plusNordVancouver:false, clubL1L2:true  } },
  { num:"94", nom:"Val-de-Marne",            region:"Île-de-France",               cats:{ fleuve:false, montagne:false, multiple5:false, cotier:false, frontalier:false, plus4voisins:true,  sup6000km2:false, inf3500km2:true,  pop1M:true,  pop500k:false, sans100villes:false, moins300Clermont:false, plus300Clermont:true,  zoneL:false, zoneO:true,  voteMacron2022:true,  voteLepen2022:false, genreMasc:true,  genreFem:false, motCarafe:true,  motPichet:false, motCruche:false, motPotDeau:false, asterixVisite:false, zenith:false, plusNordVancouver:false, clubL1L2:false } },
  { num:"95", nom:"Val-d'Oise",              region:"Île-de-France",               cats:{ fleuve:false, montagne:false, multiple5:true,  cotier:false, frontalier:false, plus4voisins:true,  sup6000km2:false, inf3500km2:true,  pop1M:true,  pop500k:false, sans100villes:false, moins300Clermont:false, plus300Clermont:true,  zoneL:false, zoneO:true,  voteMacron2022:true,  voteLepen2022:false, genreMasc:true,  genreFem:false, motCarafe:true,  motPichet:false, motCruche:false, motPotDeau:false, asterixVisite:false, zenith:false, plusNordVancouver:false, clubL1L2:false } }
];

DEPARTEMENTS.forEach(d => {
  d.cats.sansE = !/e/i.test(d.nom);
  d.cats.voyelle = /^[AEIOUÀÂÉÈÊËÎÏÔÙÛÜÆŒaeiouàâéèêëîïôùûüæœ]/i.test(d.nom);
  const idReg = REGION_VERS_ID[d.region];
  if (idReg) d.cats[idReg] = true;
  Object.values(REGION_VERS_ID).forEach(id => { if (!(id in d.cats)) d.cats[id] = false; });
});

// ─────────────────────────────────────────────
// 2. GÉNÉRATION & PONDÉRATION DE RARETÉ / POINTS
// ─────────────────────────────────────────────
function graineDuJour() {
  const d = new Date();
  return d.getFullYear() * 10000 + (d.getMonth() + 1) * 100 + d.getDate();
}
function creerAleatoire(graine) {
  let s = graine;
  return () => { s = (s * 1664525 + 1013904223) & 0xffffffff; return (s >>> 0) / 0xffffffff; };
}
function melanger(tableau, rng) {
  const t = [...tableau];
  for (let i = t.length - 1; i > 0; i--) { const j = Math.floor(rng() * (i + 1)); [t[i], t[j]] = [t[j], t[i]]; }
  return t;
}
function reponsesValides(idL, idC) {
  return DEPARTEMENTS.filter(d => d.cats[idL] && d.cats[idC]).map(d => d.nom);
}
function choisirCategories(rng) {
  const ids = CATEGORIES.map(c => c.id);
  const MIN_REPONSES = 3;

  for (let i = 0; i < 1000; i++) {
    const m = melanger(ids, rng);
    const lignes = m.slice(0, 3);
    const colonnes = m.slice(3, 6);

    const grilleValide = lignes.every(l => 
      colonnes.every(c => reponsesValides(l, c).length >= MIN_REPONSES)
    );

    if (grilleValide) {
      return { lignes, colonnes };
    }
  }

  return { 
    lignes: ["fleuve", "plus4voisins", "sup6000km2"], 
    colonnes: ["moins300CF", "sans100villes", "pop500k"] 
  };
}

const rng = creerAleatoire(graineDuJour());
const { lignes, colonnes } = choisirCategories(rng);
const ROWS = lignes.map(id => ({ id, label: CATEGORIES.find(c => c.id === id).label }));
const COLS = colonnes.map(id => ({ id, label: CATEGORIES.find(c => c.id === id).label }));
const ANSWERS = ROWS.map(r => COLS.map(c => reponsesValides(r.id, c.id)));
const ALL_DEPS = DEPARTEMENTS.map(d => d.nom);

// Calcul déterministe des pourcentages et des points par case (Somme = 100.0 %)
const STATS = ROWS.map((r, rIdx) => COLS.map((c, cIdx) => {
  const deps = ANSWERS[rIdx][cIdx];
  if (deps.length === 0) return {};

  const weights = {};
  let totalW = 0;

  deps.forEach(nom => {
    const d = DEPARTEMENTS.find(item => item.nom === nom);
    let w = 15;
    if (d.cats.pop1M) w += 40;
    if (!d.cats.sans100villes) w += 20;
    if (d.cats.pop500k) w -= 8;

    const pseudoRand = ((parseInt(d.num, 10) * 17 + rIdx * 31 + cIdx * 13 + graineDuJour()) % 40) / 10;
    w = Math.max(1, w + pseudoRand);
    weights[nom] = w;
    totalW += w;
  });

  let distributed = 0;
  const items = deps.map(nom => {
    const exact = (weights[nom] / totalW) * 1000;
    const base = Math.floor(exact);
    const remainder = exact - base;
    distributed += base;
    return { nom, base, remainder };
  });

  let diff = 1000 - distributed;
  items.sort((a, b) => b.remainder - a.remainder);
  for (let i = 0; i < diff; i++) {
    items[i].base += 1;
  }

  const pcts = {};
  let minPct = 100, maxPct = 0;
  items.forEach(item => {
    const p = parseFloat((item.base / 10).toFixed(1));
    pcts[item.nom] = p;
    if (p < minPct) minPct = p;
    if (p > maxPct) maxPct = p;
  });

  const cellData = {};
  items.forEach(item => {
    const p = pcts[item.nom];
    let pts = 100;
    if (maxPct !== minPct) {
      pts = Math.round(100 - 80 * ((p - minPct) / (maxPct - minPct)));
    }
    cellData[item.nom] = { pct: p, pts: pts };
  });

  return cellData;
}));

// ─────────────────────────────────────────────
// 3. ÉTAT & SAUVEGARDE QUOTIDIENNE (PARTIE UNIQUE)
// ─────────────────────────────────────────────
const STORAGE_KEY = 'deptdoku_' + graineDuJour();

let gridState = Array.from({length: 3}, () => Array(3).fill(null));
let usedAnswers = new Set();
let selectedCell = null;
let mistakes = 0;
const MAX_MISTAKES = 5;
let sugSelected = -1;
let gameOver = false;
let currentScore = 0;
let isFreePlay = false;

function calculerBonus() {
  const won = gridState.every(row => row.every(cell => cell !== null));
  if (!won) return 0;
  return Math.max(0, 100 - (mistakes * 20));
}

function calculerScoreTotal() {
  return currentScore + calculerBonus();
}

function saveGameProgress() {
  const data = {
    gridState,
    mistakes,
    gameOver,
    currentScore,
    usedAnswers: Array.from(usedAnswers),
    isFreePlay
  };
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}

function loadSavedGame() {
  const saved = localStorage.getItem(STORAGE_KEY);
  if (!saved) return false;
  try {
    const data = JSON.parse(saved);
    gridState = data.gridState || gridState;
    mistakes = data.mistakes || 0;
    gameOver = data.gameOver || false;
    currentScore = data.currentScore || 0;
    usedAnswers = new Set(data.usedAnswers || []);
    isFreePlay = data.isFreePlay || false;

    for (let i = 0; i < mistakes; i++) {
      const d = document.getElementById('d' + i);
      if (d) d.classList.add('used');
    }
    updateScoreDisplay();
    return true;
  } catch (e) {
    return false;
  }
}

function updateScoreDisplay() {
  document.getElementById('totalScore').textContent = calculerScoreTotal();
}

function setDateDisplay() {
  const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
  const d = new Date();
  const dateFormatted = d.toLocaleDateString('fr-FR', options);
  document.getElementById('todayDate').textContent = `Grille du ${dateFormatted}`;
}

// ─────────────────────────────────────────────
// 4. RENDU GRILLE & CARTE D3 SANS CORSE
// ─────────────────────────────────────────────
function buildGrid() {
  const table = document.getElementById('grid');
  table.innerHTML = '';
  const thead = table.createTHead();
  const hr = thead.insertRow();
  hr.insertCell();
  COLS.forEach(c => { const th = document.createElement('th'); th.textContent = c.label; hr.appendChild(th); });
  const tbody = table.createTBody();
  ROWS.forEach((row, r) => {
    const tr = tbody.insertRow();
    const th = document.createElement('th'); th.textContent = row.label; tr.appendChild(th);
    COLS.forEach((_, c) => {
      const td = tr.insertCell();
      renderCell(td, r, c);
      td.addEventListener('click', () => handleCellClick(td, r, c));
    });
  });
}

function renderCell(td, r, c) {
  td.innerHTML = '';
  const cellData = gridState[r][c];

  if (cellData) {
    td.className = 'filled' + (gameOver && !isFreePlay ? ' game-over-clickable' : '');
    td.innerHTML = `
      <div class="cell-answer">
        <div class="cell-answer-name">${cellData.nom} (${cellData.num})</div>
        <div class="cell-answer-details">
          <span class="cell-answer-pct">${cellData.pct}%</span>
          <span class="cell-answer-pts">+${cellData.pts}</span>
        </div>
      </div>`;
  } else {
    td.className = (gameOver && !isFreePlay) ? 'game-over-clickable' : '';
    td.innerHTML = `<span class="cell-placeholder">${gameOver && !isFreePlay ? '?' : ''}</span>`;
  }
}

function handleCellClick(td, r, c) {
  if (gameOver && !isFreePlay) {
    openModal(r, c);
    return;
  }
  selectCell(td, r, c);
}

function selectCell(td, r, c) {
  if (td.classList.contains('filled')) return;
  if (mistakes >= MAX_MISTAKES && !isFreePlay) return;
  if (selectedCell) selectedCell.td.classList.remove('selected');
  selectedCell = { r, c, td };
  td.classList.add('selected');

  // Nombre de réponses possibles pour cette case
  const nbReponses = ANSWERS[r][c].length;
  searchEl.placeholder = `${nbReponses} réponse${nbReponses > 1 ? 's' : ''} possible${nbReponses > 1 ? 's' : ''}…`;

  searchEl.disabled = false;
  searchEl.value = '';
  searchEl.focus();
  document.getElementById('hint').textContent = `Case : ${ROWS[r].label} × ${COLS[c].label}`;
  document.getElementById('hint').className = 'search-hint active';
  closeSuggestions();
}

function checkGameOver() {
  const won = gridState.every(row => row.every(cell => cell !== null));
  if (won) {
    if (isFreePlay) {
      searchEl.disabled = true;
      searchEl.placeholder = 'Tapez au moins 3 lettres…';
      if (selectedCell) { selectedCell.td.classList.remove('selected'); selectedCell = null; }
      document.getElementById('hint').textContent = `Grille complétée ! (Mode sans score)`;
      document.getElementById('hint').className = 'search-hint';
      saveGameProgress();
      return;
    }

    gameOver = true;
    searchEl.disabled = true;
    searchEl.placeholder = 'Tapez au moins 3 lettres…';
    if (selectedCell) { selectedCell.td.classList.remove('selected'); selectedCell = null; }
    
    updateScoreDisplay();
    const finalScore = calculerScoreTotal();
    const bonus = calculerBonus();
    
    document.getElementById('hint').textContent = `Victoire ! Score final : ${finalScore} / 1000 (dont ${bonus} pts de bonus)`;
    document.getElementById('hint').className = 'search-hint';
    activateGameOverMode();
    showEndGamePopup(true);
    saveGameProgress();
  }
}

function activateGameOverMode() {
  const tds = document.querySelectorAll('#grid tbody td');
  let idx = 0;
  for (let r = 0; r < 3; r++) {
    for (let c = 0; c < 3; c++) {
      renderCell(tds[idx], r, c);
      idx++;
    }
  }
  if (!document.querySelector('.game-over-hint')) {
    const hint = document.createElement('p');
    hint.className = 'game-over-hint';
    hint.textContent = 'Clique sur une case pour explorer les réponses possibles';
    document.querySelector('.left-pane').appendChild(hint);
  }
}

const tooltip = document.getElementById('mapTooltip');

async function initMap() {
  try {
    const res = await fetch('https://cdn.jsdelivr.net/gh/gregoiredavid/france-geojson@master/departements.geojson');
    const geojson = await res.json();
    const svg = d3.select('#map-svg');

    // Exclusion de la Corse (2A et 2B)
    const featuresSansCorse = geojson.features.filter(
      d => d.properties.code !== '2A' && d.properties.code !== '2B'
    );

    const projection = d3.geoConicConformal()
      .center([2.65, 46.4])
      .scale(2550)
      .translate([250, 250]);

    const path = d3.geoPath().projection(projection);

    svg.selectAll('path.dept')
      .data(featuresSansCorse)
      .enter()
      .append('path')
      .attr('class', 'dept')
      .attr('d', path)
      .attr('id', d => 'map-' + d.properties.code)
      .on('mousemove', function(event, d) {
        if (d3.select(this).classed('correct')) {
          const deptObj = DEPARTEMENTS.find(item => item.num === d.properties.code);
          const name = deptObj ? deptObj.nom : d.properties.nom;
          const rect = document.querySelector('.right-pane').getBoundingClientRect();
          
          tooltip.style.display = 'block';
          tooltip.style.left = (event.clientX - rect.left) + 'px';
          tooltip.style.top = (event.clientY - rect.top) + 'px';
          tooltip.textContent = `${name} (${d.properties.code})`;
        }
      })
      .on('mouseleave', function() {
        tooltip.style.display = 'none';
      });

    // Colorer les départements sauvegardés si partie rechargée
    gridState.forEach(row => row.forEach(cell => {
      if (cell) colorMap(cell.num, true);
    }));
  } catch (e) {
    console.error("Erreur de chargement de la carte", e);
  }
}

function colorMap(num, isCorrect) {
  const el = document.getElementById('map-' + num);
  if (!el) return;
  if (isCorrect) {
    el.classList.remove('wrong');
    el.classList.add('correct');
  } else {
    el.classList.add('wrong');
    setTimeout(() => el.classList.remove('wrong'), 1000);
  }
}

// ─────────────────────────────────────────────
// 5. POP-UP DE FIN & PARTAGE
// ─────────────────────────────────────────────
function showEndGamePopup(isWon) {
  const modal = document.getElementById('endGameModal');
  let foundCount = 0;
  let rarest = null;

  gridState.forEach(row => row.forEach(cell => {
    if (cell) {
      foundCount++;
      if (!rarest || cell.pct < rarest.pct) {
        rarest = cell;
      }
    }
  }));

  const bonus = calculerBonus();
  const finalScore = calculerScoreTotal();

  document.getElementById('endGameTitle').textContent = isWon ? 'Victoire !' : 'Partie terminée';
  document.getElementById('endGameSubtitle').textContent = isWon ? 'Grille entièrement complétée' : 'Limite des 5 erreurs atteinte';
  document.getElementById('endScore').textContent = `${finalScore} / 1000`;
  document.getElementById('endFound').textContent = `${foundCount} / 9`;
  document.getElementById('endMistakes').textContent = `${mistakes} / 5`;

  const btnFree = document.getElementById('btnFreePlayTrigger');
  if (!isWon && foundCount < 9) {
    btnFree.style.display = 'block';
  } else {
    btnFree.style.display = 'none';
  }

  if (isWon) {
    document.getElementById('endBonusBox').style.display = 'block';
    document.getElementById('endBonusVal').textContent = `+${bonus} pts (départ 100 - ${mistakes * 20})`;
  } else {
    document.getElementById('endBonusBox').style.display = 'none';
  }

  if (rarest) {
    document.getElementById('endRarest').textContent = `${rarest.nom} (${rarest.pct} %)`;
  } else {
    document.getElementById('endRarest').textContent = 'Aucun département trouvé';
  }

  modal.classList.add('open');
}

function genererTextePartage() {
  let foundCount = 0;
  let gridVisual = '';

  for (let r = 0; r < 3; r++) {
    for (let c = 0; c < 3; c++) {
      if (gridState[r][c]) {
        foundCount++;
        gridVisual += '🟩';
      } else {
        gridVisual += '⬜';
      }
    }
    gridVisual += '\n';
  }

  let rarestText = '';
  let rarest = null;
  gridState.forEach(row => row.forEach(cell => {
    if (cell && (!rarest || cell.pct < rarest.pct)) rarest = cell;
  }));
  if (rarest) rarestText = `\nDépartement le plus rare : ${rarest.nom} (${rarest.pct} %)`;

  const bonus = calculerBonus();
  const finalScore = calculerScoreTotal();
  const bonusText = foundCount === 9 ? ` (dont bonus : +${bonus} pts)` : '';

  const d = new Date();
  const dateStr = `${d.getDate()}/${d.getMonth()+1}/${d.getFullYear()}`;

  return `Départementdoku (${dateStr})\nScore : ${finalScore}/1000 pts${bonusText} (${foundCount}/9)\nErreurs : ${mistakes}/5${rarestText}\n\n${gridVisual}`;
}

document.getElementById('btnShare').addEventListener('click', async () => {
  const text = genererTextePartage();
  const btn = document.getElementById('btnShare');
  try {
    await navigator.clipboard.writeText(text);
    btn.textContent = 'Copié !';
    setTimeout(() => { btn.textContent = 'Copier / Partager mon score'; }, 2500);
  } catch (err) {
    alert(text);
  }
});

// ─────────────────────────────────────────────
// 6. GESTION DES MODALS
// ─────────────────────────────────────────────
function openModal(r, c) {
  const cellStats = STATS[r][c];
  const sortedDeps = Object.keys(cellStats).sort((a, b) => cellStats[a].pct - cellStats[b].pct);
  const played = gridState[r][c];

  document.getElementById('modalCats').innerHTML =
    `<span>${ROWS[r].label}</span> × <span>${COLS[c].label}</span>`;

  const total = sortedDeps.length;
  document.getElementById('modalSubtitle').textContent =
    `${total} département${total > 1 ? 's' : ''} valide${total > 1 ? 's' : ''} :`;

  const container = document.getElementById('modalAnswers');
  container.innerHTML = '';

  sortedDeps.forEach(dep => {
    const isChosen = played && played.nom === dep;
    const info = cellStats[dep];
    const row = document.createElement('div');
    row.className = 'answer-row' + (isChosen ? ' chosen' : '');
    row.innerHTML = `
      <span>${isChosen ? '✓ ' : ''}${dep}</span>
      <div class="answer-row-right">
        <span class="answer-row-pct">${info.pct} %</span>
        <span class="answer-row-pts">+${info.pts} pts</span>
      </div>
    `;
    container.appendChild(row);
  });

  const countEl = document.getElementById('modalCount');
  countEl.textContent = played
    ? `Ton choix : ${played.nom} (${played.pct} % — +${played.pts} pts)`
    : 'Case non répondue';

  document.getElementById('modalOverlay').classList.add('open');
}

function closeModal() {
  document.getElementById('modalOverlay').classList.remove('open');
}

document.getElementById('modalClose').addEventListener('click', closeModal);
document.getElementById('modalOverlay').addEventListener('click', e => {
  if (e.target === document.getElementById('modalOverlay')) closeModal();
});

// Modal Règles
const rulesModal = document.getElementById('rulesModal');
document.getElementById('btnOpenRules').addEventListener('click', () => rulesModal.classList.add('open'));
document.getElementById('btnStartGame').addEventListener('click', () => rulesModal.classList.remove('open'));
document.getElementById('btnCloseRulesCross').addEventListener('click', () => rulesModal.classList.remove('open'));
rulesModal.addEventListener('click', e => { if (e.target === rulesModal) rulesModal.classList.remove('open'); });

// Modal En savoir plus
const aboutModal = document.getElementById('aboutModal');
document.getElementById('btnOpenAbout').addEventListener('click', () => aboutModal.classList.add('open'));
document.getElementById('btnCloseAbout').addEventListener('click', () => aboutModal.classList.remove('open'));
document.getElementById('btnCloseAboutCross').addEventListener('click', () => aboutModal.classList.remove('open'));
aboutModal.addEventListener('click', e => { if (e.target === aboutModal) aboutModal.classList.remove('open'); });

// Modal Mentions Légales
const legalModal = document.getElementById('legalModal');
document.getElementById('btnOpenLegal').addEventListener('click', () => legalModal.classList.add('open'));
document.getElementById('btnCloseLegal').addEventListener('click', () => legalModal.classList.remove('open'));
document.getElementById('btnCloseLegalCross').addEventListener('click', () => legalModal.classList.remove('open'));
legalModal.addEventListener('click', e => { if (e.target === legalModal) legalModal.classList.remove('open'); });

// Modal Mode Libre (Jouer sans score)
const freePlayModal = document.getElementById('freePlayModal');
document.getElementById('btnFreePlayTrigger').addEventListener('click', () => {
  document.getElementById('endGameModal').classList.remove('open');
  freePlayModal.classList.add('open');
});

document.getElementById('btnConfirmFreePlay').addEventListener('click', () => {
  freePlayModal.classList.remove('open');
  isFreePlay = true;
  const existingHint = document.querySelector('.game-over-hint');
  if (existingHint) existingHint.remove();

  const tds = document.querySelectorAll('#grid tbody td');
  let idx = 0;
  for (let r = 0; r < 3; r++) {
    for (let c = 0; c < 3; c++) {
      renderCell(tds[idx], r, c);
      idx++;
    }
  }

  document.getElementById('hint').textContent = 'Mode détente actif : remplis la grille pour le plaisir !';
  document.getElementById('hint').className = 'search-hint';
  saveGameProgress();
});
freePlayModal.addEventListener('click', e => { if (e.target === freePlayModal) freePlayModal.classList.remove('open'); });

// Fermeture globale à la touche Échap
document.addEventListener('keydown', e => {
  if (e.key === 'Escape') {
    closeModal();
    rulesModal.classList.remove('open');
    aboutModal.classList.remove('open');
    legalModal.classList.remove('open');
    document.getElementById('endGameModal').classList.remove('open');
    freePlayModal.classList.remove('open');
  }
});

// ─────────────────────────────────────────────
// 7. AUTOCOMPLETE
// ─────────────────────────────────────────────
const searchEl = document.getElementById('search');
const sugBox = document.getElementById('suggestions');

searchEl.addEventListener('input', () => { sugSelected = -1; updateSuggestions(searchEl.value); });

searchEl.addEventListener('keydown', e => {
  const items = sugBox.querySelectorAll('.sug-item');
  if (e.key === 'ArrowDown') {
    e.preventDefault();
    sugSelected = Math.min(sugSelected + 1, items.length - 1);
    highlightSug(items);
  } else if (e.key === 'ArrowUp') {
    e.preventDefault();
    sugSelected = Math.max(sugSelected - 1, 0);
    highlightSug(items);
  } else if (e.key === 'Enter') {
    if (sugSelected >= 0 && items[sugSelected]) submit(items[sugSelected].dataset.val);
    else if (items.length === 1) submit(items[0].dataset.val);
  } else if (e.key === 'Escape') {
    closeSuggestions();
  }
});

function highlightSug(items) {
  items.forEach((el, i) => el.classList.toggle('selected', i === sugSelected));
  if (items[sugSelected]) items[sugSelected].scrollIntoView({ block: 'nearest' });
}

function updateSuggestions(q) {
  if (!selectedCell) { closeSuggestions(); return; }
  const norm = normalize(q.trim());
  if (norm.length < 3) { closeSuggestions(); return; }
  const matches = ALL_DEPS.filter(d => !usedAnswers.has(d) && normalize(d).includes(norm));
  if (matches.length === 0) { closeSuggestions(); return; }
  sugBox.innerHTML = '';
  matches.slice(0, 20).forEach(dep => {
    const div = document.createElement('div');
    div.className = 'sug-item';
    div.dataset.val = dep;
    div.innerHTML = highlightText(dep, q.trim());
    div.addEventListener('mousedown', e => { e.preventDefault(); submit(dep); });
    sugBox.appendChild(div);
  });
  sugBox.classList.add('open');
}

function highlightText(text, q) {
  if (!q) return text;
  const chars = normalize(q).split('').map(c => c.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'));
  if (chars.length === 0) return text;
  const pattern = chars.map(c => `[${c}]`).join("[\\s\\-']?");
  try {
    const cleanText = text.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
    const match = cleanText.match(new RegExp(pattern, 'i'));
    if (!match) return text;
    const start = match.index;
    const len = match[0].length;
    return text.slice(0, start) + '<mark>' + text.slice(start, start + len) + '</mark>' + text.slice(start + len);
  } catch (e) {
    return text;
  }
}

function normalize(s) {
  return s.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/[^a-z0-9]/g, '');
}

function closeSuggestions() {
  sugBox.classList.remove('open');
  sugBox.innerHTML = '';
  sugSelected = -1;
}

// ─────────────────────────────────────────────
// 8. VALIDATION DU TOUR
// ─────────────────────────────────────────────
function submit(dep) {
  if (!selectedCell) return;
  const { r, c, td } = selectedCell;
  const valid = ANSWERS[r][c].includes(dep);
  const depObj = DEPARTEMENTS.find(d => d.nom === dep);
  closeSuggestions();
  searchEl.value = '';

  if (valid) {
    const info = STATS[r][c][dep];
    const ptsWon = isFreePlay ? 0 : info.pts;
    if (!isFreePlay) {
      currentScore += info.pts;
      updateScoreDisplay();
    }

    gridState[r][c] = { nom: dep, num: depObj.num, pct: info.pct, pts: ptsWon };
    usedAnswers.add(dep);
    if (depObj) colorMap(depObj.num, true);
    selectedCell = null;
    searchEl.disabled = true;
    searchEl.placeholder = 'Tapez au moins 3 lettres…';
    document.getElementById('hint').textContent = isFreePlay 
      ? `${dep} (${info.pct}%) — Validé !`
      : `${dep} (${info.pct}% — +${info.pts} pts) — Validé !`;
    document.getElementById('hint').className = 'search-hint';
    renderCell(td, r, c);
    saveGameProgress();
    checkGameOver();
  } else {
    if (isFreePlay) {
      td.classList.add('wrong');
      setTimeout(() => { td.classList.remove('wrong'); td.classList.add('selected'); }, 400);
      document.getElementById('hint').textContent = `"${dep}" n'est pas valide ici`;
      return;
    }

    mistakes++;
    if (depObj) colorMap(depObj.num, false);
    document.getElementById('d' + (mistakes - 1)).classList.add('used');
    td.classList.add('wrong');
    setTimeout(() => { td.classList.remove('wrong'); td.classList.add('selected'); }, 400);
    document.getElementById('hint').textContent = `"${dep}" n'est pas valide ici`;
    saveGameProgress();
    if (mistakes >= MAX_MISTAKES) {
      gameOver = true;
      searchEl.disabled = true;
      searchEl.placeholder = 'Tapez au moins 3 lettres…';
      selectedCell.td.classList.remove('selected');
      selectedCell = null;
      document.getElementById('hint').textContent = `5 erreurs — partie terminée ! (${calculerScoreTotal()} pts)`;
      document.getElementById('hint').className = 'search-hint';
      activateGameOverMode();
      showEndGamePopup(false);
      saveGameProgress();
    }
  }
}

document.addEventListener('click', e => { if (!e.target.closest('.search-section')) closeSuggestions(); });

// ─────────────────────────────────────────────
// INITIALISATION GLOBALE
// ─────────────────────────────────────────────
setDateDisplay();
const hasPlayed = loadSavedGame();
buildGrid();
initMap();
updateScoreDisplay();

if (hasPlayed) {
  document.getElementById('rulesModal').classList.remove('open');
  if (gameOver && !isFreePlay) {
    searchEl.disabled = true;
    searchEl.placeholder = 'Tapez au moins 3 lettres…';
    const isWon = gridState.every(row => row.every(cell => cell !== null));
    document.getElementById('hint').textContent = `Partie terminée (${calculerScoreTotal()} pts) — Clique sur une case pour voir les réponses`;
    activateGameOverMode();
    showEndGamePopup(isWon);
  } else if (isFreePlay) {
    const isFull = gridState.every(row => row.every(cell => cell !== null));
    document.getElementById('hint').textContent = isFull 
      ? 'Grille complétée ! (Mode sans score)' 
      : 'Mode détente actif : remplis la grille pour le plaisir !';
  }
}
