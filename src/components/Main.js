import React, { useState, useEffect } from 'react';
import CustTable from './CustTable.js';
import CustChart from './CustChart.js';
import { Tabs, Tab, Button } from 'react-bootstrap';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

function Main(props) {
	const [activeKey, setActiveKey] = useState(0);
	const [activePage, setActivePage] = useState();
	const [sendData, setSendData] = useState(props?.allData);
	const [time, setTime] = useState({ min: '', max: '', current1: '', current2: '' });
	const [sortData, setSortData] = useState(false);

	useEffect(() => {
		handleClear();
		setActiveKey(0);
	}, [props?.question]);

	useEffect(() => {
		findMinMaxTime();
	}, [props?.allData]);

	useEffect(() => {
		if (activePage || (time.current1 && time.current2)) {
			setSendData(
				Object.values(props?.allData).filter(
					(i) =>
						(props?.question === 2 ? i?.pagetitle === activePage : props?.question === 3 && activePage ? i?.pagetitle === activePage : true) &&
						(time.current2 ? (i?.timestamp).split(' ')[2].substring(0, 5) <= time.current2 : true) &&
						// && new Date(i?.timestamp) >= new Date(time.current1)
						(time.current1 ? (i?.timestamp).split(' ')[2].substring(0, 5) >= time.current1 : true)
				)
			);
		} else {
			setSendData(props?.allData);
		}
	}, [sortData, props?.allData]);

	const handleTimeChange = (e) => {
		const { name, value } = e.target;
		setTime((prev) => ({
			...prev,
			[name]: value,
		}));
	};

	const handleClear = () => {
		setTime((prev) => ({
			...prev,
			current1: '',
			current2: '',
		}));
		setActivePage('');
		setSortData(!sortData);
	};

	const findMinMaxTime = () => {
		let mn,
			mx = '';
		Object.values(props?.allData).map((i, index) => {
			if (index === 0) {
				mn = new Date(i.timestamp);
				mx = new Date(i.timestamp);
			} else {
				if (new Date(i.timestamp) > mx) {
					mx = new Date(i.timestamp);
				}
				if (new Date(i.timestamp) < mn) {
					mn = new Date(i.timestamp);
				}
			}

			setTime((prev) => ({
				...prev,
				min: mn,
				max: mx,
			}));
		});
	};

	const handleChangeEvent = (e) => {
		setActiveKey(e);
	};

	const handlePageChange = (e) => {
		const { name, value } = e.target;
		setActivePage(value);
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		setSortData(!sortData);
	};

	return (
		<div className=' mt-3'>
			<div className='flex-col'>
				<form action='' onSubmit={handleSubmit}>
					<div className='filter__nav d-flex p-4 justify-content-evenly align-items-start'>
						{props?.question !== 1 && (
							<select name='pagename' id='' value={activePage} onChange={handlePageChange} required={props?.question == 2 ? true : false}>
								<option value=''>Select</option>
								{props?.allPageName.map((i) => (
									<option value={i}>
										{i
											.split(' ')
											.map((j) => j.substring(0, 1).toUpperCase() + j.substring(1, j.length).toLowerCase())
											.join(' ')}
									</option>
								))}
							</select>
						)}
						<div>
							<input
								type='time'
								name='current1'
								value={time.current1}
								min={new Date(time?.min).toTimeString().substring(0, 5)}
								max={new Date(time?.max).toTimeString().substring(0, 5)}
								onChange={handleTimeChange}
								className='me-2'
								required={time.current2 ? true : false}
							/>
							{/* </div>
						<div> */}
							<input
								type='time'
								name='current2'
								value={time.current2}
								min={time?.current1 || new Date(time?.min).toTimeString().substring(0, 5)}
								max={new Date(time?.max).toTimeString().substring(0, 5)}
								onChange={handleTimeChange}
								required={time.current1 ? true : false}
							/>
						</div>
						<div>
							<Button className='me-2 btn__style' variant='dark' type='submit'>
								Submit
							</Button>
							<Button className='btn__style' variant='dark' onClick={handleClear}>
								Clear
							</Button>
						</div>
					</div>
				</form>
				<div className='data__block'>
					{sendData?.length > 0 && (
						<Tabs defaultActiveKey='0' activeKey={activeKey} onSelect={handleChangeEvent}>
							<Tab eventKey='0' title='Table'>
								<CustTable sendData={sendData} question={props?.question} />
							</Tab>
							{props.question === 1 && (
								<Tab eventKey='1' title='Bar Chart'>
									<CustChart param='bar' question={props?.question} sendData={sendData} allPageName={props?.allPageName} />
								</Tab>
							)}
							{props.question === 1 && (
								<Tab eventKey='2' title='Pie Chart'>
									<CustChart param='pie' question={props?.question} sendData={sendData} allPageName={props?.allPageName} />
								</Tab>
							)}
							{props.question === 2 && (
								<Tab eventKey='1' title='Line Chart'>
									<CustChart param='line' question={props?.question} sendData={sendData} allPageName={props?.allPageName} />
								</Tab>
							)}
							{props.question === 3 && (
								<Tab eventKey='1' title='Bar Chart'>
									<CustChart param='bar' question={props?.question} sendData={sendData} allPageName={props?.allPageName} />
								</Tab>
							)}
						</Tabs>
					)}
				</div>
			</div>
		</div>
	);
}

export default Main;
