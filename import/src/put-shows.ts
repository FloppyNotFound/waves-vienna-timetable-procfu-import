import { Show } from '../../shared/model/show';

const putShows = async (bucket: R2Bucket, shows: Show[]): Promise<R2Object | null> => {
	const showsSerialized = JSON.stringify(shows);

	return await bucket.put(`shows`, showsSerialized);
};

export { putShows };
