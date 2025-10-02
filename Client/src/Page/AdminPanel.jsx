import { useState } from "react";
import useAuthStore from "../stores/authStore";
import { useCreateCategory, useCreateTag, useDeleteCategory, useDeleteTag, useGetCategories, useGetTags } from "../hooks/useCategoriesTags";

const AdminPanel = () => {
  const { user } = useAuthStore();
  const [categoryName, setCategoryName] = useState('');
  const [categorySlug, setCategorySlug] = useState('');
  const [categoryDesc, setCategoryDesc] = useState('');
  const [tagName, setTagName] = useState('');
  const [tagSlug, setTagSlug] = useState('');
  const { data: categories, isLoading: isLoadingCategories } = useGetCategories();
  const { mutate: createCategory } = useCreateCategory();
  const { mutate: deleteCategory } = useDeleteCategory();
  const { data: tags, isLoading: isLoadingTags } = useGetTags();
  const { mutate: createTag } = useCreateTag();
  const { mutate: deleteTag } = useDeleteTag();

  if (!user || !['admin', 'editor'].includes(user.role)) return <p>Not authorized</p>;

  const handleCreateCategory = (e) => {
    e.preventDefault();
    createCategory({ name: categoryName, slug: categorySlug, description: categoryDesc });
  };

  const handleCreateTag = (e) => {
    e.preventDefault();
    createTag({ name: tagName, slug: tagSlug });
  };

  return (
    <div>
      <h1>Admin Panel</h1>
      <h2>Create Category</h2>
      <form onSubmit={handleCreateCategory}>
        <input value={categoryName} onChange={(e) => setCategoryName(e.target.value)} placeholder="Name" />
        <input value={categorySlug} onChange={(e) => setCategorySlug(e.target.value)} placeholder="Slug" />
        <input value={categoryDesc} onChange={(e) => setCategoryDesc(e.target.value)} placeholder="Description" />
        <button type="submit">Create Category</button>
      </form>
      <h2>Categories</h2>
      {isLoadingCategories ? 'Loading...' : categories?.map((c) => (
        <div key={c._id}>
          <p>{c.name}</p>
          <button onClick={() => deleteCategory(c._id)}>Delete</button>
        </div>
      ))}
      <h2>Create Tag</h2>
      <form onSubmit={handleCreateTag}>
        <input value={tagName} onChange={(e) => setTagName(e.target.value)} placeholder="Name" />
        <input value={tagSlug} onChange={(e) => setTagSlug(e.target.value)} placeholder="Slug" />
        <button type="submit">Create Tag</button>
      </form>
      <h2>Tags</h2>
      {isLoadingTags ? 'Loading...' : tags?.map((t) => (
        <div key={t._id}>
          <p>{t.name}</p>
          <button onClick={() => deleteTag(t._id)}>Delete</button>
        </div>
      ))}
    </div>
  );
};

export default AdminPanel;