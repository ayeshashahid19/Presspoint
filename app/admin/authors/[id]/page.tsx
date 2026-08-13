"use client";

import * as React from "react";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function EditAuthor({ params }: { params: Promise<{ id: string }> }) {
  const router = useRouter();
  const { id } = React.use(params);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    bio: "",
    avatar: "",
    expertise: "",
    facebook: "",
    twitter: "",
    instagram: "",
    linkedin: "",
  });

  useEffect(() => {
    async function fetchAuthor() {
      try {
        const res = await fetch(`/api/authors/${id}`);
        if (res.ok) {
          const data = await res.json();
          setFormData({
            name: data.name || "",
            bio: data.bio || "",
            avatar: data.avatar || "",
            expertise: data.expertise || "",
            facebook: data.facebook || "",
            twitter: data.twitter || "",
            instagram: data.instagram || "",
            linkedin: data.linkedin || "",
          });
        } else {
          alert("Author not found");
          router.push("/admin/authors");
        }
      } catch (error) {
        console.error("Error fetching author:", error);
        alert("Failed to fetch author");
      } finally {
        setLoading(false);
      }
    }
    fetchAuthor();
  }, [id, router]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);

    try {
      const res = await fetch(`/api/authors/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        router.push("/admin/authors");
      } else {
        const error = await res.json();
        alert(error.error || "Failed to update author");
      }
    } catch (error) {
      alert("Failed to update author");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="admin-loading">
        <div className="admin-loading-spinner"></div>
        <p>Loading author...</p>
      </div>
    );
  }

  return (
    <div>
      <h1 className="admin-page-title">Edit Author</h1>
      <p className="admin-page-subtitle">Update author details</p>

      <form onSubmit={handleSubmit} className="admin-form-wrapper">
        <div className="admin-form-group">
          <label className="admin-form-label">Name <span className="required">*</span></label>
          <input
            type="text"
            name="name"
            className="admin-form-control"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>

        <div className="admin-form-group">
          <label className="admin-form-label">Bio</label>
          <textarea
            name="bio"
            className="admin-form-control"
            value={formData.bio}
            onChange={handleChange}
            rows={4}
          />
        </div>

        <div className="admin-form-group">
          <label className="admin-form-label">Avatar URL</label>
          <input
            type="text"
            name="avatar"
            className="admin-form-control"
            value={formData.avatar}
            onChange={handleChange}
          />
        </div>

        <div className="admin-form-group">
          <label className="admin-form-label">Expertise</label>
          <input
            type="text"
            name="expertise"
            className="admin-form-control"
            value={formData.expertise}
            onChange={handleChange}
          />
        </div>

        <div className="admin-form-group">
          <label className="admin-form-label">Social Links</label>
          <input
            type="text"
            name="facebook"
            className="admin-form-control"
            value={formData.facebook}
            onChange={handleChange}
            placeholder="Facebook URL"
            style={{ marginBottom: "8px" }}
          />
          <input
            type="text"
            name="twitter"
            className="admin-form-control"
            value={formData.twitter}
            onChange={handleChange}
            placeholder="Twitter URL"
            style={{ marginBottom: "8px" }}
          />
          <input
            type="text"
            name="instagram"
            className="admin-form-control"
            value={formData.instagram}
            onChange={handleChange}
            placeholder="Instagram URL"
            style={{ marginBottom: "8px" }}
          />
          <input
            type="text"
            name="linkedin"
            className="admin-form-control"
            value={formData.linkedin}
            onChange={handleChange}
            placeholder="LinkedIn URL"
          />
        </div>

        <div className="admin-form-actions">
          <button type="submit" className="admin-btn-primary" disabled={saving}>
            {saving ? "Saving..." : "Update Author"}
          </button>
          <Link href="/admin/authors" className="admin-btn-secondary">
            Cancel
          </Link>
        </div>
      </form>
    </div>
  );
}