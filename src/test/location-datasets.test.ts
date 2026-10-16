import { describe, expect, it } from "vitest";
import { STATES, searchLocations } from "@/data/locations";

const names = (value: string) => value.split(",").map((name) => name.trim());
const towns = (state: string) => {
  const entry = STATES.find((entry) => entry.name === state);
  if (!entry) throw new Error(`Missing state: ${state}`);
  return entry.towns;
};

describe("Supplied location datasets", () => {
  it("includes all five states once and separates the two territories", () => {
    for (const state of ["Bihar", "Chandigarh", "Chhattisgarh", "Dadra & Nagar Haveli", "Daman & Diu"]) {
      expect(STATES.filter((entry) => entry.name === state)).toHaveLength(1);
    }
    expect(STATES.some((entry) => entry.name === "Dadra & Nagar Haveli and Daman & Diu")).toBe(false);
    expect(STATES.map((entry) => entry.name)).toEqual(STATES.map((entry) => entry.name).sort((a, b) => a.localeCompare(b)));
  });

  it("preserves every Bihar town in supplied order, including both Nawada entries", () => {
    expect(towns("Bihar").map((town) => town.name)).toEqual(names("Amarpur, Anwari, Ara, Araria, Areraj, Arwal, Asarganj, Aurangabad, Bagaha, Bahadurganj, Bairgania, Bakhri, Bakhtiyarpur, Balia, Banka, Banmankhi Bazar, Bara, Barahiya, Barauli, Barauni IOC Township, Barauni Thermal Power Station Township, Barbigha, Barh, Baruni, Begusarai, Behea, Belsand, Benipur, Bettiah, Bhabua, Bhagalpur, Bhagirathpur, Bihar, Bihta, Bihta Patna District, Bikram, Bikramganj, Birpur, Bodh Gaya, Buxar, Chakia, Chanari, Chanpatia, Chapra, Dalsinghsarai, Darbhanga, Daudnagar, Dehri, Dhaka, Dighwara, Dinapur Nizamat, Dumraon, Ekangar Sarai, Fatwah, Forbesganj, Gaya, Gazipur, Ghoghardiha, Gogri Jamalpur, Gopalganj, Habibpur, Hajipur, Hanspura, Harnaut, Hathua, Hilsa, Hisua, Islampur, Jagdishpur, Jainagar, Jamalpur, Jamui, Janakpur Road, Janpur, Jehanabad, Jhajha, Jhanjharpur, Jogabani, Kahalgaon, Kaimur, Kanti, Kargahia Purab, Kasba, Kataiya, Katihar, Kesaria, Khagaria, Kharagpur, Khusrupur, Kishanganj, Koath, Koilwar, Kumarbagh, Lakhisarai, Lalganj, Laruara, Madhepura, Madhuban, Madhubani, Maharajganj, Mahnar Bazar, Mairwa, Makhdumpur, Malhipur, Maner, Manihari, Mansur Chak, Marhaura, Masaurhi, Mathurapur, Mehsi, Mirganj, Mohiuddinagar, Mokama, Mokameh, Motihari, Motipur, Munger, Murliganj, Muzaffarpur, NTPC Barh Township, Nabinagar, Nalanda, Narkatiaganj, Nasrigagnj, Naubatpur, Naugachhia, Nawada, Nawada, Nirmali, Nokha, Obra, Padri, Pakri Dayal, Pandual, Pareo, Paria, Patna, Phulwari Sharif, Piro, Puraini, Purnia, Rafiganj, Raghunathpur, Rajauli, Rajgir, Ramgarh, Ramnagar, Raxaul Bazar, Revelganj, Rosera, Saharsa, Sahebganj, Samastipur, Sanrha, Saraiya, Sasaram, Satghara, Shahpur, Sheikhpura, Sheohar, Sherghati, Silao, Singhesar Asthan, Sitamarhi, Siwan, Sonepur, Sugauli, Sultanganj, Supaul, Teghra, Telkap, Thakurganj, Tikari, Tola Baliadih, Tola Chain, Tola Mansaraut, Tola Pairamatihana, Vaishali, Warisaliganj"));
  });

  it("preserves Bihar's exact arrow exceptions and distinct Nawada flags", () => {
    expect(towns("Bihar").filter((town) => !town.arrow).map((town) => town.name)).toEqual(names("Habibpur, Janpur, Kanti, Khusrupur, Koath, Kumarbagh, Laruara, Madhuban, Marhaura, Mathurapur, Mokama, Nalanda, Nawada, Pareo, Sanrha, Saraiya, Satghara, Tola Baliadih, Tola Chain, Tola Pairamatihana"));
    expect(towns("Bihar").filter((town) => town.name === "Nawada").map((town) => town.arrow)).toEqual([true, false]);
  });

  it("preserves the complete Chandigarh order without naturally sorting sectors", () => {
    expect(towns("Chandigarh").map((town) => town.name)).toEqual(names("Bair Majra, Behlana, Chandigarh Airport Area, Dadu Majra, Daria, Dhanas, Hallo Majra, Industrial Area, Kaimbwala, Khuda Alisher, Khuda Jassu, Lahora, Maloha, Mani Majra, Mauli Jagran, New Chandigarh, Railway Colony, Raipur Kalan, Rajpur Khurd, Sarangpur, Sector 1, Sector 10, Sector 10B, Sector 10C, Sector 10D, Sector 11A, Sector 11B, Sector 11C, Sector 11D, Sector 12, Sector 14, Sector 15A, Sector 15B, Sector 15C, Sector 15D, Sector 16A, Sector 16B, Sector 16C, Sector 16D, Sector 17A, Sector 17B, Sector 17C, Sector 17D, Sector 17E, Sector 17F, Sector 18A, Sector 18B, Sector 18C, Sector 18D, Sector 19A, Sector 19B, Sector 19C, Sector 19D, Sector 20A, Sector 20B, Sector 20C, Sector 20D, Sector 21A, Sector 21B, Sector 21C, Sector 21D, Sector 22A, Sector 22B, Sector 22C, Sector 22D, Sector 23A, Sector 23B, Sector 23C, Sector 23D, Sector 24A, Sector 24B, Sector 24C, Sector 24D, Sector 25, Sector 25 West, Sector 26, Sector 26 East, Sector 26 East Extension, Sector 27A, Sector 27B, Sector 27C, Sector 27D, Sector 28A, Sector 28B, Sector 28C, Sector 28D, Sector 29A, Sector 29B, Sector 29C, Sector 29D, Sector 2A, Sector 2B, Sector 3, Sector 30A, Sector 30B, Sector 30C, Sector 30D, Sector 31A, Sector 31B, Sector 31C, Sector 31D, Sector 32A, Sector 32B, Sector 32C, Sector 32D, Sector 33A, Sector 33B, Sector 33C, Sector 33D, Sector 34A, Sector 34B, Sector 34C, Sector 34D, Sector 35A, Sector 35B, Sector 35C, Sector 35D, Sector 36A, Sector 36B, Sector 36C, Sector 36D, Sector 37A, Sector 37B, Sector 37C, Sector 37D, Sector 38 West, Sector 38A, Sector 38B, Sector 38C, Sector 38D, Sector 39 West, Sector 39A, Sector 39B, Sector 39C, Sector 39D, Sector 40A, Sector 40B, Sector 40C, Sector 40D, Sector 41A, Sector 41B, Sector 41C, Sector 41D, Sector 42 Attawa Village, Sector 42A, Sector 42B, Sector 42C, Sector 42D, Sector 43, Sector 44A, Sector 44B, Sector 44C, Sector 44D, Sector 45 Burail Village, Sector 45A, Sector 45B, Sector 45C, Sector 45D, Sector 46A, Sector 46B, Sector 46C, Sector 46D, Sector 47A, Sector 47B, Sector 47C, Sector 47D, Sector 48, Sector 49 Sai Enclave, Sector 49A, Sector 49B, Sector 4A, Sector 4B, Sector 50, Sector 51, Sector 52, Sector 53, Sector 54, Sector 55, Sector 56, Sector 5A, Sector 5B, Sector 6, Sector 61, Sector 7A, Sector 7B, Sector 7C, Sector 8A, Sector 8B, Sector 8C, Sector 9A, Sector 9B, Sector 9C, Sector 9D, Shivalik Enclave"));
  });

  it("uses locality selection for Chandigarh and disables every locality arrow", () => {
    expect(STATES.find((entry) => entry.name === "Chandigarh")?.selectionHeading).toBe("CHOOSE LOCALITY");
    expect(towns("Chandigarh").every((town) => town.arrow === false)).toBe(true);
  });

  it("preserves every Chhattisgarh town in supplied order", () => {
    expect(towns("Chhattisgarh").map((town) => town.name)).toEqual(names("Aamdi, Abhanpur, Adawal, Adbhar, Ahiwara, Akaltara, Ambagarh Chowki, Ambikapur, Antagarh, Arang, Arjunda, Bade Bacheli, Badla, Bagbahara, Bagicha, Baikunthpur, Balod, Baloda, Baloda Bazar, Balrampur, Banarsi, Banki Mongra, Baramkela, Barsur, Basantpur, Basna, Bastar, Bemetra, Berla, Bhairamgarh, Bhakhara, Bhanupratappur, Bhatapara, Bhatgaon, Bhatgaon Surguja District, Bhilai, Bhilai Charoda, Bhopalpattanam, Bijapur, Bilaigarh, Bilaspur, Bilha, Birkoni IIDC, Bodri, Borai CSIDC, Century Cement Baikunth, Champa, Chandrapur, Charama, Chharchha, Chhuikhadan, Chhura, Chhurikala, Chhuriya Kalan, Chikhal Kasa, Chikhal Kasa Rajnandgaon District, Chirmiri, Dabhra, Dalli-Rajhara, Dantewada, Daundi Lohara, Deori, Devkar, Dhamdha, Dhamtari, Dharamjaigarh, Dipka, Dongargaon, Dongargarh, Dornapal, Doundi, Durg, Durg-Bhilainagar, Farasgaon, Fingeshwar, Gandai, Gariaband, Gaurela, Gharghoda, Gidam, Girwarganj IIDC, Gobra Nawapara, Govindapur, Gunderdehi, Gurur, Hirmi, Jagdalpur, Jaijepur, Janjgir, Jarhi, Jashpurnagar, Jhagrakhand, Kanker, Kasdol, Katghora, Katkona, Kawardha, Keskal, Khairagarh, Khamharia, Kharod, Kharora, Kharsia, Khongapani, Kirandul, Kondagaon, Koni, Konta, Koora, Korba, Kota, Kotba, Kumhari, Kunkuri, Kurasia, Kurud, Kusmi, Lafarge Cement Factory Arasmeta, Lafarge Cement Factory Sonadhi, Lailunga, Lakhnapur, Lawan, Lormi, Magarlod, Mahasamund, Mahendragarh, Malhar, Mandhar Industrial Area, Mandir Hasaud, Maro, Mehmand, Mungeli, NTPC Sipat Township, Nagari, Nai Ledri, Namna Kalan, Narayanpur, Narharpur, Nawagarh, Nawagarh Janjgir, Naya Baradwar, New Raipur, Pakhanjur, Palari, Pali, Pandaria, Pandatarai, Paratappur, Parpodi, Patan, Pathalgaon, Patharia, Pendra Road, Phunderdihari, Pipariya, Pithora, Premnagar, Pusaur, Rahaud, Raigarh, Raipur, Rajgamar, Rajnandgaon, Rajpur, Ramanujganj, Rani Durgavati Industrial Area Anjani, Ratanpur, Rawan Ambuja Cement Plant, Sahaspur Lohara, Saja, Sakari, Sakti, Saragaon, Saraipali, Sarangarh, Sargaon, Sariya, Sheorinarayan, Silpahari Industrial Area, Simga, Sirgitti, Sitapur, Sukma, Surajpur, Takhatpur, Telgaon, Tendua IID, Tifra, Tilda, Tumgaon, Tundra, Ultratech Cement Plant Rawan, Utai, Vishrampur, Vishrampuri, Wadrafnagar"));
  });

  it("preserves every Chhattisgarh arrow exception", () => {
    expect(towns("Chhattisgarh").filter((town) => !town.arrow).map((town) => town.name)).toEqual(names("Adbhar, Badla, Bagicha, Baloda, Basantpur, Berla, Bhatgaon Surguja District, Bhilai Charoda, Chandrapur, Charama, Deori, Dornapal, Doundi, Gidam, Govindapur, Jaijepur, Katkona, Khamharia, Kharod, Kumhari, Lailunga, Nai Ledri, Narharpur, Nawagarh, Palari, Patan, Pipariya, Premnagar, Rahaud, Rani Durgavati Industrial Area Anjani, Sakari, Saragaon, Tundra, Ultratech Cement Plant Rawan, Vishrampuri"));
  });

  it("preserves Dadra & Nagar Haveli towns and arrow flags", () => {
    expect(towns("Dadra & Nagar Haveli")).toEqual([
      { name: "Alok City", arrow: true }, { name: "Dadra", arrow: false },
      { name: "Dungra", arrow: true }, { name: "Masat Industrial Area", arrow: true },
      { name: "Naroli", arrow: true }, { name: "Silvassa", arrow: true },
    ]);
  });

  it("preserves Daman & Diu towns and arrow flags", () => {
    expect(towns("Daman & Diu")).toEqual([
      { name: "Dadhel", arrow: true }, { name: "Daman", arrow: true },
      { name: "Diu", arrow: true }, { name: "Ghoghla", arrow: true },
      { name: "Kachigam", arrow: true },
    ]);
  });

  it("finds entries in every new dataset and scopes searches to a selected state", () => {
    for (const [query, state] of [["Patna", "Bihar"], ["Sector 10B", "Chandigarh"], ["Raipur", "Chhattisgarh"], ["Silvassa", "Dadra & Nagar Haveli"], ["Kachigam", "Daman & Diu"]]) {
      expect(searchLocations(query, state)).toContainEqual({ town: query, state, label: `${query}, ${state}` });
      expect(searchLocations(query, state).every((hit) => hit.state === state)).toBe(true);
    }
    expect(searchLocations("Nawada", "Bihar")).toHaveLength(2);
  });
});