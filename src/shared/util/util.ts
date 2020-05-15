import { NotFoundException } from '@nestjs/common'

class Util {
    isRegisterNotFound(register: any): void {
        if (!register) {
            throw new NotFoundException('Register not found')
        }
    }
}

export default new Util()
