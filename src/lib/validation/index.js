import * as yup from "yup";

// login
export const loginSchema = yup.object().shape({
    email:yup.string().email("Invalid email").required("Email is required"),
    password:yup
      .string()
      .required("Password is required"),
  });


  export const serviceSchema = yup.object().shape({
    picture: yup.mixed().test("fileSize", "Image is required", (value) => {
      return value && value.length > 0;
    }),
    name:yup.string().required("Service name is required"),
    categoryId:yup.string().required("Category is required"),
    location : yup.string().required("Location is required")
  })

  export const sendSchema = yup.object().shape({
    message : yup.string().required("Message is required")
  })

  export const categorySchema = yup.object().shape({
    picture: yup.mixed().test("fileSize", "Category logo is required", (value) => {
      return value && value.length > 0;
    }),
    name : yup.string().required("Category is required"),
    description : yup.string().required("Description is required")
  })