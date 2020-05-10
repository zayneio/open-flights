const deleteReviewQuery = (id) => `
  mutation {
    destroyReview(id: ${id}) {
      error
      message
    }
  }
`

export default deleteReviewQuery
