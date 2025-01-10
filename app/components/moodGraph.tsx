import { CategoryScale, Chart as ChartJS, LinearScale, LineElement, PointElement, Title, Tooltip } from "chart.js/auto";
import { Chart } from "react-chartjs-2";
import { type Data } from "~/lib/data";
import { dateOffset, dateToString, listDates, stringToDate } from "~/lib/date";
import "~/styles/moodGraph.css";
import Icon from "./icon";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";

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

	useEffect(() => {
		const end = new Date();
		end.setDate(end.getDate()+offset)
		const start = new Date();
		start.setDate(start.getDate()+offset-range);

		const sortedKeys = Array.from(data.keys()).sort((a, b) => a.localeCompare(b));
		let dates = [];
		if (range == 0) {
			const full = sortedKeys.length > 0 ? listDates(sortedKeys[0], dateOffset(sortedKeys[sortedKeys.length-1], 1)) : [];
			dates = full;
		} else {
			dates = listDates(dateToString(start), dateOffset(dateToString(end), 1));
			dates = dates.filter((d) => stringToDate(d) <= end && stringToDate(d) >= start);
		}

		const moods = [];
		for (const date of dates) {
			moods.push(data.get(date)?.mood || null);
		}

		const avgWindow = 7;
		const avgMoods = [];
		const last = sortedKeys[sortedKeys.length-1];
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
			
			if (count == 0 || sum == 0 || dates[i].localeCompare(last) > 0) {
				avgMoods.push(null);
			} else {
				avgMoods.push(sum / count);
			}
		}

		setDates(dates);
		setMoods(moods);
		setAvgMoods(avgMoods);
	}, [data, range, offset]);

	return (
		<div className="moodGraph">
			<div className="controls">
				<div className="graphTitle">Mood</div>
				<button className="btn graphButton" onClick={() => setOffset(offset - range)}><Icon>chevron_left</Icon></button>
				<button className="btn graphButton" onClick={() => setOffset(offset + range)}><Icon>chevron_right</Icon></button>
				<button className="btn graphButton" onClick={() => {cycleRange(range); setOffset(0)}}>{rangeLetter(range)}</button>
			</div>
			<Chart className="chart"
				type="line"
				data={{
					labels: dates,
					datasets: [{
						label: "Mood",
						data: moods,
						borderWidth: 0,
						spanGaps: true,
						pointBackgroundColor: (ctx) => {
							return theme[Number(ctx.dataset.data[ctx.dataIndex]) - 1];
						},
						showLine: false,
						pointRadius: 4,
						pointHoverRadius: 5,
						
					}, {
						label: "Past week avg",
						data: avgMoods,
						borderWidth: 1,
						spanGaps: true,
						showLine: true,
						pointStyle: false,
						borderDash: [2],
					}]
				}}
				options={{
					color: "#ffffff",
					borderColor: "#ffffff",
					scales: {
						x: {
							ticks: {
								color: "#ffffff",
								maxRotation: 40,
								minRotation: 40,
								display: true,
								labelOffset: 10,
								autoSkipPadding: 10,
							},
							grid: {
								display: false,
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
					maintainAspectRatio: false,
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
