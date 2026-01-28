"use client";

import React from "react"

import { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  X,
  ArrowLeft,
  Camera,
  ImageIcon,
  Plus,
  Trash2,
} from "lucide-react";

interface UploadedPhoto {
  id: string;
  url: string;
  name: string;
}

export default function PhotoUploadPage() {
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const cameraInputRef = useRef<HTMLInputElement>(null);
  const [photos, setPhotos] = useState<UploadedPhoto[]>([]);
  const [isDragging, setIsDragging] = useState(false);

  const maxPhotos = 10;
  const maxFileSize = 5 * 1024 * 1024; // 5MB

  const handleFileSelect = (files: FileList | null) => {
    if (!files) return;

    const newPhotos: UploadedPhoto[] = [];
    const remainingSlots = maxPhotos - photos.length;

    Array.from(files)
      .slice(0, remainingSlots)
      .forEach((file) => {
        if (file.size <= maxFileSize && file.type.startsWith("image/")) {
          const url = URL.createObjectURL(file);
          newPhotos.push({
            id: `photo-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
            url,
            name: file.name,
          });
        }
      });

    setPhotos((prev) => [...prev, ...newPhotos]);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    handleFileSelect(e.dataTransfer.files);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const removePhoto = (id: string) => {
    setPhotos((prev) => {
      const photo = prev.find((p) => p.id === id);
      if (photo) {
        URL.revokeObjectURL(photo.url);
      }
      return prev.filter((p) => p.id !== id);
    });
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  const triggerCameraInput = () => {
    cameraInputRef.current?.click();
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Top Bar */}
      <header className="sticky top-0 z-10 bg-card border-b border-border px-4 py-3">
        <div className="flex items-center justify-between">
          <button
            onClick={() => router.back()}
            className="p-2 -ml-2 text-muted-foreground hover:text-foreground transition-colors"
            aria-label="Go back"
          >
            <ArrowLeft className="w-6 h-6" />
          </button>
          <h1 className="font-semibold text-lg text-foreground">New Proposal</h1>
          <button
            onClick={() => router.push("/dashboard")}
            className="p-2 -mr-2 text-muted-foreground hover:text-foreground transition-colors"
            aria-label="Close"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Progress Dots */}
        <div className="flex items-center justify-center gap-2 mt-3">
          {[1, 2, 3, 4].map((step) => (
            <div
              key={step}
              className={`h-2 rounded-full transition-all ${
                step === 2
                  ? "w-8 bg-primary"
                  : step < 2
                    ? "w-2 bg-primary"
                    : "w-2 bg-muted"
              }`}
            />
          ))}
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 px-4 py-6 pb-32 overflow-y-auto">
        {/* Heading */}
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-foreground mb-1">
            Add Project Photos
          </h2>
          <p className="text-muted-foreground">
            Show the customer what needs to be done
          </p>
        </div>

        {/* Hidden File Inputs */}
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          multiple
          className="hidden"
          onChange={(e) => handleFileSelect(e.target.files)}
        />
        <input
          ref={cameraInputRef}
          type="file"
          accept="image/*"
          capture="environment"
          className="hidden"
          onChange={(e) => handleFileSelect(e.target.files)}
        />

        {/* Dropzone */}
        {photos.length < maxPhotos && (
          <button
            type="button"
            onClick={triggerFileInput}
            onDrop={handleDrop}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            className={`w-full h-[200px] border-2 border-dashed rounded-xl flex flex-col items-center justify-center gap-3 transition-all cursor-pointer mb-6 ${
              isDragging
                ? "border-primary bg-primary/10"
                : "border-border hover:border-primary/50 hover:bg-muted/50"
            }`}
          >
            <div
              className={`w-16 h-16 rounded-full flex items-center justify-center transition-colors ${
                isDragging ? "bg-primary/20" : "bg-primary/10"
              }`}
            >
              <Camera className="w-8 h-8 text-primary" />
            </div>
            <div className="text-center">
              <p className="font-medium text-foreground">Tap to Add Photos</p>
              <p className="text-sm text-muted-foreground mt-1">
                Max 10 photos, 5MB each
              </p>
            </div>
          </button>
        )}

        {/* Quick Action Buttons */}
        {photos.length < maxPhotos && (
          <div className="grid grid-cols-2 gap-3 mb-6">
            <Button
              variant="outline"
              className="h-14 gap-2 font-medium bg-transparent"
              onClick={triggerCameraInput}
            >
              <Camera className="w-5 h-5" />
              Take Photo
            </Button>
            <Button
              variant="outline"
              className="h-14 gap-2 font-medium bg-transparent"
              onClick={triggerFileInput}
            >
              <ImageIcon className="w-5 h-5" />
              Choose from Library
            </Button>
          </div>
        )}

        {/* Photo Grid */}
        {photos.length > 0 && (
          <div className="space-y-3">
            <div className="grid grid-cols-2 gap-4">
              {photos.map((photo, index) => (
                <div
                  key={photo.id}
                  className="relative aspect-square rounded-xl overflow-hidden bg-muted animate-in fade-in zoom-in-95 duration-300"
                  style={{ animationDelay: `${index * 50}ms` }}
                >
                  <img
                    src={photo.url || "/placeholder.svg"}
                    alt={photo.name}
                    className="w-full h-full object-cover"
                  />
                  <button
                    onClick={() => removePhoto(photo.id)}
                    className="absolute top-2 right-2 w-8 h-8 bg-foreground/80 hover:bg-foreground text-background rounded-full flex items-center justify-center transition-colors"
                    aria-label={`Remove ${photo.name}`}
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              ))}

              {/* Add More Button */}
              {photos.length < maxPhotos && (
                <button
                  onClick={triggerFileInput}
                  className="aspect-square rounded-xl border-2 border-dashed border-border hover:border-primary/50 hover:bg-muted/50 flex flex-col items-center justify-center gap-2 transition-all"
                >
                  <Plus className="w-8 h-8 text-muted-foreground" />
                  <span className="text-sm text-muted-foreground">Add More</span>
                </button>
              )}
            </div>

            {/* Photo Counter */}
            <p className="text-sm text-muted-foreground text-center">
              {photos.length}/{maxPhotos} photos
            </p>
          </div>
        )}
      </main>

      {/* Bottom Actions */}
      <div className="fixed bottom-0 left-0 right-0 bg-card border-t border-border p-4 pb-6">
        <div className="flex items-center justify-between gap-4">
          <button
            onClick={() => router.push("/proposals/new/services")}
            className="text-muted-foreground hover:text-foreground transition-colors font-medium py-3 px-4"
          >
            Skip Photos
          </button>
          <Button
            onClick={() => router.push("/proposals/new/services")}
            disabled={photos.length === 0}
            className="flex-1 h-[60px] text-lg font-semibold bg-primary hover:bg-primary/90 disabled:opacity-50"
          >
            Continue
          </Button>
        </div>
      </div>
    </div>
  );
}
