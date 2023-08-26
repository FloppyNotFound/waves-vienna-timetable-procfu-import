import { Show } from '../../shared/model/show';
import { ProcfuShow } from './model/procfu-show';

export const toShows = (procfuShows: ProcfuShow[]): Show[] => {
	return [...procfuShows].map((show) => toShow(show)).sort((a, b) => new Date(a.start).getTime() - new Date(b.start).getTime());
};

const toShow = (procfuShow: ProcfuShow): Show => {
	const dates = toStartAndEndDate(procfuShow.timing);

	return <Show>{
		id: procfuShow.piid_act,
		artistName: procfuShow.name,
		start: dates[0],
		end: dates[1],
		venue: procfuShow.venue,
		showcase: procfuShow.part,
	};
};

/**
 *
 * @param input Format: '07.09. 19:15 - 04:00 (Thu)'
 * @returns Start date, End date
 */
const toStartAndEndDate = (input: string): [string, string] => {
	let [datePortion, timePortion] = input.split(' - ');

	// Step 2: Remove leading and trailing spaces
	datePortion = datePortion.trim();
	timePortion = timePortion.trim();

	// Step 3: Split the date and time
	const [startDate, startTime] = datePortion.split(' ');
	const [endTime] = timePortion.split(' ');
	const [startTimeHour, startTimeMinutes] = startTime.split(':');
	const startTimeHourUtc = Number(startTimeHour) - 2;

	const [endTimeHour, endTimeMinutes] = endTime.split(':');
	const endTimeHourUtc = Number(endTimeHour) - 2;

	// Step 4: Extract day, month, and time
	const [startDay, startMonth] = startDate.split('.');

	// Step 5: Create new date objects for the current year
	const currentYear = new Date().getFullYear();

	const startDateObj = new Date(currentYear, Number(startMonth) - 1, Number(startDay), startTimeHourUtc, Number(startTimeMinutes));

	// End date: go up one day in case it is past midnight
	const endMonth = startMonth;
	let endDay = Number(startDay);
	if (Number(startTimeHourUtc) > Number(endTimeHourUtc)) {
		endDay++;
	}

	const endDateObj = new Date(currentYear, Number(endMonth) - 1, endDay, endTimeHourUtc, Number(endTimeMinutes));

	// Step 6: Convert to UTC if needed
	let startUTC = startDateObj.toISOString();
	let endUTC = endDateObj.toISOString();

	return [startUTC, endUTC];
};
