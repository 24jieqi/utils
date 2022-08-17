# String

> 字符串相关的函数集合

## slash

> 替换字符串中的`\`为`/`

```ts
import { slash } from '@fruits-chain/utils'

console.log(slash('\\xx') === '/xx') // true
```

## ensurePrefix(prefix: string, str: string)

> 返回一个新的字符串，以传入的`prefix`作为字符串的开头

```ts
import { ensurePrefix } from '@fruits-chain/utils'

console.log(ensurePrefix('hello', 'world')) // helloworld
console.log(ensurePrefix('hello', 'hello world')) // hello world
```

## ensureSuffix(suffix: string, str: string)

> 返回一个新的字符串，以传入的`suffix`作为字符串的结尾

```ts
import { ensureSuffix } from '@fruits-chain/utils'

console.log(ensureSuffix('hello', 'world')) // worldhello
console.log(ensureSuffix('hello', 'world hello')) // world hello
```

## template

> 模版字符串引擎的简单实现，类似于`Python`中`.format()`的使用方式

```ts
import { template } from '@fruits-chain/utils'

console.log(template('Hello {0}! My name is {1}.', 'Inès', 'Anthony')) // Hello Inès! My name is Anthony.
console.log(template('{0} + {1} = {2}{3}', 1, '1', { v: 2 }, [2, 3])) // 1 + 1 = [object Object]2,3
```

## randomStr(size, dict)

> 随机字符串生成

```ts
import { randomStr } from '@fruits-chain/utils'

console.log(randomStr())
console.log(randomStr(10))
console.log(randomStr(10, '1234567890'))
```
