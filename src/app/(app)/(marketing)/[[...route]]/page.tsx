import { env } from '@env'
import configPromise from '@payload-config'
import type { Metadata } from 'next'
import { unstable_cache } from 'next/cache'
import { notFound } from 'next/navigation'
import { getPayload } from 'payload'
import React from 'react'

import QuoteTitle from '@/components/quote-title'
import { blocksJSX } from '@/payload/blocks/blocks'
import { serverClient } from '@/trpc/serverClient'
import { ensurePath } from '@/utils/ensurePath'
import { generateCombinations } from '@/utils/generateCombinations'
import { matchNextJsPath } from '@/utils/matchNextJsPath'

type StaticRoute = { route: string | string[] | null }
type DynamicPageDataType = { index: number; path: string; slugs: string[] }[]

// export const dynamic = 'force-static'
// revalidates every 10mins
export const revalidate = 600
// allows dynamic params static generation
export const dynamicParams = true

const cachedPageData = (route?: string | string[]) => {
  if (!route) route = '/'
  if (Array.isArray(route)) route = route.join('/')
  if (route !== '/') route = ensurePath(route).replace(/\/$/, '')

  return unstable_cache(
    async () => {
      const payload = await getPayload({
        config: configPromise,
      })

      const { docs: pageData } = await payload.find({
        collection: 'pages',
        depth: 5,
        overrideAccess: true,
        draft: false,
        where: {
          path: {
            equals: route,
          },
        },
      })

      if (pageData.length) {
        return pageData?.[0]
      } else {
        const { docs: allPages } = await payload.find({
          collection: 'pages',
          depth: 5,
          overrideAccess: true,
          draft: false,
        })

        if (!allPages?.length) {
          return undefined
        }

        const correctMatching = allPages.find(page => page.path === route)

        const matchingPage =
          correctMatching ??
          allPages.find(page => matchNextJsPath(route, page.path!))

        if (!matchingPage) {
          return undefined
        }

        return matchingPage
      }
    },
    ['pages', route],
    {
      tags: [`page-${route}`], // Dynamic tag based on the route
    },
  )
}

const Page = async ({ params }: { params: Promise<{ route: string[] }> }) => {
  const resolvedParams = (await params).route

  const pageData = await cachedPageData(resolvedParams)()

  if (!pageData) {
    return notFound()
  }

  const layoutData = pageData.layout ?? []

  return (
    <React.Fragment>
      {layoutData?.map((block, index) => {
        // Casting to 'React.FC<any>' to bypass TypeScript error related to 'Params' type incompatibility.
        const Block = blocksJSX[block.blockType] as React.FC<any>

        if (Block) {
          if (block.blockType === 'Details' || 'FormBlock') {
            return (
              <main
                key={index}
                className='flex w-full flex-col max-lg:grow lg:ml-auto lg:w-1/2'>
                {/* Left side */}

                <QuoteTitle params={{ route: resolvedParams }} />

                {/* Right side */}
                <Block
                  {...block}
                  params={{ route: resolvedParams }}
                  key={index}
                />
              </main>
            )
          }

          return (
            <main key={index} className='flex w-full justify-center'>
              <Block
                {...block}
                params={{ route: resolvedParams }}
                key={index}
              />
            </main>
          )
        }

        return <h3 key={block.id}>Block does not exist </h3>
      })}
    </React.Fragment>
  )
}

export default Page

// generates metadata
export async function generateMetadata({
  params,
}: {
  params: Promise<{ route: string[] }>
}): Promise<Metadata | {}> {
  const payload = await getPayload({
    config: configPromise,
  })

  const { route } = await params

  try {
    const pageData = await cachedPageData(route)()

    if (!pageData) {
      return {}
    }

    let metadata = pageData.meta

    const block = pageData.layout
      ?.filter(block => block.blockType === 'Details')
      ?.at(0)

    // checking for dynamic page
    if (
      pageData?.isDynamic &&
      block?.collectionSlug &&
      block?.collectionSlug !== 'users'
    ) {
      const { docs } = await payload.find({
        collection: block?.collectionSlug,
        where: {
          slug: {
            equals: route.at(-1) ?? '',
          },
        },
        depth: 5,
      })

      const doc = docs?.at(0)

      // metadata = doc?.meta || {}
    }

    if (metadata && Object.keys(metadata).length) {
      let ogImage = []
      const title = metadata.title ?? ''
      const description = metadata.description ?? ''

      const titleAndDescription = {
        ...(title ? { title } : {}),
        ...(description ? { description } : {}),
      }

      if (
        metadata.image &&
        typeof metadata.image === 'object' &&
        metadata.image?.url
      ) {
        ogImage.push({
          url: metadata.image.url,
          height: 630,
          width: 1200,
          alt: `og image`,
        })
      }

      const hasOGData = ogImage.length && Object.keys(titleAndDescription)

      return {
        ...titleAndDescription,
        // we're appending the http|https int the env variable
        metadataBase: env.PAYLOAD_URL as unknown as URL,
        ...(hasOGData
          ? {
              openGraph: {
                ...titleAndDescription,
                images: ogImage,
              },
            }
          : {}),
        ...(hasOGData
          ? {
              twitter: {
                ...titleAndDescription,
                images: ogImage,
              },
            }
          : {}),
      }
    }

    return {}
  } catch (error) {
    // in error case returning empty object
    return {}
  }
}

// generate static-pages
const staticGenerationMapping = {
  blogs: serverClient.blog.getAllBlogs(),
  tags: serverClient.tag.getAllTags(),
  users: serverClient.author.getAllAuthors(),
  quotes: serverClient.quote.getAllQuotes(),
  costsBreakdown: serverClient.costsBreakdown.getAllCostsBreakdown(),
} as const

// This function generates staticParams for [[...route]]/page.tsx
// return [{route: ['blog']}, {route: ['blog', 'dynamic-access-in-javascript']}]
export async function generateStaticParams(): Promise<StaticRoute[]> {
  const allPagesData = await serverClient.page.getAllPages()
  const staticParams: StaticRoute[] = []

  for (const page of allPagesData) {
    // Skipping params generation for invalid pages
    if (!page) {
      continue
    }

    // If the route is dynamic (contains `[`)
    // example:- path:- /quote/[quote-details]/costs-breakdown/[costs-breakdown-details] we need to fill the [quote-details] & [costs-breakdown-details] with appropriate slugs
    if (page?.path?.includes('[') && page.layout) {
      const slug = page.path

      // the above path will be splitted into 2 paths /quote/[quote-details], /quote/[quote-details]/costs-breakdown/[costs-breakdown-details] & stored in dynamicPageData
      const dynamicPageData: DynamicPageDataType = []
      const splittedPage = slug.split('/')

      if (splittedPage.length) {
        // storing index of dynamic-segment
        for (const segment of splittedPage) {
          if (segment.startsWith('[')) {
            const index = splittedPage.indexOf(segment)
            const formedPath = splittedPage.slice(0, index + 1)
            const formedSlug = formedPath.join('/')

            const formedSlugPage = allPagesData.find(
              ({ path }) => path === formedSlug,
            )

            if (formedSlugPage && formedSlugPage.layout) {
              const detailsBlock = formedSlugPage.layout.find(
                block => block.blockType === 'Details',
              )

              if (detailsBlock && detailsBlock.collectionSlug) {
                // Fetch all slugs for the given collection (e.g., blogs, tags, users)
                const list =
                  await staticGenerationMapping[detailsBlock.collectionSlug]

                if (list && Array.isArray(list)) {
                  dynamicPageData.push({
                    index,
                    path: formedPath.join('/'),
                    slugs: list.map(item => {
                      if ('username' in item) {
                        return item.username
                      } else if ('slug' in item) {
                        return `${item.slug}`
                      }
                      return ''
                    }),
                  })
                }
              }
            }
          }
        }

        const finalOutput = generateCombinations({
          replaceList: splittedPage,
          combinationsList: dynamicPageData,
        })

        finalOutput.forEach(combination => {
          staticParams.push({
            route: combination.filter(Boolean),
          })
        })
      }

      continue
    }

    // Statics (non-dynamic paths)
    // example: /blog or /tags
    const nonDynamicPath = page?.path?.split('/').filter(Boolean)

    if (nonDynamicPath) {
      staticParams.push({ route: nonDynamicPath })
    }
  }

  return staticParams
}
