import { useRef, useState } from 'react';
import './Tab.css';

export default function Tab() {
	const [cur_ele, set_curele] = useState(1);

	const btn1 = useRef();
	const btn2 = useRef();
	const btn3 = useRef();

	const change_content = (evt) => {
		console.log(cur_ele);
		console.log(evt.target.id);
		if (evt.target.id === '_active') {
			set_curele((pre) => 1);
			console.log(cur_ele, 'h');
		} else if (evt.target.id === '_inactive') {
			set_curele((pre) => 2);
		} else if (evt.target.id === '_finished') {
			set_curele((pre) => 3);
		}
	};

	return (
		<div className='tab'>
			<div className='tab-container'>
				<div className='tab-titles'>
					<button
						className='tab-title'
						id='_active'
						onClick={change_content}
						ref={btn1}>
						Active
					</button>
					<button
						className='tab-title'
						id='_inactive'
						onClick={change_content}
						ref={btn2}>
						In active
					</button>
					<button
						className='tab-title'
						id='_finished'
						onClick={change_content}
						ref={btn3}>
						Finished
					</button>
				</div>

				{cur_ele === 1 && (
					<div className='tab-box show' id='active'>
						<table className='tab-list'>
							<thead className='tab-list-header'>
								<tr className='tab-list-item'>
									<th>Id</th>
									<th>Title</th>
									<th>Check</th>
								</tr>
							</thead>
							<tbody className='tab-list-body'>
								<tr className='tab-list-item'>
									<td>1</td>
									<td>Ram CHeri</td>
									<td>No</td>
								</tr>
								<tr className='tab-list-item'>
									<td>2</td>
									<td>Suraj Naik</td>
									<td>No</td>
								</tr>
							</tbody>
						</table>
					</div>
				)}
				{cur_ele === 2 && (
					<div className='tab-box' id='inactive'>
						<table className='tab-list'>
							<thead className='tab-list-header'>
								<tr className='tab-list-item'>
									<th>Id</th>
									<th>Title</th>
									<th>Check</th>
								</tr>
							</thead>
							<tbody className='tab-list-body'>
								<tr className='tab-list-item'>
									<td>1</td>
									<td>Mohan Khan</td>
									<td>No</td>
								</tr>
								<tr className='tab-list-item'>
									<td>2</td>
									<td>Suresh Raj</td>
									<td>No</td>
								</tr>
							</tbody>
						</table>
					</div>
				)}
				{cur_ele === 3 && (
					<div className='tab-box' id='finished'>
						<table className='tab-list'>
							<thead className='tab-list-header'>
								<tr className='tab-list-item'>
									<th>Id</th>
									<th>Title</th>
									<th>Check</th>
								</tr>
							</thead>
							<tbody className='tab-list-body'>
								<tr className='tab-list-item'>
									<td>1</td>
									<td>Rock Joker</td>
									<td>No</td>
								</tr>
								<tr className='tab-list-item'>
									<td>2</td>
									<td>James Thomson</td>
									<td>No</td>
								</tr>
							</tbody>
						</table>
					</div>
				)}
			</div>
		</div>
	);
}
