const prisma = require('../utils/prisma');

const getAll = async () => {
  return prisma.inquiry.findMany({ orderBy: { createdAt: 'desc' } });
};

const create = async ({ name, email, message }) => {
  return prisma.inquiry.create({ data: { name, email, message } });
};

const markAsRead = async (id) => {
  const inquiry = await prisma.inquiry.findUnique({ where: { id } });
  if (!inquiry) throw { status: 404, message: 'Inquiry not found' };
  return prisma.inquiry.update({ where: { id }, data: { status: 'read' } });
};

const remove = async (id) => {
  const inquiry = await prisma.inquiry.findUnique({ where: { id } });
  if (!inquiry) throw { status: 404, message: 'Inquiry not found' };
  await prisma.inquiry.delete({ where: { id } });
  return { message: 'Inquiry deleted' };
};

module.exports = { getAll, create, markAsRead, remove };