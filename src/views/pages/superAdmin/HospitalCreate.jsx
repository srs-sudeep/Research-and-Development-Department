import React from 'react'
import MainCard from 'ui-component/cards/MainCard'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import axios from 'axios'

const HospitalCreate = () => {
  const formik = useFormik({
    initialValues: {
      hospitalName: '',
      email: '',
      phone: '',
      address: '',
      username: '',
      password: '',
      contactName: '',
      contactPhone: '',
    },
    validationSchema: Yup.object({
      hospitalName: Yup.string().required('Hospital Name is required'),
      email: Yup.string()
        .email('Invalid email address')
        .required('Email is required'),
      phone: Yup.number().required('Phone Number is required'),
      address: Yup.string().required('Address is required'),
      username: Yup.string().required('Username is required'),
      password: Yup.string().required('Password is required'),
      contactName: Yup.string().required('Contact Name is required'),
      contactPhone: Yup.string().required('Contact Phone Number is required'),
    }),
    onSubmit: async (values) => {
      try {
        const response = await axios.post('your-api-endpoint', values)
        console.log('Form submitted successfully:', response.data)
      } catch (error) {
        console.error('Error submitting the form:', error)
      }
    },
  })

  return (
    <MainCard title="Create Hospital" shadow>
      <Box className="justify-items-start">
        <form
          onSubmit={formik.handleSubmit}
          className="mx-auto max-w-sm justify-items-start text-left">
          <div className="mb-5">
            <label
              htmlFor="hospitalName"
              className="mb-2 block text-sm font-medium text-gray-900 dark:text-white">
              Name of the Hospital
            </label>
            <input
              type="text"
              id="hospitalName"
              {...formik.getFieldProps('hospitalName')}
              className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
              placeholder="Enter hospital name"
            />
            {formik.touched.hospitalName && formik.errors.hospitalName ? (
              <div className="text-sm text-red-600">
                {formik.errors.hospitalName}
              </div>
            ) : null}
          </div>

          <div className="mb-5">
            <label
              htmlFor="email"
              className="mb-2 block text-sm font-medium text-gray-900 dark:text-white">
              Email
            </label>
            <input
              type="email"
              id="email"
              {...formik.getFieldProps('email')}
              className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
              placeholder="name@domain.com"
            />
            {formik.touched.email && formik.errors.email ? (
              <div className="text-sm text-red-600">{formik.errors.email}</div>
            ) : null}
          </div>

          <div className="mb-5">
            <label
              htmlFor="phone"
              className="mb-2 block text-sm font-medium text-gray-900 dark:text-white">
              Phone Number
            </label>
            <input
              type="tel"
              id="phone"
              {...formik.getFieldProps('phone')}
              className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
              placeholder="+123456789"
            />
            {formik.touched.phone && formik.errors.phone ? (
              <div className="text-sm text-red-600">{formik.errors.phone}</div>
            ) : null}
          </div>

          <div className="mb-5">
            <label
              htmlFor="address"
              className="mb-2 block text-sm font-medium text-gray-900 dark:text-white">
              Address
            </label>
            <input
              type="text"
              id="address"
              {...formik.getFieldProps('address')}
              className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
              placeholder="Enter hospital address"
            />
            {formik.touched.address && formik.errors.address ? (
              <div className="text-sm text-red-600">
                {formik.errors.address}
              </div>
            ) : null}
          </div>

          <div className="mb-5">
            <label
              htmlFor="username"
              className="mb-2 block text-sm font-medium text-gray-900 dark:text-white">
              Username
            </label>
            <input
              type="text"
              id="username"
              {...formik.getFieldProps('username')}
              className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
              placeholder="Enter username"
            />
            {formik.touched.username && formik.errors.username ? (
              <div className="text-sm text-red-600">
                {formik.errors.username}
              </div>
            ) : null}
          </div>

          <div className="mb-5">
            <label
              htmlFor="password"
              className="mb-2 block text-sm font-medium text-gray-900 dark:text-white">
              Password
            </label>
            <input
              type="password"
              id="password"
              {...formik.getFieldProps('password')}
              className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
              placeholder="Enter password"
            />
            {formik.touched.password && formik.errors.password ? (
              <div className="text-sm text-red-600">
                {formik.errors.password}
              </div>
            ) : null}
          </div>

          <div className="mb-5">
            <label
              htmlFor="contactName"
              className="mb-2 block text-sm font-medium text-gray-900 dark:text-white">
              Point of Contact Name
            </label>
            <input
              type="text"
              id="contactName"
              {...formik.getFieldProps('contactName')}
              className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
              placeholder="Enter contact name"
            />
            {formik.touched.contactName && formik.errors.contactName ? (
              <div className="text-sm text-red-600">
                {formik.errors.contactName}
              </div>
            ) : null}
          </div>

          <div className="mb-5">
            <label
              htmlFor="contactPhone"
              className="mb-2 block text-sm font-medium text-gray-900 dark:text-white">
              Point of Contact Phone Number
            </label>
            <input
              type="tel"
              id="contactPhone"
              {...formik.getFieldProps('contactPhone')}
              className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
              placeholder="+123456789"
            />
            {formik.touched.contactPhone && formik.errors.contactPhone ? (
              <div className="text-sm text-red-600">
                {formik.errors.contactPhone}
              </div>
            ) : null}
          </div>

          <button
            type="submit"
            className="w-full rounded-lg bg-blue-700 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 sm:w-auto">
            Submit
          </button>
        </form>
      </Box>
    </MainCard>
  )
}

export default HospitalCreate
