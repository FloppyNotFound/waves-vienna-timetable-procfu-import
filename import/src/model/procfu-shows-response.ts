import { ProcfuShow } from './procfu-show';

export interface ProcfuShowsResponse {
	shows_timetable: ProcfuShowsInner;
}

interface ProcfuShowsInner {
	shows_timetable: ProcfuShow[];
}
