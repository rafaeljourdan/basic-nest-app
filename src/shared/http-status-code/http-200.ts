import { HttpStatus } from '@nestjs/common'

// HttpStatus OK: status code 200
module.exports = (res, data) =>
  res
    .status(HttpStatus.OK)
    .json(data)