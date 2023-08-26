const putShows = async (bucket: R2Bucket, jsonResp: string): Promise<R2Object | null> => {
	return await bucket.put(`shows`, jsonResp);
};

export { putShows };
