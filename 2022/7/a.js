const fs = require('fs')

const lines = fs
  .readFileSync('input.txt', { encoding: 'utf-8' })
  .replace(/\r/g, '')
  .trim()
  .split('\n')

// console.log(lines)
function createTree(lines) {
  const tree = {
    name: '/',
    isDirectory: true,
    children: [],
  }
  let currentNode = tree
  let currentCommand = null

  for (const line of lines) {
    if (line[0] === '$') {
      //command
      const match = /^\$ (?<command>\w+)(?: (?<arg>.+))?$/.exec(line)
      //   console.log(match)
      currentCommand = match.groups.command

      if (currentCommand === 'cd') {
        const target = match.groups.arg
        switch (target) {
          case '/':
            currentNode = tree
            break
          case '..':
            currentNode = currentNode.parent
            break

          default:
            currentNode = currentNode.children.find(
              (folder) => folder.isDirectory && folder.name === target
            )
        }
      }
    } else {
      //for now, it's  a file from 'ls' command
      if (currentCommand === 'ls') {
        const fileMatch = /^(?<size>\d+) (?<name>.+)$/.exec(line)
        if (fileMatch) {
          const node = {
            name: fileMatch.groups.name,
            size: parseInt(fileMatch.groups.size),
            isDirectory: false,
            parent: currentNode,
          }
          currentNode.children.push(node)
        }
        const dirMatch = /^dir (?<name>.+)$/.exec(line)
        if (dirMatch) {
          const node = {
            name: dirMatch.groups.name,
            isDirectory: true,
            children: [],
            parent: currentNode,
          }
          currentNode.children.push(node)
        }
      } else {
        throw new Error('unknown state')
      }
    }
  }
  return tree
}

function printTree(node, depth = 0) {
  console.log(
    `${' '.repeat(depth * 2)}- ${node.name} (${
      node.isDirectory ? 'dir' : `file, size=${node.size}`
    })`
  )
  if (node.isDirectory) {
    for (const child of node.children) {
      printTree(child, depth + 1)
    }
  }
}

function getSize(node, directoryCallback) {
  if (!node.isDirectory) {
    return node.size
  }
  const directorySize = node.children
    .map((child) => getSize(child, directoryCallback))
    .reduce((acc, item) => acc + item, 0)

  directoryCallback(node.name, directorySize)

  return directorySize
}

function part1() {
  const totalSize = 10000
  const tree = new createTree(lines)
  printTree(tree)

  let sumSmallFolder = 0

  getSize(tree, (name, size) => {
    if (size < totalSize) {
      sumSmallFolder += size
    }
  })
  console.log(sumSmallFolder)
}

//reference https://www.youtube.com/watch?v=ZNLF2DavA6U&t=1651s&ab_channel=thibpat

part1()
