import git from "simple-git/promise";
import * as Sentry from "@sentry/electron";

const log = async (repository, params) => {
	const data = await git(repository.path).log(params);
	try {
		return data.all;
	} catch (error) {
		Sentry.captureException(error);
		let errorMessage = "Unable to fetch logs.";
		console.log(errorMessage);
		Sentry.captureMessage(errorMessage, data);
	}
};

export default log;
