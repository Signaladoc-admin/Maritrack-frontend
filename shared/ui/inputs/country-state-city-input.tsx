"use client";

import React from "react";
import { useWatch, Control, Controller } from "react-hook-form";
import { Country, State, City } from "country-state-city";
import { InputGroup } from "@/shared/ui/input-group";

interface CountryStateCityInputProps {
  control: Control<any>;
  countryName: string;
  stateName: string;
  cityName: string;
  className?: string;
  errors?: any;
  setValue: (name: string, value: any) => void; // Required to clear dependent fields
}

export function CountryStateCityInput({
  control,
  countryName,
  stateName,
  cityName,
  className,
  errors,
  setValue,
}: CountryStateCityInputProps) {
  const selectedCountry = useWatch({
    control,
    name: countryName,
  });

  const selectedState = useWatch({
    control,
    name: stateName,
  });

  const countries = Country.getAllCountries().map((country) => ({
    label: country.name,
    value: country.isoCode,
  }));

  const states = selectedCountry
    ? State.getStatesOfCountry(selectedCountry).map((state) => ({
        label: state.name,
        value: state.isoCode,
      }))
    : [];

  const cities =
    selectedCountry && selectedState
      ? City.getCitiesOfState(selectedCountry, selectedState).map((city) => ({
          label: city.name,
          value: city.name,
        }))
      : [];

  return (
    <div className={`grid gap-4 sm:grid-cols-3 ${className}`}>
      <Controller
        control={control}
        name={countryName}
        render={({ field }) => (
          <InputGroup
            label="Country"
            type="select"
            placeholder="Select Country"
            options={countries}
            error={errors?.[countryName]?.message}
            {...field}
            onChange={(val) => {
              field.onChange(val);
              setValue(stateName, "");
              setValue(cityName, "");
            }}
          />
        )}
      />

      <Controller
        control={control}
        name={stateName}
        render={({ field }) => (
          <InputGroup
            label="State"
            type="select"
            placeholder="Select State"
            options={states}
            disabled={!selectedCountry || states.length === 0}
            error={errors?.[stateName]?.message}
            {...field}
            onChange={(val) => {
              field.onChange(val);
              setValue(cityName, "");
            }}
          />
        )}
      />

      <Controller
        control={control}
        name={cityName}
        render={({ field }) => (
          <InputGroup
            label="City"
            type="select"
            placeholder="Select City"
            options={cities}
            disabled={!selectedState || cities.length === 0}
            error={errors?.[cityName]?.message}
            {...field}
          />
        )}
      />
    </div>
  );
}
