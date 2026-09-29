'use client';

import React, { useState, useEffect, useCallback } from 'react';
import {
  AdminLocation,
  getAdminLocationsApi,
  createAdminLocationApi,
  updateAdminLocationApi,
} from '@/lib/api/admin-locations';
import { LocationType, formatLocationType } from '@/lib/api/public';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from '@/components/ui/card';
import {
  AlertCircle,
  CheckCircle2,
  Loader2,
  Plus,
  Pencil,
  Power,
  Building2,
  MapPin,
} from 'lucide-react';

const LOCATION_TYPE_OPTIONS: { value: LocationType; label: string }[] = [
  { value: 'TRAINING_CENTRE', label: 'Training Centre' },
  { value: 'PARTNER_POOL', label: 'Partner Pool' },
  { value: 'HOTEL_POOL', label: 'Hotel Pool' },
  { value: 'CLIENT_PRIVATE_POOL', label: 'Client Private Pool' },
  { value: 'OTHER', label: 'Other' },
];

export function AdminLocationManager() {
  const [locations, setLocations] = useState<AdminLocation[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [fetchError, setFetchError] = useState<string | null>(null);

  // Form modal state
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingLocation, setEditingLocation] = useState<AdminLocation | null>(null);

  // Form input fields
  const [name, setName] = useState('');
  const [type, setType] = useState<LocationType>('TRAINING_CENTRE');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [description, setDescription] = useState('');
  const [isActive, setIsActive] = useState(true);

  // Form errors & loading
  const [nameError, setNameError] = useState('');
  const [typeError, setTypeError] = useState('');
  const [formError, setFormError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Action status per location ID (for deactivate/activate toggling)
  const [actionId, setActionId] = useState<string | null>(null);

  const fetchLocations = useCallback(async () => {
    setIsLoading(true);
    setFetchError(null);
    const result = await getAdminLocationsApi();
    if (result.error) {
      setFetchError(result.error);
      setLocations([]);
    } else if (result.data) {
      setLocations(result.data);
    }
    setIsLoading(false);
  }, []);

  useEffect(() => {
    fetchLocations();
  }, [fetchLocations]);

  const openCreateForm = () => {
    setEditingLocation(null);
    setName('');
    setType('TRAINING_CENTRE');
    setAddress('');
    setCity('');
    setState('');
    setDescription('');
    setIsActive(true);
    setNameError('');
    setTypeError('');
    setFormError('');
    setSuccessMessage('');
    setIsFormOpen(true);
  };

  const openEditForm = (loc: AdminLocation) => {
    setEditingLocation(loc);
    setName(loc.name);
    setType(loc.type);
    setAddress(loc.address || '');
    setCity(loc.city || '');
    setState(loc.state || '');
    setDescription(loc.description || '');
    setIsActive(loc.isActive);
    setNameError('');
    setTypeError('');
    setFormError('');
    setSuccessMessage('');
    setIsFormOpen(true);
  };

  const closeForm = () => {
    setIsFormOpen(false);
    setEditingLocation(null);
  };

  const validateForm = (): boolean => {
    let isValid = true;
    setNameError('');
    setTypeError('');
    setFormError('');

    if (!name.trim()) {
      setNameError('Location name is required.');
      isValid = false;
    }

    if (!type) {
      setTypeError('Please select a valid location type.');
      isValid = false;
    }

    return isValid;
  };

  const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsSubmitting(true);
    setFormError('');
    setSuccessMessage('');

    if (editingLocation) {
      // Update existing location
      const result = await updateAdminLocationApi(editingLocation.id, {
        name: name.trim(),
        type,
        address: address.trim() || undefined,
        city: city.trim() || undefined,
        state: state.trim() || undefined,
        description: description.trim() || undefined,
        isActive,
      });

      if (result.success && result.location) {
        setSuccessMessage('Location updated successfully!');
        await fetchLocations();
        closeForm();
      } else {
        setFormError(result.errorMessage || 'Failed to update location.');
      }
    } else {
      // Create new location
      const result = await createAdminLocationApi({
        name: name.trim(),
        type,
        address: address.trim() || undefined,
        city: city.trim() || undefined,
        state: state.trim() || undefined,
        description: description.trim() || undefined,
      });

      if (result.success && result.location) {
        setSuccessMessage('Location created successfully!');
        await fetchLocations();
        closeForm();
      } else {
        setFormError(result.errorMessage || 'Failed to create location.');
      }
    }

    setIsSubmitting(false);
  };

  const handleToggleActive = async (loc: AdminLocation) => {
    setActionId(loc.id);
    setFormError('');
    setSuccessMessage('');

    const newStatus = !loc.isActive;
    const result = await updateAdminLocationApi(loc.id, { isActive: newStatus });

    if (result.success && result.location) {
      setSuccessMessage(
        `Location "${loc.name}" has been ${newStatus ? 'activated' : 'deactivated'}.`
      );
      await fetchLocations();
    } else {
      setFormError(result.errorMessage || 'Failed to update location status.');
    }

    setActionId(null);
  };

  return (
    <div className="space-y-6">
      {/* Header & Primary Action */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-foreground">
            Location Management
          </h1>
          <p className="text-sm text-muted-foreground mt-1">
            Create, update, and manage AquaCore pool facilities and training locations.
          </p>
        </div>
        <Button onClick={openCreateForm} className="shrink-0">
          <Plus className="h-4 w-4 mr-2" />
          Add Location
        </Button>
      </div>

      {/* Success Notification Alert */}
      {successMessage && (
        <div
          role="status"
          aria-live="polite"
          className="flex items-start gap-3 rounded-md border border-emerald-500/20 bg-emerald-50 text-emerald-800 dark:bg-emerald-950/30 dark:text-emerald-300 p-4 text-sm font-medium"
        >
          <CheckCircle2 className="h-5 w-5 shrink-0 mt-0.5 text-emerald-600 dark:text-emerald-400" />
          <div className="flex-1">{successMessage}</div>
        </div>
      )}

      {/* Global Form/Action Error Alert */}
      {formError && !isFormOpen && (
        <div
          role="alert"
          aria-live="assertive"
          className="flex items-start gap-3 rounded-md border border-destructive/20 bg-destructive/10 p-4 text-sm text-destructive"
        >
          <AlertCircle className="h-5 w-5 shrink-0 mt-0.5" />
          <div className="flex-1">{formError}</div>
        </div>
      )}

      {/* Create / Edit Form Drawer/Modal Card */}
      {isFormOpen && (
        <Card className="border-primary/20 shadow-md">
          <CardHeader className="border-b border-border">
            <CardTitle className="text-lg font-semibold">
              {editingLocation ? 'Edit Location' : 'Create New Location'}
            </CardTitle>
            <CardDescription className="text-xs">
              {editingLocation
                ? `Update details for location "${editingLocation.name}".`
                : 'Add a new swimming pool or aquatic training facility.'}
            </CardDescription>
          </CardHeader>
          <CardContent className="pt-6">
            {formError && (
              <div
                role="alert"
                aria-live="assertive"
                className="mb-4 flex items-start gap-3 rounded-md border border-destructive/20 bg-destructive/10 p-3 text-sm text-destructive"
              >
                <AlertCircle className="h-5 w-5 shrink-0 mt-0.5" />
                <div className="flex-1">{formError}</div>
              </div>
            )}

            <form id="admin-location-form" onSubmit={handleFormSubmit} noValidate className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="loc-name" required>
                    Location Name
                  </Label>
                  <Input
                    id="loc-name"
                    type="text"
                    placeholder="e.g. National Stadium Aquatic Centre"
                    value={name}
                    onChange={(e) => {
                      setName(e.target.value);
                      if (nameError) setNameError('');
                      if (formError) setFormError('');
                    }}
                    error={!!nameError}
                    aria-invalid={!!nameError}
                    disabled={isSubmitting}
                  />
                  {nameError && (
                    <p className="text-xs text-destructive font-medium">{nameError}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="loc-type" required>
                    Location Type
                  </Label>
                  <select
                    id="loc-type"
                    value={type}
                    onChange={(e) => {
                      setType(e.target.value as LocationType);
                      if (typeError) setTypeError('');
                      if (formError) setFormError('');
                    }}
                    className="flex h-9 w-full rounded-md border border-input bg-background px-3 py-1 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
                    disabled={isSubmitting}
                  >
                    {LOCATION_TYPE_OPTIONS.map((opt) => (
                      <option key={opt.value} value={opt.value}>
                        {opt.label}
                      </option>
                    ))}
                  </select>
                  {typeError && (
                    <p className="text-xs text-destructive font-medium">{typeError}</p>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="space-y-2 sm:col-span-1">
                  <Label htmlFor="loc-address">Address (Optional)</Label>
                  <Input
                    id="loc-address"
                    type="text"
                    placeholder="e.g. Package A, Stadium Complex"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    disabled={isSubmitting}
                  />
                </div>

                <div className="space-y-2 sm:col-span-1">
                  <Label htmlFor="loc-city">City (Optional)</Label>
                  <Input
                    id="loc-city"
                    type="text"
                    placeholder="e.g. Abuja"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    disabled={isSubmitting}
                  />
                </div>

                <div className="space-y-2 sm:col-span-1">
                  <Label htmlFor="loc-state">State (Optional)</Label>
                  <Input
                    id="loc-state"
                    type="text"
                    placeholder="e.g. FCT"
                    value={state}
                    onChange={(e) => setState(e.target.value)}
                    disabled={isSubmitting}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="loc-desc">Description (Optional)</Label>
                <textarea
                  id="loc-desc"
                  rows={3}
                  className="flex w-full rounded-md border border-input bg-background px-3 py-2 text-sm shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
                  placeholder="Facility features, access details, or entry guidelines..."
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  disabled={isSubmitting}
                />
              </div>

              {editingLocation && (
                <div className="flex items-center gap-2 pt-2">
                  <input
                    id="loc-isactive"
                    type="checkbox"
                    checked={isActive}
                    onChange={(e) => setIsActive(e.target.checked)}
                    className="h-4 w-4 rounded border-border text-primary focus:ring-primary cursor-pointer"
                    disabled={isSubmitting}
                  />
                  <Label htmlFor="loc-isactive" className="cursor-pointer text-sm">
                    Location is Active (Visible on public location discovery)
                  </Label>
                </div>
              )}
            </form>
          </CardContent>
          <CardFooter className="flex justify-end gap-3 border-t border-border pt-4">
            <Button variant="outline" type="button" onClick={closeForm} disabled={isSubmitting}>
              Cancel
            </Button>
            <Button type="submit" form="admin-location-form" disabled={isSubmitting}>
              {isSubmitting ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin mr-2" />
                  Saving...
                </>
              ) : editingLocation ? (
                'Update Location'
              ) : (
                'Create Location'
              )}
            </Button>
          </CardFooter>
        </Card>
      )}

      {/* Loading State */}
      {isLoading && (
        <div className="flex justify-center py-12 text-muted-foreground">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      )}

      {/* Fetch Error State */}
      {!isLoading && fetchError && (
        <Card className="border-destructive/20 bg-destructive/10">
          <CardContent className="pt-6 flex items-center gap-3 text-sm text-destructive">
            <AlertCircle className="h-5 w-5 shrink-0" />
            <div>{fetchError}</div>
          </CardContent>
        </Card>
      )}

      {/* Empty State */}
      {!isLoading && !fetchError && locations.length === 0 && !isFormOpen && (
        <Card className="text-center p-8 border-dashed border-border shadow-none">
          <CardContent className="pt-6 space-y-3">
            <div className="mx-auto w-12 h-12 rounded-full bg-muted flex items-center justify-center text-muted-foreground">
              <Building2 className="w-6 h-6" />
            </div>
            <h2 className="text-lg font-semibold text-foreground">No Locations Found</h2>
            <p className="text-sm text-muted-foreground max-w-md mx-auto">
              No training locations have been added yet. Click &quot;Add Location&quot; above to add the first facility.
            </p>
            <Button onClick={openCreateForm} size="sm" className="mt-2">
              <Plus className="h-4 w-4 mr-2" />
              Add Location
            </Button>
          </CardContent>
        </Card>
      )}

      {/* Location Table / Cards List */}
      {!isLoading && !fetchError && locations.length > 0 && (
        <div className="space-y-4">
          <div className="hidden md:block overflow-x-auto rounded-lg border border-border bg-card shadow-sm">
            <table className="w-full text-left text-sm text-foreground">
              <thead className="bg-muted/50 border-b border-border text-xs uppercase font-semibold text-muted-foreground">
                <tr>
                  <th className="px-4 py-3">Location Name</th>
                  <th className="px-4 py-3">Type</th>
                  <th className="px-4 py-3">Address / City</th>
                  <th className="px-4 py-3">Status</th>
                  <th className="px-4 py-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {locations.map((loc) => {
                  const locationSummary = [loc.address, loc.city, loc.state]
                    .filter(Boolean)
                    .join(', ');

                  return (
                    <tr key={loc.id} className="hover:bg-muted/30 transition-colors">
                      <td className="px-4 py-3.5 font-medium text-foreground">{loc.name}</td>
                      <td className="px-4 py-3.5">
                        <Badge variant="outline">{formatLocationType(loc.type)}</Badge>
                      </td>
                      <td className="px-4 py-3.5 text-xs text-muted-foreground max-w-xs truncate">
                        {locationSummary ? (
                          <div className="flex items-center gap-1.5">
                            <MapPin className="w-3.5 h-3.5 shrink-0 text-primary" />
                            <span>{locationSummary}</span>
                          </div>
                        ) : (
                          '—'
                        )}
                      </td>
                      <td className="px-4 py-3.5">
                        {loc.isActive ? (
                          <Badge variant="secondary" className="bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300">
                            Active
                          </Badge>
                        ) : (
                          <Badge variant="outline" className="text-muted-foreground">
                            Inactive
                          </Badge>
                        )}
                      </td>
                      <td className="px-4 py-3.5 text-right space-x-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => openEditForm(loc)}
                          disabled={actionId === loc.id}
                        >
                          <Pencil className="h-3.5 w-3.5 mr-1" />
                          Edit
                        </Button>
                        <Button
                          variant={loc.isActive ? 'destructive' : 'secondary'}
                          size="sm"
                          onClick={() => handleToggleActive(loc)}
                          disabled={actionId === loc.id}
                        >
                          {actionId === loc.id ? (
                            <Loader2 className="h-3.5 w-3.5 animate-spin" />
                          ) : (
                            <>
                              <Power className="h-3.5 w-3.5 mr-1" />
                              {loc.isActive ? 'Deactivate' : 'Activate'}
                            </>
                          )}
                        </Button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {/* Mobile Responsive Cards (Visible on screens < 768px) */}
          <div className="grid grid-cols-1 gap-4 md:hidden">
            {locations.map((loc) => {
              const locationSummary = [loc.address, loc.city, loc.state]
                .filter(Boolean)
                .join(', ');

              return (
                <Card key={loc.id} className="shadow-sm">
                  <CardHeader className="pb-3 space-y-1">
                    <div className="flex items-start justify-between gap-2">
                      <CardTitle className="text-base font-bold">{loc.name}</CardTitle>
                      {loc.isActive ? (
                        <Badge variant="secondary" className="bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300">
                          Active
                        </Badge>
                      ) : (
                        <Badge variant="outline" className="text-muted-foreground">
                          Inactive
                        </Badge>
                      )}
                    </div>
                    <div className="flex items-center gap-2 pt-1">
                      <Badge variant="outline">{formatLocationType(loc.type)}</Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="py-0 text-xs text-muted-foreground space-y-1">
                    {locationSummary && (
                      <div className="flex items-center gap-1.5">
                        <MapPin className="w-3.5 h-3.5 shrink-0 text-primary" />
                        <span>{locationSummary}</span>
                      </div>
                    )}
                    {loc.description && <p className="line-clamp-2 pt-1">{loc.description}</p>}
                  </CardContent>
                  <CardFooter className="pt-3 border-t border-border mt-3 flex items-center justify-end gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => openEditForm(loc)}
                      disabled={actionId === loc.id}
                    >
                      <Pencil className="h-3.5 w-3.5 mr-1" />
                      Edit
                    </Button>
                    <Button
                      variant={loc.isActive ? 'destructive' : 'secondary'}
                      size="sm"
                      onClick={() => handleToggleActive(loc)}
                      disabled={actionId === loc.id}
                    >
                      {actionId === loc.id ? (
                        <Loader2 className="h-3.5 w-3.5 animate-spin" />
                      ) : (
                        <>
                          <Power className="h-3.5 w-3.5 mr-1" />
                          {loc.isActive ? 'Deactivate' : 'Activate'}
                        </>
                      )}
                    </Button>
                  </CardFooter>
                </Card>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
