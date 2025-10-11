import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

// Fix for __dirname in ES modules
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const componentsDir = path.join(__dirname, '../src/components')

// Recursively get all .tsx files
function walkDir(dir) {
  return fs.readdirSync(dir).flatMap(f => {
    const fullPath = path.join(dir, f)
    return fs.statSync(fullPath).isDirectory() ? walkDir(fullPath) : fullPath
  })
}

const components = walkDir(componentsDir).filter(f => f.endsWith('.tsx') && !f.endsWith('.test.tsx'))

components.forEach(file => {
  const { dir, name } = path.parse(file)
  const testFile = path.join(dir, `${name}.test.tsx`)

  if (!fs.existsSync(testFile)) {
    const content = `import { render, screen } from '@testing-library/react'
import { ${name} } from './${name}'

describe('${name}', () => {
  it('renders without crashing', () => {
    render(<${name} />)
  })
})
`
    fs.writeFileSync(testFile, content)
    console.log('Created test for', name)
  }
})
