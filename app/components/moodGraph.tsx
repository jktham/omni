import { CategoryScale, Chart as ChartJS, LinearScale, LineElement, PointElement, Title, Tooltip } from "chart.js/auto";
import { Chart } from "react-chartjs-2";
import { type Data } from "~/lib/data";
import { dateOffset, dateToString, listDates, stringToDate } from "~/lib/date";
import "~/styles/moodGraph.css";
import Icon from "./icon";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import 'chartjs-adapter-date-fns';

ChartJS.register(
	CategoryScale,
	LinearScale,
	PointElement,
	LineElement,
	Title,
	Tooltip,
);

export default function MoodGraph({data, theme}: {data: Data; theme: string[]}) {
	const navigate = useNavigate();

	const cycleRange = (r: number) => {
		if (r == 0) {
			setRange(7);
		} else if (r == 7) {
			setRange(31);
		} else if (r == 31) {
			setRange(365);
		} else {
			setRange(0);
		}
	};

	const rangeLetter = (r: number) => {
		if (r == 7) {
			return "W";
		} else if (r == 31) {
			return "M";
		} else if (r == 365) {
			return "Y";
		} else {
			return "A";
		}
	};

	const [dates, setDates] = useState<string[]>([]);
	const [moods, setMoods] = useState<(number|null)[]>([]);
	const [range, setRange] = useState<number>(31);
	const [offset, setOffset] = useState<number>(0);
	const [avgMoods, setAvgMoods] = useState<(number|null)[]>([]);
	const [disablePrev, setDisablePrev] = useState<boolean>(false);
	const [disableNext, setDisableNext] = useState<boolean>(false);

	useEffect(() => {
		const end = new Date();
		end.setHours(0, 0, 0, 0);
		end.setDate(end.getDate()+offset)
		const start = new Date();
		start.setHours(0, 0, 0, 0);
		start.setDate(start.getDate()+offset-range);

		const sortedKeys = Array.from(data.keys()).sort((a, b) => a.localeCompare(b));
		let dates = [];
		if (range == 0) {
			const full = sortedKeys.length > 0 ? listDates(sortedKeys[0], dateOffset(sortedKeys[sortedKeys.length-1], 1)) : [];
			dates = full;
		} else {
			dates = listDates(dateToString(start), dateOffset(dateToString(end), 1));
			dates = dates.filter((d) => stringToDate(d) <= end && stringToDate(d) > start);
		}

		const moods = [];
		for (const date of dates) {
			moods.push(data.get(date)?.mood || null);
		}

		const avgWindow = 7;
		const avgMoods = [];
		const last = sortedKeys[sortedKeys.length-1] || dateToString(new Date());
		const first = sortedKeys[0] || dateToString(new Date());
		for (let i=0; i<dates.length; i++) {
			let sum = 0;
			let count = 0;
			for (let j=0; j<avgWindow; j++) {
				const m = data.get(dateOffset(dates[i], -j))?.mood || 0;
				if (m != 0) {
					count += 1;
					sum += m;
				}
			}
			
			if (count == 0 || sum == 0 || dates[i].localeCompare(last) > 0 || !data.get(dates[i])?.mood) {
				avgMoods.push(null);
			} else {
				avgMoods.push(sum / count);
			}
		}

		setDates(dates);
		setMoods(moods);
		setAvgMoods(avgMoods);

		const now = new Date();
		now.setHours(0, 0, 0, 0);
		setDisablePrev(range == 0 || start < stringToDate(first));
		setDisableNext(now <= end)
	}, [data, range, offset]);

	return (
		<div className="moodGraph">
			<div className="controls">
				<div className="graphTitle">Mood</div>
				<button className="btn graphButton" onClick={() => setOffset(offset - range)} disabled={disablePrev}><Icon>chevron_left</Icon></button>
				<button className="btn graphButton" onClick={() => setOffset(offset + range)} disabled={disableNext}><Icon>chevron_right</Icon></button>
				<button className="btn graphButton" onClick={() => {cycleRange(range); setOffset(0)}}>{rangeLetter(range)}</button>
			</div>
			<Chart className="chart"
				type="line"
				data={{
					labels: dates,
					datasets: [{
						label: "Mood",
						data: moods.map((m, i) => {return {x: stringToDate(dates[i]).getTime(), y: m}}),
						borderWidth: 0,
						spanGaps: true,
						pointBackgroundColor: (ctx) => {
							const d = ctx.dataset.data[ctx.dataIndex];
							if (typeof d != "number") {
								return theme[Number(d?.y) - 1];
							}
						},
						showLine: false,
						pointRadius: 4,
						pointHoverRadius: 5,
						
					}, {
						label: "7d avg",
						data: avgMoods.map((m, i) => {return {x: stringToDate(dates[i]).getTime(), y: m}}),
						borderWidth: 1,
						spanGaps: false,
						showLine: true,
						pointStyle: false,
						borderDash: [2],
						order: -1,
					}]
				}}
				options={{
					color: "#ffffff",
					borderColor: "#ffffff",
					scales: {
						x: {
							type: "time",
							time: {
								unit: range == 0 ? "year" : range == 7 ? "day" : "month",
								tooltipFormat: "yyyy-MM-dd",
								isoWeekday: true,
							},
							ticks: {
								color: "#ffffff",
								display: true,
							},
							grid: {
								display: true,
								color: (ctx, options) => {
									return new Date(ctx?.tick?.value).getDate() == 1 ? "#202020" : "#000000";
								},
							}
						},
						y: {
							ticks: {
								color: "#ffffff",
								stepSize: 1,
							},
							grid: {
								color: theme,
							},
							suggestedMin: 1,
							suggestedMax: 5,
						}
					},
					responsive: true,
					maintainAspectRatio: true,
					aspectRatio: 1.6,
					plugins: {
						legend: {
							display: false,
						}
					},
					animation: false,
					onClick(event, elements, chart) {
						for (let e of elements) {
							if (e?.datasetIndex == 0) {
								navigate(`/edit/${dates[elements[0].index]}`);
							}
						}
					},
				}}
			/>
		</div>
	);
}
