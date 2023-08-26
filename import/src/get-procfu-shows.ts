import { ProcfuShow } from './model/procfu-show';
import { ProcfuShowsResponse } from './model/procfu-shows-response';

const getProcfuShows = async (): Promise<ProcfuShow[]> => {
	const showsUrl = 'https://procfu.com/waves-2023-shows';

	const res = await fetch(showsUrl, {
		method: 'GET',
		headers: {
			// Fool Procfu Bot Detection by setting Host and User-Agent
			Host: 'procfu.com',
			'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:109.0) Gecko/20100101 Firefox/116.0',
		},
	});

	if (!res.ok) {
		throw Error(`could not fetch data from procfu`);
	}

	const html = await res.text();

	const jsonStartStr = `window["my_pf_variables"] = `;
	const jsonStartIndex = html.indexOf(jsonStartStr) + jsonStartStr.length;

	const jsonEndStr = `}]}}`;
	const jsonEndIndex = html.indexOf(jsonEndStr) + jsonEndStr.length;

	const jsonStr = html.substring(jsonStartIndex, jsonEndIndex);
	const json = <ProcfuShowsResponse>JSON.parse(jsonStr);

	const shows = json.shows_timetable.shows_timetable;

	return shows;
};

export { getProcfuShows as getShows };
