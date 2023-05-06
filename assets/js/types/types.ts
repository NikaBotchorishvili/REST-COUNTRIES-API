type language = Record<string, string>
type currency = Record<string, {name: string, symbol: "string"}>

export type dataType = {
	altSpellings: string[];
	area: number;
	borders: string[];
	capital: string[];
	capitalInfo: { latlng: number[] };
	car: { side: string; signs: string[] };
	cca2: string;
	cca3: string;
	ccn3: string;
	cioc: string;
	coatOfArms: { png: string; svg: string };
	continents: string[];
	fifa: string;
	flag: string;
	flags: { png: string; svg: string; alt: string };
	independent: boolean;
	landlocked: boolean;
	name: { common: string; official: string };
	population: number;
	region: string;
	startOfWeek: string;
	status: string;
	subregion: string;
	timezones: string[];
	tld: string[];
	unMember: boolean;
	languages: language[]
	currencies: currency[]
};