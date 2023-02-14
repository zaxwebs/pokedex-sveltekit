import { author } from '../../stores';

export const load = () => {
	console.log('Loading')
	author.update((name) => '@zaxwebs');
}