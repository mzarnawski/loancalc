<template>
  <div class="container">
    <b-form @submit="onSubmit" @reset="onReset" v-if="show">
      <b-form-group label="Loan type:">
        <b-form-select
          v-model="form.loan_type"
          :options="loan_types"
          required
          @change="onLoanChange"
        ></b-form-select>
      </b-form-group>
      <b-form-group label="Loan amount:">
        <b-form-input
          v-model="form.amount"
          type="number"
          required
          placeholder="Enter loan amount"
        ></b-form-input>
      </b-form-group>
      <b-form-group label="Loan duration:">
        <b-form-input
          v-model="form.duration"
          type="number"
          required
          placeholder="Enter number of months"
        ></b-form-input>
      </b-form-group>
      <b-form-group label="Interest:">
        <b-form-input
          v-model="form.interest"
          type="number"
          readonly
        ></b-form-input>
      </b-form-group>

      <b-button type="submit" variant="primary">Submit</b-button>
      <b-button type="reset" variant="danger">Reset</b-button>
    </b-form>
    <b-card class="mt-3" header="Your loan plan:">
      <div>
        <b-table striped hover :items="loan_plan"></b-table>
      </div>
    </b-card>
  </div>
</template>

<script>
import { API } from 'aws-amplify'

export default {
  data() {
    return {
      form: {
        loan_type: null,
        amount: null,
        duration: null,
        interest: 0,
      },
      loan_types: [
        { text: 'Select One', value: null },
        { text: 'Mortgage', value: 3.5 },
      ],
      show: true,
      loan_plan: [],
    }
  },
  methods: {
    onSubmit(evt) {
      evt.preventDefault()
      const apiName = 'loanrestapi'
      const path = '/loan-calc'
      const myInit = {
        body: {
          amount: this.form.amount,
          duration: this.form.duration,
          interest: this.form.interest,
        },
      }

      const data = this
      API.post(apiName, path, myInit)
        .then((response) => {
          data.loan_plan = response
        })
        .catch((error) => {
          console.log(error.response)
        })
    },
    onReset(evt) {
      evt.preventDefault()
      // Reset our form values
      this.form.email = ''
      this.form.name = ''
      // Trick to reset/clear native browser form validation state
      this.show = false
      this.$nextTick(() => {
        this.show = true
      })
    },
    onLoanChange(val) {
      if (val) {
        this.form.interest = val
      }
    },
  },
}
</script>
