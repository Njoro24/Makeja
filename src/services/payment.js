// src/services/payment.js

export async function processPayment(paymentData) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const shouldSucceed = Math.random() > 0.1
      if (shouldSucceed) {
        resolve({ status: 'success' })
      } else {
        reject(new Error('Payment declined'))
      }
    }, 1500)
  })
}
