import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { Zoom } from 'react-slideshow-image';
import 'react-slideshow-image/dist/styles.css';
import {
	BsFillArrowLeftSquareFill,
	BsFillArrowRightSquareFill,
} from 'react-icons/bs';
import { loading } from './spinning-circles.svg';

const Slideshow = () => {
	const [images, setImages] = useState([]);
	const [error, setError] = useState('');
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		fetch(
			'https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?sol=100&api_key=E0M7JjXKSBmNLu2dpkTM6mNGcZKDZF7ez4iBenPm'
		)
			.then((response) => response.json())
			.then((json) => setImages(json.photos))
			.catch((error) => setError(error.message))
			.finally(() => setIsLoading(false));
	}, []);
	console.log(images);

	const zoomInProperties = {
		indicators: true,
		scale: 1.2,
		duration: 5000,
		transitionDuration: 500,
		infinite: true,
		prevArrow: (
			<div
				style={{
					width: '30px',
					marginRight: '-30px',
					cursor: 'pointer',
				}}
			>
				<BsFillArrowLeftSquareFill />
			</div>
		),

		nextArrow: (
			<div
				style={{
					width: '30px',
					marginRigth: '-30px',
					cursor: 'pointer',
				}}
			>
				<BsFillArrowRightSquareFill />
			</div>
		),
	};
	return (
		<div className="m-10">
			<h1 className="text-center text-2xl font-bold pb-2">
				Responsive Next.js <span>Image Slider</span>
			</h1>

			{isLoading ? (
				<Image src={loading} alt="Loading..." />
			) : (
				<Zoom {...zoomInProperties}>
					{images &&
						images.map((elem) => {
							return (
								<div
									key={elem.id}
									className="flex justify-center w-full h-[450px] "
								>
									<img
										src={elem.img_src}
										alt=""
										className="w-7/12 h-full  object-cover rounded-lg shadow-xl"
									/>
								</div>
							);
						})}
				</Zoom>
			)}
		</div>
	);
};

export default Slideshow;
