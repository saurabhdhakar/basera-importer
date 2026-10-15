// Town names ending in ">" show a right arrow in the list.
export type Town = { name: string; arrow: boolean; district?: string };
export type StateEntry = { name: string; towns: Town[] };

const parse = (list: string): Town[] =>
  list.split(",").map((s) => s.trim()).filter(Boolean).map((s) => {
    const arrow = s.endsWith(">");
    return { name: arrow ? s.slice(0, -1).trim() : s, arrow };
  });

const RAW: Record<string, string> = {
  "Andaman & Nicobar Islands": "Bakultala, Bambooflat>, Car Nicobar>, Diglipur, Garacharma, Hut Bay>, Kamorta, Malacca, Mayabunder>, Port Blair>, Prothrapur>, Rangat>, Tarasa Island",
  "Andhra Pradesh": "East Godavari district, Achanta>, Adoni>, Allur>, Alwal>, Amadalavalasa>, Amalapuram>, Anakapalle>, Anantapalli, Anantapur>, Anaparthy>, Annamayya>, Annavaram, Araku>, Atchutapuram APSEZ>, Atmakur>, Atmakur Sri Potti Sriramulu>, Attilli, Badampudi, Badangi, Badvel>, Banaganapalle, Bandarulanka>, Banumukkala>, Bapatla>, Bestawaripeta>, Bethamcherla>, Bheemunipatnam>, Bhimadole>, Bhimavaram>, Bobbili>, Bowluvada, Chagallu>, Chebrole Khandrika, Chebrolu, Chennamukkapalle, Chennur>, Chilakalurupet>, Chimakurthy>, Chinnachowk, Chintalavalasa, Chintapalle>, Chippada Pharma SEZ, Chipurupalle>, Chirala>, Chittoor>, Chodavaram>, Cuddapah, Cumbum>, Denduluru>, Devarapalli>, Dharmavaram>, Dhone>, Dommara Nandyala, Dondapadu KCP Cement Factory, Dondapadu Kakatiya Cement Factory>, Dowleswaram>, Dr B R Ambedkar Konaseema>, Draksharamam>, Dwaraka Tirumala, Edlapadu>, Ekambarakuppam>, Eluru>, Gajapathinagaram>, Gajulamandhyam Industrial Area>, Gajularega>, Gajuwaka>, Ganapavaram>, Gangapatnam, Gavaravaram, Giddaluru>, Golugonda, Gooty>, Gopalapuram>, Gopavaram, Gudivada>, Gudivada Visakhapatnam District, Gudur>, Gundugolanu>, Guntakal>, Guntur>, Gurzala, Hanuman Junction>, Hindupur>, Hiramandalam>, Horseley Hills>, Ibrahimpatnam>, Ichchapuram>, India Cement Factory Chilamakuru>, Indukurpet>, Industrial Growth Centre Thimmanapalem>, Jaggaiahpet>, Jammalamadugu>, Jangareddigudem>, Jarjapupeta, Jaypee Cement Factory Budawada>, Kadapa>, Kadiri>, Kadiri Rural, Kaikaram>, Kakinada>, Kakkalapalle, Kallur Anantapur District, Kaluvaya>, Kalyandurg>, Kanapaka>, Kandukur>, Kanigiri>, Kankipadu>, Kantabamsuguda, Kathipudi>, Kavali>, Kavali Industrial Area>, Kodumur, Kodur>, Koikuntla>, Komarolu, Kondapalle>, Kota>, Kotabammal>, Kothapatnam>, Kothavalasa>, Kovurpalle>, Kovvur>, Kudithipalem>, Kuppam>, Kurnool>, Macherla>, Machilipatnam>, Madanapalle>, Madhurawada>, Mailvaram>, Mamidalapadu>, Mandapeta>, Mangalagiri>, Mangampeta, Mangasamudram>, Markapur>, Markapur Rural, Maruteru>, Medarametla>, Medikonduru>, Meliaputti>, Moragudi>, Muddanur, Mulaguntapadu>, Mulakuddu, Mummidivaram>, Murakambattu>, Muttukuru>, Mydukur>, Mylavaram>, NTPC Simhadri Township>, Nadim Tiruvuru>, Nagaram, Nagari>, Nagireddipalle>, Nakkapalle>, Nallajerla>, Nandigama>, Nandyal>, Narasannapeta>, Narasapur>, Narasapuram>, Narasaraopet>, Narayanavanam>, Tirumala>, Tirupati>, Tummikapalle, Tuni>, Unguturu, Uppada>, Upper Sileru Project Site Camp, Uravakonda>, VSP Township, Vaddeswaram>, Vavilla, Velvadam>, Venkatachalam Industrial Area, Venkatagiri>, Veparala>, Vetapalem>, Vijayanagaram District>, Vijayapuri South>, Vijayawada>, Vinnamala>, Vinukonda>, Visakhapatnam>, Vissannapet, Vizayanagaram, Vizianagaram>, Vuyyuru>, Waltair, West Godavari>, West Gudur Rural, Yelamanchili>, Yemmiganur>, Yenugonda>, Yenumalapalle, Yernagudem, Yerrabalem, Yerraguntla>, Zahirabad>",
  "Arunachal Pradesh": "Along>, Anini>, Basar>, Boleng, Bomdila>, Changlang>, Daporijo>, Deomali>, Dirang, Hawai>, Itanagar>, Jairampur>, Khonsa>, Koloriang>, Longding>, Miao>, Naharlagun>, Namsai>, Pasighat>, Roing>, Rupa, Sagalee>, Seppa>, Tawang>, Tezu>, Yingkiong, Yupia>, Ziro>",
  Assam: "Abhayapuri>, Amguri>, Anand Nagar>, Asudubi>, Azara>, BCPL Township>, Badarpur>, Badarpur Rly Town>, Baksa>, Bamun Sualkuchi>, Bandardewa IID, Bangaon>, Barbari Amc Area, Barika Chuburi, Barpathar>, Barpeta>, Barpeta Road>, Basugaon>, Behiating AIDC, Belsor>, Bhomoraguri AIDC>, Bhuragaon>, Bihpuria>, Bijni>, Bilasipara>, Biswanath Chariali>, Bohari, Bokajan, Bokakhat>, Bongaigaon>, Bongaigaon RPCL Township>, Borgolai Gt 11, Borpukhuri, Chabua>, Chalantapara Pt IV>, Chandrapur Bagicha>, Changsari>, Chapakhowa Town>, Chapar>, Charingia Gaon>, Chekonidhara>, Dahali, Dalgaon>, Damara Patpara>, Dergaon>, Dhakuakhana, Dharapur>, Dhekiajuli>, Dhekorgorha>, Dhemaji>, Dhing>, Dhubri>, Dibrugarh>, Digaru Gaon>, Digboi>, Diphu>, Dispur>, Doboka>, Dokmoka>, Donkamokam, Doom Dooma>, Dudhpatil Pt V>, Dudhpatil Pt VI, Duliajan>, Duliajan No 1>, Durga Nagar Part V>, Garal>, Gauripur>, Goalpara>, Gohpur>, Golaghat>, Golokganj>, Goreswar>, Gossaigaon>, Guwahati>, Haflong>, Hailakandi>, Hamren>, Hindustan Paper Corporation Ltd Township Area>, Hojai>, Howli>, Howraghat>, Irongmara>, Jagiroad>, Jamunamukh>, Jhagra Pt III>, Jonai Bazar>, Jorhat>, Kakaya, Kalaigaon Town Part>, Kamalabaria NC>, Kampur Town>, Kanisail Pt I, Karimganj>, Katirail TE, Khaira Bari>, Kharijapikon>, Kharupatia>, Kochpara>, Kokrajhar>, Kumar Kaibarta Gaon, Laharijan Natun Bosti>, Lakhi Nepali, Lakhipur Cachar District>, Lakhipur Goalpara District>, Lala>, Lanka>, Lido Tikok, Lido Town>, Lumding>, Lumding Rly Colony>, Mahur, Maibong>, Majarkuri, Majgaon>, Majir Gaon, Makum, Makum Tinsukia District>, Mangaldoi>, Mankachar>, Margherita>, Mariani>, Marigaon>, Marowa>, Moran Town>, Moranhat>, Mornoi Industrial Area, Mosli Pt I, Nagaon>, Naharkatiya>, Nahira>, Nakhula Grant, Nalbari>, Namrup>, Narayanpur, Narayanpur Nalbari District>, Naubaisa Gaon>, Nazira>, New Bongaigaon Railway Colony>, Niz Bahjani>, Niz Hajo>, Niz Katigorah Pt III>, North Guwahati>, North Lakhimpur>, Numaligarh Refinery Township>, Palasbari, Pathsala>, Pipalibari, Pub Dhaniram Pather>, Raha>, Rangapara>, Rangia>, Rangia IIDC, Rani>, Rupahi Town, Rupiabathan>, Salakati>, Salpara Molandubi Pt I>, Sanpara>, Sapatgram>, Sarbhog>, Sarthebari>, Sarupathar>, Sarupathar Bengali>, Sepon>, Sibsagar>, Silapathar, Silchar>, Sonapur Gaon>, Sonari>, Sualkuchi>, Takhlibilar Pathar>, Tangla>, Tegheria>, Teok, Tezpur>, Thekashu Pt I>, Thekashu Pt II>, Tihu>, Tinsukia>, Titabor Town>, Udalguri>, Umrangso>",
};

const EXTRA_STATES = [
  "Bihar", "Chandigarh", "Chhattisgarh", "Dadra & Nagar Haveli and Daman & Diu", "Delhi", "Goa", "Gujarat",
  "Haryana", "Himachal Pradesh", "Jammu & Kashmir", "Jharkhand", "Karnataka", "Kerala", "Ladakh", "Lakshadweep",
  "Madhya Pradesh", "Maharashtra", "Manipur", "Meghalaya", "Mizoram", "Nagaland", "Odisha", "Puducherry", "Punjab",
  "Rajasthan", "Sikkim", "Tamil Nadu", "Telangana", "Tripura", "Uttar Pradesh", "Uttarakhand", "West Bengal",
];

const SPECIAL: Record<string, Town[]> = {
  "Madhya Pradesh": [{ name: "Kailaras", arrow: false, district: "Morena" }],
};

export const STATES: StateEntry[] = [
  ...Object.entries(RAW).map(([name, list]) => ({ name, towns: parse(list) })),
  ...EXTRA_STATES.map((name) => ({ name, towns: SPECIAL[name] ?? [] })),
].sort((a, b) => a.name.localeCompare(b.name));

export type SearchHit = { town: string; state: string; label: string };

export function searchLocations(query: string, stateName?: string): SearchHit[] {
  const q = query.trim().toLowerCase();
  if (!q) return [];
  const hits: SearchHit[] = [];
  for (const s of STATES) {
    if (stateName && s.name !== stateName) continue;
    if (!stateName && s.name.toLowerCase().includes(q)) hits.push({ town: "", state: s.name, label: s.name });
    for (const t of s.towns) {
      if (t.name.toLowerCase().includes(q)) {
        hits.push({ town: t.name, state: s.name, label: [t.name, t.district, s.name].filter(Boolean).join(", ") });
      }
    }
  }
  return hits.slice(0, 50);
}
