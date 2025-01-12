import { BarElement, CategoryScale, Chart as ChartJS, LinearScale, LineElement, PointElement, Title, Tooltip } from "chart.js/auto";
import { Chart } from "react-chartjs-2";
import { type Data } from "~/lib/data";
import { dateOffset, dateToString, listDates, stringToDate } from "~/lib/date";
import "~/styles/tagsGraph.css";
import Icon from "./icon";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";

ChartJS.register(
	CategoryScale,
	LinearScale,
	BarElement,
	Title,
	Tooltip,
);

export default function TagsGraph({data, theme}: {data: Data; theme: string[]}) {
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
	const [uniqueTagNames, setUniqueTagNames] = useState<string[]>([])
	const [tagName, setTagName] = useState<string>("");
	const [tagValues, setTagValues] = useState<(number|null)[]>([]);
	const [range, setRange] = useState<number>(31);
	const [offset, setOffset] = useState<number>(0);
	const [disablePrev, setDisablePrev] = useState<boolean>(false);
	const [disableNext, setDisableNext] = useState<boolean>(false);

	useEffect(() => {
		const uniqueTagNames = Array.from(new Set(Array.from(data.values()).map((entry) => {
			return entry.tags.map((t) => t.name);
		}).flat())).sort();
		setUniqueTagNames(uniqueTagNames);
		setTagName(uniqueTagNames[0])

	}, [data]);

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

		const last = sortedKeys[sortedKeys.length-1] || dateToString(new Date());
		const first = sortedKeys[0] || dateToString(new Date());

		const tagValues = [];
		for (const date of dates) {
			const t = data.get(date)?.tags?.find((t) => t.name == tagName);
			if (!t) {
				tagValues.push(null);
			} else {
				tagValues.push(t.value ?? 1);
			}
		}

		setDates(dates);
		setTagValues(tagValues);

		const now = new Date();
		now.setHours(0, 0, 0, 0);
		setDisablePrev(range == 0 || start < stringToDate(first));
		setDisableNext(now <= end)
	}, [data, range, offset, tagName]);


	return (
		<div className="tagsGraph">
			<div className="controls">
				<select className="graphSelect" value={tagName} onChange={(e) => setTagName(e.target.value)}>
					{uniqueTagNames.map((n) => <option value={n} key={n}>{n}</option>)}
				</select>
				<button className="btn graphButton" onClick={() => setOffset(offset - range)} disabled={disablePrev}><Icon>chevron_left</Icon></button>
				<button className="btn graphButton" onClick={() => setOffset(offset + range)} disabled={disableNext}><Icon>chevron_right</Icon></button>
				<button className="btn graphButton" onClick={() => {cycleRange(range); setOffset(0)}}>{rangeLetter(range)}</button>
			</div>
			<Chart className="chart"
				type="bar"
				data={{
					labels: dates,
					datasets: [{
						label: tagName,
						data: tagValues,
						backgroundColor: (ctx) => {
							const d = dates[ctx.dataIndex];
							const e = data.get(d);
							return theme[(e?.mood || 0) - 1] || "#303030";
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
								maxRotation: 40,
								minRotation: 40,
								display: true,
								align: "end",
								autoSkipPadding: 10,
							},
							grid: {
								display: false,
							}
						},
						y: {
							ticks: {
								color: "#ffffff",
							},
							grid: {
								
							},
						}
					},
					responsive: true,
					maintainAspectRatio: true,
					aspectRatio: 1.5,
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
