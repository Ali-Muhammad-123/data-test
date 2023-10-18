import { useEffect, useState } from "react";
import SeriesComp from "./components/seriesComp";
import axios from "axios";
import Highcharts from "highcharts/highstock";
import HighchartsReact from "highcharts-react-official";
function App() {
	const [chartData, SetChartdata] = useState([]);
	async function fetchData() {
		const data = await axios(
			"https://random-data-api.com/api/bank/random_bank?size=100"
		);
		var bank_names = [];
		var firstPass = data.data.map((el) => {
			return {
				bank_name: el.bank_name.split(" ")[0],
				routing_number: el.routing_number.substring(0, 3),
			};
		});
		data.data.map((el) => {
			if (!bank_names.includes(el.bank_name.split(" ")[0]))
				bank_names.push(el.bank_name.split(" ")[0]);
		});

		SetChartdata(
			bank_names.map((el) => {
				return {
					type: "area",
					name: el,
					data: firstPass
						.filter((ele) => ele.bank_name === el)
						.map((elem) => Number(elem.routing_number)),
				};
			})
		);

		// console.log(
		// 	bank_names.map((el) => {
		// 		return {
		// 			type: "area",
		// 			name: el,
		// 			data: firstPass
		// 				.filter((ele) => ele.bank_name === el)
		// 				.map((elem) => Number(elem.routing_number)),
		// 		};
		// 	})
		// );

		// console.log(
		// 	data.data.map((el) => {
		// 		return {
		// 			bank_name: el.bank_name.split(" ")[0],
		// 			routing_number: el.routing_number.substring(0, 3),
		// 		};
		// 	})
		// );

		//xaxis = bankname first word , yaxis routing-number first three digits
	}

	useEffect(() => {
		fetchData();
	}, []);
	return (
		<div style={{ width: "100vw" }}>
			<HighchartsReact
				highcharts={Highcharts}
				options={{
					xAxis: {
						allowDecimals: false,
					},
					yAxis: {
						title: {
							text: "Routing-number",
						},
					},
					series: chartData,
				}}
			/>
			<SeriesComp />
		</div>
	);
}

export default App;
