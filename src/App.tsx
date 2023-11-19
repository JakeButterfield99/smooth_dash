import React, { useState, createContext, useEffect } from 'react';
import logo from './logo.svg';
import './App.css';

import { BackgroundData, DefaultBackground } from './services/weather';
import AppContext, {
	AppContextInterface,
} from "./services/context";

import { DefaultEffect, EffectInterface } from "./services/effect";
import backgroundsService, { DEFAULT_BACKGROUND as DEFAULT_CITY } from './services/backgrounds';

import Weather from './modules/weather';
import DateDisplay from './modules/datedisplay';
import Search from './modules/search';
import Menu from './modules/menu';
import Center from './modules/center';
import Effects from './modules/effects';

function App() {
	const [loading, setLoading] = useState<boolean>(true);
	const [background, setBackground] = useState<BackgroundData>(DefaultBackground);
	const [effect, setEffect] = useState<EffectInterface>(DefaultEffect);
	const [center, setCenter] = useState<string>("");
	const [title, setTitle] = useState<string>("New Tab");
	const [city, setCity] = useState<string>(DEFAULT_CITY);

	const [bgImage, setBgImage] = useState<string>("");

	const ShowDarkText = (): boolean => {
		const bgs = backgroundsService.GetBackgrounds();
		const sel_bg = bgs[city];
		const bgOverride = sel_bg.dark.includes(background.time);
		const isRightTime = ["sunset", "night"].includes(background.time);

		return (isRightTime || bgOverride);
	}

	const context: AppContextInterface = {
		background: background,
		center: center,
		dark: ShowDarkText(),
		effect: effect,
		title: title,
		city: city,

		setBackground,
		setCenter,
		setEffect,
		setTitle,
		setCity,
	};

	const UpdateBackgroundImage = () => {
		const bgs = backgroundsService.GetBackgrounds();
		const sel_bg = bgs[city];
		let img = sel_bg.images[background.time];

		// TST
		img = sel_bg.images['day'];

		const path = `/img/background/${city}/${img}`;
		setBgImage(path);
	}

	// Load background
	useEffect(() => {
		const c = backgroundsService.LoadPreferredBackground();
		setCity(c);
	}, []);

	useEffect(() => {
		UpdateBackgroundImage();
		setLoading(false);
	}, [city]);

	useEffect(() => {
		document.title = title;
	}, [title]);

	if (loading)
		return null;

	return (
		<AppContext.Provider value={context}>
			<div style={{ backgroundImage: `url(${bgImage})` }} className={`App background-${background.time} background-wrapper`}>
				<Effects />
				<Weather />
				<DateDisplay />
				{center != "" &&
					<Center />
				}
				<Search />
				<Menu />
			</div>
		</AppContext.Provider>
	);
}

export default App;
