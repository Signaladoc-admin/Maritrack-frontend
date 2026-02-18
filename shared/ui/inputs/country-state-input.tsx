"use client";

import React, { useEffect } from "react";
import {
  useWatch,
  Control,
  Controller,
  FieldValues,
  Path,
  UseFormSetValue,
  PathValue,
} from "react-hook-form";
import { Country, State } from "country-state-city";
import { InputGroup } from "@/shared/ui/input-group";

interface CountryStateInputProps<T extends FieldValues> {
  control: Control<T>;
  countryName: Path<T>;
  stateName: Path<T>;
  className?: string;
  errors?: any;
  setValue: UseFormSetValue<T>;
}

export function CountryStateInput<T extends FieldValues>({
  control,
  countryName,
  stateName,
  className,
  errors,
  setValue,
}: CountryStateInputProps<T>) {
  const selectedCountry = useWatch({
    control,
    name: countryName,
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

  return (
    <div className={`grid gap-4 sm:grid-cols-2 ${className}`}>
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
              setValue(stateName, "" as PathValue<T, Path<T>>);
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
          />
        )}
      />
    </div>
  );
}
