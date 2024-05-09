import { describe, expect, test } from '@jest/globals'
import { hello } from './index'

describe('[example] hello()', () => {
  test('When hello("john") then return "hello john', () => {
    // Arrange
    const name = 'john'

    // Act
    const message = hello(name)

    // Assert
    expect(message).toBe('hello john')
  })
})
