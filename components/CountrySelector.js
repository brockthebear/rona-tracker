import { useState } from 'react';
import Stats from './Stats';
import useStats from '../utils/useStats';

const url = `https://covid19.mathdro.id/api/countries`;

export default function CountrySelector() {
	const { stats: countries, loading, error } = useStats(url);
	const [selectedCountry, setSelectedCountry] = useState('USA');
	if (!countries) return <p>Loading...</p>;
	if (loading) return <p>Loading...</p>;
	if (error) return <p>Error! 😢</p>;

	return (
		<div>
			<h2>Stats for {selectedCountry}:</h2>
			<select
				onChange={e => {
					setSelectedCountry(e.target.value);
				}}
			>
				{Object.entries(countries.countries).map(([country, code]) => (
					<option
						selected={selectedCountry === countries.iso3[code]}
						key={code}
						value={countries.iso3[code]}
					>
						{country}
					</option>
				))}
			</select>
			<Stats url={`${url}/${selectedCountry}`}></Stats>
		</div>
	);
}
