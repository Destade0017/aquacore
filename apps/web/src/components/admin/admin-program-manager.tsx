'use client';

import React, { useState, useEffect, useCallback } from 'react';
import {
  AdminProgram,
  getAdminProgramsApi,
  createAdminProgramApi,
  updateAdminProgramApi,
} from '@/lib/api/admin-programs';
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
  BookOpen,
} from 'lucide-react';

export function AdminProgramManager() {
  const [programs, setPrograms] = useState<AdminProgram[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [fetchError, setFetchError] = useState<string | null>(null);

  // Form modal state
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingProgram, setEditingProgram] = useState<AdminProgram | null>(null);

  // Form input fields
  const [name, setName] = useState('');
  const [slug, setSlug] = useState('');
  const [description, setDescription] = useState('');
  const [isActive, setIsActive] = useState(true);

  // Form errors & loading
  const [nameError, setNameError] = useState('');
  const [slugError, setSlugError] = useState('');
  const [formError, setFormError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Action status per program ID (for deactivate/activate toggling)
  const [actionId, setActionId] = useState<string | null>(null);

  const fetchPrograms = useCallback(async () => {
    setIsLoading(true);
    setFetchError(null);
    const result = await getAdminProgramsApi();
    if (result.error) {
      setFetchError(result.error);
      setPrograms([]);
    } else if (result.data) {
      setPrograms(result.data);
    }
    setIsLoading(false);
  }, []);

  useEffect(() => {
    fetchPrograms();
  }, [fetchPrograms]);

  const generateSlug = (val: string) => {
    return val
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-');
  };

  const handleNameChange = (val: string) => {
    setName(val);
    if (nameError) setNameError('');
    if (formError) setFormError('');
    // Auto-generate slug if not editing an existing program or if slug hasn't been manually edited
    if (!editingProgram) {
      setSlug(generateSlug(val));
      if (slugError) setSlugError('');
    }
  };

  const openCreateForm = () => {
    setEditingProgram(null);
    setName('');
    setSlug('');
    setDescription('');
    setIsActive(true);
    setNameError('');
    setSlugError('');
    setFormError('');
    setSuccessMessage('');
    setIsFormOpen(true);
  };

  const openEditForm = (prog: AdminProgram) => {
    setEditingProgram(prog);
    setName(prog.name);
    setSlug(prog.slug);
    setDescription(prog.description || '');
    setIsActive(prog.isActive);
    setNameError('');
    setSlugError('');
    setFormError('');
    setSuccessMessage('');
    setIsFormOpen(true);
  };

  const closeForm = () => {
    setIsFormOpen(false);
    setEditingProgram(null);
  };

  const validateForm = (): boolean => {
    let isValid = true;
    setNameError('');
    setSlugError('');
    setFormError('');

    if (!name.trim()) {
      setNameError('Program name is required.');
      isValid = false;
    }

    if (!slug.trim()) {
      setSlugError('Program slug is required.');
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

    if (editingProgram) {
      // Update existing program
      const result = await updateAdminProgramApi(editingProgram.id, {
        name: name.trim(),
        slug: slug.trim().toLowerCase(),
        description: description.trim() || undefined,
        isActive,
      });

      if (result.success && result.program) {
        setSuccessMessage('Program updated successfully!');
        await fetchPrograms();
        closeForm();
      } else {
        setFormError(result.errorMessage || 'Failed to update program.');
      }
    } else {
      // Create new program
      const result = await createAdminProgramApi({
        name: name.trim(),
        slug: slug.trim().toLowerCase(),
        description: description.trim() || undefined,
      });

      if (result.success && result.program) {
        setSuccessMessage('Program created successfully!');
        await fetchPrograms();
        closeForm();
      } else {
        setFormError(result.errorMessage || 'Failed to create program.');
      }
    }

    setIsSubmitting(false);
  };

  const handleToggleActive = async (prog: AdminProgram) => {
    setActionId(prog.id);
    setFormError('');
    setSuccessMessage('');

    const newStatus = !prog.isActive;
    const result = await updateAdminProgramApi(prog.id, { isActive: newStatus });

    if (result.success && result.program) {
      setSuccessMessage(
        `Program "${prog.name}" has been ${newStatus ? 'activated' : 'deactivated'}.`
      );
      await fetchPrograms();
    } else {
      setFormError(result.errorMessage || 'Failed to update program status.');
    }

    setActionId(null);
  };

  return (
    <div className="space-y-6">
      {/* Header & Primary Action */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-foreground">
            Program Management
          </h1>
          <p className="text-sm text-muted-foreground mt-1">
            Create, update, and manage AquaCore aquatic programs and offerings.
          </p>
        </div>
        <Button onClick={openCreateForm} className="shrink-0">
          <Plus className="h-4 w-4 mr-2" />
          Add Program
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
              {editingProgram ? 'Edit Program' : 'Create New Program'}
            </CardTitle>
            <CardDescription className="text-xs">
              {editingProgram
                ? `Update properties for program "${editingProgram.name}".`
                : 'Add a new aquatic program offering to the AquaCore catalogue.'}
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

            <form id="admin-program-form" onSubmit={handleFormSubmit} noValidate className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="prog-name" required>
                    Program Name
                  </Label>
                  <Input
                    id="prog-name"
                    type="text"
                    placeholder="e.g. Lifeguard Certification"
                    value={name}
                    onChange={(e) => handleNameChange(e.target.value)}
                    error={!!nameError}
                    aria-invalid={!!nameError}
                    disabled={isSubmitting}
                  />
                  {nameError && (
                    <p className="text-xs text-destructive font-medium">{nameError}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="prog-slug" required>
                    URL Slug
                  </Label>
                  <Input
                    id="prog-slug"
                    type="text"
                    placeholder="e.g. lifeguard-certification"
                    value={slug}
                    onChange={(e) => {
                      setSlug(e.target.value);
                      if (slugError) setSlugError('');
                    }}
                    error={!!slugError}
                    aria-invalid={!!slugError}
                    disabled={isSubmitting}
                  />
                  {slugError && (
                    <p className="text-xs text-destructive font-medium">{slugError}</p>
                  )}
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="prog-desc">Description (Optional)</Label>
                <textarea
                  id="prog-desc"
                  rows={3}
                  className="flex w-full rounded-md border border-input bg-background px-3 py-2 text-sm shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
                  placeholder="Provide an overview of this program's training objectives..."
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  disabled={isSubmitting}
                />
              </div>

              {editingProgram && (
                <div className="flex items-center gap-2 pt-2">
                  <input
                    id="prog-isactive"
                    type="checkbox"
                    checked={isActive}
                    onChange={(e) => setIsActive(e.target.checked)}
                    className="h-4 w-4 rounded border-border text-primary focus:ring-primary cursor-pointer"
                    disabled={isSubmitting}
                  />
                  <Label htmlFor="prog-isactive" className="cursor-pointer text-sm">
                    Program is Active (Visible on public catalogue)
                  </Label>
                </div>
              )}
            </form>
          </CardContent>
          <CardFooter className="flex justify-end gap-3 border-t border-border pt-4">
            <Button variant="outline" type="button" onClick={closeForm} disabled={isSubmitting}>
              Cancel
            </Button>
            <Button type="submit" form="admin-program-form" disabled={isSubmitting}>
              {isSubmitting ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin mr-2" />
                  Saving...
                </>
              ) : editingProgram ? (
                'Update Program'
              ) : (
                'Create Program'
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
      {!isLoading && !fetchError && programs.length === 0 && !isFormOpen && (
        <Card className="text-center p-8 border-dashed border-border shadow-none">
          <CardContent className="pt-6 space-y-3">
            <div className="mx-auto w-12 h-12 rounded-full bg-muted flex items-center justify-center text-muted-foreground">
              <BookOpen className="w-6 h-6" />
            </div>
            <h2 className="text-lg font-semibold text-foreground">No Programs Found</h2>
            <p className="text-sm text-muted-foreground max-w-md mx-auto">
              No programs have been created yet. Click &quot;Add Program&quot; above to create the first program offering.
            </p>
            <Button onClick={openCreateForm} size="sm" className="mt-2">
              <Plus className="h-4 w-4 mr-2" />
              Add Program
            </Button>
          </CardContent>
        </Card>
      )}

      {/* Program Table / Cards List */}
      {!isLoading && !fetchError && programs.length > 0 && (
        <div className="space-y-4">
          <div className="hidden md:block overflow-x-auto rounded-lg border border-border bg-card shadow-sm">
            <table className="w-full text-left text-sm text-foreground">
              <thead className="bg-muted/50 border-b border-border text-xs uppercase font-semibold text-muted-foreground">
                <tr>
                  <th className="px-4 py-3">Program Name</th>
                  <th className="px-4 py-3">Slug</th>
                  <th className="px-4 py-3">Status</th>
                  <th className="px-4 py-3">Description</th>
                  <th className="px-4 py-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {programs.map((prog) => (
                  <tr key={prog.id} className="hover:bg-muted/30 transition-colors">
                    <td className="px-4 py-3.5 font-medium text-foreground">{prog.name}</td>
                    <td className="px-4 py-3.5 font-mono text-xs text-muted-foreground">{prog.slug}</td>
                    <td className="px-4 py-3.5">
                      {prog.isActive ? (
                        <Badge variant="secondary" className="bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300">
                          Active
                        </Badge>
                      ) : (
                        <Badge variant="outline" className="text-muted-foreground">
                          Inactive
                        </Badge>
                      )}
                    </td>
                    <td className="px-4 py-3.5 text-xs text-muted-foreground max-w-xs truncate">
                      {prog.description || '—'}
                    </td>
                    <td className="px-4 py-3.5 text-right space-x-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => openEditForm(prog)}
                        disabled={actionId === prog.id}
                      >
                        <Pencil className="h-3.5 w-3.5 mr-1" />
                        Edit
                      </Button>
                      <Button
                        variant={prog.isActive ? 'destructive' : 'secondary'}
                        size="sm"
                        onClick={() => handleToggleActive(prog)}
                        disabled={actionId === prog.id}
                      >
                        {actionId === prog.id ? (
                          <Loader2 className="h-3.5 w-3.5 animate-spin" />
                        ) : (
                          <>
                            <Power className="h-3.5 w-3.5 mr-1" />
                            {prog.isActive ? 'Deactivate' : 'Activate'}
                          </>
                        )}
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile Responsive Cards (Visible on screens < 768px) */}
          <div className="grid grid-cols-1 gap-4 md:hidden">
            {programs.map((prog) => (
              <Card key={prog.id} className="shadow-sm">
                <CardHeader className="pb-3 space-y-1">
                  <div className="flex items-start justify-between gap-2">
                    <CardTitle className="text-base font-bold">{prog.name}</CardTitle>
                    {prog.isActive ? (
                      <Badge variant="secondary" className="bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300">
                        Active
                      </Badge>
                    ) : (
                      <Badge variant="outline" className="text-muted-foreground">
                        Inactive
                      </Badge>
                    )}
                  </div>
                  <CardDescription className="font-mono text-xs text-muted-foreground">
                    slug: {prog.slug}
                  </CardDescription>
                </CardHeader>
                {prog.description && (
                  <CardContent className="py-0 text-xs text-muted-foreground line-clamp-2">
                    {prog.description}
                  </CardContent>
                )}
                <CardFooter className="pt-3 border-t border-border mt-3 flex items-center justify-end gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => openEditForm(prog)}
                    disabled={actionId === prog.id}
                  >
                    <Pencil className="h-3.5 w-3.5 mr-1" />
                    Edit
                  </Button>
                  <Button
                    variant={prog.isActive ? 'destructive' : 'secondary'}
                    size="sm"
                    onClick={() => handleToggleActive(prog)}
                    disabled={actionId === prog.id}
                  >
                    {actionId === prog.id ? (
                      <Loader2 className="h-3.5 w-3.5 animate-spin" />
                    ) : (
                      <>
                        <Power className="h-3.5 w-3.5 mr-1" />
                        {prog.isActive ? 'Deactivate' : 'Activate'}
                      </>
                    )}
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
