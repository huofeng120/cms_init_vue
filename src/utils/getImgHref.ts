export function getImgHref(img: string) {
	const imgUrl = new URL('../assets/img/' + img, import.meta.url);
	console.log('imgUrl::', imgUrl);
	return imgUrl.href;
}
