import { readFileSync, readdirSync } from 'fs'
import { join } from 'path'

import matter from 'gray-matter'

const postsDirectory = join(process.cwd(), 'blog')

export function getAllSlugs() {
	return readdirSync(postsDirectory)
		.filter(path => path.endsWith('.md'))
		.map(path => path.replace(/\.md$/, ''))
}

export function getPostBySlug(slug) {
	const path = join(postsDirectory, `${slug}.md`)
	const text = readFileSync(path, 'utf-8')

	const { data, content } = matter(text)

	return {
		frontmatter: data,
		html: content,
		slug
	}
}

export function getAllPosts() {
	const posts = getAllSlugs()
		.map(slug => getPostBySlug(slug))
		.sort((post1, post2) =>
			new Date(post1.frontmatter.date) > new Date(post2.frontmatter.date)
				? 1
				: -1
		)

	return posts
}
