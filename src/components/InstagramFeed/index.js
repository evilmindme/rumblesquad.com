import {useState, useLayoutEffect} from 'react';
import Loader from '../Loader';
import useFetch from '../../Hooks/useFetch'

export default function InstagramFeed() {
	const [feed, setFeed] = useState([]);
	const [error, setError] = useState('');
	const {get, loading} = useFetch('https://graph.instagram.com/me');

	useLayoutEffect(() => {
		const accessToken = process.env.REACT_APP_INSTA_TOKEN;
		const getParams = '/media?fields=media_count,media_type,permalink,media_url,caption&limit=5&access_token='

		get(`${getParams}${accessToken}`)
		.then(data => !data ? setError('') : setFeed(data)
		).catch((error) => {
			console.error('Error:', error);
			setError(error);
		})
	}, [])

	return <>
		<section className='social-instafeed__container'>
			<h1 className='m-uppercase m-text-left'>#rumblesquadmfc</h1>
			{loading && <Loader />}
			{!loading && error && <div>Sorry, seems something wrong with the connection. Please, try to reload the page.</div>}
			<ul className='social-instafeed__list'>
				{feed.data && feed.data.map(post => {
					return <li 
							className='social-instafeed__post'
							key={post.id}
							title={post.caption}
						>
						{post.media_type === 'VIDEO' && 
							<video 
								controls 
								width='100%'
								muted
								// preload='none'
								className='social-instafeed__video'
							>
								<source src={post.media_url}
										type="video/webm" />
								<source src={post.media_url}
										type="video/mp4" />
								Sorry, something is wrong or your browser doesn't support embedded videos.
							</video>
						}
						{post.media_type === 'IMAGE' &&
							<>
								<img 
									src={post.media_url}
									alt={post.media_type}
									className='social-instafeed__image'
									loading="lazy"
								/>
								{/* <div className='social-instafeed__caption'>{post.caption}</div> */}
							</>
						}
					</li>
				})}
			</ul>
		</section>
	</>
}