import { ProcfuShow } from './model/procfu-show';

const putShows = async (bucket: R2Bucket, shows: ProcfuShow[]): Promise<R2Object | null> => {
	const showsSerialized = JSON.stringify(shows);
	return await bucket.put(`shows`, showsSerialized);
};

export { putShows };
