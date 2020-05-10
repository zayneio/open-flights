const airlinesQuery = `
  query Airlines {
    airlines {
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

export default airlinesQuery
