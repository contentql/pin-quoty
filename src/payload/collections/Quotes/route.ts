import axios from 'axios'

export const createProduct = async ({
  slug,
  quoteAmount,
}: {
  slug: string
  quoteAmount: number
}) => {
  try {
    const response = await axios.post(
      'https://api.lemonsqueezy.com/v1/products',
      {
        name: slug,
        price: quoteAmount,
        currency: 'USD',
        status: 'draft',
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.LEMONSQUEEZY_API_KEY}`,
          'Content-Type': 'application/json',
        },
      },
    )

    return response.data.data
  } catch (error) {
    console.error('Error creating product:', error)
  }
}
