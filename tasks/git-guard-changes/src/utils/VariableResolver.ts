export default class VariableResolver {
  private static readonly regexp = /\$\(([^)]+)\)/g;

  public static resolveVariables(origValue: string, getValue: (key: string) => string): string {
    let newValue = origValue;

    let match: RegExpExecArray | null;
    while ((match = this.regexp.exec(newValue)) !== null) {
      const value = getValue(match[1]);
      if (value && value !== '') {
        newValue = this.replaceAll(newValue, match[0], value);
        this.regexp.lastIndex = 0;
      } else {
        console.log("Variable '" + match[1] + "' not defined.");
      }
    }

    return newValue;
  }

  private static escapeRegExp(reg: string): string {
    return reg.replace(/([.*+?^=!:${}()|[\]/\\])/g, '\\$1');
  }

  private static replaceAll(value: string, searchValue: string, replaceValue: string): string {
    return value.replace(new RegExp(this.escapeRegExp(searchValue), 'g'), replaceValue);
  }
}
