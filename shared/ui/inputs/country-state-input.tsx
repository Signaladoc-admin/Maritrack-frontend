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
import { SearchableSelect } from "@/shared/ui/searchable-select";

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

  const countries = React.useMemo(
    () =>
      Country.getAllCountries().map((country) => ({
        label: country.name,
        value: country.isoCode,
      })),
    []
  );

  const states = React.useMemo(
    () =>
      selectedCountry
        ? State.getStatesOfCountry(selectedCountry).map((state) => ({
            label: state.name,
            value: state.isoCode,
          }))
        : [],
    [selectedCountry]
  );

  return (
    <div className={`grid gap-4 sm:grid-cols-2 ${className}`}>
      <Controller
        control={control}
        name={countryName}
        render={({ field }) => (
          <InputGroup label="Country" error={errors?.[countryName]?.message}>
            <SearchableSelect
              options={countries}
              placeholder="Select Country"
              value={field.value}
              onValueChange={(val) => {
                field.onChange(val);
                setValue(stateName, "" as PathValue<T, Path<T>>);
              }}
              isSearchable={true}
            />
          </InputGroup>
        )}
      />

      <Controller
        control={control}
        name={stateName}
        render={({ field }) => (
          <InputGroup label="State" error={errors?.[stateName]?.message}>
            <SearchableSelect
              options={states}
              placeholder="Select State"
              value={field.value}
              onValueChange={field.onChange}
              disabled={!selectedCountry || states.length === 0}
              isSearchable={true}
            />
          </InputGroup>
        )}
      />
    </div>
  );
}
