import React from 'react'
import "./invoice.css"
import { useFetchData } from '../../hooks/useFetchData'
import UserObj from '../client service page/UserObj'
import { formatDate } from "../../utils/utils";



function InvoiceComponent({data}) {
	const {data : client} = useFetchData("http://localhost:5000/user/"+data.clientId);
	const {data : freelancer} = useFetchData("http://localhost:5000/user/"+data.freelancerId);
	console.log(data);
  return (
    <div className='invoicepage'>
        <header>
			<h1>Invoice</h1>
			<address contenteditable>
				<p>invoice from freelancer <UserObj id={data.freelancerId} /></p>
				{freelancer?.googleId && <p>email : {freelancer?.email}</p>}

				<p>Flex bizz</p>
				<p>Siège: AV. Hssine Farhat<br />5180 Salakta, Mahdia</p>
				<p>Tél:00 216 92 025 942</p>
			</address>
		</header>
		<article>
			<address contenteditable>
				<p>To Client</p>
				<p> <UserObj id={data.clientId} /> </p>
				<p>gouvernorate : {client?.government}</p>
				{client?.googleId && <p>email : {client?.email}</p>}
			</address>
			<table class="meta">
				<tr>
					<th><span contenteditable>Invoice #</span></th>
					<td><span contenteditable>{data._id}</span></td>
				</tr>
				<tr>
					<th><span contenteditable>Date</span></th>
					<td><span contenteditable>{formatDate(data.createdAt)}</span></td>
				</tr>
				<tr>
					<th><span contenteditable>Amount Due</span></th>
					<td><span id="prefix" contenteditable>DT </span><span>{data.projectBudget}</span></td>
				</tr>
			</table>
			<table class="inventory">
				<thead>
					<tr>
						<th><span contenteditable>Item</span></th>
						<th><span contenteditable>Description</span></th>
						<th><span contenteditable>Freelancer Net</span></th>
						<th><span contenteditable>platform fee</span></th>
						<th><span contenteditable>Price</span></th>
					</tr>
				</thead>
				<tbody>
					<tr>
						<td><a class="cut">-</a><span contenteditable>{data.projectName}</span></td>
						<td><span contenteditable>{freelancer?.name} worked on the project "{data.projectName}" for the client {client?.name} through the platform FlexBizz</span></td>
						<td><span data-prefix>DT </span><span contenteditable>{data.projectBudget - data.platformFee}  </span></td>
						<td><span contenteditable>DT {data.platformFee}</span></td>
						<td><span data-prefix>DT </span><span>{data.projectBudget}</span></td>
					</tr>
				</tbody>
			</table>
			<table class="balance">
				<tr>
					<th><span contenteditable>Total</span></th>
					<td><span data-prefix>DT </span><span>{data.projectBudget}</span></td>
				</tr>
				<tr>
					<th><span contenteditable>invoice Status</span></th>
					<td><span data-prefix></span><span contenteditable className='status handled center'>paid</span></td>
				</tr>
				<tr>
					<th><span contenteditable>Payment Method</span></th>
					<td><span data-prefix></span><span>service de paiement mobile en ligne "Flouci"</span></td>
				</tr>
			</table>
		</article>
		<aside>
			<h1><span contenteditable>Additional Notes</span></h1>
			<div contenteditable>
				<p>Thank you for your prompt payment. Your payment has been received and no further action is required.</p>
			</div>
		</aside>
    </div>
  )
}

export default InvoiceComponent