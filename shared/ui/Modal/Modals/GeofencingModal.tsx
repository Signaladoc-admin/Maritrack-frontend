"use client";

import * as React from "react";
import { Search, Loader2 } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/shared/ui/Modal/dialog";
import { Button } from "@/shared/ui/Button/button";
import { z } from "zod";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useSearchBoxCore, useSearchSession } from "@mapbox/search-js-react";
import { cn } from "@/shared/lib/utils";

const geofencingSchema = z.object({
  locationName: z.string().min(1, "Location is required"),
  lat: z.number({ message: "Please select a location from the list" }),
  lon: z.number({ message: "Please select a location from the list" }),
  radius: z.number().min(0.1, "Radius must be at least 0.1km"),
});

type GeofencingFormValues = z.infer<typeof geofencingSchema>;

export function GeofencingModal({
  open,
  onOpenChange,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  const [suggestions, setSuggestions] = React.useState<any[]>([]);
  const [isSearching, setIsSearching] = React.useState(false);
  const [showSuggestions, setShowSuggestions] = React.useState(false);

  const searchBoxCore = useSearchBoxCore({
    accessToken: process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN || "",
  });
  const searchSession = useSearchSession(searchBoxCore);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors },
  } = useForm<GeofencingFormValues>({
    resolver: zodResolver(geofencingSchema),
    defaultValues: {
      locationName: "",
      radius: 1,
    },
  });

  const locationName = watch("locationName");

  React.useEffect(() => {
    const timer = setTimeout(async () => {
      if (locationName && locationName.length >= 3 && showSuggestions) {
        setIsSearching(true);
        try {
          const results = await searchSession.suggest(locationName, { limit: 10 });
          setSuggestions(results.suggestions);
        } catch (error) {
          console.error("Mapbox search error:", error);
          setSuggestions([]);
        }
        setIsSearching(false);
      } else {
        setSuggestions([]);
      }
    }, 500);

    return () => clearTimeout(timer);
  }, [locationName, showSuggestions, searchSession]);

  const handleSelectSuggestion = async (suggestion: any) => {
    try {
      setIsSearching(true);
      const retrieveResult = await searchSession.retrieve(suggestion);
      const feature = retrieveResult.features[0];

      if (feature) {
        const addressName =
          feature.properties.full_address || feature.properties.name || suggestion.name;
        setValue("locationName", addressName);
        setValue("lon", feature.geometry.coordinates[0]);
        setValue("lat", feature.geometry.coordinates[1]);
      }
    } catch (error) {
      console.error("Mapbox retrieve error:", error);
    } finally {
      setSuggestions([]);
      setShowSuggestions(false);
      setIsSearching(false);
    }
  };

  const onSubmit: SubmitHandler<GeofencingFormValues> = (data) => {
    console.log("Geofencing Data:", data);
    // Here you would call your API
    onOpenChange(false);
    reset();
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="p-6 sm:max-w-lg">
        <DialogHeader className="mb-2">
          <DialogTitle className="text-xl font-bold text-slate-900">Set Geofencing</DialogTitle>
          <p className="text-sm text-slate-500">Configure safety zones</p>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="relative space-y-4 rounded-lg border border-slate-100 bg-slate-50 p-4">
            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-700">Enter location</label>
              <div className="relative">
                <Search className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-slate-400" />
                <input
                  {...register("locationName")}
                  className={cn(
                    "h-11 w-full rounded-md border bg-white pr-3 pl-10 focus:ring-2 focus:ring-[#1B3C73] focus:outline-none",
                    errors.locationName ? "border-red-500" : "border-slate-200"
                  )}
                  placeholder="Search for a location..."
                  autoComplete="off"
                  onFocus={() => setShowSuggestions(true)}
                />
                {isSearching && (
                  <div className="absolute top-1/2 right-3 -translate-y-1/2">
                    <Loader2 className="h-4 w-4 animate-spin text-slate-400" />
                  </div>
                )}
              </div>
              {errors.locationName && (
                <p className="text-xs text-red-500">{errors.locationName.message}</p>
              )}
              {errors.lat && !errors.locationName && (
                <p className="text-xs text-red-500">Please select a valid location from the list</p>
              )}

              {/* Suggestions Dropdown */}
              {showSuggestions && suggestions.length > 0 && (
                <div className="absolute z-50 mt-1 max-h-60 w-[calc(100%-32px)] overflow-auto rounded-md border border-slate-200 bg-white py-1 shadow-lg">
                  {suggestions.map((s, i) => (
                    <button
                      key={i}
                      type="button"
                      className="w-full px-4 py-2 text-left text-sm hover:bg-slate-50 focus:bg-slate-50 focus:outline-none"
                      onClick={() => handleSelectSuggestion(s)}
                    >
                      {s.full_address ||
                        `${s.name}${s.place_formatted ? `, ${s.place_formatted}` : ""}`}
                    </button>
                  ))}
                </div>
              )}
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-700">Set radius (in KM)</label>
              <input
                {...register("radius", { valueAsNumber: true })}
                className={cn(
                  "h-11 w-full rounded-md border bg-white px-3 focus:ring-2 focus:ring-[#1B3C73] focus:outline-none",
                  errors.radius ? "border-red-500" : "border-slate-200"
                )}
                placeholder="1"
                type="number"
                step="0.1"
              />
              {errors.radius && <p className="text-xs text-red-500">{errors.radius.message}</p>}
            </div>
          </div>

          <DialogFooter className="mt-4">
            <Button type="submit" className="h-12 w-full bg-[#1B3C73] text-base">
              Save Geofencing
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
