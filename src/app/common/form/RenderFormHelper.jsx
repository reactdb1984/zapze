import React from "react"
import { FormHelperText } from "@material-ui/core"
const renderFromHelper = ({ touched, error }) => {
    if (!(touched && error)) {
      return
    } else {
      return <FormHelperText>{touched && error}</FormHelperText> 
    }
  }

  export default renderFromHelper