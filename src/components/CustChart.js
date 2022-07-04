import React, { useState, useEffect } from 'react';
import { Bar, PolarArea, Line } from 'react-chartjs-2';
import {
	Chart as ChartJS,
	CategoryScale,
	LinearScale,
	PointElement,
	LineElement,
	BarElement,
	Title,
	Tooltip,
	Legend,
	ArcElement,
	RadialLinearScale,
} from 'chart.js';
ChartJS.register(CategoryScale, LinearScale, RadialLinearScale, BarElement, Title, PointElement, LineElement, Tooltip, Legend, ArcElement);

function CustChart(props) {
	const colorDefault = props.param == 'bar' ? 'blue' : '#5850eab8';
	const colorMax = props.param == 'bar' ? '#ff6600' : '#fd7e148f';
	const colorRed = '#fd0505';
	const [isLoading, setIsLoading] = useState(true);
	const [data, setData] = useState({
		labels: [],
		datasets: [
			{
				label: ['Total User'],
				data: [],
				// backgroundColor: new Array(props?.allPageName.length),
			},
		],
	});
	useEffect(() => {
		setIsLoading(true);
	}, [props?.sendData]);
	useEffect(() => {
		if (data.datasets[0].data.length > 0) {
			setIsLoading(false);
		}
	}, [data]);

	useEffect(() => {
		if ((props?.param === 'bar' || props?.param === 'pie') && props.question === 1) {
			let newLabel = props?.allPageName;
			let newData = [];
			newData.length = 0;
			let newColor = [];
			newColor.length = 0;
			props?.sendData.map((i) => {
				let index = newLabel.indexOf(i.pagetitle);
				if (newData[index]) {
					newData[index] += 1;
				} else {
					newData[index] = 1;
				}
			});
			let mx = Math.max(...newData);
			newData.map((i, index) => {
				if (Number(i) === mx) {
					newColor[index] = colorMax;
				} else {
					newColor[index] = colorDefault;
				}
			});
			setData((prev) => ({
				...prev,
				labels: newLabel,
				datasets: [{ ...prev.datasets[0], data: newData, backgroundColor: newColor }],
			}));
		}
		if (props?.param === 'line' && props.question === 2) {
			let newObj = {};
			let newLabel = [];
			let newData = [];
			newData.length = 0;
			props?.sendData.map((i) => {
				let newTime = i.timestamp.split(' ')[2].substring(0, 5);
				if (newTime in newObj) {
					newObj[newTime] += 1;
				} else {
					newObj[newTime] = 1;
				}
			});
			let newAll = Object.entries(newObj).sort((a, b) => (a[0] > b[0] ? 1 : -1));
			newAll.map((i) => {
				newLabel.push(i[0]);
				newData.push(i[1]);
			});
			setData((prev) => ({
				...prev,
				labels: newLabel,
				datasets: [{ ...prev.datasets[0], data: newData, borderColor: colorDefault, tension: 0.2, fill: true }],
			}));
		}
		if (props?.param === 'bar' && props.question === 3) {
			let newLabel = props?.allPageName;
			let mainObj = {};
			let arrToObj = newLabel.reduce((accumulator, value) => {
				return { ...accumulator, [value]: 0 };
			}, {});
			let mainArr = new Array(100).fill();
			// mainArr[3]['batches'] = 4;
			props?.sendData.map((i) => {
				if (typeof mainArr[Number(i.uid) - 1] != 'object') {
					mainArr[Number(i.uid) - 1] = {};
				}
				if (i.pagetitle in mainArr[Number(i.uid) - 1]) {
					mainArr[Number(i.uid) - 1][i.pagetitle] += 1;
				} else {
					mainArr[Number(i.uid) - 1][i.pagetitle] = 1;
				}
			});
			mainArr.map((i) => {
				if (i && Object.values(i).length > 0) {
					let maxHere = Math.max(...Object.values(i)) || 0;
					newLabel.map((j) => {
						if (Number(i[j]) != maxHere) {
							delete i[j];
						}
					});
				}
			});
			let finalData = [];
			mainArr.map((i, index) => {
				if (i) {
					let pages = Object.keys(i);
					let value = i[pages[0]];
					let newobj = {
						uid: index + 1,
						pagetitle: pages,
						value: value,
					};
					finalData.push(newobj);
				}
			});
			setData((prev) => ({
				...prev,
				labels: Array.from({ length: 100 }, (_, i) => i + 1),
				datasets: [{ ...prev.datasets[0], data: finalData, backgroundColor: colorDefault, borderColor: 'black' }],
			}));
		}

		return () => {
			setData({
				labels: [],
				datasets: [
					{
						label: ['Total User'],
						data: [],
						// backgroundColor: new Array(props?.allPageName.length),
					},
				],
			});
		};
	}, [props?.sendData, props?.question]);
	const options = {
		responsive: true,
		layout: {
			padding: {
				top: 30,
				right: 130,
				left: 130,
				bottom: 100,
			},
		},
		plugins: {
			tooltip: {
				mode: 'index',
				callbacks: {
					title: function (context) {
						return 'Page = ' + context[0].label;
					},
				},
			},
		},
		scales: {
			y: {
				title: {
					display: true,
					text: 'Visits',
					color: colorMax,
					font: {
						size: '14px',
						lineHeight: 1.4,
					},
				},
			},
			x: {
				title: {
					display: true,
					text: 'Page Title',
					color: colorMax,
					font: {
						size: '14px',
						lineHeight: 1.4,
					},
				},
			},
		},
	};
	const lineOptions = {
		type: 'line',
		responsive: true,
		// fill: true,
		interaction: {
			intersect: false,
		},
		scales: {
			y: {
				beginAtZero: true,
			},
		},
		layout: {
			padding: {
				top: 30,
				right: 130,
				left: 130,
				bottom: 100,
			},
		},
		scales: {
			y: {
				title: {
					display: true,
					text: 'Visits',
					color: colorMax,
					font: {
						size: '14px',
						lineHeight: 1.4,
					},
				},
			},
			x: {
				title: {
					display: true,
					text: 'Time',
					color: colorMax,
					font: {
						size: '14px',
						lineHeight: 1.4,
					},
				},
			},
		},
		plugins: {
			tooltip: {
				mode: 'index',
				callbacks: {
					title: function (context) {
						return 'Time = ' + context[0].label;
					},
				},
			},
		},
	};
	const ques3Options = {
		responsive: true,
		interaction: {
			intersect: false,
		},
		parsing: {
			xAxisKey: 'uid',
			yAxisKey: 'value',
		},
		layout: {
			padding: {
				top: 30,
				right: 80,
				left: 80,
				bottom: 100,
			},
		},
		plugins: {
			title: {
				display: true,
				text: 'Custom Chart Title',
			},
			tooltip: {
				mode: 'index',
				callbacks: {
					label: function (context) {
						let value1 = 'Visits = ' + context.dataset.data[context.dataIndex].value;
						let value2 = [];
						context.dataset.data[context.dataIndex].pagetitle.map((i) => {
							value2.push('Page = ' + i);
						});
						return [value1, ...value2];
					},
					title: function (context) {
						return 'User ID = ' + context[0].label;
					},
				},
			},
		},
		scales: {
			y: {
				title: {
					display: true,
					text: 'Visits',
					color: colorMax,
					font: {
						size: '14px',
						lineHeight: 1.4,
					},
				},
			},
			x: {
				title: {
					display: true,
					text: 'User ID',
					color: colorMax,
					font: {
						size: '14px',
						lineHeight: 1.4,
					},
				},
			},
		},
	};
	return (
		<div>
			{props?.question === 1 && (
				<>
					{props.param === 'bar' && data.datasets[0].data.length > 0 && !isLoading && <Bar data={data} options={options} redraw />}
					{props.param === 'pie' && data.datasets[0].data.length > 0 && <PolarArea data={data} options={options} redraw />}
				</>
			)}
			{props?.question === 2 && (
				<>{props.param === 'line' && data.datasets[0].data.length > 0 && !isLoading && <Line data={data} options={lineOptions} redraw />}</>
			)}
			{props?.question === 3 && (
				<>{props.param === 'bar' && data.datasets[0].data.length > 0 && !isLoading && <Bar data={data} options={ques3Options} redraw />}</>
			)}
		</div>
	);
}

export default React.memo(CustChart);
