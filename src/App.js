import React, { useState, useEffect } from "react";
 

function App() {
	const [voitures, setVoitures] = useState([]);
	const [selectedVoiture, setSelectedVoiture] = useState(null);
	useEffect(() => {
		fetchVoitures();
	}, []);
	const fetchVoitures = () => {
		fetch("https://localhost:3000/voitures")
			.then((response) => response.json())
			.then((data) => {
				setVoitures(data);
			})
			.catch((error) => {
				console.error("Erreur lors de la récupération des voitures", error);
			});
	};
	const handleVoitureChange = (event) => {
		const selectedId = parseInt(event.target.value);
		const selected = voitures.find((voiture) => voiture.id === selectedId);
		setSelectedVoiture(selected);
	};
	return (
		<div>
			{" "}
			<h1>Liste des voitures</h1>{" "}
			<select onChange={handleVoitureChange}>
				{" "}
				<option value="">Sélectionnez une voiture</option>{" "}
				{voitures.map((voiture) => (
					<option key={voiture.id} value={voiture.id}>
						{" "}
						{voiture.Marque} {voiture.Modele}{" "}
					</option>
				))}{" "}
			</select>{" "}
			{selectedVoiture && (
				<div>
					{" "}
					<h2>Caractéristiques de la voiture sélectionnée :</h2>{" "}
					<p>Marque : {selectedVoiture.Marque}</p>{" "}
					<p>Modèle : {selectedVoiture.Modele}</p>{" "}
					<p>Année de fabrication : {selectedVoiture.AnneeFabrication}</p>{" "}
					<p>Couleur : {selectedVoiture.Couleur}</p>{" "}
					<p>Prix : {selectedVoiture.Prix}</p>{" "}
					<p>Kilométrage : {selectedVoiture.Kilometrage}</p>{" "}
					<p>Carburant : {selectedVoiture.Carburant}</p>{" "}
					<p>Transmission : {selectedVoiture.Transmission}</p>{" "}
					<p>Description : {selectedVoiture.Description}</p>{" "}
				</div>
			)}{" "}
		</div>
	);
}
export default App;
