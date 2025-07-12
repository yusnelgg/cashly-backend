import { Request } from 'express'

declare global {
  namespace Express {
    interface Request {
      user?: any // aquí puedes tiparlo más específico luego
    }
  }
}