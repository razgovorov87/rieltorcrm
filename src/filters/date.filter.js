export default function dateFilter(value, format = 'date') {
	const options = {};

	if (format.includes('monthDay')) {
		options.month = 'short';
		options.day = '2-digit';
	}

	if (format.includes('fullmonthDay')) {
		options.month = 'long';
		options.day = '2-digit';
	}

	if (format.includes('fullmonthDayAndYear')) {
		options.month = 'long';
		options.day = '2-digit';
		options.year = 'numeric';
	}

	if (format.includes('tableGroupDate_Date')) {
		options.month = 'short';
		options.day = '2-digit';
		options.year = 'numeric';
	}

	if (format.includes('tableGroupDate_Time')) {
		options.hour = '2-digit';
		options.minute = '2-digit';
	}

	if (format.includes('fullmonthDayPlusTime')) {
		options.month = 'long';
		options.day = '2-digit';
		options.year = 'numeric';
		options.hour = '2-digit';
		options.minute = '2-digit';
	}

	return Intl.DateTimeFormat('ru-RU', options).format(new Date(value));
}
