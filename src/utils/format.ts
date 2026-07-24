import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
dayjs.extend(utc);

/**
 * 格式化UTC时间
 * @param utcString utc时间
 * @param format 时间格式
 * @returns 格式化后的时间字符串
 */
export function formatUTC(utcString: string, format: string = 'YYYY-MM-DD HH:mm:ss') {
	// 默认UTC时间转为北京时间，即东八区时间
	const returnDate = dayjs.utc(utcString).utcOffset(8).format(format);
	return returnDate;
}
