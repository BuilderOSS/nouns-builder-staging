import {
  defaultFieldsetStyle,
  defaultInputErrorMessageStyle,
  defaultInputErrorStyle,
  defaultInputLabelStyle,
  defaultInputStyle,
} from './styles.css'
import { Box } from '@zoralabs/zord'
import flatpickr from 'flatpickr'
import { Instance } from 'flatpickr/dist/types/instance'
import { FormikErrors, FormikProps } from 'formik'
import React, { ReactElement } from 'react'

require('flatpickr/dist/themes/light.css')

interface DateProps {
  inputLabel: string | ReactElement
  formik: FormikProps<any>
  id: string
  errorMessage: string | FormikErrors<any> | string[] | undefined | FormikErrors<any>[]
  value: any
  placeholder?: string
  autoSubmit?: boolean
  parentValues?: any
  disabled?: boolean
}

const Date: React.FC<DateProps> = ({
  inputLabel,
  formik,
  id,
  errorMessage,
  autoSubmit,
  value,
  placeholder,
  disabled = false,
}) => {
  const ref = React.useRef(null)

  React.useEffect(() => {
    if (!ref.current) return

    flatpickr(ref.current, {
      dateFormat: 'Y-m-d',
      onChange: (_selectedDates, dateStr, _instance) => {
        formik.setFieldValue(id, dateStr)

        if (autoSubmit && formik) {
          setTimeout(() => {
            formik.submitForm()
          }, 100)
        }
      },
    })
  }, [autoSubmit, formik, id])

  return (
    <Box as="fieldset" mb={'x8'} p={'x0'} className={defaultFieldsetStyle}>
      {inputLabel && <label className={defaultInputLabelStyle}>{inputLabel}</label>}
      {errorMessage && (
        <Box
          position={'absolute'}
          right={'x2'}
          top={'x8'}
          fontSize={12}
          className={defaultInputErrorMessageStyle}
        >
          {errorMessage as string}
        </Box>
      )}
      <input
        className={!!errorMessage ? defaultInputErrorStyle : defaultInputStyle}
        ref={ref}
        type={'text'}
        data-input={true}
        value={value || ''}
        placeholder={placeholder}
        readOnly={true}
        disabled={disabled}
      />
    </Box>
  )
}

export default Date
