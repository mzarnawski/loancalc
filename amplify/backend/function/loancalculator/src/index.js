exports.handler = async (event) => {
  const body = JSON.parse(event.body)

  let loan_plan = []

  const total_amount = body.amount
  const duration = body.duration
  const interest = body.interest

  const monthly_interest = interest / 100 / 12
  const monthly_multiplier = 1 + monthly_interest

  const monthly_rate =
    total_amount *
    ((monthly_interest * Math.pow(monthly_multiplier, duration)) /
      (Math.pow(monthly_multiplier, duration) - 1))
  const monthly_money = Math.round(monthly_rate * 100) / 100

  let principal_left = total_amount

  for (let i = 1; i <= duration; i++) {
    let rate = {}
    rate.month = i

    if (i == duration) {
      rate.total = Math.round(principal_left * monthly_multiplier * 100) / 100
      rate.interest = Math.round(principal_left * monthly_interest * 100) / 100
      rate.principal = Math.round((rate.total - rate.interest) * 100) / 100
      rate.principal_left = 0
    } else {
      rate.total = monthly_money
      rate.interest = Math.round(principal_left * monthly_interest * 100) / 100
      rate.principal = Math.round((rate.total - rate.interest) * 100) / 100
      principal_left =
        Math.round(
          (principal_left * monthly_multiplier - monthly_money) * 100
        ) / 100
      rate.principal_left = principal_left
    }

    loan_plan.push(rate)
  }

  const response = {
    statusCode: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
    },
    body: JSON.stringify(loan_plan),
  }
  return response
}
