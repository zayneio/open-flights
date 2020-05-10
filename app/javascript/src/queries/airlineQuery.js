const airlineQuery = (slug) => `
  query Airline {
    airline(slug: "${slug}") {
      id
      name
      imageUrl
      slug
      averageScore
      reviews {
        id
        title
        description
        score
      }
    }
  }
`

export default airlineQuery
