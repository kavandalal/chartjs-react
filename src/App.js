import './App.css';
import { useState, useEffect } from 'react';
import { Row, Col, Spinner } from 'react-bootstrap';
import Sidebar from './components/Sidebar.js';
import Main from './components/Main.js';
import axios from 'axios';
import allDataFile from './allData/allData.js';

function App() {
	const [allData, setAllData] = useState({});
	const [allPageName, setAllPageName] = useState([]);
	const [question, setQuestion] = useState(1);
	const [isLoading, setIsLoading] = useState(false);

	useEffect(() => {
		getData();
	}, []);

	const getData = async () => {
		setIsLoading(true);
		// await axios
		// 	.get('https://resisted-aboard-koala.glitch.me/events', {
		// 		headers: {
		// 			'Access-Control-Allow-Origin': '*',
		// 			'Content-Type': 'application/json; charset=utf-8',
		// 			'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept',
		// 		},
		// 	})
		// 	.then((res) => {
		// 		setAllData(Object.values(res.data).sort((a, b) => a.uid - b.uid));
		// 		let x = [];
		// 		Object.values(res.data).map((i) => {
		// 			let name = i.pagetitle;
		// 			if (!x.includes(name)) {
		// 				x.push(name);
		// 			}
		// 		});
		// 		setAllPageName(x);
		// 		setIsLoading(false);
		// 	})
		// 	.catch((err) => {
		// 		console.log(err.message);
		// 		setIsLoading(false);
		// 	});
		setAllData(Object.values(allDataFile).sort((a, b) => a.uid - b.uid));
		let x = [];
		Object.values(allDataFile).map((i) => {
			let name = i.pagetitle;
			if (!x.includes(name)) {
				x.push(name);
			}
		});
		setAllPageName(x);
		setIsLoading(false);
	};
	return (
		<div className='App'>
			<Row className='p-0 m-0'>
				<Col sm={3} className='main__sidebar p-0 m-0'>
					<Sidebar question={question} setQuestion={setQuestion} />
				</Col>
				<Col sm={9} className='main__content p-0 m-0'>
					{isLoading ? (
						<div className='h-full d-flex justify-content-center align-items-center'>
							<Spinner animation='border' role='status'>
								<span className='visually-hidden'>Loading...</span>
							</Spinner>
						</div>
					) : (
						<Main allPageName={allPageName} allData={allData} question={question} />
					)}
					{/* {JSON.stringify(Object.entries(allData)[0])} */}
				</Col>
			</Row>
		</div>
	);
}

export default App;
