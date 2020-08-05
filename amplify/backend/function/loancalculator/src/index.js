exports.handler = async (event) => {
  // TODO implement
  let loan_plan = {}

  const response = {
    statusCode: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
    },
    body: JSON.stringify(loan_plan),
  }
  return response
}
