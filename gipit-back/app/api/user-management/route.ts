// Ruta: /api/users-management
import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

/**
 * @swagger
 * /users_management:
 *   post:
 *     summary: Crear una relación usuario-management
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UserManagement'
 *     responses:
 *       201:
 *         description: Relación creada exitosamente
 *       500:
 *         description: Error al crear la relación
 */
export async function POST(req: NextRequest) {
  const { user_id, management_id } = await req.json();
  try {
    const userManagement = await prisma.users_management.create({
      data: { user_id, management_id },
    });
    return NextResponse.json(userManagement, { status: 201 });
  } catch (error) {
    console.log(error)
    return NextResponse.json({ error: 'Error creating user-management relation' }, { status: 500 });
  }
}

/**
 * @swagger
 * /users_management:
 *   get:
 *     summary: Obtener todas las relaciones usuario-management
 *     responses:
 *       200:
 *         description: Lista de relaciones
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/UserManagement'
 */
export async function GET(req: NextRequest) {
    try {
      const usersManagement = await prisma.users_management.findMany();
      return NextResponse.json(usersManagement, { status: 200 });
    } catch (error) {
      return NextResponse.json({ error: 'Error fetching user-management relations' }, { status: 500 });
    }
  }
