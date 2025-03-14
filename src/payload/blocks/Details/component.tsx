import { Params } from '../types'
import configPromise from '@payload-config'
import { DetailsType } from '@payload-types'
import { unstable_cache } from 'next/cache'
import { headers } from 'next/headers'
import { notFound } from 'next/navigation'
import { getPayload } from 'payload'

import { getCurrentUser } from '@/utils/getCurrentUser'

import AuthorDetails from './components/AuthorDetails'
import BlogDetails from './components/BlogDetails'
import CostsBreakdownDetails from './components/CostsBreakdownDetails'
import QuoteDetailsComponent from './components/QuoteDetailsComponent'
import TagDetails from './components/TagDetails'

interface DetailsProps extends DetailsType {
  params: Params
}

const Details: React.FC<DetailsProps> = async ({ params, ...block }) => {
  const payload = await getPayload({
    config: configPromise,
  })

  switch (block?.collectionSlug) {
    case 'blogs': {
      const slug = params?.route?.at(-1) ?? ''

      const { docs } = await unstable_cache(
        async () =>
          await payload.find({
            collection: 'blogs',
            draft: false,
            where: {
              slug: {
                equals: slug,
              },
            },
          }),
        ['details', 'blogs', slug],
        { tags: [`details-blogs-${slug}`] },
      )()

      const blog = docs.at(0)

      // if blog not found showing 404
      if (!blog) {
        return notFound()
      }

      return <BlogDetails blog={blog} />
    }

    case 'tags': {
      const slug = params?.route?.at(-1) ?? ''

      const { docs: tagDocs } = await unstable_cache(
        async () =>
          await payload.find({
            collection: 'tags',
            where: {
              slug: {
                equals: slug,
              },
            },
          }),
        ['details', 'tags', slug],
        { tags: [`details-tags-${slug}`] },
      )()

      const tag = tagDocs?.[0]

      // if tag not found showing 404
      if (!tag) {
        return notFound()
      }

      const { docs: blogsData } = await unstable_cache(
        async () =>
          await payload.find({
            collection: 'blogs',
            where: {
              'tags.value': {
                contains: tag.id,
              },
            },
          }),
        ['details', 'blogs-by-tags', slug],
        { tags: [`details-blogs-by-tags-${slug}`] },
      )()

      return <TagDetails blogs={blogsData} tagDetails={tag} />
    }

    case 'users': {
      const authorName = params?.route?.at(-1) ?? ''
      const { docs: authorDocs } = await unstable_cache(
        async () =>
          await payload.find({
            collection: 'users',
            where: {
              username: {
                equals: authorName,
              },
            },
          }),
        ['details', 'author', authorName],
        { tags: [`details-author-${authorName}`] },
      )()

      const author = authorDocs?.[0]

      if (!author) {
        return notFound()
      }

      const { docs: blogs } = await unstable_cache(
        async () =>
          await payload.find({
            collection: 'blogs',
            draft: false,
            where: {
              'author.value': {
                equals: author.id,
              },
            },
          }),
        ['details', 'blogs-by-author', authorName],
        { tags: [`details-blogs-by-author-${authorName}`] },
      )()

      if (typeof author === 'object') {
        return <AuthorDetails author={author} blogsData={blogs} />
      }
    }

    case 'quotes': {
      const slug = params?.route?.at(-1) ?? ''
      const headerList = await headers()
      const user = await getCurrentUser(headerList)
      const payload = await getPayload({
        config: configPromise,
      })

      const { general: generalData } = await payload.findGlobal({
        slug: 'site-settings',
        draft: false,
      })
      const { docs } = await unstable_cache(
        async () =>
          await payload.find({
            collection: 'quotes',
            draft: false,
            where: {
              slug: {
                equals: slug,
              },
            },
          }),
        ['details', 'quotes', slug],
        { tags: [`details-quotes-${slug}`] },
      )()

      const quote = docs.at(0)

      // if blog not found showing 404
      if (!quote) {
        return notFound()
      }

      return (
        <QuoteDetailsComponent
          quote={quote}
          slug={slug}
          user={user}
          generalData={generalData}
        />
      )
    }

    case 'costsBreakdown': {
      const slug = params?.route?.at(-1) ?? ''

      const { docs } = await unstable_cache(
        async () =>
          await payload.find({
            collection: 'costsBreakdown',
            draft: false,
            where: {
              slug: {
                equals: slug,
              },
            },
          }),
        ['details', 'costsBreakdown', slug],
        { tags: [`details-costsBreakdown-${slug}`] },
      )()

      const costsBreakdown = docs.at(0)

      // if blog not found showing 404
      if (!costsBreakdown) {
        return notFound()
      }

      return <CostsBreakdownDetails costsBreakdown={costsBreakdown} />
    }
  }
}

export default Details
