const createReviewQuery = (attributes) => `
  mutation {
    createReview(
      title: "${attributes.title}",
      description: "${attributes.description}",
      score: ${attributes.score},
      airlineId: ${attributes.airlineId}
    ) {
      title
      description
      score
      airlineId
    }
  }
`

export default createReviewQuery
