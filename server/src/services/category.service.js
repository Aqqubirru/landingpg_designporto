const prisma = require('../utils/prisma');

const slugify = (text) =>
  text.toLowerCase().trim().replace(/\s+/g, '-').replace(/[^\w-]+/g, '');

const getAll = async () => {
  return prisma.category.findMany({ orderBy: { createdAt: 'desc' } });
};

const getBySlug = async (slug) => {
  const category = await prisma.category.findUnique({ where: { slug } });
  if (!category) throw { status: 404, message: 'Category not found' };
  return category;
};

const create = async ({ name, description }) => {
  const slug = slugify(name);
  const existing = await prisma.category.findUnique({ where: { slug } });
  if (existing) throw { status: 400, message: 'Category already exists' };

  return prisma.category.create({ data: { name, slug, description } });
};

const update = async (id, { name, description }) => {
  const category = await prisma.category.findUnique({ where: { id } });
  if (!category) throw { status: 404, message: 'Category not found' };

  const slug = slugify(name);
  return prisma.category.update({ where: { id }, data: { name, slug, description } });
};

const remove = async (id) => {
  const category = await prisma.category.findUnique({ where: { id } });
  if (!category) throw { status: 404, message: 'Category not found' };

  // Cek apakah ada project yang pakai category ini
  const projectCount = await prisma.project.count({ where: { categoryId: id } });
  if (projectCount > 0) throw { status: 400, message: 'Category is used by existing projects' };

  return prisma.category.delete({ where: { id } });
};

module.exports = { getAll, getBySlug, create, update, remove };