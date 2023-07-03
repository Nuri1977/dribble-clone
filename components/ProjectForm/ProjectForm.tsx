"use client";
import { SessionInterface } from "@/common.types";
import Image from "next/image";
import FormField from "../FormField/FormField";
import { categoryFilters } from "@/constants";
import CustomMenu from "../CustomMenu/CustomMenu";
import { useState } from "react";
import Button from "../Button/Button";

interface Props {
  type: "create" | "edit";
  session: SessionInterface;
}

const ProjectForm = ({ type, session }: Props) => {
  const [form, setForm] = useState({
    image: null,
    title: "",
    description: "",
    liveSiteUrl: "",
    githubUrl: "",
    category: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      alert("Please upload an image file");
      return;
    }

    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      const result = reader.result as string;
      handleStateChange("image", result);
    };
  };
  const handleStateChange = (fildName: string, value: string) => {
    setForm((prevState) => ({ ...prevState, [fildName]: value }));
  };
  const handleFormSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
  };

  return (
    <form className="flexStart form" onSubmit={handleFormSubmit}>
      <div className="flexStart form_image-container">
        <label
          htmlFor="poster"
          className="flexCenter form_image-label cursor-pointer"
        >
          {!form.image && "Chose a poster for your project"}
        </label>
        <input
          type="file"
          id="poster"
          accept="image/*"
          required={type === "create"}
          onChange={handleImageChange}
          className="hidden cursor-pointer"
        />
        {form.image && (
          <Image
            src={form?.image}
            className="sm:p-10 object-contain z-20"
            alt="ProjectPoster"
            fill
          />
        )}
      </div>
      <FormField
        title="Title"
        state={form.title}
        setState={(value) => handleStateChange("title", value)}
        placeholder="Title"
      />
      <FormField
        title="Description"
        state={form.description}
        placeholder="Showcase and discover remarkable developer projects."
        isTextArea
        setState={(value) => handleStateChange("description", value)}
      />

      <FormField
        type="url"
        title="Website URL"
        state={form.liveSiteUrl}
        placeholder="https://yoursiteurl"
        setState={(value) => handleStateChange("liveSiteUrl", value)}
      />

      <FormField
        type="url"
        title="GitHub URL"
        state={form.githubUrl}
        placeholder="https://github.com/youtrepo"
        setState={(value) => handleStateChange("githubUrl", value)}
      />
      <CustomMenu
        title="Category"
        state={form.category}
        filters={categoryFilters}
        setState={(value) => handleStateChange("category", value)}
      />
      <div className="flexStart w-full">
        <Button
          type="submit"
          title={
            isSubmitting
              ? `${type === "create" ? "Creating" : "Editing"}`
              : `${type === "create" ? "Create" : "Edit"}`
          }
          leftIcon={isSubmitting ? "" : "/plus.svg"}
          isSubmitting={isSubmitting}
        />
      </div>
    </form>
  );
};

export default ProjectForm;
