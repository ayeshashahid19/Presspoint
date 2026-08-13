"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function NewAuthor() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
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

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch("/api/authors", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        router.push("/admin/authors");
      } else {
        const error = await res.json();
        alert(error.error || "Failed to create author");
      }
    } catch (error) {
      alert("Failed to create author");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h1 className="admin-page-title">Create New Author</h1>
      <p className="admin-page-subtitle">Add a new author to your website</p>

      <form onSubmit={handleSubmit} className="admin-form-wrapper">
        <div className="admin-form-group">
          <label className="admin-form-label">
            Name <span className="required">*</span>
          </label>
          <input
            type="text"
            name="name"
            className="admin-form-control"
            value={formData.name}
            onChange={handleChange}
            required
            placeholder="e.g., James Patel"
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
            placeholder="Writer's biography"
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
            placeholder="https://example.com/avatar.jpg"
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
            placeholder="e.g., Technology, Economy, Climate"
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
          <button
            type="submit"
            className="admin-btn-primary"
            disabled={loading}
          >
            {loading ? "Creating..." : "Create Author"}
          </button>
          <Link href="/admin/authors" className="admin-btn-secondary">
            Cancel
          </Link>
        </div>
      </form>
    </div>
  );
}
