import { Show } from '../../shared/model/show';
import { ProcfuShow } from './model/procfu-show';

export const toShows = (procfuShows: ProcfuShow[]): Show[] => {
	return [...procfuShows].map((show) => toShow(show));
};

const toShow = (procfuShow: ProcfuShow): Show => {
	return <Show>{
		id: procfuShow.piid_act,
		artistName: procfuShow.name,
	};
};
