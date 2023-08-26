import { Show } from '../../shared/model/show';

const getShows = async (bucket: R2Bucket): Promise<Show[] | null> => {
	const showsResponse = await bucket.get('shows');

	if (!showsResponse) return null;

	const data = await showsResponse.json<Show[]>();

	return data;
};

export { getShows };
