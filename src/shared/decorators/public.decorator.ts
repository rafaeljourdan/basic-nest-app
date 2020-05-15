import { SetMetadata, CustomDecorator } from '@nestjs/common'

export const Public = (): CustomDecorator => SetMetadata('isPublicRoute', true)
