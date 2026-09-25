import { z } from 'zod';

export const itemSchema = z.object({

  name: z
    .string()
    .min(1, 'El nombre es requerido')
    .max(80, 'Máx. 80 caracteres'),

  description: z
    .string()
    .max(500, 'Máx. 500 caracteres'),

  category: z.enum(['Alojamiento','Actividad']),

  price: z
    .coerce.number().positive('El precio debe ser mayor que 0'),

  priceUnit: z
    .string()
    .min(1,'Requerido(Ej: Noche o por persona)'),

  details: z
    .string()
    .min(1,'Requerido(Ej: Capacidad o duración')
    .max(120, 'Máx. 120 caracteres'),

});

export type ItemFormData = z.infer<typeof itemSchema>;
