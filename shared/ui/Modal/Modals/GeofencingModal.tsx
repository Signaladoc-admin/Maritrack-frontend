"use client";

import * as React from "react";
import { Search, Loader2, Trash2, ChevronRight, Plus } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/shared/ui/Modal/dialog";
import { Button } from "@/shared/ui/Button/button";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useSearchBoxCore, useSearchSession } from "@mapbox/search-js-react";
import { cn } from "@/shared/lib/utils";
import { useSetRestrictions } from "@/features/mdm-sync/model/useRestrictions";
import { useParams } from "next/navigation";
import { useQueryState } from "nuqs";
import { GeofenceLocation, GeofencesRequest } from "@/features/mdm-sync/types";
import { useAuth } from "@/shared/auth/AuthProvider";
import { useGetBusiness } from "@/entities/business/model/useBusiness";
import { useChild } from "@/entities/children/model/useChildren";

// ---------------------------------------------------------------------------
// Schema & Types
// ---------------------------------------------------------------------------

const geofencingSchema = z.object({
  locationName: z.string().min(1, "Location is required"),
  lat: z.number({ message: "Please select a location from the list" }),
  lon: z.number({ message: "Please select a location from the list" }),
  radius: z.number().min(0.1, "Radius must be at least 0.1km"),
});

type GeofencingFormValues = z.infer<typeof geofencingSchema>;

/** A committed location entry (fully filled-in). */
interface LocationEntry {
  id: string;
  locationName: string;
  lat: number;
  lon: number;
  radius: number;
}

// ---------------------------------------------------------------------------
// LocationFormCard — the editable form for a single location
// ---------------------------------------------------------------------------

interface LocationFormCardProps {
  index: number;
  defaultValues?: Partial<GeofencingFormValues>;
  onCommit: (data: GeofencingFormValues) => void;
  onDelete: () => void;
  accessToken: string;
  /** When true, hides the "Location N" header row (used when embedded inside LocationDataItem) */
  hideHeader?: boolean;
}

const LocationFormCard = React.forwardRef<{ submit: () => void }, LocationFormCardProps>(
  function LocationFormCard(
    { index, defaultValues, onCommit, onDelete, accessToken, hideHeader = false },
    ref
  ) {
    const [suggestions, setSuggestions] = React.useState<any[]>([]);
    const [isSearching, setIsSearching] = React.useState(false);
    const [showSuggestions, setShowSuggestions] = React.useState(false);
    const [userLocation, setUserLocation] = React.useState<{ lat: number; lon: number } | null>(null);

    const searchBoxCore = useSearchBoxCore({ accessToken });
    const searchSession = useSearchSession(searchBoxCore);

    const {
      register,
      handleSubmit,
      setValue,
      watch,
      formState: { errors },
    } = useForm<GeofencingFormValues>({
      resolver: zodResolver(geofencingSchema),
      defaultValues: {
        locationName: "",
        radius: 0,
        ...defaultValues,
      },
    });

    const locationName = watch("locationName");

    React.useImperativeHandle(ref, () => ({
      submit: () => {
        handleSubmit(onCommit)();
      },
    }));

    React.useEffect(() => {
      if ("geolocation" in navigator) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            setUserLocation({
              lat: position.coords.latitude,
              lon: position.coords.longitude,
            });
          },
          (error) => {
            console.error("Error getting user location:", error);
          }
        );
      }
    }, []);

    // Mapbox suggestions debounce
    React.useEffect(() => {
      const timer = setTimeout(async () => {
        if (locationName && locationName.length >= 3 && showSuggestions) {
          setIsSearching(true);
          try {
            const proximity = userLocation ? [userLocation.lon, userLocation.lat] : "ip";
            const results = await searchSession.suggest(locationName, { 
              limit: 10, 
              proximity: proximity as any,
              country: "ng"
            } as any);
            setSuggestions(results.suggestions);
          } catch {
            setSuggestions([]);
          }
          setIsSearching(false);
        } else {
          setSuggestions([]);
        }
      }, 500);
      return () => clearTimeout(timer);
    }, [locationName, showSuggestions, searchSession, userLocation]);

    const handleSelectSuggestion = async (suggestion: any) => {
      try {
        setIsSearching(true);
        const result = await searchSession.retrieve(suggestion);
        const feature = result.features[0];
        if (feature) {
          const addressName =
            feature.properties.full_address || feature.properties.name || suggestion.name;
          setValue("locationName", addressName, { shouldValidate: true });
          setValue("lon", feature.geometry.coordinates[0], { shouldValidate: true });
          setValue("lat", feature.geometry.coordinates[1], { shouldValidate: true });
        }
      } catch {
        // silent
      } finally {
        setSuggestions([]);
        setShowSuggestions(false);
        setIsSearching(false);
      }
    };

    return (
      <div
        className={cn(
          "relative space-y-5 transition-all duration-200",
          showSuggestions ? "z-50 mb-[18rem]" : "z-10",
          !hideHeader && "rounded-xl border border-slate-100 bg-slate-50 p-4"
        )}
      >
        {/* Header — only shown for standalone cards (not embedded in accordion) */}
        {!hideHeader && (
          <div className="flex items-center justify-between">
            <p className="text-sm font-semibold text-slate-800">Location {index + 1}</p>
            <button
              type="button"
              className="rounded p-1 text-red-400 transition-colors hover:bg-red-50 hover:text-red-600"
              onClick={onDelete}
              aria-label="Delete location"
            >
              <Trash2 className="h-4 w-4" />
            </button>
          </div>
        )}

        {/* Location name search */}
        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium text-slate-700">Enter location</label>
          <div className="relative">
            <Search className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-slate-400" />
            <input
              {...register("locationName")}
              className={cn(
                "h-11 w-full rounded-lg border bg-white pr-9 pl-10 text-sm focus:ring-2 focus:ring-[#1B3C73] focus:outline-none",
                errors.locationName ? "border-red-400" : "border-slate-200"
              )}
              placeholder="Enter Location here"
              autoComplete="off"
              onFocus={() => setShowSuggestions(true)}
              onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
            />
            {isSearching && (
              <div className="absolute top-1/2 right-3 -translate-y-1/2">
                <Loader2 className="h-4 w-4 animate-spin text-slate-400" />
              </div>
            )}

            {/* Suggestions dropdown */}
            {showSuggestions && suggestions.length > 0 && (
              <div className="absolute top-[105%] left-0 z-50 mt-1 max-h-64 w-full overflow-y-auto rounded-xl border border-slate-200 bg-white shadow-xl custom-scrollbar">
                {suggestions.map((s, i) => (
                  <button
                    key={i}
                    type="button"
                    className="w-full px-4 py-3 text-left text-sm hover:bg-slate-50 focus:bg-slate-50 focus:outline-none border-b border-slate-100 last:border-b-0"
                    onMouseDown={() => handleSelectSuggestion(s)}
                  >
                    {s.full_address ||
                      `${s.name}${s.place_formatted ? `, ${s.place_formatted}` : ""}`}
                  </button>
                ))}
              </div>
            )}
          </div>

          {errors.locationName && (
            <p className="text-xs text-red-500">{errors.locationName.message}</p>
          )}
          {errors.lat && !errors.locationName && (
            <p className="text-xs text-red-500">Please select a valid location from the list</p>
          )}
        </div>

        {/* Radius */}
        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium text-slate-700">Set radius (in KM)</label>
          <input
            {...register("radius", { valueAsNumber: true })}
            className={cn(
              "h-11 w-full rounded-lg border bg-white px-3 text-sm focus:ring-2 focus:ring-[#1B3C73] focus:outline-none",
              errors.radius ? "border-red-400" : "border-slate-200"
            )}
            placeholder="0"
            type="number"
            step="0.1"
            min="0"
          />
          {errors.radius && <p className="text-xs text-red-500">{errors.radius.message}</p>}
        </div>
      </div>
    );
  }
);

// ---------------------------------------------------------------------------
// LocationDataItem — accordion: summary header + inline form when expanded
// ---------------------------------------------------------------------------

interface LocationDataItemProps {
  entry: LocationEntry;
  index: number;
  isExpanded: boolean;
  onToggle: () => void;
  onCommit: (data: GeofencingFormValues) => void;
  onDelete: () => void;
  accessToken: string;
}

const LocationDataItem = React.forwardRef<{ submit: () => void }, LocationDataItemProps>(
  function LocationDataItem(
    { entry, index, isExpanded, onToggle, onCommit, onDelete, accessToken },
    ref
  ) {
    return (
      <div className={cn("rounded-xl border border-slate-100 bg-slate-50 relative", isExpanded ? "z-50" : "z-10")}>
        {/* Summary header — always visible */}
        <div className="flex items-center justify-between px-4 py-3 rounded-xl overflow-hidden">
          <button
            type="button"
            className="flex flex-1 items-center gap-3 text-left"
            onClick={onToggle}
          >
            <div className="flex-1">
              <p className="text-sm font-semibold text-slate-800">
                {entry.locationName}{" "}
                <span className="font-normal text-slate-500">({entry.radius}km radius)</span>
              </p>
              <p className="text-xs text-slate-400">Location {index + 1}</p>
            </div>
            <ChevronRight
              className={cn(
                "h-4 w-4 shrink-0 text-slate-400 transition-transform duration-200",
                isExpanded && "rotate-90"
              )}
            />
          </button>
          <button
            type="button"
            className="ml-3 rounded p-1 text-red-400 transition-colors hover:bg-red-50 hover:text-red-600"
            onClick={(e) => {
              e.stopPropagation();
              onDelete();
            }}
            aria-label="Delete location"
          >
            <Trash2 className="h-4 w-4" />
          </button>
        </div>

        {/* Inline form — only rendered when expanded */}
        {isExpanded && (
          <div className="relative border-t border-slate-100 px-4 pt-4 pb-4">
            <LocationFormCard
              key={entry.id}
              ref={ref}
              index={index}
              defaultValues={{
                locationName: entry.locationName,
                lat: entry.lat,
                lon: entry.lon,
                radius: entry.radius,
              }}
              onCommit={onCommit}
              onDelete={onDelete}
              accessToken={accessToken}
              hideHeader
            />
          </div>
        )}
      </div>
    );
  }
);

// ---------------------------------------------------------------------------
// GeofencingModal — main modal
// ---------------------------------------------------------------------------

export function GeofencingModal({
  open,
  onOpenChange,
  initialLocations = [],
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  initialLocations?: Array<GeofenceLocation & { name: string }>;
  /** Business name for business accounts, child's name for parent accounts. */
}) {
  const params = useParams();
  const mdmDeviceId = params.device as string;
  const { user } = useAuth();
  const isBusinessUser = user?.appRole === "BUSINESS";

  const { data: business } = useGetBusiness(user?.businessId ?? "", {
    enabled: isBusinessUser && !!user?.businessId,
  });
  // Parent accounts: the child whose device this is, identified by the `childId`
  // query param carried over from the child's device card. Fetched directly by id
  // rather than fetching all children and finding by mdmDeviceId.
  const [childId] = useQueryState("childId", { defaultValue: "" });
  const { data: child } = useChild(childId, { enabled: !isBusinessUser && !!childId });

  const organizationName = isBusinessUser ? business?.name : child?.name;

  const accessToken = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN || "";

  /** All committed entries */
  const [locations, setLocations] = React.useState<LocationEntry[]>([]);

  /** ID of the currently expanded existing entry (null = none open) */
  const [expandedId, setExpandedId] = React.useState<string | null>(null);

  /** Whether a brand-new blank form is shown at the bottom */
  const [isAddingNew, setIsAddingNew] = React.useState(false);

  /** Single ref pointing to whichever form is currently active (expanded item OR new form) */
  const activeFormRef = React.useRef<{ submit: () => void }>(null);

  const pendingNewForm = React.useRef(false);
  const pendingSave = React.useRef(false);

  /** True when the modal was opened with pre-existing geofences. Used to enable "Clear geofencing". */
  const hadInitialLocations = React.useRef(false);

  const { mutateAsync: setRestrictions, isPending } = useSetRestrictions();

  // Seed state when modal opens
  React.useEffect(() => {
    if (open) {
      pendingNewForm.current = false;
      pendingSave.current = false;
      hadInitialLocations.current = initialLocations.length > 0;

      if (initialLocations.length > 0) {
        setLocations(
          initialLocations.map((loc) => ({
            id: loc.id ?? crypto.randomUUID(),
            locationName: loc.name,
            lat: loc.lat,
            lon: loc.lng,
            radius: loc.radius,
          }))
        );
        setExpandedId(null);
        setIsAddingNew(false);
      } else {
        // No initial locations — open a blank new form straight away
        setIsAddingNew(true);
        setExpandedId(null);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  // Reset all state on close
  const handleOpenChange = (value: boolean) => {
    if (!value) {
      setLocations([]);
      setExpandedId(null);
      setIsAddingNew(false);
    }
    onOpenChange(value);
  };

  // -------------------------------------------------------------------------
  // Pending-action effects
  // After a commit updates `locations`, fire any queued action.
  // -------------------------------------------------------------------------
  const prevLocationsLength = React.useRef(locations.length);

  React.useEffect(() => {
    const grew = locations.length > prevLocationsLength.current;
    prevLocationsLength.current = locations.length;

    if (pendingNewForm.current && grew) {
      pendingNewForm.current = false;
      setIsAddingNew(true);
    }

    if (pendingSave.current && grew) {
      pendingSave.current = false;
      fireApiRequest(locations);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [locations]);

  // Also trigger pendingSave when an existing entry is updated (length unchanged)
  // and the expanded form is now closed
  React.useEffect(() => {
    if (pendingSave.current && expandedId === null && !isAddingNew) {
      pendingSave.current = false;
      fireApiRequest(locations);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [expandedId, isAddingNew]);

  // -------------------------------------------------------------------------
  // Commit handlers (separate for existing vs. new entries)
  // -------------------------------------------------------------------------

  const handleCommitExisting = (id: string, data: GeofencingFormValues) => {
    setLocations((prev) =>
      prev.map((loc) =>
        loc.id === id
          ? {
              id,
              locationName: data.locationName,
              lat: data.lat,
              lon: data.lon,
              radius: data.radius,
            }
          : loc
      )
    );
    setExpandedId(null);
  };

  const handleCommitNew = (data: GeofencingFormValues) => {
    const entry: LocationEntry = {
      id: crypto.randomUUID(),
      locationName: data.locationName,
      lat: data.lat,
      lon: data.lon,
      radius: data.radius,
    };
    setLocations((prev) => [...prev, entry]);
    setIsAddingNew(false);
  };

  // -------------------------------------------------------------------------
  // Toggle (accordion open/close)
  // Uses shared expandedId state so only one item can be open at a time.
  // Clicking the same item collapses it; clicking a different one immediately
  // closes the previous and opens the new one.
  // -------------------------------------------------------------------------
  const handleToggle = (id: string) => {
    setExpandedId((prev) => (prev === id ? null : id));
    // If a brand-new form was open at the bottom, close it too
    if (isAddingNew) setIsAddingNew(false);
  };

  // -------------------------------------------------------------------------
  // Delete handlers
  // -------------------------------------------------------------------------

  const handleDeleteLocation = (id: string) => {
    setLocations((prev) => prev.filter((loc) => loc.id !== id));
    if (expandedId === id) setExpandedId(null);
  };

  const handleDeleteNew = () => {
    setIsAddingNew(false);
  };

  // -------------------------------------------------------------------------
  // "Add another location"
  // -------------------------------------------------------------------------
  const handleAddAnother = () => {
    if (expandedId !== null) {
      // Commit the currently expanded entry first, then open new form
      pendingNewForm.current = true;
      activeFormRef.current?.submit();
    } else if (isAddingNew) {
      // Commit the current new form, then open another new one
      pendingNewForm.current = true;
      activeFormRef.current?.submit();
    } else {
      // Nothing open — open a new blank form directly
      setIsAddingNew(true);
    }
  };

  // -------------------------------------------------------------------------
  // Final Save
  // -------------------------------------------------------------------------
  const handleSave = async () => {
    if (expandedId !== null) {
      pendingSave.current = true;
      activeFormRef.current?.submit();
      return;
    }
    if (isAddingNew) {
      pendingSave.current = true;
      activeFormRef.current?.submit();
      return;
    }
    await fireApiRequest(locations);
  };

  const fireApiRequest = async (entries: LocationEntry[]) => {
    // Allow empty array — used when the user clears all geofences
    const geofences: GeofencesRequest[] = entries.map((e) => ({
      lat: e.lat,
      lng: e.lon,
      radius: e.radius,
    }));

    const res = await setRestrictions({
      mdmDeviceId,
      restrictions: { geofences, organizationName },
    });

    if (res) {
      handleOpenChange(false);
    }
  };

  // -------------------------------------------------------------------------
  // Derived
  // -------------------------------------------------------------------------
  const totalCount = locations.length + (isAddingNew ? 1 : 0);
  const hasAnythingToSave = locations.length > 0 || isAddingNew;
  /** True when the user deleted all locations that were pre-populated from the server */
  const isClearMode = hadInitialLocations.current && locations.length === 0 && !isAddingNew;

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className="p-6 sm:max-w-lg">
        <DialogHeader className="mb-3">
          <DialogTitle className="font-bold text-slate-900">Set Geofencing</DialogTitle>
          {totalCount > 0 && (
            <p className="text-sm text-slate-400">
              {locations.length}/{totalCount} location{totalCount !== 1 ? "s" : ""} added
            </p>
          )}
        </DialogHeader>

        <div className="max-h-[60vh] space-y-3 overflow-y-auto pr-1">
          {/* Existing entries — each is an accordion */}
          {locations.map((entry, i) => (
            <LocationDataItem
              key={entry.id}
              ref={expandedId === entry.id ? activeFormRef : null}
              entry={entry}
              index={i}
              isExpanded={expandedId === entry.id}
              onToggle={() => handleToggle(entry.id)}
              onCommit={(data) => handleCommitExisting(entry.id, data)}
              onDelete={() => handleDeleteLocation(entry.id)}
              accessToken={accessToken}
            />
          ))}

          {/* Brand-new entry form at the bottom */}
          {isAddingNew && (
            <LocationFormCard
              key="new"
              ref={activeFormRef}
              index={locations.length}
              onCommit={handleCommitNew}
              onDelete={handleDeleteNew}
              accessToken={accessToken}
            />
          )}
        </div>

        {/* Add another location */}
        <button
          type="button"
          className="mt-2 flex w-full items-center justify-center gap-2 py-2 text-sm font-medium transition-colors"
          onClick={handleAddAnother}
        >
          <Plus className="h-4 w-4 text-orange-600" />
          Add another location
        </button>

        <DialogFooter className="mt-2">
          <Button
            type="button"
            className={cn(
              "h-12 w-full rounded-xl text-base font-semibold",
              isClearMode ? "bg-red-600 hover:bg-red-700" : "bg-[#1B3C73]"
            )}
            disabled={isPending || (!hasAnythingToSave && !isClearMode)}
            onClick={handleSave}
          >
            {isPending ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                {isClearMode ? "Clearing..." : "Saving..."}
              </>
            ) : isClearMode ? (
              "Clear geofencing"
            ) : (
              "Save"
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
