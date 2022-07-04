import React from 'react';
import { Table } from 'react-bootstrap';

function CustTable(props) {
	return (
		<div className='table__scroll'>
			<h4 className='bg-clr-gray-400'>
				{props?.question == 1
					? 'Which pages had the highest number of views on 2022-01-01'
					: props?.question == 2
					? 'In which hours does the website have the most number of users.'
					: 'Which users have the highest number of pageviews'}
			</h4>
			<Table>
				<thead className='sticky__head'>
					<tr>
						<th>User ID</th>
						<th>Page Name</th>
						<th>Time</th>
					</tr>
				</thead>
				<tbody>
					{props?.sendData.length > 0 &&
						props?.sendData?.map((i) => (
							<tr>
								<td>{i?.uid}</td>
								<td>
									{i?.pagetitle
										.split(' ')
										.map((j) => j.substring(0, 1).toUpperCase() + j.substring(1, j.length).toLowerCase())
										.join(' ')}
								</td>
								<td>{i?.timestamp}</td>
							</tr>
						))}
				</tbody>
			</Table>
		</div>
	);
}

export default React.memo(CustTable);
