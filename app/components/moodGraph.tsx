import { CategoryScale, Chart as ChartJS, LinearScale, LineElement, PointElement, Title, Tooltip } from "chart.js/auto";
import { Chart } from "react-chartjs-2";
import { Data } from "~/lib/data";
import { dateOffset, listDates } from "~/lib/date";
import "~/styles/moodGraph.css";

ChartJS.register(
	CategoryScale,
	LinearScale,
	PointElement,
	LineElement,
	Title,
	Tooltip,
);

export default function MoodGraph({data, theme}: {data: Data; theme: string[]}) {
	const sortedKeys = Array.from(data.keys()).sort((a, b) => a.localeCompare(b));
	const dates = sortedKeys.length > 0 ? listDates(sortedKeys[0], dateOffset(sortedKeys[sortedKeys.length-1], 1)) : [];
	const ratings = [];
	for (const date of dates) {
		ratings.push(data.get(date)?.rating || null);
	}

	return (
		<div className="moodGraph">
			<Chart 
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
								maxTicksLimit: 20,
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
					}
				}}
			/>
		</div>
	);
}
