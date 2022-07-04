import React from 'react';

function Sidebar(props) {
	const handleChnageProblem = (e) => {
		const value = e.target.dataset.problemno;
		props?.setQuestion(Number(value));
	};
	return (
		<div className='  mt-3'>
			<div className=' d-flex align-items-center mx-4'>
				<div className='p-3'>
					<img src='https://pngimg.com/uploads/square/square_PNG87.png' alt='' height='45' />
				</div>
				<div className='d-flex flex-col ms-3'>
					<span className='fw-600 font-22 text-align-left'>Dashboard </span>
					<span className='fw-400 font-18 text-align-left'>
						<a href='https://www.linkedin.com/in/kavan-dalal/' target='_blank'>
							Kavan Dalal
						</a>
					</span>
				</div>
			</div>
			<hr />
			<div>
				<div className='d-flex flex-col mx-5'>
					<span className='fw-600 font-22 text-align-left'>Random Dataset </span>
					<span className='fw-400 font-18 text-align-left'>
						<a href='https://resisted-aboard-koala.glitch.me/events' target='_blank'>
							/events
						</a>
					</span>
				</div>
			</div>
			<hr />
			<div>
				<div className='d-flex flex-col ms-3 me-3 problems fw-600 font-18 text-align-left'>
					<div className={props.question === 1 ? 'active__problem' : ''} data-problemNo={1} onClick={handleChnageProblem}>
						Problem A
					</div>
					<div className={props.question === 2 ? 'active__problem' : ''} data-problemNo={2} onClick={handleChnageProblem}>
						Problem B
					</div>
					<div className={props.question === 3 ? 'active__problem' : ''} data-problemNo={3} onClick={handleChnageProblem}>
						Problem C
					</div>
				</div>
			</div>
		</div>
	);
}

export default React.memo(Sidebar);
