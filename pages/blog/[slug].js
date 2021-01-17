import React from 'react'
import ReactMarkdown from 'react-markdown/with-html'

import { getAllSlugs, getPostBySlug } from '../../api'

export default function PostTemplate(props) {
	const { html, frontmatter } = props
	const { date, title } = frontmatter

	return (
		<div className='w-3/6 mx-auto my-12'>
			<div>
				<p className='text-lg font-bold'>{date}</p>
				<h1 className='text-4xl font-bold text-center mt-4 mb-8'>{title}</h1>
			</div>
			<hr />
			<article>
				<ReactMarkdown allowDangerousHtml>{html}</ReactMarkdown>
			</article>
		</div>
	)
}

export async function getStaticPaths() {
	const paths = getAllSlugs().map(slug => {
		return {
			params: {
				slug
			}
		}
	})

	return {
		paths,
		fallback: false // redirect to 404 if path not found
	}
}

export async function getStaticProps({ params: { slug } }) {
	const post = getPostBySlug(slug)

	return {
		props: post
	}
}
