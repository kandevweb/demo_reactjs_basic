import * as yup from 'yup'

// Đây mới validate ở mức cơ bản
export const productSchema = yup.object({
  title: yup.string().required('Tên sản phẩm là bắt buộc!'),
  thumbnail: yup.string().required('Hình ảnh là bắt buộc!'),
  category: yup.string().required('Danh mục là bắt buộc!'),
  price: yup
    .number()
    .transform((value, originalValue) => (originalValue === '' ? undefined : Number(value)))
    .typeError('Giá tiền bắt buộc phải là số!')
    .positive('Giá tiền không thể là số âm!')
    .required('Giá tiền là bắt buộc!'),
  description: yup.string().required('Mô tả là bắt buộc!')
})

export type ProductForm = yup.InferType<typeof productSchema>
