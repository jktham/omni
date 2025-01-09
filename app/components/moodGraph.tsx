import { CategoryScale, Chart as ChartJS, LinearScale, LineElement, PointElement, Title, Tooltip } from "chart.js/auto";
import { Chart } from "react-chartjs-2";
import { type Data } from "~/lib/data";
import { dateOffset, dateToString, listDates, stringToDate } from "~/lib/date";
import "~/styles/moodGraph.css";
import Icon from "./icon";
import { useEffect, useState } from "react";

ChartJS.register(
	CategoryScale,
	LinearScale,
	PointElement,
	LineElement,
	Title,
	Tooltip,
);

export default function MoodGraph({data, theme}: {data: Data; theme: string[]}) {
	const cycleRange = () => {
		if (range == 0) {
			setRange(7);
		} else if (range == 7) {
			setRange(31);
		} else if (range == 31) {
			setRange(365);
		} else {
			setRange(0);
		}
	};

	const [dates, setDates] = useState<string[]>([]);
	const [ratings, setRatings] = useState<(number|null)[]>([]);
	const [range, setRange] = useState<number>(31);
	const [offset, setOffset] = useState<number>(0);

	useEffect(() => {
		const end = new Date();
		end.setDate(end.getDate()+offset)
		const start = new Date();
		start.setDate(start.getDate()+offset-range);


		let dates = [];
		if (range == 0) {
			const sortedKeys = Array.from(data.keys()).sort((a, b) => a.localeCompare(b));
			const full = sortedKeys.length > 0 ? listDates(sortedKeys[0], dateOffset(sortedKeys[sortedKeys.length-1], 1)) : [];
			dates = full;
		} else {
			dates = listDates(dateToString(start), dateOffset(dateToString(end), 1));
			dates = dates.filter((d) => stringToDate(d) <= end && stringToDate(d) >= start);
		}

		const ratings = [];
		for (const date of dates) {
			ratings.push(data.get(date)?.rating || null);
		}
		setDates(dates);
		setRatings(ratings);
	}, [data, range, offset]);

	return (
		<div className="moodGraph">
			<div className="controls">
				<div className="graphTitle">Mood</div>
				<button className="btn graphButton" onClick={() => setOffset(offset - range)}><Icon>arrow_back_ios</Icon></button>
				<button className="btn graphButton" onClick={() => setOffset(offset + range)}><Icon>arrow_forward_ios</Icon></button>
				<button className="btn graphButton" onClick={() => {cycleRange(); setOffset(0)}}>{range}</button>
			</div>
			<Chart className="chart"
				type="line"
				data={{
					labels: dates,
					datasets: [{
						label: "Mood",
						data: ratings,
						borderWidth: 1,
						spanGaps: true,
						cubicInterpolationMode: "default",
						pointBackgroundColor: (ctx) => {
							return theme[Number(ctx.dataset.data[ctx.dataIndex]) - 1];
						},
					}]
				}}
				options={{
					color: "#ffffff",
					borderColor: "#ffffff",
					scales: {
						x: {
							ticks: {
								color: "#ffffff",
								maxRotation: 30,
								minRotation: 30,
								display: true,
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
				}}
			/>
		</div>
	);
}
