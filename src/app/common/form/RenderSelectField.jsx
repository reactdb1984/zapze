import React from "react";
import { FormControl, InputLabel, Select } from "@material-ui/core";
import renderFromHelper from "./RenderFormHelper";

const renderSelectField = ({
    input,
    label,
    meta: { touched, error },
    children,
    ...custom
  }) => (
    <FormControl error={touched && error}> 
      <InputLabel htmlFor="category-native-simple">Age</InputLabel>
      <Select
        native
        {...input}
        {...custom}
        inputProps={{
          name: 'category',
          id: 'category-native-simple'
        }}
      >
        {children}
      </Select> 
      {renderFromHelper({ touched, error })}
    </FormControl>
  )

  export default renderSelectField;