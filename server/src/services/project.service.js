const prisma = require('../utils/prisma');
const cloudinary = require('../utils/cloudinary');

const slugify = (text) =>
  text.toLowerCase().trim().replace(/\s+/g, '-').replace(/[^\w-]+/g, '');

const uploadToCloudinary = (buffer, folder) => {
  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      { folder, resource_type: 'image' },
      (error, result) => {
        if (error) reject(error);
        else resolve(result);
      }
    );
    stream.end(buffer);
  });
};

const getAll = async ({ status, categoryId } = {}) => {
  const where = {};
  if (status) where.status = status;
  if (categoryId) where.categoryId = categoryId;

  return prisma.project.findMany({
    where,
    include: {
      category: { select: { id: true, name: true, slug: true } },
      images: {
        where: { isCover: true },
        take: 1,
      },
    },
    orderBy: { createdAt: 'desc' },
  });
};

const getBySlug = async (slug) => {
  const project = await prisma.project.findUnique({
    where: { slug },
    include: {
      category: { select: { id: true, name: true, slug: true } },
      images: { orderBy: { sortOrder: 'asc' } },
      createdByUser: { select: { id: true, name: true } },
    },
  });
  if (!project) throw { status: 404, message: 'Project not found' };
  return project;
};

const create = async ({ title, description, specifications, categoryId, status }, files, userId) => {
  const slug = slugify(title);
  const existing = await prisma.project.findUnique({ where: { slug } });
  if (existing) throw { status: 400, message: 'Project with this title already exists' };

  const project = await prisma.project.create({
    data: { title, slug, description, specifications, categoryId, status: status || 'draft', createdBy: userId },
  });

  if (files && files.length > 0) {
    const uploadedImages = await Promise.all(
      files.map((file, index) =>
        uploadToCloudinary(file.buffer, 'design-porto/projects').then((result) => ({
          projectId: project.id,
          imageUrl: result.secure_url,
          publicId: result.public_id,
          isCover: index === 0,
          sortOrder: index,
        }))
      )
    );
    await prisma.projectImage.createMany({ data: uploadedImages });
  }

  return getBySlug(slug);
};

const update = async (id, { title, description, specifications, categoryId, status }) => {
  const project = await prisma.project.findUnique({ where: { id } });
  if (!project) throw { status: 404, message: 'Project not found' };

  const slug = slugify(title);
  return prisma.project.update({
    where: { id },
    data: { title, slug, description, specifications, categoryId, status },
    include: {
      category: { select: { id: true, name: true, slug: true } },
      images: { orderBy: { sortOrder: 'asc' } },
    },
  });
};

const addImages = async (projectId, files) => {
  const project = await prisma.project.findUnique({ where: { id: projectId } });
  if (!project) throw { status: 404, message: 'Project not found' };

  const existingCount = await prisma.projectImage.count({ where: { projectId } });

  const uploadedImages = await Promise.all(
    files.map((file, index) =>
      uploadToCloudinary(file.buffer, 'design-porto/projects').then((result) => ({
        projectId,
        imageUrl: result.secure_url,
        publicId: result.public_id,
        isCover: existingCount === 0 && index === 0,
        sortOrder: existingCount + index,
      }))
    )
  );

  await prisma.projectImage.createMany({ data: uploadedImages });
  return prisma.projectImage.findMany({ where: { projectId }, orderBy: { sortOrder: 'asc' } });
};

const deleteImage = async (imageId) => {
  const image = await prisma.projectImage.findUnique({ where: { id: imageId } });
  if (!image) throw { status: 404, message: 'Image not found' };

  await cloudinary.uploader.destroy(image.publicId);
  await prisma.projectImage.delete({ where: { id: imageId } });

  // Kalau yang dihapus adalah cover, set foto pertama sebagai cover baru
  if (image.isCover) {
    const next = await prisma.projectImage.findFirst({
      where: { projectId: image.projectId },
      orderBy: { sortOrder: 'asc' },
    });
    if (next) await prisma.projectImage.update({ where: { id: next.id }, data: { isCover: true } });
  }

  return { message: 'Image deleted' };
};

const setCover = async (imageId) => {
  const image = await prisma.projectImage.findUnique({ where: { id: imageId } });
  if (!image) throw { status: 404, message: 'Image not found' };

  await prisma.projectImage.updateMany({
    where: { projectId: image.projectId },
    data: { isCover: false },
  });

  return prisma.projectImage.update({ where: { id: imageId }, data: { isCover: true } });
};

const remove = async (id) => {
  const project = await prisma.project.findUnique({
    where: { id },
    include: { images: true },
  });
  if (!project) throw { status: 404, message: 'Project not found' };

  // Hapus semua foto dari Cloudinary
  await Promise.all(project.images.map((img) => cloudinary.uploader.destroy(img.publicId)));

  await prisma.project.delete({ where: { id } });
  return { message: 'Project deleted' };
};

module.exports = { getAll, getBySlug, create, update, addImages, deleteImage, setCover, remove };