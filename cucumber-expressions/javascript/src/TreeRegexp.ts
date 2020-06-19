import GroupBuilder from './GroupBuilder'
// @ts-ignore
import Regex from 'becke-ch--regex--s0-0-v1--base--pl--lib'
import RegexExecArray from './RegexExecArray'
import Group from './Group'

export default class TreeRegexp {
  public regexp: RegExp
  private regex: any
  public groupBuilder: GroupBuilder

  constructor(regexp: RegExp | string) {
    this.regexp = 'string' === typeof regexp ? new RegExp(regexp) : regexp
    this.regex = new Regex(this.regexp.source, this.regexp.flags)
    this.groupBuilder = this.createGroupBuilder(this.regex)
  }

  private createGroupBuilder(regexp: RegExp) {
    const source = regexp.source
    const stack: GroupBuilder[] = [new GroupBuilder()]
    const groupStartStack: number[] = []
    let escaping = false
    let charClass = false

    for (let i = 0; i < source.length; i++) {
      const c = source[i]
      if (c === '[' && !escaping) {
        charClass = true
      } else if (c === ']' && !escaping) {
        charClass = false
      } else if (c === '(' && !escaping && !charClass) {
        groupStartStack.push(i)
        const nonCapturing = this.isNonCapturing(source, i)
        const groupBuilder = new GroupBuilder()
        if (nonCapturing) {
          groupBuilder.setNonCapturing()
        }
        stack.push(groupBuilder)
      } else if (c === ')' && !escaping && !charClass) {
        const gb = stack.pop()
        const groupStart = groupStartStack.pop()
        if (gb.capturing) {
          gb.source = source.substring(groupStart + 1, i)
          stack[stack.length - 1].add(gb)
        } else {
          gb.moveChildrenTo(stack[stack.length - 1])
        }
      }
      escaping = c === '\\' && !escaping
    }
    return stack.pop()
  }

  private isNonCapturing(source: string, i: number): boolean {
    // Regex is valid. Bounds check not required.
    let next = source[++i]
    if (next != '?') {
      // (X)
      return false
    }
    next = source[++i]
    if (next != '<') {
      // (?:X)
      // (?=X)
      // (?!X)
      return true
    }
    next = source[++i]
    if (next == '=' || next == '!') {
      // (?<=X)
      // (?<!X)
      return true
    }
    // (?<name>X)
    return false
  }

  public match(s: string): Group | null {
    const match: RegexExecArray = this.regex.exec(s)
    if (!match) {
      return null
    }
    let groupIndex = 0
    const nextGroupIndex = () => groupIndex++
    return this.groupBuilder.build(match, nextGroupIndex)
  }
}
