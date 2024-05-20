import React from "react";
import Form from "../../forms/components/Form";
import ROUTES from "../../routes/routesModel";
import Input from "../../forms/components/Input";
import { Grid, FormControlLabel, Checkbox, Box, useTheme } from "@mui/material";

export default function SignupForm({
  onSubmit,
  onReset,
  validateForm,
  title,
  errors,
  data,
  onInputChange,
  handleChangeCheckBox,
}) {
  const theme = useTheme();

  return (
    <Box
      sx={{
        backgroundColor: theme.palette.mode === 'dark' ? '#121212' : '#FFFFE0',
        color: theme.palette.mode === 'dark' ? '#ffffff' : '#000000',
        padding: '20px',
        borderRadius: '10px',
        boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)',
        marginBottom: '40px',
        border: theme.palette.mode === 'dark' ? '1px solid #ffffff' : '1px solid #000000', // White border in light mode, black border in dark mode
        '@media (max-width: 600px)': {
          padding: '10px',
        },
      }}
    >
      <Form
        onSubmit={onSubmit}
        onReset={onReset}
        validateForm={validateForm}
        title={title}
        styles={{ maxWidth: "800px" }}
        to={ROUTES.ROOT}
      >
        <Input
          name="first"
          label="First Name"
          error={errors.first}
          onChange={onInputChange}
          data={data}
          sm={6}
        />
        <Input
          name="middle"
          label="Middle Name"
          error={errors.middle}
          onChange={onInputChange}
          data={data}
          sm={6}
          required={false}
        />
        <Input
          name="last"
          label="Last Name"
          error={errors.last}
          onChange={onInputChange}
          data={data}
          sm={6}
        />
        <Input
          name="phone"
          label="Phone"
          type="phone"
          error={errors.phone}
          onChange={onInputChange}
          data={data}
          sm={6}
        />
        <Input
          name="email"
          label="Email"
          type="email"
          error={errors.email}
          onChange={onInputChange}
          data={data}
          sm={6}
        />
        <Input
          name="password"
          label="Password"
          type="password"
          error={errors.password}
          onChange={onInputChange}
          data={data}
          sm={6}
        />
        <Input
          name="url"
          label="Image URL"
          error={errors.url}
          onChange={onInputChange}
          data={data}
          sm={6}
          required={false}
        />
        <Input
          name="alt"
          label="Image Alt"
          error={errors.alt}
          onChange={onInputChange}
          data={data}
          sm={6}
          required={false}
        />
        <Input
          name="state"
          label="State"
          error={errors.state}
          onChange={onInputChange}
          data={data}
          sm={6}
          required={false}
        />
        <Input
          label="Country"
          name="country"
          error={errors.country}
          onChange={onInputChange}
          data={data}
          sm={6}
        />
        <Input
          name="city"
          label="City"
          error={errors.city}
          onChange={onInputChange}
          data={data}
          sm={6}
        />
        <Input
          name="street"
          label="Street"
          error={errors.street}
          onChange={onInputChange}
          data={data}
          sm={6}
        />
        <Input
          name="houseNumber"
          label="House Number"
          type="number"
          error={errors.houseNumber}
          onChange={onInputChange}
          data={data}
          sm={6}
        />
        <Input
          name="zip"
          label="Zip"
          error={errors.zip}
          onChange={onInputChange}
          data={data}
          sm={6}
          required={false}
        />
        <Grid item>
          <FormControlLabel
            onChange={handleChangeCheckBox}
            name="isBusiness"
            control={<Checkbox value={data.isBusiness} color="primary" />}
            label="Signup as business"
          />
        </Grid>
      </Form>
    </Box>
  );
}
