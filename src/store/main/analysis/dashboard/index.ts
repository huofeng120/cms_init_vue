import { defineStore } from 'pinia';
import { getAmountListData } from '@/api/main/analysis/dashboard';

interface IAmountListData {
	amount: string;
	title: string;
	tips: string;
	subtitle: string;
	number1: number;
	number2: number;
}
interface IState {
	amountListData: IAmountListData[];
}
const useDashboardStore = defineStore('dashboard', {
	state: (): IState => ({
		amountListData: []
	}),
	actions: {
		async fetchAmountListData() {
			const res = await getAmountListData();
			this.amountListData = res.data;
		}
	}
});
export default useDashboardStore;
